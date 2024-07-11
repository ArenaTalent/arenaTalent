'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employer_profiles', 'open_jobs', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employer_profiles', 'open_jobs')
  }
}
