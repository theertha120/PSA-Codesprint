import logo from './logo.svg';
import './App.css';
import SkillWallet from './SkillWallet';
import NavBar from './NavBar'; // Assuming you saved the Navbar component
import '@fontsource/poppins'; // Defaults to weight 400
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CareerVoyage from './CareerVoyage';
import GenerationalEngagement from './generationalEngagement.tsx';
import LearningDashboard from './LearningDashboard.js';
import HomePage from './HomePage.js';
// Add Poppins to your Chakra theme
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});


function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/skill-dock" element={<SkillWallet />} />
            <Route path="/career-voyage" element={<CareerVoyage />} />
            <Route path="gen-ex" element={<GenerationalEngagement />} />
            <Route path="learning" element={<LearningDashboard />} />
            <Route path="home" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
