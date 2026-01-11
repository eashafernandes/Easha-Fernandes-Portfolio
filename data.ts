
import { Experience, Project, SkillCategory, EducationItem, Certification } from './types.ts';

export const EXPERIENCES: Experience[] = [
  {
    company: "Sia",
    role: "Software Engineer",
    period: "June 2025 – Present",
    description: [
      "Contributing to technical initiatives at Sia’s newly established AI Development Hub in Mumbai.",
      "Developing and scaling AI-powered services using Python for production-grade generative applications.",
      "Designing backend architectures that support high-throughput, low-latency AI services at scale."
    ],
    skills: ["Python", "FastAPI", "LangChain", "Generative AI", "Docker", "Postgres"]
  },
  {
    company: "Servify",
    role: "Software Engineer – Generative AI",
    period: "March 2025 – June 2025",
    description: [
      "Researched and developed Generative AI solutions to automate internal workflows and enhance day-to-day business operations.",
      "Built and evaluated Agentic RAG systems using Large Language Models to transform UI-driven customer support into LLM-powered experiences.",
      "Integrated AI frameworks and vector-based retrieval to improve response accuracy, speed, and system reliability."

    ],
    skills: ["Generative AI", "Python", "Ollama", "StreamLit", "Postgres", "Redis"]
  },
  {
    company: "Credence Analytics",
    role: "Assistant Consultant – Software Engineer",
    period: "Feb 2022 – Nov 2024",
    description: [
      "Led backend feature development for a fintech platform serving NBFCs, improving security, performance, and readiness.",
      "Provided end-to-end production support (L1–L4), resolving critical issues and ensuring high system reliability across client deployments.",
      "Streamlined backend workflows and deployment processes through improved documentation, debugging practices, and API design."

    ],
    skills: ["Python", "Node.js", "Oracle SQL", "Deployment and Support"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Quote Generator (2025)",
    description: "An AI-powered Chat Bot that generates personalized quotes based on user topic or mood using Gemini/OpenAI APIs.",
    tech: ["Python", "Gemini API", "Streamlit"],
    github: "https://github.com/eashafernandes/quote-generator",
    image: ""
  },
  {
    title: "To-Do App (2022)",
    description: "A full-featured CRUD API built with Node.js to manage high-concurrency task lists.",
    tech: ["Node.js", "Express"],
    github: "https://github.com/eashafernandes/To-Do-Web-Application",
    image: ""
  },
  {
    title: "EDA on Amazon Bestsellers",
    description: "Comprehensive Exploratory Data Analysis using Python to uncover trends in market-leading publications.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/eashafernandes/EDA-On-Amazon-Bestsellers-2009-to-2019",
    image: ""
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Artificial Intelligence",
    skills: ["Generative AI", "LangChain", "RAG", "Prompt Engineering", "LLMs", "OpenAI API"],
    icon: "fa-brain"
  },
  {
    title: "Backend & Frameworks",
    skills: ["Python", "Node.js", "FastAPI", "Express", "Microservices", "RESTful APIs", "Emitters / Consumers"],
    icon: "fa-server"
  },
  {
    title: "Data & Infra",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Oracle SQL", "Grafana", "Kubernetes", "Minikube", "Docker", "RabbitMQ", "NGINX"],
    icon: "fa-database"
  },
  {
    title: "Testing & Tools",
    skills: ["PyTest", "Mocha/Chai", "Postman", "JMeter", "GitLab", "Git"],
    icon: "fa-vial"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Machine Learning Fundamentals", issuer: "Alteryx", date: "Feb 2025", link: "https://www.alteryx.com/" },
  { name: "Technology Job Simulation", issuer: "Deloitte Australia", date: "Jan 2025", link: "https://www.theforage.com/" },
  { name: "Certified Node.js Backend Developer", issuer: "Credence Analytics", date: "2023", link: "https://www.credenceanalytics.com/" }
];

export const EDUCATION: EducationItem[] = [
  { 
    degree: "Master of Business Administration (MBA) - Global", 
    school: "UWA & IIM-Kozhikode", 
    period: "2025 – Present",
    logo: "./assets/education/mba_logo.jpg",
    link: "https://www.iimk.ac.in/"
  },
  { 
    degree: "Global Certificate in Data Science", 
    school: "Accredian", 
    period: "2020 – 2021",
    logo: "./assets/education/ds_logo.png",
    link: "https://accredian.com/"
  },
  { 
    degree: "Bachelor of Science (Computer Science)", 
    school: "Thakur College (University of Mumbai)", 
    period: "2017 – 2020",
    logo: "./assets/education/bsc_logo.png",
    link: "https://www.tcsc.edu.in/"
  }
];
