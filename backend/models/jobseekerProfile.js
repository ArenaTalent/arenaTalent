const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

const JobseekerProfile = sequelize.define('jobseeker_profiles', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  resume: DataTypes.TEXT, // File path or BYTEA/BLOB
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
  jobs_applied: DataTypes.ARRAY(DataTypes.INTEGER), // Array of job posting IDs
  templates: DataTypes.TEXT // Could be JSONB for more structure
})

User.hasOne(JobseekerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' })
JobseekerProfile.belongsTo(User, { foreignKey: 'user_id' })

module.exports = JobseekerProfile
