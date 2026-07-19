export interface Education {
  degree: string;
  major: string;
  institution: string;
  duration: string;
  grade?: string;
  details: string[];
}

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    major: "Computer Applications & Software Engineering",
    institution: "Acharya Institute (Bengaluru, Karnataka)",
    duration: "Oct 2023 - Dec 2025",
    grade: "8.37 CGPA",
    details: [
      "Studied advanced database systems, software engineering paradigms, Java full stack application designs, and cloud infrastructure.",
      "Acquired deep theoretical and practical understanding of object-oriented design, algorithms, and distributed computing architectures."
    ]
  },
  {
    degree: "Bachelor of Science (B.Sc.)",
    major: "Computer Science & Mathematics",
    institution: "Rani Channamma University (Belagavi, Karnataka)",
    duration: "Jun 2019 - Nov 2022",
    grade: "7.0 CGPA",
    details: [
      "Gained strong foundations in computational theory, linear algebra, calculus, and core programming paradigms.",
      "Participated in math Olympiads and logic competitions, developing structured problem-solving skills."
    ]
  }
];
