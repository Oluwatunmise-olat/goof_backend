"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
        "firstname" varchar NOT NULL,
        "lastname" varchar NOT NULL,
        "email" varchar UNIQUE NOT NULL,
        "password" varchar NOT NULL,
        "phone_number" varchar(13) UNIQUE NOT NULL,
        "avatar" varchar,
        "location_id" int,
        "role_id" int
      )   `
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
