// backend/server.js
const express = require('express')
const cors = require('cors')
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
app.use(cors())
console.log('CORS enabled')
app.use(express.json())
console.log('Middleware set up')

// Add a log right before listen
console.log(`Attempting to listen on port ${port}`)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

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
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/employer_members', employerMemberRoutes)
app.use('/api/job_seekers', jobSeekerRoutes)
app.use('/api/employers', employerRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})
