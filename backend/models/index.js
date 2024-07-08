// backend/models/index.js
const User = require('./user')
const JobseekerProfile = require('./jobseekerProfile')
const EmployerProfile = require('./employerProfile')
const EmployerMember = require('./employerMember')

// ... (set up relationships between models here, if needed)

module.exports = {
  User,
  JobseekerProfile,
  EmployerProfile,
  EmployerMember
}
