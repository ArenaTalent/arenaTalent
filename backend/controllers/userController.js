const { User } = require('../models') // Assuming you have your Sequelize model for User
const admin = require('firebase-admin')

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
