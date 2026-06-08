import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/database/connection"; // your drizzle instance
import * as schema from "@/database/schema";
import { sendEmail } from "@/lib/mail";

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const betterAuthURL = process.env.BETTER_AUTH_URL as string;
const frontendURL = process.env.FRONTEND_URL as string;

if (!googleClientId) {
	throw new Error("Could not find environment variable GOOGLE_CLIENT_ID");
}
if (!googleClientSecret) {
	throw new Error("Could not find environment variable GOOGLE_CLIENT_SECRET");
}
if (!betterAuthURL) {
	throw new Error("Could not find environment variable BETTER_AUTH_URL");
}
if (!frontendURL) {
	throw new Error("Could not find environment variable FRONTEND_URL");
}

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
	socialProviders: {
		google: {
			prompt: "select_account consent",
			accessType: "offline",
			clientId: googleClientId,
			clientSecret: googleClientSecret,
		},
	},
	basePath: "/api/auth",
	baseURL: betterAuthURL,
	trustedOrigins: [frontendURL, betterAuthURL],
	session: {
		expiresIn: 60 * 60 * 24, //24 horas
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, //5 minutos
		},
	},
});
