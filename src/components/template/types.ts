/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  templateId?: string;
  contact: Contact;
  experience: Experience[];
  education: Education[];
  skills: string[] | Skills[];
  language?: string[] | Skills[];
  projects?: Project[];
  [key: string]: any; // For additional properties
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
  location?: string;
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

export type Level = 1 | 2 | 3 | 4 | 5;
export interface Skills {
  name: string;
  level: Level;
  subtitle?: string;
}

export interface Project {
  name: string;
  startDate?: string;
  endDate?: string;
  description: string | string[];
  tech: string[];
  live?: string;
  code?: string;
}

export type TemplateType = "classic" | "modern" | "tailored" | "colored";

export type TemplateProps = {
  id: number;
  title: string;
  preview: string;
  value: TemplateType;
};

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  createdAt: Date;
  updatedAt: Date;
  resume?: ResumeData;
  resumeId?: string;
}

export interface UserContact {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}
