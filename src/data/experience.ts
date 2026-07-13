export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
  status: "Success" | "Completed" | "Current";
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Senior Backend Developer",
    company: "HexaCorp Solutions",
    location: "Pune, India (Hybrid)",
    duration: "Jan 2024 - Present",
    status: "Current",
    description: [
      "Led the design and migration of monolithic user services to an event-driven microservices architecture using Spring Boot, Spring Cloud, and Kafka, reducing latency by 35%.",
      "Designed and optimized core banking transaction schemas in PostgreSQL, utilizing indexing and partition tables to scale up to 10M transactions daily.",
      "Configured CI/CD pipelines in GitHub Actions and deployed containerized applications to AWS ECS clusters, reducing deployment time from 1 hour to 8 minutes."
    ],
    technologies: ["Spring Boot", "Spring Cloud", "PostgreSQL", "Kafka", "Docker", "AWS", "GitHub Actions"]
  },
  {
    id: "exp2",
    role: "Java Full Stack Developer",
    company: "NextGen Software",
    location: "Bangalore, India",
    duration: "Jul 2021 - Dec 2023",
    status: "Completed",
    description: [
      "Developed high-throughput API endpoints for an e-commerce platform using Spring Boot, Spring Security, Hibernate, and React.",
      "Integrated Redis caching layer for product listings, resulting in a 60% reduction in database read load and improving UI response time.",
      "Authored comprehensive unit and integration test suites using JUnit 5, Mockito, and AssertJ, achieving 88% overall code coverage."
    ],
    technologies: ["Java", "Spring Boot", "Hibernate", "Redis", "MySQL", "React", "JUnit", "Mockito"]
  }
];
