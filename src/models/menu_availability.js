module.exports = (sequelize, DataTypes) => {
  const menu_availabilities = sequelize.define(
    "menu_availabilities",
    {
      open_time: {
        type: DataTypes.TIME,
        required: true,
        allowNull: false
      },
      close_time: {
        type: DataTypes.TIME,
        required: true,
        allowNull: false
      },
      week_day_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "week_days",
          key: "id"
        },
        onDelete: "set null",
        onUpdate: "cascade",
        unique: "unique_availabilty_day_id"
      },
      menu_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "store_menus",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique_avaialablity_menu_id"
      }
    },
    {
      underscored: true,
      timestamps: true,
      modelName: "menu_availbilities",
      tableName: "menu_availabilities"
    }
  );

  menu_availabilities.associate = (models) => {
    menu_availabilities.belongsTo(models.store_menus, {
      foreignKey: "menu_id",
      targetKey: "id"
    });
    menu_availabilities.belongsTo(models.week_days, {
      foreignKey: "week_day_id",
      targetKey: "id"
    });
  };
  return menu_availabilities;
};
