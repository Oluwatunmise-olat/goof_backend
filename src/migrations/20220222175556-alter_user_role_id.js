"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      fields: ["role_id"],
      type: "foreign key",
      name: "role_id_fk",
      references: {
        table: "roles",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraints("users", "role_id_fk");
  }
};
