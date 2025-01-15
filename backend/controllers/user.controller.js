import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = asyncHandler(async (req, res) => {
    const { userName } = req.body;
    if (!userName) {
        throw new ApiError(400, "userName are required");
    }
    const user = await User.create({ userName });
    return res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

export const getAllUsers = asyncHandler(async (_, res) => {
    const users = await User.find();
    return res.status(200).json(new ApiResponse(200, "Users fetched successfully", users));
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userName, nodes, edges } = req.body;
    const user = await User.findByIdAndUpdate(
        id,
        { $set: { userName, nodes, edges } },
        { new: true }
    );
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});
