import type { InferInsertModel } from "drizzle-orm";
import type { UnwrapSchema } from "elysia";
import type { ong } from "@/database/schema";
import type {
	OngBodyParse,
	OngQueryParamsParse,
} from "@/types/schemas/ong-schemas";

export type OngRequest = UnwrapSchema<typeof OngBodyParse>;

export type OngQueryParams = UnwrapSchema<typeof OngQueryParamsParse>;

export type OngInsert = InferInsertModel<typeof ong>;

export type OngUpdate = Partial<OngInsert>;
