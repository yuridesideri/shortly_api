import { nanoid } from "nanoid";
import connection, { linksTb } from "../database.js";
import { insertIntoDatabase } from "../helpers/helpers.js";

export async function shortenUrl(req, res) {
    try {
        const { id: createdByUserId } = res.locals.userData;
        const { url: originalUrl } = res.locals.url;
        const shortenedUrl = nanoid(8);

        await insertIntoDatabase(linksTb, { createdByUserId, originalUrl, shortenedUrl });
        res.status(201).send({ shortUlt: shortenedUrl });
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}

export async function getUrls(req, res) {
    try {
        const { linkId } = res.locals;

        const { rows } = await connection.query(
            `
                SELECT id, "shortenedUrl", "originalUrl"
                FROM links
                WHERE id = $1
            `,
            [linkId]
        );

        if (rows.length === 0) throw new Error("Url not found");

        const [{ id, shortenedUrl: shortUrl, originalUrl: url }] = rows;

        res.status(200).send({ id, shortUrl, url });
    } catch (err) {
        if (err.message === "Url not found") res.status(404);
        else res.status(400);
        res.send(err);
        console.log(err);
    }
}

export async function shortLink(req, res) {
    try {
        const { originalUrl: linkToRedirect, id } = res.locals.link;

        await connection.query(
            `
            UPDATE ${linksTb}
            SET "visitCount" += 1
            WHERE id = $1
        `,
            [id]
        );

        res.redirect(linkToRedirect);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

export async function deleteLink(req, res) {
    try {
        const { id } = req.params;

        connection.query(`
            DELETE 
            FROM ${linksTb}
            WHERE id = $1
        `, [id])

        res.sendStatus(204);
    } catch (err) {}
}
