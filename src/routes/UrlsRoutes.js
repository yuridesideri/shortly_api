import { Router } from "express";
import { shortenUrl } from "../controllers/UrlsController.js";
import { checkAuthorization } from "../middlewares/AuthMiddlewares.js";
import { shortenUrlMdw } from "../middlewares/UrlsMiddlewares.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkAuthorization, shortenUrlMdw, shortenUrl)

export {urlsRouter};