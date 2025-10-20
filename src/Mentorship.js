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
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useToast,
  VStack,
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

// helpers
function addDays(baseDate, numDays) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + numDays);
  return d;
}
const toISODate = (d) => d.toISOString().split("T")[0];

export default function Mentorship() {
  const toast = useToast();

  // Match Me
  const [selectedGap, setSelectedGap] = useState("Data Analysis");
  const [matched, setMatched] = useState([]);
  const [chosenMentor, setChosenMentor] = useState(null);

  // Booking
  const today = useMemo(() => new Date(), []);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(toISODate(today));
  const minDate = toISODate(today);
  const maxDate = toISODate(addDays(today, 60)); // next ~2 months

  // Notes
  const [rawNotes, setRawNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isRec, setIsRec] = useState(false);

  // Scheduled meetings dropdown
  const [meetings, setMeetings] = useState([
    {
      id: "m1",
      title: "Mentor: Priya Tan",
      when: "Tue, Oct 22 • 10:00",
      platform: "Meet",
    },
    {
      id: "m2",
      title: "Mentor: Daniel Koh",
      when: "Fri, Oct 25 • 14:00",
      platform: "Teams",
    },
  ]);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const selectedMeeting = meetings.find((m) => m.id === selectedMeetingId) || null;

  const mentors = [
    { id: 1, name: "Aarav Mehta", skill: "Data Analysis", exp: 8, rating: 4.9 },
    { id: 2, name: "Priya Tan", skill: "React", exp: 7, rating: 4.8 },
    { id: 3, name: "Daniel Koh", skill: "Leadership", exp: 10, rating: 4.7 },
  ];

  const runMatching = () => setMatched(mentors.filter((m) => m.skill === selectedGap));

  const pickMentor = (m) => {
    setChosenMentor(m);
    toast({ title: `${m.name} selected`, status: "success" });
  };

  const confirmBooking = () => {
    if (!selectedSlot) {
      toast({ title: "Pick a time slot first", status: "info" });
      return;
    }
    if (!selectedDate) {
      toast({ title: "Pick a date first", status: "info" });
      return;
    }
    const when = new Date(selectedDate);
    const pretty = when.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newItem = {
      id: `new-${Date.now()}`,
      title: chosenMentor ? `Mentor: ${chosenMentor.name}` : "Mentor session",
      when: `${pretty} • ${selectedSlot}`,
      platform: "Meet",
    };

    setMeetings((prev) => [newItem, ...prev]);
    setSelectedMeetingId(newItem.id);

    toast({
      title: "Booking confirmed!",
      description: `Your session is scheduled for ${pretty} at ${selectedSlot}. A confirmation email will be sent to you shortly.`,
      status: "success",
      duration: 5000,
    });
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

  const handleCancel = () => {
    if (!selectedMeeting) return;
    setMeetings((prev) => prev.filter((m) => m.id !== selectedMeeting.id));
    setSelectedMeetingId(null);
    toast({ title: "Meeting canceled", status: "warning" });
  };

  const handleJoin = () => {
    if (!selectedMeeting) return;
    toast({
      title: `Joining ${selectedMeeting.platform}`,
      description: `${selectedMeeting.title} — ${selectedMeeting.when}`,
      status: "success",
    });
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

            {/* -------------------- Booking (pink styled) -------------------- */}
            <Card>
              <HStack mb={4}>
                <Icon as={FiCalendar} />
                <Text fontSize="lg" fontWeight="bold">
                  Booking
                </Text>
                <Tag ml="auto" bg="pink.400" color="white" borderRadius="full">
                  <TagLabel>Calendar</TagLabel>
                </Tag>
              </HStack>

              <Text mb={5} fontSize="sm" opacity={0.9}>
                Pick a <b>date</b> & <b>time</b>, then confirm your mentorship session.
              </Text>

              {/* Date picker — pink styling */}
              <HStack mb={4}>
                <Input
                  type="date"
                  value={selectedDate}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  bg="whiteAlpha.200"
                  borderColor="pink.300"
                  _hover={{ borderColor: "pink.400" }}
                  _focus={{
                    borderColor: "pink.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-pink-400)",
                  }}
                  color="white"
                  sx={{
                    "::-webkit-calendar-picker-indicator": {
                      filter: "invert(1) opacity(0.9)",
                    },
                  }}
                />
                <Text opacity={0.9} fontSize="sm">
                  Up to 60 days ahead
                </Text>
              </HStack>

              {/* Time slots — pink theme */}
              <VStack maxH="300px" overflowY="auto" spacing={3}>
                {["09:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
                  <Button
                    key={t}
                    w="full"
                    variant={selectedSlot === t ? "solid" : "outline"}
                    colorScheme="pink"
                    borderColor="pink.300"
                    _hover={{
                      bg: selectedSlot === t ? "pink.600" : "pink.500",
                      color: "white",
                    }}
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

              {/* 50/50 controls */}
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
                <Box bg="whiteAlpha.200" borderRadius="lg" p={3} minH="210px" whiteSpace="pre-wrap">
                  {summary || <Text opacity={0.7}>Your AI summary will appear here.</Text>}
                </Box>
              </Grid>

              <Divider my={5} />

              {/* Action row — disabled until a meeting is selected */}
              <Grid templateColumns="1fr 1fr" gap={3} mb={3}>
                <Button
                  leftIcon={<FiX />}
                  variant="outline"
                  colorScheme="red"
                  isDisabled={!selectedMeeting}
                  onClick={handleCancel}
                >
                  Cancel Meeting
                </Button>
                <Button colorScheme="pink" isDisabled={!selectedMeeting}>
                  Save Notes
                </Button>
              </Grid>

              {/* Dropdown + Join */}
              <Grid templateColumns="1fr 1fr" gap={3} alignItems="start">
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={<FiList />}
                    rightIcon={<FiChevronDown />}
                    variant="outline"
                    colorScheme="blue"
                    w="full"
                  >
                    {selectedMeeting ? "Change Meeting" : "Scheduled Meetings"}
                  </MenuButton>
                  <MenuList bg="white" color="gray.800">
                    {meetings.length === 0 ? (
                      <MenuItem isDisabled>No scheduled meetings</MenuItem>
                    ) : (
                      meetings.map((m) => (
                        <MenuItem
                          key={m.id}
                          onClick={() => setSelectedMeetingId(m.id)}
                          icon={selectedMeetingId === m.id ? <FiCheck /> : <span />}
                        >
                          <Box>
                            <Text fontWeight="semibold">{m.title}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {m.when} • {m.platform}
                            </Text>
                          </Box>
                        </MenuItem>
                      ))
                    )}
                  </MenuList>
                </Menu>

                <Button
                  leftIcon={<FiVideo />}
                  colorScheme="green"
                  w="full"
                  isDisabled={!selectedMeeting}
                  onClick={handleJoin}
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
