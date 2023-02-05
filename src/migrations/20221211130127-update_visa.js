'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('visas', 'id');
    await queryInterface.addConstraint('visas', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'visa'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('visas', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('visas', 'visa')
  }
};
