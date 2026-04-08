import { Elysia, t } from "elysia";
import { betterAuthContext } from "@/routes/route-security";
import { ongService } from "@/services/ong-service";

const bodyParse = {
	cnpj: t.String({ minLength: 14, maxLength: 14 }),
	razaoSocial: t.String({ maxLength: 255 }),
	nomeFantasia: t.String({ maxLength: 255 }),
	telefone: t.String({ minLength: 10, maxLength: 11 }),
	whatsapp: t.Optional(t.String({ minLength: 12, maxLength: 13 })),
	email: t.String({ maxLength: 255, format: "email" }),
	site: t.Optional(t.String({ maxLength: 255 })),
	instagram: t.String({ maxLength: 255 }),
	urlImagem: t.String(),
	cep: t.String({ minLength: 8, maxLength: 8 }),
	uf: t.String({ minLength: 2, maxLength: 2 }),
	cidade: t.String({ maxLength: 255 }),
	bairro: t.String({ maxLength: 255 }),
	logradouro: t.String({ maxLength: 255 }),
	numero: t.Numeric(),
};

const queryParamsParse = {
	cnpj: t.Optional(t.String()),
	razaoSocial: t.Optional(t.String()),
	nomeFantasia: t.Optional(t.String()),
	telefone: t.Optional(t.String()),
	whatsapp: t.Optional(t.String()),
	email: t.Optional(t.String()),
	site: t.Optional(t.String()),
};

const ongRoutes = new Elysia({ prefix: "/ongs", tags: ["Ongs"] })
	.use(betterAuthContext)
	.get("/:id", async ({ params: { id } }) => ongService.getOngById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await ongService.createOng(body, user.id);
			return status(201, result);
		},
		{
			body: t.Object(bodyParse),
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, user }) =>
			ongService.updateOng(id, user.id, body),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(t.Object(bodyParse)),
			auth: true,
		},
	)
	.get("/", async ({ query }) => ongService.getOngs(query), {
		query: t.Object(queryParamsParse),
	});

export default ongRoutes;
