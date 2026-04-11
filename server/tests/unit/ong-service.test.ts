import { describe, expect, it, spyOn } from "bun:test";
import { ongRepository } from "@/repositories/ong-repository";
import { ongService } from "../../src/services/ong-service";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import type { OngRequest } from "@/types/ong-types";

const validOngRequest: OngRequest = {
	cnpj: "12345678000190",
	razaoSocial: "PetMatch LTDA",
	nomeFantasia: "PetMatch",
	telefone: "81999998888",
	whatsapp: "5581999998888",
	email: "contato@petmatch.com",
	site: "https://petmatch.com",
	instagram: "@petmatch",
	urlImagem: "https://petmatch.com/logo.png",
	cep: "50000000",
	uf: "PE",
	cidade: "Recife",
	bairro: "Boa Viagem",
	logradouro: "Rua das Flores",
	numero: 100,
};

describe("ongService", () => {
	it("lança EntityNotFound ao buscar ONG inexistente", async () => {
		spyOn(ongRepository, "getOngById").mockResolvedValueOnce([] as any);

		await expect(ongService.getOngById("ong-invalida")).rejects.toBeInstanceOf(
			EntityNotFound,
		);
	});

	it("lança DatabaseError quando createOng falha no repositório", async () => {
		spyOn(ongRepository, "createOng").mockRejectedValueOnce(new Error("db error"));

		await expect(
			ongService.createOng(validOngRequest, "user-1"),
		).rejects.toBeInstanceOf(DatabaseError);
	});

	it("lança EntityNotFound quando usuário não possui ONG", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([] as any);

		await expect(
			ongService.updateOng("ong-1", "user-1", { cidade: "Olinda" }),
		).rejects.toBeInstanceOf(EntityNotFound);
	});

	it("lança ForbiddenError quando ONG não pertence ao usuário", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([
			{ ongId: "ong-2", userId: "user-1" },
		] as any);

		await expect(
			ongService.updateOng("ong-1", "user-1", { cidade: "Olinda" }),
		).rejects.toBeInstanceOf(ForbiddenError);
	});

	it("retorna ONG atualizada quando usuário tem permissão", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([
			{ ongId: "ong-1", userId: "user-1" },
		] as any);
		const updateSpy = spyOn(ongRepository, "updateOng").mockResolvedValueOnce([
			{ id: "ong-1", cidade: "Olinda" },
		] as any);

		const result = await ongService.updateOng("ong-1", "user-1", {
			cidade: "Olinda",
		});

		expect(result).toBeDefined();
		expect((result as { id: string }).id).toBe("ong-1");
		expect(updateSpy).toHaveBeenCalledWith("ong-1", {
			cidade: "Olinda",
		});
	});
});
