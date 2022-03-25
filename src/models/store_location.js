module.exports = (sequelize, DataTypes) => {
  const storeLocation = sequelize.define(
    "store_location",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      is_landmark: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      place_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: "store_location",
      tableName: "stores_location",
      underscored: true,
      timestamps: true
    }
  );
  storeLocation.associate = (models) => {
    storeLocation.belongsTo(models.Store, {
      foreignKey: "id",
      targetKey: "id"
    });
  };
  return storeLocation;
};
