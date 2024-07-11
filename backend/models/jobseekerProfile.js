// backend/models/jobseekerProfile.js
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
      resume: DataTypes.TEXT,
      skills: DataTypes.ARRAY(DataTypes.TEXT),
      experience: DataTypes.TEXT,
      gender: DataTypes.STRING,
      race: DataTypes.STRING,
      education: DataTypes.TEXT,
      years_experience: DataTypes.INTEGER,
      job_level: DataTypes.STRING,
      previous_industries: DataTypes.ARRAY(DataTypes.TEXT),
      memberof: DataTypes.ARRAY(DataTypes.TEXT),
      startup_experience: DataTypes.BOOLEAN,
      linkedin: DataTypes.STRING,
      portfolio: DataTypes.STRING,
      website: DataTypes.STRING,
      instagram: DataTypes.STRING,
      phone: DataTypes.STRING,
      languages: DataTypes.ARRAY(DataTypes.TEXT),
      open_to_opportunities: DataTypes.BOOLEAN,
      location: DataTypes.STRING,
      jobs_applied: DataTypes.ARRAY(DataTypes.INTEGER),
      templates: DataTypes.TEXT
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
