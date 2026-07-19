export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rank: number; // Contest ranking order
  status: "Accepted" | "Solved" | "Running" | "Attempted";
  solveTime: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stats: {
    memory: string;
    runtime: string;
    language: string;
  };
  walkthrough: {
    problem: string;
    architecture: string;
    stack: string[];
    challenges: string;
    lessons: string;
    codeSnippet: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "pulsearena",
    title: "PulseArena",
    role: "Full Stack Developer",
    description: "A high-performance fan engagement platform built for real-time live events, managing high concurrency poll submissions and instant messaging syncing.",
    difficulty: "Hard",
    rank: 1,
    status: "Accepted",
    solveTime: "14 days",
    tags: ["React", "Next.js", "Spring Boot", "WebSockets", "Redis", "MySQL"],
    githubUrl: "https://github.com/ARBiradar/PulseArena",
    liveUrl: "https://pulse-arena-phi.vercel.app/",
    stats: {
      memory: "128 MB",
      runtime: "15 ms",
      language: "TypeScript"
    },
    walkthrough: {
      problem: "Traditional HTTP polling creates significant server load and lag during live events. When thousands of fans vote or post reactions simultaneously, backend relational databases experience severe write locks and latency spikes.",
      architecture: "Next.js client establishing persistent duplex WebSocket connections to a Spring Boot microservice. User poll responses are routed through a reactive event loop, buffered in a Redis cache, and flushed to a MySQL database in optimized batches.",
      stack: ["React 19", "Next.js 15", "Spring Boot", "Spring WebFlux", "Redis Cache", "WebSocket API", "MySQL"],
      challenges: "Synchronizing real-time stream stats while preventing vote manipulation (double voting) and scaling the WebSocket connections under network jitter.",
      lessons: "Implemented token-based rate limiting on connection hands-up, and utilized Redis HyperLogLog structures for unique vote counts to achieve O(1) time complexity checks.",
      codeSnippet: `// WebSocket Real-time Poll Handler
@Component
public class PollWebSocketHandler extends TextWebSocketHandler {
    private final RedisTemplate<String, String> redisTemplate;
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        PollVote vote = parseJson(message.getPayload());
        String key = "poll:" + vote.getPollId() + ":votes";
        // Record vote in Redis set to ensure uniqueness
        Boolean isNew = redisTemplate.opsForSet().add(key, vote.getUserId());
        if (Boolean.TRUE.equals(isNew)) {
            redisTemplate.opsForHash().increment("poll:" + vote.getPollId(), vote.getOption(), 1);
            broadcastUpdate(vote.getPollId());
        }
    }
}`
    }
  },
  {
    id: "securevote",
    title: "SecureVote",
    role: "Smart Contract & Backend Engineer",
    description: "A decentralized, tamper-proof blockchain voting platform ensuring voter anonymity and auditability of election results.",
    difficulty: "Hard",
    rank: 2,
    status: "Accepted",
    solveTime: "10 days",
    tags: ["Solidity", "React", "Hardhat", "Ethers.js", "Tailwind CSS"],
    stats: {
      memory: "64 MB",
      runtime: "42 ms",
      language: "Solidity"
    },
    walkthrough: {
      problem: "Centralized election servers are susceptible to database breaches, administrator corruption, and lack verifiable audits, leading to low voter trust.",
      architecture: "React frontend using Ethers.js to communicate directly with EVM smart contracts. The contract validates voter status on-chain, records anonymous votes, and exposes cryptographic proof of final tallies.",
      stack: ["Solidity 0.8.20", "React", "Ethers.js", "Hardhat", "Tailwind CSS", "Metamask Integration"],
      challenges: "Mitigating high gas costs associated with writing voter history on-chain, while maintaining strict anonymity to prevent coercion.",
      lessons: "Designed gas-optimized mapping schemas and utilized off-chain Merkle tree roots for voter verification, leaving only the hash state changes on-chain.",
      codeSnippet: `// Solidity Voting Core Logic
contract SecureVote {
    struct Proposal {
        string name;
        uint256 voteCount;
    }
    mapping(address => bool) public hasVoted;
    Proposal[] public proposals;

    function castVote(uint256 proposalId) external {
        require(!hasVoted[msg.sender], "Voter has already cast a ballot.");
        require(proposalId < proposals.length, "Target proposal does not exist.");
        
        hasVoted[msg.sender] = true;
        proposals[proposalId].voteCount++;
        emit VoteCast(msg.sender, proposalId);
    }
}`
    }
  },
  {
    id: "codepush",
    title: "CodePush Extension",
    role: "Extension Developer",
    description: "A Chrome developer utility that automatically captures, formats, and pushes code updates from online sandboxes directly to a GitHub repository.",
    difficulty: "Medium",
    rank: 3,
    status: "Accepted",
    solveTime: "5 days",
    tags: ["JavaScript", "Chrome Extensions", "GitHub API", "OAuth2"],
    githubUrl: "https://github.com/ARBiradar/codepush-extension",
    stats: {
      memory: "32 MB",
      runtime: "8 ms",
      language: "JavaScript"
    },
    walkthrough: {
      problem: "When learning or solving coding challenges in browser environments, developers must manually copy, create files, and commit changes via terminal, which breaks focus.",
      architecture: "Background service worker listening to tab actions. It dynamically extracts target code from sandbox elements, retrieves OAuth2 tokens, and commits the code directly to a GitHub repo using the GitHub REST API.",
      stack: ["Chrome Extension Manifest V3", "Vanilla JS", "GitHub REST API", "Chrome Storage API"],
      challenges: "Securely storing GitHub personal access tokens in a browser environment and handling potential merge conflicts automatically without disrupting the interface.",
      lessons: "Leveraged Chrome's secure storage API for credential encryption and implemented an optimistic file-overwrite strategy for consecutive changes.",
      codeSnippet: `// Chrome Extension Background Commit Handler
async function pushToGitHub(token, repo, path, content, sha = null) {
    const url = \`https://api.github.com/repos/\${repo}/contents/\${path}\`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": \`token \${token}\`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Auto-push: Solution update",
            content: btoa(unescape(encodeURIComponent(content))),
            sha: sha
        })
    });
    return response.json();
}`
    }
  },
  {
    id: "mytrip",
    title: "MyTrip",
    role: "Java Backend Developer",
    description: "A high-performance MakeMyTrip clone featuring aggregated flight/hotel search engines and concurrent booking coordinators.",
    difficulty: "Medium",
    rank: 4,
    status: "Solved",
    solveTime: "7 days",
    tags: ["Spring Boot", "JPA", "MySQL", "React", "Tailwind CSS"],
    stats: {
      memory: "160 MB",
      runtime: "12 ms",
      language: "Java"
    },
    walkthrough: {
      problem: "Querying multiple external airline and hotel APIs sequentially leads to unacceptable user page loading latencies. The service needs to aggregate data and handle bookings concurrently.",
      architecture: "Spring Boot aggregator querying hotel and flight supplier mock APIs concurrently in separate worker threads using Java's CompletableFuture framework, assembling a unified payload.",
      stack: ["Java 17", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "React", "Tailwind CSS"],
      challenges: "Managing thread pool starvation under high user traffic and gracefully handling API timeouts from external suppliers.",
      lessons: "Configured custom thread executors tailored to I/O-bound tasks and integrated the Resilience4j Circuit Breaker pattern to supply fallback values.",
      codeSnippet: `// Concurrent API Aggregator Service
public CompletableFuture<List<Flight>> fetchFlightsAsync(String origin, String destination) {
    return CompletableFuture.supplyAsync(() -> {
        // Query external flight supplier endpoint
        return restTemplate.getForObject(
            "/api/supplier/flights?from=" + origin + "&to=" + destination, 
            Flight[].class
        );
    }, ioThreadPool).thenApply(Arrays::asList);
}`
    }
  },
  {
    id: "dsa",
    title: "DSA-for-MAANG",
    role: "Core Contributor",
    description: "A curated collection of highly optimized Java solutions to algorithmic puzzles, with regression unit test suites.",
    difficulty: "Medium",
    rank: 5,
    status: "Solved",
    solveTime: "30 days",
    tags: ["Java", "DSA", "JUnit 5", "Algorithms"],
    githubUrl: "https://github.com/ARBiradar/DSA-for-MAANG",
    stats: {
      memory: "48 MB",
      runtime: "2 ms",
      language: "Java"
    },
    walkthrough: {
      problem: "Writing algorithmic solutions that not only solve logical problems but also satisfy strict time and memory complexity thresholds for tech giants like Microsoft or Google.",
      architecture: "Structured library of competitive programming solutions in Java, ranging from dynamic programming matrices to graph traversal systems, validated by JUnit regression engines.",
      stack: ["Java 17", "JUnit 5 Test Runner", "Maven Pipeline"],
      challenges: "Eliminating micro-inefficiencies (such as excessive object allocations) that lead to Garbage Collection overhead in high-throughput coding scenarios.",
      lessons: "Learned array-based representations of trees/graphs and object pooling to guarantee minimum memory overhead, reducing execution times to sub-2ms bounds.",
      codeSnippet: `// Two-Pointer Two-Sum HashMap Implementation
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (numMap.containsKey(complement)) {
            return new int[] { numMap.get(complement), i };
        }
        numMap.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution found");
}`
    }
  },
  {
    id: "swapnil",
    title: "Swapnil Portfolio",
    role: "Freelance Frontend Lead",
    description: "A highly interactive, responsive freelance developer portfolio website showcasing custom layouts, creative interfaces, and fluid animations.",
    difficulty: "Easy",
    rank: 6,
    status: "Solved",
    solveTime: "3 days",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    stats: {
      memory: "96 MB",
      runtime: "6 ms",
      language: "TypeScript"
    },
    walkthrough: {
      problem: "Interactive elements and layout shifting during page loading can create a disjointed UX. Portfolios require flawless design, high speed, and premium responsiveness.",
      architecture: "Static Site Generation (SSG) in Next.js, allowing instant page loads. Layout changes and elements entrance are managed smoothly via Framer Motion.",
      stack: ["Next.js 14", "React 18", "Tailwind CSS", "Framer Motion", "Vercel Deployment"],
      challenges: "Achieving smooth 60fps animations across all desktop and low-end mobile devices without causing main-thread rendering lag.",
      lessons: "Leveraged hardware-accelerated CSS properties and next/image layout optimization to ensure 100/100 Lighthouse performance metrics.",
      codeSnippet: `// Responsive Menu Entry Animation
export const SidebarAnimation = {
    open: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    },
    closed: {
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};`
    }
  }
];
