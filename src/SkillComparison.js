import React, { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';

// Register chart.js components
Chart.register(...registerables);

const SkillComparison = () => {
    const bellCurveRef = useRef(null); // Ref for bell curve chart
    const barGraphRef = useRef(null); // Ref for bar graph

    useEffect(() => {
        // Initialize the bell curve chart
        const bellCtx = bellCurveRef.current.getContext('2d');
        const bellSkillData = {
            labels: ['0%', '20%', '40%', '60%', '80%', '100%'], // Skill levels as proportions
            datasets: [
                {
                    label: 'JavaScript Bell Curve',
                    data: [0, 5, 30, 70, 90, 70], // Bell-shaped data for JavaScript
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Python Bell Curve',
                    data: [0, 3, 15, 50, 80, 70], // Bell-shaped data for Python
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Project Management Bell Curve',
                    data: [0, 2, 10, 40, 70, 60], // Bell-shaped data for Project Management
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: true,
                    tension: 0.3,
                },
            ],
        };

        const skillTrendChart = new Chart(bellCtx, {
            type: 'line', // Bell curve as a line chart
            data: bellSkillData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 10, // Reduced font size for the legend
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Skill Proficiency Bell Curves',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Skill Level (%)', // Title for horizontal axis
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Proportion of PSA Employees', // Title for vertical axis
                        },
                        beginAtZero: true,
                        max: 100, // Proportion values should go up to 100%
                        ticks: {
                            stepSize: 10, // Define step size for better visibility
                            max: 100,
                        },
                    },
                },
            },
        });

        // Initialize the bar graph
        const barCtx = barGraphRef.current.getContext('2d');
        const barGraphData = {
            labels: ['JavaScript', 'Python', 'Project Management'],
            datasets: [
                {
                    label: 'Skill Level (%)',
                    data: [90, 80, 70], // Average proficiency levels
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Industry Standard (%)',
                    data: [82, 77, 65], // Randomized industry standards for comparison
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const barChart = new Chart(barCtx, {
            type: 'bar', // Bar chart for skill levels
            data: barGraphData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 10, // Reduced font size for the legend
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Average Skill Levels vs Industry Standards',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Skills', // Title for horizontal axis
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Skill Level (%)', // Title for vertical axis
                        },
                        beginAtZero: true,
                        max: 100, // Set maximum to 100%
                        ticks: {
                            stepSize: 5, // Define step size for better visibility
                        },
                    },
                },
            },
        });

        // Cleanup chart on unmount
        return () => {
            skillTrendChart.destroy();
            barChart.destroy();
        };
    }, []);

    return (
        <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                Employee Skill Trends
            </Text>

            <Text fontSize="md" mb={2}>Skill Proficiency Trends (Bell Curves)</Text>
            <canvas ref={bellCurveRef} height={400} /> {/* Increased height for bell curve */}

            <Text fontSize="md" mb={2} mt={6}>Skill Level Distribution (Bar Graph)</Text>
            <canvas ref={barGraphRef} height={400} /> {/* Increased height for bar graph */}
        </Box>
    );
};

export default SkillComparison;
