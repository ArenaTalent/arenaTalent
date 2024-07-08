// backend/routes/employerRoutes.js
const express = require('express')
const router = express.Router()
const employerController = require('../controllers/employerController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

// Create New Job (Protected - Employer Only)
router.post(
  '/jobs',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
    // ... Add more validation checks as needed
  ],
  authMiddleware.authenticateToken,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await employerController.createJobPosting(req, res)
  }
)

// Update Job (Protected - Employer Only)
router.put(
  '/jobs/:jobId',
  authMiddleware.authenticateToken,
  async (req, res) => {
    await employerController.updateJobPosting(req, res)
  }
)

// Delete Job (Protected - Employer Only)
router.delete(
  '/jobs/:jobId',
  authMiddleware.authenticateToken,
  async (req, res) => {
    await employerController.deleteJobPosting(req, res)
  }
)

// Get Employer Profile
router.get('/profile', authMiddleware.authenticateToken, async (req, res) => {
  await employerController.getEmployerProfile(req, res)
})

// Update Employer Profile
router.put('/profile', authMiddleware.authenticateToken, async (req, res) => {
  await employerController.updateEmployerProfile(req, res)
})

module.exports = router
