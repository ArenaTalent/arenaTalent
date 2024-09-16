// backend/routes/jobseekerRoutes.js
const express = require('express')
const router = express.Router()
const jobseekerController = require('../controllers/jobSeekerController')
const authMiddleware = require('../middleware/authMiddleware')
const { body, validationResult } = require('express-validator')

router.get('/', authMiddleware.authenticateToken, async (req, res) => {
  await jobseekerController.getAllJobseekers(req, res)
})

router.get('/:id', authMiddleware.authenticateToken, async (req, res) => {
  await jobseekerController.getJobseekerById(req, res)
})

router.post('/intake', authMiddleware.authenticateToken, async (req, res) => {
  await jobSeekerController.updateJobSeekerProfile(req, res)
})

module.exports = router
