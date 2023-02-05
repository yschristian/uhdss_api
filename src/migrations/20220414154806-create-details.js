'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('details', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        userId:{
          type: DataTypes.INTEGER,
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
        Nationality:  {
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
        createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('details');
  }
};