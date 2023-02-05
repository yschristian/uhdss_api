const Joi = require("@hapi/joi")

const detailsSchema = Joi.object().keys({
      FirstName: Joi.string()
      .lowercase()
      .required()
      .label('First Name is required '),
  
      LastName: Joi.string()
      .lowercase()
      .required()
      .label('Last Name is required '),

      Status: Joi.string()
      .required()
      .label('You have to tell your status '),

      Gender: Joi.string()
      .required()
      .label('You have to tell your Gnder, Male or Female '),

      Nationality: Joi.string()
      .required()
      .label('You have to tell your Nationality '),

      WhatsapNumber: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(12)
      .label('Its better to give us whatsap number ')
      .optional(),

      CallNumber:Joi.string()
       .pattern(/^[0-9]+$/)
       .length(12)
      .label('Its better to give us call number ')
      .optional(),
      

      CountryToStudy: Joi.string()
      .lowercase()
      .required()
      .label('You have to tell your Country do you want to continue your study!'),

      EducationDegree: Joi.string()
      .required()
      .label('You have to tell your Education Level'),

      UniverstyToStudy: Joi.string()
      .required()
      .label('You have to tell where you want to study '),

      Passpoort: Joi.string()
      .required()
      .label('You have to tell where you want to study '),

      Transcript: Joi.string()
      .required()
      .label('You have to tell where you want to study '),

      Diplome: Joi.string()
      .required()
      .label('You have to tell where you want to study '),

      EnglishProficiency: Joi.string()
      .required()
      .label('You have to tell where you want to study ')
      .optional(),

      Recommandation: Joi.string()
      .required()
      .label('You have to tell where you want to study ')
      .optional()
})

module.exports = detailsSchema