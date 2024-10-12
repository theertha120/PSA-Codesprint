import logo from './logo.svg';
import './App.css';
import SkillWallet from './SkillWallet';
import NavBar from './NavBar'; // Assuming you saved the Navbar component
import '@fontsource/poppins'; // Defaults to weight 400
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
        <NavBar />
        <SkillWallet />

      </div>
    </ChakraProvider>
  );
}

export default App;
