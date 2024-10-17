'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employer_profiles', 'plan_type', {
      type: Sequelize.ENUM(
        'hidden',
        'frozen',
        'freetrial',
        'premium',
        'enterprise',
        'paymentfail'
      ),
      allowNull: false,
      defaultValue: 'freetrial'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employer_profiles', 'plan_type')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_employer_profiles_plan_type";'
    )
  }
}
