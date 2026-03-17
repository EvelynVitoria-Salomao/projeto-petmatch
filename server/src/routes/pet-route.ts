import { Elysia, t } from "elysia";
import { petService } from "@/services/pet-service";

const petRoutes = new Elysia({ prefix: "/pets" })
	.get("/", async () => petService.getPets())
	.get("/:id", async ({ params: { id } }) => petService.getPetById(id), {
		params: t.Object({ id: t.Numeric() }),
	});

export default petRoutes;
