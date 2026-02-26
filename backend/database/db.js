import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("MongoDB connected successfully | DB Host: ", connectionInstance.connection.host);
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
}

export { connectDB };