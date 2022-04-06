"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("carts", {
      type: "unique",
      fields: ["user_id"],
      name: "unique_cart_user_id"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("carts", "unique_cart_user_id");
  }
};
