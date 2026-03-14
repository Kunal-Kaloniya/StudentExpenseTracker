import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/db.js";
import expenseRoutes from "./routes/expenses.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

connectDB()
    .then(() => {

        app.use('/api/expenses', expenseRoutes);
        app.use('/api/auth', authRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to MongoDB!");
    });