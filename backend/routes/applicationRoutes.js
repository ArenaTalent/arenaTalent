// backend/routes/applicationRoutes.js
const express = require('express')
const router = express.Router()
const applicationController = require('../controllers/applicationController')
const authMiddleware = require('../middleware/authMiddleware')

// Submit Job Application (Protected - Job Seeker Only)
router.post('/', authMiddleware.authenticateToken, async (req, res) => {
  await applicationController.submitApplication(req, res)
})

// Get Applications for a Job (Protected - Employer Only)
router.get(
  '/job/:jobId',
  authMiddleware.authenticateToken,
  async (req, res) => {
    await applicationController.getJobApplications(req, res)
  }
)

// Get Applications for a Job Seeker (Protected - Job Seeker Only)
router.get('/user', authMiddleware.authenticateToken, async (req, res) => {
  await applicationController.getUserApplications(req, res)
})

// ... (other application-related routes - update

module.exports = router
