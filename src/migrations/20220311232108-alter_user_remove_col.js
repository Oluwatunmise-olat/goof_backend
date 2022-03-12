"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      alter table "users" drop column "email_verified"
    `);
    await queryInterface.sequelize.query(`
      alter table "users" drop column "phone_verified"
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      alter table "users" add column "phone_verified" boolean false
    `);
    await queryInterface.sequelize.query(`
      alter table "users" add column "email_verified" boolean false
    `);
  }
};
