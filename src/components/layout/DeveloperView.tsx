"use client";

import React, { useState } from "react";
import { useOSStore } from "@/stores/useOSStore";
import { SOLUTIONS } from "@/data/solutions";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EXPERIENCES } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { TerminalConsole } from "@/components/terminal/TerminalConsole";
import { 
  Folder, 
  FolderOpen, 
  File, 
  Terminal, 
  ChevronRight, 
  ChevronDown, 
  Play, 
  X, 
  Check, 
  Settings, 
  Activity, 
  Database, 
  FileCode, 
  Info,
  Calendar,
  AlertCircle,
  FileJson
} from "lucide-react";

// Mock static file code mapping
const STATIC_FILES: Record<string, { code: string; language: string; description: string }> = {
  "src/Home.java": {
    language: "java",
    description: "Main portfolio entry class.",
    code: `package src;

import java.util.List;

public class AdarshBiradar {
    public static void main(String[] args) {
        Developer adarsh = new Developer();
        adarsh.setName("Adarsh Biradar");
        adarsh.setExpertise("Java Full Stack / Backend Systems");
        adarsh.setCoreFrameworks(List.of("Spring Boot", "Spring Cloud", "Hibernate"));
        adarsh.setCloudPlatform("AWS (Amazon Web Services)");
        
        System.out.println(adarsh.getMissionStatement());
    }
}`
  },
  "src/About.md": {
    language: "markdown",
    description: "Professional bio overview.",
    code: `# About Me

* Name: Adarsh Biradar
* Role: Java Full Stack Developer
* Codename: Project Helios

I specialize in constructing bulletproof backend services. With a solid foundation in competitive programming, I approach system design with a focus on optimal time and space complexity. 

## Technical Philosophy
1. Write clean, self-documenting code.
2. Design microservices with event-driven architecture to guarantee decoupling.
3. Treat scalability and latency constraints as critical requirements, not afterthoughts.`
  },
  "src/Skills.sql": {
    language: "sql",
    description: "SQL-style skills query file.",
    code: `-- Run this query to fetch skills matching senior developer expertise
SELECT name, category, expertise, years_experience 
FROM portfolio_skills 
WHERE expertise IN ('Expert', 'Advanced')
ORDER BY years_experience DESC;`
  },
  "src/Experience.log": {
    language: "log",
    description: "Log-style work chronology.",
    code: `2024-01-15 09:00:00 [INFO] hexacorp.migration.Context - Loaded role: Senior Backend Developer
2024-03-10 14:15:32 [INFO] hexacorp.postgres.Performance - Schema updated: Indexing 10M txn tables
2024-07-22 18:45:00 [INFO] hexacorp.ci.Pipeline - Sync success: AWS ECS Deploy pipeline (8m duration)
2021-07-01 09:00:00 [INFO] nextgen.platform.Bootstrap - Loaded role: Java Full Stack Developer
2022-11-04 11:20:05 [INFO] nextgen.cache.RedisConfig - Implemented listing caching, database CPU load -60%
2023-08-12 16:30:10 [INFO] nextgen.test.Runner - JUnit execution context success. 88% overall test coverage.`
  }
};

