import React, { useState } from "react";
import { Box, Heading, Text, Grid, Button, HStack } from "@chakra-ui/react";
import { FaLaptopCode, FaUsers, FaPlayCircle, FaChalkboardTeacher, FaGamepad } from "react-icons/fa";
import CourseDetails from "./CourseDetails";
import NavBar from "./NavBar";
import { CourseData } from "./CourseData";

const CourseLearning = () => {
  const [step, setStep] = useState(1); 
  const [selectedType, setSelectedType] = useState(""); 
  const [selectedMode, setSelectedMode] = useState("");
  const [coursesToShow, setCoursesToShow] = useState([]);

  const { technicalCourses, nonTechnicalCourses } = CourseData();

  const typeOptions = [
    { icon: <FaLaptopCode />, title: "Technical" },
    { icon: <FaUsers />, title: "Soft Skills" },
  ];


  const modeOptions = [
    { icon: <FaGamepad />, title: "Gamified" },
    { icon: <FaPlayCircle />, title: "Video" },
    { icon: <FaChalkboardTeacher />, title: "Lecture" },
  ];

  const handleSelectType = (type) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    const courses = selectedType === "Technical" ? technicalCourses : nonTechnicalCourses;
    const filtered = courses.filter((c) => c.modes.includes(mode));
    setCoursesToShow(filtered);
    setStep(3); 
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <>
      <NavBar />
      <Box maxW="container.xl" mx="auto" p={6}>
        {step === 1 && (
          <>
            <Heading as="h2" textAlign="center" mb={6} color="blue.700">
              Select Course Type
            </Heading>
            <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }} gap={6}>
              {typeOptions.map((type, idx) => (
                <Box
                  key={idx}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  boxShadow="md"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                  onClick={() => handleSelectType(type.title)}
                >
                  <HStack justify="center" mb={4}>
                    <Box fontSize="60px">{type.icon}</Box>
                  </HStack>
                  <Text fontWeight="bold" fontSize="xl">{type.title} Courses</Text>
                </Box>
              ))}
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            <Heading as="h2" textAlign="center" mb={6} color="blue.700">
              Select Learning Mode ({selectedType})
            </Heading>
            <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }} gap={6}>
              {modeOptions.map((mode, idx) => (
                <Box
                  key={idx}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  boxShadow="md"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                  onClick={() => handleSelectMode(mode.title)}
                >
                  <HStack justify="center" mb={4}>
                    <Box fontSize="60px">{mode.icon}</Box>
                  </HStack>
                  <Text fontWeight="bold" fontSize="xl">{mode.title}</Text>
                </Box>
              ))}
            </Grid>
            <Button mt={6} onClick={handleBack}>Back</Button>
          </>
        )}

        {step === 3 && (
          <CourseDetails courses={coursesToShow} onBack={handleBack} />
        )}
      </Box>
    </>
  );
};

export default CourseLearning;
