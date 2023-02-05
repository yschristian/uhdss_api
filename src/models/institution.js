'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Institution.init({
    name: {
     type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
     },
    city:  {
      type: DataTypes.STRING,
     },
    streeAddress: {
      type: DataTypes.STRING,
     },
    website: {
      type: DataTypes.STRING,
     },
    email:  {
      type: DataTypes.STRING,
     },
    availableProgram: {
      type: DataTypes.STRING,
     },
    scholarship:  {
      type: DataTypes.STRING,
     },
  }, {
    sequelize,
    tableName: 'institutions',
    modelName: 'Institution',
  });
  return Institution;
};