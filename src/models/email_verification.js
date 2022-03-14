const genCode = require("../utils/generate_code");

module.exports = (sequelize, DataTypes) => {
  const email_verification = sequelize.define(
    "email_verification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      code: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: () => {
          return genCode();
        }
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      expiry: {
        type: DataTypes.DATE,
        required: true
      }
    },
    {
      underscored: true,
      indexes: [{ fields: ["email"] }]
    }
  );
  email_verification.associate = (models) => {
    email_verification.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user"
    });
  };
  return email_verification;
};
