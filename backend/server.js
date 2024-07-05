const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000 // Get port from environment or default to 3000

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

// Test the database connection (optional)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err.stack)
  } else {
    console.log('Connected to database:', res.rows[0].now)
  }
})

// Define your API routes here...

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
