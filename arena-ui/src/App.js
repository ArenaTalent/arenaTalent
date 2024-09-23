import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/userSignUp'
import PasswordReset from './components/PasswordReset'
import JobSeekerIntakeForm from './components/JobSeekerIntake/JobSeekerIntake'
import ProtectedRoute from './components/ProtectedRoute'
import JobSeekerDash from './components/JobSeekerDash'
import OliviaProfile from './components/OliviaProfile'
import CompanySearch from './components/CompanySearch'
import ArenaCompanyProfile from './components/ArenaProfile'
import JobPosting from './components/JobPostingOne'
import JobSearch from './components/JobSearch'
import EmployerDash from './components/Employerdash'
import ApplicationTracking from './components/ApplicationTracking'
import MessagingApp from './components/Messaging'
import DemoJobSeekerIntakeForm from './components/demoSeekerIntake/demoJobSeekerIntake'
import EmployerIntakeForm from './components/EmployerIntake'
import EmployerProfile from './components/EmployerProfile'
import CandidateSourcing from './components/CandidateSourcing'
import ATSCandidate from './components/ATSCandidate'
import JobTracking from './components/JobTracking'
import EmployerSchedule from './components/EmployerSchedule'

function App() {
  console.log('App component rendered')
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/jobseeker-dashboard" element={<JobSeekerDash />} />
            <Route path="/jobseeker-profile" element={<OliviaProfile />} />
            <Route path="/search-companies" element={<CompanySearch />} />
            <Route path="/company-profile" element={<ArenaCompanyProfile />} />
            <Route path="/job-posting1" element={<JobPosting />} />
            <Route path="/search-jobs" element={<JobSearch />} />
            <Route path="/employer-dashboard" element={<EmployerDash />} />
            <Route path="/sourcing" element={<CandidateSourcing />} />
            <Route path="/ats-profile" element={<ATSCandidate />} />
            <Route path="/job-tracking" element={<JobTracking />} />
            <Route path="/employer-schedule" element={<EmployerSchedule />} />
            <Route
              path="/demo-jobseeker-intake"
              element={<DemoJobSeekerIntakeForm />}
            />
            <Route
              path="/demo-employer-intake"
              element={<EmployerIntakeForm />}
            />
            {/* <Route path="/messaging" element={<MessagingApp />} /> */}
            <Route
              path="/application-tracking"
              element={<ApplicationTracking />}
            />
            <Route
              path="/jobseeker-intake"
              element={
                <ProtectedRoute>
                  <JobSeekerIntakeForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
