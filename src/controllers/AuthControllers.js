import * as bcrypt from "bcrypt";
import { sessionsTb, usersTb } from "../database.js";
import { insertIntoDatabase } from "../helpers/helpers.js";
import passGenerator from "generate-password";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const userData = res.locals.userData;
    try {
        const encryptedPassword = await bcrypt.hash(userData.password, 10);
        delete userData.password;
        delete userData.confirmPassword;
        const userToInsert = { ...userData, encryptedPassword };

        insertIntoDatabase(usersTb, userToInsert);

        res.sendStatus(201);
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}

export async function signIn(req, res) {
    try {
        const { id: userId } = res.locals.userData;

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

//TODO LOGOUT CONTROLLER