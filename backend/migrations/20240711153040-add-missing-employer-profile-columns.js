// backend/migrations/<timestamp>-add-missing-employer-profile-columns.js

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employer_profiles', 'number_of_hires', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employer_profiles', 'number_of_hires')
  }
}
