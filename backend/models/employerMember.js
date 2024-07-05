const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user') // Assuming you have a User model

const EmployerMember = sequelize.define(
  'employer_members',
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
    member_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('invited', 'active', 'inactive'),
      defaultValue: 'invited'
    }
  },
  {
    timestamps: true
  }
)

// Define the relationship (One-to-Many)
User.hasMany(EmployerMember, { foreignKey: 'employer_id' })
EmployerMember.belongsTo(User, { foreignKey: 'employer_id' })

module.exports = EmployerMember
