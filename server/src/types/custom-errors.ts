import { t, type UnwrapSchema, type ValidationError } from "elysia";

export class DatabaseError extends Error {}

export class EntityNotFound extends Error {}

export class ForbiddenError extends Error {}

export const ValidationErrorResponse = t.Array(
	t.Object({
		field: t.String(),
		message: t.String(),
		invalidValue: t.Any(),
	}),
);

export const GeneralErrorResponse = t.Object({ message: t.String() });

type ValidationErrorItem = UnwrapSchema<typeof ValidationErrorResponse.items>;

export function formatValidationError(
	validationError: Readonly<ValidationError>,
) {
	const uniqueErrors = new Map<string, ValidationErrorItem>();
	validationError.all.forEach((error) => {
		const field = error.path.substring(1);
		uniqueErrors.set(field, {
			field: field,
			message: error.schema.error + "",
			invalidValue: error.value || null,
		});
	});
	return Array.from(uniqueErrors.values());
}

export function formatError(error: Readonly<Error>) {
	return {
		message: error.message,
	};
}
