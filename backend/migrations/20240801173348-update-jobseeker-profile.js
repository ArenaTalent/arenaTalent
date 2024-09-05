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

    // Add columns only if they don't exist
    await addColumnIfNotExists('years_experience_enum', {
      type: Sequelize.ENUM('0', '1-2', '2-5', '5-7', '7-10', '10+'),
      allowNull: true
    })

    await addColumnIfNotExists('date_of_birth', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await addColumnIfNotExists('current_location', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('current_employer', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('block_current_employer', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    await addColumnIfNotExists('blocked_companies', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })

    await addColumnIfNotExists('current_title', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('athlete_status', {
      type: Sequelize.ENUM(
        'Current NCAA Athlete',
        'Graduated NCAA Athlete',
        'Pro Athlete',
        'Former Pro Athlete',
        'Not an Athlete'
      ),
      allowNull: true
    })

    await addColumnIfNotExists('preferred_telework_policy', {
      type: Sequelize.ENUM(
        'In-Office',
        'Fully Remote',
        'Hybrid (1 day a week from home)',
        'Hybrid (2 days a week from home)',
        'Hybrid (3 days a week from home)',
        'Hybrid (4 days a week from home)'
      ),
      allowNull: true
    })

    await addColumnIfNotExists('applying_to_jobs', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

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

    await addColumnIfNotExists('github', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await addColumnIfNotExists('personal_website', {
      type: Sequelize.STRING,
      allowNull: true
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

    // Rename 'open_to_opportunities' to 'open_to_work' if it hasn't been done already
    if (tableExists['open_to_opportunities'] && !tableExists['open_to_work']) {
      await queryInterface.renameColumn(
        'jobseeker_profiles',
        'open_to_opportunities',
        'open_to_work'
      )
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove added columns
    const columnsToRemove = [
      'years_experience_enum',
      'date_of_birth',
      'current_location',
      'current_employer',
      'block_current_employer',
      'blocked_companies',
      'current_title',
      'athlete_status',
      'preferred_telework_policy',
      'applying_to_jobs',
      'tech_stack',
      'company_culture_preferences',
      'opportunity_interests',
      'github',
      'personal_website',
      'sexual_orientation',
      'veteran_status',
      'disability_status',
      'accommodation_needed'
    ]

    for (const column of columnsToRemove) {
      await queryInterface.removeColumn('jobseeker_profiles', column)
    }

    // Rename 'open_to_work' back to 'open_to_opportunities'
    await queryInterface.renameColumn(
      'jobseeker_profiles',
      'open_to_work',
      'open_to_opportunities'
    )
  }
}
