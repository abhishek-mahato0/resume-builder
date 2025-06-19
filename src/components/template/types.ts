export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: Contact;
  experience: Experience[];
  education: Education[];
  skills: string[] | Skills[];
  language?: string[] | Skills[];
  projects?: Project[];
}

export interface Contact {
  email: string;
  phone: string;
  address?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export type Level = 1 | 2 | 3 | 4 | 4;
export interface Skills {
  name: string;
  level: Level;
  subtitle: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  live?: string;
  code?: string;
}

export type TemplateType = "classic" | "modern" | "tailored";

export type TemplateProps = {
  id: number;
  title: string;
  preview: string;
  value: TemplateType;
};
