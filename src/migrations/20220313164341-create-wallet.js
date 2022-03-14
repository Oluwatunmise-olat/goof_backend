"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "wallets" (
        "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
        "wallet_id" VARCHAR(8) NOT NULL UNIQUE,
        "pin" VARCHAR, 
        "active" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wallets");
  }
};
