'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'event_code', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'The event code used during signup'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'event_code')
  }
}
