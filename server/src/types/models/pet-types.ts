import type { UnwrapSchema } from "elysia";
import type { PetBodyParse, PetQueryParamsParse } from "@/types/schemas/pet-schemas";

export type PetQueryParams = UnwrapSchema<typeof PetQueryParamsParse>;

export type PetRequest = UnwrapSchema<typeof PetBodyParse>;
