import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/database/connection"; // your drizzle instance
import * as schema from "@/database/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
		schema: schema,
	}),
	advanced: {
		database: {
			generateId: false,
		},
	},
	plugins: [openAPI()],
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	basePath: "/api/auth",
	session: {
		expiresIn: 60 * 60 * 24, //24 horas
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, //5 minutos
		},
	},
});
