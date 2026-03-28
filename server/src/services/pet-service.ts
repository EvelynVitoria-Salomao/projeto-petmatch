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
	createPet: async (request: PetRequest) => {
		/*
		temporario: ong aleatoria
		pendente: receber o token do usuário logado, obter o username a partir do token
			buscar o ID da ong do usuario
			select ong.id from ong join user where user.username = ?
		*/
		const ong = await ongRepository.getOneOng();
		const result = await petRepository.createPet(request, ong.id);
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
