import connection, { linksTb, usersTb } from "../../database/database.js";

export async function getUserLinks(req, res) {
    try {
        const { id } = res.locals.userData;

        const { rows: linkRows } = await connection.query(
            `
            SELECT id, "shortenedUrl" as "shortUrl", "originalUrl" as "url", "visitCount"
            FROM ${linksTb} l
            WHERE "createdByUserId" = $1
        `,
            [id]
        );

        const { rows: [userRow]} = await connection.query(`
            SELECT u.id, u.name, SUM(l."visitCount") as "visitCount"
            FROM ${usersTb} u
            LEFT JOIN ${linksTb} l ON u.id = l."createdByUserId"
            WHERE u.id = $1
            GROUP BY u.id
        `, [id])

        const objectToSend = {...userRow, shortenedUrls: linkRows}

        res.status(200).send(objectToSend);

    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}


export async function rankUsers (req,res){
    try {
        const {rows} = await connection.query(`
            SELECT u.id, u.name, COUNT(l.id) AS "linksCount", SUM(l."visitCount") as "visitCount"
            FROM ${usersTb} u
            LEFT JOIN ${linksTb} l ON u.id = l."createdByUserId"
            GROUP BY u.id
            ORDER BY SUM (l."visitCount") LIMIT 10
        `)

        res.status(200).send(rows);
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}