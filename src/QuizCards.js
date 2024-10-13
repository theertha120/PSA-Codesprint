import React from 'react';
import { SimpleGrid, Box, Heading, Text, Button, LinkBox } from '@chakra-ui/react';
import NavBar from './NavBar';

const quizzes = [
  {
    name: "Preparatory Quiz 1",
    scoreObtained: 85,
    isFinished: true, // Change this to false if not finished
  },
  {
    name: "Preparatory Quiz 2",
    scoreObtained: 90,
    isFinished: false,
  },
  {
    name: "Preparatory Quiz 3",
    scoreObtained: 75,
    isFinished: true,
  },
  {
    name: "Preparatory Quiz 4",
    scoreObtained: 80,
    isFinished: false,
  },
  // Add more quizzes as needed
];

const QuizCards = () => {
  return (
    <>
    <NavBar />
    <Box p={4} alignItems="center" width="100%">
        <Heading as="h2" mb={6}>Preparatory Quizzes</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {quizzes.map((quiz, index) => (
            <LinkBox 
            key={index} 
            as="article" 
            bg="white" 
            p={4} 
            borderRadius="md" 
            boxShadow="md"
            >
            <Box textAlign="center">
                <Heading as="h4" size="md">{quiz.name}</Heading>
                <Text mt={2}>Score Obtained: {quiz.scoreObtained}</Text>
                <Button 
                mt={4} 
                colorScheme={quiz.isFinished ? "green" : "purple"}
                >
                {quiz.isFinished ? "Retry" : "Start"}
                </Button>
            </Box>
            </LinkBox>
        ))}
        </SimpleGrid>
    </Box>
    </>
  );
};

export default QuizCards;

