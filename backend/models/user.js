module.exports = (sequelize, DataTypes) => {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('jobseeker', 'employer'),
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
      company_name: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'users', // Explicitly specify the table name
      timestamps: true
    }
  )

  User.associate = (models) => {
    User.hasOne(models.JobseekerProfile, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
    User.hasMany(models.JobPosting, {
      foreignKey: 'employer_id',
      onDelete: 'CASCADE'
    })
    User.hasMany(models.JobApplication, {
      foreignKey: 'jobseeker_id',
      onDelete: 'CASCADE'
    })
  }

  return User
}
