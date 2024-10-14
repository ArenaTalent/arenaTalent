'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      // Update employer_profiles table
      const employerProfilesDescription = await queryInterface.describeTable(
        'employer_profiles'
      )

      if (!employerProfilesDescription.domain_verified) {
        await queryInterface.addColumn(
          'employer_profiles',
          'domain_verified',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          { transaction }
        )
      }

      if (!employerProfilesDescription.plan) {
        await queryInterface.addColumn(
          'employer_profiles',
          'plan',
          {
            type: Sequelize.ENUM(
              '30daytrial',
              'freetrial',
              'premium',
              'enterprise',
              'paymentfail',
              'frozen',
              'msbc'
            ),
            defaultValue: 'freetrial'
          },
          { transaction }
        )
      }

      // Create employer_members table if it doesn't exist
      const tableExists = await queryInterface.sequelize.query(
        `SELECT * FROM information_schema.tables WHERE table_name = 'employer_members'`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      )

      if (tableExists.length === 0) {
        await queryInterface.createTable(
          'employer_members',
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            employer_id: {
              type: Sequelize.INTEGER,
              references: {
                model: 'users',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            },
            member_email: {
              type: Sequelize.STRING(255),
              allowNull: false,
              unique: true
            },
            role: {
              type: Sequelize.STRING(50),
              allowNull: true
            },
            status: {
              type: Sequelize.STRING(20),
              allowNull: true
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            profile_picture_url: {
              type: Sequelize.STRING(255),
              allowNull: true
            },
            cover_photo_url: {
              type: Sequelize.STRING(255),
              allowNull: true
            }
          },
          { transaction }
        )

        await queryInterface.addConstraint(
          'employer_members',
          {
            fields: ['status'],
            type: 'check',
            where: {
              status: ['invited', 'active', 'inactive']
            },
            name: 'employer_members_status_check'
          },
          { transaction }
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      // Revert changes to employer_profiles table
      await queryInterface.removeColumn(
        'employer_profiles',
        'domain_verified',
        { transaction }
      )
      await queryInterface.removeColumn('employer_profiles', 'plan', {
        transaction
      })

      // Drop employer_members table if it exists
      await queryInterface.dropTable('employer_members', { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
