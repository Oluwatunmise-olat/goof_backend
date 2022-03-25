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
          len: [13, 13]
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
    stores.belongsTo(models.Vendor, {
      foreignKey: "vendor_id",
      targetKey: "id"
    });
  };
  return stores;
};
