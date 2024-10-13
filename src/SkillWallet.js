import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    VStack,
    HStack,
    Badge,
    Divider,
    Icon,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Progress,
    Tooltip,
    List,
    ListItem
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import SkillComparison from './SkillComparison'; // Make sure the path is correct
import NavBar from './NavBar';

const proficiencyData = [
    { name: 'JavaScript', value: 85 },
    { name: 'Python', value: 75 },
    { name: 'Project Management', value: 65 },
];

// Skills data for timeline
const skillsData = [
    {
        title: 'JavaScript',
        description: 'Proficient in ES6, React.js, and Node.js',
        badges: ['Advanced JavaScript Developer', 'JavaScript Fundamentals'],
        date: '2024-01-01',
        kpis: {
            successRate: '90%',
            projectsCompleted: '5',
            takeaways: 'Mastered advanced JavaScript concepts.',
        },
    },
    {
        title: 'Python',
        description: 'Experienced with Flask and Django frameworks',
        badges: ['Python Developer Certification'],
        date: '2023-06-15',
        kpis: {
            successRate: '85%',
            projectsCompleted: '3',
            takeaways: 'Gained experience in backend development.',
        },
    },
    {
        title: 'Project Management',
        description: 'Skilled in Agile and Scrum methodologies',
        badges: ['Certified ScrumMaster', 'Agile Project Management'],
        date: '2023-03-10',
        kpis: {
            successRate: '95%',
            projectsCompleted: '7',
            takeaways: 'Improved team collaboration and delivery speed.',
        },
    },
];


// Comparison data for employees
const comparisonData = [
    { name: 'Nancy Drew', javascript: '85%', python: '75%', projectManagement: '65%' },
    { name: 'John Doe', javascript: '80%', python: '70%', projectManagement: '75%' },
    { name: 'Jane Smith', javascript: '90%', python: '80%', projectManagement: '70%' },
];

// Custom component for Pie Chart
const ProficiencyChart = () => {
    return (
        <Box borderWidth="1px" borderRadius="md" p={4} mb={6} >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                Skill Breakup
            </Text>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={proficiencyData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {proficiencyData.map((entry, index) => (
                            <Cell key={index} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                        ))}
                    </Pie>
                    <RechartsTooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

const SkillWallet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const onOpen = (skill) => {
        setSelectedSkill(skill);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedSkill(null);
    };

    return (
        <>
            <NavBar />
            <Box maxW="1200px" mx="auto" p={4}>
                <Flex>
                    {/* Left Section with Comparison Table */}
                    <Box flex="1" mr={6}>
                        <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                            <Text fontSize="lg" fontWeight="bold" mb={4}>
                                Employee Skill Comparison
                            </Text>
                            <SkillComparison />
                        </Box>
                        <ProficiencyChart />
                        <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                            <Text fontSize="lg" fontWeight="bold" mb={4}>
                                Skills Growth Over Time
                            </Text>
                            {skillsData.map((skill, index) => (
                                <Box key={index} mb={4}>
                                    <Text fontWeight="bold">{skill.title}</Text>
                                    <Text fontSize="sm" color="gray.500">{skill.date}</Text>
                                    <Progress value={Math.floor(Math.random() * 100)} colorScheme="purple" />
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Right Section with Profile Overview and Timeline */}
                    <Box flex="2">
                        {/* Profile Overview */}
                        <Flex align="center" mb={8}>
                            <Avatar size="xl" name="Nancy Drew" src="https://via.placeholder.com/150" />
                            <VStack align="start" ml={4}>
                                <Text fontSize="2xl" fontWeight="bold">Nancy Drew</Text>
                                <Text fontSize="lg" color="gray.600">Skills Overview</Text>
                                <HStack spacing={2}>
                                    <Badge colorScheme="purple">JavaScript</Badge>
                                    <Badge colorScheme="blue">Python</Badge>
                                    <Badge colorScheme="green">Project Management</Badge>
                                </HStack>
                            </VStack>
                        </Flex>
                        <Divider mb={6} />

                        {/* Timeline Layout */}
                        <VStack spacing={6} align="stretch">
                            {skillsData.map((skill, index) => (
                                <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                                    <Flex justify="space-between" align="center">
                                        <Box>
                                            <Text fontSize="xl" fontWeight="bold">{skill.title}</Text>
                                            <Text color="gray.500">{skill.description}</Text>
                                            <Text fontSize="sm" color="gray.400">{skill.date}</Text>
                                            <HStack spacing={2} mt={2}>
                                                {skill.badges.map((badge, badgeIndex) => (
                                                    <Tooltip key={badgeIndex} label={badge} fontSize="md">
                                                        <Badge
                                                            colorScheme="teal"
                                                            onClick={() => onOpen(skill)}
                                                            cursor="pointer"
                                                            variant="solid"
                                                            _hover={{ bg: "teal.500", color: "white" }}
                                                        >
                                                            {badge}
                                                        </Badge>
                                                    </Tooltip>
                                                ))}
                                            </HStack>
                                        </Box>
                                        <HStack>
                                            <Icon as={FaStar} color="yellow.400" />
                                        </HStack>
                                    </Flex>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </Flex>

                {/* Certification Details Modal */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedSkill?.title} Certification Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontWeight="bold">Issued By: Professional Certification Institute</Text>
                            <Text>Date of Issue: {selectedSkill?.date}</Text>
                            <Text>Level: {selectedSkill?.badges[0]}</Text>
                            <Divider my={4} />
                            <Text fontWeight="bold">Key Performance Indicators (KPIs):</Text>
                            <Table variant="simple">
                                <Tbody>
                                    <Tr>
                                        <Td>Success Rate</Td>
                                        <Td>{selectedSkill?.kpis.successRate}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Projects Completed</Td>
                                        <Td>{selectedSkill?.kpis.projectsCompleted}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Key Takeaways</Td>
                                        <Td>{selectedSkill?.kpis.takeaways}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            <Divider my={4} />
                            <Text fontWeight="bold">Skills Acquired:</Text>
                            <List spacing={2}>
                                <ListItem>{selectedSkill?.description}</ListItem>
                            </List>
                            <Divider my={4} />
                            <Text fontWeight="bold">Relevant Projects:</Text>
                            <List spacing={2}>
                                <ListItem>Project A: Successfully implemented...</ListItem>
                                <ListItem>Project B: Improved performance by...</ListItem>
                            </List>
                            <Divider my={4} />
                            <Text fontWeight="bold">Certification Summary:</Text>
                            <Text>
                                The {selectedSkill?.title} certification validates my skills...
                            </Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default SkillWallet;
