import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthControllers.js";
import { signInMdw, signUpMdw, checkTokenForLogin } from "../middlewares/AuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", signUpMdw, signUp);
authRouter.post("/signin", signInMdw, checkTokenForLogin, signIn);

export {authRouter};