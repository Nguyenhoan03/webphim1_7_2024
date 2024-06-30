'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Linkfilm extends Model {
    static associate(models) {
      // define association here
    }
  }
  Linkfilm.init(
    {
      title: DataTypes.TEXT,
      episode: DataTypes.TEXT,
      linkfilm: DataTypes.TEXT,
    },
    {
      sequelize, // Ensure sequelize instance is passed here
      modelName: 'Linkfilm',
      tableName: 'linkfilms',
      timestamps: false, 
    }
  );
  return Linkfilm;
};
