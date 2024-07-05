const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')
const JobPosting = require('./jobPosting')

const JobApplication = sequelize.define(
  'job_applications',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    jobseeker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    job_posting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobPosting,
        key: 'id'
      }
    },
    cover_letter: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM(
        'submitted',
        'in_review',
        'interview',
        'accepted',
        'rejected'
      ),
      defaultValue: 'submitted'
    }
  },
  {
    timestamps: true
  }
)

User.hasMany(JobApplication, { foreignKey: 'jobseeker_id' })
JobApplication.belongsTo(User, { foreignKey: 'jobseeker_id' })

JobPosting.hasMany(JobApplication, { foreignKey: 'job_posting_id' })
JobApplication.belongsTo(JobPosting, { foreignKey: 'job_posting_id' })

module.exports = JobApplication
