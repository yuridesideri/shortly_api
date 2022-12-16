import {config} from "dotenv";
import pkg from "pg";
config();
const connection = new pkg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shortlyapi',
    password: '4586',
    port: 5432,
})

export const usersTb = 'users';
export const sessionsTb = 'sessions';
export const linksTb = 'links';

export default connection;