import { Elysia, t } from "elysia";
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

const ongRoutes = new Elysia({ prefix: "/ongs" })
	.get("/:id", async ({ params: { id } }) => ongService.getOngById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
	})
	.post(
		"/",
		async ({ body, status }) => {
			const result = await ongService.createOng(body);
			return status(201, result);
		},
		{
			body: t.Object(bodyParse),
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body }) => ongService.updateOng(id, body),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(t.Object(bodyParse)),
		},
	);

export default ongRoutes;
