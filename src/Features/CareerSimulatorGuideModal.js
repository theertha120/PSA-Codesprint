// CareerSimulatorGuideModal.js
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    VStack,
    Box,
} from '@chakra-ui/react';

const CareerSimulatorGuideModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Step-by-Step Guide: Career Path Simulator</ModalHeader>
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold">Step 1: Enter Your Current Role</Text>
                            <Text>
                                Start by selecting your current role and skillset. This will allow the simulator to map out your potential career paths.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 2: Select Your Ambitions</Text>
                            <Text>
                                Choose your career ambitions—whether it's a leadership position, specialist role, or lateral movement in the organization.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 3: Run "What-If" Simulations</Text>
                            <Text>
                                Use the "what-if" feature to add or improve specific skills and see how they impact your career trajectory and salary potential over time.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 4: Explore Career Milestones</Text>
                            <Text>
                                The simulator will display important career milestones, suggesting which skills to develop at each stage of your career path.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 5: Take Action</Text>
                            <Text>
                                Once you’ve visualized a career path that interests you, focus on the skills needed to achieve your goals by accessing PSA’s training resources.
                            </Text>
                        </Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CareerSimulatorGuideModal;
