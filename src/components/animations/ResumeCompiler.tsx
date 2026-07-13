"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, CheckCircle } from "lucide-react";

interface ResumeCompilerProps {
  isOpen: boolean;
  onComplete: () => void;
}

const COMPILE_STEPS = [
  "Initializing resume compiler context...",
  "Querying MongoDB Profile collection...",
  "Loading dependency tree: 'spring-security', 'aws-sdk-ecs'...",
  "Formulating education log and certificate validation matrices...",
  "Parsing projects metadata (cloudstream, devdock, coreengine)...",
  "Rendering PDF elements using OpenPDF stream serializers...",
  "Optimizing font files (JetBrains Mono, Inter)...",
  "Resume compiled successfully! Stream ready."
];

export function ResumeCompiler({ isOpen, onComplete }: ResumeCompilerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setLogs([]);
      setProgress(0);
      return;
    }

    // Progress bar loop
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        // fast compile
        return prev + 5;
      });
    }, 80);

    // Logging steps loop
    const logInterval = setInterval(() => {
      if (stepIndex < COMPILE_STEPS.length) {
        setLogs((prev) => [...prev, `[compiling] ${COMPILE_STEPS[stepIndex]}`]);
        setStepIndex((prev) => prev + 1);
      } else {
        clearInterval(logInterval);
      }
    }, 180);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logInterval);
    };
  }, [isOpen, stepIndex]);

  // Handle completion trigger
  useEffect(() => {
    if (progress === 100 && stepIndex >= COMPILE_STEPS.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(finalTimer);
    }
  }, [progress, stepIndex, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg border border-zinc-800 bg-[#0d0e12] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[350px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#07080a] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#6db33f]" />
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">compiler.sh</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {/* Console Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-1.5 text-xs text-zinc-400 scrollbar-thin scrollbar-thumb-zinc-800">
          {logs.map((log, index) => {
            const isSuccess = log.includes("successfully");
            return (
              <div 
                key={index} 
                className={`flex items-start gap-2 ${isSuccess ? "text-emerald-400 font-bold" : ""}`}
              >
                <span className="text-zinc-600 select-none">&gt;&gt;</span>
                <span className="whitespace-pre-wrap">{log}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Footer */}
        <div className="p-4 bg-[#07080a] border-t border-zinc-800 space-y-2 select-none">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Cpu size={12} className="animate-spin text-zinc-500" />
              {progress < 100 ? "Compiling Resume PDF..." : "Compilation complete!"}
            </span>
            <span className="text-emerald-400">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
            ></div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
