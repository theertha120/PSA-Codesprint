import React, { useState } from 'react';
import AppointmentScheduler from './appointmentScheduler.tsx';
import MentorMatchForm from './mentorMatchForm.tsx';
import { Box, Flex, Heading, Text, Button, useToast, Stack, Image } from '@chakra-ui/react';

const Card = ({ title, description, bg, color, imgSrc  }) => {
  return (
    <Box
      bg={bg}
      color={color}
      p={2}
      mx={4}
      borderRadius="md"
      boxShadow="md"
      width="300px"
    >
      <Flex justifyContent="center" mb={3}>
      <Image 
        src={imgSrc} 
        alt={title} 
        borderRadius="md" 
        width="200px"
        height="200px"
        objectFit="cover" // Ensures the image covers the defined size without distortion
      />
      </Flex>
      <Heading as="h3" p={4}>{title}</Heading>
      <Text>{description}</Text>
    </Box>
  );
};

const MentorDetails = ({ name, region, work, iconSrc }) => {
  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" width="350px" margin="10px">
      <Flex alignItems="center">
        {/* Mentor Icon */}
        <Image src={iconSrc} alt={`${name} icon`} boxSize="60px" borderRadius="full" />

        {/* Mentor Details */}
        <Box ml={4}> {/* Add margin-left for spacing */}
          <Text fontSize="lg" fontWeight="bold">{name}</Text>
          <Text>Region: {region}</Text>
          <Text>Work: {work}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const GenerationalEngagement = () => {
  const [showTable, setShowTable] = useState(false);
  const [showMentorMatchForm, setShowMentorMatchForm] = useState(false);

  const handleButtonClick = () => {
    setShowTable(!showTable);
  };

  const handleMentorMatchButton = () => {
    setShowMentorMatchForm(!showMentorMatchForm);
  };

  const toast = useToast();

    const handleConfirm = () => {
        toast({
        title: "Booking Confirmed",
        status: "success",
        duration: 5000,
        isClosable: true,
        });
        handleButtonClick();
    };

  return (
    <div>
    <Heading as="h2" p={4}>Generational Engagement</Heading>
    <Box bg="gray.100" p={4}>
      <Flex justifyContent="center">
        <Card
          title="Book 1"
          description="Additional resources from mentor 1"
          bg="white"
          color="gray.700"
          imgSrc="bookResource.jpg"
        />
        <Card
          title="Preparatory Quiz"
          description="Due on 19 October 2024"
          bg="white"
          color="gray.700"
          imgSrc="quizResource.avif"
        />
        <Card
          title="Video 1"
          description="Introduction to automation from mentor 1"
          bg="white"
          color="gray.700"
          imgSrc="videoResource.png"
        />
      </Flex>
    </Box>

    {/* Use Stack to arrange buttons vertically */}
    <Stack spacing={4} mt={4} alignItems="center">

      <Text fontSize="3xl" fontWeight="bold">Mentors</Text>

      {/* Mentor Icon and Details Section */}
      <Box mt={4} mb={4} width="100%">
      <Flex alignItems="center" p={4} bg="gray.50" borderRadius="md" justifyContent="center">
        <Flex justifyContent="center" wrap="wrap" margin="10px"> {/* Allow wrapping for responsiveness */}
          <MentorDetails name="John Doe" region="Southeast Asia" work="Automation Engineer" iconSrc="maleMentor.webp" />
          <MentorDetails name="Jane Smith" region="North America" work="Data Scientist" iconSrc="femaleMentor.png" />
        </Flex>
      </Flex>
      </Box>
    
      <Button colorScheme="purple" onClick={handleButtonClick} px={3}>
        Schedule an Appointment with Your Mentor?
      </Button>

      {showTable && (
        <div>
        <AppointmentScheduler />
        <Button colorScheme="teal" onClick={handleConfirm}>
          Confirm Selected Times
        </Button>
        </div>
      )}

      <Button colorScheme="purple" onClick={handleMentorMatchButton} px={3}>
        Want another Mentor?
      </Button>

      {showMentorMatchForm && (
        <MentorMatchForm />
      )}
    </Stack>

    </div>
  );
};

export default GenerationalEngagement;