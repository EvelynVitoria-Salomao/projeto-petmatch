import { eq } from "drizzle-orm";
import { db } from "@/database/connection";
import { ong, user } from "@/database/schema";
import type { OngRequest } from "@/types/ong-types";

export const ongRepository = {
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
	updateOng: async (ongId: string, request: Partial<OngRequest>) => {
		return await db
			.update(ong)
			.set(request)
			.where(eq(ong.id, ongId))
			.returning();
	},
	getOngAndUserIds: async (userId: string) => {
		return await db
			.select({
				ongId: ong.id,
				userId: ong.userId,
			})
			.from(ong)
			.innerJoin(user, eq(ong.userId, user.id))
			.where(eq(ong.userId, userId));
	},
};
