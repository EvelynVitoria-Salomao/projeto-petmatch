import { hashPassword } from "better-auth/crypto";
import { db } from "@/database/connection";
import { account, ong, pet, user } from "@/database/schema";

function mapEspecieToEnum(value: string): "Cachorro" | "Gato" | "Outro" {
	if (value === "Cão") return "Cachorro";
	if (value === "Gato") return "Gato";
	return "Outro";
}

export async function seed() {
	const now = new Date();

	// Clear existing data
	try {
		await db.delete(pet);
		await db.delete(ong);
		await db.delete(account);
		await db.delete(user);
		console.log("Limpando dados existentes.\n\n");
	} catch (error) {
		console.error("Erro ao limpar dados existentes:", error);
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
				urlImagem:
					"https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
				cep: "01310100",
				uf: "SP",
				cidade: "São Paulo",
				bairro: "Bela Vista",
				logradouro: "Avenida Paulista",
				numero: 1500,
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
				urlImagem: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
				cep: "20040002",
				uf: "RJ",
				cidade: "Rio de Janeiro",
				bairro: "Centro",
				logradouro: "Rua da Assembleia",
				numero: 10,
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Dino",
			especie: mapEspecieToEnum("Réptil"),
			raca: "Iguana Verde",
			sexo: "M",
			porte: "G",
			dataNascimento: new Date("2022-09-12"),
			descricao: "Exige cuidados especiais e aquecimento.",
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
			adotado: false,
			ongId: ong2.id,
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
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
			adotado: false,
			ongId: ong1.id,
			updatedAt: now,
		},
		{
			nome: "Nemo",
			especie: mapEspecieToEnum("Peixe"),
			raca: "Peixe-Palhaço",
			sexo: "M",
			porte: "P",
			dataNascimento: new Date("2025-01-01"),
			descricao: "Precisa de aquário marinho estabilizado.",
			urlImagem: "http://esselinkseraverdadeiroalgumdia.com",
			adotado: true,
			ongId: ong2.id,
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
