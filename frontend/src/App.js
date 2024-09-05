import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/userSignUp'
import PasswordReset from './components/PasswordReset'
import JobSeekerIntakeForm from './components/JobSeekerIntake'
import ProtectedRoute from './components/ProtectedRoute'

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
