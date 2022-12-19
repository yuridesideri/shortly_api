import { Router } from "express";
import { authRouter } from "./AuthRoutes.js";
import { urlsRouter } from "./UrlsRoutes.js";
import { usersRouter } from "./UsersRoutes.js";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(urlsRouter);
globalRouter.use(usersRouter);

export default globalRouter;
