'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobseeker_profiles', 'profile_picture', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('jobseeker_profiles', 'cover_photo', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('jobseeker_profiles', 'resume_url', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('jobseeker_profiles', 'videos', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })

    await queryInterface.addColumn('employer_profiles', 'logo', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('employer_profiles', 'photos', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })
    await queryInterface.addColumn('employer_profiles', 'video', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobseeker_profiles', 'profile_picture')
    await queryInterface.removeColumn('jobseeker_profiles', 'cover_photo')
    await queryInterface.removeColumn('jobseeker_profiles', 'resume_url')
    await queryInterface.removeColumn('jobseeker_profiles', 'videos')

    await queryInterface.removeColumn('employer_profiles', 'logo')
    await queryInterface.removeColumn('employer_profiles', 'photos')
    await queryInterface.removeColumn('employer_profiles', 'video')
  }
}
