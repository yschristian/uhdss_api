'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Details,Message,Profile,Notification}) {
      this.hasOne(Details , {foreignKey: "userId" ,as: "details"})
      this.hasOne(Profile,{foreignKey: "userId" ,as: "profile"})
      this.hasMany(Message , {
        foreignKey: {
          name: "senderId",
        } ,
        as: "message_sent",
        onDelete: "cascade"
      }) 
      this.hasMany(Message , {
        foreignKey: {
          name: "receiverId",
        } ,
        as: "message_received",
        onDelete: "cascade"
      })
     this.hasOne(Notification,{foreignKey:"userId"})
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username:  {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      
    },
    address:  {
      type: DataTypes.STRING,
    },
    role :{
      type: DataTypes.STRING,
       enum:["agent","admin","superAdmin"] ,
       defaultValue: "client"
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
    }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};