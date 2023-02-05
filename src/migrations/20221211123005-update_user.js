'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'id');
    await queryInterface.addConstraint('users', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'uuid'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('users', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('users', 'uuid')
  }
};
