const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const EmployerProfile = sequelize.define(
    'EmployerProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_website: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      intake_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      company_description: DataTypes.TEXT,
      linkedin: DataTypes.STRING,
      industry: DataTypes.STRING,
      number_of_open_jobs: DataTypes.INTEGER,
      open_jobs: DataTypes.ARRAY(DataTypes.INTEGER),
      number_of_hires: DataTypes.INTEGER,
      benefits: DataTypes.ARRAY(DataTypes.TEXT),
      recent_news: DataTypes.TEXT,
      team: DataTypes.TEXT,
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true
      },
      domain_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      plan: {
        type: DataTypes.ENUM(
          '30daytrial',
          'freetrial',
          'premium',
          'enterprise',
          'paymentfail',
          'frozen'
        ),
        defaultValue: 'freetrial'
      }
    },
    {
      tableName: 'employer_profiles'
    }
  )

  EmployerProfile.associate = (models) => {
    EmployerProfile.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'user_id'
    })
    EmployerProfile.hasMany(models.JobPosting, {
      foreignKey: 'employer_profile_id'
    })
    EmployerProfile.belongsToMany(models.User, {
      through: 'EmployerTeamMembers',
      as: 'teamMembers',
      foreignKey: 'employer_profile_id',
      otherKey: 'user_id'
    })
  }

  return EmployerProfile
}
