import React, { useState } from 'react';
import { Box, Textarea, Button, VStack, Heading, Text } from '@chakra-ui/react';
import NavBar from './NavBar';

const MenteeChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput('');
    }
  };

  return (
    <>
    <NavBar />
    <Box p={4}>
      <Heading as="h2">Live Chat</Heading>
      <VStack spacing={4} mt={4}>
        {messages.map((message, index) => (
          <Text key={index} borderWidth="1px" borderRadius="md" p={2} w="100%">
            {message}
          </Text>
        ))}
      </VStack>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        mt={4}
      />
      <Button colorScheme="blue" onClick={handleSend} mt={2}>
        Send
      </Button>
    </Box>
    </>
  );
};

export default MenteeChat;

