import mongoose from "mongoose";

// Define the schema for hobbies
const hobbySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for each hobby
    label: { type: String, required: true }, // Name or label of the hobby
}, { timestamps: true });

// Define the schema for the user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: [hobbySchema], default: [] }, // Array of hobbies
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
