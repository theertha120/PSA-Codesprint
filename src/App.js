import { useState } from 'react';
import './App.css';
import SkillWallet from './SkillWallet';
import NavBar from './NavBar';
import '@fontsource/poppins';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CareerVoyage from './CareerVoyage';
import GenerationalEngagement from './generationalEngagement.tsx';
import LearningDashboard from './LearningDashboard.js';
import HomePage from './HomePage.js';
import Login from './Login.js';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    darkPurple: {
      50: "#f7e8ff", // Lightest shade
      100: "#e3c6ff", // Lighter shade
      200: "#d6a6ff", // Light shade
      300: "#b27aff", // Base color
      400: "#9b5ce6", // Dark shade
      500: "#7a2eaa", // Darker shade
      600: "#4c1b70", // Even darker shade
      700: "#3c1153", // Very dark shade
      800: "#2a0a39", // Darkest shade
      900: "#1a0524", // Deepest shade
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if user is logged in

  // Function to handle login success and set authenticated state
  const handleLoginSuccess = () => {
    console.log("User logged in successfully!"); // Debug log
    setIsAuthenticated(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Router>
          {/* Render NavBar if authenticated */}
          {isAuthenticated && <NavBar />}
          <Routes>
            {/* Redirect to login if not authenticated */}
            <Route
              path="/"
              element={
                !isAuthenticated
                  ? <Login onLoginSuccess={handleLoginSuccess} />
                  : <Navigate to="/home" />
              }
            />

            {/* Render other routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/skill-dock" element={<SkillWallet />} />
            <Route path="/career-voyage" element={<CareerVoyage />} />
            <Route path="/gen-ex" element={<GenerationalEngagement />} />
            <Route path="/learning" element={<LearningDashboard />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
