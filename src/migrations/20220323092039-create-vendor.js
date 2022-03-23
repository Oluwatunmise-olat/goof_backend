"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vendors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("Approved", "Unapproved"),
        defaultValue: "Unapproved"
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      docs: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
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
    await queryInterface.dropTable("vendors");
  }
};
