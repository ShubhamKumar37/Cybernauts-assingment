import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorHandler);
app.use(cors());

export { app };

