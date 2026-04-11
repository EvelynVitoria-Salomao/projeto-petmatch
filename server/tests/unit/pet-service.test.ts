import { describe, expect, it, spyOn } from "bun:test";
import { ongRepository } from "@/repositories/ong-repository";
import { petRepository } from "@/repositories/pet-repository";
import { petService } from "../../src/services/pet-service";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
} from "@/types/custom-errors";
import { EspecieEnum, PorteEnum, SexoEnum, type PetRequest } from "@/types/pet-types";

const validPetRequest: PetRequest = {
	nome: "Rex",
	especie: EspecieEnum.Cachorro,
	raca: "SRD",
	sexo: SexoEnum.M,
	porte: PorteEnum.M,
	dataNascimento: new Date("2022-01-01T00:00:00.000Z"),
	descricao: "Muito dócil",
	urlImagem: "https://petmatch.com/rex.jpg",
};

describe("petService", () => {
	it("lança EntityNotFound quando usuário não possui ONG", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([] as any);

		await expect(
			petService.createPet(validPetRequest, "user-1"),
		).rejects.toBeInstanceOf(EntityNotFound);
	});

	it("lança EntityNotFound ao buscar pet inexistente", async () => {
		spyOn(petRepository, "getPetById").mockResolvedValueOnce([] as any);

		await expect(petService.getPetById("pet-1")).rejects.toBeInstanceOf(
			EntityNotFound,
		);
	});

	it("lança ForbiddenError quando pet não pertence à ONG do usuário", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([
			{ ongId: "ong-1", userId: "user-1" },
		] as any);
		spyOn(petRepository, "getPetAndOngIds").mockResolvedValueOnce([
			{ petId: "pet-1", ongId: "ong-2" },
		] as any);

		await expect(
			petService.updatePet("pet-1", { nome: "Bolt" }, "user-1"),
		).rejects.toBeInstanceOf(ForbiddenError);
	});

	it("lança DatabaseError quando updatePet falha no repositório", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([
			{ ongId: "ong-1", userId: "user-1" },
		] as any);
		spyOn(petRepository, "getPetAndOngIds").mockResolvedValueOnce([
			{ petId: "pet-1", ongId: "ong-1" },
		] as any);
		spyOn(petRepository, "updatePet").mockRejectedValueOnce(new Error("db error"));

		await expect(
			petService.updatePet("pet-1", { nome: "Bolt" }, "user-1"),
		).rejects.toBeInstanceOf(DatabaseError);
	});

	it("deleta pet quando pertence à ONG do usuário", async () => {
		spyOn(ongRepository, "getOngAndUserIds").mockResolvedValueOnce([
			{ ongId: "ong-1", userId: "user-1" },
		] as any);
		spyOn(petRepository, "getPetAndOngIds").mockResolvedValueOnce([
			{ petId: "pet-1", ongId: "ong-1" },
		] as any);
		const deleteSpy = spyOn(petRepository, "deletePet").mockResolvedValueOnce([
			{ id: "pet-1" },
		] as any);

		await petService.deletePet("pet-1", "user-1");

		expect(deleteSpy).toHaveBeenCalledWith("pet-1");
	});
});
