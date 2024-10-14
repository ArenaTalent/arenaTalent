'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns to employer_profiles table
    await queryInterface.addColumn('employer_profiles', 'domain_verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    await queryInterface.addColumn('employer_profiles', 'plan', {
      type: Sequelize.ENUM(
        '30daytrial',
        'freetrial',
        'premium',
        'enterprise',
        'paymentfail',
        'frozen'
      ),
      defaultValue: 'freetrial'
    })

    // Create EmployerTeamMembers table
    await queryInterface.createTable('EmployerTeamMembers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employer_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employer_profiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })

    // Add unique constraint to prevent duplicate team member entries
    await queryInterface.addConstraint('EmployerTeamMembers', {
      fields: ['employer_profile_id', 'user_id'],
      type: 'unique',
      name: 'unique_team_member'
    })

    // Modify job_postings table
    await queryInterface.renameColumn(
      'job_postings',
      'employer_id',
      'employer_profile_id'
    )

    // Update foreign key constraint
    await queryInterface.removeConstraint(
      'job_postings',
      'job_postings_employer_id_fkey'
    )
    await queryInterface.addConstraint('job_postings', {
      fields: ['employer_profile_id'],
      type: 'foreign key',
      name: 'job_postings_employer_profile_id_fkey',
      references: {
        table: 'employer_profiles',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes to employer_profiles table
    await queryInterface.removeColumn('employer_profiles', 'domain_verified')
    await queryInterface.removeColumn('employer_profiles', 'plan')

    // Drop EmployerTeamMembers table
    await queryInterface.dropTable('EmployerTeamMembers')

    // Revert changes to job_postings table
    await queryInterface.renameColumn(
      'job_postings',
      'employer_profile_id',
      'employer_id'
    )

    // Revert foreign key constraint
    await queryInterface.removeConstraint(
      'job_postings',
      'job_postings_employer_profile_id_fkey'
    )
    await queryInterface.addConstraint('job_postings', {
      fields: ['employer_id'],
      type: 'foreign key',
      name: 'job_postings_employer_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
}
