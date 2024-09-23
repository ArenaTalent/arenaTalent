const {
  JobseekerProfile,
  JobApplication,
  JobPosting,
  User
} = require('../models')
const { upload, uploadFileToS3 } = require('../utils/fileUpload')
const { validationResult } = require('express-validator')

// Get Job Seeker Profile
exports.getJobSeekerProfile = async (req, res) => {
  const jobSeekerId = req.user.id

  try {
    const jobSeeker = await User.findByPk(jobSeekerId, {
      include: [{ model: JobseekerProfile }]
    })

    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' })
    }

    res.status(200).json(jobSeeker)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Job Seeker Profile
exports.updateJobSeekerProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const profileData = { ...req.body, intake_completed: true }

    let profile = await JobseekerProfile.findOne({ where: { user_id: userId } })

    if (!profile) {
      profile = await JobseekerProfile.create({
        user_id: userId,
        ...profileData
      })
    } else {
      await profile.update(profileData)
    }

    res.status(200).json({ message: 'Job seeker profile updated', profile })
  } catch (error) {
    console.error('Error updating job seeker profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Apply for a Job (Protected - Job Seeker Only)
exports.applyForJob = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const jobSeekerId = req.user.id
    const { jobId, coverLetter } = req.body

    const jobPosting = await JobPosting.findByPk(jobId)
    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' })
    }

    const application = await JobApplication.create({
      jobseeker_id: jobSeekerId,
      job_posting_id: jobId,
      cover_letter: coverLetter,
      status: 'submitted'
    })

    res.status(201).json(application)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get Job Applications by Job Seeker (Protected - Job Seeker Only)
exports.getJobApplicationsByJobSeeker = async (req, res) => {
  try {
    const jobSeekerId = req.user.id

    const applications = await JobApplication.findAll({
      where: { jobseeker_id: jobSeekerId },
      include: [
        {
          model: JobPosting,
          attributes: ['id', 'title', 'description', 'employer_id']
        }
      ]
    })

    res.status(200).json(applications)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getAllJobseekers = async (req, res) => {
  try {
    const jobseekers = await User.findAll({
      where: { role: 'jobseeker' },
      include: [{ model: JobseekerProfile, as: 'JobseekerProfile' }]
    })
    res.status(200).json(jobseekers)
  } catch (error) {
    console.error('Error fetching job seekers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getJobseekerById = async (req, res) => {
  try {
    const jobseeker = await User.findOne({
      where: { id: req.params.id, role: 'jobseeker' },
      include: [{ model: JobseekerProfile, as: 'JobseekerProfile' }]
    })

    if (!jobseeker) {
      return res.status(404).json({ error: 'Job seeker not found' })
    }

    res.status(200).json(jobseeker)
  } catch (error) {
    console.error('Error fetching job seeker:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = exports
