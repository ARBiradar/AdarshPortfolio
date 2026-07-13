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
    degree: "Bachelor of Engineering (B.E.)",
    major: "Computer Science and Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    duration: "2017 - 2021",
    grade: "8.4 CGPA",
    details: [
      "Specialized in Algorithms, Database Management Systems, Computer Networks, and Object-Oriented Software Engineering.",
      "Completed a Capstone Project: 'Distributed Peer-to-Peer File Sharing System' using Java socket programming and cryptographic hashes."
    ]
  }
];
