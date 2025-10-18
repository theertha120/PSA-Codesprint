import { Box, Flex, Text, Link, Button, HStack } from "@chakra-ui/react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => navigate(path);

  return (
    <Box
      bgGradient="linear(to-r, pink.500, blue.800)" 
      px={8}
      py={4}
      color="white"
      boxShadow="lg"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {/* Left Title */}
        <Text fontSize="lg" fontWeight="bold" fontFamily="Poppins">
          PSA Career Canvas: where employees <em>paint</em> their own career journey!
        </Text>

        {/* Navigation Links */}
        <HStack spacing={6} alignItems="center">
          <Button
            leftIcon={<FaHome />}
            bg="white"
            color="blue.800"
            _hover={{ bg: "pink.400", color: "white" }}
            onClick={() => handleNavigation("/home")}
          >
            Home
          </Button>

          <Button
            leftIcon={<FaUserCircle />}
            bg="white"
            color="blue.800"
            _hover={{ bg: "pink.400", color: "white" }}
            onClick={() => handleNavigation("/profile")}
          >
            My Profile
          </Button>

          <Link
            _hover={{ textDecoration: "underline", color: "pink.200" }}
            fontFamily="Poppins"
            onClick={() => handleNavigation("/career-paths")}
          >
            Career Paths
          </Link>
          <Link
            _hover={{ textDecoration: "underline", color: "pink.200" }}
            fontFamily="Poppins"
            onClick={() => handleNavigation("/learning")}
          >
            Learning
          </Link>
          <Link
            _hover={{ textDecoration: "underline", color: "pink.200" }}
            fontFamily="Poppins"
            onClick={() => handleNavigation("/chatbot")}
          >
            Chatbot
          </Link>
          <Link
            _hover={{ textDecoration: "underline", color: "pink.200" }}
            fontFamily="Poppins"
            onClick={() => handleNavigation("/mentorship")}
          >
            Mentorship
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
