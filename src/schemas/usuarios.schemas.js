import joi from "joi";

export const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().min(3).required()
})

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
})