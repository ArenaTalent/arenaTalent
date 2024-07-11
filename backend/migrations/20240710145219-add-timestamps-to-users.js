'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('users')

    if (!tableDefinition.createdAt) {
      await queryInterface.addColumn('users', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE
      })
    }

    if (!tableDefinition.updatedAt) {
      await queryInterface.addColumn('users', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('users')

    if (tableDefinition.createdAt) {
      await queryInterface.removeColumn('users', 'createdAt')
    }

    if (tableDefinition.updatedAt) {
      await queryInterface.removeColumn('users', 'updatedAt')
    }
  }
}
