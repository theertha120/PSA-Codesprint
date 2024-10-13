import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    Grid,
    Progress,
    Stack,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaPlayCircle, FaChalkboardTeacher, FaGamepad } from "react-icons/fa";
import CourseDetails from "./CourseDetails"; // Import the new CourseDetails component
import "./LearningDashboard.css"; // Import the CSS file
import NavBar from "./NavBar";

// Expanded AI-generated course data with various course types
const mockCourseData = [
    {
        title: "Intro to Machine Learning",
        type: "Lectures and Quizzes",
        progress: 40,
    },
    { title: "Advanced React Patterns", type: "Video Learning", progress: 20 },
    {
        title: "Python for Data Science",
        type: "Gamified Interactive Learning",
        progress: 85,
    },
    {
        title: "AI Ethics and Implications",
        type: "Lectures and Quizzes",
        progress: 60,
    },
    {
        title: "Deep Learning with TensorFlow",
        type: "Video Learning",
        progress: 30,
    },
    {
        title: "Data Structures and Algorithms",
        type: "Gamified Interactive Learning",
        progress: 50,
    },
    {
        title: "Design Patterns in Java",
        type: "Video Learning",
        progress: 10,
    },
    {
        title: "Ethics in a Workplace",
        type: "Lectures and Quizzes",
        progress: 75,
    },
    { title: "Introduction to Docker", type: "Video Learning", progress: 75 },
    { title: "Mindfulness Workshop", type: "Lectures and Quizzes", progress: 50 },
];

// Helper function to get the most preferred course type
const getMostPreferredCourseType = (courses) => {
    const typeCounts = courses.reduce((acc, course) => {
        acc[course.type] = (acc[course.type] || 0) + 1;
        return acc;
    }, {});

    const mostPreferred = Object.keys(typeCounts).reduce((a, b) =>
        typeCounts[a] > typeCounts[b] ? a : b
    );

    return mostPreferred;
};

const LearningDashboard = () => {
    const [showCourses, setShowCourses] = useState(false); // State to manage view
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [mostPreferredCourseType, setMostPreferredCourseType] = useState("");

    // User profile data
    const userProfile = {
        name: "Nancy Drew",
        age: 28,
        dateOfBirth: "1996-01-15",
        department: "Software Engineering",
        position: "Junior Developer",
        levelOfExperience: "2 years",
        coursesCompleted: 10,
    };

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

    useEffect(() => {
        // Simulate fetching AI-generated course recommendations (mock dataset)
        setRecommendedCourses(mockCourseData);

        // Calculate most preferred course type
        const preferredType = getMostPreferredCourseType(mockCourseData);
        setMostPreferredCourseType(preferredType);
    }, []);

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
        <><NavBar />
            <Box className="page-container" p={5} marginRight={10} marginLeft={10}>
                <Heading as="h4" textAlign="center" mb={5}>
                    User Profile
                </Heading>
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    boxShadow="md"
                    mb={5}
                    display="flex"               // Enable flexbox
                    alignItems="center"         // Center vertically
                    justifyContent="center"     // Center horizontally
                    width={1000}
                    mx="auto"
                >
                    <Stack direction="row" spacing={4} align="center">
                        <Image src="/1.webp" alt="Profile" borderRadius="full" boxSize="200px" marginRight={100} />
                        <Stack spacing={1} align="flex-start"> {/* Align text stack to the start */}
                            <Text fontWeight="bold">Name: {userProfile.name}</Text>
                            <Text>Age: {userProfile.age}</Text>
                            <Text>Date of Birth: {userProfile.dateOfBirth}</Text>
                            <Text>Department: {userProfile.department}</Text>
                            <Text>Position: {userProfile.position}</Text>
                            <Text>Level of Experience: {userProfile.levelOfExperience}</Text>
                            <Text>Courses Completed: {userProfile.coursesCompleted}</Text>
                        </Stack>
                    </Stack>
                </Box>

                <Heading as="h4" textAlign="center" mb={5}>
                    The recommended course type for you is{" "}
                    <span className="underline">{mostPreferredCourseType}</span> tailored to
                    your generational requirements and personal learning preferences.
                </Heading>

                <Grid templateColumns="repeat(3, 1fr)" gap={4} >
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
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                            textAlign="center"
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100px" // Set a height for better centering
                            >
                                <Box fontSize="60px">{item.icon}</Box> {/* Increased fontSize for the icon */}
                            </Box>
                            <Text fontSize="xl" mb={2}>
                                {item.title}
                            </Text>
                            <Button colorScheme="darkPurple" onClick={handleBrowseCourses} mb={8}>
                                Browse Courses →
                            </Button>
                        </Box>
                    ))}
                </Grid>

                <Heading as="h4" textAlign="center" mt={10} mb={5}>
                    Learning Activity Overview
                </Heading>
                <Box>
                    <Line data={data} height={450} width={200} options={{ maintainAspectRatio: false }} />
                </Box>

                <Heading as="h4" textAlign="center" mt={10} mb={5}>
                    Current Courses
                </Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {mockCourseData.map((course, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                        >
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                {course.title}
                            </Text>
                            <Text mb={2}>Course Type: {course.type}</Text>
                            <Progress
                                value={course.progress}
                                size="lg"
                                colorScheme="darkPurple"
                                mb={2}
                            />
                            <Text textAlign="center">{course.progress}%</Text>
                            <Button
                                colorScheme="darkPurple"
                                mt={2}
                                width="full"
                            >
                                Resume Course
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </Box >
        </>
    );
};

export default LearningDashboard;
