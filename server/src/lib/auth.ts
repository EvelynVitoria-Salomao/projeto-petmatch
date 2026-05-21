import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/database/connection"; // your drizzle instance
import * as schema from "@/database/schema";
import { sendEmail } from "@/lib/mail";

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
		autoSignIn: false,
		revokeSessionsOnPasswordReset: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			sendEmail({
				to: user.email,
				subject: "Redefinir senha",
				text: `Clique no link para redefinir a senha ${url}`,
			});
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			sendEmail({
				to: user.email,
				subject: "Verificação de e-mail",
				text: `Clique no link para verificar o e-mail ${url}`,
			});
		},
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
