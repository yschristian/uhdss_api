'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({User}) {
      this.belongsTo(User, { foreignKey: {
        name: "senderId",
      } ,as: "sender" 
    })
    this.belongsTo(User, { foreignKey: {
        name: "receiverId",
      } ,as: "receiver"
    })
    }
  }
  Message.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    senderId:{
      type: DataTypes.UUID,
      allowNull: false
    },
    receiverId:{
      type: DataTypes.UUID,
      allowNull: false
    },
    messages:{
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    tableName:"messages",
    modelName: 'Message',
  });
  return Message;
};