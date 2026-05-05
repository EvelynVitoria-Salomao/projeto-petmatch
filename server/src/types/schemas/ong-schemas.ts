import { t } from "elysia";

export const OngBodyParse = t.Object({
	cnpj: t.String({
		minLength: 14,
		maxLength: 14,
		error: "CNPJ deve ter 14 dígitos sem pontuação",
	}),
	razaoSocial: t.String({
		maxLength: 255,
		error: "Razão Social deve ser um texto com até 255 caracteres",
	}),
	nomeFantasia: t.String({
		maxLength: 255,
		error: "Nome Fantasia deve ser um texto com até 255 caracteres",
	}),
	telefone: t.String({
		minLength: 10,
		maxLength: 11,
		error: "Telefone deve ter entre 10 e 11 dígitos",
	}),
	whatsapp: t.Optional(
		t.String({
			minLength: 12,
			maxLength: 13,
			error: "WhatsApp deve ter entre 12 e 13 dígitos",
		}),
	),
	email: t.String({
		maxLength: 255,
		format: "email",
		error: "Email em formato inválido ou excede 255 caracteres",
	}),
	site: t.Optional(
		t.String({
			maxLength: 255,
			error: "Site deve ser um texto com até 255 caracteres",
		}),
	),
	instagram: t.String({
		maxLength: 255,
		error: "Instagram deve ser um texto com até 255 caracteres",
	}),
	urlImagem: t.String({
		error: "URL da imagem é obrigatória e deve ser um texto",
	}),
	cep: t.String({
		minLength: 8,
		maxLength: 8,
		error: "CEP deve ter 8 dígitos",
	}),
	uf: t.String({
		minLength: 2,
		maxLength: 2,
		error: "UF deve ter 2 caracteres",
	}),
	cidade: t.String({
		maxLength: 255,
		error: "Cidade deve ser um texto com até 255 caracteres",
	}),
	bairro: t.String({
		maxLength: 255,
		error: "Bairro deve ser um texto com até 255 caracteres",
	}),
	logradouro: t.String({
		maxLength: 255,
		error: "Logradouro deve ser um texto com até 255 caracteres",
	}),
	numero: t.Numeric({ error: "Número deve ser um valor numérico" }),
});

export const OngQueryParamsParse = t.Object({
	cnpj: t.Optional(t.String()),
	razaoSocial: t.Optional(t.String()),
	nomeFantasia: t.Optional(t.String()),
	telefone: t.Optional(t.String()),
	whatsapp: t.Optional(t.String()),
	email: t.Optional(t.String()),
	site: t.Optional(t.String()),
});

export const OngListResponse = t.Array(
	t.Object({
		id: t.String(),
		nomeFantasia: t.String(),
		urlImagem: t.String(),
		cidade: t.String(),
		estado: t.String(),
		telefone: t.String(),
		email: t.String(),
	}),
);

export const OngResponse = t.Object({
	id: t.String(),
	cnpj: t.String(),
	razaoSocial: t.String(),
	nomeFantasia: t.String(),
	telefone: t.String(),
	whatsapp: t.Union([t.String(), t.Null()]),
	email: t.String(),
	site: t.Union([t.String(), t.Null()]),
	instagram: t.String(),
	urlImagem: t.String(),
	cep: t.String(),
	uf: t.String(),
	cidade: t.String(),
	bairro: t.String(),
	logradouro: t.String(),
	numero: t.Number(),
	userId: t.String(),
	createdAt: t.Date(),
	updatedAt: t.Date(),
});
