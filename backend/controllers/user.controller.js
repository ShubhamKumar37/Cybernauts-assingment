import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = asyncHandler(async (req, res) => {
    const { username, age } = req.body;
    if (!username || !age) {
        throw new ApiError(400, "Username and age are required");
    }
    const user = await User.create({ username, age });
    res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, age, hobbies } = req.body;
    const user = await User.findByIdAndUpdate(
        id,
        { username, age, hobbies },
        { new: true, runValidators: true }
    );
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});
