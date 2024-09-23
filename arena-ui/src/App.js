import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/userSignUp'
import PasswordReset from './components/PasswordReset'
import JobSeekerIntakeForm from './components/JobSeekerIntake/JobSeekerIntake'
import ProtectedRoute from './components/ProtectedRoute'
import JobSeekerDash from './components/JobSeeker/JobSeekerDash'
import JobSeekerProfile from './components/JobSeeker/JobSeekerProfile'
import CompanySearch from './components/JobSeeker/CompanySearch'
import JobPosting from './components/JobSeeker/JobPostingOne'
import JobSearch from './components/JobSeeker/JobSearch'
import EmployerDash from './components/Employer/Employerdash'
import ApplicationTracking from './components/JobSeeker/ApplicationTracking'
import DemoJobSeekerIntakeForm from './components/demoSeekerIntake/demoJobSeekerIntake'
import EmployerIntakeForm from './components/Employer/EmployerIntake'
import CandidateSourcing from './components/Employer/CandidateSourcing'
import ATSCandidate from './components/Employer/ATSCandidate'
import JobTracking from './components/Employer/JobTracking'
import EmployerSchedule from './components/Employer/EmployerSchedule'
import MSBCEmployerDash from './components/Employer/MSBCEmployerDash'
import EmployerProfile from './components/Employer/EmployerProfile'

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
            <Route path="/employer-profile" element={<EmployerProfile />} />
            <Route path="/jobseeker-dashboard" element={<JobSeekerDash />} />
            <Route path="/jobseeker-profile" element={<JobSeekerProfile />} />
            <Route path="/search-companies" element={<CompanySearch />} />
            <Route path="/job-posting1" element={<JobPosting />} />
            <Route path="/search-jobs" element={<JobSearch />} />
            <Route path="/employer-dashboard" element={<EmployerDash />} />
            <Route path="/sourcing" element={<CandidateSourcing />} />
            <Route path="/ats-profile" element={<ATSCandidate />} />
            <Route path="/job-tracking" element={<JobTracking />} />
            <Route path="/employer-schedule" element={<EmployerSchedule />} />
            <Route
              path="/msbc-employer-dashboard"
              element={<MSBCEmployerDash />}
            />
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
