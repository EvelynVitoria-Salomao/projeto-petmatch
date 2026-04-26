import { describe, expect, it, mock, spyOn } from "bun:test";
import { Elysia } from "elysia";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import { ongService } from "@/services/ong-service";

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

const { default: ongRoutes } = await import("@/routes/ong-route");

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
		.use(ongRoutes);
describe("ongRoutes", () => {
	it("retorna lista de ONGs no GET /ongs", async () => {
		const getOngsSpy = spyOn(ongService, "getOngs").mockResolvedValueOnce([
			{
				id: "ong-1",
				nomeFantasia: "PetMatch",
				urlImagem: "https://petmatch.com/logo.png",
				cidade: "Recife",
				estado: "PE",
				telefone: "81999998888",
				email: "contato@petmatch.com",
			},
		]);

		const response = await createTestApp().handle(
			new Request("http://localhost/ongs?nomeFantasia=Pet"),
		);

		expect(response.status).toBe(200);
		expect(getOngsSpy).toHaveBeenCalledWith(
			expect.objectContaining({ nomeFantasia: "Pet" }),
		);
		expect(await response.json()).toEqual([
			{
				id: "ong-1",
				nomeFantasia: "PetMatch",
				urlImagem: "https://petmatch.com/logo.png",
				cidade: "Recife",
				estado: "PE",
				telefone: "81999998888",
				email: "contato@petmatch.com",
			},
		]);
	});

	it("retorna 422 quando ID não é UUID válido", async () => {
		const getOngByIdSpy = spyOn(ongService, "getOngById");

		const response = await createTestApp().handle(
			new Request("http://localhost/ongs/id-invalido"),
		);

		expect(response.status).toBe(422);
		expect(getOngByIdSpy).not.toHaveBeenCalled();
	});

	it("retorna 404 quando getOngById lança EntityNotFound", async () => {
		spyOn(ongService, "getOngById").mockRejectedValueOnce(
			new EntityNotFound("ONG não encontrada"),
		);

		const response = await createTestApp().handle(
			new Request("http://localhost/ongs/123e4567-e89b-12d3-a456-426614174000"),
		);

		expect(response.status).toBe(404);
		expect(await response.text()).toContain("ONG não encontrada");
	});

	it("cria ONG no POST /ongs com contexto de usuário do macro auth", async () => {
		const createOngSpy = spyOn(ongService, "createOng").mockResolvedValueOnce({
			id: "ong-2",
			cnpj: "12345678000190",
			razaoSocial: "PetMatch LTDA",
			nomeFantasia: "PetMatch",
			telefone: "81999998888",
			whatsapp: null,
			email: "contato@petmatch.com",
			site: null,
			instagram: "@petmatch",
			urlImagem: "https://petmatch.com/logo.png",
			cep: "50000000",
			uf: "PE",
			cidade: "Recife",
			bairro: "Boa Viagem",
			logradouro: "Rua das Flores",
			numero: 100,
			userId: "user-test-id",
			createdAt: new Date("2024-01-01T00:00:00.000Z"),
			updatedAt: new Date("2024-01-01T00:00:00.000Z"),
		});

		const response = await createTestApp().handle(
			new Request("http://localhost/ongs", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					cnpj: "12345678000190",
					razaoSocial: "PetMatch LTDA",
					nomeFantasia: "PetMatch",
					telefone: "81999998888",
					email: "contato@petmatch.com",
					instagram: "@petmatch",
					urlImagem: "https://petmatch.com/logo.png",
					cep: "50000000",
					uf: "PE",
					cidade: "Recife",
					bairro: "Boa Viagem",
					logradouro: "Rua das Flores",
					numero: 100,
				}),
			}),
		);

		expect(response.status).toBe(201);
		expect(createOngSpy).toHaveBeenCalledTimes(1);

		const [_requestBody, userId] = createOngSpy.mock.calls[0] as [
			Record<string, unknown>,
			string,
		];
		expect(userId).toBe("user-test-id");
	});
});
