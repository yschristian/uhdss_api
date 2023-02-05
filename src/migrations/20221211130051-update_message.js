'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('messages', 'id');
    await queryInterface.addConstraint('messages', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'message'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('messages', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('messages', 'message')
  }
};
