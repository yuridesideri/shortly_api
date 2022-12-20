import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthControllers.js";
import { signInMdw, signUpMdw, deleteOldSessionLogin } from "../middlewares/AuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", signUpMdw, signUp);
authRouter.post("/signin", signInMdw, deleteOldSessionLogin, signIn);

export {authRouter};