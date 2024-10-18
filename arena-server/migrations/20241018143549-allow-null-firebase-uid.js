'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'firebase_uid', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'firebase_uid', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    })
  }
}
