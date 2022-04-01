"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("store_menus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_name: {
        type: Sequelize.STRING
      },
      deactivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cover_image: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable("store_menus");
  }
};
