import connection, { linksTb, usersTb } from "../database.js";

export async function getUserLinks(req, res) {
    try {
        const { id } = res.locals.userData;

        const { rows } = await connection.query(
            `
            SELECT u.id, u.name, SUM(l."visitCount") AS "visitCount",
            (SELECT l.id, l."shortenedUrl" as "shortUrl", l."originalUrl" as "url", l."visitCount"
            FROM ${linksTb} l
            WHERE "createdByUserId" = $1) as "shortnedUrls"
            FROM ${usersTb} u
            WHERE u.id = $1
        `,
            [id]
        );

        res.status(200).send(rows[0]);

        if (rows.length === 0) throw new Error("");
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}


export async function rankUsers (req,res){
    try {
        const {rows} = await connection.query(`
            SELECT u.id, u.name, COUNT(l.id) AS "linksCount", SUM(l."visitCount")
            FROM ${usersTb} u
            LEFT JOIN ${linksTb} l ON u.id = l."createdByUserId"
            ORDER BY SUM (l."visitCount") LIMIT 10
        `)

        res.status(200).send(rows);
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}