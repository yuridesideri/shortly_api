import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthControllers.js";
import { checkAuthorization, signInMdw, signUpMdw } from "../middlewares/AuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", signUpMdw, signUp);
authRouter.post("/signin", signInMdw ,checkAuthorization, signIn);

export {authRouter};