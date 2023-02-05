'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate({User}){
      this.belongsTo(User, { foreignKey: 'userId' ,as: "user" })
    }
  }
  Profile.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cloudinary_id:{
      type: DataTypes.STRING
      },
    userId:{
        type: DataTypes.UUID,
        allowNull: false
      },
    avatar:{
      type: DataTypes.STRING
      },
      
  }, {
    sequelize,
    tableName:'profiles',
    modelName: 'Profile',
  });
  return Profile;
};