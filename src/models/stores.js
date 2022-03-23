module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define(
    "Store",
    {
      store_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      store_cover: {
        allowNull: true,
        required: false,
        type: DataTypes.STRING
      },
      store_avatar: {
        allowNull: true,
        required: false,
        type: DataTypes.STRING
      },
      store_phone_no: {
        type: DataTypes.STRING,
        validate: {
          max: { args: [13], msg: "Maximum length of phone number must be 13" },
          min: { args: [13], msg: "Minimum length of phone number must be 13" }
        }
      },
      is_banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        required: true
      }
    },
    {
      underscored: true,
      timestamps: true,
      modelName: "Store",
      tableName: "stores"
    }
  );
  stores.associate = (models) => {
    stores.belongsTo(models.vendors, {
      foreignKey: "vendor_id",
      targetKey: "id"
    });
  };
  return stores;
};
