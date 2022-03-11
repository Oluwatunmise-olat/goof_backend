"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("email_verifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        unique: true,
        type: Sequelize.UUID
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      expiry: {
        type: Sequelize.DATE,
        required: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable("email_verifications");
  }
};
