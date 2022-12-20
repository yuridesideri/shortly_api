import { Router } from "express";
import { getUserLinks, rankUsers } from "../controllers/UsersController.js";
import { checkAuthorization } from "../middlewares/AuthMiddlewares.js";


const usersRouter = Router();

usersRouter.get("/users/me", checkAuthorization, getUserLinks);
usersRouter.get("/ranking", rankUsers);


export {usersRouter};