"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOSStore } from "@/stores/useOSStore";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EXPERIENCES } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { SOCIALS } from "@/data/socials";
import { EDUCATION_DATA } from "@/data/education";
import { CERTIFICATES } from "@/data/certificates";
import confetti from "canvas-confetti";

interface CommandResult {
  command: string;
  output: React.ReactNode;
}

const COMMAND_LIST = [
  "home", "about", "skills", "projects", "experience", "education", "contact", "resume", "certificates",
  "github", "linkedin", "leetcode", "hackerrank", "gfg", "instagram",
  "whoami", "profile", "stats", "tech", "timeline", "achievements",
  "help", "history", "clear", "version",
  "coffee", "sudo hire adarsh", "joke", "matrix", "fortune",
  "ls", "pwd", "cls", "gh", "li", "lc", "hr", "cv", "exp", "edu"
];

export function TerminalConsole() {
  const { openTab, setMode } = useOSStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalLogs, setTerminalLogs] = useState<CommandResult[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1">
          <p className="text-[#6db33f] font-bold">Welcome to DevOS Terminal v1.0.0</p>
          <p className="text-zinc-400">Type <span className="text-emerald-400">help</span> for a list of available commands.</p>
          <p className="text-zinc-500">Shortcut: Use <span className="text-zinc-300">Tab</span> for autocomplete, <span className="text-zinc-300">↑/↓</span> for history.</p>
        </div>
      )
    }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom on log updates
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  // Focus key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+L to clear terminal logs
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setTerminalLogs([]);
      }
      // Ctrl+K to focus input
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length > 0) {
      const filtered = COMMAND_LIST.filter((cmd) =>
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Autocomplete with Tab
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }

    // Up arrow: Command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[history.length - 1 - nextIndex]);
        }
      }
    }

    // Down arrow: Command history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const executeCommand = (cmdText: string) => {
    const fullCmd = cmdText.trim();
    const parts = fullCmd.split(" ");
    const primaryCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!fullCmd) return;

    // Save history
    const updatedHistory = [...history, fullCmd];
    setHistory(updatedHistory);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    // Command mapping and execution
    switch (primaryCmd) {
      case "help":
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-zinc-300">
            <div>
              <p className="text-[#6db33f] font-semibold underline mb-1">Navigation / GUI Files</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">home</span> Opens Home.java</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">about</span> Opens About.md</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">skills</span> Opens Skills.sql (Executes SQL query)</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">projects</span> Lists projects & ranking board</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">experience</span> Opens Experience.log</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">education</span> View college & majors</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">resume</span> Download Resume PDF</p>
              <p><span className="text-emerald-400 font-semibold w-24 inline-block">certificates</span> View certifications</p>
            </div>
            <div>
              <p className="text-amber-400 font-semibold underline mb-1">Portfolio & Utilities</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">whoami / profile</span> Summary bio profile info</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">stats</span> Fetch LeetCode/GitHub status</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">github / linkedin</span> Links to socials</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">open &lt;project&gt;</span> Open project presentation page</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">clear / cls</span> Clear screen</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">version</span> View OS version</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">coffee</span> Brew a digital cup of Java</p>
              <p><span className="text-emerald-400 font-semibold w-32 inline-block">sudo hire adarsh</span> Try hiring the dev</p>
            </div>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setTerminalLogs([]);
        setInput("");
        setSuggestions([]);
        return;

      case "home":
        openTab("Home.java", "src/Home.java", "file");
        output = <p className="text-zinc-400">Opened Home.java in active tabs.</p>;
        break;

      case "about":
        openTab("About.md", "src/About.md", "file");
        output = <p className="text-zinc-400">Opened About.md in active tabs.</p>;
        break;

      case "skills":
        openTab("Skills.sql", "src/Skills.sql", "query");
        output = (
          <div className="space-y-2 text-zinc-300 font-mono">
            <p className="text-blue-400">Executing: SELECT * FROM skills WHERE expertise = 'Expert' OR expertise = 'Advanced';</p>
            <div className="border border-zinc-800 rounded overflow-hidden max-w-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-800 border-b border-zinc-700 text-zinc-200">
                    <th className="p-2">Skill Name</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Expertise</th>
                    <th className="p-2">Exp (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {SKILLS.filter(s => s.expertise === "Expert" || s.expertise === "Advanced").map((s, i) => (
                    <tr key={i} className="border-b border-zinc-850 hover:bg-zinc-800/40">
                      <td className="p-2 font-semibold text-emerald-400">{s.name}</td>
                      <td className="p-2 text-zinc-400">{s.category}</td>
                      <td className="p-2 text-zinc-300">{s.expertise}</td>
                      <td className="p-2 text-zinc-400">{s.years} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-zinc-500 text-[10px]">{SKILLS.filter(s => s.expertise === "Expert" || s.expertise === "Advanced").length} rows returned.</p>
          </div>
        );
        break;

      case "projects":
      case "ls":
        output = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-zinc-400 font-semibold">Active Repository Projects:</p>
            <div className="space-y-1">
              {PROJECTS.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <span className="text-[#6db33f] font-mono w-24">[{p.status}]</span>
                  <span className="text-emerald-400 font-bold w-48">{p.title}</span>
                  <span className="text-zinc-500 font-mono text-xs">{p.difficulty} | {p.stats.memory} mem</span>
                  <span className="text-zinc-400 text-xs hidden sm:inline">{p.description}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500">Run <span className="text-emerald-400">open &lt;project-id&gt;</span> to inspect (e.g. open pulsearena).</p>
          </div>
        );
        break;

      case "open":
        if (args.length === 0) {
          output = <p className="text-red-400">Error: Please specify project id (e.g. open pulsearena).</p>;
        } else {
          const match = PROJECTS.find((p) => p.id === args[0].toLowerCase());
          if (match) {
            setMode("presentation");
            openTab(match.title, `projects/${match.id}`, "file");
            output = <p className="text-[#6db33f]">Opening presentation walkthrough for {match.title}...</p>;
          } else {
            output = <p className="text-red-400">Project '{args[0]}' not found. Type 'projects' to list valid IDs.</p>;
          }
        }
        break;

      case "experience":
      case "exp":
        openTab("Experience.log", "src/Experience.log", "log");
        output = (
          <div className="space-y-3 text-zinc-300 max-w-2xl">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="flex justify-between items-start flex-wrap">
                  <h4 className="font-bold text-emerald-400 text-sm">{exp.role} @ {exp.company}</h4>
                  <span className="text-xs text-zinc-500 font-mono">{exp.duration}</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">{exp.location}</p>
                <ul className="list-disc list-inside text-xs text-zinc-300 mt-2 space-y-1">
                  {exp.description.map((desc, dIndex) => (
                    <li key={dIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
      case "edu":
        output = (
          <div className="space-y-3 text-zinc-300 max-w-2xl">
            {EDUCATION_DATA.map((edu, i) => (
              <div key={i} className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="flex justify-between items-start flex-wrap">
                  <h4 className="font-bold text-emerald-400 text-sm">{edu.degree}</h4>
                  <span className="text-xs text-zinc-500 font-mono">{edu.duration}</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">{edu.institution} — {edu.grade}</p>
                <p className="text-zinc-300 text-xs mt-1 italic">{edu.major}</p>
                <ul className="list-disc list-inside text-xs text-zinc-300 mt-2 space-y-1">
                  {edu.details.map((detail, dIndex) => (
                    <li key={dIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
      case "cv":
        output = (
          <div className="text-zinc-300">
            <p>Opening your resume link in a new tab...</p>
            <a href="https://drive.google.com/file/d/13joaCCPp-pKQ-lt8nTYKDkD_c74kahDl/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-[#6db33f] font-bold">
              Click here to view/download Resume directly on Google Drive
            </a>
          </div>
        );
        break;

      case "certificates":
        output = (
          <div className="text-zinc-300 space-y-2 max-w-xl">
            <p className="font-semibold text-emerald-400">Professional Certifications:</p>
            {CERTIFICATES.map((cert, i) => (
              <div key={i} className="text-xs text-zinc-455">
                <span className="text-emerald-400">✔</span> {cert.title} — {cert.issuer} ({cert.date})
                {cert.credentialId && <span className="text-zinc-600 font-mono ml-2">[ID: {cert.credentialId}]</span>}
              </div>
            ))}
          </div>
        );
        break;

      case "whoami":
      case "profile":
      case "pwd":
        output = (
          <div className="text-zinc-300 space-y-1 max-w-xl">
            <p className="text-emerald-400 font-bold text-sm">{PROFILE.name} ({PROFILE.codename})</p>
            <p className="text-xs italic text-zinc-400">"{PROFILE.heroLine}"</p>
            <p className="text-xs text-zinc-300 leading-relaxed mt-2">{PROFILE.bio}</p>
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="text-zinc-300 grid grid-cols-2 gap-4 max-w-md bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg font-mono">
            <div>
              <p className="text-zinc-500 text-xs">LEETCODE STATS</p>
              <p className="text-emerald-400 font-bold mt-1">Solved: {PROFILE.stats.problemsSolved}+</p>
              <p className="text-zinc-400 text-xs">Accept Rate: {PROFILE.stats.acceptanceRate}</p>
              <p className="text-zinc-400 text-xs">Global Rank: {PROFILE.stats.globalRank}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">GITHUB COMMITS</p>
              <p className="text-sky-400 font-bold mt-1">Commits: {PROFILE.stats.totalCommits}+</p>
              <p className="text-zinc-400 text-xs">Streak: {PROFILE.stats.streakDays} Days</p>
              <p className="text-zinc-400 text-xs">Rep Stars: {PROFILE.stats.totalStars} ★</p>
            </div>
          </div>
        );
        break;

      case "github":
      case "gh": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "github")?.url;
        output = <p>GitHub Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "linkedin":
      case "li": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "linkedin")?.url;
        output = <p>LinkedIn Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "leetcode":
      case "lc": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "leetcode")?.url;
        output = <p>LeetCode Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "hackerrank":
      case "hr": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "hackerrank")?.url;
        output = <p>HackerRank Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "gfg": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "geeksforgeeks")?.url;
        output = <p>GeeksforGeeks Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "instagram": {
        const url = SOCIALS.find((s) => s.platform.toLowerCase() === "instagram")?.url;
        output = <p>Instagram Profile: <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{url}</a></p>;
        break;
      }
      case "achievements":
        output = (
          <div className="text-zinc-300 space-y-2 max-w-xl">
            <p className="font-semibold text-emerald-400">Achievements & Leadership (NCC):</p>
            <p className="text-xs"><span className="text-emerald-400">✔</span> <strong className="text-zinc-200">NCC Senior Cadet:</strong> Managed and led a regiment of over 1,000 cadets, coordinating training drills and crisis management operations.</p>
            <p className="text-xs"><span className="text-emerald-400">✔</span> <strong className="text-zinc-200">ATC Camp Leader:</strong> Successfully directed Annual Training Camp operations and logistics.</p>
            <p className="text-xs"><span className="text-emerald-400">✔</span> <strong className="text-zinc-200">Shooting Medal:</strong> Won 🥇 First Place Medal in division rifle shooting competition.</p>
            <p className="text-xs text-zinc-500 font-semibold mt-1">Core leadership competencies developed: Discipline, Strategic Decision Making, Crisis Management, and Team Coordination.</p>
          </div>
        );
        break;
      case "tech":
        output = (
          <div className="text-zinc-300 space-y-2 max-w-xl font-mono">
            <p className="font-semibold text-emerald-400">Technical Capability Stack:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500">Languages:</span> Java, Python, JavaScript, TypeScript, SQL, HTML, CSS
              </div>
              <div>
                <span className="text-zinc-500">Frameworks:</span> Spring Boot, Spring Framework, Spring MVC, Hibernate, React, Next.js, Tailwind CSS
              </div>
              <div>
                <span className="text-zinc-500">DB & Cache:</span> MySQL, MongoDB, Oracle SQL
              </div>
              <div>
                <span className="text-zinc-500">Cloud & Ops:</span> AWS, Vercel, Docker, Git, GitHub
              </div>
              <div>
                <span className="text-zinc-500">Abstractions & AI:</span> Prompt Engineering, AI-assisted Dev, REST APIs, JWT Auth, JDBC
              </div>
            </div>
          </div>
        );
        break;
      case "timeline":
        output = (
          <div className="text-zinc-300 space-y-2 max-w-xl font-mono">
            <p className="font-semibold text-emerald-400">Chronological Timeline:</p>
            <div className="space-y-1.5 text-xs">
              <p><span className="text-zinc-500">Jan 2025 - Present:</span> Full Stack Java & Generative/Agentic AI Research Associate @ Naresh IT</p>
              <p><span className="text-zinc-500">Oct 2023 - Dec 2025:</span> Master of Computer Applications (MCA) @ Acharya Institute (Bengaluru)</p>
              <p><span className="text-zinc-500">Dec 2024 - Jan 2025:</span> Java Developer Intern @ Code Alpha</p>
              <p><span className="text-zinc-500">Jun 2019 - Nov 2022:</span> Bachelor of Science (B.Sc.) @ Rani Channamma University</p>
            </div>
          </div>
        );
        break;

      case "version":
        output = <p className="text-zinc-500">DevOS Portfolio OS Shell v1.0.4 - Built with Next.js 15, TypeScript & Tailwind CSS v4.</p>;
        break;

      case "coffee":
        output = (
          <pre className="text-amber-500/90 font-bold text-xs select-none leading-none">
            {`
      ( (
       ) )
    .----------.
    |  J A V A |-.
    |          | |
    \\          /_/
     \`--------'
    ============
   [ DIGITAL BREW ]
            `}
          </pre>
        );
        break;

      case "sudo":
        if (args.join(" ").toLowerCase() === "hire adarsh") {
          // Trigger confetti!
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
          output = (
            <div className="space-y-1">
              <p className="text-green-400 font-bold">ACCESS GRANTED. HIRING PROTOCOL ACTIVATED!</p>
              <p className="text-zinc-300">"Thank you for recognizing top engineering talent! Sending email handshake to {PROFILE.email}..."</p>
              <p className="text-emerald-400 text-xs">Let's connect: {PROFILE.email} or LinkedIn!</p>
            </div>
          );
        } else {
          output = <p className="text-red-400">Permission Denied. Only 'sudo hire adarsh' is registered in sudoers.</p>;
        }
        break;

      case "joke":
        const jokes = [
          "Why do Java developers wear glasses? Because they don't C#!",
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "['hip', 'hip'] (hip hip array!)"
        ];
        output = <p className="text-zinc-300 italic">"{jokes[Math.floor(Math.random() * jokes.length)]}"</p>;
        break;

      case "fortune":
        const fortunes = [
          "A major optimization will resolve your current production bugs soon.",
          "Your next deployment will pass unit tests with 100% code coverage.",
          "Avoid nested try-catch blocks and your path will remain clear.",
          "Great things await those who write robust compensation logic in Saga patterns."
        ];
        output = <p className="text-zinc-300 italic">"{fortunes[Math.floor(Math.random() * fortunes.length)]}"</p>;
        break;

      case "matrix":
        output = (
          <div className="text-green-500 font-mono text-[10px] space-y-0.5 select-none opacity-80 leading-none">
            <p>01001010 01000001 01010110 01000001 (JAVA)</p>
            <p>01010011 01010000 01010010 01001001 01001110 01000111 (SPRING)</p>
            <p>01000011 01001100 01001111 01010101 01000100 (CLOUD)</p>
          </div>
        );
        break;

      default:
        // Fuzzy search suggestion
        const bestFuzzy = COMMAND_LIST.find((cmd) => {
          // simple check: if 2 chars overlap or contains substring
          return cmd.includes(primaryCmd) || primaryCmd.includes(cmd);
        });
        output = (
          <div className="space-y-1">
            <p className="text-red-400">bash: command not found: {primaryCmd}</p>
            {bestFuzzy && (
              <p className="text-zinc-500 text-xs">
                Did you mean: <span className="text-emerald-400 font-bold">{bestFuzzy}</span>?
              </p>
            )}
          </div>
        );
    }

    setTerminalLogs((prev) => [...prev, { command: fullCmd, output }]);
    setInput("");
    setSuggestions([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div
      className="flex flex-col h-full bg-[#0d0e12] border border-zinc-800 rounded-lg overflow-hidden font-mono text-zinc-300"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#090a0d] border-b border-zinc-800/80 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
          <span className="text-zinc-500 text-[10px] ml-1.5 flex items-center gap-1">
            bash - adarsh@devos:~
          </span>
        </div>
      </div>

      {/* Logs Output */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs select-text scrollbar-thin scrollbar-thumb-zinc-800">
        {terminalLogs.map((log, index) => (
          <div key={index} className="space-y-1">
            {log.command !== "welcome" && (
              <div className="flex items-center gap-1.5 text-[#6db33f]">
                <span>adarsh@devos:~$</span>
                <span className="text-zinc-100">{log.command}</span>
              </div>
            )}
            <div className="pl-2">{log.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleFormSubmit} className="relative p-2.5 bg-[#090a0d] border-t border-zinc-800 flex items-center gap-1.5">
        <span className="text-[#6db33f] text-xs font-bold shrink-0">adarsh@devos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 text-xs font-mono font-medium p-0 focus:ring-0 focus:outline-none"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />

        {/* Suggestion Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-20 bottom-full mb-1.5 bg-[#0d0e12] border border-zinc-800 rounded shadow-xl py-1 text-[10px] text-zinc-400 z-10 w-44">
            <div className="px-2 py-0.5 text-zinc-600 font-bold border-b border-zinc-800 select-none">
              AUTOCOMPLETE SUGGESTIONS:
            </div>
            {suggestions.slice(0, 5).map((s, i) => (
              <div
                key={i}
                className="px-2 py-1 hover:bg-zinc-800 hover:text-white cursor-pointer"
                onClick={() => {
                  setInput(s);
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
