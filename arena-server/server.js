require('dotenv').config()
const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const employerMemberRoutes = require('./routes/employerMemberRoutes')
const jobSeekerRoutes = require('./routes/jobSeekerRoutes')
const employerRoutes = require('./routes/employerRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`
})

// Middleware
const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/employer_members', employerMemberRoutes)
app.use('/api/job_seekers', jobSeekerRoutes)
app.use('/api/employers', employerRoutes)
app.use('/api', uploadRoutes)

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error', details: err.message })
})

// Start the server
const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = app
