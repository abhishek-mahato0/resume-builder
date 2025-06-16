export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
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

export interface Project {
  name: string;
  description: string;
  tech: string[];
  live?: string;
  code?: string;
}
