import * as Joi from '@hapi/joi'

export const userCreateScheme = Joi.object({
    login: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    name: Joi.string().min(3).required(),
});

export const userLoginScheme = Joi.object({
    login: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});
