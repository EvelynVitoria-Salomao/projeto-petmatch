import { Elysia, t } from "elysia";
import { betterAuthContext } from "@/routes/route-security";
import { ongService } from "@/services/ong-service";
import {
	GeneralErrorResponse,
	ValidationErrorResponse,
} from "@/types/custom-errors";
import {
	OngBodyParse,
	OngListResponse,
	OngQueryParamsParse,
	OngResponse,
} from "@/types/schemas/ong-schemas";

const ongRoutes = new Elysia({ prefix: "/ongs", tags: ["Ongs"] })
	.use(betterAuthContext)
	.get("/:id", async ({ params: { id } }) => ongService.getOngById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
		response: {
			200: t.Object(OngResponse.properties, { description: "ONG encontrada" }),
			404: t.Object(GeneralErrorResponse.properties, {
				description: "ONG não encontrada",
			}),
		},
		detail: {
			description: "Busca uma ONG por ID (sem autenticação)",
		},
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await ongService.createOng(body, user.id);
			return status(201, result);
		},
		{
			body: OngBodyParse,
			response: {
				201: t.Object(OngResponse.properties, {
					description: "ONG salva com sucesso",
				}),
				401: t.Undefined({ description: "Usuário não autenticado" }),
				422: t.Array(ValidationErrorResponse.items, {
					description: "Dados inválidos",
				}),
				500: t.Object(GeneralErrorResponse.properties, {
					description: "Ocorreu um erro ao salvar a ONG",
				}),
			},
			detail: {
				description:
					"Cria uma nova ONG para o usuário atual (autenticação necessária)",
			},
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, user }) =>
			ongService.updateOng(id, user.id, body),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(OngBodyParse),
			response: {
				200: t.Object(OngResponse.properties, {
					description: "ONG salva com sucesso",
				}),
				401: t.Undefined({ description: "Usuário não autenticado" }),
				403: t.Object(GeneralErrorResponse.properties, {
					description: "Usuário não tem permissão para alterar a ONG",
				}),
				404: t.Object(GeneralErrorResponse.properties, {
					description: "ONG não encontrada",
				}),
				422: t.Array(ValidationErrorResponse.items, {
					description: "Dados inválidos",
				}),
				500: t.Object(GeneralErrorResponse.properties, {
					description: "Ocorreu um erro ao salvar a ONG",
				}),
			},
			detail: {
				description:
					"Atualiza uma ONG usando dados completos ou parciais (autenticação necessária)",
			},
			auth: true,
		},
	)
	.get("/", async ({ query }) => ongService.getOngs(query), {
		query: OngQueryParamsParse,
		response: {
			200: t.Array(OngListResponse.items, { description: "ONGs encontradas" }),
		},
		detail: {
			description: "Busca uma lista de ONGs usando filtro (sem autenticação)",
		},
	});

export default ongRoutes;
