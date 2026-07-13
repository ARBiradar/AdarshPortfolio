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
    id: "cloudstream",
    title: "CloudStream Gateway",
    role: "Lead Backend Developer",
    description: "A reactive, high-throughput video streaming backend engine capable of handling chunked video transfer, microservice routing, and user session management.",
    difficulty: "Hard",
    rank: 1,
    status: "Accepted",
    solveTime: "12 days",
    tags: ["Spring Boot", "WebFlux", "AWS ECS", "Redis", "Kafka"],
    githubUrl: "https://github.com/ARBiradar",
    stats: {
      memory: "128 MB",
      runtime: "12 ms",
      language: "Java"
    },
    walkthrough: {
      problem: "Traditional thread-per-request architectures failed under high-concurrency streaming loads, resulting in out-of-memory errors and thread starvation when delivering large video files to thousands of concurrent users.",
      architecture: "Reactive gateway router built on Spring Cloud Gateway. Video files are sliced into 1MB chunks and stored on AWS S3, cached in Redis clusters, and pushed asynchronously via Spring WebFlux streams. Apache Kafka tracks user viewing events in real-time.",
      stack: ["Java 21", "Spring Boot 3.x", "Spring WebFlux", "Reactive Redis", "Apache Kafka", "AWS S3 / CloudFront", "Docker"],
      challenges: "Handling backpressure in reactive streams when client download speed was slower than chunk retrieval speed, which could overwhelm server memory buffers.",
      lessons: "Learned how to leverage project Reactor's limitRate operator and reactive caching strategies to throttle data flow based on client consumption rates, preventing buffer overflow and achieving sub-50ms video start latency.",
      codeSnippet: `@GetMapping(value = "/stream/{videoName}", produces = "video/mp4")
public Mono<ResponseEntity<ResourceRegion>> streamVideo(
        @RequestHeader(value = "Range", required = false) String rangeHeader,
        @PathVariable String videoName) {
    return videoService.getVideoResource(videoName)
            .map(resource -> {
                ResourceRegion region = resourceRegion(resource, rangeHeader);
                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                        .contentType(MediaType.parseMediaType("video/mp4"))
                        .body(region);
            });
}`
    }
  },
  {
    id: "devdock",
    title: "DevDock Sandbox Runner",
    role: "Backend Architect",
    description: "A secure, containerized sandbox runner that dynamically executes user-submitted code in isolated environments, running unit tests and reporting output, identical to competitive-programming platforms.",
    difficulty: "Hard",
    rank: 2,
    status: "Accepted",
    solveTime: "18 days",
    tags: ["Spring Boot", "Docker SDK", "RabbitMQ", "AWS S3"],
    githubUrl: "https://github.com/ARBiradar",
    stats: {
      memory: "256 MB",
      runtime: "48 ms",
      language: "Java"
    },
    walkthrough: {
      problem: "Executing untrusted user submissions (like arbitrary Java/Python code) directly on the host server poses extreme security threats (such as infinite loops, malicious file reading, or fork bombs).",
      architecture: "Submissions are queued in RabbitMQ. A Spring Boot worker pool pulls submissions, writes code files, mounts them into pre-configured isolated Docker containers via the Docker Java API, and sets hard CPU/Memory limits.",
      stack: ["Java 17", "Spring Boot", "Docker Java SDK", "RabbitMQ", "Bash Scripts", "AWS S3"],
      challenges: "Preventing infinite loop resource starvation (hard limits on runtime) and safely cleaning up container processes without leaking resources on the host machine.",
      lessons: "Configured custom Docker resource constraints (cgroups) limiting memory to 64MB, CPU share to 0.5 cores, and used a system daemon watchdog that issues SIGKILL commands after a 5-second timeout.",
      codeSnippet: `public ContainerResponse runSubmission(Submission submission) {
    CreateContainerResponse container = dockerClient.createContainerCmd("openjdk:17-slim")
        .withHostConfig(HostConfig.newHostConfig()
            .withMemory(64 * 1024 * 1024L) // 64MB Limit
            .withCpuPercent(50L))          // 50% CPU limit
        .withCmd("java", "-cp", "/workspace", "Solution")
        .exec();
    
    dockerClient.startContainerCmd(container.getId()).exec();
    // Wait for execution with 5s timeout...
}`
    }
  },
  {
    id: "coreengine",
    title: "CoreEngine Microservices",
    role: "System Engineer",
    description: "Distributed, event-driven enterprise e-commerce API core handling transaction management, inventory state machine, search index syncing, and token-based gateway security.",
    difficulty: "Medium",
    rank: 3,
    status: "Accepted",
    solveTime: "7 days",
    tags: ["Spring Cloud", "PostgreSQL", "Elasticsearch", "Kubernetes"],
    githubUrl: "https://github.com/ARBiradar",
    stats: {
      memory: "192 MB",
      runtime: "8 ms",
      language: "Java"
    },
    walkthrough: {
      problem: "Ensuring database consistency and search index updates across multiple distributed microservices during high concurrent checkout sales without degrading user response times.",
      architecture: "Spring Boot services integrated with Spring Cloud Netflix Eureka. Database transactions are isolated per microservice. Database changes trigger Outbox pattern messages that are published to Kafka to asynchronously update Elasticsearch indices.",
      stack: ["Java 17", "Spring Boot", "Spring Cloud Gateway", "PostgreSQL", "Elasticsearch", "Apache Kafka", "Kubernetes"],
      challenges: "Managing distributed transactions and handling transactional rollback across services (e.g., payment fails after inventory is reserved).",
      lessons: "Implemented the Saga Pattern (orchestration-based) to manage multi-service transactions. Created compensating actions (e.g., releasing inventory) triggered by payment cancellation events.",
      codeSnippet: `@Transactional
public Order createOrder(OrderRequest request) {
    Order order = Order.builder()
        .userId(request.getUserId())
        .status(OrderStatus.PENDING)
        .build();
    orderRepository.save(order);
    
    // Write outbox event to ensure transaction guarantees
    OutboxEvent event = new OutboxEvent("ORDER_CREATED", order.getId(), order);
    outboxRepository.save(event);
    return order;
}`
    }
  }
];
