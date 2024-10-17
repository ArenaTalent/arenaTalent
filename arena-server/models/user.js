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
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Only applicable for users with the "employer" role'
      },
      subscription_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "The date when the user's subscription ends"
      },
      event_code: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'The event code used during signup'
      },
      coupon_code: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'The coupon code used during signup'
      },
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'coupons',
          key: 'id'
        },
        comment: 'The ID of the coupon used during signup'
      }
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
    User.belongsTo(models.Coupon, {
      foreignKey: 'coupon_id',
      as: 'Coupon'
    })
  }

  return User
}
