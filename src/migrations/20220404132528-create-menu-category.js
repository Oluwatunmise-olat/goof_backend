"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_name: {
        type: Sequelize.STRING(500),
        allowNull: false,
        required: true
      },
      description: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        required: true,
        allowNull: false
      },
      cover_image: {
        type: Sequelize.STRING,
        allowNull: true,
        required: false
      },
      deactivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      menu_id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "store_menus",
          fields: ["id"]
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("menu_categories");
  }
};
