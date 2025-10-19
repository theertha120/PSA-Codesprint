import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  Text,
  VStack,
  useClipboard,
  Tooltip,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { FiSend, FiShare2, FiInfo } from "react-icons/fi";
import NavBar from "./NavBar";

const gradientText = "linear-gradient(90deg, #2563EB 0%, #7C3AED 55%, #EC4899 100%)";
const bubbleGradient = "linear-gradient(135deg, #2B2E8C 0%, #A83279 80%)";
const STRESS_REGEX = /(i am feeling stressed|i'm feeling stressed|i feel stressed)/i;

// --- Chat bubbles
const BotBubble = ({ children }) => (
  <HStack align="flex-start" spacing={3} maxW="100%">
    <Avatar size="sm" name="P" bg="pink.600" color="white" />
    <Box
      bgGradient={bubbleGradient}
      color="white"
      px={4}
      py={3}
      borderRadius="xl"
      boxShadow="lg"
      whiteSpace="pre-wrap"
      maxW="75%"
    >
      {children}
    </Box>
  </HStack>
);

const UserBubble = ({ children }) => (
  <HStack align="flex-start" spacing={3} justify="flex-end" maxW="100%">
    <Box
      bg="pink.500"
      color="white"
      px={4}
      py={3}
      borderRadius="xl"
      boxShadow="md"
      whiteSpace="pre-wrap"
      maxW="75%"
    >
      {children}
    </Box>
    <Avatar size="sm" name="Y" bg="gray.200" color="gray.700" />
  </HStack>
);

export default function Chatbot() {
  const [mode, setMode] = useState("career"); // 'career' | 'learning' | 'wellbeing'
  const [value, setValue] = useState("");
  const [beginNew, setBeginNew] = useState(false);
  const [awaitingName, setAwaitingName] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // pre-chat vs chat
  const { onCopy, hasCopied } = useClipboard("https://psa.example/chat/share/mock");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text:
        "Hi! I’m the PSA Chatbot. Choose a mode below and chat with me.\nTry:\n• “Show my gaps” (Career)\n• “Recommend a React course” (Learning)\n• “I am feeling stressed” (Well-being)",
    },
  ]);

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const pushBot = (text) => setMessages((p) => [...p, { role: "bot", text }]);
  const pushUser = (text) => setMessages((p) => [...p, { role: "user", text }]);

  const wellbeingReply = () => {
    pushBot(
      [
        "Here for you 💜",
        "",
        "Quick reset plan:",
        "• Try a 3-minute box-breathing: inhale 4s • hold 4s • exhale 4s • hold 4s (×4).",
        "• Stand up, stretch shoulders/neck, and take a 2–5 minute walk.",
        "• Hydrate: have a glass of water.",
        "• Jot 3 worries → circle one you can act on → one tiny next step.",
        "• When ready, try a short mindfulness mini-lesson.",
        "",
        "What’s your name? I’d like to address you properly 🙂",
      ].join("\n")
    );
    setAwaitingName(true);
  };

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    setHasStarted(true); // expands to chat on first send

    if (beginNew) {
      setMessages([{ role: "bot", text: "New chat started. How can I help?" }]);
      setBeginNew(false);
    }

    pushUser(text);

    if (awaitingName) {
      setAwaitingName(false);
      const name = text.split(/\s+/).slice(0, 2).join(" ");
      pushBot(
        `Nice to meet you, ${name}! I’m glad you told me how you’re feeling. We can take it step by step. Type “breathing” to start a short relaxation (mock) or “more tips” for other ways to unwind.`
      );
      setValue("");
      return;
    }

    if (STRESS_REGEX.test(text)) {
      if (mode !== "wellbeing") {
        pushBot("Redirecting to Well-being section…");
        setMode("wellbeing");
      }
      wellbeingReply();
      setValue("");
      return;
    }

    const label =
      mode === "career" ? "Career Q&A" : mode === "learning" ? "Learning Help" : "Well-being";
    pushBot(`(${label}) I noted your message: “${text}”. I’m a demo chatbot for now — responses coming soon.`);
    setValue("");
  };

  const onEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ---------- PRE-CHAT (buttons visible from the start) ----------
  if (!hasStarted) {
    return (
      <>
        <NavBar />
        <Box bg="white" minH="100vh" py={{ base: 8, md: 14 }}>
          <Container maxW="4xl">
            <VStack spacing={6} align="center">
              {/* Logo + subtitle */}
              <VStack spacing={1} mt={2}>
                <Text
                  fontSize={{ base: "5xl", md: "6xl" }}
                  fontWeight="extrabold"
                  lineHeight="1"
                  bgGradient={gradientText}
                  bgClip="text"
                >
                  PSA
                </Text>
                <Text fontSize="xl" color="gray.800" fontWeight="semibold">
                  Career Chatbot
                </Text>
              </VStack>

              {/* Big input + round send */}
              <Box w="full" position="relative">
                <InputGroup size="lg">
                  <Input
                    placeholder="Type anything"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onEnter}
                    pr="72px"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "pink.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-pink-400)",
                    }}
                    borderRadius="xl"
                    height="56px"
                  />
                  <InputRightElement width="72px" height="56px">
                    <Tooltip label="Send (Enter)">
                      <Button
                        onClick={handleSend}
                        aria-label="Send"
                        borderRadius="full"
                        w="44px"
                        h="44px"
                        bg="purple.400"
                        _hover={{ bg: "purple.500" }}
                      >
                        <Icon as={FiSend} color="white" />
                      </Button>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </Box>

              {/* Controls row */}
              <HStack spacing={6} color="gray.600" fontSize="sm" flexWrap="wrap" justify="center">
                <HStack spacing={2}>
                  <Radio
                    isChecked={beginNew}
                    onChange={(e) => setBeginNew(e.target.checked)}
                    colorScheme="pink"
                  />
                  <Text>Begin New Chat</Text>
                </HStack>

                <HStack as="button" onClick={onCopy} spacing={2} _hover={{ color: "gray.800" }}>
                  <Icon as={FiShare2} />
                  <Text>{hasCopied ? "Link copied!" : "Share Conversation"}</Text>
                </HStack>

                <HStack spacing={2}>
                  <Icon as={FiInfo} color="pink.400" />
                  <Text>The PSA chatbot can make mistakes. Double-check important info.</Text>
                </HStack>
              </HStack>

              {/* >>> Buttons visible from the start <<< */}
              <HStack spacing={8} pt={1}>
                <Button
                  variant={mode === "career" ? "solid" : "outline"}
                  colorScheme="pink"
                  borderRadius="md"
                  px={10}
                  h="48px"
                  onClick={() => setMode("career")}
                >
                  Career Q&A
                </Button>
                <Button
                  variant={mode === "learning" ? "solid" : "outline"}
                  colorScheme="pink"
                  borderRadius="md"
                  px={10}
                  h="48px"
                  onClick={() => setMode("learning")}
                >
                  Learning Help
                </Button>
                <Button
                  variant={mode === "wellbeing" ? "solid" : "outline"}
                  colorScheme="pink"
                  borderRadius="md"
                  px={10}
                  h="48px"
                  onClick={() => setMode("wellbeing")}
                >
                  Well-being
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </>
    );
  }

  // ---------- CHAT MODE ----------
  return (
    <>
      <NavBar />
      <Box bg="white" minH="100vh" py={{ base: 8, md: 12 }}>
        <Container maxW="5xl">
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <VStack spacing={2} align="center">
              <Text
                fontSize={{ base: "5xl", md: "6xl" }}
                fontWeight="extrabold"
                lineHeight="1"
                bgGradient={gradientText}
                bgClip="text"
              >
                PSA
              </Text>
              <Text fontSize="xl" color="gray.700" fontWeight="semibold">
                Career Chatbot
              </Text>
            </VStack>

            {/* Mode Buttons */}
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Button
                variant={mode === "career" ? "solid" : "outline"}
                colorScheme="pink"
                borderRadius="md"
                px={8}
                h="44px"
                onClick={() => setMode("career")}
              >
                Career Q&A
              </Button>
              <Button
                variant={mode === "learning" ? "solid" : "outline"}
                colorScheme="pink"
                borderRadius="md"
                px={8}
                h="44px"
                onClick={() => setMode("learning")}
              >
                Learning Help
              </Button>
              <Button
                variant={mode === "wellbeing" ? "solid" : "outline"}
                colorScheme="pink"
                borderRadius="md"
                px={8}
                h="44px"
                onClick={() => setMode("wellbeing")}
              >
                Well-being
              </Button>
            </HStack>

            {/* Info row */}
            <HStack spacing={4} color="gray.600" fontSize="sm" justify="center" flexWrap="wrap">
              <HStack spacing={2}>
                <Radio
                  isChecked={beginNew}
                  onChange={(e) => setBeginNew(e.target.checked)}
                  colorScheme="pink"
                />
                <Text>Begin New Chat</Text>
              </HStack>

              <HStack as="button" onClick={onCopy} spacing={2} _hover={{ color: "gray.800" }}>
                <Icon as={FiShare2} />
                <Text>{hasCopied ? "Link copied!" : "Share Conversation"}</Text>
              </HStack>

              <HStack spacing={2}>
                <Icon as={FiInfo} color="pink.400" />
                <Text>The PSA chatbot can make mistakes. Double-check important info.</Text>
              </HStack>
            </HStack>

            {/* Chat window */}
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              boxShadow="md"
              bg="white"
              p={{ base: 4, md: 6 }}
              h={{ base: "55vh", md: "60vh" }}
              display="flex"
              flexDirection="column"
            >
              <VStack ref={listRef} align="stretch" spacing={4} flex="1" overflowY="auto" pr={1}>
                {messages.map((m, i) =>
                  m.role === "bot" ? <BotBubble key={i}>{m.text}</BotBubble> : <UserBubble key={i}>{m.text}</UserBubble>
                )}
              </VStack>

              <Divider my={3} />

              {/* Input row */}
              <Box w="full" position="relative">
                <InputGroup size="lg">
                  <Input
                    placeholder="Type your message…"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onEnter}
                    pr="72px"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "pink.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-pink-400)",
                    }}
                    borderRadius="xl"
                    height="52px"
                  />
                  <InputRightElement width="72px" height="52px">
                    <Tooltip label="Send (Enter)">
                      <Button
                        onClick={handleSend}
                        aria-label="Send"
                        borderRadius="full"
                        w="42px"
                        h="42px"
                        bg="purple.400"
                        _hover={{ bg: "purple.500" }}
                      >
                        <Icon as={FiSend} color="white" />
                      </Button>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
