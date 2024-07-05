// backend/routes/employerRoutes.js
const express = require('express')
const router = express.Router()
const employerController = require('../controllers/employerController')
const authMiddleware = require('../middleware/authMiddleware')

// Protected Routes - Require Authentication and Employer Role
router.post(
  '/jobs',
  authMiddleware.authenticateToken,
  employerController.createJobPosting
)
router.put(
  '/jobs/:jobId',
  authMiddleware.authenticateToken,
  employerController.updateJobPosting
)
router.delete(
  '/jobs/:jobId',
  authMiddleware.authenticateToken,
  employerController.deleteJobPosting
)
router.get(
  '/profile',
  authMiddleware.authenticateToken,
  employerController.getEmployerProfile
)
router.put(
  '/profile',
  authMiddleware.authenticateToken,
  employerController.updateEmployerProfile
)

module.exports = router
