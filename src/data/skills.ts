export interface Skill {
  id: string;
  name: string;
  category: "Language" | "Framework" | "Cloud & DevOps" | "Database & Cache" | "Testing & Tools";
  expertise: "Expert" | "Advanced" | "Intermediate";
  years: number;
}

export const SKILLS: Skill[] = [
  // Languages
  { id: "java", name: "Java", category: "Language", expertise: "Expert", years: 4 },
  { id: "sql", name: "SQL", category: "Language", expertise: "Expert", years: 3 },
  { id: "typescript", name: "TypeScript", category: "Language", expertise: "Advanced", years: 2 },
  { id: "javascript", name: "JavaScript", category: "Language", expertise: "Advanced", years: 3 },
  { id: "python", name: "Python", category: "Language", expertise: "Intermediate", years: 2 },
  { id: "html", name: "HTML", category: "Language", expertise: "Expert", years: 4 },
  { id: "css", name: "CSS", category: "Language", expertise: "Advanced", years: 3 },

  // Frameworks
  { id: "springboot", name: "Spring Boot", category: "Framework", expertise: "Expert", years: 4 },
  { id: "springframework", name: "Spring Framework", category: "Framework", expertise: "Expert", years: 4 },
  { id: "springmvc", name: "Spring MVC", category: "Framework", expertise: "Expert", years: 4 },
  { id: "hibernate", name: "Hibernate", category: "Framework", expertise: "Expert", years: 4 },
  { id: "react", name: "React", category: "Framework", expertise: "Advanced", years: 3 },
  { id: "nextjs", name: "Next.js", category: "Framework", expertise: "Advanced", years: 2 },
  { id: "tailwindcss", name: "Tailwind CSS", category: "Framework", expertise: "Advanced", years: 2 },

  // Cloud & DevOps
  { id: "aws", name: "AWS", category: "Cloud & DevOps", expertise: "Advanced", years: 3 },
  { id: "vercel", name: "Vercel", category: "Cloud & DevOps", expertise: "Advanced", years: 2 },
  { id: "docker", name: "Docker", category: "Cloud & DevOps", expertise: "Advanced", years: 2 },
  { id: "git", name: "Git", category: "Cloud & DevOps", expertise: "Expert", years: 4 },
  { id: "github", name: "GitHub", category: "Cloud & DevOps", expertise: "Expert", years: 4 },

  // Database & Cache
  { id: "mysql", name: "MySQL", category: "Database & Cache", expertise: "Expert", years: 4 },
  { id: "mongodb", name: "MongoDB", category: "Database & Cache", expertise: "Intermediate", years: 2 },
  { id: "oraclesql", name: "Oracle SQL", category: "Database & Cache", expertise: "Advanced", years: 3 },

  // Testing & Tools
  { id: "restapis", name: "REST APIs", category: "Testing & Tools", expertise: "Expert", years: 4 },
  { id: "jwt", name: "JWT Authentication", category: "Testing & Tools", expertise: "Expert", years: 3 },
  { id: "jdbc", name: "JDBC", category: "Testing & Tools", expertise: "Advanced", years: 3 },
  { id: "prompt", name: "Prompt Engineering", category: "Testing & Tools", expertise: "Advanced", years: 2 },
  { id: "aiassisted", name: "AI-assisted Dev", category: "Testing & Tools", expertise: "Advanced", years: 2 }
];
