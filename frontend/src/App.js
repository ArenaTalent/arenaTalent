import './App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/userSignUp'
import PasswordReset from './components/PasswordReset'

// ... (import other components as needed)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          {/* ... (add more routes for other components) */}
        </Routes>
      </div>
    </Router>
  )
}

export default App

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import GlobalStyles from './GlobalStyles';
// import HomePage from './pages/HomePage';
// import JobSeekerProfile from './components/JobSeekerProfile';
// import EmployerProfile from './components/EmployerProfile';
// import JobDetails from './components/JobDetails';
// import Search from './components/Search';
// import Messaging from './components/Messaging';
// import { AuthProvider } from './AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <GlobalStyles />
//         <Switch>
//           <Route path="/" exact component={HomePage} />
//           <Route path="/job-seeker-profile" component={JobSeekerProfile} />
//           <Route path="/employer-profile" component={EmployerProfile} />
//           <Route path="/job-details/:id" component={JobDetails} />
//           <Route path="/search" component={Search} />
//           <Route path="/messaging" component={Messaging} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
