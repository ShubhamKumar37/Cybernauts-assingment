import { ApiError } from "../utils/ApiError.util.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message, errors: err.errors });
    }
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [err.message],
    });
};