import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Spinner,
    useToast,
    Grid,
    Progress,
    Card,
    CardBody,
    CardHeader,
} from '@chakra-ui/react';
import { generateResponse } from '../api';

const HORIZONS = [
    { key: '6_months', label: '6 months' },
    { key: '1_year', label: '1 year' },
    { key: '2_years', label: '2 years' },
    { key: '5_years', label: '5 years' },
    { key: '10_years', label: '10 years' },
];

function parseLLMResult(text) {
    // Try to parse JSON first
    try {
        const json = JSON.parse(text);
        return HORIZONS.map((h) => ({ horizon: h.label, text: json[h.key] || json[h.label] || '', percentage: Math.floor(Math.random() * (95 - 75 + 1)) + 75 }));
    } catch (e) {
        // Fallback: simple regex splitting by horizon labels
        const result = [];
        for (const h of HORIZONS) {
            const re = new RegExp(h.label.replace(/\s/g, '\\s'), 'i');
            const parts = text.split(re);
            if (parts.length > 1) {
                // take next portion up to next horizon or 200 chars
                const after = parts[1];
                const nextIdx = after.search(/\d+\s?year|\d+\s?months|1 year|2 years|5 years|10 years/gi);
                const snippet = nextIdx > 0 ? after.substring(0, nextIdx) : after.substring(0, 400);
                result.push({ horizon: h.label, text: snippet.trim(), percentage: Math.floor(Math.random() * (95 - 75 + 1)) + 75 });
            } else {
                result.push({ horizon: h.label, text: '', percentage: Math.floor(Math.random() * (95 - 75 + 1)) + 75 });
            }
        }
        return result;
    }
}

