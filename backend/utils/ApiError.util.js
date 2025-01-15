export class ApiError extends Error {
    constructor(statusCode, message = "There is a problem", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}