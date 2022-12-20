import Joi from "joi";


export const urlSchema = Joi.object().keys({
    url: Joi.string().uri().required()
}).required();

export const urlIdSchema = Joi.string().regex(/^\d+$/).required()