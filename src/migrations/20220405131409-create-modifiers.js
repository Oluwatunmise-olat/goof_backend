module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modifiers", {
      id: {
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      required: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        required: true
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false,
        required: true
      },
      min_selection: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      max_selection: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: "menu_categories",
          fields: ["id"]
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("modifiers");
  }
};
