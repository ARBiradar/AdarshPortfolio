"use client";

import { useEffect, useState, useRef } from "react";
import { useOSStore } from "@/stores/useOSStore";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Cpu, Server, ShieldCheck, Database, HardDrive, CheckCircle2 } from "lucide-react";

const BOOT_LOGS = [
  { text: "Initializing bootloader v1.0.4...", type: "system", icon: Cpu },
  { text: "Detected OS: DevOS x86_64", type: "system", icon: HardDrive },
  { text: "Booting JVM version 21.0.2+13-LTS...", type: "jvm", icon: Server },
  { text: "JVM Memory Allocated: Max=2048MB, Min=512MB", type: "jvm", icon: Database },
  { text: "Loading Spring Boot Core Context...", type: "spring", icon: Server },
  { text: "Initializing bean factory: DefaultListableBeanFactory", type: "spring", icon: Server },
  { text: "Creating shared instance of singleton bean 'securityFilterChain'", type: "security", icon: ShieldCheck },
  { text: "Configuring reactive connection pool to Redis cluster...", type: "db", icon: Database },
  { text: "Establishing secure handshake with GitHub API...", type: "github", icon: ShieldCheck },
  { text: "Syncing competitive-programming statistics (LeetCode, GFG)...", type: "stats", icon: CheckCircle2 },
  { text: "Spinning up interactive terminal session...", type: "terminal", icon: Terminal },
  { text: "Loading IDE configurations & workspace projects...", type: "ide", icon: HardDrive },
  { text: "DevOS initialized successfully. Booting desktop environment.", type: "system", icon: CheckCircle2 }
];

export function BootLoader() {
  const setBooted = useOSStore((state) => state.setBooted);
  const [logIndex, setLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const delay = logIndex === 4 || logIndex === 7 ? 600 : 150; // pause on heavy operations
      const timer = setTimeout(() => {
        const timestamp = new Date().toISOString().slice(11, 19);
        const prefix = `[${timestamp}] INFO --- `;
        const newLog = `${prefix}${BOOT_LOGS[logIndex].text}`;
        setLogs((prev) => [...prev, newLog]);
        setLogIndex((prev) => prev + 1);
        setProgress(Math.round(((logIndex + 1) / BOOT_LOGS.length) * 100));
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setBooted(true);
      }, 500);
      return () => clearTimeout(finalTimer);
    }
  }, [logIndex, setBooted]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono text-zinc-300 select-none p-4 md:p-8">
      {/* Background soft grids/glowing lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative w-full max-w-3xl flex flex-col h-[75vh] border border-zinc-800 bg-[#070708] rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Console Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0e12] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="text-xs text-zinc-500 ml-2">devos_bootloader.sh</span>
          </div>
          <button
            onClick={() => setBooted(true)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-lg border border-zinc-700 transition duration-150 active:scale-95"
          >
            <Play size={10} className="fill-current" />
            Skip Boot
          </button>
        </div>

        {/* Console Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-2.5 text-xs md:text-sm scrollbar-thin scrollbar-thumb-zinc-800">
          {/* Spring Boot Banner */}
          {logIndex > 3 && (
            <motion.pre
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#6db33f] font-bold leading-none mb-6 text-center select-none text-[8px] md:text-xs"
            >
              {`
  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v3.2.4)
              `}
            </motion.pre>
          )}

          {/* Log Lines */}
          <div className="space-y-1.5">
            {logs.map((log, index) => {
              // Extract log message mapping styles
              let textColor = "text-zinc-400";
              if (log.includes("JVM")) textColor = "text-amber-400/90";
              if (log.includes("Spring")) textColor = "text-emerald-400/90";
              if (log.includes("Redis") || log.includes("bean")) textColor = "text-sky-400/90";
              if (log.includes("GitHub") || log.includes("security")) textColor = "text-indigo-400/90";
              if (log.includes("initialized")) textColor = "text-green-400 font-bold";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-start gap-2.5 ${textColor}`}
                >
                  <span className="text-zinc-600 font-normal">{(index + 1).toString().padStart(2, "0")}</span>
                  <span className="flex-1 whitespace-pre-wrap">{log}</span>
                </motion.div>
              );
            })}
            <div ref={consoleEndRef} />
          </div>
        </div>

        {/* Boot Footer / Progress Bar */}
        <div className="p-4 bg-[#0d0e12] border-t border-zinc-800 flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {progress < 100 ? "Compiling source files..." : "Boot complete!"}
            </span>
            <span className="font-semibold text-emerald-400">{progress}%</span>
          </div>
          
          {/* Progress track */}
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
