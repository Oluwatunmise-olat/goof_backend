module.exports = (sequelize, DataTypes) => {
  const modifiers = sequelize.define(
    "modifiers",
    {
      description: {
        type: DataTypes.STRING(200),
        allowNull: false,
        required: true
      },
      required: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "menu_categories",
          fields: ["id"]
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      min_selection: {
        type: DataTypes.INTEGER,
        allowNull: false.valueOf,
        required: true
      },
      max_selection: {
        type: DataTypes.INTEGER,
        allowNull: false.valueOf,
        required: true
      }
    },
    {
      underscored: true,
      timestamps: true,
      modelName: "modifiers",
      tableName: "modifiers"
    }
  );

  modifiers.associate = (models) => {
    modifiers.belongsTo(models.menu_categories, {
      foreignKey: "category_id",
      sourceKey: "category_id",
      targetKey: "id",
      as: "modifiers"
    });
  };
  return modifiers;
};
