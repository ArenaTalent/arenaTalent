'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobseeker_profiles', 'templates', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobseeker_profiles', 'templates')
  }
}
