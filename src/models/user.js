const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
          // max: 13,
          // min: 13
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
      underscored: true,
      tableName: "users",
      indexes: [{ fields: ["email"] }]
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      targetKey: "id",
      as: "user_role"
    });

    User.belongsTo(models.Location, {
      foreignKey: "location_id",
      targetKey: "id",
      as: "location"
    });
  };

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
