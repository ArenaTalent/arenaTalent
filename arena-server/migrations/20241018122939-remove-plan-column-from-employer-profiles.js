'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employer_profiles', 'plan')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employer_profiles', 'plan', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
}
