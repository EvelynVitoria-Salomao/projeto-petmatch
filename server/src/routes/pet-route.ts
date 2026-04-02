import { Elysia, t } from "elysia";
import { betterAuth } from "@/routes/route-security";
import { petService } from "@/services/pet-service";
import { EspecieEnum, PorteEnum, SexoEnum } from "@/types/pet-types";

const especieParse = Object.values(EspecieEnum).map((especie) =>
	t.Literal(especie),
);
const sexoParse = Object.values(SexoEnum).map((sexo) => t.Literal(sexo));
const porteParse = Object.values(PorteEnum).map((porte) => t.Literal(porte));
const queryParamsParse = {
	especie: t.Optional(t.Union(especieParse)),
	sexo: t.Optional(t.Union(sexoParse)),
	porte: t.Optional(t.Union(porteParse)),
	cidade: t.Optional(t.String()),
	nomeOng: t.Optional(t.String()),
};
const bodyParse = {
	nome: t.String(),
	especie: t.Union(especieParse),
	raca: t.String(),
	sexo: t.Union(sexoParse),
	porte: t.Union(porteParse),
	dataNascimento: t.Date(),
	descricao: t.String(),
	urlImagem: t.String(),
};

const petRoutes = new Elysia({ prefix: "/pets", tags: ["Pets"] })
	.use(betterAuth)
	.get("/", async ({ query }) => petService.getPets(query), {
		query: t.Object(queryParamsParse),
	})
	.get("/:id", async ({ params: { id } }) => petService.getPetById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await petService.createPet(body, user.id);
			return status(201, result);
		},
		{
			body: t.Object(bodyParse),
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body }) => petService.updatePet(id, body),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(t.Object(bodyParse)),
			auth: true,
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status }) => {
			await petService.deletePet(id);
			return status(204);
		},
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			auth: true,
		},
	);

export default petRoutes;
