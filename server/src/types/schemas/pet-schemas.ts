import { t } from "elysia";
import { especieEnum, porteEnum, sexoEnum } from "@/database/schema";
import { OngResponse } from "@/types/schemas/ong-schemas";

const EspecieParse = t.Union(
	especieEnum.enumValues.map((especie) => t.Literal(especie)),
	{
		error: `Espécie inválida. Valores permitidos: ${especieEnum.enumValues}`,
	},
);

const SexoParse = t.Union(
	sexoEnum.enumValues.map((sexo) => t.Literal(sexo)),
	{
		error: `Sexo inválido. Valores permitidos: ${sexoEnum.enumValues}`,
	},
);

const PorteParse = t.Union(
	porteEnum.enumValues.map((porte) => t.Literal(porte)),
	{
		error: `Porte inválido. Valores permitidos: ${porteEnum.enumValues}`,
	},
);

export const PetQueryParamsParse = t.Object({
	especie: t.Optional(EspecieParse),
	sexo: t.Optional(SexoParse),
	porte: t.Optional(PorteParse),
	cidade: t.Optional(t.String()),
	nomeOng: t.Optional(t.String()),
});

export const PetBodyParse = t.Object({
	nome: t.String({
		maxLength: 255,
		error: "Nome deve ser um texto com até 255 caracteres.",
	}),
	especie: EspecieParse,
	raca: t.String({
		maxLength: 100,
		error: "Raça deve ser um texto com até 100 caracteres.",
	}),
	sexo: SexoParse,
	porte: PorteParse,
	dataNascimento: t.Date({
		error: "Data de Nascimento deve estar no formato ISO (YYYY-MM-DD).",
	}),
	descricao: t.String({
		error: "A descrição é obrigatória e deve ser um texto.",
	}),
	imagem: t.File({
		type: ["image/jpeg", "image/png"],
		maxSize: "10m",
		error: "A imagem deve ser um arquivo JPEG ou PNG com no máximo 10MB.",
	}),
});

export const PetListResponse = t.Array(
	t.Object({
		id: t.String(),
		nome: t.String(),
		urlImagem: t.String(),
		cidade: t.String(),
		estado: t.String(),
	}),
);

export const PetResponse = t.Object({
	id: t.String(),
	nome: t.String(),
	especie: t.String(),
	raca: t.String(),
	sexo: t.String(),
	porte: t.String(),
	dataNascimento: t.Date(),
	descricao: t.String(),
	urlImagem: t.String(),
	adotado: t.Boolean(),
	ongId: t.String(),
	tutorId: t.Union([t.String(), t.Null()]),
	createdAt: t.Date(),
	updatedAt: t.Date(),
});

export const PetWithOngResponse = t.Object({
	pet: PetResponse,
	ong: OngResponse,
});
