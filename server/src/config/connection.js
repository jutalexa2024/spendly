"use strict";
// import mongoose from 'mongoose';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoURI = process.env.MONGODB_URI || "";
// // Wrap Mongoose around local connection to MongoDB
// mongoose.connect(mongoURI);
// // Export connection
// export default mongoose.connection;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config(); // Load environment variables
const mongoURI = process.env.MONGODB_URI || "";
if (!mongoURI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
}
const db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connection successful!");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
    finally {
        mongoose_1.default.connection.close(); // Close the connection after testing
    }
});
exports.default = db();
