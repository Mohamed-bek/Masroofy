import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactions.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";

// Initialize environment variables
dotenv.config();

// Create Express application
const app = express();

// Configure middleware
app.use(
  cors({
    origin: "https://masroofy-jade.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
// We're moving this outside of a function to maintain a connection pool
let cachedDB = null;
const connectDB = async () => {
  if (cachedDB) {
    return cachedDB;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    cachedDB = db;
    console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Set up routes
app.use("/api/transaction", transactionRouter);
app.use("/api/user", userRouter);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the handler for Vercel
export default async function handler(req, res) {
  // Ensure database connection
  await connectDB();

  // Handle the request using our Express app
  return app(req, res);
}
