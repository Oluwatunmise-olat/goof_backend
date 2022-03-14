'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("wallets", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id_fk",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint("wallets", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_user_id"
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("wallets", "user_id")
    await queryInterface.removeConstraint("wallets", "user_id_fk")
    await queryInterface.removeConstraint("wallets", {
      name: "unique_user_id"
    })

  }
};
