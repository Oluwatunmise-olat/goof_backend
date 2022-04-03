"use strict";
const moment = require("moment");

let currTime = moment().format();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("week_days", [
      { name: "monday", created_at: currTime, updated_at: currTime },
      { name: "tuesday", created_at: currTime, updated_at: currTime },
      { name: "wednesday", created_at: currTime, updated_at: currTime },
      { name: "thursday", created_at: currTime, updated_at: currTime },
      { name: "friday", created_at: currTime, updated_at: currTime },
      { name: "saturday", created_at: currTime, updated_at: currTime },
      { name: "sunday", created_at: currTime, updated_at: currTime }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "week_days" WHERE
      name='monday' OR
      name='tuesday' OR
      name='wednesday' OR
      name='thursday' OR
      name='friday' OR
      name='saturday' OR
      name='sunday'
    `);
  }
};
