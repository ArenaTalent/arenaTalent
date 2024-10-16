const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class EmployerProfile extends Model {
    static associate(models) {
      EmployerProfile.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'owner'
      })
      EmployerProfile.hasMany(models.JobPosting, {
        foreignKey: 'employer_profile_id',
        as: 'jobPostings'
      })
      EmployerProfile.hasMany(models.EmployerMember, {
        foreignKey: 'employer_id',
        as: 'teamMembers'
      })
    }
  }

  EmployerProfile.init(
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
      company_description: DataTypes.TEXT,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      work_from_home_policy: DataTypes.STRING,
      top_ranking: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      industry: DataTypes.STRING,
      number_of_open_jobs: DataTypes.INTEGER,
      open_jobs: DataTypes.ARRAY(DataTypes.INTEGER),
      number_of_hires: DataTypes.INTEGER,
      benefits: DataTypes.ARRAY(DataTypes.TEXT),
      recent_news: DataTypes.TEXT,
      team: DataTypes.TEXT,
      profile_picture_url: DataTypes.STRING,
      cover_photo_url: DataTypes.STRING,
      logo: DataTypes.STRING,
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      video: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'EmployerProfile',
      tableName: 'employer_profiles',
      underscored: false, // Change this to false
      timestamps: true
    }
  )

  return EmployerProfile
}
