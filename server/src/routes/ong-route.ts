import { Elysia, t } from "elysia";
import { betterAuth } from "@/routes/route-security";
import { ongService } from "@/services/ong-service";

const bodyParse = {
	cnpj: t.String(),
	razaoSocial: t.String(),
	nomeFantasia: t.String(),
	telefone: t.String(),
	whatsapp: t.String(),
	email: t.String(),
	site: t.Optional(t.String()),
	instagram: t.String(),
	urlImagem: t.String(),
	cep: t.String(),
	uf: t.String(),
	cidade: t.String(),
	bairro: t.String(),
	logradouro: t.String(),
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
	.use(betterAuth)
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
	})

export default ongRoutes;
