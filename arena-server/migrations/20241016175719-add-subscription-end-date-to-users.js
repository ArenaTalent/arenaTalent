'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'subscription_end_date', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'company_name' // This will add the new column after the 'company_name' column
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'subscription_end_date')
  }
}
