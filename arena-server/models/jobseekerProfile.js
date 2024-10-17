const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class JobseekerProfile extends Model {
    static associate(models) {
      JobseekerProfile.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User'
      })
    }
  }

  JobseekerProfile.init(
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
        allowNull: true
      },
      pronouns: {
        type: DataTypes.STRING,
        allowNull: true
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      current_employer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      work_start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      work_end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      starting_salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      ending_salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      company_ratings: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      block_current_employer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      current_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      years_experience: {
        type: DataTypes.STRING,
        allowNull: true
      },
      job_level: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startup_experience: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      highest_education: {
        type: DataTypes.STRING,
        allowNull: true
      },
      education: {
        type: DataTypes.JSONB,
        defaultValue: []
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      open_to_work: {
        type: DataTypes.STRING,
        allowNull: true
      },
      athlete_status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      preferred_telework_policy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      job_search_motivation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      top_strengths: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      job_search_challenge: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company_culture_preferences: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      portfolio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true
      },
      personal_website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      race: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sexual_orientation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      veteran_status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      disability_status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accommodation_needed: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      jobs_applied: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: []
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cover_photo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resume_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      videos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      plan_type: {
        type: DataTypes.ENUM('freetrial', 'free', 'paid'),
        allowNull: false,
        defaultValue: 'freetrial'
      }
    },
    {
      sequelize,
      modelName: 'JobseekerProfile',
      tableName: 'jobseeker_profiles',
      timestamps: true
    }
  )

  return JobseekerProfile
}
