export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "Sep 2024",
    credentialId: "AWS-ASA-9988",
    verificationUrl: "https://aws.amazon.com/verification"
  },
  {
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    date: "Mar 2023",
    credentialId: "OCP-JAVA-17-9092",
    verificationUrl: "https://oracle.com/verification"
  },
  {
    title: "Java (Advanced) Skill Certificate",
    issuer: "HackerRank",
    date: "Jun 2022",
    credentialId: "HR-JAVA-ADV-776a",
    verificationUrl: "https://hackerrank.com/certificates"
  },
  {
    title: "SQL (Advanced) Skill Certificate",
    issuer: "HackerRank",
    date: "Aug 2022",
    credentialId: "HR-SQL-ADV-332e",
    verificationUrl: "https://hackerrank.com/certificates"
  }
];
