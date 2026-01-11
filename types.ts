
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
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
