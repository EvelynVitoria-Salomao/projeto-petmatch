import { eq, ne } from "drizzle-orm";
import { db } from "@/database/connection";
import { ongTable, petTable } from "@/database/schema";

export const petRepository = {
	getPets: async () => {
		return await db
			.select({
				id: petTable.id,
				nome: petTable.nome,
				urlImagem: petTable.urlImagem,
				cidade: ongTable.cidade,
				estado: ongTable.uf,
			})
			.from(petTable)
			.innerJoin(ongTable, eq(petTable.ongId, ongTable.id))
			.where(ne(petTable.status, "ADOTADO"));
	},
	getPetById: async (id: number) => {
		const result = await db
			.select({
				pet: petTable,
				ong: ongTable,
			})
			.from(petTable)
			.innerJoin(ongTable, eq(petTable.ongId, ongTable.id))
			.where(eq(petTable.id, id));
		return result[0];
	},
};
