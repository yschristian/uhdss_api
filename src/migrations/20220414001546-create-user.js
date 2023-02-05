'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username:  {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      role :{
        type: DataTypes.STRING,
         enum:["agent","admin","superAdmin"] ,
         defaultValue: "user"
      },
      emailToken:{
        type: DataTypes.STRING
      },
      isVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
      },
      UniqueId:{
      type: DataTypes.STRING,
      unique:true
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
    await queryInterface.dropTable('users');
  }
};