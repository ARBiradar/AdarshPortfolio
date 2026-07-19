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
    role: "Full Stack Java & Generative/Agentic AI Research Associate",
    company: "Naresh IT (Advanced Tech Labs)",
    location: "Bengaluru, India (Hybrid)",
    duration: "Jan 2025 - Present",
    status: "Current",
    description: [
      "Designing and implementing scalable Java Full Stack application architectures using Spring Boot, React, and Next.js.",
      "Researching and developing Agentic AI workflows, building robust prompt engineering abstractions, and integrating AI-driven agents to automate software development lifecycles.",
      "Constructing resilient microservices architectures and studying advanced data structures and algorithms (DSA) to write highly optimized, low-latency code."
    ],
    technologies: ["Java", "Spring Boot", "React", "Next.js", "Microservices", "Agentic AI", "Generative AI", "DSA", "Prompt Engineering"]
  },
  {
    id: "exp2",
    role: "Java Developer Intern",
    company: "Code Alpha",
    location: "Remote",
    duration: "Dec 2024 - Jan 2025",
    status: "Completed",
    description: [
      "Developed an automated web-based Complaint Management System from scratch, reducing manual administrative workflows by approximately 70%.",
      "Implemented secure, role-based JWT authentication and access controls for admins, agents, and users, ensuring standard security patterns.",
      "Optimized MySQL database query schemas and transactional logic, leading to an approximate 45% reduction in response and resolution latency.",
      "Automated complaints assignment and notification workflows to streamline task routing."
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Spring Security", "JWT", "REST APIs", "HTML", "CSS"]
  }
];
