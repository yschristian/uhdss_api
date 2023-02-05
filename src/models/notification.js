'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({User}) {
      this.belongsTo(User,{foreignKey:"userId"})
    }
  }
  Notification.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING
    },
    userId:{
      type: DataTypes.UUID
    }
  },{
    sequelize,
    tableName: "Notifications",
    modelName: 'Notification',
  });
  return Notification;
};