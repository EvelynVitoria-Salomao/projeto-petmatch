import { ongRepository } from "@/repositories/ong-repository";
import { petRepository } from "@/repositories/pet-repository";
import type { PetQueryParams, PetRequest } from "@/types/pet-types";

export const petService = {
	getPets: async (params: PetQueryParams) => {
		return petRepository.getPets(params);
	},
	getPetById: async (id: string) => {
		return petRepository.getPetById(id);
	},
	createPet: async (request: PetRequest) => {
		/*
		temporario: ong aleatoria
		pendente: receber o token do usuário logado, obter o username a partir do token
			buscar o ID da ong do usuario
			select ong.id from ong join user where user.username = ?
		*/
		const ong = await ongRepository.getOneOng();
		return petRepository.createPet(request, ong.id);
	},
	updatePet: async (id: string, request: Partial<PetRequest>) => {
		return petRepository.updatePet(id, request);
	},
	deletePet: async (id: string) => {
		return petRepository.deletePet(id);
	},
};
