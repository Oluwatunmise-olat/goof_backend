'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      fields: ["wallet_id"],
      type: "foreign key",
      name: "wallet_id_fk",
      references: {
        table: "wallets",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["wallet_id"],
      name: "unique_user_wallet_id"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "wallet_id_fk")
    await queryInterface.removeConstraint("users", {
      name: "unique_user_wallet_id"
    })
  }
};
