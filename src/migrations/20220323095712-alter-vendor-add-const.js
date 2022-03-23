module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addConstraint(
          "vendors",
          {
            fields: ["owner"],
            type: "foreign key",
            name: "fk_owner",
            references: {
              table: "users",
              field: "id"
            },
            OnDelete: "cascade",
            onUpdate: "cascade"
          },
          { transaction: t }
        ),

        queryInterface.addConstraint(
          "vendors",
          {
            type: "unique",
            fields: ["owner"],
            name: "unique_owner"
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
          "vendors",
          { name: "fk_owner" },
          { transaction: t }
        ),
        queryInterface.removeConstraint(
          "vendors",
          {
            name: "unique_owner"
          },
          { transaction: t }
        )
      ]);
    });
  }
};
