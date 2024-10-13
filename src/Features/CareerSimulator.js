import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Checkbox,
    Spinner,
    SimpleGrid,
    useColorModeValue,
    ScaleFade,
    Progress,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const detailedCareerPaths = [
    {
        skill: 'Data Analysis',
        outcome: 'Senior Data Analyst',
        salary: '$80,000 - $100,000',
        growth: 85, // Career growth percentage for visualization
        description: 'Using advanced data analytics to help organizations make better decisions.',
    },
    {
        skill: 'Project Management',
        outcome: 'Project Manager',
        salary: '$90,000 - $110,000',
        growth: 90,
        description: 'Leading cross-functional teams to deliver projects within scope, time, and budget.',
    },
    {
        skill: 'Software Development',
        outcome: 'Lead Software Engineer',
        salary: '$110,000 - $140,000',
        growth: 95,
        description: 'Designing and implementing complex software systems for large-scale solutions.',
    },
    {
        skill: 'Supply Chain Management',
        outcome: 'Global Supply Chain Director',
        salary: '$120,000 - $150,000',
        growth: 80,
        description: 'Overseeing global supply chain operations, ensuring efficiency and resilience.',
    },
    {
        skill: 'Cloud Computing',
        outcome: 'Cloud Architect',
        salary: '$130,000 - $160,000',
        growth: 92,
        description: 'Building scalable cloud infrastructures for modern applications and services.',
    },
    {
        skill: 'Artificial Intelligence',
        outcome: 'AI Specialist',
        salary: '$140,000 - $170,000',
        growth: 98,
        description: 'Developing AI systems to automate processes and drive innovation in industries.',
    },
    {
        skill: 'Blockchain Technology',
        outcome: 'Blockchain Developer',
        salary: '$120,000 - $150,000',
        growth: 87,
        description: 'Creating decentralized solutions and smart contracts for secure, transparent transactions.',
    },
    {
        skill: 'Digital Marketing',
        outcome: 'Digital Marketing Director',
        salary: '$100,000 - $130,000',
        growth: 88,
        description: 'Leading digital marketing strategies to drive business growth and online presence.',
    },
];

export const CareerSimulator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [ambition, setAmbition] = useState('');
    const [simulationResults, setSimulationResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedSkills([]);
        setAmbition('');
        setSimulationResults([]);
        setIsLoading(false);
    };

    const handleSkillChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSkills((prev) => [...prev, value]);
        } else {
            setSelectedSkills((prev) => prev.filter((skill) => skill !== value));
        }
    };

    const handleSimulate = () => {
        setIsLoading(true);
        setTimeout(() => {
            const results = detailedCareerPaths.filter((path) =>
                selectedSkills.includes(path.skill)
            );
            setSimulationResults(results);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg">
                Career Path Simulator
            </Heading>
            <Text>
                Simulate different career paths and see how your skills impact your future roles and salaries.
            </Text>
            <Button color="#3f2182" size="md" onClick={handleOpenModal}>
                Start Simulation
            </Button>

            <Modal isOpen={isOpen} onClose={handleCloseModal} size="full">
                <ModalOverlay />
                <ModalContent bg={useColorModeValue('white', 'gray.800')} borderRadius="lg" boxShadow="lg">
                    <ModalHeader>
                        <Heading size="lg">Career Path Simulator</Heading>
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontWeight="bold" mb={4}>
                            Please answer the following questions to help simulate your career path:
                        </Text>

                        {/** Question 1 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                1. What current skills do you possess?
                            </Text>
                            <SimpleGrid columns={2} spacing={4}>
                                <Checkbox value="Data Analysis" onChange={handleSkillChange}>
                                    Data Analysis
                                </Checkbox>
                                <Checkbox value="Project Management" onChange={handleSkillChange}>
                                    Project Management
                                </Checkbox>
                                <Checkbox value="Software Development" onChange={handleSkillChange}>
                                    Software Development
                                </Checkbox>
                                <Checkbox value="Supply Chain Management" onChange={handleSkillChange}>
                                    Supply Chain Management
                                </Checkbox>
                            </SimpleGrid>
                        </Box>

                        {/** Question 2 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                2. Which skills are you looking to improve in the next 1-5 years?
                            </Text>
                            <SimpleGrid columns={2} spacing={4}>
                                <Checkbox value="Advanced Data Analysis" onChange={handleSkillChange}>
                                    Advanced Data Analysis
                                </Checkbox>
                                <Checkbox value="Leadership" onChange={handleSkillChange}>
                                    Leadership
                                </Checkbox>
                                <Checkbox value="Cloud Computing" onChange={handleSkillChange}>
                                    Cloud Computing
                                </Checkbox>
                            </SimpleGrid>
                        </Box>

                        {/** Question 3 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                3. What is your career ambition in the next 5 years?
                            </Text>
                            <Input
                                placeholder="Describe your ambition"
                                value={ambition}
                                onChange={(e) => setAmbition(e.target.value)}
                            />
                        </Box>

                        {/** Question 4 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                4. Which future skills do you anticipate will be necessary?
                            </Text>
                            <SimpleGrid columns={2} spacing={4}>
                                <Checkbox value="Artificial Intelligence" onChange={handleSkillChange}>
                                    Artificial Intelligence
                                </Checkbox>
                                <Checkbox value="Blockchain Technology" onChange={handleSkillChange}>
                                    Blockchain Technology
                                </Checkbox>
                                <Checkbox value="Digital Marketing" onChange={handleSkillChange}>
                                    Digital Marketing
                                </Checkbox>
                            </SimpleGrid>
                        </Box>

                        {/** Question 5 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                5. What roles are you considering for the future?
                            </Text>
                            <SimpleGrid columns={2} spacing={4}>
                                <Checkbox value="Chief Data Officer" onChange={handleSkillChange}>
                                    Chief Data Officer
                                </Checkbox>
                                <Checkbox value="Operations Director" onChange={handleSkillChange}>
                                    Operations Director
                                </Checkbox>
                                <Checkbox value="Software Architect" onChange={handleSkillChange}>
                                    Software Architect
                                </Checkbox>
                            </SimpleGrid>
                        </Box>

                        {/** Question 6 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                6. What is your current job title?
                            </Text>
                            <Input placeholder="Current Job Title" />
                        </Box>

                        {/** Question 7 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                7. How many years of experience do you have?
                            </Text>
                            <Input placeholder="Years of Experience" type="number" />
                        </Box>

                        {/** Question 8 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                8. What industries are you interested in?
                            </Text>
                            <Input placeholder="Industries" />
                        </Box>

                        {/** Question 9 */}
                        <Box mb={6}>
                            <Text fontSize="lg" mb={2}>
                                9. What are your salary expectations for the next 5 years?
                            </Text>
                            <Input placeholder="Salary Expectations" />
                        </Box>


                        {/** Results and Loading State */}
                        {isLoading ? (
                            <ScaleFade in={isLoading}>
                                <Spinner />
                            </ScaleFade>
                        ) : (
                            simulationResults.length > 0 &&
                            simulationResults.map((result, index) => (
                                <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                                    <Heading size="md">{result.outcome}</Heading>
                                    <Text>Salary: {result.salary}</Text>
                                    <Text>Growth: {result.growth}%</Text>
                                    <Progress value={result.growth} colorScheme="green" />
                                    <Text mt={2}>{result.description}</Text>
                                </Box>
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSimulate}>
                            Simulate Career Path
                        </Button>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};
