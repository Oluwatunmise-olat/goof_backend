"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      fields: ["location_id"],
      type: "foreign key",
      name: "location_id_fk",
      references: {
        table: "locations",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraints("users", "location_id_fk");
  }
};
