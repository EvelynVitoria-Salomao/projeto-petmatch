import { relations } from "drizzle-orm";
import {
	char,
	date,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	varchar,
} from "drizzle-orm/pg-core";

export const statusPet = pgEnum("status_pet", ["DISPONIVEL", "ADOTADO"]);

export const ongTable = pgTable("tb_ong", {
	id: serial().primaryKey(),
	cnpj: char({ length: 14 }).notNull().unique(),
	razaoSocial: varchar("razao_social").notNull(),
	nomeFantasia: varchar("nome_fantasia").notNull(),
	telefone: char({ length: 11 }).notNull(),
	whatsapp: char({ length: 13 }),
	email: varchar().notNull().unique(),
	site: varchar("site"),
	cep: char({ length: 8 }).notNull(),
	uf: char({ length: 2 }).notNull(),
	cidade: varchar().notNull(),
	bairro: varchar().notNull(),
	logradouro: varchar().notNull(),
	numero: integer().notNull(),
});

export const petTable = pgTable("tb_pet", {
	id: serial().primaryKey(),
	nome: varchar().notNull(),
	especie: varchar().notNull(),
	raca: varchar().notNull(),
	sexo: char({ length: 1 }).notNull(),
	porte: char({ length: 1 }).notNull(),
	dataNascimento: date("data_nascimento").notNull(),
	descricao: text().notNull(),
	urlImagem: text("url_imagem").notNull(),
	status: statusPet().notNull(),
	ongId: integer("ong_id")
		.notNull()
		.references(() => ongTable.id),
});

export const usuarioTable = pgTable("tb_usuario", {
	id: serial().primaryKey(),
	email: varchar().notNull().unique(),
	senha: varchar().notNull(),
	ongId: integer("ong_id")
		.notNull()
		.unique()
		.references(() => ongTable.id),
});

export const petRelations = relations(petTable, ({ one }) => ({
	ongTable: one(ongTable, { fields: [petTable.id], references: [ongTable.id] }),
}));

export const usuarioRelations = relations(usuarioTable, ({ one }) => ({
	ongTable: one(ongTable, {
		fields: [usuarioTable.id],
		references: [ongTable.id],
	}),
}));

export const ongRelations = relations(ongTable, ({ one, many }) => ({
	petTable: many(petTable),
	usuarioTable: one(usuarioTable),
}));
