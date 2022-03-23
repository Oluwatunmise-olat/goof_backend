module.exports = (sequelize, DataTypes) => {
  const vendor = sequelize.define(
    "Vendor",
    {
      status: {
        type: DataTypes.ENUM({
          values: ["Approved", "Unapproved"]
        }),
        defaultValue: "Unapproved"
      },
      docs: {
        type: DataTypes.STRING,
        allowNull: false
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      }
    },
    {
      underscored: true,
      timestamp: true,
      modelName: "Vendor",
      tableName: "vendors"
    }
  );
  vendor.associate = (models) => {
    vendor.belongsTo(models.User, {
      foreignKey: "owner",
      targetKey: "id"
    });
  };
  return vendor;
};
