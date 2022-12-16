import { Router } from "express";
import { signUp } from "../controllers/AuthControllers.js";
import { signUpMdw } from "../middlewares/AuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", signUpMdw, signUp);


export {authRouter};