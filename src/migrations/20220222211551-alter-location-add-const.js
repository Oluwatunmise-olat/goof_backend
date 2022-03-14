"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("locations", {
      fields: ["user_id"],
      type: "foreign key",
      name: "location_user_id_fk",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraints("users", "location_user_id_fk");
  }
};
