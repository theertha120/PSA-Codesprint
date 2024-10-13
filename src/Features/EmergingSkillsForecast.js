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
    Select,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

// Dummy data for charts
const dummyData = {
    skills: {
        'Data Analysis': [
            { year: 2020, value: 20 },
            { year: 2021, value: 30 },
            { year: 2022, value: 50 },
            { year: 2023, value: 80 },
        ],
        'Supply Chain Management': [
            { year: 2020, value: 15 },
            { year: 2021, value: 25 },
            { year: 2022, value: 40 },
            { year: 2023, value: 60 },
        ],
        'Logistics Automation': [
            { year: 2020, value: 10 },
            { year: 2021, value: 20 },
            { year: 2022, value: 35 },
            { year: 2023, value: 55 },
        ],
    },
};

export const EmergingSkillsForecast = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [chartData, setChartData] = useState([]);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedSkill('');
        setChartData([]);
    };

    const handleSkillChange = (e) => {
        const skill = e.target.value;
        setSelectedSkill(skill);
        setChartData(dummyData.skills[skill] || []);
    };

    return (
        <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg">
                Emerging Skills Forecast
            </Heading>
            <Text>
                Discover trending skills that will be in demand in the logistics, port, and transportation sectors.
            </Text>
            <Button color="#3f2182" size="md" onClick={handleOpenModal}>
                Explore Forecast
            </Button>

            {/* Modal for skill selection and chart display */}
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select a Skill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select placeholder="Select a skill" onChange={handleSkillChange}>
                            <option value="Data Analysis">Data Analysis</option>
                            <option value="Supply Chain Management">Supply Chain Management</option>
                            <option value="Logistics Automation">Logistics Automation</option>
                        </Select>

                        {chartData.length > 0 && (
                            <>
                                <Box mt={5}>
                                    <Heading size="md">Long-Term Trends for {selectedSkill}</Heading>
                                    <LineChart width={500} height={300} data={chartData}>
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                    </LineChart>
                                </Box>
                                <Box mt={5}>
                                    <Heading size="md">Bar Chart for {selectedSkill}</Heading>
                                    <BarChart width={500} height={300} data={chartData}>
                                        <XAxis dataKey="year" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#82ca9d" />
                                    </BarChart>
                                </Box>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};
