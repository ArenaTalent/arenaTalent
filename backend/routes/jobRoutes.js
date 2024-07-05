const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')

// Get All Jobs (Public)
router.get('/', jobController.getAllJobs)

// Get Job by ID (Public)
router.get('/:id', jobController.getJobById)

// Create New Job (Protected - Employer Only)
router.post('/', authMiddleware.authenticateToken, jobController.createJob)

// Update Job (Protected - Employer Only)
router.put('/:id', authMiddleware.authenticateToken, jobController.updateJob)

// Delete Job (Protected - Employer Only)
router.delete('/:id', authMiddleware.authenticateToken, jobController.deleteJob)

// ... (other job-related routes - search, filter, etc.)
