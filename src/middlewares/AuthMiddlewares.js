import connection, { usersTb } from "../database.js";
import { signUpSchema } from "../models/AuthModels.js";

export async function signUpMdw(res, res, nex) {
    try {
        const userInfoToValidate = req.body;

        const userInfoValidated = await signUpSchema.validateAsync(userInfoToValidate);
        const { email } = userInfoValidated;
        const emailToCheck = { email };
        if (checkDataExistence(usersTb, emailToCheck)) throw new Error("This email is taken");

        res.locals.userData = userInfoValidated;
        nex();
    } catch (err) {
        res.send(err);
        console.log(err);
    }
}
