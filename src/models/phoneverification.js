module.exports = (sequelize, DataTypes) => {
  const phone_verification = sequelize.define(
    "phone_verification",
    {
      phone_number: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { tableName: "phone_verification", timestamps: false }
  );
  return phone_verification;
};
