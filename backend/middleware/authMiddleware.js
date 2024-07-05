// backend/middleware/authMiddleware.js
const admin = require('firebase-admin')

async function authenticateToken(req, res, next) {
  const idToken = req.headers.authorization

  if (!idToken) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    // Attach user information to the request for later use
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email
      // Add other claims as needed (e.g., role, name, etc.)
    }

    next() // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired token
    console.error('Error verifying Firebase ID token:', error)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = { authenticateToken }
