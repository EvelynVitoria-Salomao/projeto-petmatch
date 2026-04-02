import { ongRepository } from "@/repositories/ong-repository";
import { petRepository } from "@/repositories/pet-repository";
import { DatabaseError, EntityNotFound } from "@/types/custom-errors";
import type { PetQueryParams, PetRequest } from "@/types/pet-types";

export const petService = {
	getPets: async (params: PetQueryParams) => {
		return petRepository.getPets(params);
	},
	getPetById: async (id: string) => {
		const result = await petRepository.getPetById(id);
		if (result.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
		return result[0];
	},
	createPet: async (request: PetRequest, userId: string) => {
		const ongResult = await ongRepository.getOngByUserId(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		const result = await petRepository.createPet(request, ongResult[0].ong.id);
		if (result.length === 0) {
			throw new DatabaseError("Erro ao cadastrar pet");
		}
		return result[0];
	},
	updatePet: async (id: string, request: Partial<PetRequest>) => {
		const result = await petRepository.updatePet(id, request);
		if (result.length === 0) {
			throw new DatabaseError("Erro ao atualizar pet");
		}
		return result[0];
	},
	deletePet: async (id: string) => {
		const result = await petRepository.deletePet(id);
		if (result.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
	},
};
