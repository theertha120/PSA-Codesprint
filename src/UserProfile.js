import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Avatar,
  Divider,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

const UserProfile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee JSON
    fetch("/sources/Employee_Profiles.json")
      .then((res) => res.json())
      .then((data) => setEmployee(data[0])) // Take the first employee
      .catch((err) => console.error(err));
  }, []);

  if (!employee) return <Text>Loading...</Text>;

  return (
    <>
      <NavBar />
      <Box maxW="container.xl" mx="auto" p={6}>
        {/* Header */}
        <Flex align="center" mb={6}>
          <Avatar
            name={employee.personal_info.name}
            size="2xl"
            src="female mentor.jpeg"
            mr={6}
            borderWidth={2}
            borderColor="pink.400"
          />
          <VStack align="start">
            <Heading color="blue.700">{employee.personal_info.name}</Heading>
            <Text>Email: {employee.personal_info.email}</Text>
            <Text>Office: {employee.personal_info.office_location}</Text>
            <Text>
              Job Title: {employee.employment_info.job_title} | Department:{" "}
              {employee.employment_info.department}
            </Text>
            <Text>In Role Since: {employee.employment_info.in_role_since}</Text>
          </VStack>
        </Flex>

        <Divider mb={6} />

        {/* Skills & Competencies */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Box>
            <Heading size="md" mb={3}>
              Skills
            </Heading>
            <HStack wrap="wrap" spacing={2}>
              {employee.skills.map((s, idx) => (
                <Tag key={idx} colorScheme="pink" mb={1}>
                  {s.skill_name}
                </Tag>
              ))}
            </HStack>
          </Box>
          <Box>
            <Heading size="md" mb={3}>
              Competencies
            </Heading>
            <HStack wrap="wrap" spacing={2}>
              {employee.competencies.map((c, idx) => (
                <Tag key={idx} colorScheme="blue" mb={1}>
                  {c.name} ({c.level})
                </Tag>
              ))}
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Experiences & Projects */}
        <Accordion allowMultiple mb={6}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Experiences
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {employee.experiences.map((exp, idx) => (
                <Box key={idx} mb={3} p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">{exp.program || exp.type}</Text>
                  <Text>
                    {exp.organization} | {exp.period.start} to {exp.period.end || "Present"}
                  </Text>
                  <Text>{exp.focus}</Text>
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Projects
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {employee.projects.map((proj, idx) => (
                <Box key={idx} mb={3} p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">{proj.project_name}</Text>
                  <Text>Role: {proj.role}</Text>
                  <Text>
                    {proj.period.start} to {proj.period.end || "Present"}
                  </Text>
                  <Text>{proj.description}</Text>
                  <Text>Outcomes: {proj.outcomes.join(", ")}</Text>
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Education & Positions
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Heading size="sm" mb={2}>Education</Heading>
              {employee.education.map((edu, idx) => (
                <Box key={idx} mb={2}>
                  <Text fontWeight="bold">{edu.degree}</Text>
                  <Text>{edu.institution}</Text>
                  <Text>{edu.period.start} to {edu.period.end}</Text>
                </Box>
              ))}
              <Heading size="sm" mt={4} mb={2}>Positions History</Heading>
              {employee.positions_history.map((pos, idx) => (
                <Box key={idx} mb={2}>
                  <Text fontWeight="bold">{pos.role_title}</Text>
                  <Text>{pos.organization}</Text>
                  <Text>{pos.period.start} to {pos.period.end || "Present"}</Text>
                  <Text>Focus Areas: {pos.focus_areas.join(", ")}</Text>
                  {pos.key_skills_used && <Text>Key Skills: {pos.key_skills_used.join(", ")}</Text>}
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default UserProfile;
