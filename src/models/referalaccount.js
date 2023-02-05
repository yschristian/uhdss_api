'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReferalAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReferalAccount.init({
    fullName: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    passportor_idnumber: DataTypes.STRING,
    account_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReferalAccount',
  });
  return ReferalAccount;
};