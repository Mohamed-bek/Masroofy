import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactions.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import path from "path";

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

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
