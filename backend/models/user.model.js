import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    // age: { type: Number, required: true },
    nodes: { type: String }, // Array of hobbies
    edges: { type: String }, // Array of hobbies
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
