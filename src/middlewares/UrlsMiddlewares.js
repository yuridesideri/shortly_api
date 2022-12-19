import { urlSchema } from "../models/UrlsModels.js";

export async function shortenUrlMdw (req,res,nex) {
    try {
        const {url: urlToValidate} = req.body;
        const validatedUrl = await urlSchema.validateAsync(urlToValidate);
        req.locals.url = validatedUrl;
        nex()
    } catch (err) {
        res.status(422);
        res.send(err);
        console.log(err);
    }
}