import { and, eq, ilike, ne } from "drizzle-orm";
import { db } from "@/database/connection";
import { ong, pet } from "@/database/schema";
import type { PetQueryParams, PetRequest } from "@/types/pet-types";

export const petRepository = {
	getPets: async (params: PetQueryParams) => {
		return await db
			.select({
				id: pet.id,
				nome: pet.nome,
				urlImagem: pet.urlImagem,
				cidade: ong.cidade,
				estado: ong.uf,
			})
			.from(pet)
			.innerJoin(ong, eq(pet.ongId, ong.id))
			.where(
				and(
					ne(pet.adotado, true),
					params.especie ? eq(pet.especie, params.especie) : undefined,
					params.sexo ? eq(pet.sexo, params.sexo) : undefined,
					params.porte ? eq(pet.porte, params.porte) : undefined,
					params.cidade ? ilike(ong.cidade, `%${params.cidade}%`) : undefined,
					params.nomeOng ? ilike(ong.nomeFantasia, `%${params.nomeOng}%`) : undefined,
				),
			);
	},
	getPetById: async (id: string) => {
		const result = await db
			.select({
				pet: pet,
				ong: ong,
			})
			.from(pet)
			.innerJoin(ong, eq(pet.ongId, ong.id))
			.where(eq(pet.id, id));
		return result[0];
	},
	createPet: async (request: PetRequest, ongId: string) => {
		const result = await db
			.insert(pet)
			.values({
				...request,
				ongId,
			})
			.returning();
		return result[0];
	},
	updatePet: async (id: string, request: Partial<PetRequest>) => {
		const result = await db
			.update(pet)
			.set(request)
			.where(eq(pet.id, id))
			.returning();
		return result[0];
	},
	deletePet: async (id: string) => {
		const result = await db
			.delete(pet)
			.where(eq(pet.id, id))
			.returning();
		return result.length !== 0;
	},
};
