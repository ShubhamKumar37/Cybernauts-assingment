import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorHandler);

export { app };

