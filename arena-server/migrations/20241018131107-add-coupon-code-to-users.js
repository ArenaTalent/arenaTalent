'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'coupon_code', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'The coupon code used during signup'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'coupon_code')
  }
}
