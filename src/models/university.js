'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    static associate(models) {
      // define association here
    }
  }
  University.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    coverImg:{
      type: DataTypes.STRING,
    },
    gallery:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    universityName:{
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    summary:{
      type: DataTypes.TEXT,
    },
    faculities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description:{
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    tableName:'universities',
    modelName: 'University',
  });
  return University;
};