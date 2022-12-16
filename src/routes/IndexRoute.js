import { Router } from "express";
import { authRouter } from "./AuthRoutes.js";

const globalRouter =  Router();
globalRouter.use(authRouter);

export default globalRouter;