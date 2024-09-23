'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('employer_profiles')

    if (!tableInfo.company_description) {
      await queryInterface.addColumn(
        'employer_profiles',
        'company_description',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      )
    }

    if (!tableInfo.company_name) {
      await queryInterface.addColumn('employer_profiles', 'company_name', {
        type: Sequelize.STRING,
        allowNull: false
      })
    }

    if (!tableInfo.company_website) {
      await queryInterface.addColumn('employer_profiles', 'company_website', {
        type: Sequelize.STRING,
        allowNull: false
      })
    }

    if (!tableInfo.company_address) {
      await queryInterface.addColumn('employer_profiles', 'company_address', {
        type: Sequelize.STRING,
        allowNull: false
      })
    }

    if (!tableInfo.company_phone) {
      await queryInterface.addColumn('employer_profiles', 'company_phone', {
        type: Sequelize.STRING,
        allowNull: false
      })
    }

    if (!tableInfo.company_email) {
      await queryInterface.addColumn('employer_profiles', 'company_email', {
        type: Sequelize.STRING,
        allowNull: false
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'employer_profiles',
      'company_description'
    )
    await queryInterface.removeColumn('employer_profiles', 'company_name')
    await queryInterface.removeColumn('employer_profiles', 'company_website')
    await queryInterface.removeColumn('employer_profiles', 'company_address')
    await queryInterface.removeColumn('employer_profiles', 'company_phone')
    await queryInterface.removeColumn('employer_profiles', 'company_email')
  }
}
