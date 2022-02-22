"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "roles" (
      "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
      "name" varchar UNIQUE NOT NULL
    )
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  }
};
