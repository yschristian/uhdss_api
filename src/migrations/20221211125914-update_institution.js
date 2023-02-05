'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Institutions', 'id');
    await queryInterface.addConstraint('Institutions', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'institute'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('Institutions', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('Institutions', 'institute')
  }
};
