const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        required: true,
        allowNull: false,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone_number: {
        unique: true,
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
          min: 13,
          max: 13
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          min: 5
        }
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "",
        required: false
      }
    },
    {
      tableName: "users",
      indexes: [{ fields: ["email"] }]
    }
  );

  User.associate = function (models) {};

  User.makePassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    let hash;
    try {
      hash = await bcrypt.hash(password, salt);
    } catch (error) {
      // log error
    }
    return hash;
  };

  User.prototype.checkPassword = async function (password) {
    const self = this;
    let valid;

    try {
      valid = await bcrypt.compare(password, self.password);
    } catch (error) {
      // log error
    }

    return valid;
  };

  return User;
};
