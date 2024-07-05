import './App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/userSignUp'
// ... (import other components as needed)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ... (add more routes for other components) */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
