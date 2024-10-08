const { User, EmployerProfile, JobseekerProfile } = require('../models')
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')

const { User, JobseekerProfile, EmployerProfile } = require('../models') // Import your models

const { User, EmployerProfile, JobseekerProfile } = require('../models') // Import models

exports.signupWithEmail = async (req, res) => {
  const {
    firebase_uid,
    role,
    firstName,
    lastName,
    email,
    password,
    ...profileData
  } = req.body

  try {
    // Validate role
    if (!['jobseeker', 'employer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create the User record
    const user = await User.create({
      firebase_uid,
      first_name: firstName,
      last_name: lastName,
      email,
      password, // Hash the password if needed (though Firebase Auth handles passwords)
      role
    })

    // Based on role, create either an EmployerProfile or JobseekerProfile
    if (role === 'employer') {
      await EmployerProfile.create({
        user_id: user.id,
        company_name: profileData.companyName,
        company_address: profileData.companyAddress,
        company_phone: profileData.companyPhone,
        company_email: profileData.companyEmail,
        company_size: profileData.companySize
        // Add more employer fields as needed
      })
    } else if (role === 'jobseeker') {
      await JobseekerProfile.create({
        user_id: user.id,
        date_of_birth: profileData.dateOfBirth,
        street_address: profileData.address,
        phone: profileData.phone
        // Add more jobseeker fields as needed
      })
    }

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error in signup:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({ error: 'No ID token provided' })
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const { uid, email } = decodedToken

    let user = await User.findOne({
      where: { firebase_uid: uid },
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })

    if (!user) {
      user = await User.create({
        email,
        firebase_uid: uid,
        role: 'jobseeker',
        first_name: decodedToken.name ? decodedToken.name.split(' ')[0] : '',
        last_name: decodedToken.name ? decodedToken.name.split(' ')[1] : ''
      })

      await JobseekerProfile.create({
        user_id: user.id
      })

      user = await User.findOne({
        where: { id: user.id },
        include: [{ model: JobseekerProfile, as: 'JobseekerProfile' }]
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    let redirectPath = ''
    if (user.role === 'employer') {
      redirectPath = user.EmployerProfile?.intake_completed
        ? '/employer-dash'
        : '/employer-intake'
    } else if (user.role === 'jobseeker') {
      redirectPath = user.JobseekerProfile?.intake_completed
        ? '/jobseeker-dash'
        : '/jobseeker-intake'
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      redirectPath,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.checkIntakeStatus = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findOne({
      where: { id: userId },
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    let intakeCompleted = false
    let redirectPath = ''

    if (user.role === 'employer' && user.EmployerProfile) {
      intakeCompleted = user.EmployerProfile.intake_completed
      redirectPath = intakeCompleted ? '/employer-dash' : '/employer-intake'
    } else if (user.role === 'jobseeker' && user.JobseekerProfile) {
      intakeCompleted = user.JobseekerProfile.intake_completed
      redirectPath = intakeCompleted ? '/jobseeker-dash' : '/jobseeker-intake'
    }

    res.status(200).json({ intakeCompleted, redirectPath })
  } catch (error) {
    console.error('Error in checkIntakeStatus:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        { model: JobseekerProfile, as: 'JobseekerProfile' },
        { model: EmployerProfile, as: 'EmployerProfile' }
      ]
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      profile:
        user.role === 'jobseeker' ? user.JobseekerProfile : user.EmployerProfile
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { firstName, lastName, ...profileData } = req.body

    await User.update(
      { first_name: firstName, last_name: lastName },
      { where: { id: userId } }
    )

    if (req.user.role === 'jobseeker') {
      await JobseekerProfile.update(profileData, { where: { user_id: userId } })
    } else if (req.user.role === 'employer') {
      await EmployerProfile.update(profileData, { where: { user_id: userId } })
    }

    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = exports
