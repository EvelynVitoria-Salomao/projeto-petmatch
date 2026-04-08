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
			throw new EntityNotFound("ONG não encontrada");
		}
		return result[0];
	},
	createOng: async (request: OngRequest, userId: string) => {
		try {
			const result = await ongRepository.createOng(request, userId);
			return result[0];
		} catch {
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
		let updateResult: Awaited<ReturnType<typeof ongRepository.updateOng>>;
		try {
			updateResult = await ongRepository.updateOng(ongId, request);
		} catch {
			throw new DatabaseError("Erro inesperado ao atualizar ONG");
		}
		if (updateResult.length === 0) {
			throw new EntityNotFound("ONG não encontrada");
		}
		return updateResult[0];
	},
	getOngs: async (params: OngQueryParams) => {
		return ongRepository.getOngs(params);
	},
};
