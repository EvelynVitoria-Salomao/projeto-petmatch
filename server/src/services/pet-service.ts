import { ongRepository } from "@/repositories/ong-repository";
import { petRepository } from "@/repositories/pet-repository";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
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
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		let result: Awaited<ReturnType<typeof petRepository.createPet>>;
		try {
			result = await petRepository.createPet(request, ongResult[0].ongId);
		} catch {
			throw new DatabaseError("Erro inesperado ao cadastrar pet");
		}
		return result[0];
	},
	updatePet: async (
		id: string,
		request: Partial<PetRequest>,
		userId: string,
	) => {
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		const petResult = await petRepository.getPetAndOngIds(id);
		if (petResult.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
		if (petResult[0].ongId !== ongResult[0].ongId) {
			throw new ForbiddenError(
				"Pet informado não pertence à ONG do usuário atual",
			);
		}
		let updateResult: Awaited<ReturnType<typeof petRepository.updatePet>>;
		try {
			updateResult = await petRepository.updatePet(id, request);
		} catch {
			throw new DatabaseError("Erro inesperado ao atualizar pet");
		}
		return updateResult[0];
	},
	deletePet: async (id: string, userId: string) => {
		const ongResult = await ongRepository.getOngAndUserIds(userId);
		if (ongResult.length === 0) {
			throw new EntityNotFound("Nenhuma ONG encontrada para o usuário atual");
		}
		const petResult = await petRepository.getPetAndOngIds(id);
		if (petResult.length === 0) {
			throw new EntityNotFound("Pet não encontrado");
		}
		if (petResult[0].ongId !== ongResult[0].ongId) {
			throw new ForbiddenError(
				"Pet informado não pertence à ONG do usuário atual",
			);
		}
		await petRepository.deletePet(id);
	},
};
