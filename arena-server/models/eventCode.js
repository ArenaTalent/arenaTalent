'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class EventCode extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  EventCode.init(
    {
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      access_end_date: {
        type: DataTypes.DATE,
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
      modelName: 'EventCode',
      tableName: 'event_codes',
      underscored: true
    }
  )

  return EventCode
}
