// backend/middleware/authMiddleware.js
const admin = require('firebase-admin')

const projectId = 'arenatalent-d7a88'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: projectId
  })
}

exports.authenticateToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(400).send('Invalid token.')
  }
}
