import { relations, sql } from "drizzle-orm";
import {
	boolean,
	char,
	check,
	date,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Enums
export const especieEnum = pgEnum("especie_enum", [
	"Cachorro",
	"Gato",
	"Outro",
]);
export const sexoEnum = pgEnum("sexo_enum", ["M", "F"]);
export const porteEnum = pgEnum("porte_enum", ["P", "M", "G"]);

// Tabelas de autenticação (Better Auth)
export const user = pgTable("user", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull(),
});

export const session = pgTable(
	"session",
	{
		id: uuid("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
	"account",
	{
		id: uuid("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: uuid("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many, one }) => ({
	sessions: many(session),
	accounts: many(account),
	ong: one(ong, {
		fields: [user.id],
		references: [ong.userId],
	}),
	petsTutelados: many(pet, { relationName: "pet_tutor" }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

// Tabelas de domínio (Pet Match)
export const ong = pgTable(
	"ong",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		cnpj: char("cnpj", { length: 14 }).notNull().unique(),
		razaoSocial: varchar("razao_social", { length: 255 }).notNull(),
		nomeFantasia: varchar("nome_fantasia", { length: 255 }).notNull(),
		telefone: char("telefone", { length: 11 }).notNull(),
		whatsapp: char("whatsapp", { length: 13 }),
		email: varchar("email", { length: 255 }).notNull().unique(),
		site: varchar("site", { length: 255 }),
		instagram: varchar("instagram", { length: 255 }).notNull(),
		urlImagem: text("url_imagem").notNull(),
		cep: char("cep", { length: 8 }).notNull(),
		uf: char("uf", { length: 2 }).notNull(),
		cidade: varchar("cidade", { length: 255 }).notNull(),
		bairro: varchar("bairro", { length: 255 }).notNull(),
		logradouro: varchar("logradouro", { length: 255 }).notNull(),
		numero: integer("numero").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" })
			.unique(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("ong_userId_idx").on(table.userId)],
);

export const pet = pgTable(
	"pet",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		nome: varchar("nome", { length: 255 }).notNull(),
		especie: especieEnum("especie").notNull(),
		raca: varchar("raca", { length: 100 }).notNull(),
		sexo: sexoEnum("sexo").notNull(),
		porte: porteEnum("porte").notNull(),
		dataNascimento: date("data_nascimento", { mode: "date" }).notNull(),
		descricao: text("descricao").notNull(),
		urlImagem: text("url_imagem").notNull(),
		adotado: boolean("adotado").notNull().default(false),
		// ONG que cadastrou o pet para adoção
		ongId: uuid("ong_id")
			.notNull()
			.references(() => ong.id, {
				onDelete: "cascade",
			}),
		// Usuário tutor (quando o pet foi adotado ou é de um usuário comum)
		tutorId: uuid("tutor_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("pet_ongId_idx").on(table.ongId),
		index("pet_tutorId_idx").on(table.tutorId),
		index("pet_adotado_idx").on(table.adotado),
		// Garante que todo pet tenha ongId OU tutorId (pelo menos um não-nulo)
		check(
			"pet_owner_check",
			sql`${table.ongId} IS NOT NULL OR ${table.tutorId} IS NOT NULL`,
		),
		// Check constraints para sexo e porte
		check("pet_sexo_check", sql`${table.sexo} IN ('M', 'F')`),
		check("pet_porte_check", sql`${table.porte} IN ('P', 'M', 'G')`),
	],
);

// Relações de domínio
export const ongRelations = relations(ong, ({ one, many }) => ({
	user: one(user, {
		fields: [ong.userId],
		references: [user.id],
	}),
	pets: many(pet),
}));

export const petRelations = relations(pet, ({ one }) => ({
	ong: one(ong, {
		fields: [pet.ongId],
		references: [ong.id],
	}),
	tutor: one(user, {
		fields: [pet.tutorId],
		references: [user.id],
	}),
}));
