const express = require('express')
const multer = require('multer')
const { uploadFile } = require('../services/awsService')
const JobSeekerProfile = require('../models/jobseekerProfile')
const Company = require('../models/employerProfile')
const Job = require('../models/jobPosting')
const authMiddleware = require('../middleware/authMiddleware')
const { Sequelize } = require('sequelize')
const { JobseekerProfile } = require('../models')

const router = express.Router()

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})
const checkFileCountLimit = (field, limit) => async (req, res, next) => {
  console.log('Checking file count limit...')
  console.log('Received file:', req.file)
  console.log('req.user:', req.user)
  try {
    if (!req.user || !req.user.id) {
      console.log('User not found in request')
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const jobSeekerProfile = await JobseekerProfile.findOne({
      where: { user_id: req.user.id }
    })
    if (!jobSeekerProfile) {
      console.log('JobSeeker profile not found')
      return res.status(404).json({ error: 'JobSeeker profile not found' })
    }
    console.log(`Current ${field}:`, jobSeekerProfile[field])
    if (jobSeekerProfile[field]) {
      return res.status(400).json({
        error: `You have already uploaded a ${field.replace(
          '_',
          ' '
        )}. Please delete the existing one before uploading a new one.`
      })
    }
    next()
  } catch (error) {
    console.error('Error checking file count limit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
// Job Seeker Routes

// Profile Picture Upload (1 limit/user)
router.post(
  '/job-seeker/profile-picture',
  authMiddleware.authenticateToken,
  upload.single('file'),
  checkFileCountLimit('profile_picture', 1),
  upload.single('file'),
  async (req, res) => {
    try {
      console.log('Received profile picture upload request')
      console.log('User:', req.user)
      console.log('File:', req.file)

      if (!req.file) {
        console.log('No file received')
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const userId = req.user.id
      console.log('Uploading file to S3...')
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        userId,
        'jobSeekerProfilePic'
      )
      console.log('File uploaded to S3:', fileUrl)

      console.log('Updating JobseekerProfile...')
      const jobSeekerProfile = await JobseekerProfile.findOne({
        where: { user_id: userId }
      })
      if (!jobSeekerProfile) {
        console.log('JobSeeker profile not found')
        return res.status(404).json({ error: 'JobSeeker profile not found' })
      }
      await jobSeekerProfile.update({ profile_picture: fileUrl })
      console.log('JobSeeker profile updated with new profile picture')

      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      console.error('Error stack:', error.stack)
      if (error.message.includes('Failed to upload file to S3')) {
        return res
          .status(500)
          .json({ error: 'S3 upload failed', details: error.message })
      }
      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Invalid data provided', details: error.errors })
      }
      res
        .status(500)
        .json({ error: 'Internal server error', details: error.message })
    }
  }
)

// Resume Upload (1 limit/user)
router.post(
  '/job-seeker/resume',
  checkFileCountLimit(JobSeekerProfile, 'resumeUrl', 1),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const userId = req.user.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        userId,
        'resume'
      )
      await JobSeekerProfile.update(
        { resumeUrl: fileUrl },
        { where: { id: userId } }
      )
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Cover Photo Upload (1 limit/user)
router.post(
  '/job-seeker/cover-photo',
  checkFileCountLimit(JobSeekerProfile, 'coverPhoto', 1),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const userId = req.user.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        userId,
        'jobSeekerCoverPhoto'
      )
      await JobSeekerProfile.update(
        { coverPhoto: fileUrl },
        { where: { id: userId } }
      )
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Video Upload (3 limit/user)
router.post(
  '/job-seeker/video',
  checkFileCountLimit(JobSeekerProfile, 'videos', 3),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const userId = req.user.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        userId,
        'jobSeekerVideo'
      )
      await JobSeekerProfile.update(
        {
          videos: Sequelize.fn('array_append', Sequelize.col('videos'), fileUrl)
        },
        { where: { id: userId } }
      )
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Company Routes

// Logo Upload (1 limit/company)
router.post(
  '/company/logo',
  checkFileCountLimit(Company, 'logo', 1),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const companyId = req.company.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        companyId,
        'companyLogo'
      )
      await Company.update({ logo: fileUrl }, { where: { id: companyId } })
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Company Photo Upload (5 limit/company)
router.post('/company/photo', async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const companyId = req.company.id
    const company = await Company.findByPk(companyId)
    if (company.photos && company.photos.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You have reached the maximum limit of 5 photos.' })
    }
    const fileUrl = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      companyId,
      'companyPhoto'
    )
    await Company.update(
      {
        photos: Sequelize.fn('array_append', Sequelize.col('photos'), fileUrl)
      },
      { where: { id: companyId } }
    )
    res.json({ url: fileUrl })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Company Video Upload (1 limit/company)
router.post(
  '/company/video',
  checkFileCountLimit(Company, 'videoUrl', 1),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const companyId = req.company.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        companyId,
        'companyVideo'
      )
      await Company.update({ videoUrl: fileUrl }, { where: { id: companyId } })
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Job Description Upload (unlimited per company)
router.post('/company/job-description', async (req, res) => {
  try {
    const { jobId, description } = req.body
    const companyId = req.company.id

    // Check if the job belongs to the company
    const job = await Job.findOne({
      where: { id: jobId, companyId: companyId }
    })
    if (!job) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to update this job.' })
    }

    // Update the job description
    await Job.update({ description: description }, { where: { id: jobId } })
    res.json({ message: 'Job description updated successfully' })
  } catch (error) {
    console.error('Job description update error:', error)
    res.status(500).json({ error: 'Failed to update job description' })
  }
})

module.exports = router
