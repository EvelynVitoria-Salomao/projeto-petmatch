import { db } from "@/database/connection";
import { ong } from "@/database/schema";

export const ongRepository = {
	getOneOng: async () => {
		// metodo temporario
		const result = await db
			.select({
				id: ong.id,
			})
			.from(ong)
			.limit(1);
		return result[0];
	},
};
