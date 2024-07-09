module.exports = (sequelize, DataTypes) => {
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
          model: 'Users', // Name of the referenced table
          key: 'id'
        }
      },
      company_description: DataTypes.TEXT,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      work_from_home_policy: DataTypes.STRING,
      top_ranking: DataTypes.BOOLEAN,
      linkedin: DataTypes.STRING,
      industry: DataTypes.STRING,
      number_of_open_jobs: DataTypes.INTEGER,
      open_jobs: DataTypes.ARRAY(DataTypes.INTEGER), // Array of job posting IDs
      number_of_hires: DataTypes.INTEGER,
      benefits: DataTypes.ARRAY(DataTypes.TEXT),
      recent_news: DataTypes.TEXT,
      team: DataTypes.TEXT // Or JSONB for more structure
    },
    {
      timestamps: true
    }
  )

  EmployerProfile.associate = (models) => {
    EmployerProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  }

  return EmployerProfile
}
