import dbConnect from "./config/dbConnect.config.js";
import { app } from "./app.js";

dbConnect()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("DB connection error:", error);
    });
