"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("wallets", "user_id");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("wallets", "user_id", {
      type: Sequelize.STRING
    });
  }
};
