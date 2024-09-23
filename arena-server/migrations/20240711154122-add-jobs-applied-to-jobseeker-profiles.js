'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobseeker_profiles', 'jobs_applied', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobseeker_profiles', 'jobs_applied')
  }
}
