import { Router } from "express";
import { getUrls, shortenUrl } from "../controllers/UrlsController.js";
import { checkAuthorization } from "../middlewares/AuthMiddlewares.js";
import { getUrlsMdw, shortenUrlMdw } from "../middlewares/UrlsMiddlewares.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkAuthorization, shortenUrlMdw, shortenUrl)
urlsRouter.get("/urls/:id", getUrlsMdw, getUrls);

export {urlsRouter};