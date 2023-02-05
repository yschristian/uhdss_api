'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('visas', {
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
      fullName: {
        type: DataTypes.STRING
      },
      countryOfLocation: {
        type: DataTypes.STRING
      },
      typeOfVisa: {
        type: DataTypes.STRING,
        enum:["STUDY","BUSINESS", "VISIT","TOURIST"]
      },
      countryOfInterest: {
        type: DataTypes.STRING
      },
      passport: {
        type: DataTypes.STRING
      },
      photoImage: {
        type: DataTypes.STRING
      },
      invitationLetter: {
        type: DataTypes.STRING
      },
      admissionLetter: {
        type: DataTypes.STRING
      },
      financialSupport: {
        type: DataTypes.STRING
      },
      hotelBooking: {
        type: DataTypes.STRING
      },
      travelPurpose: {
        type: DataTypes.STRING,
      },      
      flightTickets: {
        type: DataTypes.STRING
      },
      otherDocuments: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('visas');
  }
};