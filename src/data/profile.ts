export interface Profile {
  name: string;
  codename: string;
  tagline: string;
  heroLine: string;
  bio: string;
  email: string;
  location: string;
  stats: {
    problemsSolved: number;
    acceptanceRate: string;
    globalRank: string;
    streakDays: number;
    totalCommits: number;
    totalStars: number;
  };
}

export const PROFILE: Profile = {
  name: "Adarsh Biradar",
  codename: "Project Helios",
  tagline: "Java Full Stack Developer specializing in Spring Boot, AWS, and secure backend systems.",
  heroLine: "Java Full Stack Developer specializing in Spring Boot, AWS, and secure backend systems.",
  bio: "I am an MCA graduate (8.37 GPA) and Java Full Stack Developer with hands-on experience building secure, scalable web applications. With a strong foundation in Java, Spring Boot, SQL, and AWS, I specialize in implementing role-based authentication, automating complex backend workflows, and designing optimized database structures. I actively leverage AI-driven development tools to accelerate debugging, refactoring, and unit testing to deliver high-quality code efficiently.",
  email: "adarshbiradar56@gmail.com",
  location: "Bengaluru, India",
  stats: {
    problemsSolved: 486,
    acceptanceRate: "74.8%",
    globalRank: "Top 4.2%",
    streakDays: 142,
    totalCommits: 1256,
    totalStars: 42
  }
};
