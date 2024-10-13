// StepByStepGuideModal.js
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
    useDisclosure,
} from '@chakra-ui/react';

const StepByStepGuideModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Step-by-Step Guide: Emerging Skills Forecast</ModalHeader>
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold">Step 1: Understanding the Forecast</Text>
                            <Text>
                                The Emerging Skills Forecast gives you insights into trending skills that will be in demand over the next 5-10 years in the logistics, port, and transportation sectors.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 2: Viewing Skill Categories</Text>
                            <Text>
                                Use the category filters to explore skills based on their relevance to your role, employability, and forecasted demand.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 3: Exploring AI Insights</Text>
                            <Text>
                                Our AI provides data-backed insights into the percentage growth and relevance of each skill, helping you focus on the right skills to enhance your career.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 4: Navigating the Graphs</Text>
                            <Text>
                                Hover over the graphs to get detailed information about each skill's forecast, including employability rates and future industry relevance.
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Step 5: Taking Action</Text>
                            <Text>
                                After exploring the trends, you can focus your learning efforts on high-demand skills by following up with PSA’s internal training programs or external courses.
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

export default StepByStepGuideModal;
