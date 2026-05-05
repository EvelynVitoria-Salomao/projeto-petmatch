import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import ongRoutes from "@/routes/ong-route";
import petRoutes from "@/routes/pet-route";
import { betterAuthRoutes } from "@/routes/route-security";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
	formatError,
	formatValidationError,
} from "@/types/custom-errors";
import { OpenAPI } from "./lib/auth-openapi";

const app = new Elysia()
	.error({
		DATABASE_ERROR: DatabaseError,
		ENTITY_NOT_FOUND: EntityNotFound,
		FORBIDDEN_ERROR: ForbiddenError,
	})
	.onError(({ code, error, status }) => {
		switch (code) {
			case "ENTITY_NOT_FOUND":
				return status(404, formatError(error));
			case "DATABASE_ERROR":
				return status(500, formatError(error));
			case "FORBIDDEN_ERROR":
				return status(403, formatError(error));
			case "VALIDATION":
				return status(422, formatValidationError(error));
		}
	})
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
				tags: [
					{
						name: "Pets",
					},
					{
						name: "Ongs",
					},
				],
			},
		}),
	)
	.use(betterAuthRoutes)
	.group("/api", (api) => {
		api.use(petRoutes);
		api.use(ongRoutes);
		return api;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
