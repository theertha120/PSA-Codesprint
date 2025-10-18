import { useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import "@fontsource/poppins";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage.js";
import Login from "./Login.js";
import CareerPaths from "./CareerPaths.js";
import Learning from "./Learning.js";
import Mentorship from "./Mentorship.js";
import Chatbot from "./Chatbot.js";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    darkPinkBlue: {
      50: "#ffe6f0",
      100: "#ffb3cc",
      200: "#ff80aa",
      300: "#ff4d88",
      400: "#ff1a66", 
      500: "#d4004d",
      600: "#a3003b",
      700: "#004f8c", 
      800: "#003b66",
      900: "#002744",
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    console.log("User logged in successfully!");
    setIsAuthenticated(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Router>
          {isAuthenticated && <NavBar />}
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Login onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
