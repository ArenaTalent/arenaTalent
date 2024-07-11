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
          model: 'Users', // Use the table name 'users' instead of the model name 'User'
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
      team: DataTypes.TEXT
    },
    {
      tableName: 'employer_profiles'
    }
  )

  EmployerProfile.associate = (models) => {
    EmployerProfile.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return EmployerProfile
}
