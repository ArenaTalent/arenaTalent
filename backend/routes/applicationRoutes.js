const express = require('express')
const router = express.Router()
const applicationController = require('../controllers/applicationController')

// Submit Job Application (Protected - Job Seeker Only)
router.post(
  '/',
  authMiddleware.authenticateToken,
  applicationController.submitApplication
)

// Get Applications for a Job (Protected - Employer Only)
router.get(
  '/job/:jobId',
  authMiddleware.authenticateToken,
  applicationController.getJobApplications
)

// Get Applications for a Job Seeker (Protected - Job Seeker Only)
router.get(
  '/user',
  authMiddleware.authenticateToken,
  applicationController.getUserApplications
)

// ... (other application-related routes - update status, etc.)
