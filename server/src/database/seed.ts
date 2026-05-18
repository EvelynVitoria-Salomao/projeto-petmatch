import { hashPassword } from "better-auth/crypto";
import { db } from "@/database/connection";
import { account, ong, pet, user } from "@/database/schema";
import { supabase, supabaseBucket } from "@/lib/supabase";

function mapEspecieToEnum(value: string): "Cachorro" | "Gato" | "Outro" {
	if (value === "Cão") return "Cachorro";
	if (value === "Gato") return "Gato";
	return "Outro";
}

export async function seed() {
	const now = new Date();

	const readonlyBucket = "test-readonly";
	let deletedPets: (typeof pet.$inferSelect)[] = [];
	let deletedOngs: (typeof ong.$inferSelect)[] = [];

	// Clear existing data
	try {
		deletedPets = await db.delete(pet).returning();
		deletedOngs = await db.delete(ong).returning();
		await db.delete(account);
		await db.delete(user);
		console.log("Limpando dados existentes.\n\n");
	} catch (error) {
		console.error("Erro ao limpar dados do banco: ", error);
	}

	// Clear images not in readonly bucket
	const allImages: string[] = deletedPets
		.map((pet) => pet.urlImagem)
		.concat(deletedOngs.map((ong) => ong.urlImagem));
	const imagesToDelete: string[] = allImages
		.filter((url) => !url.startsWith(readonlyBucket))
		.map((url) => {
			const index = url.indexOf("/");
			return url.substring(index + 1);
		});
	if (imagesToDelete.length > 0) {
		await supabase.storage.from(supabaseBucket).remove(imagesToDelete);
	}

	// Insert Users
	const [user1, user2] = await db
		.insert(user)
		.values([
			{
				id: crypto.randomUUID(),
				name: "Jonas",
				email: "jonas@ecovida.org.br",
				emailVerified: true,
				image: null,
				createdAt: now,
				updatedAt: now,
			},
			{
				id: crypto.randomUUID(),
				name: "Raquel",
				email: "raquel@amigoanimal.org.br",
				emailVerified: true,
				image: null,
				createdAt: now,
				updatedAt: now,
			},
		])
		.returning();

	// Insert User Accounts
	const [_account1, _account2] = await db
		.insert(account)
		.values([
			{
				id: crypto.randomUUID(),
				accountId: user1.id,
				userId: user1.id,
				providerId: "credential",
				password: await hashPassword("123456789"),
				createdAt: now,
				updatedAt: now,
			},
			{
				id: crypto.randomUUID(),
				accountId: user2.id,
				userId: user2.id,
				providerId: "credential",
				password: await hashPassword("123456789"),
				createdAt: now,
				updatedAt: now,
			},
		])
		.returning();

	// Insert ONGs
	const [ong1, ong2] = await db
		.insert(ong)
		.values([
			{
				cnpj: "12345678000199",
				razaoSocial: "Associação Guardiões da Mata Atlântica",
				nomeFantasia: "EcoVida",
				telefone: "1133445566",
				whatsapp: "551133445566",
				email: "contato@ecovida.org.br",
				instagram: "@ecovida",
				urlImagem: "test-readonly/test/1ong.jpg",
				cep: "01310100",
				uf: "SP",
				cidade: "São Paulo",
				bairro: "Bela Vista",
				logradouro: "Avenida Paulista",
				numero: "1500",
				site: null,
				userId: user1.id,
				updatedAt: now,
			},
			{
				cnpj: "98765432000188",
				razaoSocial: "Associação dos Amantes de Animais",
				nomeFantasia: "Amigo Animal",
				telefone: "2122334455",
				whatsapp: null,
				email: "contato@amigoanimal.org.br",
				instagram: "@amigoanimal",
				urlImagem: "test-readonly/test/2ong.jpg",
				cep: "20040002",
				uf: "RJ",
				cidade: "Rio de Janeiro",
				bairro: "Centro",
				logradouro: "Rua da Assembleia",
				numero: "10A",
				site: "https://www.amigoanimal.org",
				userId: user2.id,
				updatedAt: now,
			},
		])
		.returning();

	// Insert Pets
	await db.insert(pet).values([
		{
			nome: "Dogão",
			especie: mapEspecieToEnum("Cão"),
			raca: "Pitbull",
			sexo: "M",
			porte: "G",
			dataNascimento: new Date("2025-02-01"),
			descricao: "Cão grande, amigável e preguiçoso",
			urlImagem: "test-readonly/test/pitbull.jpg",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Sujinho",
			especie: mapEspecieToEnum("Gato"),
			raca: "Siamês",
			sexo: "M",
			porte: "M",
			dataNascimento: new Date("2024-05-01"),
			descricao: "Gato muito enérgico",
			urlImagem: "test-readonly/test/gato.jpg",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Pipo",
			especie: mapEspecieToEnum("Ave"),
			raca: "Calopsita",
			sexo: "M",
			porte: "P",
			dataNascimento: new Date("2024-01-10"),
			descricao: "Assovia o hino do time e é muito manso.",
			urlImagem: "test-readonly/test/calopsita.jpg",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Stuart",
			especie: mapEspecieToEnum("Roedor"),
			raca: "Hamster Sírio",
			sexo: "M",
			porte: "P",
			dataNascimento: new Date("2024-11-20"),
			descricao: "Adora correr na rodinha durante a noite.",
			urlImagem: "test-readonly/test/hamster.jpg",
			adotado: false,
			ongId: ong2.id,
			updatedAt: now,
		},
		{
			nome: "Rex",
			especie: mapEspecieToEnum("Cão"),
			raca: "Pastor Alemão",
			sexo: "M",
			porte: "G",
			dataNascimento: new Date("2021-03-30"),
			descricao: "Ótimo para guarda, mas muito carinhoso.",
			urlImagem: "test-readonly/test/pastor%20alemao.jpg",
			adotado: false,
			ongId: ong2.id,
			updatedAt: now,
		},
		{
			nome: "Lola",
			especie: mapEspecieToEnum("Coelho"),
			raca: "Mini Lop",
			sexo: "F",
			porte: "P",
			dataNascimento: new Date("2023-06-05"),
			descricao: "Muito fofa, adora comer cenoura e feno.",
			urlImagem: "test-readonly/test/coelho%20mini%20lop.jpg",
			adotado: true,
			ongId: ong2.id,
			updatedAt: now,
		},
		{
			nome: "Zazu",
			especie: mapEspecieToEnum("Ave"),
			raca: "Papagaio Verdadeiro",
			sexo: "M",
			porte: "M",
			dataNascimento: new Date("2020-05-30"),
			descricao: 'Fala "bom dia" e imita o som do telefone.',
			urlImagem: "test-readonly/test/papagaio.jpg",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Amora",
			especie: mapEspecieToEnum("Roedor"),
			raca: "Porquinho da Índia",
			sexo: "F",
			porte: "P",
			dataNascimento: new Date("2024-03-18"),
			descricao: "Conversa fazendo barulhinhos quando vê comida.",
			urlImagem: "test-readonly/test/porquinho%20da%20india.jpg",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
	]);

	console.log("Seed concluído com sucesso!");
}

if (import.meta.main) {
	seed().catch((error) => {
		console.error("Seed failed:", error);
		process.exit(1);
	});
}
