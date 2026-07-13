"use client";

import { useOSStore } from "@/stores/useOSStore";
import { BootLoader } from "@/components/animations/BootLoader";
import { RecruiterView } from "@/components/layout/RecruiterView";
import { DeveloperView } from "@/components/layout/DeveloperView";
import { PresentationView } from "@/components/layout/PresentationView";
import { Terminal, Shield, Laptop, Server, Award, ChevronRight } from "lucide-react";
import React from "react";

export default function Home() {
  const { isBooted, mode, setMode } = useOSStore();

  if (!isBooted) {
    return <BootLoader />;
  }

  return (
    <div className="min-h-screen bg-[#060709] text-zinc-100 flex flex-col antialiased relative overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Floating particles background (pure CSS GPU-accelerated) */}
      <div className="absolute inset-0 -z-50 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      {/* Global Top Menu Bar */}
      <header className="h-14 bg-[#090a0d] border-b border-zinc-900 px-4 md:px-8 flex items-center justify-between shrink-0 select-none sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-black text-xs font-mono">
              A
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-tight text-white font-mono leading-none">DevOS // Adarsh</span>
              <span className="text-[9px] font-bold text-zinc-500 font-mono tracking-wider leading-none mt-1">PROJECT HELIOS v1.0</span>
            </div>
          </div>
        </div>

        {/* Dynamic Mode Switcher (Tab System) */}
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900 select-none">
          <button
            onClick={() => setMode("recruiter")}
            className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === "recruiter"
                ? "bg-zinc-900 text-emerald-400 font-extrabold border border-zinc-850"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Shield size={12} className={mode === "recruiter" ? "text-emerald-400" : "text-zinc-500"} />
            Recruiter Mode
          </button>
          
          <button
            onClick={() => setMode("developer")}
            className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === "developer"
                ? "bg-zinc-900 text-[#6db33f] font-extrabold border border-zinc-850"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Terminal size={12} className={mode === "developer" ? "text-[#6db33f]" : "text-zinc-500"} />
            Developer Mode
          </button>

          <button
            onClick={() => setMode("presentation")}
            className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === "presentation"
                ? "bg-zinc-900 text-sky-400 font-extrabold border border-zinc-850"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Laptop size={12} className={mode === "presentation" ? "text-sky-400" : "text-zinc-500"} />
            Interview Mode
          </button>
        </div>

        {/* Connection status pills */}
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>JVM: Active (v21)</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4">
            <Server size={10} className="text-zinc-500" />
            <span>git://ARBiradar</span>
          </div>
        </div>
      </header>

      {/* Primary viewport content */}
      <main className="flex-1 flex flex-col relative py-6 min-h-0 select-text">
        {mode === "recruiter" && <RecruiterView />}
        {mode === "developer" && <DeveloperView />}
        {mode === "presentation" && <PresentationView />}
      </main>

      {/* Global Status/Footer bar */}
      <footer className="h-8 bg-[#090a0d] border-t border-zinc-900 px-4 md:px-8 flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[#6db33f] font-bold">✔</span>
            <span>Compile status: Success</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Region: AP-SOUTH-1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Encoding: UTF-8</span>
          <span>Java SE 17</span>
        </div>
      </footer>

    </div>
  );
}
