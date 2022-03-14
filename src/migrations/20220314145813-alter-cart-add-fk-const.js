'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("carts", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id_fk",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("carts", "user_id_fk")
  }
};
