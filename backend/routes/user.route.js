import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers, // Added getAllUsers route
  updateUserName,
} from "../controllers/user.controller.js";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get a specific user by ID
router.get("/:id", getUser);

// Get all users (Added this route to match the controller's getAllUsers)
router.get("/", getAllUsers);

// Update a user by ID
router.put("/:id", updateUser);
router.put("/names/:id", updateUserName);

// Delete a user by ID
router.delete("/:id", deleteUser);

export default router;
