"use client";

import React from "react";
import { useOSStore } from "@/stores/useOSStore";
import { PROJECTS, Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Terminal, 
  ExternalLink, 
  CheckCircle,
  HelpCircle,
  Code
} from "lucide-react";

const GithubIcon = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export function PresentationView() {
  const { 
    activeProjectId, 
    setActiveProjectId, 
    presentationStep, 
    setPresentationStep,
    setMode
  } = useOSStore();

  const project = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  const steps: { id: typeof presentationStep; label: string; icon: React.ReactNode }[] = [
    { id: "problem", label: "1. Problem Statement", icon: <HelpCircle size={16} /> },
    { id: "architecture", label: "2. Architecture Design", icon: <Layers size={16} /> },
    { id: "stack", label: "3. Technology Stack", icon: <Cpu size={16} /> },
    { id: "challenges", label: "4. Major Challenges", icon: <Terminal size={16} /> },
    { id: "demo", label: "5. Code & Lessons", icon: <Code size={16} /> }
  ];

  const handleStepChange = (direction: "prev" | "next") => {
    const currentIndex = steps.findIndex((s) => s.id === presentationStep);
    if (direction === "prev" && currentIndex > 0) {
      setPresentationStep(steps[currentIndex - 1].id);
    } else if (direction === "next" && currentIndex < steps.length - 1) {
      setPresentationStep(steps[currentIndex + 1].id);
    }
  };

  const renderStepContent = () => {
    switch (presentationStep) {
      case "problem":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-zinc-300 select-text"
          >
            <h3 className="text-2xl font-black text-white">The Technical Challenge</h3>
            <p className="text-lg leading-relaxed text-zinc-400 font-medium">
              {project.walkthrough.problem}
            </p>
            <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 mt-2 shrink-0 animate-ping"></span>
              <div>
                <h4 className="font-bold text-white text-sm">Critical Boundary Conditions</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Latency requirements: &lt;50ms, peak request processing throughput, resource isolation controls.
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "architecture":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-zinc-300 select-text"
          >
            <h3 className="text-2xl font-black text-white">System Architecture Overview</h3>
            <p className="text-base leading-relaxed text-zinc-400 font-medium">
              {project.walkthrough.architecture}
            </p>
            
            {/* Interactive ASCII representation of architecture */}
            <div className="bg-zinc-950/80 border border-zinc-900 p-5 rounded-2xl font-mono text-xs text-emerald-400 space-y-1.5 overflow-x-auto leading-none">
              <p className="text-zinc-600 select-none"># INTERVIEW DESTRUCTURING ARCHITECTURE MAP</p>
              {project.id === "pulsearena" && (
                <>
                  <p>Client Browser --&gt; [ Next.js Frontend ] --&gt; WebSocket Duplex Connection</p>
                  <p>                                                   |</p>
                  <p>                                                   v</p>
                  <p>MySQL DB &lt;-- Batch Writes &lt;-- [ Spring Boot REST/WS ] &lt;-- Redis Cache (Counts)</p>
                </>
              )}
              {project.id === "securevote" && (
                <>
                  <p>Voter Wallet --&gt; [ React Web UI ] --&gt; Ethers.js Web3 Provider</p>
                  <p>                                               |</p>
                  <p>                                               v</p>
                  <p>  Ethereum / Polygon Network &lt;-- [ Solidity Smart Contract ] (On-Chain Proofs)</p>
                </>
              )}
              {project.id === "codepush" && (
                <>
                  <p>Sandbox Code --&gt; [ Chrome Extension Background Worker ]</p>
                  <p>                                                 |</p>
                  <p>                                                 v</p>
                  <p>  Secure Storage Token &lt;-- Git Push Commit --&gt; [ GitHub REST API ]</p>
                </>
              )}
              {project.id === "mytrip" && (
                <>
                  <p>User Search Query --&gt; [ React UI ] --&gt; [ Spring Boot Aggregator ]</p>
                  <p>                                                    |</p>
                  <p>                         +--------------------------+</p>
                  <p>                         v                          v</p>
                  <p>             [ CompletableFuture Flights ]  [ CompletableFuture Hotels ]</p>
                </>
              )}
              {project.id === "dsa" && (
                <>
                  <p>Algorithmic Code --&gt; [ Java 17 Solution Class ] --&gt; JUnit Regression Runner</p>
                  <p>                                                    |</p>
                  <p>                                                    v</p>
                  <p>  Optimized Time complexity O(N) & Space complexity O(1) validations</p>
                </>
              )}
              {project.id === "swapnil" && (
                <>
                  <p>User Device --&gt; [ SSG static assets ] --&gt; Edge CDN Server (Vercel)</p>
                  <p>                                                |</p>
                  <p>                                                v</p>
                  <p>  60fps Hardware-Accelerated Animation Loop &lt;-- [ Framer Motion Hooks ]</p>
                </>
              )}
            </div>
          </motion.div>
        );

      case "stack":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-zinc-300"
          >
            <h3 className="text-2xl font-black text-white">Technological Choices & Decisions</h3>
            <p className="text-sm text-zinc-500">Every stack selection was chosen to fulfill performance metrics:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.walkthrough.stack.map((item, idx) => (
                <div key={idx} className="border border-zinc-900 bg-zinc-950 p-4 rounded-xl flex items-start gap-3">
                  <CheckCircle size={16} className="text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-zinc-200 text-sm font-mono">{item}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Core implementation requirement.</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "challenges":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-zinc-300 select-text"
          >
            <h3 className="text-2xl font-black text-white">Engineering Hurdles & Solutions</h3>
            <p className="text-lg leading-relaxed text-zinc-400 font-medium">
              {project.walkthrough.challenges}
            </p>
            <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
              <div>
                <h4 className="font-bold text-white text-sm">Critical Resolution Result</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Adjusted kernel parameters, container timeout guards, and asynchronous transaction rollbacks.
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "demo":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-zinc-300 select-text"
          >
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-black text-white">Lessons & Key Code Implementation</h3>
                <p className="text-sm text-zinc-500 mt-1">{project.walkthrough.lessons}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer select-none"
                >
                  <GithubIcon size={12} />
                  GitHub Repository
                </a>
              </div>
            </div>

            {/* Code Highlight */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-wider">Critical Logic Snippet:</span>
              <pre className="bg-[#090a0d] border border-zinc-900 p-5 rounded-2xl font-mono text-xs md:text-sm text-zinc-200 overflow-x-auto leading-relaxed select-text">
                <code>{project.walkthrough.codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto py-4 px-4 md:px-8 flex flex-col gap-6 select-none">
      
      {/* Top action header */}
      <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-900 p-4 rounded-2xl select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode("recruiter")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-zinc-400 bg-zinc-900 hover:bg-zinc-850 hover:text-white rounded-xl border border-zinc-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={12} />
            Back to Portfolio
          </button>
          <span className="text-zinc-600 font-mono text-xs hidden sm:inline">|</span>
          <span className="text-zinc-400 text-xs font-mono font-bold hidden sm:inline">Presentation Mode Active</span>
        </div>

        {/* Project Selector tabs */}
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProjectId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
                activeProjectId === p.id 
                  ? "bg-zinc-900 text-white font-extrabold border border-zinc-850" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {p.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Panel dashboard layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0 select-none">
        
        {/* Left Side: Step Guide */}
        <div className="md:col-span-1 border border-zinc-900 bg-[#090a0d]/60 rounded-2xl p-5 flex flex-col justify-between shrink-0 gap-6">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono tracking-wider">PROJECT WALKTHROUGH</span>
              <h2 className="text-2xl font-black text-white mt-1.5 leading-tight">{project.title}</h2>
              <p className="text-xs text-zinc-500 font-mono font-medium mt-1">Role: {project.role}</p>
            </div>

            {/* Stepper buttons */}
            <div className="flex flex-col gap-2">
              {steps.map((s) => {
                const isActive = s.id === presentationStep;
                return (
                  <button
                    key={s.id}
                    onClick={() => setPresentationStep(s.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold text-left transition select-none cursor-pointer border ${
                      isActive 
                        ? "bg-zinc-950 border-zinc-800 text-[#6db33f] font-bold" 
                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/40"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                      isActive 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : "bg-zinc-900 border-zinc-850 text-zinc-500"
                    }`}>
                      {s.icon}
                    </span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code execution statistics */}
          <div className="border-t border-zinc-900 pt-4.5 space-y-3 font-mono text-[10px] text-zinc-500 select-none">
            <div className="flex justify-between">
              <span>SYSTEM SOLVE RANK</span>
              <span className="text-emerald-400 font-bold">Accepted ✔ (Rank #{project.rank})</span>
            </div>
            <div className="flex justify-between">
              <span>SANDBOX RUNTIME</span>
              <span className="text-sky-400 font-bold">{project.stats.runtime}</span>
            </div>
            <div className="flex justify-between">
              <span>DOCKER MEM LIMIT</span>
              <span className="text-sky-400 font-bold">{project.stats.memory}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Step Contents Display Panel */}
        <div className="md:col-span-2 border border-zinc-900 bg-[#090a0d]/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none min-h-0 scrollbar-thin scrollbar-thumb-zinc-800">
          
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <AnimatePresence mode="wait">
              <div key={presentationStep}>
                {renderStepContent()}
              </div>
            </AnimatePresence>
          </div>

          {/* Prev / Next controls */}
          <div className="flex justify-between items-center border-t border-zinc-900 mt-8 pt-4.5 shrink-0 select-none">
            <button
              onClick={() => handleStepChange("prev")}
              disabled={presentationStep === "problem"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft size={12} />
              Previous Section
            </button>

            <button
              onClick={() => handleStepChange("next")}
              disabled={presentationStep === "demo"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next Section
              <ArrowRight size={12} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
