import React from "react";
import { Box, Text, Grid, Button, Progress, VStack, HStack } from "@chakra-ui/react";
import { FaPlayCircle, FaGamepad, FaChalkboardTeacher } from "react-icons/fa";

const modeIcons = {
  Video: <FaPlayCircle />,
  Gamified: <FaGamepad />,
  Lecture: <FaChalkboardTeacher />,
};

const CourseDetails = ({ courses, onBack }) => {
  return (
    <Box p={6}>
      <Text fontSize="2xl" textAlign="center" mb={6}>
        Available Courses
      </Text>
      <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }} gap={6}>
        {courses.map((course) => (
          <Box
            key={course.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            textAlign="center"
          >
            <VStack spacing={2} align="stretch">
              <Text fontWeight="bold" fontSize="lg">{course.title}</Text>
              <Text fontSize="sm" color="gray.600">{course.specialisation}</Text>

              <HStack spacing={3} justify="center" my={2}>
                {course.modes.map((mode, i) => (
                  <Box key={i} fontSize="25px" title={mode}>{modeIcons[mode]}</Box>
                ))}
              </HStack>

              <Progress value={course.progress} mt={2} colorScheme="pink" />
              <Text>{course.progress}% Complete</Text>

              <Button colorScheme="pink" width="full" mt={2}>
                {course.progress > 0 ? "Resume" : "Start"}
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
      <Button onClick={onBack} mt={6} colorScheme="pink">Back</Button>
    </Box>
  );
};

export default CourseDetails;
