'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('universities', {
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
      coverImg: {
        type: DataTypes.STRING
      },
      gallery:{
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      universityName: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      summary:{
        type: DataTypes.TEXT,
      },
      faculities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: DataTypes.TEXT
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
    await queryInterface.dropTable('universities');
  }
};