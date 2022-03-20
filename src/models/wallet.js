const { genCode } = require("../utils/generate_code");

module.exports = (sequelize, DataTypes) => {
  // Note: wallet becomes active upon pin setup
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      wallet_id: {
        type: DataTypes.STRING,
        defaultValue: genCode().slice(0, 8).toUpperCase(),
        unique: true,
        allowNull: false
      },
      pin: {
        // six digits pin
        type: DataTypes.STRING,
        required: true,
        defaultValue: null
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true,
      timestamps: true
    }
  );

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user"
    });
  };

  return Wallet;
};
