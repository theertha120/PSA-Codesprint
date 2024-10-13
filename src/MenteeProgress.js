import React, { useState } from 'react';
import { Box, Text, Select, Flex } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const menteeData = {
  'Alice Johnson': [
    { day: 'Monday', hours: 4 },
    { day: 'Tuesday', hours: 5 },
    { day: 'Wednesday', hours: 6 },
    { day: 'Thursday', hours: 7 },
    { day: 'Friday', hours: 3 },
    { day: 'Saturday', hours: 8 },
    { day: 'Sunday', hours: 2 },
  ],
  'Brian Smith': [
    { day: 'Monday', hours: 3 },
    { day: 'Tuesday', hours: 4 },
    { day: 'Wednesday', hours: 5 },
    { day: 'Thursday', hours: 6 },
    { day: 'Friday', hours: 4 },
    { day: 'Saturday', hours: 5 },
    { day: 'Sunday', hours: 1 },
  ],
  'Clara Lee': [
    { day: 'Monday', hours: 3 },
    { day: 'Tuesday', hours: 5 },
    { day: 'Wednesday', hours: 2 },
    { day: 'Thursday', hours: 6 },
    { day: 'Friday', hours: 3 },
    { day: 'Saturday', hours: 5 },
    { day: 'Sunday', hours: 2 },
  ],
  'David Kim': [
    { day: 'Monday', hours: 7 },
    { day: 'Tuesday', hours: 6 },
    { day: 'Wednesday', hours: 5 },
    { day: 'Thursday', hours: 7 },
    { day: 'Friday', hours: 4 },
    { day: 'Saturday', hours: 2 },
    { day: 'Sunday', hours: 1 },
  ],
  // Add more mentees here...
};

const HoursBarChart = ({ data }) => {
    return (
        <Box width="100%" p={4}>
            <Flex justifyContent="center">
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
            </Flex>
        </Box>
    );
};

const MenteeProgress = () => {
  const [selectedMentee, setSelectedMentee] = useState('');
  const [chartData, setChartData] = useState([]);

  const handleMenteeChange = (event) => {
    const menteeName = event.target.value;
    setSelectedMentee(menteeName);
    setChartData(menteeData[menteeName] || []);
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Mentee Progress</Text>
      <Select placeholder="Select a Mentee" onChange={handleMenteeChange} mb={4}>
        <option value="Alice Johnson">Alice Johnson</option>
        <option value="Brian Smith">Brian Smith</option>
        <option value="Clara Lee">Clara Lee</option>
        <option value="David Kim">David Kim</option>
        {/* Add more options for mentees here... */}
      </Select>

      {selectedMentee && <HoursBarChart data={chartData} />}
    </Box>
  );
};

export default MenteeProgress;

