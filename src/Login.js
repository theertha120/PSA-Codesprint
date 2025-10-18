import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    VStack,
    Input,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
    const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure();

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Account created",
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
                title: "Signed In",
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
            bgImage="url('/bg.jpg')" 
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={6}
        >
            
            <Box
                bg="rgba(255, 255, 255, 0.85)"
                borderRadius="2xl"
                boxShadow="2xl"
                p={16}           
                maxW="1200px"    
                minH="500px"    
                width="100%"
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
            >

                {/* Left Section: Heading & Description */}
                <Flex flex="1" justify="center" align="center" flexDirection="column" mb={{ base: 8, md: 0 }}>
                    <Heading
                        as="h1"
                        size="3xl"
                        color="darkPinkBlue.700"
                        textAlign="center"
                        mb={4}
                        fontFamily="'Poppins', sans-serif"
                        textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                    >
                        Career Canvas
                    </Heading>
                    <Text
                        fontSize="xl"
                        color="darkPinkBlue.500"
                        textAlign="center"
                        textShadow="1px 1px 3px rgba(0,0,0,0.3)"
                    >
                        Every Talent, One Port: <br />
                        where employees paint their own career journey
                    </Text>
                </Flex>

                {/* Right Section: Buttons */}
                <Flex flex="1" justify="center" align="center">
                    <VStack spacing={6} w="full">
                        <Button
                            onClick={onSignInOpen}
                            bgGradient="linear(to-r, darkPinkBlue.700, darkPinkBlue.400)"
                            color="white"
                            size="lg"
                            w="100%"
                            _hover={{
                                bgGradient: "linear(to-r, darkPinkBlue.800, darkPinkBlue.500)",
                                boxShadow: "lg",
                            }}
                            borderRadius="3xl"
                        >
                            Log In
                        </Button>

                        <Button
                            onClick={onSignUpOpen}
                            bgGradient="linear(to-r, darkPinkBlue.500, darkPinkBlue.300)"
                            color="white"
                            size="lg"
                            w="100%"
                            _hover={{
                                bgGradient: "linear(to-r, darkPinkBlue.600, darkPinkBlue.400)",
                                boxShadow: "lg",
                            }}
                            borderRadius="3xl"
                        >
                            Sign Up
                        </Button>
                    </VStack>
                </Flex>
            </Box>

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
                            />
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bgGradient="linear(to-r, darkPinkBlue.700, darkPinkBlue.400)"
                            color="white"
                            w="full"
                            onClick={handleSignIn}
                        >
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
                            />
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bgGradient="linear(to-r, darkPinkBlue.700, darkPinkBlue.400)"
                            color="white"
                            w="full"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Login;
