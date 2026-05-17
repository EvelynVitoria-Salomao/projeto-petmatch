import { ongRepository } from "@/repositories/ong-repository";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import type { OngQueryParams, OngRequest } from "@/types/models/ong-types";
import { imageService } from "./image-service";

export const ongService = {
	getOngById: async (id: string) => {
		const result = await ongRepository.getOngById(id);
		if (result.length === 0) {
			throw new EntityNotFound("ONG não encontrada");
		}
		result[0].urlImagem = imageService.buildPublicUrl(result[0].urlImagem);
		return result[0];
	},
	createOng: async (request: OngRequest, userId: string) => {
		const urlImagem = await imageService.uploadImage(request.imagem, "ongs");
		try {
			const result = await ongRepository.createOng({
				...request,
				urlImagem,
				userId,
			});
			result[0].urlImagem = imageService.buildPublicUrl(result[0].urlImagem);
			return result[0];
		} catch {
			await imageService.deleteImage(urlImagem);
			throw new DatabaseError(
				"Erro inesperado ao criar ONG. CNPJ, email ou usuário podem já estar cadastrados em outra ONG.",
			);
		}
	},
	updateOng: async (
		ongId: string,
		userId: string,
		request: Partial<OngRequest>,
	) => {
		// primeiro realiza todas as validações
		const ongResult = await ongRepository.getOngById(ongId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("ONG não encontrada");
		}
		if (ongResult[0].userId !== userId) {
			throw new ForbiddenError("ONG informada não pertence ao usuário atual");
		}
		// salva a nova imagem se existir no request
		const antigaImagem = ongResult[0].urlImagem;
		let novaImagem: string | undefined;
		if (request.imagem) {
			novaImagem = await imageService.uploadImage(request.imagem, "ongs");
		}
		// salva os dados no banco e apaga a nova imagem em caso de erro
		let updateResult: Awaited<ReturnType<typeof ongRepository.updateOng>>;
		try {
			updateResult = await ongRepository.updateOng(ongId, userId, {
				...request,
				urlImagem: novaImagem,
			});
		} catch {
			if (novaImagem) {
				await imageService.deleteImage(novaImagem);
			}
			throw new DatabaseError(
				"Erro inesperado ao atualizar ONG. CNPJ ou email podem já estar cadastrados em outra ONG.",
			);
		}
		// após dar tudo certo, apaga a imagem antiga caso exista uma nova imagem
		if (novaImagem) {
			await imageService.deleteImage(antigaImagem);
		}
		updateResult[0].urlImagem = imageService.buildPublicUrl(
			updateResult[0].urlImagem,
		);
		return updateResult[0];
	},
	getOngs: async (params: OngQueryParams) => {
		const result = await ongRepository.getOngs(params);
		result.forEach((ong) => ong.urlImagem = imageService.buildPublicUrl(ong.urlImagem));
		return result;
	},
};
