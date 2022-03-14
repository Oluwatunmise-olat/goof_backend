

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("wallets", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_user_id",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint("wallets", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_wallet_user_id"
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("wallets", "fk_user_id")
    await queryInterface.removeConstraint("wallets", {
      name: "unique_wallet_user_id"
    })
  }
};
