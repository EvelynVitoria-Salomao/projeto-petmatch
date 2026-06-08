import { createAuthClient } from "better-auth/react";
import { apiUrl } from "./environment";

export const authClient = createAuthClient({
    baseURL: apiUrl,
    basePath: "/api/auth",
});