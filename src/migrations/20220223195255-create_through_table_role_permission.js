"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "role_permissions" (
        role_id int NOT NULL REFERENCES "roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
        permission_id int NOT NULL REFERENCES "permissions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
        PRIMARY KEY(role_id, permission_id)
      )
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("role_permissions");
  }
};
