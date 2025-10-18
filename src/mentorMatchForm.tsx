import React, { useState } from 'react';
import { Box, Select, FormControl, FormLabel, Button, VStack } from '@chakra-ui/react';

const MentorMatchForm = () => {
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send data to an API)
    console.log({ role, country, timeline });
  };

  return (
    <Box width="400px" mx="auto" p={4} borderWidth={1} borderRadius="lg" maxHeight="400px" overflowY="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>What type of role are you looking for?</FormLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select role"
            >
              <option value="Assistant Operations Executive (Depot Management)">Assistant Operations Executive (Depot Management)</option>
              <option value="Operations Assistant (Tuas Customer Service Coordinator)">Operations Assistant (Tuas Customer Service Coordinator)</option>
              <option value="Container Equipment Specialist (Yard Crane)">Container Equipment Specialist (Yard Crane)</option>
              <option value="Operations Executive / Senior Operations Executive (Port Ecosystem)">Operations Executive / Senior Operations Executive (Port Ecosystem)</option>
              <option value="RAccounts Executive (Billing)emote">Accounts Executive (Billing)</option>
              <option value="Senior Procurement Executive / Assistant Manager (Engineering Procurement)">Senior Procurement Executive / Assistant Manager (Engineering Procurement)</option>
              <option value="Manager / Deputy Manager (OT Security Governance & Compliance)">Manager / Deputy Manager (OT Security Governance & Compliance)</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Which country do you want to go to?</FormLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Select region"
            >
              <option value="Southeast Asia">Southeast Asia</option>
              <option value="Middle East South Asia">Middle East South Asia</option>
              <option value="Northeast Asia">Northeast Asia</option>
              <option value="Europe and Mediterranean">Europe and Mediterranean</option>
              <option value="Americas ">Americas </option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Do you have a timeline to be matched with a mentor?</FormLabel>
            <Select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="Select timeline"
            >
              <option value="Immediately">Immediately</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6 months">Within 6 months</option>
              <option value="Flexible">Flexible</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="purple">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default MentorMatchForm;
