const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_ratings: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 0
    },
    rating_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    current_rating: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      defaultValue: null
    },
    image: {
      type: DataTypes.STRING, 
      allow: true, 
      defaultValue: null
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

module.exports = Movie;
