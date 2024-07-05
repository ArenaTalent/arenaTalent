// backend/controllers/employerMemberController.js
const { EmployerMember } = require('../models')
const { upload, uploadFileToS3 } = require('../utils/fileUpload')
const { validationResult } = require('express-validator') // Assuming you're using express-validator for validation

// Create Employer Member
exports.createEmployerMember = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { employerId, memberEmail, role } = req.body

  try {
    const existingMember = await EmployerMember.findOne({
      where: { member_email: memberEmail }
    })
    if (existingMember) {
      return res
        .status(400)
        .json({ error: 'Email already associated with an employer member.' })
    }
    // Create a new employer member (initially with status 'invited')
    const member = await EmployerMember.create({
      employer_id: employerId,
      member_email: memberEmail,
      role
    })

    // ... (Logic to send an invitation email to member_email)

    res
      .status(201)
      .json({ message: 'Employer member invited successfully', member })
  } catch (error) {
    console.error('Error creating employer member:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Employer Member
exports.updateEmployerMember = async (req, res) => {
  // ... (same as createEmployerMember, but update existing record using findByPk and then update)
}

// Get Employer Members by Employer
exports.getEmployerMembers = async (req, res) => {
  // ... (add logic to fetch employer members based on employer_id)
}

// Update Profile Picture (for employer members)
exports.updateEmployerMemberProfilePicture = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const memberId = req.params.memberId
    const profilePicture = req.file

    if (!profilePicture) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const imageUrl = await uploadFileToS3(profilePicture)

      const member = await EmployerMember.findByPk(memberId)
      if (!member) {
        return res.status(404).json({ error: 'Employer member not found' })
      }

      await member.update({ profile_picture_url: imageUrl })
      res.status(200).json({ message: 'Profile picture updated', imageUrl })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
}

// Update Cover Photo (for employer members)
exports.updateEmployerMemberCoverPhoto = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const memberId = req.params.memberId
    const coverPhoto = req.file

    if (!coverPhoto) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const imageUrl = await uploadFileToS3(coverPhoto)
      const member = await EmployerMember.findByPk(memberId)
      if (!member) {
        return res.status(404).json({ error: 'Employer member not found' })
      }

      await member.update({ cover_photo_url: imageUrl })
      res.status(200).json({ message: 'Cover photo updated', imageUrl })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
}

// ... (Other employer member functions: delete, etc.)
