import { createAuthClient } from "better-auth/react";

const apiUrl = import.meta.env.VITE_API_URL;

if(!apiUrl) {
    throw new Error("Could not find environment variable VITE_API_URL");
}

export const authClient = createAuthClient({
    baseURL: apiUrl,
    basePath: "/api/auth",
});