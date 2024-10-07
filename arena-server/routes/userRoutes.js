const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body, validationResult } = require('express-validator')
const { upload } = require('../utils/fileUpload')

// Signup Validation rules
const signupValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
]

/// Signup Route
router.post('/signup', signupValidation, userController.signupWithEmail)

// Login Route
router.post('/login', userController.login)

// Check Intake Status Route (Protected)
router.get(
  '/check-intake',
  authMiddleware.authenticateToken,
  userController.checkIntakeStatus
)

// Get User Profile (Protected Route)
router.get(
  '/profile',
  authMiddleware.authenticateToken,
  userController.getUserProfile
)

// Update User Profile (Protected Route)
router.put(
  '/profile',
  authMiddleware.authenticateToken,
  userController.updateUserProfile
)

// Get All Users (Admin Only, if needed)
router.get('/', authMiddleware.authenticateToken, userController.getAllUsers)

router.get('/test', (req, res) => {
  // Your logic for checking intake, e.g., fetching user info from the DB
  res.json({ message: 'Intake data here' }) // Replace with your actual data
})
module.exports = router
