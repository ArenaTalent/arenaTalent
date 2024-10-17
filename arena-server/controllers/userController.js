const { User, EmployerProfile, JobseekerProfile } = require('../models')
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../models') // Adjust the path as necessary

const {
  User,
  EmployerProfile,
  JobseekerProfile,
  EventCode,
  Coupon
} = require('../models')
const { sequelize } = require('../models')

exports.signupWithEmail = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const {
      firebase_uid,
      role,
      firstName,
      lastName,
      email,
      password,
      eventCode,
      couponCode,
      ...profileData
    } = req.body

    // Validate role
    if (!['jobseeker', 'employer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    let subscriptionEndDate = null
    let couponId = null

    // Process event code if provided
    if (eventCode) {
      const validEventCode = await EventCode.findOne({
        where: {
          code: eventCode,
          is_active: true,
          expiration_date: {
            [sequelize.Op.or]: [null, { [sequelize.Op.gte]: new Date() }]
          }
        },
        transaction
      })

      if (validEventCode) {
        subscriptionEndDate = validEventCode.access_end_date
      } else {
        return res.status(400).json({ error: 'Invalid or expired event code' })
      }
    }

    // Process coupon code if provided
    if (couponCode) {
      const validCoupon = await Coupon.findOne({
        where: {
          code: couponCode,
          is_active: true,
          expiration_date: {
            [sequelize.Op.or]: [null, { [sequelize.Op.gte]: new Date() }]
          }
        },
        transaction
      })

      if (validCoupon) {
        const couponDuration = validCoupon.duration
        const currentDate = new Date()
        subscriptionEndDate = new Date(
          currentDate.setDate(currentDate.getDate() + couponDuration)
        )
        couponId = validCoupon.id

        // Update coupon usage count
        await validCoupon.increment('usage_count', { transaction })
      } else {
        return res.status(400).json({ error: 'Invalid or expired coupon code' })
      }
    }

    // Create the User record
    const user = await User.create(
      {
        firebase_uid,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
        subscription_end_date: subscriptionEndDate,
        event_code: eventCode,
        coupon_code: couponCode,
        coupon_id: couponId
      },
      { transaction }
    )

    // Create profile based on role
    if (role === 'employer') {
      await EmployerProfile.create(
        {
          user_id: user.id,
          company_name: profileData.companyName,
          company_website: profileData.companyWebsite,
          company_address: profileData.companyAddress,
          company_phone: profileData.companyPhone,
          company_email: profileData.email,
          company_size: profileData.companySize,
          domain_verified: profileData.domain_verified
        },
        { transaction }
      )
    } else {
      await JobseekerProfile.create(
        {
          user_id: user.id,
          date_of_birth: profileData.dateOfBirth,
          street_address: profileData.address,
          phone: profileData.phone
        },
        { transaction }
      )
    }

    await transaction.commit()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    await transaction.rollback()
    console.error('Error in signup:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    console.log('Login controller reached')

    const { idToken } = req.body

    if (!idToken) {
      console.log('No ID token provided')
      return res.status(400).json({ error: 'No ID token provided' })
    }

    console.log('Verifying ID token')
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const { uid, email } = decodedToken

    console.log('Token verified, fetching user from database')
    let user = await User.findOne({
      where: { firebase_uid: uid },
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })

    if (!user) {
      console.log('User not found in database, creating new user')
      // ... (rest of the user creation logic)
    }

    console.log('Sending login response')
    res.status(200).json({
      message: 'Login successful',
      redirectPath:
        user.role === 'employer'
          ? '/employer-dashboard'
          : '/jobseeker-dashboard',
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
    res
      .status(500)
      .json({ error: 'Internal server error', details: error.message })
  }
}

exports.checkIntakeStatus = async (req, res) => {
  try {
    const userId = req.user.id // Change this line
    console.log('Checking intake status for user:', userId)

    const user = await User.findOne({
      where: { id: userId }, // Change this line
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })

    if (!user) {
      console.log('User not found in the database')
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

    console.log('Intake status:', { intakeCompleted, redirectPath })
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
