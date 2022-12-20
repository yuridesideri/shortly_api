import connection, { linksTb, sessionsTb, usersTb } from "../../database/database.js";
import { checkDataExistence, deleteSession, getDataFromDatabase } from "../helpers/helpers.js";
import { signInSchema, signUpSchema } from "../models/AuthModels.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpMdw(req, res, nex) {
    try {
        const userInfoToValidate = req.body;

        const userInfoValidated = await signUpSchema.validateAsync(userInfoToValidate);
        const { email } = userInfoValidated;
        const emailToCheck = { email };
        if (await checkDataExistence(usersTb, emailToCheck)) throw new Error("This email is taken");

        res.locals.userData = userInfoValidated;
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
        const { email, password } = userDataValidated;

        const userDataRow = await getDataFromDatabase(usersTb, { email });

        if (userDataRow.length === 0) throw new Error("Inexistent user/password");

        const isMatch = await bcrypt.compare(password, userDataRow[0].encryptedPassword);

        if (!isMatch) throw new Error("Inexistent user/password");

        res.locals.userData = userDataRow[0];

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
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) throw new Error("Not authenticated");

        const { userId } = jwt.decode(token);

        const sessionRow = await getDataFromDatabase(sessionsTb, { userId });

        if (sessionRow.length === 0) throw new Error("Not authenticated");
        jwt.verify(token, sessionRow[0].tokenSignature);

        const userDataRow = await getDataFromDatabase(usersTb, { id: userId });

        res.locals.userData = userDataRow[0];
        res.locals.session = sessionRow[0];

        nex();
    } catch (err) {
        if (err.message === "Not authenticated") res.status(401);
        res.send(err);
        console.log(err);
    }
}

export async function deleteLinkMdw(req, res, nex) {
    try {
        const { id } = req.params;
        const { id: userId } = res.locals.userData;

        const { rows } = await getDataFromDatabase(linksTb, { id });

        if (rows.legnth === 0) throw new Error("Inexistent link");

        if (rows[0].createdByUserId !== userId) throw new Error("Unauthorized");

        nex();
    } catch (err) {
        if (err.message === "Inexistent link") res.status(404);
        else res.status(401);
        res.send(err);
        console.log(err);
    }
}

export async function deleteOldSessionLogin(req, res, nex) {
    try {
        const { id: userId } = res.locals.userData;

        await deleteSession(userId);

        nex();
    } catch (err) {
        res.status(400);
        res.send(err);
        console.log(err);
    }
}
