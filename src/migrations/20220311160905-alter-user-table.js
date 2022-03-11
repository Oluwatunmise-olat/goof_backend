"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
     ALTER TABLE "users" ADD COLUMN "phone_verified" BOOLEAN DEFAULT false
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" ADD COLUMN "email_verified" BOOLEAN DEFAULT false
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" DROP COLUMN phone_verified
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" DROP COLUMN email_verified
    `);
  }
};
