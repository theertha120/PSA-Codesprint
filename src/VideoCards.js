import React from 'react';
import { SimpleGrid, Box, Heading, Text, Button, LinkBox } from '@chakra-ui/react';
import NavBar from './NavBar';

const videos = [
  {
    title: "Introduction to Automation",
    presenter: "John Doe",
  },
  {
    title: "Advanced Machine Learning Techniques",
    presenter: "Jane Smith",
  },
  {
    title: "Web Development Best Practices",
    presenter: "Alice Johnson",
  },
  {
    title: "Data Science Essentials",
    presenter: "Bob Brown",
  },
  // Add more videos as needed
];

const VideoCards = () => {
  return (
    <>
    <NavBar />
    <Box p={4} alignItems="center" width="100%">
        <Heading as="h2" mb={6}>Videos</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {videos.map((video, index) => (
            <LinkBox 
            key={index} 
            as="article" 
            bg="white" 
            p={4} 
            borderRadius="md" 
            boxShadow="md"
            >
            <Box textAlign="center">
                <Heading as="h4" size="md">{video.title}</Heading>
                <Text mt={2}>Presented by: {video.presenter}</Text>
                <Button 
                mt={4} 
                colorScheme="purple"
                >
                Watch
            </Button>
            </Box>
            </LinkBox>
        ))}
        </SimpleGrid>
    </Box>
    </>
  );
};

export default VideoCards;

