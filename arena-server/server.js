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
const uploadRoutes = require('./routes/uploadRoutes')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const app = express()
const port = process.env.PORT || 5002

// Middleware
console.log('Starting server setup...')

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`
})

const allowedOrigins = [
  'https://arenatalent-d7a88.web.app',
  'https://app.arenatalent.com',
  process.env.FRONTEND_URL, // Add this if you have a separate production URL
  'http://localhost:3000' // Add this for local development
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(cookieParser()) // Make sure this is placed after cors middleware
app.use(express.json()) // For parsing application/json

// ... rest of your routes and middleware ...

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
app.options('*', cors(corsOptions)) // Pre-flight requests

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable' })
})
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  console.error('Error stack:', err.stack)
  res.status(500).json({ error: 'Internal server error', details: err.message })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error', details: err.message })
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app // Export the app for testing purposes
