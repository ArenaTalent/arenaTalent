require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'oliviaschwartz',
    password: process.env.DB_PASSWORD || 'welcomeArena123',
    database: process.env.DB_NAME || 'arena_talent',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || 'oliviaschwartz',
    password: process.env.DB_PASSWORD || 'welcomeArena123',
    database: process.env.DB_NAME || 'arena_talent_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Use Heroku's DATABASE_URL
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Heroku requires SSL
        rejectUnauthorized: false // Necessary for Heroku Postgres SSL
      }
    }
  }
}
