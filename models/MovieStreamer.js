const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MovieStreamer extends Model {}

MovieStreamer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'movie',
        key: 'id',
      },
    },
    streamingservice_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'streamingservice',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'moviestreamer',
  }
);

module.exports = MovieStreamer;
