import { Elysia, t } from "elysia";
import { betterAuthContext } from "@/routes/route-security";
import { petService } from "@/services/pet-service";
import {
	GeneralErrorResponse,
	ValidationErrorResponse,
} from "@/types/custom-errors";
import {
	PetBodyParse,
	PetListResponse,
	PetQueryParamsParse,
	PetResponse,
	PetWithOngResponse,
} from "@/types/schemas/pet-schemas";

const petRoutes = new Elysia({ prefix: "/pets", tags: ["Pets"] })
	.use(betterAuthContext)
	.get("/", async ({ query }) => petService.getPets(query), {
		query: PetQueryParamsParse,
		response: {
			200: t.Array(PetListResponse.items, { description: "Pets encontrados" }),
			422: t.Array(ValidationErrorResponse.items, {
				description: "Parâmetros enums inválidos",
			}),
		},
		detail: {
			description: "Busca uma lista de pets usando filtro (sem autenticação)",
		},
	})
	.get("/:id", async ({ params: { id } }) => petService.getPetById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
		response: {
			200: t.Object(PetWithOngResponse.properties, {
				description: "Pet encontrado com informações da ONG",
			}),
			404: t.Object(GeneralErrorResponse.properties, {
				description: "Pet não encontrado",
			}),
		},
		detail: {
			description:
				"Busca um pet por ID juntamente com dados da ONG (sem autenticação)",
		},
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await petService.createPet(body, user.id);
			return status(201, result);
		},
		{
			body: PetBodyParse,
			response: {
				201: t.Object(PetResponse.properties, {
					description: "Pet salvo com sucesso",
				}),
				401: t.Undefined({ description: "Usuário não autenticado" }),
				422: t.Array(ValidationErrorResponse.items, {
					description: "Dados inválidos",
				}),
				500: t.Object(GeneralErrorResponse.properties, {
					description: "Ocorreu um erro ao salvar o pet",
				}),
			},
			detail: {
				description:
					"Cria um novo pet para a ONG do usuário autenticado (autenticação necessária)",
			},
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, user }) =>
			petService.updatePet(id, body, user.id),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(PetBodyParse),
			response: {
				200: t.Object(PetResponse.properties, {
					description: "Pet salvo com sucesso",
				}),
				401: t.Undefined({ description: "Usuário não autenticado" }),
				403: t.Object(GeneralErrorResponse.properties, {
					description: "Usuário não tem permissão para alterar o pet",
				}),
				422: t.Array(ValidationErrorResponse.items, {
					description: "Dados inválidos",
				}),
				500: t.Object(GeneralErrorResponse.properties, {
					description: "Ocorreu um erro ao salvar o pet",
				}),
			},
			detail: {
				description:
					"Atualiza um pet usando dados completos ou parciais (autenticação necessária)",
			},
			auth: true,
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status, user }) => {
			await petService.deletePet(id, user.id);
			return status(204, undefined);
		},
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			response: {
				204: t.Undefined({ description: "Pet deletado com sucesso" }),
				401: t.Undefined({ description: "Usuário não autenticado" }),
				403: t.Object(GeneralErrorResponse.properties, {
					description: "Usuário não tem permissão para deletar o pet",
				}),
				404: t.Object(GeneralErrorResponse.properties, {
					description: "Pet não encontrado",
				}),
			},
			detail: {
				description: "Deleta um pet (autenticação necessária)",
			},
			auth: true,
		},
	);

export default petRoutes;
