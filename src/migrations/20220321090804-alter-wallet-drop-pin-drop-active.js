"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("wallets", "pin", { transaction: t }),
        queryInterface.removeColumn("wallets", "active", { transaction: t })
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "wallets",
          "pin",
          { type: Sequelize.STRING, required: true },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "wallets",
          "active",
          { type: Sequelize.BOOLEAN, defaultValue: false },
          { transaction: t }
        )
      ]);
    });
  }
};
