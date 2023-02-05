'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visa.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
    },
    countryOfLocation: {
      type: DataTypes.STRING,
    },
    typeOfVisa: {
      type: DataTypes.STRING,
      enum:["STUDY","BUSINESS", "VISIT","TOURIST"]
    },
    countryOfInterest: {
      type: DataTypes.STRING,
    },
    passport: {
      type: DataTypes.STRING,
    },
    photoImage: {
      type: DataTypes.STRING,
    },
    invitationLetter: {
      type: DataTypes.STRING,
    },
    admissionLetter: {
      type: DataTypes.STRING,
    },
    financialSupport: {
      type: DataTypes.STRING,
    },
    hotelBooking: {
      type: DataTypes.STRING,
    },
    travelPurpose: {
      type: DataTypes.STRING,
    },
    flightTickets: {
      type: DataTypes.STRING,
    },
    otherDocuments: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName:'visas',
    modelName: 'Visa',
  });
  return Visa;
};