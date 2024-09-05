const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const JobseekerProfile = sequelize.define(
    'JobseekerProfile',
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
          model: 'users',
          key: 'id'
        }
      },
      intake_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      current_location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      current_employer: {
        type: DataTypes.STRING
      },
      block_current_employer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      blocked_companies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      current_title: {
        type: DataTypes.STRING
      },
      years_experience: {
        type: DataTypes.ENUM('0', '1-2', '2-5', '5-7', '7-10', '10+'),
        allowNull: false
      },
      job_level: {
        type: DataTypes.ENUM(
          'student',
          'intern',
          'fellow',
          'entry level',
          'mid level',
          'senior level',
          'executive'
        ),
        allowNull: false
      },
      startup_experience: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      education: {
        type: DataTypes.JSONB,
        defaultValue: []
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      open_to_work: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      athlete_status: {
        type: DataTypes.ENUM(
          'Current NCAA Athlete',
          'Graduated NCAA Athlete',
          'Pro Athlete',
          'Former Pro Athlete',
          'Not an Athlete'
        ),
        allowNull: false
      },
      preferred_telework_policy: {
        type: DataTypes.ENUM(
          'In-Office',
          'Fully Remote',
          'Hybrid (1 day a week from home)',
          'Hybrid (2 days a week from home)',
          'Hybrid (3 days a week from home)',
          'Hybrid (4 days a week from home)'
        ),
        allowNull: false
      },
      applying_to_jobs: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      tech_stack: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      company_culture_preferences: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      opportunity_interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      linkedin: DataTypes.STRING,
      portfolio: DataTypes.STRING,
      instagram: DataTypes.STRING,
      github: DataTypes.STRING,
      personal_website: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sexual_orientation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      veteran_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      disability_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accommodation_needed: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'jobseeker_profiles',
      timestamps: true
    }
  )

  JobseekerProfile.associate = (models) => {
    JobseekerProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    })
  }

  return JobseekerProfile
}
