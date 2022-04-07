module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("store_menus", "unique_store_id");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint("store_menus", {
      type: "unique",
      name: "unique_store_id",
      fields: ["store_id"]
    });
  }
};