export function DeveloperView() {
  const { 
    tabs, 
    activeTabPath, 
    openTab, 
    closeTab, 
    sidebarTab, 
    setSidebarTab,
    setMode
  } = useOSStore();

  const [explorerOpen, setExplorerOpen] = useState({
    src: true,
    solutions: true,
    projects: false
  });

  const [showSQLResult, setShowSQLResult] = useState(false);
  const [isRunningSQL, setIsRunningSQL] = useState(false);

  // Toggle folders
  const toggleFolder = (folderName: "src" | "solutions" | "projects") => {
    setExplorerOpen((prev) => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  // Get active file contents
  const getActiveFile = () => {
    if (STATIC_FILES[activeTabPath]) {
      return STATIC_FILES[activeTabPath];
    }
    
    // Check solutions
    const sol = SOLUTIONS.find(s => s.path === activeTabPath);
    if (sol) {
      return {
        code: sol.code,
        language: sol.language,
        description: sol.description
      };
    }

    // Check project JSONs
    if (activeTabPath.startsWith("projects/")) {
      const projId = activeTabPath.split("/")[1];
      const proj = PROJECTS.find(p => p.id === projId);
      if (proj) {
        return {
          code: JSON.stringify(proj, null, 2),
          language: "json",
          description: `Presentation structure configuration for ${proj.title}.`
        };
      }
    }

    return {
      code: "// Workspace terminal active. Select a file from the explorer to read.",
      language: "java",
      description: "Default placeholder content."
    };
  };

  const activeFile = getActiveFile();

  const handleRunSQL = () => {
    setIsRunningSQL(true);
    setTimeout(() => {
      setIsRunningSQL(false);
      setShowSQLResult(true);
    }, 800);
  };

  // Custom light Java/SQL syntax highlighter
  const highlightCode = (code: string, language: string) => {
    if (!code) return "";
    
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (language === "java") {
      return escaped
        .replace(/\b(public|private|protected|class|interface|package|import|static|void|int|double|boolean|new|return|if|else|while|for|null|this|super|implements|extends|throws)\b/g, '<span class="text-pink-500 font-semibold">$1</span>')
        .replace(/\b(String|List|HashMap|HashSet|System|Arrays|Character|Integer|ArrayList|Exception|Solution|Object|Developer|AdarshBiradar)\b/g, '<span class="text-emerald-400">$1</span>')
        .replace(/(?:\/\/.*)/g, '<span class="text-zinc-500 font-normal italic">$1</span>')
        .replace(/(".*?")/g, '<span class="text-amber-300">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>');
    }
    
    if (language === "sql") {
      return escaped
        .replace(/\b(SELECT|FROM|WHERE|AND|OR|IN|ORDER\s+BY|DESC|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|ON|LIMIT)\b/gi, '<span class="text-pink-500 font-semibold">$1</span>')
        .replace(/(?:\-\-.*)/g, '<span class="text-zinc-500 font-normal italic">$1</span>')
        .replace(/('.*?')/g, '<span class="text-amber-300">$1</span>');
    }

    if (language === "markdown") {
      return escaped
        .replace(/^(#\s+.*)/gm, '<span class="text-[#6db33f] font-bold text-base">$1</span>')
        .replace(/^(##\s+.*)/gm, '<span class="text-sky-400 font-bold text-sm">$1</span>')
        .replace(/(\*.*?\*)/g, '<span class="text-zinc-400 italic">$1</span>')
        .replace(/(`.*?`)/g, '<span class="text-amber-300 font-mono bg-zinc-800/40 px-1 rounded">$1</span>');
    }

    if (language === "log") {
      return escaped
        .replace(/(\[INFO\])/g, '<span class="text-emerald-400 font-bold">$1</span>')
        .replace(/(\[WARN\])/g, '<span class="text-yellow-400 font-bold">$1</span>')
        .replace(/(\[ERROR\])/g, '<span class="text-red-400 font-bold">$1</span>')
        .replace(/^(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/gm, '<span class="text-zinc-500">$1</span>');
    }

    return escaped;
  };

  // Leetcode solved items grid heatmap representation
  const renderHeatmap = () => {
    const days = 112; // 16 weeks * 7 days
    const cells = [];
    for (let i = 0; i < days; i++) {
      // randomly assign levels of solve intensity
      const val = Math.random();
      let color = "bg-zinc-900 border-zinc-850"; // zero
      if (val > 0.85) color = "bg-emerald-400 border-emerald-400/20"; // high
      else if (val > 0.6) color = "bg-emerald-500/70 border-emerald-500/20"; // med
      else if (val > 0.35) color = "bg-emerald-600/40 border-emerald-600/10"; // low
      
      cells.push(
        <div 
          key={i} 
          className={`w-3.5 h-3.5 rounded-sm border ${color} transition hover:scale-110 hover:shadow`}
          title={`Day ${i + 1}: ${Math.floor(val * 4)} solved`}
        ></div>
      );
    }
    return cells;
  };

  return (
    <div className="flex-1 w-full flex flex-col md:flex-row bg-surface border border-elevated rounded-2xl overflow-hidden h-[84vh] shadow-2xl relative select-none">
      
      {/* 1. Left Vertical Activity Bar */}
      <div className="w-14 bg-background border-r border-elevated flex flex-col justify-between items-center py-4 shrink-0 gap-8">
        <div className="flex flex-col gap-4.5 w-full items-center">
          <button
            onClick={() => setSidebarTab("explorer")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition border ${
              sidebarTab === "explorer" 
                ? "bg-zinc-900 border-zinc-800 text-white font-bold" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
            title="Workspace Explorer"
          >
            <Folder size={18} />
          </button>
          
          <button
            onClick={() => setSidebarTab("stats")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition border ${
              sidebarTab === "stats" 
                ? "bg-zinc-900 border-zinc-800 text-white font-bold" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
            title="LeetCode/GitHub Dashboard"
          >
            <Activity size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <button
            onClick={() => setMode("recruiter")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white border border-transparent transition"
            title="Exit to Recruiter Mode"
          >
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* 2. Primary Drawer Panel (e.g. Explorer File Tree) */}
      <div className="w-64 bg-surface border-r border-elevated flex flex-col shrink-0">
        
        {sidebarTab === "explorer" && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="px-4 py-3 border-b border-elevated flex justify-between items-center bg-background">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Workspace Explorer</span>
            </div>
            
            <div className="p-3 space-y-2 text-xs text-zinc-400">
              {/* Project Title Node */}
              <div className="font-semibold text-zinc-300 flex items-center gap-1.5 px-1 py-0.5 select-none text-[11px]">
                <FolderOpen size={13} className="text-amber-500" />
                <span>DevOS // Adarsh</span>
              </div>
              
              {/* Folders & Leaves Tree */}
              <div className="pl-3.5 space-y-1">
                
                {/* Folder 1: src */}
                <div>
                  <button 
                    onClick={() => toggleFolder("src")}
                    className="w-full flex items-center gap-1.5 py-1 hover:bg-zinc-900 hover:text-zinc-200 text-left px-1.5 rounded transition"
                  >
                    {explorerOpen.src ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    <Folder size={12} className="text-sky-400" />
                    <span className="font-medium text-zinc-300">src</span>
                  </button>

                  {explorerOpen.src && (
                    <div className="pl-4.5 mt-0.5 space-y-0.5 border-l border-zinc-900">
                      <button
                        onClick={() => openTab("Home.java", "src/Home.java", "file")}
                        className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                          activeTabPath === "src/Home.java" ? "bg-zinc-900 text-emerald-400" : ""
                        }`}
                      >
                        <FileCode size={11} className="text-orange-400" />
                        <span>Home.java</span>
                      </button>
                      <button
                        onClick={() => openTab("About.md", "src/About.md", "file")}
                        className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                          activeTabPath === "src/About.md" ? "bg-zinc-900 text-emerald-400" : ""
                        }`}
                      >
                        <File size={11} className="text-zinc-500" />
                        <span>About.md</span>
                      </button>
                      <button
                        onClick={() => openTab("Skills.sql", "src/Skills.sql", "query")}
                        className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                          activeTabPath === "src/Skills.sql" ? "bg-zinc-900 text-emerald-400" : ""
                        }`}
                      >
                        <Database size={11} className="text-indigo-400" />
                        <span>Skills.sql</span>
                      </button>
                      <button
                        onClick={() => openTab("Experience.log", "src/Experience.log", "log")}
                        className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                          activeTabPath === "src/Experience.log" ? "bg-zinc-900 text-emerald-400" : ""
                        }`}
                      >
                        <File size={11} className="text-amber-500" />
                        <span>Experience.log</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Folder 2: solutions (actual Java competitive codes) */}
                <div>
                  <button 
                    onClick={() => toggleFolder("solutions")}
                    className="w-full flex items-center gap-1.5 py-1 hover:bg-zinc-900 hover:text-zinc-200 text-left px-1.5 rounded transition"
                  >
                    {explorerOpen.solutions ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    <Folder size={12} className="text-[#6db33f]" />
                    <span className="font-medium text-zinc-300">solutions</span>
                  </button>

                  {explorerOpen.solutions && (
                    <div className="pl-4.5 mt-0.5 space-y-0.5 border-l border-zinc-900">
                      {SOLUTIONS.map((s) => (
                        <button
                          key={s.path}
                          onClick={() => openTab(s.name, s.path, "file")}
                          className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                            activeTabPath === s.path ? "bg-zinc-900 text-emerald-400" : ""
                          }`}
                        >
                          <FileCode size={11} className="text-orange-400" />
                          <span className="truncate">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Folder 3: projects configuration */}
                <div>
                  <button 
                    onClick={() => toggleFolder("projects")}
                    className="w-full flex items-center gap-1.5 py-1 hover:bg-zinc-900 hover:text-zinc-200 text-left px-1.5 rounded transition"
                  >
                    {explorerOpen.projects ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    <Folder size={12} className="text-sky-400" />
                    <span className="font-medium text-zinc-300">projects</span>
                  </button>

                  {explorerOpen.projects && (
                    <div className="pl-4.5 mt-0.5 space-y-0.5 border-l border-zinc-900">
                      {PROJECTS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => openTab(`${p.title}.json`, `projects/${p.id}`, "file")}
                          className={`w-full flex items-center gap-1.5 py-1 px-2.5 rounded text-left transition hover:bg-zinc-900 hover:text-zinc-200 ${
                            activeTabPath === `projects/${p.id}` ? "bg-zinc-900 text-emerald-400" : ""
                          }`}
                        >
                          <FileJson size={11} className="text-yellow-400" />
                          <span className="truncate">{p.id}.json</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {sidebarTab === "stats" && (
          <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-6">
            <div className="border-b border-zinc-900 pb-2 flex justify-between items-center bg-[#07080a] -mx-4 -mt-4 px-4 py-3">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Competitive Portal</span>
            </div>
            
            {/* LeetCode Solve Metric */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Solve Metrics</h4>
              <div className="bg-zinc-950 p-3.5 border border-zinc-900 rounded-xl space-y-2 font-mono">
                <div className="flex justify-between text-[11px]">
                  <span>Total Solved</span>
                  <span className="text-emerald-400 font-bold">{PROFILE.stats.problemsSolved}+</span>
                </div>
                <div className="h-1.5 bg-zinc-850 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500">
                  <span>Easy (180)</span>
                  <span>Med (260)</span>
                  <span>Hard (46)</span>
                </div>
              </div>
            </div>

            {/* Streak metrics */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Coding Streak</h4>
              <div className="bg-zinc-950 p-3.5 border border-zinc-900 rounded-xl flex items-center justify-between font-mono">
                <div>
                  <p className="text-xs text-zinc-500">Active Streak</p>
                  <p className="text-base font-extrabold text-amber-400 mt-0.5">{PROFILE.stats.streakDays} Days</p>
                </div>
                <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold rounded-lg animate-pulse">
                  STREAKING ✔
                </div>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Activity Grid</h4>
              <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-xl">
                <div className="grid grid-cols-8 gap-1.5 justify-center">
                  {renderHeatmap()}
                </div>
                <div className="flex justify-between items-center text-[9px] text-zinc-600 font-mono mt-3 select-none">
                  <span>Less activity</span>
                  <span>More activity</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 3. Main Editor Window & Bottom Terminal Panels */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        
        {/* Editor Tabs bar */}
        <div className="h-10 bg-background border-b border-elevated flex items-center px-2 overflow-x-auto select-none gap-1 shrink-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = tab.path === activeTabPath;
            return (
              <div
                key={tab.path}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition group border ${
                  isActive 
                    ? "bg-surface border-elevated text-white font-semibold" 
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60"
                }`}
              >
                <button
                  onClick={() => openTab(tab.name, tab.path, tab.type)}
                  className="flex items-center gap-1.5 select-none"
                >
                  {tab.name.endsWith(".java") && <FileCode size={11} className="text-orange-400" />}
                  {tab.name.endsWith(".md") && <File size={11} className="text-zinc-500" />}
                  {tab.name.endsWith(".sql") && <Database size={11} className="text-indigo-400" />}
                  {tab.name.endsWith(".log") && <File size={11} className="text-amber-500" />}
                  {tab.name.endsWith(".json") && <FileJson size={11} className="text-yellow-400" />}
                  <span>{tab.name}</span>
                </button>
                <button
                  onClick={() => closeTab(tab.path)}
                  className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded cursor-pointer"
                >
                  <X size={10} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-zinc-300 text-xs md:text-sm relative leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
          
          {/* SQL Run action floating badge */}
          {activeTabPath === "src/Skills.sql" && (
            <button
              onClick={handleRunSQL}
              disabled={isRunningSQL}
              className="absolute right-5 top-5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6db33f] hover:bg-green-500 font-bold text-white text-[11px] shadow border border-green-400/20 transition active:scale-95 cursor-pointer disabled:bg-zinc-800"
            >
              <Play size={10} className="fill-current" />
              {isRunningSQL ? "Running Query..." : "Execute Query"}
            </button>
          )}

          {/* Normal Line numbers + Code block */}
          {tabs.length > 0 ? (
            <div className="flex items-start gap-4">
              {/* Line numbers column */}
              <div className="text-zinc-600 text-right select-none pr-2 border-r border-zinc-900 w-8">
                {activeFile.code.split("\n").map((_, i) => (
                  <div key={i} className="leading-relaxed">{i + 1}</div>
                ))}
              </div>
              
              {/* Syntax Highlighted Code */}
              <pre className="flex-1 overflow-x-auto whitespace-pre font-mono leading-relaxed select-text p-0 m-0">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(activeFile.code, activeFile.language)
                  }}
                />
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center h-full text-zinc-600 select-none text-center p-6 gap-2">
              <AlertCircle size={24} />
              <p>No files open in editor.</p>
              <p className="text-[10px] text-zinc-500">Select a file from the explorer sidebar tree node to view.</p>
            </div>
          )}

          {/* Render SQL Result Table */}
          {activeTabPath === "src/Skills.sql" && showSQLResult && (
            <div className="mt-8 border border-zinc-800 bg-[#0d0e12] rounded-xl overflow-hidden max-w-2xl shadow-xl animate-fadeIn">
              <div className="px-4 py-2 border-b border-zinc-800 flex justify-between items-center bg-[#07080a]">
                <span className="text-[10px] uppercase font-bold text-zinc-500">SQL QUERY RESULTS</span>
                <button onClick={() => setShowSQLResult(false)} className="text-zinc-500 hover:text-zinc-300">
                  <X size={12} />
                </button>
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 font-bold">
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Expertise</th>
                    <th className="p-2.5">Exp (Yrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {SKILLS.filter(s => s.expertise === "Expert" || s.expertise === "Advanced").map((skill, index) => (
                    <tr key={skill.id} className="border-b border-zinc-850 hover:bg-zinc-800/40 text-zinc-300">
                      <td className="p-2.5 font-semibold text-emerald-400">{skill.name}</td>
                      <td className="p-2.5 text-zinc-400">{skill.category}</td>
                      <td className="p-2.5 text-zinc-300">{skill.expertise}</td>
                      <td className="p-2.5 text-zinc-400">{skill.years} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Panel: Interactive Terminal */}
        <div className="h-64 border-t border-zinc-900 shrink-0">
          <TerminalConsole />
        </div>

      </div>
      
    </div>
  );
}
