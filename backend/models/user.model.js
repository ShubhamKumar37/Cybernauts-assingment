import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    position: {
        x: { type: Number, required: true, default: 0 },
        y: { type: Number, required: true, default: 0 },
    },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: [hobbySchema], default: [] },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;