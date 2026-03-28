import { eq } from "drizzle-orm";
import { db } from "@/database/connection";
import { ong } from "@/database/schema";
import type { OngRequest } from "@/types/ong-types";

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
	getOngById: async (id: string) => {
		return await db.select().from(ong).where(eq(ong.id, id));
	},
	createOng: async (request: OngRequest, userId: string) => {
		return await db
			.insert(ong)
			.values({
				...request,
				userId,
			})
			.returning();
	},
	updateOng: async (id: string, request: Partial<OngRequest>) => {
		return await db.update(ong).set(request).where(eq(ong.id, id)).returning();
	},
};
