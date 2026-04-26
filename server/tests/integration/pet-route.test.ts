import { describe, expect, it, mock, spyOn } from "bun:test";
import { Elysia } from "elysia";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import { petService } from "@/services/pet-service";
import { EspecieEnum, PorteEnum, SexoEnum } from "@/types/pet-types";

const betterAuthContextMock = new Elysia({
	name: "better-auth-context-test",
}).macro({
	auth: {
		resolve() {
			return {
				user: { id: "user-test-id" },
				session: { id: "session-test-id" },
			};
		},
	},
});

mock.module("@/routes/route-security", () => ({
	betterAuthContext: betterAuthContextMock,
	betterAuthRoutes: new Elysia({ name: "better-auth-routes-test" }),
}));

const { default: petRoutes } = await import("@/routes/pet-route");

const createTestApp = () =>
	new Elysia()
		.error({
			DATABASE_ERROR: DatabaseError,
			ENTITY_NOT_FOUND: EntityNotFound,
			FORBIDDEN_ERROR: ForbiddenError,
		})
		.onError(({ code, error, status }) => {
			switch (code) {
				case "ENTITY_NOT_FOUND":
					return status(404, error.message);
				case "DATABASE_ERROR":
					return status(500, error.message);
				case "FORBIDDEN_ERROR":
					return status(403, error.message);
			}
		})
		.use(petRoutes);
describe("petRoutes", () => {
	it("retorna lista de pets no GET /pets", async () => {
		const getPetsSpy = spyOn(petService, "getPets").mockResolvedValueOnce([
			{
				id: "pet-1",
				nome: "Rex",
				urlImagem: "https://petmatch.com/rex.jpg",
				cidade: "Recife",
				estado: "PE",
			},
		]);

		const response = await createTestApp().handle(
			new Request("http://localhost/pets?cidade=Recife"),
		);

		expect(response.status).toBe(200);
		expect(getPetsSpy).toHaveBeenCalledWith(
			expect.objectContaining({ cidade: "Recife" }),
		);
		expect(await response.json()).toEqual([
			{
				id: "pet-1",
				nome: "Rex",
				urlImagem: "https://petmatch.com/rex.jpg",
				cidade: "Recife",
				estado: "PE",
			},
		]);
	});

	it("retorna 422 quando query param enum é inválido", async () => {
		const getPetsSpy = spyOn(petService, "getPets");

		const response = await createTestApp().handle(
			new Request("http://localhost/pets?especie=Dragao"),
		);

		expect(response.status).toBe(422);
		expect(getPetsSpy).not.toHaveBeenCalled();
	});

	it("retorna 404 quando getPetById lança EntityNotFound", async () => {
		spyOn(petService, "getPetById").mockRejectedValueOnce(
			new EntityNotFound("Pet não encontrado"),
		);

		const response = await createTestApp().handle(
			new Request("http://localhost/pets/123e4567-e89b-12d3-a456-426614174000"),
		);

		expect(response.status).toBe(404);
		expect(await response.text()).toContain("Pet não encontrado");
	});

	it("cria pet no POST /pets com contexto de usuário do macro auth", async () => {
		const createPetSpy = spyOn(petService, "createPet").mockResolvedValueOnce({
			id: "pet-2",
			nome: "Luna",
			especie: EspecieEnum.Gato,
			raca: "SRD",
			sexo: SexoEnum.F,
			porte: PorteEnum.P,
			dataNascimento: new Date("2023-01-01T00:00:00.000Z"),
			descricao: "Calma",
			urlImagem: "https://petmatch.com/luna.jpg",
			adotado: false,
			ongId: "ong-1",
			tutorId: null,
			createdAt: new Date("2024-01-01T00:00:00.000Z"),
			updatedAt: new Date("2024-01-01T00:00:00.000Z"),
		});

		const response = await createTestApp().handle(
			new Request("http://localhost/pets", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					nome: "Luna",
					especie: EspecieEnum.Gato,
					raca: "SRD",
					sexo: SexoEnum.F,
					porte: PorteEnum.P,
					dataNascimento: "2023-01-01T00:00:00.000Z",
					descricao: "Calma",
					urlImagem: "https://petmatch.com/luna.jpg",
				}),
			}),
		);

		expect(response.status).toBe(201);
		expect(createPetSpy).toHaveBeenCalledTimes(1);

		const [requestBody, userId] = createPetSpy.mock.calls[0] as [
			Record<string, unknown>,
			string,
		];
		expect(userId).toBe("user-test-id");
		expect(requestBody.nome).toBe("Luna");
		expect(requestBody.dataNascimento).toBeInstanceOf(Date);
	});
});
