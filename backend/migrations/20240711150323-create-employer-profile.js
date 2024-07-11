'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employer_profiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_website: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      number_of_open_jobs: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      open_jobs: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      number_of_hires: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      benefits: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
      },
      recent_news: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      team: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employer_profiles')
  }
}
