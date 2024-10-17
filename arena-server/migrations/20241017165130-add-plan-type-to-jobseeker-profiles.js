'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobseeker_profiles', 'plan_type', {
      type: Sequelize.ENUM('freetrial', 'free', 'paid'),
      allowNull: false,
      defaultValue: 'freetrial'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobseeker_profiles', 'plan_type')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_jobseeker_profiles_plan_type";'
    )
  }
}