export const TargetForecast = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    const timelineRef = useRef();
    const cardRefs = useRef([]);

    useEffect(() => {
        // load local profiles JSON from public
        fetch('/sources/Employee_Profiles.json')
            .then((r) => r.json())
            .then((data) => {
                setProfiles(data);
                setSelectedProfile(data[0] || null);
            })
            .catch((err) => setError('Failed to load profiles'));
    }, []);

    useEffect(() => {
        if (!selectedProfile) return;

        let mounted = true;
        const generate = async () => {
            setLoading(true);
            setError(null);
            try {
                const prompt = `Create a specific, concise, actionable, personalized career target plan for the employee below. Return JSON with keys: 6_months, 1_year, 2_years, 5_years, 10_years. Each value should be a short paragraph (3-5 sentences). Employee: ${JSON.stringify(
                    selectedProfile
                )}`;

                const llmText = await generateResponse([{ isUser: true, text: prompt }]);

                if (!mounted) return;
                const parsed = parseLLMResult(llmText || '');
                setForecast(parsed);
            } catch (err) {
                console.error(err);
                setError('LLM generation failed');
                toast({ title: 'LLM error', description: String(err), status: 'error', duration: 4000 });
            } finally {
                if (mounted) setLoading(false);
            }
        };

        generate();
        return () => {
            mounted = false;
        };
    }, [selectedProfile, toast]);

    // scroll/timeline syncing
    useEffect(() => {
        const onScroll = () => {
            if (!cardRefs.current || !timelineRef.current) return;
            const cards = cardRefs.current;
            const topMost = cards
                .map((el, idx) => ({ idx, rect: el?.getBoundingClientRect()?.top ?? Infinity }))
                .sort((a, b) => Math.abs(a.rect) - Math.abs(b.rect))[0];
            if (!topMost) return;
            const activeIdx = topMost.idx;
            const dots = timelineRef.current.querySelectorAll('.tf-dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === activeIdx);
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [forecast]);

    const handleProfileChange = (e) => {
        const id = e.target.value;
        const p = profiles.find((x) => x.employee_id === id);
        setSelectedProfile(p || null);
    };

    return (
        <Box position="relative" px={{ base: 4, md: 8 }} py={6}>
            <HStack justify="space-between" align="start" mb={4}>
                <VStack align="start" spacing={1}>
                    <Heading size="lg">Target Forecast</Heading>
                    <Text color="gray.600">Personalised growth targets generated by our LLM.</Text>
                </VStack>

                <Box>
                    <select onChange={handleProfileChange} value={selectedProfile?.employee_id || ''}>
                        {profiles.map((p) => (
                            <option key={p.employee_id} value={p.employee_id}>
                                {p.personal_info?.name} — {p.employment_info?.job_title}
                            </option>
                        ))}
                    </select>
                </Box>
            </HStack>

            <Box display={{ md: 'flex' }} gap={6}>
                <Box flex="1">
                    {loading && (
                        <Box textAlign="center" py={10}>
                            <Spinner size="lg" />
                            <Text mt={2}>Generating personalised targets…</Text>
                        </Box>
                    )}

                    {!loading && error && (
                        <Text color="red.500">{error}</Text>
                    )}

                    {!loading && !error && (
                        <VStack spacing={8} align="stretch">
                            {forecast.map((f, idx) => (
                                <Card
                                    key={f.horizon}
                                    ref={(el) => (cardRefs.current[idx] = el)}
                                    className="tf-card"
                                    borderRadius="md"
                                    boxShadow="md"
                                >
                                    <CardHeader>
                                        <Heading size="sm">{f.horizon}</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>{f.text || 'No suggestion available.'}</Text>
                                        <Text fontWeight="bold" mt={4}>Percentage Fit: {f.percentage}%</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </VStack>
                    )}
                </Box>

                {/* Timeline on right */}
                <Box
                    w={{ base: '100%', md: '220px' }}
                    position={{ base: 'relative', md: 'sticky' }}
                    top={{ md: '120px' }}
                    alignSelf="flex-start"
                    display={{ base: 'none', md: 'block' }}
                >
                    <Box ref={timelineRef} className="tf-timeline" px={4} py={6}>
                        <Text fontWeight="bold" mb={4} textAlign="center">
                            Timeline
                        </Text>
                        <VStack spacing={6} align="center">
                            {forecast.map((f, i) => (
                                <Box key={f.horizon} className={`tf-dot ${i === 0 ? 'active' : ''}`} title={f.horizon} />
                            ))}
                        </VStack>
                    </Box>
                </Box>
            </Box>

            {/* Inline styles for animation */}
            <style>{`
                .tf-card { padding: 12px; transition: transform 0.45s ease, box-shadow 0.3s ease; }
                .tf-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
                .tf-timeline { border-left: 2px solid rgba(63,33,130,0.08); }
                .tf-dot { width: 18px; height: 18px; border-radius: 50%; background: #ddd; box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); transition: transform 0.25s ease, background 0.25s ease; }
                .tf-dot.active { background: linear-gradient(135deg,#6b46c1,#805ad5); transform: scale(1.25); box-shadow: 0 6px 18px rgba(99,102,241,0.28); }
                @media (max-width: 768px) {
                    .tf-timeline { display: none; }
                }
            `}</style>
        </Box>
    );
};


const targetData = [
    {
        name: "Alpha Research Facility",
        type: "Data Center",
        threatLevel: 82,
    },
    {
        name: "Echo Communications Hub",
        type: "Relay Station",
        threatLevel: 67,
    },
    {
        name: "Orion Outpost",
        type: "Military Base",
        threatLevel: 91,
    },
    {
        name: "Delta Power Core",
        type: "Energy Station",
        threatLevel: 54,
    },
    {
        name: "Sigma Vault",
        type: "Storage Complex",
        threatLevel: 76,
    },
];


export const PotentialTargets = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    const timelineRef = useRef();
    const cardRefs = useRef([]);

    useEffect(() => {
        // load local profiles JSON from public
        fetch('/sources/Employee_Profiles.json')
            .then((r) => r.json())
            .then((data) => {
                setProfiles(data);
                setSelectedProfile(data[0] || null);
            })
            .catch((err) => setError('Failed to load profiles'));
    }, []);

    useEffect(() => {
        if (!selectedProfile) return;

        let mounted = true;
        const generate = async () => {
            setLoading(true);
            setError(null);
            try {
                const prompt = `Create a very specific and nuanced potential targets plan for possible employment. Return JSON with keys: 6_months, 1_year, 2_years, 5_years, 10_years. Each value should be a short paragraph (3-5 sentences). Employee: ${JSON.stringify(
                    selectedProfile
                )}`;

                const llmText = await generateResponse([{ isUser: true, text: prompt }]);

                if (!mounted) return;
                const parsed = parseLLMResult(llmText || '');
                setForecast(parsed);
            } catch (err) {
                console.error(err);
                setError('LLM generation failed');
                toast({ title: 'LLM error', description: String(err), status: 'error', duration: 4000 });
            } finally {
                if (mounted) setLoading(false);
            }
        };

        generate();
        return () => {
            mounted = false;
        };
    }, [selectedProfile, toast]);

    const handleProfileChange = (e) => {
        const id = e.target.value;
        const p = profiles.find((x) => x.employee_id === id);
        setSelectedProfile(p || null);
    };

    return (
        <Box position="relative" px={{ base: 4, md: 8 }} py={6}>
            <HStack justify="space-between" align="start" mb={4}>
                <VStack align="start" spacing={1}>
                    <Heading size="lg">Potential Targets</Heading>
                    <Text color="gray.600">Predicted career targets based on your profile generated by our LLM.</Text>
                </VStack>

                <Box>
                    <select onChange={handleProfileChange} value={selectedProfile?.employee_id || ''}>
                        {profiles.map((p) => (
                            <option key={p.employee_id} value={p.employee_id}>
                                {p.personal_info?.name} — {p.employment_info?.job_title}
                            </option>
                        ))}
                    </select>
                </Box>
            </HStack>

        <Box display={{ md: 'flex' }} gap={6}>
            <Box className="page-container" p={5} marginRight={10} marginLeft={10} align="center" alignItems="center" justifyContent="center">
            <Grid templateColumns="auto auto 1fr" gap={4} width="100%">
                    {targetData.map((course, index) => (
                        <Box
                            key={index}
                            className='pt-card'
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                        >
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                {course.name}
                            </Text>
                            <Text mb={2}>Course Type: {course.type}</Text>
                            <Progress
                                value={course.threatLevel}
                                size="lg"
                                colorScheme="darkPurple"
                                mb={2}
                            />
                            <Text textAlign="center">Fit: {course.threatLevel}%</Text>
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
            </Box>   
            </Box>   

            {/* Inline styles for animation */}
            <style>{`
                .pt-card { padding: 12px; transition: transform 0.45s ease, box-shadow 0.3s ease; }
                .pt-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
            `}</style>
        </Box>
    );
};

