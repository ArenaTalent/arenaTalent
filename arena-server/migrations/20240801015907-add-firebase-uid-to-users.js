'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the firebase_uid column
    await queryInterface.addColumn('users', 'firebase_uid', {
      type: Sequelize.STRING,
      allowNull: true // Initially allow null
    })

    // Update existing rows with a placeholder value
    await queryInterface.sequelize.query(
      `UPDATE users SET firebase_uid = 'PLACEHOLDER_' || id::text WHERE firebase_uid IS NULL;`
    )

    // Add NOT NULL constraint and make it unique
    await queryInterface.changeColumn('users', 'firebase_uid', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the firebase_uid column
    await queryInterface.removeColumn('users', 'firebase_uid')
  }
}
