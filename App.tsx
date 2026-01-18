
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EXPERIENCES, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION } from './data.ts';
import { Experience, Project, SkillCategory, Certification, EducationItem } from './types.ts';

/**
 * Robust Tenure Calculation
 * Handles various dash types and ensures the "Years + Months" format.
 */
const calculateTenure = (period: string) => {
  if (!period || typeof period !== 'string') return "";
  
  // Split by any dash type: hyphen (-), en-dash (–), or em-dash (—)
  const parts = period.split(/\s*[\u2013\u2014-]\s*/);
  if (parts.length < 1) return "";

  const startStr = parts[0]?.trim();
  const endStr = parts[1]?.trim() || 'Present';

  const parseDate = (str: string) => {
    if (!str) return new Date();
    if (str.toLowerCase() === 'present') return new Date();
    
    const dateParts = str.split(/\s+/);
    if (dateParts.length === 2) {
      // Format: "Month Year"
      return new Date(`${dateParts[0]} 1, ${dateParts[1]}`);
    } else if (dateParts.length === 1) {
      // Format: "Year"
      return new Date(`January 1, ${dateParts[0]}`);
    }
    return new Date();
  };

  const start = parseDate(startStr);
  const end = parseDate(endStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  // Inclusive of the starting month
  months = Math.max(1, months + 1);
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yPart = years > 0 ? `${years}Y` : "";
  const mPart = remainingMonths > 0 ? `${remainingMonths}M` : (years === 0 ? "1M" : "");
  
  return `${yPart} ${mPart}`.trim();
};

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-purple-900/30 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          <span className="text-purple-500 font-mono italic">EF</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">About</a>
          <a href="#education" onClick={(e) => scrollToSection(e, 'education')} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Education</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Skills</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Experience</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Projects</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">Get In Touch</a>
        </div>
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="text-purple-400 text-sm md:text-base font-mono tracking-[0.3em] block mb-4 uppercase">
            Hello! Welcome to the portfolio of
          </span>
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none text-white mb-8">
            Easha <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Fernandes</span>
          </h1>
        </div>
        <p className="text-xl md:text-3xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light italic">
          "I create systems that grow faster than my coffee intake and get LLMs to do things they didn't know they could."
        </p>
        {/* <div className="flex justify-center">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-12 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
            Contact Me
          </a>
        </div> */}
      </div>
    </section>
  );
};

