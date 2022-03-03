"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "roles" (name) VALUES ('ADMIN'), ('VENDOR'), ('RIDER'), ('USER');
   `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "roles" WHERE name='ADMIN' OR name='VENDOR' OR name='RIDER' OR name='USER';
    `);
  }
};
