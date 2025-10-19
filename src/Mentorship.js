import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useToast,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiEdit3,
  FiUserCheck,
  FiVideo,
  FiList,
  FiX,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import NavBar from "./NavBar";

const boxGradient =
  "linear-gradient(145deg, rgba(23,37,84,1) 0%, rgba(88,28,135,0.95) 40%, rgba(190,24,93,0.9) 100%)";

const Card = ({ children, ...props }) => (
  <Box
    p={{ base: 7, md: 10 }}
    borderRadius="2xl"
    bg={boxGradient}
    color="white"
    boxShadow="xl"
    _hover={{ transform: "translateY(-4px)", transition: "all .25s" }}
    fontFamily="'Inter', sans-serif"
    minH={{ base: "520px", md: "560px" }}
    {...props}
  >
    {children}
  </Box>
);

// --- Small date helpers
function addDays(baseDate, numDays) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + numDays);
  return d;
}
const fmtDate = (d) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
const fmtWeekday = (d) =>
  d.toLocaleDateString(undefined, { weekday: "short" });

export default function Mentorship() {
  const toast = useToast();

  // Match Me
  const [selectedGap, setSelectedGap] = useState("Data Analysis");
  const [matched, setMatched] = useState([]);
  const [chosenMentor, setChosenMentor] = useState(null);

  // Booking
  const today = useMemo(() => new Date(), []);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(today, i)),
    [today]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Notes
  const [rawNotes, setRawNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isRec, setIsRec] = useState(false);

  // Dropdown meetings
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const meetings = [
    {
      id: "m1",
      title: "1:1 with Aarav",
      when: "Today 3:00 PM",
      platform: "Google Meet",
    },
    {
      id: "m2",
      title: "Career Planning with Priya",
      when: "Wed 4:30 PM",
      platform: "Zoom",
    },
  ];
  const disclosure = useDisclosure(); // for Menu control

  const mentors = [
    { id: 1, name: "Aarav Mehta", skill: "Data Analysis", exp: 8, rating: 4.9 },
    { id: 2, name: "Priya Tan", skill: "React", exp: 7, rating: 4.8 },
    { id: 3, name: "Daniel Koh", skill: "Leadership", exp: 10, rating: 4.7 },
  ];

  // Handlers
  const runMatching = () => setMatched(mentors.filter((m) => m.skill === selectedGap));

  const pickMentor = (m) => {
    setChosenMentor(m);
    toast({ title: `${m.name} selected`, status: "success" });
  };

  const confirmBooking = () => {
    if (!selectedSlot) {
      toast({ title: "Pick a slot first", status: "info" });
      return;
    }
    toast({ title: "Booking confirmed!", status: "success" });
  };

  const toggleRecording = () => {
    setIsRec((v) => !v);
    toast({
      title: !isRec ? "Recording started" : "Recording stopped",
      status: "info",
    });
  };

  const generateSummary = () => {
    setSummary("AI-generated summary (mock) based on your notes.");
  };

  const onChooseMeeting = (m) => {
    setSelectedMeeting(m);
    disclosure.onClose(); // close the dropdown immediately
    toast({ title: "Meeting selected", description: `${m.title} — ${m.when}`, status: "success" });
  };

  return (
    <>
      <NavBar />

      <Box minH="100vh" bg="white" color="gray.800" py={{ base: 8, md: 12 }}>
        <Container maxW="8xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 10 }}>
            {/* -------------------- Match Me -------------------- */}
            <Card>
              <HStack mb={4}>
                <Icon as={FiUserCheck} />
                <Text fontSize="lg" fontWeight="bold">
                  Match Me
                </Text>
                <Tag ml="auto" bg="pink.400" color="white" borderRadius="full">
                  <TagLabel>Top 3 mentors</TagLabel>
                </Tag>
              </HStack>

              <Text mb={5} fontSize="sm" opacity={0.9}>
                Discover mentors most experienced in your biggest skill gap.
              </Text>

              <Stack direction={{ base: "column", sm: "row" }} spacing={3} mb={5}>
                <Select
                  value={selectedGap}
                  onChange={(e) => setSelectedGap(e.target.value)}
                  bg="whiteAlpha.300"
                  color="white"
                  _focus={{ bg: "whiteAlpha.400" }}
                  _hover={{ bg: "whiteAlpha.400" }}
                  sx={{ option: { background: "#fff", color: "#000" } }}
                >
                  <option>Data Analysis</option>
                  <option>React</option>
                  <option>Leadership</option>
                </Select>
                <Button colorScheme="pink" onClick={runMatching}>
                  Find Matches
                </Button>
              </Stack>

              {matched.length === 0 ? (
                <Text textAlign="center" opacity={0.85}>
                  No matches yet — select a gap and click Find Matches.
                </Text>
              ) : (
                <VStack align="stretch" spacing={3}>
                  {matched.map((m) => (
                    <Flex
                      key={m.id}
                      p={3}
                      bg={chosenMentor?.id === m.id ? "pink.600" : "whiteAlpha.200"}
                      borderRadius="lg"
                      justify="space-between"
                      align="center"
                    >
                      <Box>
                        <Text fontWeight="semibold">{m.name}</Text>
                        <Text fontSize="sm">
                          {m.skill} • {m.exp} yrs • ★{m.rating}
                        </Text>
                      </Box>
                      <Button
                        size="sm"
                        onClick={() => pickMentor(m)}
                        colorScheme="pink"
                        variant={chosenMentor?.id === m.id ? "solid" : "outline"}
                      >
                        {chosenMentor?.id === m.id ? "Selected" : "Choose"}
                      </Button>
                    </Flex>
                  ))}
                </VStack>
              )}
            </Card>

            {/* -------------------- Booking -------------------- */}
            <Card>
              <HStack mb={4}>
                <Icon as={FiCalendar} />
                <Text fontSize="lg" fontWeight="bold">
                  Booking
                </Text>
                <Tag ml="auto" bg="blue.400" color="white" borderRadius="full">
                  <TagLabel>Calendar</TagLabel>
                </Tag>
              </HStack>

              <Text mb={5} fontSize="sm" opacity={0.9}>
                Pick a date & time, then confirm your mentorship session.
              </Text>

              <Grid templateColumns={`repeat(${days.length}, 1fr)`} gap={2} mb={3}>
                {days.map((d) => (
                  <Box key={d} textAlign="center">
                    <Text fontSize="xs">{fmtWeekday(d)}</Text>
                    <Text fontWeight="semibold">{fmtDate(d)}</Text>
                  </Box>
                ))}
              </Grid>

              <VStack maxH="300px" overflowY="auto">
                {["09:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
                  <Button
                    key={t}
                    w="full"
                    variant={selectedSlot === t ? "solid" : "outline"}
                    colorScheme="pink"
                    onClick={() => setSelectedSlot(t)}
                  >
                    {t}
                  </Button>
                ))}
              </VStack>

              <Button mt={5} colorScheme="pink" w="full" onClick={confirmBooking}>
                Confirm Booking
              </Button>
            </Card>

            {/* -------------------- Session Notes + Meetings -------------------- */}
            <Card>
              <HStack mb={4}>
                <Icon as={FiEdit3} />
                <Text fontSize="lg" fontWeight="bold">
                  Session Notes
                </Text>
                <Tag ml="auto" bg="purple.400" color="white" borderRadius="full">
                  <TagLabel>AI Note Taker</TagLabel>
                </Tag>
              </HStack>

              <Text mb={5} fontSize="sm" opacity={0.9}>
                Use during your meeting to record notes and auto-generate summaries.
              </Text>

              {/* 50/50 buttons */}
              <Grid templateColumns="1fr 1fr" gap={3} mb={5}>
                <Button colorScheme={isRec ? "red" : "pink"} onClick={toggleRecording}>
                  {isRec ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button variant="outline" colorScheme="pink" onClick={generateSummary}>
                  Generate AI Notes
                </Button>
              </Grid>

              {/* Notes areas */}
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Textarea
                  placeholder="Type or paste notes captured during the session..."
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  minH="210px"
                  bg="whiteAlpha.200"
                />
                <Box
                  bg="whiteAlpha.200"
                  borderRadius="lg"
                  p={3}
                  minH="210px"
                  whiteSpace="pre-wrap"
                >
                  {summary || <Text opacity={0.7}>Your AI summary will appear here.</Text>}
                </Box>
              </Grid>

              <Divider my={5} />

              {/* Cancel / Save (50/50) — disabled until a meeting is selected */}
              <Grid templateColumns="1fr 1fr" gap={3} mb={3}>
                <Button
                  leftIcon={<FiX />}
                  variant="outline"
                  colorScheme="red"
                  isDisabled={!selectedMeeting}
                >
                  Cancel Meeting
                </Button>
                <Button colorScheme="pink" isDisabled={!selectedMeeting}>
                  Save Notes
                </Button>
              </Grid>

              {/* Scheduled dropdown / Join (50/50) */}
              <Grid templateColumns="1fr 1fr" gap={3} mb={2} alignItems="start">
                <Menu isOpen={disclosure.isOpen} onClose={disclosure.onClose} placement="bottom-start" isLazy>
                  <MenuButton
                    as={Button}
                    leftIcon={<FiList />}
                    rightIcon={<FiChevronDown />}
                    variant="outline"
                    colorScheme="blue"
                    w="full"
                    fontSize="sm"
                    onClick={disclosure.onOpen}
                  >
                    {selectedMeeting ? `${selectedMeeting.title}` : "Scheduled Meetings"}
                  </MenuButton>
                  <Portal>
                    <MenuList zIndex={20} minW="300px">
                      {meetings.map((m) => {
                        const isSel = selectedMeeting?.id === m.id;
                        return (
                          <MenuItem key={m.id} onClick={() => onChooseMeeting(m)}>
                            <Box>
                              <Text fontWeight="semibold">
                                {m.title} {isSel && <Icon as={FiCheck} ml={1} />}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {m.when} • {m.platform}
                              </Text>
                            </Box>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Portal>
                </Menu>

                <Button
                  leftIcon={<FiVideo />}
                  colorScheme="green"
                  w="full"
                  isDisabled={!selectedMeeting}
                >
                  Join Meeting
                </Button>
              </Grid>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

