import { db } from '@/database/connection';
import { ong, pet, usuario } from '@database/schema';
import { eq } from 'drizzle-orm';

export async function seed() {
	// Clear existing data
	await db.delete(pet);
	await db.delete(usuario);
	await db.delete(ong);

	// Insert ONGs
	const [ong1, ong2] = await db.insert(ong).values([
		{
			cnpj: '12345678000199',
			razao_social: 'Associação Guardiões da Mata Atlântica',
			nome_fantasia: 'EcoVida',
			telefone: '1133445566',
			whatsapp: '551133445566',
			email: 'contato@ecovida.org.br',
			cep: '01310100',
			uf: 'SP',
			cidade: 'São Paulo',
			bairro: 'Bela Vista',
			logradouro: 'Avenida Paulista',
			numero: 1500,
			site: null,
		},
		{
			cnpj: '98765432000188',
			razao_social: 'Associação dos Amantes de Animais',
			nome_fantasia: 'Amigo Animal',
			telefone: '2122334455',
			whatsapp: null,
			email: 'contato@amigoanimal.org.br',
			cep: '20040002',
			uf: 'RJ',
			cidade: 'Rio de Janeiro',
			bairro: 'Centro',
			logradouro: 'Rua da Assembleia',
			numero: 10,
			site: 'https://www.amigoanimal.org',
		},
	]).returning();

	// Insert Pets
	await db.insert(pet).values([
		{
			nome: 'Dogão',
			especie: 'Cão',
			raca: 'Pitbull',
			sexo: 'M',
			porte: 'G',
			data_nascimento: new Date('2025-02-01'),
			descricao: 'Cão grande, amigável e preguiçoso',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong1.id,
		},
		{
			nome: 'Sujinho',
			especie: 'Gato',
			raca: 'Siamês',
			sexo: 'M',
			porte: 'M',
			data_nascimento: new Date('2024-05-01'),
			descricao: 'Gato muito enérgico',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong1.id,
		},
		{
			nome: 'Pipo',
			especie: 'Ave',
			raca: 'Calopsita',
			sexo: 'M',
			porte: 'P',
			data_nascimento: new Date('2024-01-10'),
			descricao: 'Assovia o hino do time e é muito manso.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong1.id,
		},
		{
			nome: 'Stuart',
			especie: 'Roedor',
			raca: 'Hamster Sírio',
			sexo: 'M',
			porte: 'P',
			data_nascimento: new Date('2024-11-20'),
			descricao: 'Adora correr na rodinha durante a noite.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong2.id,
		},
		{
			nome: 'Rex',
			especie: 'Cão',
			raca: 'Pastor Alemão',
			sexo: 'M',
			porte: 'G',
			data_nascimento: new Date('2021-03-30'),
			descricao: 'Ótimo para guarda, mas muito carinhoso.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong2.id,
		},
		{
			nome: 'Lola',
			especie: 'Coelho',
			raca: 'Mini Lop',
			sexo: 'F',
			porte: 'P',
			data_nascimento: new Date('2023-06-05'),
			descricao: 'Muito fofa, adora comer cenoura e feno.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'ADOTADO',
			ong_id: ong2.id,
		},
		{
			nome: 'Zazu',
			especie: 'Ave',
			raca: 'Papagaio Verdadeiro',
			sexo: 'M',
			porte: 'M',
			data_nascimento: new Date('2020-05-30'),
			descricao: 'Fala "bom dia" e imita o som do telefone.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong1.id,
		},
		{
			nome: 'Dino',
			especie: 'Réptil',
			raca: 'Iguana Verde',
			sexo: 'M',
			porte: 'G',
			data_nascimento: new Date('2022-09-12'),
			descricao: 'Exige cuidados especiais e aquecimento.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong2.id,
		},
		{
			nome: 'Amora',
			especie: 'Roedor',
			raca: 'Porquinho da Índia',
			sexo: 'F',
			porte: 'P',
			data_nascimento: new Date('2024-03-18'),
			descricao: 'Conversa fazendo barulhinhos quando vê comida.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'DISPONIVEL',
			ong_id: ong1.id,
		},
		{
			nome: 'Nemo',
			especie: 'Peixe',
			raca: 'Peixe-Palhaço',
			sexo: 'M',
			porte: 'P',
			data_nascimento: new Date('2025-01-01'),
			descricao: 'Precisa de aquário marinho estabilizado.',
			url_imagem: 'http://esselinkseraverdadeiroalgumdia.com',
			status: 'ADOTADO',
			ong_id: ong2.id,
		},
	]);

	// Insert Users
	await db.insert(usuario).values([
		{
			email: 'jonas@ecovida.org.br',
			senha: 'EssaSenhaSeraCriptografadaEmBreve',
			ong_id: ong1.id,
		},
		{
			email: 'raquel@amigoanimal.org.br',
			senha: 'EssaSenhaSeraCriptografadaEmBreve',
			ong_id: ong2.id,
		},
	]);

	console.log('Seed completed successfully!');
}