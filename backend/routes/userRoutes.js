// backend/routes/userRoutes.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware') // Assuming you have authentication middleware

// Login Route
router.post('/login', userController.login)

// Signup Route (Email/Password)
router.post('/signup', userController.signupWithEmail)

// Google Signup Route
router.post('/signup/google', userController.signupWithGoogle)

// Get User Profile (Protected Route - Requires Authentication)
router.get(
  '/profile',
  authMiddleware.authenticateToken,
  userController.getUserProfile
)

// Update User Profile (Protected Route - Requires Authentication)
router.put(
  '/profile',
  authMiddleware.authenticateToken,
  userController.updateUserProfile
)

module.exports = router
