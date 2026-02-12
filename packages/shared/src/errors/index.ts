export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  CONFLICT: "CONFLICT",
  INTERNAL: "INTERNAL",
} as const;

export function unauthorized(message = "Unauthorized") {
  return new AppError(ErrorCodes.UNAUTHORIZED, message, 401);
}

export function forbidden(message = "Forbidden") {
  return new AppError(ErrorCodes.FORBIDDEN, message, 403);
}

export function notFound(message = "Not found") {
  return new AppError(ErrorCodes.NOT_FOUND, message, 404);
}

export function badRequest(message = "Bad request") {
  return new AppError(ErrorCodes.BAD_REQUEST, message, 400);
}

export function conflict(message = "Conflict") {
  return new AppError(ErrorCodes.CONFLICT, message, 409);
}

export function internal(message = "Internal server error") {
  return new AppError(ErrorCodes.INTERNAL, message, 500);
}
