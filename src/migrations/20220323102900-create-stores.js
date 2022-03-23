module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
      },
      is_banned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        required: true
      },
      store_cover: {
        allowNull: true,
        required: false,
        type: Sequelize.STRING
      },
      store_avatar: {
        allowNull: true,
        required: false,
        type: Sequelize.STRING
      },
      store_phone_no: {
        type: Sequelize.STRING,
        validate: {
          max: { args: [13], msg: "Maximum length of phone number must be 13" },
          min: { args: [13], msg: "Minimum length of phone number must be 13" }
        }
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
    await queryInterface.dropTable("stores");
  }
};
