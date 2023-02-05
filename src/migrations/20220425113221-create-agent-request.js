'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('agentrequests', {
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
      AgencyName:{
       type: DataTypes.STRING
      },
      AgencyPhoneNumber :{
        type: DataTypes.STRING
        },
      AgencyLocationCountry :{
        type: DataTypes.STRING
      },
      AgencyCity :{
        type: DataTypes.STRING
      },
      Email :{
        type: DataTypes.STRING
      }, 
      approve:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('agentrequests');
  }
};