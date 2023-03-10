import { linksTb } from "../../database/database.js";
import { getDataFromDatabase } from "../helpers/helpers.js";
import { urlIdSchema, urlSchema } from "../models/UrlsModels.js";

export async function shortenUrlMdw(req, res, nex) {
    try {
        const urlToValidate = req.body;
        const validatedUrl = await urlSchema.validateAsync(urlToValidate);
        res.locals.url = validatedUrl;
        nex();
    } catch (err) {
        res.status(422);
        res.send(err);
        console.log(err);
    }
}

export async function getUrlsMdw(req, res, nex) {
    try {
        const { id } = req.params;
        const validatedId = await urlIdSchema.validateAsync(id);

        res.locals.linkId = parseInt(validatedId);

        nex();
    } catch (err) {
        res.status(404);
        res.send(err);
        console.log(err);
    }
}

export async function shortLinkMdw(req, res, nex) {
    try {
        const { shortUrl: shortenedUrl } = req.params;
        const [...rows] = await getDataFromDatabase(linksTb, { shortenedUrl });

        if (rows.length === 0) throw new Error("Link not found");

        res.locals.link = rows[0];

        nex();
    } catch (err) {
        if (err.messge === "Link not found") res.status(404);
        res.send(err);
        console.log(err);
    }
}
