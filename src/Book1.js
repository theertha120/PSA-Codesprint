import { Box, Heading, Progress, Text, SimpleGrid, Button } from '@chakra-ui/react';
import NavBar from './NavBar';

const chapters = [
    {
      title: "Chapter 1: Introduction to Automation",
      hoursRead: 2,
      remaining: 3,
    },
    {
      title: "Chapter 2: Understanding Machine Learning",
      hoursRead: 1.5,
      remaining: 4.5,
    },
    {
      title: "Chapter 3: Introduction to Robotics",
      hoursRead: 1,
      remaining: 2,
    },
    {
      title: "Chapter 4: Advanced Automation Techniques",
      hoursRead: 2.5,
      remaining: 3,
    },
    {
      title: "Chapter 5: AI in Modern Industry",
      hoursRead: 1,
      remaining: 5,
    },
    {
      title: "Chapter 6: Data Analysis and Visualization",
      hoursRead: 2,
      remaining: 4,
    },
    {
      title: "Chapter 7: Automation Project Management",
      hoursRead: 1.5,
      remaining: 3.5,
    },
    {
      title: "Chapter 8: Case Studies in Automation",
      hoursRead: 2,
      remaining: 2,
    },
    {
      title: "Chapter 9: Future of Automation Technology",
      hoursRead: 1,
      remaining: 4,
    },
    {
      title: "Chapter 10: Conclusion and Next Steps",
      hoursRead: 1.5,
      remaining: 2.5,
    },
  ];

const Book1 = () => {
  return (
    <>
    <NavBar />
    <Box p={4} alignItems="center" width="100%">
        <Heading as="h2" mb={6}>Book 1: Chapter Details</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {chapters.map((chapter, index) => (
            <Box key={index} bg="white" p={4} borderRadius="md" boxShadow="md" width="350px">
                <Heading as="h3" fontSize="xl">{chapter.title}</Heading>
                
                {/* Reading Statistics */}
                <Text mt={2}>Hours Read: {chapter.hoursRead}</Text>
                <Text>Remaining: {((chapter.hoursRead / chapter.remaining) * 100).toFixed(2)}%</Text>

                {/* Progress Bar */}
                <Progress mt={2} value={100 - ((chapter.hoursRead / chapter.remaining) * 100).toFixed(2)} colorScheme="teal" />
                
                <Button mt={4} colorScheme="purple"> Read </Button>
            </Box>
            ))}
        </SimpleGrid>
    </Box>
    </>
  );
};

export default Book1;

