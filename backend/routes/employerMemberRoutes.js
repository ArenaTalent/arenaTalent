// backend/routes/employerMemberRoutes.js
const express = require('express')
const router = express.Router()
const employerMemberController = require('../controllers/employerMemberController')
const authMiddleware = require('../middleware/authMiddleware')
const { upload } = require('../utils/fileUpload') // Assuming you've defined the upload function in fileUpload.js

// Update Profile Picture (Protected Route)
router.put(
  '/:memberId/picture',
  authMiddleware.authenticateToken,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }
  ]),
  async (req, res) => {
    await employerMemberController.updateEmployerMemberProfilePicture(req, res)
  }
)

// Update Cover Photo (Protected Route) - You don't need a separate route for this
// ... it can be handled in the same route as updating the profile picture

module.exports = router
