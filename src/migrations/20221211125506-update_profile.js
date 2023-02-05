'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('profiles', 'id');
    await queryInterface.addConstraint('profiles', {
      fields: ['uuid'],
      type: 'primary key',
      name: 'user_profile'
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.addColumn('profiles', 'id', DataTypes.INTEGER, {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    });
    await queryInterface.removeConstraint('profiles', 'user_profile')
  }
};
