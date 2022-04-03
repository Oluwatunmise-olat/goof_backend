"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "phone_verification" 
      (phone_number, verified)
      VALUES 
      ('+2349060579834', true), 
      ('+2349060579835', false)
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "phone_verification" 
      WHERE 
      phone_number='+2349060579834' 
      OR 
      phone_number='+2349060579835'
    `);
  }
};
