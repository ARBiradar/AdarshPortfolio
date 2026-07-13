export interface Skill {
  id: string;
  name: string;
  category: "Language" | "Framework" | "Cloud & DevOps" | "Database & Cache" | "Testing & Tools";
  expertise: "Expert" | "Advanced" | "Intermediate";
  years: number;
}

export const SKILLS: Skill[] = [
  // Languages
  { id: "java", name: "Java", category: "Language", expertise: "Expert", years: 5 },
  { id: "sql", name: "SQL", category: "Language", expertise: "Expert", years: 4 },
  { id: "typescript", name: "TypeScript", category: "Language", expertise: "Advanced", years: 2 },
  { id: "javascript", name: "JavaScript", category: "Language", expertise: "Advanced", years: 3 },
  { id: "python", name: "Python", category: "Language", expertise: "Intermediate", years: 2 },

  // Frameworks
  { id: "springboot", name: "Spring Boot", category: "Framework", expertise: "Expert", years: 4 },
  { id: "springcloud", name: "Spring Cloud", category: "Framework", expertise: "Advanced", years: 3 },
  { id: "springmvc", name: "Spring MVC / Security", category: "Framework", expertise: "Expert", years: 4 },
  { id: "hibernate", name: "Hibernate / JPA", category: "Framework", expertise: "Expert", years: 4 },
  { id: "nextjs", name: "Next.js", category: "Framework", expertise: "Advanced", years: 2 },
  { id: "react", name: "React", category: "Framework", expertise: "Advanced", years: 3 },

  // Cloud & DevOps
  { id: "aws", name: "AWS (S3, EC2, ECS, Lambda)", category: "Cloud & DevOps", expertise: "Advanced", years: 3 },
  { id: "docker", name: "Docker", category: "Cloud & DevOps", expertise: "Expert", years: 3 },
  { id: "kubernetes", name: "Kubernetes", category: "Cloud & DevOps", expertise: "Intermediate", years: 2 },
  { id: "git", name: "Git & GitHub Actions", category: "Cloud & DevOps", expertise: "Expert", years: 5 },
  { id: "maven", name: "Maven / Gradle", category: "Cloud & DevOps", expertise: "Expert", years: 4 },

  // Database & Cache
  { id: "postgresql", name: "PostgreSQL", category: "Database & Cache", expertise: "Expert", years: 4 },
  { id: "mysql", name: "MySQL", category: "Database & Cache", expertise: "Expert", years: 4 },
  { id: "redis", name: "Redis", category: "Database & Cache", expertise: "Advanced", years: 3 },
  { id: "mongodb", name: "MongoDB", category: "Database & Cache", expertise: "Intermediate", years: 2 },
  { id: "elasticsearch", name: "Elasticsearch", category: "Database & Cache", expertise: "Intermediate", years: 2 },

  // Testing & Tools
  { id: "junit", name: "JUnit / Mockito", category: "Testing & Tools", expertise: "Expert", years: 4 },
  { id: "kafka", name: "Apache Kafka", category: "Testing & Tools", expertise: "Advanced", years: 2 },
  { id: "rabbitmq", name: "RabbitMQ", category: "Testing & Tools", expertise: "Advanced", years: 2 },
  { id: "postman", name: "Postman / Swagger", category: "Testing & Tools", expertise: "Expert", years: 5 }
];
