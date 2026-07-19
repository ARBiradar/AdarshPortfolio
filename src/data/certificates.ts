export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Oracle Certified Associate (OCA)",
    issuer: "Oracle",
    date: "Mar 2024",
    credentialId: "OCA-JV-1102",
    verificationUrl: "https://oracle.com/verification"
  },
  {
    title: "Java Programming Fundamentals",
    issuer: "Infosys",
    date: "Nov 2023",
    credentialId: "INF-JV-908",
    verificationUrl: "https://infosys.com/verification"
  },
  {
    title: "Front-End Development Professional Certificate",
    issuer: "META",
    date: "Jun 2024",
    credentialId: "META-FE-776",
    verificationUrl: "https://coursera.org/verification"
  },
  {
    title: "IBM Prompt Engineering Certificate",
    issuer: "IBM",
    date: "Apr 2025",
    credentialId: "IBM-PE-562",
    verificationUrl: "https://coursera.org/verification"
  },
  {
    title: "Red Hat Linux Fundamentals",
    issuer: "Red Hat",
    date: "Oct 2024",
    credentialId: "RH-LF-112",
    verificationUrl: "https://redhat.com/verification"
  }
];
