const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firebase_uid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_name: DataTypes.STRING
    },
    {
      tableName: 'users',
      timestamps: true
    }
  )

  User.associate = (models) => {
    User.hasOne(models.EmployerProfile, {
      foreignKey: 'user_id',
      as: 'EmployerProfile'
    })
    User.hasOne(models.JobseekerProfile, {
      foreignKey: 'user_id',
      as: 'JobseekerProfile'
    })
  }

  return User
}
