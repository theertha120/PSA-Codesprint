import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Button, HStack, Input, VStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
    const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure();

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Account created.",
                description: "You have successfully signed up!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onSignUpClose();
            navigate('/home');
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Signed In.",
                description: `Welcome back, ${userCredential.user.email}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onSignInClose();
            navigate('/home');
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            minH="100vh"
            bgImage="url('bg.jpg')" // URL or path to your image
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            p={6}
        >
            <Flex
                justify="center"
                align="center"
                minH="80vh" // Full viewport height
                height={"20vh"}
                marginRight={"20"}
                marginLeft={"20"}
                marginTop={10}
                marginBottom={10}
            >
                <Box
                    bg="rgba(255, 255, 255, 0.7)" // Transparent grey box
                    width="100%" // Width covering 100% of the viewport
                    height="100%" // Height covering 100% of the viewport
                    borderRadius="200"
                    boxShadow="2xl" // Drop shadow for the box
                    display="flex"
                    padding={20}
                >
                    {/* Left Half for Heading */}
                    <Flex
                        flex="1" // Take up half of the box
                        justify="center"
                        align="center"
                        flexDirection="column"
                    >
                        <Heading
                            as="h1"
                            size="4xl"
                            color="purple.900"
                            fontFamily="'Poppins', sans-serif"
                            textAlign="center"
                            sx={{
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" // Apply text shadow
                            }}
                        >
                            PSA: Talent Harbour
                        </Heading>
                        <Text fontSize="xl" color="purple.600" textAlign="center" sx={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" // Apply text shadow
                        }}>
                            Every Talent, One Port:
                            <br />Navigating Success Together
                        </Text>
                    </Flex>

                    {/* Right Half for Buttons */}
                    <Flex
                        flex="1" // Take up the other half of the box
                        justify="center"
                        align="center"
                        flexDirection="column"
                    >
                        <VStack spacing={4}>
                            <Button
                                onClick={onSignInOpen}
                                colorScheme="purple"
                                bgGradient="linear(to-r, purple.600, purple.900)" // Dark purple gradient
                                color="white"
                                size="lg" // Make the button larger
                                height="60px" // Adjust height
                                width="400px" // Full width
                                _hover={{
                                    bgGradient: "linear(to-r, purple.700, purple.800)", // Darker gradient on hover
                                    boxShadow: "lg", // Add a shadow effect on hover
                                }}
                                borderRadius="80px" // Rounded corners
                                boxShadow="md" // Base shadow for the button
                            >
                                Log In
                            </Button> {/* Open Sign In Modal */}

                            <Button
                                onClick={onSignUpOpen}
                                colorScheme="purple"
                                bgGradient="linear(to-r, purple.600, purple.900)" // Dark purple gradient
                                color="white"
                                size="lg" // Make the button larger
                                height="60px" // Adjust height
                                width="100%" // Full width
                                _hover={{
                                    bgGradient: "linear(to-r, purple.700, purple.800)", // Darker gradient on hover
                                    boxShadow: "lg", // Add a shadow effect on hover
                                }}
                                borderRadius="80px" // Rounded corners
                                boxShadow="md" // Base shadow for the button
                            >
                                Sign Up
                            </Button> {/* Open Sign Up Modal */}
                        </VStack>
                    </Flex>

                </Box>
            </Flex>

            {/* Sign In Modal */}
            <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign In to your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="darkPurple.700" onClick={handleSignIn} width="full">
                            Sign In
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Sign Up Modal */}
            <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="darkPurple.700" onClick={handleSignUp} width="full">
                            Sign Up
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );

};

export default Login;
