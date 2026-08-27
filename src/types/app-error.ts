export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode: number, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this, this.constructor);
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

// ─── Domain / Business Errors ────────────────────────────────────────────────

export class NotFoundError extends AppError {
	constructor(message: string) {
		super(message, 404);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string) {
		super(message, 401);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string) {
		super(message, 403);
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}
