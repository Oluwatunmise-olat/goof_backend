"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["email_verification_id"],
      name: "unique_email_verification_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", {
      name: "unique_email_verification_id"
    });
  }
};
