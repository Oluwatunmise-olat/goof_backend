"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`  
      ALTER TABLE "users" ADD COLUMN "created_at" TIMESTAMP WITH TIME ZONE NOT NULL;

      `);
    await queryInterface.sequelize.query(`
    ALTER TABLE "users" ADD COLUMN "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" DROP COLUMN "created_at"
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE "users" DROP COLUMN "updated_at"
    `);
  }
};
