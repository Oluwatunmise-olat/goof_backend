"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("email_verifications", {
      fields: ["user_id"],
      type: "foreign key",
      name: "email_veri_user_id_fk",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "email_verifications",
      "email_veri_user_id_fk"
    );
  }
};
