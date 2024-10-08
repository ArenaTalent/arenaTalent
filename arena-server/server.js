const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const employerMemberRoutes = require('./routes/employerMemberRoutes')
const jobSeekerRoutes = require('./routes/jobSeekerRoutes')
const employerRoutes = require('./routes/employerRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const admin = require('firebase-admin') // Add this line

const app = express()
const port = process.env.PORT || 5002

console.log('Starting server setup...')

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  })
  console.log(
    'Firebase Admin SDK initialized with project ID:',
    process.env.REACT_APP_FIREBASE_PROJECT_ID
  )
}

// CORS configuration
const corsOptions = {
  origin: [
    'https://arenatalent-d7a88.web.app',
    'https://app.arenatalent.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

// Middleware
app.use(cookieParser())
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  console.log('Origin:', req.headers.origin)
  console.log('Headers:', req.headers)
  next()
})

// Database connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}
connectToDatabase()

// AWS credentials check
console.log('Checking AWS credentials...')
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error(
    'AWS credentials are missing. Please check your environment variables.'
  )
  process.exit(1)
}
console.log('AWS credentials found')

// Routes
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/employer_members', employerMemberRoutes)
app.use('/api/job_seekers', jobSeekerRoutes)
app.use('/api/employers', employerRoutes)
app.use('/api', upload.single('file'), uploadRoutes)

// CORS test route
app.get('/api/cors-test', (req, res) => {
  res.json({ message: 'CORS is working' })
})

// General test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  console.error('Error stack:', err.stack)
  res.status(500).json({ error: 'Internal server error', details: err.message })
})

// Response logging middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.url} - ${
        res.statusCode
      }`
    )
    console.log('Response Headers:', res.getHeaders())
  })
  next()
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app
