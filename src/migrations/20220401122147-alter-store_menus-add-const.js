"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "store_menus",
          {
            type: "foreign key",
            name: "fk_store_id",
            fields: ["store_id"],
            references: {
              table: "stores",
              field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
          },
          { transaction: t }
        ),

        queryInterface.addConstraint(
          "store_menus",
          {
            type: "unique",
            name: "unique_store_id",
            fields: ["store_id"]
          },
          { transaction: t }
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint(
          "store_menus",
          { name: "fk_store_id" },
          { transaction: t }
        ),
        queryInterface.removeConstraint(
          "store_menus",
          { name: "unique_store_id" },
          { transaction: t }
        )
      ]);
    });
  }
};
