'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Details extends Model {
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'userId' ,as: "user" })
    }
  }
  Details.init({
     uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId:{
      type: DataTypes.UUID,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Status:  {
      type: DataTypes.STRING,
    },
    Gender:{
      type: DataTypes.STRING,
      enum:["female","male"],
      defaultValue:"gender"
    },
    Nationality: {
      type: DataTypes.STRING,
    },
    WhatsapNumber:{
      type: DataTypes.STRING,
      
    },
    CallNumber:  {
      type: DataTypes.STRING,
    },
    CountryToStudy:  {
      type: DataTypes.STRING,
    },
    EducationDegree:  {
       type: DataTypes.STRING,
       enum:["High School Certificate","Post graduate","Banchelors","masters"],
       defaultValue: "Education"
    },
    UniverstyToStudy:  {
      type: DataTypes.STRING,
    },
    Passport:{
      type: DataTypes.STRING
    },
    Transcript:{
      type: DataTypes.STRING
    },
    Diploma:{
      type: DataTypes.STRING
    },
    EnglishProficiency:{
      type: DataTypes.STRING
    },
    Recommandation:{
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: "details",
    modelName: 'Details',
  });
  return Details;
};