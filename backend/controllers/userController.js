const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.signupWithEmail = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    })
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error registering new user: ' + error.message })
  }
}

exports.login = async (req, res) => {
  // Implementation needed
}

exports.getUserProfile = async (req, res) => {
  // Implementation needed
}

exports.updateUserProfile = async (req, res) => {
  // Implementation needed
}

exports.getAllUsers = async (req, res) => {
  // Implementation needed
}
