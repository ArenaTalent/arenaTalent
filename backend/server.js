// backend/server.js
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser') // Add this
const sequelize = require('./db')
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const employerMemberRoutes = require('./routes/employerMemberRoutes')
const jobSeekerRoutes = require('./routes/jobSeekerRoutes')
const employerRoutes = require('./routes/employerRoutes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5002

// Middleware
console.log('Starting server setup...')

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true // Add this to allow cookies to be sent
}
app.use(cors(corsOptions))
console.log('CORS enabled')

app.use(express.json())
app.use(cookieParser()) // Add this to parse cookies
console.log('Middleware set up')

// Test the database connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1) // Exit the process with a failure code
  }
}
connectToDatabase()

// Routes
app.use(
  '/api/users',
  (req, res, next) => {
    console.log(`Incoming request to /api/users: ${req.method} ${req.url}`)
    next()
  },
  userRoutes
)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/employer_members', employerMemberRoutes)
app.use('/api/job_seekers', jobSeekerRoutes)
app.use('/api/employers', employerRoutes)

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable' })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app // Export the app for testing purposes
