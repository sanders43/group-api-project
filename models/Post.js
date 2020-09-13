const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}


Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      systolic_blood_pressure: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      diastolic_blood_pressure: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
      heart_rate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      exercise_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      exercise_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      water_consumed: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  
  module.exports = Post;