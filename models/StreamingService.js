const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StreamingService extends Model {}

StreamingService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'streamingservice',
  }
);

module.exports = StreamingService;
