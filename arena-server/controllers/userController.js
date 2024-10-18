const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {
  User,
  EmployerProfile,
  JobseekerProfile,
  EventCode,
  Coupon
} = require('../models')
const { sequelize, Sequelize } = require('../models')
const Op = Sequelize.Op // Import Sequelize operators

exports.signupWithEmail = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      eventCode,
      couponCode,
      addressComponents,
      ...profileData
    } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email }, transaction })
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists',
        action: {
          type: 'redirect',
          path: '/login'
        }
      })
    }

    // Validate role
    if (!['jobseeker', 'employer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    let subscriptionEndDate = null
    let couponId = null
    let planType = 'freetrial'

    // Process event code if provided
    if (eventCode) {
      const validEventCode = await EventCode.findOne({
        where: {
          code: eventCode,
          is_active: true,
          expiration_date: {
            [Op.or]: [null, { [Op.gte]: new Date() }]
          }
        },
        transaction
      })

      if (!validEventCode) {
        return res.status(400).json({
          error:
            validEventCode === null
              ? 'Event code not recognized'
              : 'This event code is expired',
          action: {
            type: 'contact',
            email: 'support@arenatalent.com'
          }
        })
      }

      subscriptionEndDate = validEventCode.access_end_date
    }

    // Process coupon code if provided
    if (couponCode) {
      const validCoupon = await Coupon.findOne({
        where: {
          code: couponCode,
          is_active: true,
          expiration_date: {
            [Op.or]: [null, { [Op.gte]: new Date() }]
          }
        },
        transaction
      })

      if (!validCoupon) {
        return res.status(400).json({
          error:
            validCoupon === null
              ? 'Coupon not recognized'
              : 'This coupon is expired',
          action: {
            type: 'contact',
            email: 'support@arenatalent.com'
          }
        })
      }

      const couponDuration = validCoupon.duration
      const currentDate = new Date()
      subscriptionEndDate = new Date(
        currentDate.setDate(currentDate.getDate() + couponDuration)
      )
      couponId = validCoupon.id

      // Update coupon usage count
      await validCoupon.increment('usage_count', { transaction })
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create the User record
    const user = await User.create(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
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
      const emailDomain = email.split('@')[1]
      const companyDomain = profileData.companyWebsite.replace(/^www\./, '')
      const domain_verified = emailDomain === companyDomain

      // Set plan type based on domain verification
      planType = domain_verified ? 'freetrial' : 'hidden'

      await EmployerProfile.create(
        {
          user_id: user.id,
          company_name: profileData.companyName,
          company_website: profileData.companyWebsite,
          company_address:
            profileData.company_address || addressComponents.formatted_address,
          company_phone: profileData.companyPhone,
          company_email: email,
          company_size: profileData.companySize,
          domain_verified: domain_verified,
          plan_type: planType,
          city: addressComponents.locality,
          state: addressComponents.administrative_area_level_1,
          zip_code: addressComponents.postal_code,
          country: addressComponents.country
        },
        { transaction }
      )
    } else {
      await JobseekerProfile.create(
        {
          user_id: user.id,
          date_of_birth: profileData.dateOfBirth,
          street_address: addressComponents.formatted_address,
          phone: profileData.phone,
          plan_type: planType,
          city: addressComponents.locality,
          state: addressComponents.administrative_area_level_1,
          zip_code: addressComponents.postal_code,
          country: addressComponents.country
        },
        { transaction }
      )
    }

    await transaction.commit()

    // Create Firebase user after successful database insertion
    try {
      const firebaseUser = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: `${firstName} ${lastName}`
      })

      // Update user with Firebase UID
      await User.update(
        { firebase_uid: firebaseUser.uid },
        { where: { id: user.id } }
      )

      // Send email verification
      await admin.auth().generateEmailVerificationLink(email)

      res.status(201).json({
        message: 'User registered successfully',
        userId: user.id,
        role: user.role,
        planType: planType
      })
    } catch (firebaseError) {
      console.error('Error creating Firebase user:', firebaseError)
      // Here you might want to implement a retry mechanism or manual intervention
      res.status(201).json({
        message:
          'User registered successfully, but there was an issue with Firebase account creation. Please contact support.',
        userId: user.id,
        role: user.role,
        planType: planType
      })
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error in signup:', error)
    res.status(500).json({
      error: 'Hm. Something went wrong please try again.',
      action: {
        type: 'contact',
        email: 'support@arenatalent.com'
      }
    })
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
