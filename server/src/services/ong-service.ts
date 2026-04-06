import { ongRepository } from "@/repositories/ong-repository";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import type { OngQueryParams, OngRequest } from "@/types/ong-types";

export const ongService = {
	getOngById: async (id: string) => {
		const result = await ongRepository.getOngById(id);
		if (result.length === 0) {
			throw new EntityNotFound("Ong não encontrada");
		}
		return result[0];
	},
	createOng: async (request: OngRequest, userId: string) => {
		try {
			const result = await ongRepository.createOng(request, userId);
			return result[0];
		} catch (error) {
			throw new DatabaseError("Erro inesperado ao criar ONG");
		}
	},
	updateOng: async (
		ongId: string,
		userId: string,
		request: Partial<OngRequest>,
	) => {
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Usuário atual não possui ONG cadastrada");
		}
		if (ongResult[0].ongId !== ongId) {
			throw new ForbiddenError("ONG informada não pertence ao usuário atual");
		}
		try {
			const updateResult = await ongRepository.updateOng(userId, request);
			return updateResult[0];
		} catch (error) {
			throw new DatabaseError("Erro inesperado ao atualizar ONG");
		}
	},
	getOngs: async (params: OngQueryParams) => {
		return ongRepository.getOngs(params);
	},
};
