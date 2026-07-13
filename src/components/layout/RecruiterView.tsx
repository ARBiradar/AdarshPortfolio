"use client";

import { useOSStore } from "@/stores/useOSStore";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EXPERIENCES } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { CERTIFICATES } from "@/data/certificates";
import { SOCIALS } from "@/data/socials";
import { motion } from "framer-motion";
import { 
  Mail, 
  Terminal, 
  FileText, 
  Cpu, 
  Server, 
  Database, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Code2
} from "lucide-react";

const renderSocialIcon = (platform: string, size: number) => {
  if (platform === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>
    );
  }
  if (platform === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    );
  }
  return <Code2 size={size} />;
};
import React, { useState } from "react";

export function RecruiterView() {
  const { setMode, openTab } = useOSStore();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1200);
  };

  const handleOpenProject = (id: string, title: string) => {
    setMode("presentation");
    openTab(title, `projects/${id}`, "file");
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-16 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center gap-6 mt-6 md:mt-12 select-none">
        {/* Decorative Grid Backdrop */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:3rem_3rem] rounded-3xl [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="px-3.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Available for Senior Backend Roles
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-2">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 font-extrabold">{PROFILE.name}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-medium mt-2 leading-relaxed">
            {PROFILE.heroLine}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-4"
        >
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/20 border border-emerald-400/20 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <FileText size={18} />
            Download Resume
          </a>
          
          <button
            onClick={() => setMode("developer")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-zinc-100 font-semibold border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Terminal size={18} className="text-[#6db33f]" />
            Launch Developer OS
          </button>
        </motion.div>

        {/* Quick statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md rounded-2xl p-6 mt-10"
        >
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">{PROFILE.stats.problemsSolved}+</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">LeetCode Solves</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-sky-400">{PROFILE.stats.totalCommits}+</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">GitHub Commits</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-amber-400">{PROFILE.stats.streakDays} Days</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Active Streak</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-indigo-400">{PROFILE.stats.globalRank}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">LeetCode Rank</p>
          </div>
        </motion.div>
      </section>

      {/* 2. Core Projects Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
            Featured Production Projects
          </h2>
          <p className="text-zinc-500 text-sm">Engineered for scaling, reliability, and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group border border-zinc-800/80 bg-[#0d0e12] rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/80 hover:bg-zinc-900/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 rounded-full font-mono">
                    RANK #{project.rank}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full font-mono flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-150">
                  {project.title}
                </h3>
                <p className="text-xs text-emerald-500 font-mono font-medium mt-1">{project.role}</p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 bg-zinc-800/60 text-zinc-300 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-800/60 text-zinc-500 font-mono">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-800/80 mt-6 pt-4 flex justify-between items-center select-none">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-600 font-semibold uppercase">Runtime / Memory</span>
                  <span className="text-xs text-zinc-400 font-mono font-medium">
                    {project.stats.runtime} / {project.stats.memory}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenProject(project.id, project.title)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-white transition duration-150 group/btn cursor-pointer"
                >
                  Inspect System
                  <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Skills Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
            Technical Capabilities
          </h2>
          <p className="text-zinc-500 text-sm">Centralized toolkit representing full-stack competence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category 1: Languages */}
          <div className="border border-zinc-800/60 bg-[#0b0c0f] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 border-b border-zinc-850 pb-2.5">
              <Code2 size={18} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Languages</h3>
            </div>
            <div className="space-y-2">
              {SKILLS.filter(s => s.category === "Language").slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{skill.expertise}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Frameworks */}
          <div className="border border-zinc-800/60 bg-[#0b0c0f] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 border-b border-zinc-850 pb-2.5">
              <Server size={18} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Frameworks</h3>
            </div>
            <div className="space-y-2">
              {SKILLS.filter(s => s.category === "Framework").slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{skill.expertise}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: Cloud & Databases */}
          <div className="border border-zinc-800/60 bg-[#0b0c0f] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 border-b border-zinc-850 pb-2.5">
              <Database size={18} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Cloud & DB</h3>
            </div>
            <div className="space-y-2">
              {SKILLS.filter(s => s.category === "Cloud & DevOps" || s.category === "Database & Cache").slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{skill.expertise}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 4: Tools & Testing */}
          <div className="border border-zinc-800/60 bg-[#0b0c0f] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 border-b border-zinc-850 pb-2.5">
              <Cpu size={18} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Tools & QA</h3>
            </div>
            <div className="space-y-2">
              {SKILLS.filter(s => s.category === "Testing & Tools").slice(0, 4).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">{skill.name}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{skill.expertise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience & Certificates Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 cols: Professional History */}
        <section className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
              Work History
            </h2>
            <p className="text-zinc-500 text-sm">Career trajectory and major system achievements.</p>
          </div>

          <div className="space-y-6 relative border-l border-zinc-800 pl-6 ml-2.5">
            {EXPERIENCES.map((exp, expIdx) => (
              <div key={exp.id} className="relative group">
                {/* Timeline dot */}
                <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border border-zinc-800 bg-zinc-950 group-hover:bg-emerald-400 group-hover:border-emerald-400/40 transition duration-150"></span>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-150">
                    {exp.role}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 bg-zinc-800/40 border border-zinc-800 rounded-full font-semibold text-zinc-400">
                    {exp.company}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 ml-auto">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                </div>

                <p className="text-xs text-zinc-500 font-medium flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {exp.location}
                </p>

                <ul className="list-disc list-outside text-sm text-zinc-400 mt-4 pl-4 space-y-2 leading-relaxed">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>

                {/* Tech tags used in role */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.technologies.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-zinc-850 text-zinc-400 rounded-md font-mono border border-zinc-800/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right col: Certifications */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
              Certificates
            </h2>
            <p className="text-zinc-500 text-sm">Industry verified credentials.</p>
          </div>

          <div className="space-y-4">
            {CERTIFICATES.map((cert, certIdx) => (
              <div 
                key={certIdx} 
                className="border border-zinc-800/60 bg-[#0a0a0d] p-4 rounded-xl flex items-start gap-3 hover:border-zinc-700 transition"
              >
                <CheckCircle size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-zinc-200 truncate">{cert.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{cert.issuer} | {cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. Contact Section */}
      <section id="contact" className="border border-zinc-800/60 bg-[#090a0d]/40 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden select-none">
        
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white">Let's start a conversation.</h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed max-w-md">
              Whether you are looking to recruit a senior developer, have questions about my Spring architectures, or just want to chat Java engineering—drop me a line.
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Direct Email</span>
                <button 
                  onClick={copyEmail}
                  className="text-xs font-semibold text-zinc-200 hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  {copied ? "Copied to clipboard!" : PROFILE.email}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Current Residence</span>
                <span className="text-xs font-semibold text-zinc-200">{PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-3 select-none">
            {SOCIALS.filter(s => s.platform !== "Email").map((social, idx) => {
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white flex items-center justify-center text-zinc-400 transition"
                  title={social.platform}
                >
                  {renderSocialIcon(social.platform, 16)}
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContactSubmit} className="bg-zinc-950/80 border border-zinc-900 p-6 rounded-2xl space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm outline-none focus:border-emerald-500 transition"
              placeholder="Elon Musk"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm outline-none focus:border-emerald-500 transition"
              placeholder="elon@spacex.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm outline-none focus:border-emerald-500 transition resize-none"
              placeholder="Hi Adarsh, let's set up an interview..."
            />
          </div>

          <button
            type="submit"
            disabled={formStatus !== "idle"}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white transition duration-150 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed select-none cursor-pointer"
          >
            {formStatus === "idle" && "Send Message"}
            {formStatus === "sending" && "Sending log context..."}
            {formStatus === "success" && "Message Sent ✔"}
          </button>
        </form>
      </section>

    </div>
  );
}
