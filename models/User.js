const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up mthod to run on instance data to check password this is synchronus but should use asyn for web apps
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


// define table columns and configuration
User.init(
    {
        // define an id column
        id: {
          // use the special Sequelize DataTypes object provide what type of data it is
          type: DataTypes.INTEGER,
          // this is the equivalent of SQL's `NOT NULL` option
          allowNull: false,
          // instruct that this is the Primary Key
          primaryKey: true,
          // turn on auto increment
          autoIncrement: true
        },
        // define a first name column
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,

        },
        // define a last name column
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,

        },
      
        // define an email column
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          // there cannot be any duplicate email values in this table
          unique: true,
          // if allowNull is set to false, we can run our data through validators before creating the table data
          validate: {
            isEmail: true
          }
        },
        // define a password column
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            // this means the password must be at least four characters long
            len: [4]
          }
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        height_feet: {
          type: DataTypes.INTEGER,
          allowNull: false,

        },
        height_inches: {
          type: DataTypes.INTEGER,
          allowNull: false,

        },
        birthday: {
          type: DataTypes.STRING,
          allowNull: false,

        },
        admin: {
          type: DataTypes.INTEGER,
          admin: Boolean
        }
      },
      {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            }
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
      }
    );

module.exports = User;