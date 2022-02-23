"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "permissions" (
        "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
        "can" varchar NOT NULL UNIQUE
      )
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP TABLE "permissions"
    `);
  }
};
