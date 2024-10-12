import React, { useState } from "react";
import { Grid, Box, Button, Text, VStack, CircularProgress, CircularProgressLabel, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaPlayCircle, FaChalkboardTeacher, FaGamepad } from "react-icons/fa";
import CourseDetails from "./CourseDetails"; // Import the new CourseDetails component

const LearningDashboard = () => {
    const [showCourses, setShowCourses] = useState(false); // State to manage view

    // Dummy chart data
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Course Completion",
                data: [10, 20, 30, 40, 35],
                borderColor: "#00bcd4",
                fill: false,
            },
            {
                label: "Test Scores",
                data: [15, 25, 35, 30, 45],
                borderColor: "#2196f3",
                fill: false,
            },
            {
                label: "Tasks Completed",
                data: [5, 10, 15, 20, 25],
                borderColor: "#8e44ad",
                fill: false,
            },
        ],
    };

    const handleBrowseCourses = () => {
        setShowCourses(true); // Show the course details
    };

    const handleBackToDashboard = () => {
        setShowCourses(false); // Return to the dashboard
    };

    if (showCourses) {
        return <CourseDetails onBack={handleBackToDashboard} />; // Render CourseDetails when showCourses is true
    }

    return (
        <Box
            backgroundColor="white"
            color="#2c0e60"
            minHeight="100vh"
            padding="20px"
        >
            <Text fontSize="4xl" textAlign="center" mb={4}>
                Learning Dashboard
            </Text>

            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {[
                    {
                        icon: <FaGamepad />,
                        title: "Gamified Interactive Learning",
                    },
                    {
                        icon: <FaChalkboardTeacher />,
                        title: "Lectures and Quizzes",
                    },
                    {
                        icon: <FaPlayCircle />,
                        title: "Video Learning",
                    },
                ].map((item, index) => (
                    <Box
                        key={index}
                        padding="20px"
                        textAlign="center"
                        borderWidth="1px"
                        borderRadius="lg"
                        backgroundColor="#f5f5f5"
                    >
                        <Flex align="center" justify="center" mb={2} fontSize="50px">
                            {item.icon}
                        </Flex>
                        <Text fontSize="lg" mb={2}>
                            {item.title}
                        </Text>
                        <Button
                            colorScheme="teal"
                            variant="solid"
                            onClick={handleBrowseCourses} // Handle button click
                        >
                            Browse Courses →
                        </Button>
                    </Box>
                ))}
            </Grid>

            <Text fontSize="3xl" textAlign="center" my={10}>
                Learning Activity Overview
            </Text>
            <Box width="60%" margin="auto">
                <Line data={data} />
            </Box>

            <Text fontSize="3xl" textAlign="center" my={10}>
                Current Courses
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {[
                    { title: "Course 1", progress: 20 },
                    { title: "Course 2", progress: 85 },
                    { title: "Course 3", progress: 94 },
                ].map((course, index) => (
                    <Box key={index} padding="20px" textAlign="center" borderWidth="1px" borderRadius="lg" backgroundColor="#f5f5f5">
                        <Text fontSize="lg" mb={2}>
                            {course.title}
                        </Text>
                        <VStack margin="20px auto">
                            <CircularProgress value={course.progress} color="#00bcd4" size="100px">
                                <CircularProgressLabel>{course.progress}%</CircularProgressLabel>
                            </CircularProgress>
                        </VStack>
                        <Button colorScheme="teal" variant="solid">
                            Resume Course
                        </Button>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default LearningDashboard;
