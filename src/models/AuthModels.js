import Joi from "joi";

const arbitraryString = Joi.string().min(3).max(100).required()

export const signUpSchema = Joi.object().keys({
    name: arbitraryString,
    email: arbitraryString,
    password: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
}).required()


export const signInSchema = Joi.object().keys({
    email:  arbitraryString,
    password: Joi.string().min(8).max(100).required()
}).required();