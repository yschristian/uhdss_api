'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('agentrequests', 'id');
    await queryInterface.addConstraint('agentrequests', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'agent_request'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('agentrequests', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('agentrequests', 'agent_request')
  }
};
