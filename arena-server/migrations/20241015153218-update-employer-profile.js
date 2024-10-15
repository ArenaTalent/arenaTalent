'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove company_email from employer_profiles
    await queryInterface.sequelize.query(
      'ALTER TABLE employer_profiles DROP COLUMN IF EXISTS company_email'
    )

    // Modify company_name in users table
    await queryInterface.sequelize.query(
      'ALTER TABLE users ALTER COLUMN company_name DROP NOT NULL'
    )

    // Add role to users table if it doesn't exist
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT 'jobseeker';
        END IF;
      END $$;
    `)
  },

  down: async (queryInterface, Sequelize) => {
    // Add back company_email to employer_profiles
    await queryInterface.sequelize.query(
      'ALTER TABLE employer_profiles ADD COLUMN IF NOT EXISTS company_email VARCHAR(255)'
    )

    // Change company_name back to not null in users table
    await queryInterface.sequelize.query(
      'ALTER TABLE users ALTER COLUMN company_name SET NOT NULL'
    )

    // Remove role column from users table if it exists
    await queryInterface.sequelize.query(
      'ALTER TABLE users DROP COLUMN IF EXISTS role'
    )
  }
}
