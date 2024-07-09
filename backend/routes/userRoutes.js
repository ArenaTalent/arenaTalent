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

// Login Route
router.post('/login', async (req, res) => {
  await userController.login(req, res)
})

// Signup Route (Email/Password)
router.post('/signup', signupValidation, async (req, res) => {
  console.log('Signup endpoint hit')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  await userController.signupWithEmail(req, res)
})

// Google Signup Route
router.post('/signup/google', async (req, res) => {
  await userController.signupWithGoogle(req, res)
})

// Get User Profile (Protected Route)
router.get('/profile', authMiddleware.authenticateToken, async (req, res) => {
  await userController.getUserProfile(req, res)
})

// Update User Profile (Protected Route)
router.put(
  '/profile',
  authMiddleware.authenticateToken,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }
  ]),
  async (req, res) => {
    await userController.updateUserProfile(req, res)
  }
)

// Route to get all users (Admin only)
router.get('/', authMiddleware.authenticateToken, async (req, res) => {
  await userController.getAllUsers(req, res)
})

module.exports = router
