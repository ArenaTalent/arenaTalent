'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable('jobseeker_profiles')

    const addColumnIfNotExists = async (columnName, columnDefinition) => {
      if (!tableExists[columnName]) {
        await queryInterface.addColumn(
          'jobseeker_profiles',
          columnName,
          columnDefinition
        )
      }
    }

    // Only try to add columns that weren't added in the previous migration
    await addColumnIfNotExists('tech_stack', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })

    await addColumnIfNotExists('company_culture_preferences', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })

    await addColumnIfNotExists('opportunity_interests', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })

    await addColumnIfNotExists('sexual_orientation', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('veteran_status', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('disability_status', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('accommodation_needed', {
      type: Sequelize.TEXT,
      allowNull: true
    })

    // Add any other columns that weren't in the first migration
  },

  down: async (queryInterface, Sequelize) => {
    // Remove only the columns added in this migration
    const columnsToRemove = [
      'tech_stack',
      'company_culture_preferences',
      'opportunity_interests',
      'sexual_orientation',
      'veteran_status',
      'disability_status',
      'accommodation_needed'
    ]

    for (const column of columnsToRemove) {
      await queryInterface.removeColumn('jobseeker_profiles', column)
    }
  }
}
