'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      alter table "wallets" add column "user_id" int
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      alter table "wallets" drop column "user_id"
    `)
  }
};
