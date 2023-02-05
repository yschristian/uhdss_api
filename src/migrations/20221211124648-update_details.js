'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('details', 'id');
    await queryInterface.addConstraint('details', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'uuid_'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('details', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('details', 'uuid_')
  }
};
