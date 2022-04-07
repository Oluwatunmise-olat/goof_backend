module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("wallets", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_wallet_user_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("wallets", "unique_wallet_user_id");
  }
};
