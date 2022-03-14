module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }
    },
    { underscored: true, timestamps: false }
  );
  Cart.associate = (models)=>{
    Cart.belongsTo(models.User, {
      foreignKey:"user_id",
      targetKey: "id",
      as: "user"
    })
  }
  return Cart;
};
