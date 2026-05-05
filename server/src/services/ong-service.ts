import { ongRepository } from "@/repositories/ong-repository";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import type { OngQueryParams, OngRequest } from "@/types/models/ong-types";

export const ongService = {
	getOngById: async (id: string) => {
		const result = await ongRepository.getOngById(id);
		if (result.length === 0) {
			throw new EntityNotFound("ONG não encontrada");
		}
		return result[0];
	},
	createOng: async (request: OngRequest, userId: string) => {
		try {
			const result = await ongRepository.createOng(request, userId);
			return result[0];
		} catch {
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
		let updateResult: Awaited<ReturnType<typeof ongRepository.updateOng>>;
		try {
			updateResult = await ongRepository.updateOng(ongId, userId, request);
		} catch {
			throw new DatabaseError(
				"Erro inesperado ao atualizar ONG. CNPJ ou email podem já estar cadastrados em outra ONG.",
			);
		}
		if (updateResult.length === 0) {
			const userOngResult = await ongRepository.getOngAndUserIds(userId);
			if (userOngResult.length === 0) {
				throw new EntityNotFound("Usuário atual não possui ONG cadastrada");
			}
			const ongExists = await ongRepository.ongExistsById(ongId);
			if (!ongExists) {
				throw new EntityNotFound("ONG não encontrada");
			}
			if (userOngResult[0].ongId !== ongId) {
				throw new ForbiddenError("ONG informada não pertence ao usuário atual");
			}
		}
		return updateResult[0];
	},
	getOngs: async (params: OngQueryParams) => {
		return ongRepository.getOngs(params);
	},
};
