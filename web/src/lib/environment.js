const apiUrl = import.meta.env.VITE_API_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

if(!apiUrl) {
    throw new Error("Could not find environment variable VITE_API_URL");
}
if(!frontendUrl) {
    throw new Error("Could not find environment variable VITE_FRONTEND_URL");
}

export { apiUrl, frontendUrl };