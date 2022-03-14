"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("email_verifications", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_email_veri_user_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("email_verifications", {
      name: "unique_email_veri_user_id"
    });
  }
};
