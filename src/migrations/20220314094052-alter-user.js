'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    alter table "users" add column "wallet_id" int
  `)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      alter table "users" drop column "wallet_id"
    `)
  }
};
