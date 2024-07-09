module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define(
    'JobApplication',
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
          model: 'users', // Ensure it matches the table name
          key: 'id'
        }
      },
      job_posting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'job_postings', // Ensure it matches the table name
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
      tableName: 'job_applications', // Explicitly specify the table name
      timestamps: true
    }
  )

  JobApplication.associate = (models) => {
    JobApplication.belongsTo(models.User, {
      foreignKey: 'jobseeker_id',
      onDelete: 'CASCADE'
    })
    JobApplication.belongsTo(models.JobPosting, {
      foreignKey: 'job_posting_id',
      onDelete: 'CASCADE'
    })
  }

  return JobApplication
}
