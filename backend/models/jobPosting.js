const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

const JobPosting = sequelize.define(
  'job_postings',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recommended_skills: DataTypes.ARRAY(DataTypes.TEXT),
    nice_to_haves: DataTypes.ARRAY(DataTypes.TEXT),
    responsibilities: DataTypes.TEXT,
    location: DataTypes.STRING,
    level: DataTypes.STRING,
    department: DataTypes.STRING,
    type: DataTypes.STRING,
    in_office_policy: DataTypes.STRING,
    salary: DataTypes.STRING,
    recruiter: DataTypes.STRING,
    number_of_applicants: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: true // Add createdAt and updatedAt fields
  }
)

// Define the relationship (One-to-Many)
User.hasMany(JobPosting, { foreignKey: 'employer_id' })
JobPosting.belongsTo(User, { foreignKey: 'employer_id' })

module.exports = JobPosting