const SkillCard: React.FC<{ category: SkillCategory }> = ({ category }) => (
  <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-purple-500/50 transition-all group backdrop-blur-sm">
    <div className="w-16 h-16 rounded-2xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300 shadow-lg">
      <i className={`fa-solid ${category.icon} text-2xl text-purple-400 group-hover:text-white`}></i>
    </div>
    <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill, i) => (
        <span key={i} className="px-3 py-1 rounded-lg bg-slate-800/30 text-slate-400 text-xs border border-slate-700/50 group-hover:border-purple-500/30 transition-colors">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const EducationCard: React.FC<{ edu: EducationItem }> = ({ edu }) => (
  <div className="flex flex-col sm:flex-row gap-6 items-center p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/50 hover:border-purple-500/30 transition-all group shadow-xl">
    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center shrink-0 p-2 shadow-inner group-hover:scale-105 transition-transform">
      <img 
        src={edu.logo} 
        alt={edu.school} 
        className="max-w-full max-h-full object-contain"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=EDU'; }}
      />
    </div>
    <div className="text-center sm:text-left">
      <p className="text-base font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">{edu.degree}</p>
      <p className="text-sm text-slate-400 mt-1 font-medium">{edu.school}</p>
      <p className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest">{edu.period}</p>
    </div>
  </div>
);

const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => (
  <div className="p-4 rounded-[2rem] bg-slate-900/30 border border-slate-800/50 hover:border-purple-500/30 transition-all group shadow-xl">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-xl bg-purple-900/20 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-600 transition-colors mb-4">
        <i className="fa-solid fa-award text-purple-400 group-hover:text-white"></i>
      </div>
      <span className="text-[10px] text-slate-600 font-mono italic">{cert.date}</span>
    </div>
    <p className="text-base font-bold text-white leading-tight group-hover:text-purple-400 transition-colors mb-2">{cert.name}</p>
    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{cert.issuer}</p>
  </div>
);

const TimelineItem: React.FC<{ exp: Experience }> = ({ exp }) => {
  const timeline = exp.roleHistory || [];
  const [activeIndex, setActiveIndex] = useState(timeline.length - 1);
  const currentView = timeline[activeIndex];
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const totalTenureString = useMemo(() => {
    if (!timeline.length) return "";
    const startPeriod = timeline[0].period.split(/\s*[\u2013\u2014-]\s*/)[0]?.trim() || "";
    const lastPeriodStr = timeline[timeline.length - 1].period;
    const endPeriod = lastPeriodStr.split(/\s*[\u2013\u2014-]\s*/)[1]?.trim() || 'Present';
    return calculateTenure(`${startPeriod} – ${endPeriod}`);
  }, [timeline]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wheelRef.current || timeline.length <= 1) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    const segmentSize = 360 / timeline.length;
    const index = Math.floor(angle / segmentSize);
    if (index >= 0 && index < timeline.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(timeline.length - 1);
  };

  const isInteractive = timeline.length > 1;

  return (
    <div className="relative pl-12 pb-32 last:pb-12 group">
      {/* Timeline Line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-800 group-last:bg-transparent"></div>
      
      {/* Timeline Point */}
      <div className="absolute left-0 top-3 w-4 h-4 rounded-full z-10 bg-purple-500 border-2 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"></div>
      
      <div className="flex flex-col gap-10">
        {/* TOP HEADER: Total Tenure Only */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[14px] font-bold tracking-[0.4em] text-purple-400 uppercase">
                PERIOD: {totalTenureString || "STINT"}
              </span>
              <span className="w-12 h-[1px] bg-slate-800"></span>
              <span className="font-mono text-[14px] font-bold tracking-[0.4em] text-purple-400 uppercase">
                {exp.period}
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">
              {exp.company}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-10px] uppercase tracking-[0.2em] mt-3">
              <i className="fa-solid fa-location-dot text-purple-500/40"></i>
              {exp.location}
            </div>
          </div>
        </div>

        {/* INTERACTIVE WORKSPACE */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start">
          
          {/* THE COMMAND DIAL (Slightly Smaller) */}
          <div className="relative shrink-0 pt-4 flex flex-col items-center">
            <div 
              ref={wheelRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative w-64 h-64 md:w-72 md:h-72 rounded-full border transition-all duration-700 flex items-center justify-center ${isInteractive ? 'cursor-none border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(168,85,247,0.1)]' : 'border-slate-800/50'}`}
            >
              {/* Spinning Decorative Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/5 animate-[spin_40s_linear_infinite]"></div>
              
              {/* History Progress Track */}
              {isInteractive && (
                <div 
                  className="absolute inset-1 rounded-full border-t-2 border-purple-500/60 transition-transform duration-300 ease-out pointer-events-none"
                  style={{ transform: `rotate(${(activeIndex / timeline.length) * 360}deg)` }}
                ></div>
              )}

              {/* Selection Nodes */}
              {isInteractive && timeline.map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-full h-full pointer-events-none"
                  style={{ transform: `rotate(${(i / timeline.length) * 360}deg)` }}
                >
                  <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-purple-500 scale-125 shadow-[0_0_15px_rgba(168,85,247,0.8)]' : 'bg-slate-800 border border-slate-700'}`}></div>
                </div>
              ))}

              {/* CENTRAL HUB: Title Inside Wheel (Smaller font) */}
              <div className="w-[84%] h-[84%] rounded-full bg-slate-950/90 backdrop-blur-xl border border-slate-800/40 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group/hub">
                {/* HUD Metadata */}
                {/* <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-slate-600 tracking-[0.3em] uppercase whitespace-nowrap">
                   {isInteractive ? `NODE 0${activeIndex + 1}` : 'ACTIVE MODULE'}
                </div> */}
                
                <div className="relative z-10 w-full">
                  <p key={activeIndex} className="font-mono italic uppercase text-white text-base md:text-lg leading-tight tracking-wide animate-in fade-in zoom-in-95 duration-500">
                    {currentView.role}
                  </p>
                  <div className="h-[1px] w-8 bg-purple-500/20 mx-auto mt-4"></div>
                  <p className="font-mono text-[10px] text-purple-400/70 mt-3 tracking-widest uppercase">
                    {currentView.period}
                  </p>
                </div>

                {/* Grid FX */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6d28d9 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
              </div>
            </div>
            
            {/* {isInteractive && (
              <div className="mt-4 font-mono text-[8px] text-slate-600 uppercase tracking-[0.4em] opacity-40 animate-pulse">
                View Dial for History
              </div>
            )} */}
          </div>

          {/* IMPACT LOGS (Right Side) */}
          <div className="flex-grow pt-4">
            <div className="mb-10">
              <h4 className="font-mono text-[12px] text-slate-600 tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-slate-800"></span> Contributions
              </h4>
              <div className="space-y-8">
                {exp.description.map((d, i) => (
                  <div key={i} className="flex gap-6 group/impact">
                    <span className="text-slate-800 font-mono text-[12px] mt-1.5 shrink-0 group-hover/impact:text-purple-500/50 transition-colors">[{i+1}]</span>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {exp.skills.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-slate-900/40 text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] border border-slate-800/50 hover:border-purple-500/20 hover:text-slate-300 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group rounded-[2.5rem] p-1 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-purple-500/20 hover:to-indigo-500/20 transition-all h-full shadow-2xl">
    <div className="bg-slate-950 rounded-[2.4rem] p-8 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:bg-purple-600 transition-colors">
          <i className="fa-solid fa-code text-slate-400 group-hover:text-white"></i>
        </div>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">
            <i className="fa-brands fa-github text-3xl"></i>
          </a>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map(t => (
          <span key={t} className="px-2 py-1 rounded-md bg-slate-900 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-800">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      
      {/* 01. Identity */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="p-12 md:p-16 rounded-[3.5rem] bg-slate-900/30 border border-slate-800 shadow-3xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <span className="text-purple-500 font-mono text-sm tracking-[0.3em] uppercase">01. Identity</span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Operating from Mumbai, IN</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-10 text-white tracking-tight leading-none">Okay, But Who Am I?</h2>
          
          <div className="max-w-4xl">
            <div className="space-y-6 text-slate-400 leading-relaxed text-xl font-light">
              <p>
                I'm a <span className="text-white font-bold italic">Software Engineer</span> with 3+ years of experience building scalable backend systems in Python and Node.js, and more recently, designing AI-powered workflows that turn complex processes into intelligent, LLM-driven experiences.
              </p>
              <p>
                Currently at <span className="text-white font-bold italic">Sia</span>, I'm pioneering production-grade AI services, building tools that make everyday work faster, smarter, and less repetitive.
              </p>
              <p>
                Somewhere between distributed systems and large language models, I've developed a habit of waking up with solutions to whatever I'm building — and then turning them into working code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Academic Foundation - Re-designed Side-by-Side */}
      <section id="education" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="mb-16">
          <span className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 block uppercase">02. Academic Foundation</span>
          <h2 className="text-5xl font-black text-white">Education & Training</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Education */}
          <div className="space-y-10">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-purple-900"></span> Formal Education
            </h3>
            <div className="space-y-6">
              {EDUCATION.map((edu, i) => <EducationCard key={i} edu={edu} />)}
            </div>
          </div>

          {/* Right Column: Training (Redesigned to match left) */}
          <div className="space-y-10">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-purple-900"></span> Training and Certifications
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {CERTIFICATIONS.map((cert, i) => <CertificationCard key={i} cert={cert} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 03. Toolkit */}
      <section id="skills" className="py-24 px-6 bg-slate-950/80 backdrop-blur-sm scroll-mt-20 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 block uppercase">03. Skillset</span>
            <h2 className="text-5xl md:text-6xl font-black text-white">My Technical Jar of Tricks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILL_CATEGORIES.map((cat, i) => <SkillCard key={i} category={cat} />)}
          </div>
        </div>
      </section>

      {/* 04. Career Track */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="mb-20">
          <span className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 block uppercase">04. Career Track</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">Professional Journey</h2>
        </div>
        <div className="mt-16 ml-2 md:ml-6">
          {EXPERIENCES.map((exp, i) => <TimelineItem key={i} exp={exp} />)}
        </div>
      </section>

      {/* 05. Showcase */}
      <section id="projects" className="py-24 px-6 bg-slate-950 scroll-mt-20 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 block uppercase">05. Showcase</span>
              <h2 className="text-5xl md:text-6xl font-black text-white">Project Labs</h2>
            </div>
            <a href="https://github.com/eashafernandes" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-slate-800 text-slate-400 font-bold hover:text-white hover:border-purple-500 transition-all flex items-center gap-3">
              Explore All <i className="fa-brands fa-github text-xl"></i>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project, i) => <ProjectCard key={i} project={project} />)}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto text-center scroll-mt-20">
        <div className="relative p-16 md:p-24 rounded-[4rem] bg-slate-900 border border-slate-800 shadow-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
          
          <span className="text-purple-400 font-mono text-xs tracking-[0.4em] mb-8 block uppercase">Let's Build Something</span>
          <h2 className="text-5xl md:text-8xl font-black mb-16 text-white tracking-tighter">Get In Touch</h2>
          
          <div className="flex flex-wrap justify-center gap-10 items-center">
            <a href="mailto:easha.ferns@gmail.com" className="w-20 h-20 rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-3xl text-purple-400 hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-3 shadow-2xl">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="https://linkedin.com/in/easha-fernandes" target="_blank" rel="noopener noreferrer" className="w-20 h-20 rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-3xl text-purple-400 hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-3 shadow-2xl">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/eashafernandes" target="_blank" rel="noopener noreferrer" className="w-20 h-20 rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-3xl text-purple-400 hover:bg-white hover:text-slate-950 transition-all transform hover:-translate-y-3 shadow-2xl">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
          <p className="mt-16 text-slate-500 font-mono text-sm tracking-[0.2em] uppercase">easha.ferns@gmail.com</p>
        </div>
      </section>

      <footer className="py-16 px-6 text-center text-slate-700 text-[10px] tracking-[0.4em] uppercase font-mono border-t border-slate-900">
        <p>&copy; {new Date().getFullYear()} Easha Fernandes</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen selection:bg-purple-600 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
