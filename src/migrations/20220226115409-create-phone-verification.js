"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "phone_verification" (
        "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
        "phone_number" varchar UNIQUE NOT NULL,
        "verified" boolean DEFAULT FALSE
      )
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phone_verification");
  }
};
