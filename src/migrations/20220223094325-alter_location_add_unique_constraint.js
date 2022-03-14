"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("locations", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_location_user_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("locations", {
      name: "unique_location_user_id"
    });
  }
};
