'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employer_profiles', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    })
    await queryInterface.addColumn('employer_profiles', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employer_profiles', 'createdAt')
    await queryInterface.removeColumn('employer_profiles', 'updatedAt')
  }
}
