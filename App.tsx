
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EXPERIENCES, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION } from './data.ts';
import { Experience, Project, SkillCategory, Certification, EducationItem } from './types.ts';

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

const TimelineItem: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="relative pl-12 pb-16 last:pb-0 group">
    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-800 group-last:bg-transparent transition-colors group-hover:bg-purple-900/50"></div>
    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-purple-500 group-hover:bg-purple-500 z-10 transition-all shadow-[0_0_15px_rgba(168,85,247,0)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
    
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3">
        <span className="text-purple-500 font-mono text-xs font-bold tracking-[0.2em] uppercase">{exp.period}</span>
        <h3 className="text-2xl font-black text-white mt-2 leading-tight">{exp.company}</h3>
        <p className="text-slate-500 text-sm font-semibold mt-1 uppercase tracking-widest italic">{exp.role}</p>
      </div>
      <div className="lg:w-2/3">
        <ul className="space-y-4">
          {exp.description.map((d, i) => (
            <li key={i} className="text-slate-400 text-base leading-relaxed flex items-start gap-4">
              <span className="text-purple-600 font-black mt-1.5 text-xs shrink-0 opacity-50">0{i+1}</span>
              <span className="flex-1">{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {exp.skills.map(s => (
            <span key={s} className="px-3 py-1 rounded-lg bg-slate-900 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-800 group-hover:border-purple-900/50 transition-colors">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

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
