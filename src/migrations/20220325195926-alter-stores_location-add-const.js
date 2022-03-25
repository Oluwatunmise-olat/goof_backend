"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "stores_location",
          {
            type: "foreign key",
            fields: ["id"],
            name: "fk_store",
            references: {
              table: "stores",
              field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
          },
          { transaction: t }
        ),

        queryInterface.addConstraint("stores_location", {
          type: "unique",
          fields: ["id"],
          name: "unique_store"
        }),
        { transaction: t }
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint(
          "stores_location",
          { name: "fk_store" },
          { transaction: t }
        ),
        queryInterface.removeConstraint(
          "stores_location",
          { name: "unique_stores" },
          { transaction: t }
        )
      ]);
    });
  }
};
