import { ongRepository } from "@/repositories/ong-repository";
import { DatabaseError, EntityNotFound } from "@/types/custom-errors";
import type { OngRequest } from "@/types/ong-types";

export const ongService = {
	getOngById: async (id: string) => {
		const result = await ongRepository.getOngById(id);
		if (result.length === 0) {
			throw new EntityNotFound("Ong não encontrada");
		}
		return result[0];
	},
	createOng: async (request: OngRequest, userId: string) => {
		const result = await ongRepository.createOng(request, userId);
		if (result.length === 0) {
			throw new DatabaseError("Erro ao cadastrar ong");
		}
		return result[0];
	},
	updateOng: async (id: string, request: Partial<OngRequest>) => {
		const result = await ongRepository.updateOng(id, request);
		if (result.length === 0) {
			throw new DatabaseError("Erro ao atualizar ong");
		}
		return result[0];
	},
};
