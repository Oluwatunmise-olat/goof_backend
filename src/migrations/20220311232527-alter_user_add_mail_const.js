"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      fields: ["email_verification_id"],
      type: "foreign key",
      name: "email_verification_fk",
      references: {
        table: "email_verifications",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "email_verification_fk");
  }
};
