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
  tagline: "Where Recruiters Explore, Developers Feel at Home.",
  heroLine: "Java Full Stack Developer specializing in Spring Boot, AWS, scalable backend systems, and modern engineering practices.",
  bio: "Passionate software engineer focused on building robust, scalable microservices and backend architectures. With deep expertise in Java and the Spring Ecosystem, paired with cloud engineering practices on AWS, I turn complex business requirements into elegant, high-throughput systems.",
  email: "adarsh.biradar@example.com",
  location: "Pune, India",
  stats: {
    problemsSolved: 486,
    acceptanceRate: "74.8%",
    globalRank: "Top 4.2%",
    streakDays: 142,
    totalCommits: 1256,
    totalStars: 42
  }
};
