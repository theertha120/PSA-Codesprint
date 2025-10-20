import React, { useEffect, useState } from "react";
import {
  Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td,
  Button, VStack, Progress, Divider, Circle, Flex
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile"; // JSON with employee data


const CourseMapping = [
  { function_area: "Automation and Robotics", course: "Automation and Robotics" },
  { function_area: "Business Development", course: "Business Development" },
  { function_area: "Commercial", course: "Commercial" },
  { function_area: "Corporate Affairs", course: "Corporate Affairs" },
  { function_area: "Data & AI: Data Engineering", course: "Data Engineering" },
  { function_area: "Data & AI: Data Science", course: "Data Science" },
  { function_area: "Data & AI: Data Strategy & Management", course: "Data Strategy & Management" },
  { function_area: "Data & AI: Optimization", course: "Optimization" },
  { function_area: "Data & AI: RPA", course: "RPA" },
  { function_area: "Data & AI: Simulation", course: "Simulation" },
  { function_area: "Engineering: Civil Engineering", course: "Civil Engineering" },
  { function_area: "Engineering: Electrical and Electronics Engineering", course: "Electrical Engineering" },
  { function_area: "Engineering: Equipment Engineering", course: "Equipment Engineering" },
  { function_area: "Finance", course: "Finance" },
  { function_area: "General Management", course: "General Management" },
  { function_area: "Human Resource", course: "Human Resource" },
  { function_area: "Info Tech: Application Development", course: "Application Development" },
  { function_area: "Info Tech: Business Domain Expertise", course: "Business Domain Expertise" },
  { function_area: "Info Tech: Cybersecurity", course: "Cybersecurity" },
  { function_area: "Info Tech: Infrastructure", course: "Infrastructure" },
  { function_area: "Info Tech: IT Governance & Strategy", course: "IT Governance & Strategy" },
  { function_area: "Info Tech: Product Management", course: "Product Management" },
  { function_area: "Legal and Corporate Secretariat", course: "Legal and Corporate Secretariat" },
  { function_area: "Operations", course: "Operations" },
  { function_area: "Procurement", course: "Procurement" },
  { function_area: "Supply Chain and Logistics", course: "Supply Chain and Logistics" },
  { function_area: "Sustainability", course: "Sustainability" },
  { function_area: "Leadership Development", course: "Leadership Development" },
  { function_area: "Emotional Intelligence", course: "Emotional Intelligence" },
  { function_area: "Communication Skills", course: "Communication Skills" },
  { function_area: "Negotiation & Persuasion", course: "Negotiation & Persuasion" },
  { function_area: "Conflict Resolution", course: "Conflict Resolution" },
  { function_area: "Time Management", course: "Time Management" },
  { function_area: "Creative Thinking", course: "Creative Thinking" },
  { function_area: "Presentation Skills", course: "Presentation Skills" },
  { function_area: "Adaptability & Resilience", course: "Adaptability & Resilience" },
  { function_area: "Team Collaboration", course: "Team Collaboration" },
];

const CareerPathway = () => {
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async (emp) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendedRoles = [];

if (emp.employment_info.job_title.toLowerCase().includes("cloud")) {
          recommendedRoles.push({
            role: "Senior Cloud Solutions Architect",
            readiness: 70,
            gaps: [
              { skill: "Cloud Security Best Practices", current: 50, required: 90, function_area: "Info Tech: Infrastructure" },
              { skill: "Kubernetes", current: 30, required: 80, function_area: "Info Tech: Infrastructure" },
            ],
            path: [
              { stage: "Current Role", icon: "🧑‍💻", color: "gray.300" },
              { stage: "Cloud Architect", icon: "☁️", color: "orange.300" },
              { stage: "Senior Cloud Architect", icon: "🚀", color: "green.300" },
              { stage: "Cloud Practice Lead", icon: "🏆", color: "blue.400" },
            ],
          });
        }

        recommendedRoles.push({
          role: "Cloud Automation Engineer",
          readiness: 65,
          gaps: [
            { skill: "CI/CD Pipelines", current: 45, required: 85, function_area: "Automation and Robotics" },
            { skill: "Infrastructure as Code", current: 50, required: 90, function_area: "Info Tech: Infrastructure" },
          ],
          path: [
            { stage: "Current Role", icon: "🧑‍💻", color: "gray.300" },
            { stage: "Cloud Engineer", icon: "☁️", color: "orange.300" },
            { stage: "Automation Engineer", icon: "🚀", color: "green.300" },
            { stage: "DevOps Lead", icon: "🏆", color: "blue.400" },
          ],
        });

        recommendedRoles.push({
          role: "Cloud Solutions Lead",
          readiness: 60,
          gaps: [
            { skill: "Stakeholder Management", current: 50, required: 90, function_area: "Leadership Development" },
            { skill: "Tech Strategy Planning", current: 40, required: 85, function_area: "Info Tech: IT Governance & Strategy" },
          ],
          path: [
            { stage: "Current Role", icon: "🧑‍💻", color: "gray.300" },
            { stage: "Cloud Architect", icon: "☁️", color: "orange.300" },
            { stage: "Cloud Solutions Lead", icon: "🚀", color: "green.300" },
            { stage: "IT Leadership / Director", icon: "🏆", color: "blue.400" },
          ],
        });

        resolve(recommendedRoles);
      }, 800);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/sources/Employee_Profiles.json");
        const data = await res.json();
        const emp = data[0];
        setEmployee(emp);

        const llmResults = await fetchRecommendations(emp);

        const enrichedRoles = llmResults.map((role) => {
          const gapsWithCourses = role.gaps.map((gap) => {
            const mappedCourse = CourseMapping.find(
              (c) => c.function_area.toLowerCase() === gap.function_area.toLowerCase()
            );
            return { ...gap, course: mappedCourse ? mappedCourse.course : "General Course" };
          });
          return { ...role, gaps: gapsWithCourses };
        });

        setRoles(enrichedRoles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Box textAlign="center" mt={20}><Text>Generating personalized career pathway...</Text></Box>;
  if (!roles.length) return <Box textAlign="center" mt={20}><Text>No career pathway data found.</Text></Box>;

  return (
    <>
      <NavBar />
      <Box maxW="container.xl" mx="auto" p={6}>
        <Heading textAlign="center" mb={6} color="blue.700">Personalized Career Pathway Recommender</Heading>
        <Text textAlign="center" mb={6}>
          Based on your current skills and positions held, here are your suggested roles and skill gaps.
        </Text>

{roles.map((role, idx) => (
          <Box key={idx} borderWidth="1px" borderRadius="lg" p={6} boxShadow="md" mb={8} bg="gray.50">
            <Heading size="md" mb={2}>{role.role}</Heading>
            <Text mb={2}>Readiness: {role.readiness}%</Text>
            <Progress value={role.readiness} colorScheme="green" mb={4} />

            <Divider mb={4} />
            <Heading size="sm" mb={2}>Skill Gaps</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Skill</Th>
                  <Th>Current Level</Th>
                  <Th>Required Level</Th>
                  <Th>Course to Take</Th>
                </Tr>
              </Thead>
              <Tbody>
                {role.gaps.map((gap, i) => (
                  <Tr key={i}>
                    <Td>{gap.skill}</Td>
                    <Td>
                      <Progress value={gap.current} size="sm" colorScheme="blue" mb={1} />
                      <Text fontSize="sm">{gap.current}%</Text>
                    </Td>
                    <Td>
                      <Progress value={gap.required} size="sm" colorScheme="pink" mb={1} />
                      <Text fontSize="sm">{gap.required}%</Text>
                    </Td>
                    <Td>
                      <Button size="sm" colorScheme="pink" onClick={() => (window.location.href="/learning")}>
                        View in Learning
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Divider my={4} />
            <Heading size="sm" mb={2}>Career Progression Pathway</Heading>
            <Box mt={4}>
              <Flex align="center" justify="space-between">
                {role.path.map((step, i) => (
                  <VStack key={i} spacing={1}>
                    <Circle size="40px" bg={step.color} color="black">{step.icon}</Circle>
                    <Text fontSize="sm">{step.stage}</Text>
                  </VStack>
                ))}
              </Flex>
              <Text mt={3} color="gray.600" fontSize="sm">
                Estimated journey: 8–12 months to reach {role.role}, 2–3 years to leadership.
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CareerPathway;
