const { Sequelize } = require('sequelize')
require('dotenv').config()

let sequelize

if (process.env.DATABASE_URL) {
  // Use the DATABASE_URL environment variable provided by Heroku
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL (required for Heroku)
        rejectUnauthorized: false // Disable SSL certificate verification (may be required by Heroku)
      }
    }
  })
} else {
  // Fallback to local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
  )
}

// Test the database connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to the database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1) // Exit with failure code if connection fails
  }
}

connectToDatabase()

module.exports = sequelize
