'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Institutions', {
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
      name: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      streeAddress: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      availableProgram: {
        type: DataTypes.STRING
      },
      scholarship: {
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
    await queryInterface.dropTable('Institutions');
  }
};