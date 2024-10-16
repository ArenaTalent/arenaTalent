const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class EmployerMember extends Model {
    static associate(models) {
      // Define association here
      EmployerMember.belongsTo(models.User, {
        foreignKey: 'employer_id',
        as: 'employer'
      })
    }
  }

  EmployerMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      member_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          isIn: [['invited', 'active', 'inactive']]
        }
      },
      profile_picture_url: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      cover_photo_url: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'EmployerMember',
      tableName: 'employer_members',
      underscored: true, // This will use snake_case for the fields in the database
      timestamps: true // This will use created_at and updated_at
    }
  )

  return EmployerMember
}
