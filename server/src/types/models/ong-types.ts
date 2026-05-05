import type { UnwrapSchema } from "elysia";
import type { OngBodyParse, OngQueryParamsParse } from "@/types/schemas/ong-schemas";

export type OngRequest = UnwrapSchema<typeof OngBodyParse>;

export type OngQueryParams = UnwrapSchema<typeof OngQueryParamsParse>;
