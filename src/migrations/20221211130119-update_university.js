'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('universities', 'id');
    await queryInterface.addConstraint('universities', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'university'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('universities', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('universities', 'university')
  }
};
