import { and, eq, ilike } from "drizzle-orm";
import { db } from "@/database/connection";
import { ong, user } from "@/database/schema";
import type { OngQueryParams, OngRequest } from "@/types/ong-types";

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
	getOngs: async (params: OngQueryParams) => {
		return await db
			.select({
				id: ong.id,
				nomeFantasia: ong.nomeFantasia,
				urlImagem: ong.urlImagem,
				cidade: ong.cidade,
				estado: ong.uf,
				telefone: ong.telefone,
				email: ong.email,
			})
			.from(ong)
			.where(
				and(
					params.cnpj ? eq(ong.cnpj, params.cnpj) : undefined,
					params.razaoSocial ? eq(ong.razaoSocial, params.razaoSocial) : undefined,
					params.nomeFantasia ? ilike(ong.nomeFantasia, `%${params.nomeFantasia}%`) : undefined,
					params.telefone ? eq(ong.telefone, params.telefone) : undefined,
					params.whatsapp ? eq(ong.whatsapp, params.whatsapp) : undefined,
					params.email ? eq(ong.email, params.email) : undefined,
					params.site ? eq(ong.site, params.site) : undefined,
				),
			);
	}
};
