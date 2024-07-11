module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobseeker_profiles', 'intake_completed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
    await queryInterface.addColumn('employer_profiles', 'intake_completed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobseeker_profiles', 'intake_completed')
    await queryInterface.removeColumn('employer_profiles', 'intake_completed')
  }
}
