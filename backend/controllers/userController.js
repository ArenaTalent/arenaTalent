const { User, JobseekerProfile, EmployerProfile } = require('../models')
const { uploadToS3 } = require('../utils/fileUpload')

// Function to handle email/password signup
exports.signupWithEmail = async (req, res) => {
  const idToken = req.headers.authorization
  const { email, firstName, lastName, role } = req.body

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    // Check if user already exists
    let user = await User.findOne({ where: { firebase_uid: decodedToken.uid } })

    if (!user) {
      // Create new user if they don't exist
      user = await User.create({
        firebase_uid: decodedToken.uid,
        email,
        first_name: firstName,
        last_name: lastName,
        role: role || 'jobseeker' // Set default role if not provided
      })
    } // else, you might want to update existing user data here

    res
      .status(201)
      .json({ message: 'User created/updated successfully', userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to handle Google signup
exports.signupWithGoogle = async (req, res) => {
  const idToken = req.headers.authorization

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    // Get user info from decoded token
    const { email, name } = decodedToken
    const [firstName, lastName] = name ? name.split(' ') : ['', '']

    // Check if user already exists
    let user = await User.findOne({ where: { firebase_uid: decodedToken.uid } })

    if (!user) {
      // Create new user if they don't exist
      user = await User.create({
        firebase_uid: decodedToken.uid,
        email,
        first_name: firstName,
        last_name: lastName,
        role: 'jobseeker' // You can set the default role here
      })
    }

    res
      .status(201)
      .json({ message: 'User created/updated successfully', userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.updateProfilePicture = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const userId = req.user.uid
    const profilePicture = req.file

    if (!profilePicture) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const imageUrl = await uploadFileToS3(profilePicture)

      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      let ProfileModel
      if (user.role === 'jobseeker') {
        ProfileModel = JobseekerProfile
      } else if (user.role === 'employer') {
        ProfileModel = EmployerProfile
      } else if (user.role === 'employer_member') {
        ProfileModel = EmployerMember
      }

      const profile = await ProfileModel.findOne({ where: { user_id: userId } })
      if (profile) {
        await profile.update({ profile_picture_url: imageUrl })
      } else {
        return res.status(404).json({ error: 'Profile not found' })
      }
      return res
        .status(200)
        .json({ message: 'Profile picture updated', imageUrl })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
}

exports.updateCoverPhoto = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const userId = req.user.uid
    const coverPhoto = req.file

    if (!coverPhoto) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const imageUrl = await uploadFileToS3(coverPhoto)

      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      let ProfileModel
      if (user.role === 'jobseeker') {
        ProfileModel = JobseekerProfile
      } else if (user.role === 'employer') {
        ProfileModel = EmployerProfile
      } else if (user.role === 'employer_member') {
        ProfileModel = EmployerMember
      }

      const profile = await ProfileModel.findOne({ where: { user_id: userId } })
      if (profile) {
        await profile.update({ cover_photo_url: imageUrl })
      } else {
        return res.status(404).json({ error: 'Profile not found' })
      }
      return res.status(200).json({ message: 'Cover photo updated', imageUrl })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
}
