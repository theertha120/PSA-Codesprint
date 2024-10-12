import React, { useState } from 'react';
import { Button, Text, Table, Thead, Tbody, Tr, Th, Td, VStack } from '@chakra-ui/react';

const AppointmentScheduler = () => {
    // Availability data
    const availabilityData = [
        {
            time: '8am',
            statuses: { Sunday: 'Available', Monday: 'Busy', Tuesday: 'Available', Wednesday: 'Busy', Thursday: 'Available', Friday: 'Busy', Saturday: 'Available', },
        },
        {
            time: '9am',
            statuses: { Sunday: 'Busy', Monday: 'Available', Tuesday: 'Busy', Wednesday: 'Available', Thursday: 'Busy', Friday: 'Available', Saturday: 'Busy', },
        },
        {
            time: '10am',
            statuses: { Sunday: 'Busy', Monday: 'Busy', Tuesday: 'Busy', Wednesday: 'Available', Thursday: 'Busy', Friday: 'Available', Saturday: 'Busy', },
        },
        {
            time: '11am',
            statuses: { Sunday: 'Busy', Monday: 'Busy', Tuesday: 'Busy', Wednesday: 'Available', Thursday: 'Busy', Friday: 'Available', Saturday: 'Busy', },
        },
        {
            time: '12am',
            statuses: { Sunday: 'Available', Monday: 'Busy', Tuesday: 'Busy', Wednesday: 'Busy', Thursday: 'Busy', Friday: 'Available', Saturday: 'Busy', },
        },
    ];

    const [selectedCells, setSelectedCells] = useState({});
    const [confirmedTimes, setConfirmedTimes] = useState<string[]>([]);
    const [tableVisible, setTableVisible] = useState(true);

    const handleCellClick = (time, day) => {
        setSelectedCells((prev) => ({
            ...prev,
            [`${time}-${day}`]: !prev[`${time}-${day}`], // Toggle selection
        }));
    };

    const getSelectedTimes = () => {
        const selectedTimes = [];
        availabilityData.forEach(slot => {
            Object.entries(slot.statuses).forEach(([day]) => {
                if (selectedCells[`${slot.time}-${day}`]) {
                    selectedTimes.push(`${slot.time} - ${day}`);
                }
            });
        });
        return selectedTimes;
    };

    return (
    <div>
        <Table colorScheme="teal">
            <Thead>
                <Tr>
                <Th>Time</Th>
                <Th>Sunday</Th>
                <Th>Monday</Th>
                <Th>Tuesday</Th>
                <Th>Wednesday</Th>
                <Th>Thursday</Th>
                <Th>Friday</Th>
                <Th>Saturday</Th>
                </Tr>
            </Thead>
            <Tbody>
                {availabilityData.map((slot, index) => (
                    <Tr key={index}>
                    <Td>{slot.time}</Td>
                    {Object.entries(slot.statuses).map(([day, status]) => (
                        <Td
                            key={day}
                            bg={
                                selectedCells[`${slot.time}-${day}`] 
                                    ? 'blue.100' 
                                    : status === 'Available' 
                                    ? 'green.100' 
                                    : 'red.100'
                            }
                            onClick={() => handleCellClick(slot.time, day)}
                            cursor="pointer" // Add pointer cursor
                        >
                            <Text color={status === 'Available' ? 'green.500' : 'red.500'}>
                                {status}
                            </Text>
                        </Td>
                    ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>

        {/* Display selected times and confirmation button */}
        <VStack spacing={4} mt={4} align="stretch">
            <Text fontWeight="bold">Selected Times:</Text>
            {getSelectedTimes().length > 0 ? (
                getSelectedTimes().map((time, index) => (
                    <Text key={index}>{time}</Text>
                ))
            ) : (
                <Text>No times selected.</Text>
            )}
        </VStack>
    </div>
  );
};

export default AppointmentScheduler;