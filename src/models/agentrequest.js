'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgentRequest extends Model {
    static associate(models){
      
    }
  }
  AgentRequest.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
      	AgencyName:{
          type: DataTypes.STRING
        },
      	AgencyPhoneNumber :{
          type: DataTypes.STRING
        },
      	AgencyLocationCountry :{
          type: DataTypes.STRING
        },
      	AgencyCity :{
          type: DataTypes.STRING
        },  
      	Email :{
          type: DataTypes.STRING
        }, 
        approve:{
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      
  }, {
    sequelize,
    tableName:"agentrequests",
    modelName: 'AgentRequest',
  });
  return AgentRequest;
};