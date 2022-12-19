import { nanoid } from "nanoid";
import { linksTb } from "../database";
import { insertIntoDatabase } from "../helpers/helpers";

export async function shortenUrl (req, res) {
    try{
        const {id: createdByUserId} = req.locals.userData;
        const {url: originalUrl} = req.locals.url;
        const shortenedUrl = nanoid(8);


        await insertIntoDatabase(linksTb, {createdByUserId, originalUrl, shortenedUrl});
        res.status(201).send({shortUlt: shortenedUrl});
    } catch (err) {
        
        res.send(err);
        console.log(err);
    }
}