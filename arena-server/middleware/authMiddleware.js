const admin = require('firebase-admin')
const { User } = require('../models')

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  })
}

exports.authenticateToken = async (req, res, next) => {
  console.log('Authenticating token')
  const authHeader = req.headers.authorization
  if (!authHeader) {
    console.log('No authorization header provided')
    return res
      .status(401)
      .json({ error: 'Access denied. No authorization header provided.' })
  }

  const [bearer, token] = authHeader.split(' ')
  if (bearer !== 'Bearer' || !token) {
    console.log('Invalid authorization header format')
    return res
      .status(401)
      .json({ error: 'Invalid authorization header format.' })
  }

  try {
    console.log('Verifying token...')
    const decodedToken = await admin.auth().verifyIdToken(token)
    console.log('Token verified. Decoded UID:', decodedToken.uid)

    console.log('Looking up user in database...')
    const user = await User.findOne({
      where: { firebase_uid: decodedToken.uid }
    })

    if (!user) {
      console.log('User not found in the database')
      return res.status(404).json({ error: 'User not found.' })
    }

    req.user = {
      id: user.id,
      firebase_uid: decodedToken.uid,
      email: user.email,
      role: user.role
    }

    console.log('Token verified successfully for user:', req.user.id)
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    if (error.code === 'auth/id-token-expired') {
      return res
        .status(401)
        .json({ error: 'Token has expired. Please log in again.' })
    } else if (error.code === 'auth/argument-error') {
      return res.status(400).json({ error: 'Invalid token format.' })
    } else if (error.code === 'auth/invalid-argument') {
      return res.status(400).json({ error: 'Invalid token.' })
    } else {
      console.error('Unexpected error during token verification:', error)
      return res
        .status(500)
        .json({ error: 'An unexpected error occurred during authentication.' })
    }
  }
}
