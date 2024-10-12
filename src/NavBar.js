import { Box, Flex, Text, Link, Button } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';  // Import the Home icon from react-icons

const NavBar = () => {
    return (
        <Box
            backgroundImage="linear-gradient(90deg, #3f2182 0%, #4B0082 100%)" // Gradient background
            px={8}
            py={4}
            color="white"
        >
            <Flex justifyContent="space-between" alignItems="center">
                {/* Main Title */}
                <Text fontSize="lg" fontWeight="bold" fontFamily="Poppins">
                    PSA TalentHarbour
                </Text>

                {/* Spaced Links */}
                <Flex alignItems="center" spacing={6}> {/* Ensuring all items are aligned */}
                    <Link mx={6} href="#" _hover={{ textDecoration: 'underline' }} fontFamily="Poppins">
                        Skill Dock
                    </Link>
                    <Link mx={6} href="#" _hover={{ textDecoration: 'underline' }} fontFamily="Poppins">
                        Career Trajectory
                    </Link>
                    <Link mx={6} href="#" _hover={{ textDecoration: 'underline' }} fontFamily="Poppins">
                        Learning Dashboard
                    </Link>
                    <Link mx={6} href="#" _hover={{ textDecoration: 'underline' }} fontFamily="Poppins">
                        Generational Engagement
                    </Link>

                    {/* Home Button with Icon */}
                    <Button
                        mx={6}
                        leftIcon={<FaHome />} // Add Home icon
                        backgroundColor="white" // Optional: to match the theme
                        variant="solid"
                        opacity={.8}
                    >
                        Home
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavBar;
