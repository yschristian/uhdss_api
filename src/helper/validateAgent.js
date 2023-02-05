const Joi = require("@hapi/joi")

const agentSchema = Joi.object().keys({
  AgencyName:Joi.string()
  .required()
  .label('agency name is required! ')
  .optional(),

  AgencyPhoneNumber :Joi.string()
  .required()
 .label('Agency PhoneNumber is required! ')
 .optional(),
 
  AgencyLocationCountry :Joi.string()
  .required()
  .label('Agency Location Country is required! '),

  AgencyCity :Joi.string()
  .required()
  .label('Agency City is required! '),

  Email : Joi.string()
  .required()
  .label('Email is required! '),
})

module.exports = agentSchema