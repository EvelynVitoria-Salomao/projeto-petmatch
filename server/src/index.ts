import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import ongRoutes from "@/routes/ong-route";
import petRoutes from "@/routes/pet-route";
import { betterAuth } from "@/routes/route-security";
import {
	DatabaseError,
	EntityNotFound,
	ForbiddenError,
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
				return status(404, error.message);
			case "DATABASE_ERROR":
				return status(500, error.message);
			case "FORBIDDEN_ERROR":
				return status(403, error.message);
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
	.use(betterAuth)
	.group("/api", (api) => {
		api.use(petRoutes);
		api.use(ongRoutes);
		return api;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
