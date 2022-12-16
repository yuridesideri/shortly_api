import generator from "generate-password";

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

    const { rows } = await connection.query(
        `
        SELECT ${table} 
        FROM users
        WHERE ${columns.map((col, ind) => `${col} = $${ind + 1}`).join(" AND ")}
    `,
        [...values]
    );
    return rows.length > 0 ? true : false;
}
