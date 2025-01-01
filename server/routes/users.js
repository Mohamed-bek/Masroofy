import { Router } from "express";
import auth from "../middleware/auth.js";
import { Register, Login, GetMe } from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.get("/me", auth, GetMe);

export default userRouter;
