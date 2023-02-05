'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('messages',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
       },
       uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
        senderId:{
          type: DataTypes.STRING,
          allowNull: false
        },
        receiverId:{
          type: DataTypes.STRING,
          allowNull: false
        },
        messages:{
          type: DataTypes.STRING,
        },    
        time: {
          type: DataTypes.DATE,
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
    await queryInterface.dropTable('messages');
  }
};