import React from "react";
import {
    Button,
    Container,
    Grid,
    Box,
    Avatar,
    Heading,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


// Define the main features with corresponding images from the public folder
const features = [
    {
        title: "Skill Dock",
        description:
            "Employees earn verified badges for new skills. Skill Wallet using blockchain for transparency.",
        image: "/1.png", // Image path in the public folder
        buttonLabel: "Access Skills", // New button label
        buttonRoute: "/skill-dock",
    },
    {
        title: "Career Trajectory",
        description:
            "Simulate various career paths and visualize potential career outcomes based on skills.",
        image: "/2.png", // Image path in the public folder
        buttonLabel: "View Career Paths", // New button label
        buttonRoute: "/career-voyage",
    },
    {
        title: "Learning Dashboard",
        description:
            "Managers track engagement across generations and skill levels. AI recommends formats based on preferences.",
        image: "/3.png", // Image path in the public folder
        buttonLabel: "Explore Courses", // New button label
        buttonRoute: "/learning",

    },
    {
        title: "Generational Engagement",
        description:
            "Resources for younger interns and feedback tools for managers, fostering skill-sharing across generations.",
        image: "/4.png", // Image path in the public folder
        buttonLabel: "Engage Now", // New button label
        buttonRoute: "/gen-ex",

    },
];

const HomePage = () => {
    const navigate = useNavigate(); // Get the navigate function

    const handleNavigation = (path) => {
        navigate(path); // Use navigate to change routes
    };
    return (
        <Container maxW="container.xl" mt={5} position="relative">
            {/* Log Out Button Positioned Higher */}
            <Button
                colorScheme="purple" // Use a Chakra color scheme
                position="absolute"
                top={5}
                right={10}
                variant="solid"
            >
                Log Out
            </Button>

            {/* Welcome message positioned lower */}
            <Heading as="h4" textAlign="center" mt={24} mb={4}>
                Welcome, Nancy Drew!
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mt={8}>
                {features.map((feature, index) => (
                    <Box
                        key={index}
                        p={4}
                        textAlign="center"
                        borderWidth="1px"
                        borderRadius="lg"
                        height="350px" // Set a fixed height for each feature box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        bg="#f5f5f5"
                    >
                        <Avatar
                            alt={feature.title}
                            src={feature.image} // Image path from public folder
                            size="lg" // Adjust size as needed
                            mx="auto" // Center the image horizontally
                            mb={2} // Margin bottom for spacing
                        />
                        <Text fontSize="xl" fontWeight="bold" mb={1}>
                            {feature.title}
                        </Text>
                        <Text fontSize="md" mb={2}>
                            {feature.description}
                        </Text>

                        {/* Button inside the feature box with updated label */}
                        <Button
                            colorScheme="teal" // Use a Chakra color scheme
                            variant="outline" // Use outlined style for small button
                            width="100%" // Align the button to take the full width
                            onClick={() => handleNavigation(feature.buttonRoute)}
                        >
                            {feature.buttonLabel} {/* Use the new button label from feature object */}
                        </Button>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default HomePage;
