import { ongRepository } from "@/repositories/ong-repository";
import { petRepository } from "@/repositories/pet-repository";
import { imageService } from "@/services/image-service";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import type { PetQueryParams, PetRequest } from "@/types/models/pet-types";

export const petService = {
	getPets: async (params: PetQueryParams) => {
		const result = await petRepository.getPets(params);
		result.forEach((pet) => pet.urlImagem = imageService.buildPublicUrl(pet.urlImagem));
		return result;
	},
	getPetById: async (id: string) => {
		const result = await petRepository.getPetById(id);
		if (result.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
		result[0].pet.urlImagem = imageService.buildPublicUrl(
			result[0].pet.urlImagem,
		);
		return result[0];
	},
	createPet: async (request: PetRequest, userId: string) => {
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		const urlImagem = await imageService.uploadImage(request.imagem, "pets");
		const ongId = ongResult[0].ongId;
		let result: Awaited<ReturnType<typeof petRepository.createPet>>;
		try {
			result = await petRepository.createPet({ ...request, urlImagem, ongId });
		} catch {
			await imageService.deleteImage(urlImagem);
			throw new DatabaseError("Erro inesperado ao cadastrar pet");
		}
		result[0].urlImagem = imageService.buildPublicUrl(result[0].urlImagem);
		return result[0];
	},
	updatePet: async (
		id: string,
		request: Partial<PetRequest>,
		userId: string,
	) => {
		// primeiro, realiza todas as validações
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		const petResult = await petRepository.getPetById(id);
		if (petResult.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
		if (petResult[0].pet.ongId !== ongResult[0].ongId) {
			throw new ForbiddenError(
				"Pet informado não pertence à ONG do usuário atual",
			);
		}
		// salva a nova imagem se existir no request
		const antigaImagem = petResult[0].pet.urlImagem;
		let novaImagem: string | undefined;
		if (request.imagem) {
			novaImagem = await imageService.uploadImage(request.imagem, "pets");
		}
		// salva os dados no banco e apaga a nova imagem em caso de erro
		let updateResult: Awaited<ReturnType<typeof petRepository.updatePet>>;
		try {
			updateResult = await petRepository.updatePet(id, ongResult[0].ongId, {
				...request,
				urlImagem: novaImagem,
			});
		} catch {
			if (novaImagem) {
				await imageService.deleteImage(novaImagem);
			}
			throw new DatabaseError("Erro inesperado ao atualizar pet");
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
	deletePet: async (id: string, userId: string) => {
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		let deleteResult: Awaited<ReturnType<typeof petRepository.deletePet>>;
		try {
			deleteResult = await petRepository.deletePet(id, ongResult[0].ongId);
		} catch {
			throw new DatabaseError("Erro inesperado ao deletar pet");
		}
		if (deleteResult.length === 0) {
			const petResult = await petRepository.getPetAndOngIds(id);
			if (petResult.length === 0) {
				throw new EntityNotFound("Pet não encontrado");
			}
			throw new ForbiddenError(
				"Pet informado não pertence à ONG do usuário atual",
			);
		}
		imageService.deleteImage(deleteResult[0].urlImagem);
	},
};
