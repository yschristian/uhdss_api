'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Notifications', 'id');
    await queryInterface.addConstraint('Notifications', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'notify'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('Notifications', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('Notifications', 'notify')
  }
};
