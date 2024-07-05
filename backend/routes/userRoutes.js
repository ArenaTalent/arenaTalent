const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator') // for input validation

// Validate signup input
const signupValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
]

// Login Route
router.post('/login', userController.login)

// Signup Route (Email/Password)
router.post('/signup', signupValidation, userController.signupWithEmail)

// Google Signup Route
router.post('/signup/google', userController.signupWithGoogle)

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

// Update Profile Picture (Protected Route)
router.put(
  '/profile/picture',
  authMiddleware.authenticateToken,
  upload.single('image'),
  userController.updateProfilePicture
)

// Update Cover Photo (Protected Route)
router.put(
  '/profile/cover',
  authMiddleware.authenticateToken,
  upload.single('image'),
  userController.updateCoverPhoto
)

module.exports = router
