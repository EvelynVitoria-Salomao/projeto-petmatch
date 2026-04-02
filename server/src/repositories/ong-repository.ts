import { eq } from "drizzle-orm";
import { db } from "@/database/connection";
import { ong, user } from "@/database/schema";
import type { OngRequest } from "@/types/ong-types";

export const ongRepository = {
	getOngById: async (id: string) => {
		return await db.select().from(ong).where(eq(ong.id, id));
	},
	getOngByUserId: async (userId: string) => {
		return await db
			.select({
				ong: ong,
			})
			.from(ong)
			.innerJoin(user, eq(ong.userId, user.id))
			.where(eq(ong.userId, userId));
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
