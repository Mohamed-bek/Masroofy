import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactions.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Update CORS configuration to handle multiple origins
const allowedOrigins = [
  "https://masroofy-jade.vercel.app",
  "http://localhost:5173", // Vite's default development port
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/transaction", transactionRouter);
app.use("/user", userRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
