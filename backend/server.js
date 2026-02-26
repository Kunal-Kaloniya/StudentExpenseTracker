import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/db.js";
import expenseRoutes from "./routes/expenses.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

connectDB()
    .then(() => {

        app.use('/api/expenses', expenseRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to MongoDB!");
    });