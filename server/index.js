import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactions.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"; // For ES modules, use fileURLToPath
import path from "path"; // Import path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://masroofy-jade.vercel.app",
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

if (process.env.NODE_ENV === "production") {
  // Serve static files from React app
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Serve index.html for all other requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
