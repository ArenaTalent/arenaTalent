const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')
const authMiddleware = require('../middleware/authMiddleware') // Make sure to import this

// Get All Jobs (Public)
router.get('/', async (req, res) => {
  await jobController.getAllJobs(req, res)
})

// Get Job by ID (Public)
router.get('/:id', async (req, res) => {
  await jobController.getJobById(req, res)
})

// Create New Job (Protected - Employer Only)
router.post('/', authMiddleware.authenticateToken, async (req, res) => {
  await jobController.createJob(req, res)
})

// Update Job (Protected - Employer Only)
router.put('/:id', authMiddleware.authenticateToken, async (req, res) => {
  await jobController.updateJob(req, res)
})

// Delete Job (Protected - Employer Only)
router.delete('/:id', authMiddleware.authenticateToken, async (req, res) => {
  await jobController.deleteJob(req, res)
})

// ... (other job-related routes - search, filter, etc.)

module.exports = router
