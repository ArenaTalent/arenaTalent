const express = require('express')
const router = express.Router()
const employerMemberController = require('../controllers/employerMemberController')

// ... other routes (create, get, update, delete employer members)

// Update Profile Picture (Protected Route)
router.put(
  '/:memberId/picture',
  authMiddleware.authenticateToken,
  upload.single('image'),
  employerMemberController.updateEmployerMemberProfilePicture
)

// Update Cover Photo (Protected Route)
router.put(
  '/:memberId/cover',
  authMiddleware.authenticateToken,
  upload.single('image'),
  employerMemberController.updateEmployerMemberCoverPhoto
)

module.exports = router
