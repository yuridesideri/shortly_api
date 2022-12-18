import * as bcrypt from "bcrypt";
import connection, { sessionsTb, usersTb } from "../database.js";
import { insertIntoDatabase } from "../helpers/helpers.js";
import passGenerator from "generate-password";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const userData = req.locals.userData;
    try {
        const encryptedPassword = bcrypt.hashSync(userData.password, 20);
        delete userData.password;
        delete userData.confirmPassword;

        const userToInsert = { ...userData, encryptedPassword };

        insertIntoDatabase(usersTb, userToInsert);

        res.sendStatus(201);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
}

export async function signIn(req, res) {
    try {
        const { id: userId } = req.locals.userData;

        const tokenSignature = passGenerator.generate({
            length: 20,
            numbers: true,
            symbols: true,
        });

        const token = jwt.sign({ userId }, tokenSignature, { expiresIn: "1h" });
        await insertIntoDatabase(sessionsTb, { userId, tokenSignature });

        res.status(200);
        res.send(token);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}
