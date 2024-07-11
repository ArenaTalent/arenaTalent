const {
  EmployerProfile,
  JobPosting,
  JobApplication,
  User
} = require('../models')
const { upload, uploadFileToS3 } = require('../utils/fileUpload')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

// Create Job Posting (Protected - Employer Only)
exports.createJobPosting = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const employerId = req.user.id
    const { title, description, ...otherData } = req.body

    const jobPosting = await JobPosting.create({
      employer_id: employerId,
      title,
      description,
      ...otherData
    })
    res.status(201).json(jobPosting)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Job Posting (Protected - Employer Only)
exports.updateJobPosting = async (req, res) => {
  // ... (Add input validation and similar logic to createJobPosting, but use JobPosting.update() to update the existing job)
}

// Delete Job Posting (Protected - Employer Only)
exports.deleteJobPosting = async (req, res) => {
  try {
    const jobId = req.params.jobId
    const employerId = req.user.id

    const jobPosting = await JobPosting.findOne({
      where: { id: jobId, employer_id: employerId }
    })

    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' })
    }

    await jobPosting.destroy()
    res.json({ message: 'Job posting deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get Employer Profile
exports.getEmployerProfile = async (req, res) => {
  const employerId = req.user.id

  try {
    const employer = await User.findByPk(employerId, {
      include: [{ model: EmployerProfile }, { model: JobPosting }]
    })

    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' })
    }

    res.status(200).json(employer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Employer Profile
exports.updateEmployerProfile = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const userId = req.user.id
    const profilePicture = req.files['profilePicture']
      ? req.files['profilePicture'][0]
      : null
    const coverPhoto = req.files['coverPhoto']
      ? req.files['coverPhoto'][0]
      : null

    try {
      const profilePictureUrl = profilePicture
        ? await uploadFileToS3(profilePicture)
        : null
      const coverPhotoUrl = coverPhoto ? await uploadFileToS3(coverPhoto) : null

      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const profile = await EmployerProfile.findOne({
        where: { user_id: userId }
      })
      if (profile) {
        await profile.update({
          ...req.body, // Update other profile fields
          profile_picture_url: profilePictureUrl || profile.profile_picture_url, // Keep old URL if no new one
          cover_photo_url: coverPhotoUrl || profile.cover_photo_url // Keep old URL if no new one
        })
      } else {
        return res.status(404).json({ error: 'Profile not found' })
      }

      return res
        .status(200)
        .json({ message: 'Employer profile updated', profile })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
}

// Get Job Applications (Protected - Employer Only)
exports.getJobApplications = async (req, res) => {
  try {
    const employerId = req.user.id
    const jobId = req.params.jobId // Assuming the job ID is in the URL parameter

    const jobPosting = await JobPosting.findOne({
      where: { id: jobId, employer_id: employerId }
    })
    if (!jobPosting) {
      return res
        .status(404)
        .json({ error: 'Job posting not found or you are not the owner.' })
    }

    // Fetch applications associated with the job, including job seeker details
    const applications = await JobApplication.findAll({
      where: { job_posting_id: jobId },
      include: [
        {
          model: User,
          as: 'jobseeker',
          attributes: ['id', 'email', 'first_name', 'last_name'] // Exclude sensitive data
        }
      ]
    })

    res.status(200).json(applications)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get Job Postings by Employer (Protected - Employer Only)
exports.getJobPostingsByEmployer = async (req, res) => {
  try {
    const employerId = req.user.id // Get the employer's ID from the authenticated user

    const jobPostings = await JobPosting.findAll({
      where: { employer_id: employerId },
      attributes: { exclude: ['updatedAt'] } // Exclude updatedAt from the response
    })

    res.status(200).json(jobPostings)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await User.findAll({
      where: { role: 'employer' },
      include: [{ model: EmployerProfile, as: 'EmployerProfile' }]
    })
    res.status(200).json(employers)
  } catch (error) {
    console.error('Error fetching employers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getEmployerById = async (req, res) => {
  try {
    const employer = await User.findOne({
      where: { id: req.params.id, role: 'employer' },
      include: [{ model: EmployerProfile, as: 'EmployerProfile' }]
    })

    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' })
    }

    res.status(200).json(employer)
  } catch (error) {
    console.error('Error fetching employer:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
