import React from "react";
import {
  Button,
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { FiLogOut, FiMap, FiBookOpen, FiMessageCircle, FiUsers } from "react-icons/fi";

const features = [
  {
    title: "Personalized Career Pathways",
    description:
      "View your current skills, discover suggested target roles, analyze skill gaps, and visualize your career journey to leadership roles.",
    image: "first one.png",
    buttonLabel: "View Pathways",
    buttonRoute: "/career-paths",
    icon: <FiMap size={40} />,
  },
  {
    title: "Development Dashboard",
    description:
      "Explore video, gamified, and lecture-style courses to bridge your skill gaps and achieve your career goals faster.",
    image: "second one .png",
    buttonLabel: "Explore Courses",
    buttonRoute: "/learning",
    icon: <FiBookOpen size={40} />,
  },
  {
    title: "AI Chatbot",
    description:
      "Your assistant for career, learning, and well-being. Try commands like ‘Show my skill gaps’ or ‘I feel stressed’.",
    image: "third one AI.png",
    buttonLabel: "Chat Now",
    buttonRoute: "/chatbot",
    icon: <FiMessageCircle size={40} />,
  },
  {
    title: "Mentorship Hub",
    description:
      "Get matched with mentors specialized in your skill gaps. Schedule sessions and let our AI note taker record key points.",
    image: "fourth one tutor.png",
    buttonLabel: "Find Mentors",
    buttonRoute: "/mentorship",
    icon: <FiUsers size={40} />,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => navigate(path);
  const handleLogout = () => navigate("/");

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" mt={1} position="relative">
        {/* Log Out Button */}
        <Button
          bg="pink.500"
          color="white"
          position="absolute"
          top={2}
          right={5}
          variant="solid"
          borderRadius="md"
          boxShadow="md"
          _hover={{
            bg: "pink.600",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          leftIcon={<FiLogOut />}
          onClick={handleLogout}
        >
          Log Out
        </Button>

        {/* Welcome message */}
        <Heading
          as="h4"
          textAlign="center"
          mt={14}
          mb={8}
          color="blue.700"
          fontWeight="bold"
        >
          Welcome, Samantha Lee!
        </Heading>

        {/* Top Row: 2 Cards Side by Side */}
        <Flex direction={{ base: "column", md: "row" }} gap={6} mb={6}>
          {features.slice(0, 2).map((feature, index) => (
            <Box
              key={index}
              flex={1}
              p={6}
              textAlign="center"
              borderRadius="xl"
              bgGradient="linear(to-b, blue.900, pink.600)"
              color="white"
              boxShadow="2xl"
              _hover={{ transform: "scale(1.03)", transition: "all 0.3s ease" }}
            >
              <Box mb={4}>{feature.icon}</Box>
              <Image
                src={feature.image}
                alt={feature.title}
                height="180px"
                mx="auto"
                mb={4}
                borderRadius="lg"
                objectFit="cover"
              />
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                {feature.title}
              </Text>
              <Text fontSize="md" mb={4}>
                {feature.description}
              </Text>
              <Button
                bg="pink.400"
                color="white"
                _hover={{ bg: "pink.500" }}
                width="100%"
                onClick={() => handleNavigation(feature.buttonRoute)}
              >
                {feature.buttonLabel}
              </Button>
            </Box>
          ))}
        </Flex>

        {/* Bottom Row: 2 Cards Stacked */}
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {features.slice(2, 4).map((feature, index) => (
            <Box
              key={index}
              flex={1}
              p={5}
              textAlign="center"
              borderRadius="xl"
              bgGradient="linear(to-b, pink.600, blue.900)"
              color="white"
              boxShadow="xl"
              mb={{ base: 6, md: 0 }}
              _hover={{ transform: "scale(1.03)", transition: "all 0.3s ease" }}
            >
              <Box mb={4}>{feature.icon}</Box>
              <Image
                src={feature.image}
                alt={feature.title}
                height="140px"
                mx="auto"
                mb={4}
                borderRadius="lg"
                objectFit="cover"
              />
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {feature.title}
              </Text>
              <Text fontSize="sm" mb={4}>
                {feature.description}
              </Text>
              <Button
                bg="pink.400"
                color="white"
                _hover={{ bg: "pink.500" }}
                width="100%"
                onClick={() => handleNavigation(feature.buttonRoute)}
              >
                {feature.buttonLabel}
              </Button>
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
