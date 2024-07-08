'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Linkfilm extends Model {
    static associate(models) {
      Linkfilm.belongsTo(models.Product, {
        foreignKey: 'title', // This is the title field in Linkfilm table
        targetKey: 'title', // This is the title field in Product table
        as: 'product'
      });
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
