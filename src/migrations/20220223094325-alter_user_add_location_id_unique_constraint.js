"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["location_id"],
      name: "unique_user_location_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", {
      name: "unique_user_location_id"
    });
  }
};
