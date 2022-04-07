module.exports = (sequelize, DataTypes) => {
  const menu_category = sequelize.define(
    "menu_categories",
    {
      item_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        required: true
      },
      description: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        required: true,
        allowNull: false
      },
      cover_image: {
        type: DataTypes.STRING,
        allowNull: true,
        required: false
      },
      deactivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      menu_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "store_menus",
          fields: ["id"]
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      }
    },
    {
      underscored: true,
      timestamps: true,
      modelName: "menu_categories",
      tableName: "menu_categories"
    }
  );

  menu_category.associate = (models) => {
    menu_category.hasMany(models.modifiers, {
      foreignKey: "category_id",
      targetKey: "category_id",
      sourceKey: "id",
      as: "menu_categories"
    });
  };
  return menu_category;
};
