const Joi = require("@hapi/joi")

const instuteSchema = Joi.object().keys({
    universityName: Joi.required()
    .label("name of instutions is required !"),

    country:Joi.required()
    .label("Location is required!"), 

    city:  Joi.required()
    .label("City of your School is required!"),

    streeAddress: Joi.required()
    .label("name of instutions is required !"),

    website:Joi.required()
    .label("Website is required !"),

    email:  Joi.required()
    .label("Email of instution is required!"),

    availableProgram: Joi.required()
    .label("Tell about Aavilable program !"),

    scholarship: Joi.required()
    .label("Tell about Schorlaship you provid!"),
})
module.exports = instuteSchema;