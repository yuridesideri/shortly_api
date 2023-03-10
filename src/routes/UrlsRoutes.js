import { Router } from "express";
import { deleteLink, getUrls, shortenUrl, shortLink } from "../controllers/UrlsController.js";
import { checkAuthorization, deleteLinkMdw } from "../middlewares/AuthMiddlewares.js";
import { getUrlsMdw, shortenUrlMdw, shortLinkMdw } from "../middlewares/UrlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkAuthorization, shortenUrlMdw, shortenUrl);
urlsRouter.get("/urls/:id", getUrlsMdw, getUrls);
urlsRouter.get("/urls/open/:shortUrl", shortLinkMdw, shortLink)
urlsRouter.delete("/urls/:id", checkAuthorization, deleteLinkMdw, deleteLink);

export { urlsRouter };
