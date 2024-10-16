require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'your-dev-username',
    password: process.env.DB_PASSWORD || 'your-dev-password',
    database: process.env.DB_NAME || 'your-dev-database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || 'your-test-username',
    password: process.env.DB_PASSWORD || 'your-test-password',
    database: process.env.DB_NAME || 'your-test-database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This is needed for Heroku Postgres SSL connection
      }
    }
  }
}
