const Joi = require("joi");

const authSchema = Joi.object().keys({
    username: Joi.string()
    .lowercase()
    .required()
    .label('Username is required '),

    email: Joi.string()
    .email()
    .lowercase()
    .required()
    .label('Email must be valid'),

    password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{7,30}$/)
    .min(7)
    .required()
    .label('Password length must exceed 7 and include atleast a number,a character,uppercase,lowercase, and a special character. eg:!$%'),

    address : Joi.string()
    .required()
    .label("Addres is required")
    ,
    role: Joi.string()
})

module.exports= authSchema