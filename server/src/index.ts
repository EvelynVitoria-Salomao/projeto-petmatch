import { Elysia } from "elysia";
import ongRoutes from "@/routes/ong-route";
import petRoutes from "@/routes/pet-route";
import { DatabaseError, EntityNotFound } from "@/types/custom-errors";

const app = new Elysia()
	.error({
		DATABASE_ERROR: DatabaseError,
		ENTITY_NOT_FOUND: EntityNotFound,
	})
	.onError(({ code, error, status }) => {
		switch (code) {
			case "ENTITY_NOT_FOUND":
				return status(404, error.message);
			case "DATABASE_ERROR":
				return status(500, error.message);
		}
	})
	.group("/api", (api) => {
		api.use(petRoutes);
		api.use(ongRoutes);
		return api;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
