export interface ResumeData {
    name: string;
    title: string;
    summary: string;
    contact: {
      email: string;
      phone?: string;
      website?: string;
      linkedin?: string;
      github?: string;
    };
    experience: {
      company: string;
      role: string;
      startDate: string;
      endDate: string;
      description: string[];
    }[];
    education: {
      school: string;
      degree: string;
      startDate: string;
      endDate: string;
    }[];
    skills: string[];
  
    projects?: {
      name: string;
      description: string;
      tech: string[];
      live?: string;
      code?: string;
    }[];
  }