const { sequelize } = require('./models')

async function checkTableSQL() {
  try {
    const [jobseekerResults] = await sequelize.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'jobseeker_profiles' AND column_name = 'intake_completed';
    `)

    const [employerResults] = await sequelize.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'employer_profiles' AND column_name = 'intake_completed';
    `)

    console.log('JobseekerProfile intake_completed:', jobseekerResults)
    console.log('EmployerProfile intake_completed:', employerResults)
  } catch (error) {
    console.error('Error checking table structure:', error)
  } finally {
    await sequelize.close()
    process.exit()
  }
}

checkTableSQL()
