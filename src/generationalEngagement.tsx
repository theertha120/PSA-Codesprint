import React, { useState } from 'react';
import AppointmentScheduler from './appointmentScheduler.tsx';
import MentorMatchForm from './mentorMatchForm.tsx';
import MenteeProgress from './MenteeProgress.js';
import { Box, Flex, Heading, Text, Button, useToast, Stack, Image, LinkBox } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar.js';

import { FaBook, FaClipboardCheck, FaVideo } from 'react-icons/fa'; // Importing relevant icons

const Card = ({ title, description, bg, color, Icon, link }) => {
  const navigate = useNavigate();
  return (
    <LinkBox
      bg={bg}
      color={color}
      borderRadius="lg"
      boxShadow="md"
      width="300px" // Set a fixed width for consistency
      height={"260px"}
      mx={2} // Add margin on the x-axis
      p={4} // Padding inside the box
      display="flex"
      flexDirection="column"
      alignItems="center" // Center content horizontally
      justifyContent="center"
      onClick={() => navigate(link)}
      _hover={{ cursor: "pointer", boxShadow: "lg" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        height="100px" // Set height for the icon box
        width="100px" // Set width for the icon box
        borderRadius="full" // Make it circular
        background="linear-gradient(to right, #6a0dad, #8e9fff)" // Gradient background
        color="white" // Icon color
        fontSize="2rem" // Increase icon size
      >
        <Icon /> {/* Render the icon */}
      </Box>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </LinkBox>
  );
};

const MentorDetails = ({ name, region, work, iconSrc, link }) => {
  const navigate = useNavigate();
  return (
    <LinkBox 
      p={4} 
      bg="white" 
      borderRadius="md" 
      boxShadow="md" 
      width="350px" 
      margin="10px"
      onClick={() => navigate(link)}
      _hover={{ cursor: "pointer", boxShadow: "lg" }}
      >
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
    </LinkBox>
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
    <>
      <NavBar />
      <div>
        <Heading as="h2" p={4}>Mentorship Hub</Heading>
        <Box bg="gray.100" p={4}>
          <Flex justifyContent="center">
            <Card
              title="Book 1"
              description="Additional resources from mentor 1"
              bg="white"
              color="gray.700"
              Icon={FaBook} // Use the book icon
              link="/gen-ex/book1"
            />
            <Card
              title="Preparatory Quiz"
              description="Due on 19 October 2024"
              bg="white"
              color="gray.700"
              Icon={FaClipboardCheck} // Use the clipboard check icon
              link="/gen-ex/quizcards"
            />
            <Card
              title="Video 1"
              description="Introduction to automation from mentor 1"
              bg="white"
              color="gray.700"
              Icon={FaVideo} // Use the video icon
              link="/gen-ex/videos"
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
                <MentorDetails name="John Doe" region="Southeast Asia" work="Automation Engineer" iconSrc="maleMentor.webp" link="/chat/John Doe" />
                <MentorDetails name="Jane Smith" region="North America" work="Data Scientist" iconSrc="female mentor.jpeg" link="/chat/Jane Smith" />
              </Flex>
            </Flex>
          </Box>

          <Button color="darkPurple.700" onClick={handleButtonClick} px={5} >
            Schedule an Appointment with Your Mentor?
          </Button>

          {showTable && (
            <div>
              <AppointmentScheduler />
              <Button colorScheme="purple" onClick={handleConfirm}>
                Confirm Selected Times
              </Button>
            </div>
          )}

          <Button color="darkPurple.700" onClick={handleMentorMatchButton} px={3} mb={10}>
            Want another Mentor?
          </Button>

          {showMentorMatchForm && (
            <MentorMatchForm />
          )}

          {/* Mentees Icon and Details Section */}
          <Text fontSize="3xl" fontWeight="bold">Mentees</Text>

          <Box mt={2} mb={4} width="100%">
            <Flex alignItems="center" p={4} bg="gray.50" borderRadius="md" justifyContent="center">
              <Flex justifyContent="center" wrap="wrap" margin="10px"> {/* Allow wrapping for responsiveness */}
                <MentorDetails name="Alice Johnson" region="Southeast Asia" work="Automation Engineer Intern" iconSrc="female mentor.jpeg" link="/chat/Alice Johnson" />
                <MentorDetails name="Brian Smith" region="Southeast Asia" work="Automation Engineer Intern" iconSrc="maleMentor.webp" link="/chat/Brian Smith" />
                <MentorDetails name="Clara Lee" region="Southeast Asia" work="Automation Engineer Intern" iconSrc="female mentor.jpeg" link="/chat/Clara Lee" />
                <MentorDetails name="David Kim" region="Southeast Asia" work="Automation Engineer Intern" iconSrc="maleMentor.webp" link="/chat/David Kim" />
              </Flex>
            </Flex>

            <MenteeProgress />
          </Box>
        </Stack>

      </div>
    </>
  );
};

export default GenerationalEngagement;
