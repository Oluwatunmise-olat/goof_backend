module.exports = (sequelize, DataTypes) => {
  const store_menus = sequelize.define(
    "store_menus",
    {
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      deactivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cover_image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      menu_name: {
        allowNull: false,
        required: true,
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      modelName: "store_menus",
      tableName: "store_menus",
      timestamps: true
    }
  );

  store_menus.associate = (models) => {
    store_menus.belongsTo(models.Store, {
      foreignKey: "store_id",
      sourceKey: "store_id",
      targetKey: "id"
    });

    store_menus.belongsToMany(models.week_days, {
      foreignKey: "menu_id",
      through: models.menu_availabilities,
      as: "days"
    })
  };

  return store_menus;
};
