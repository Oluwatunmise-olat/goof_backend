module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reset_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        required: true
      },
      token: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      expires_in: {
        type: Sequelize.TIME
      },
      type: {
        type: Sequelize.ENUM("wallet", "account")
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
    await queryInterface.dropTable("reset_tokens");
  }
};
