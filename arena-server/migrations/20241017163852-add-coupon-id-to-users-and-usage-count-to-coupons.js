'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'coupon_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'coupons',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('coupons', 'usage_count', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'coupon_id')
    await queryInterface.removeColumn('coupons', 'usage_count')
  }
}
