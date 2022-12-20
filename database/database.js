import {config} from "dotenv";
import pkg from "pg";
config();
const connection = new pkg.Pool({
    connectionString: process.env.DB_URL
})

export const usersTb = 'users';
export const sessionsTb = 'sessions';
export const linksTb = 'links';

export default connection;