import generator from "generate-password";
import connection from "../../database/database.js";

export function generateKey() {
    const password = generator.generate({
        length: 32,
        numbers: true,
        symbols: true,
    });

    return password;
}

export async function checkDataExistence(table, object) {
    const columns = Object.keys(object);
    const values = Object.values(object);

    const parsedColumnsValues = columns.map((col, ind) => `"${col}" = $${ind + 1}`).join(" AND ");

    const query = `
        SELECT ${columns.join(",")} 
        FROM ${table}
        WHERE ${parsedColumnsValues}
    `;

    const { rows } = await connection.query(query, values);

    return rows.length > 0;
}

export async function insertIntoDatabase(table, object) {
    const columns = Object.keys(object);
    const values = Object.values(object);

    const parsedColumns = columns.map((col) => `"${col}"`);

    const query = `
        INSERT INTO ${table}
            (${parsedColumns})
            VALUES (${values.map((value, ind) => `$${ind + 1}`).join(",")})
    `;

    await connection.query(query, values);
}


export async function getDataFromDatabase(table, filter) {
    const columns = Object.keys(filter);
    const values = Object.values(filter);

    const parsedColumnsValues = columns.map((col, ind) => `"${col}" = $${ind + 1}`).join(" AND ");

    const query = `
        SELECT * 
        FROM ${table}
        WHERE ${parsedColumnsValues}
    `;

    const { rows } = await connection.query(query, values);

    return rows;
}


export async function deleteSession(userId) {
    await connection.query(
        `
        DELETE FROM sessions
        WHERE "userId" = $1
    `,
        [userId]
    );
}