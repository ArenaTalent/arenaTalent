module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define(
    'JobPosting',
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
          model: 'users', // Ensure it matches the table name
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
      tableName: 'job_postings', // Explicitly specify the table name
      timestamps: true
    }
  )

  JobPosting.associate = (models) => {
    JobPosting.belongsTo(models.User, {
      foreignKey: 'employer_id',
      onDelete: 'CASCADE'
    })
    JobPosting.hasMany(models.JobApplication, {
      foreignKey: 'job_posting_id',
      onDelete: 'CASCADE'
    })
  }

  return JobPosting
}
