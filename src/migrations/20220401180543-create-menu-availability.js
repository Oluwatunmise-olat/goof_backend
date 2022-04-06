"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu_availabilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      open_time: {
        type: Sequelize.TIME,
        required: true,
        allowNull: false
      },
      close_time: {
        type: Sequelize.TIME,
        required: true,
        allowNull: false
      },
      week_day_id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: "week_days",
          key: "id"
        },
        onDelete: "set null",
        onUpdate: "cascade",
      },
      menu_id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: "store_menus",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("menu_availabilities");
  }
};
