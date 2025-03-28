// import mongoose from 'mongoose';

// const mongoURI = process.env.MONGODB_URI || "";

// // Wrap Mongoose around local connection to MongoDB
// mongoose.connect(mongoURI);

// // Export connection
// export default mongoose.connection;


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
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("✅ MongoDB connection successful!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after testing
  }
};

export default connectDB();
