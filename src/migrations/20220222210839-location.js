"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE IF NOT EXISTS "locations" (
        "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
        "longitude" DECIMAL NOT NULL,
        "latitude" DECIMAL NOT NULL
      )
      `
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE "locations"
    `);
  }
};
