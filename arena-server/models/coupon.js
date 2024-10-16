'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Coupon.init(
    {
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      expiration_date: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Coupon',
      tableName: 'coupons',
      underscored: true
    }
  )

  return Coupon
}
