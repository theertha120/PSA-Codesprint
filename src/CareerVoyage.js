// CareerVoyage.js
import React from 'react';
import { Box, Flex, Heading, Text, Button, VStack, HStack, useDisclosure } from '@chakra-ui/react';
import { AiFillRocket } from 'react-icons/ai';
import { CareerSimulator } from './Features/CareerSimulator';
import { EmergingSkillsForecast } from './Features/EmergingSkillsForecast';
import StepByStepGuideModal from './Features/StepByStepGuideModal';
import CareerSimulatorGuideModal from './Features/CareerSimulatorGuideModal'; // For Career Simulator Guide
import NavBar from './NavBar';

function CareerVoyage() {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
    const { isOpen: isSimulatorOpen, onOpen: onSimulatorOpen, onClose: onSimulatorClose } = useDisclosure(); // Modal for Career Simulator Guide
    return (
        <>
            <NavBar />
            <Box minHeight="100vh" bg="gray.50" p={6}>
                {/* Main Content Section */}
                <VStack spacing={10} mt={3} align="stretch">
                    {/* Hero Section */}
                    <Box backgroundImage="linear-gradient(90deg, #800080 0%, #3f2182  100%)" color="white" p={8} borderRadius="50px" textAlign="center">
                        <Flex alignItems="center" marginBottom={"40px"}>
                            <AiFillRocket size={40} />
                            <Heading as="h1" size="lg" ml={2}>
                                Career Voyage
                            </Heading>
                        </Flex>
                        <Heading as="h1" size="2xl" mb={4}>
                            Shape Your Future with AI-Powered Career Insights
                        </Heading>
                        <Text fontSize="lg" mb={6}>
                            Explore career paths and discover trending skills in logistics, port, and transportation sectors.
                        </Text>
                        <HStack justify="center" spacing={4}>
                            <Button colorScheme="whiteAlpha" size="lg" onClick={onSimulatorOpen}>
                                Try Career Simulator
                            </Button>
                            <Button colorScheme="whiteAlpha" size="lg" onClick={onOpen}>
                                Discover Emerging Skills
                            </Button>
                        </HStack>
                    </Box>

                    {/* Two-Column Layout for Career Simulator and Skills Forecast */}
                    <Flex justify="space-between" direction={{ base: 'column', md: 'row' }} alignItems="flex-start">
                        {/* Left Column - Career Simulator */}
                        <Box flex="1" bg="white" boxShadow="lg" borderRadius="md" p={6} mr={{ md: 4 }} mb={{ base: 6, md: 0 }}>
                            <CareerSimulator />
                        </Box>

                        {/* Right Column - Emerging Skills Forecast */}
                        <Box flex="1" bg="white" boxShadow="lg" borderRadius="md" p={6}>
                            <EmergingSkillsForecast />
                        </Box>
                    </Flex>
                </VStack>

                {/* Step-by-Step Guide Modal */}
                <StepByStepGuideModal isOpen={isOpen} onClose={onClose} />
                <CareerSimulatorGuideModal isOpen={isSimulatorOpen} onClose={onSimulatorClose} />
            </Box>
        </>
    );
}

export default CareerVoyage;

