import React from "react";
import { Grid, Box, Text, Button, Image } from "@chakra-ui/react";

// Update course data with your image paths
const courses = [
    {
        title: "Course 1",
        image: "Capture.JPG", // Replace with your actual image path
        completionTime: "2 weeks",
        preparedBy: "Instructor A",
        description: "This course covers the fundamentals of XYZ.",
    },
    {
        title: "Course 2",
        image: "Capture1.JPG", // Replace with your actual image path
        completionTime: "4 weeks",
        preparedBy: "Instructor B",
        description: "An in-depth look at ABC concepts.",
    },
    {
        title: "Course 3",
        image: "Capture3.JPG", // Replace with your actual image path
        completionTime: "3 weeks",
        preparedBy: "Instructor C",
        description: "Explore advanced topics in XYZ.",
    },
];

const CourseDetails = ({ onBack }) => {
    return (
        <Box
            padding="20px"
            backgroundColor="#f5f5f5"
            minHeight="100vh"
        >
            <Text fontSize="2xl" textAlign="center" mb={6}>
                Available Courses
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} justifyContent="center">
                {courses.map((course, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="20px"
                        textAlign="center"
                        color="#2c0e60"
                        height="350px" // Fixed height for uniformity
                    >
                        <Image
                            src={course.image}
                            alt={course.title}
                            boxSize="150px"
                            borderRadius="10px"
                            marginBottom="10px"
                        />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            {course.title}
                        </Text>
                        <Text>Completion Time: {course.completionTime}</Text>
                        <Text>Prepared By: {course.preparedBy}</Text>
                        <Text fontSize="sm" mb={4}>
                            {course.description}
                        </Text>
                        <Button
                            colorScheme="teal"
                            variant="solid"
                        >
                            Enroll Now
                        </Button>
                    </Box>
                ))}
            </Grid>
            <Button onClick={onBack} marginTop="20px" colorScheme="teal">
                Back to Dashboard
            </Button>
        </Box>
    );
};

export default CourseDetails;
