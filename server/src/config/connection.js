import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config(); // Load environment variables
const mongoURI = process.env.MONGODB_URI || "";
if (!mongoURI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connection successful!");
        return mongoose.connection;
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
export default connectDB;
