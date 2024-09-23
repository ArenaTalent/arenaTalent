'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = 'jobseeker_profiles'
    const columns = [
      'top_strengths',
      'job_search_challenge',
      'company_culture_preferences'
    ]

    for (const column of columns) {
      const columnExists = await queryInterface
        .describeTable(table)
        .then((tableDefinition) => !!tableDefinition[column])
        .catch(() => false)

      if (!columnExists) {
        switch (column) {
          case 'job_search_challenge':
            await queryInterface.addColumn(table, column, {
              type: Sequelize.STRING,
              allowNull: true
            })
            break
          case 'top_strengths':
          case 'company_culture_preferences':
            await queryInterface.addColumn(table, column, {
              type: Sequelize.ARRAY(Sequelize.STRING),
              allowNull: true
            })
            break
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = 'jobseeker_profiles'
    const columns = [
      'top_strengths',
      'job_search_challenge',
      'company_culture_preferences'
    ]

    for (const column of columns) {
      await queryInterface.removeColumn(table, column)
    }
  }
}
