import { petRepository } from "@/repositories/pet-repository";

export const petService = {
	getPets: async () => {
		return petRepository.getPets();
	},
	getPetById: async (id: number) => {
		return petRepository.getPetById(id);
	},
};
