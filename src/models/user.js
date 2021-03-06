const bcrypt = require("bcrypt");
const logger = require("../../logger/log");

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
        allowNull: false
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      indexes: [{ fields: ["email"] }],
      hooks: {
        afterCreate: async (instance, options) => {
          // generate user wallet and cart
          // await Wallet.create({ user_id: instance.id }); circular import ish
        }
      }
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      targetKey: "id",
      as: "roleData"
    });

    User.hasOne(models.Location, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "location"
    });

    User.hasOne(models.email_verification, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_email"
    });

    User.hasOne(models.Cart, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_cart"
    });

    User.hasOne(models.Wallet, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "wallet"
    });
  };

  User.makePassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    let hash;
    try {
      hash = await bcrypt.hash(password, salt);
    } catch (error) {
      logger.error(`
        Error hasing password [models/user.js]: makePassword (bcrypt)
      `);
    }
    return hash;
  };

  User.prototype.checkPassword = async function (user, rawPassword) {
    let valid;

    try {
      valid = await bcrypt.compare(rawPassword, user.password);
      return valid;
    } catch (error) {
      logger.error(`
        Error comparing password [models/user.js]: checkPassword (bcrypt)
      `);
    }
  };

  User.prototype.afterCreate = async (model, data, opt = false) => {
    if (opt) {
      return await model.create({ ...data }, opt);
    }
    return await model.create({ ...data });
  };

  return User;
};
