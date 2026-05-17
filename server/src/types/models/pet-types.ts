import type { InferInsertModel } from "drizzle-orm";
import type { UnwrapSchema } from "elysia";
import type { pet } from "@/database/schema";
import type {
	PetBodyParse,
	PetQueryParamsParse,
} from "@/types/schemas/pet-schemas";

export type PetQueryParams = UnwrapSchema<typeof PetQueryParamsParse>;

export type PetRequest = UnwrapSchema<typeof PetBodyParse>;

export type PetInsert = InferInsertModel<typeof pet>;

export type PetUpdate = Partial<PetInsert>;
