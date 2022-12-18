import connection, { sessionsTb, usersTb } from "../database.js";
import { checkDataExistence, getDataFromDatabase } from "../helpers/helpers.js";
import { signInSchema, signUpSchema } from "../models/AuthModels.js";
import jwt from "jsonwebtoken";

export async function signUpMdw(req, res, nex) {
    try {
        const userInfoToValidate = req.body;

        const userInfoValidated = await signUpSchema.validateAsync(userInfoToValidate);
        const { email } = userInfoValidated;
        const emailToCheck = { email };
        if (await checkDataExistence(usersTb, emailToCheck)) throw new Error("This email is taken");

        req.locals.userData = userInfoValidated;
        nex();
    } catch (err) {
        if (err.message === "This email is taken") res.status(409);
        //TODO CATCH JOI ERROR
        else res.status(400);
        res.send(err);
        console.log(err);
    }
}

export async function signInMdw(req, res, nex) {
    try {
        const userDataToValidate = req.body;
        const userDataValidated = await signInSchema.validateAsync(userDataToValidate);

        const { rows } = await connection.query(
            `
            SELECT * 
            FROM ${usersTb}
            WHERE email = $1
        `,
            userDataValidated.email
        );

        if (rows.length === 0) throw new Error("Inexistent user/password");

        req.locals.userData = rows[0];
        nex();
    } catch (err) {
        if (err.message === "Inexistent user/password") res.status(401);
        //TODO JOI VALIDATION ERROR
        else res.status(400);
        res.send(err);
        console.log(err);
    }
}

export async function checkAuthorization(req, res, nex) {
    try {
        const token = req.headers.Authorization?.replaceAll("Bearer ");
        const { userId } = jwt.decode(token);

        const sessionRow = await getDataFromDatabase(sessionsTb, { userId });

        if (sessionRow.length === 0) throw new Error("Not authenticated");

        const userDataRow = await getDataFromDatabase(usersTb, { id: userId });

        req.locals.userData = userDataRow[0];
        req.locals.session = sessionRow[0];

        nex();
    } catch (err) {
        res.send(err);
        console.log(err);
    }
}
