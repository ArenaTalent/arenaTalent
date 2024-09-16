const express = require('express')
const { uploadFile } = require('../services/awsService')
const JobSeeker = require('../models/jobSeeker')
const Company = require('../models/company')
const Job = require('../models/job')
const { Sequelize } = require('sequelize')
const router = express.Router()

// Middleware to check file count limits
const checkFileCountLimit = (model, field, limit) => async (req, res, next) => {
  try {
    const count = await model.count({
      where: {
        id: req.user.id,
        [field]: { [Sequelize.Op.ne]: null }
      }
    })
    if (count >= limit) {
      return res.status(400).json({
        error: `You have reached the maximum limit of ${limit} file(s) for this type.`
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
  checkFileCountLimit(JobSeeker, 'profilePicture', 1),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
      const userId = req.user.id
      const fileUrl = await uploadFile(
        req.file.buffer,
        req.file.originalname,
        userId,
        'jobSeekerProfilePic'
      )
      await JobSeeker.update(
        { profilePicture: fileUrl },
        { where: { id: userId } }
      )
      res.json({ url: fileUrl })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Resume Upload (1 limit/user)
router.post(
  '/job-seeker/resume',
  checkFileCountLimit(JobSeeker, 'resumeUrl', 1),
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
      await JobSeeker.update({ resumeUrl: fileUrl }, { where: { id: userId } })
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
  checkFileCountLimit(JobSeeker, 'coverPhoto', 1),
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
      await JobSeeker.update({ coverPhoto: fileUrl }, { where: { id: userId } })
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
  checkFileCountLimit(JobSeeker, 'videos', 3),
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
      await JobSeeker.update(
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
