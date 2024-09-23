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
    username: process.env.DB_USERNAME || 'oliviaschwartz',
    password: process.env.DB_PASSWORD || 'welcomeArena123',
    database: process.env.DB_NAME || 'arena_talent_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  }
}
