
export interface Experience {
  company: string;
  period: string; // The overall period at the company
  location: string;
  description: string[];
  skills: string[];
  roleHistory: {
    role: string;
    period: string;
  }[]; // The primary source for role details and progression
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  logo?: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}
