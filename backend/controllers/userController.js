const { User, EmployerProfile, JobseekerProfile } = require('../models')
const bcrypt = require('bcryptjs')

// Signup with Email
exports.signupWithEmail = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      companyName,
      companyEmail,
      companyWebsite,
      companyPhone,
      companyAddress
    } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      role
    })

    if (role === 'employer') {
      await EmployerProfile.create({
        user_id: newUser.id,
        company_name: companyName,
        company_email: companyEmail,
        company_website: companyWebsite,
        company_phone: companyPhone,
        company_address: companyAddress
      })
    } else if (role === 'jobseeker') {
      await JobseekerProfile.create({
        user_id: newUser.id
      })
    }

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    console.error('Error registering new user:', error)
    res
      .status(500)
      .json({ error: 'Error registering new user: ' + error.message })
  }
}

// Send Password Reset Email
exports.sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get All Users
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email },
      include: [
        { model: EmployerProfile, as: 'EmployerProfile' },
        { model: JobseekerProfile, as: 'JobseekerProfile' }
      ]
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret') // Replace 'your_jwt_secret' with your actual secret

    // Determine the redirection path
    let redirectPath = ''
    if (user.role === 'employer') {
      redirectPath = user.EmployerProfile.intake_completed
        ? '/employer-dash'
        : '/employer-intake'
    } else if (user.role === 'jobseeker') {
      redirectPath = user.JobseekerProfile.intake_completed
        ? '/jobseeker-dash'
        : '/jobseeker-intake'
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      redirectPath
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
