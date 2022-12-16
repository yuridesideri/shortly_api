import * as bcrypt from "bcrypt";
import { usersTb } from "../database.js";
import { insertIntoDatabase } from "../helpers/helpers.js";

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
