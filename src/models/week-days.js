module.exports = (sequelize, DataTypes) => {
  const week_days = sequelize.define(
    "week_days",
    {
      name: {
        type: DataTypes.ENUM({
          values: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
          ]
        })
      }
    },
    {
      underscored: true,
      timestamps: true,
      modelName: "week_days",
      tableName: "week_days"
    }
  );
  week_days.associate = (models) => {
    week_days.belongsToMany(models.store_menus, {
      through: models.menu_availabilities,
      foreignKey: "week_day_id",
      as: "day_menus"
    });
  };
  return week_days;
};
