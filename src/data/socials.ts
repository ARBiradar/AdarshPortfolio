export interface Social {
  platform: string;
  url: string;
  username: string;
  iconName: string;
}

export const SOCIALS: Social[] = [
  {
    platform: "GitHub",
    url: "https://github.com/ARBiradar",
    username: "ARBiradar",
    iconName: "Github"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/adarsh-biradar",
    username: "adarsh-biradar",
    iconName: "Linkedin"
  },
  {
    platform: "LeetCode",
    url: "https://leetcode.com/u/ARBiradar/",
    username: "ARBiradar",
    iconName: "Code2"
  },
  {
    platform: "HackerRank",
    url: "https://hackerrank.com/profile/ARBiradar",
    username: "ARBiradar",
    iconName: "Award"
  },
  {
    platform: "GeeksforGeeks",
    url: "https://geeksforgeeks.org/user/ARBiradar",
    username: "ARBiradar",
    iconName: "Terminal"
  },
  {
    platform: "Email",
    url: "mailto:adarsh.biradar@example.com",
    username: "adarsh.biradar@example.com",
    iconName: "Mail"
  }
];
