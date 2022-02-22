"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   `
    //   ALTER TABLE "users" ADD CONSTRAINT role_id_fk FOREIGN KEY ("role_id) REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE
    //   `
    // );
    await queryInterface.addConstraint("users", {
      fields: ["role_id"],
      type: "foreign key",
      name: "role_id_fk", // optional
      references: {
        table: "roles",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraints("users", "role_id_fk");
  }
};
