import { ResumeData, TemplateProps } from "./types";

export const sampleData: ResumeData = {
  name: "Harry Maguire",
  title: "Full Stack Developer",
  summary: `Enthusiastic MERN stack developer with experience in building scalable applications, optimizing frontend performance, and integrating AI APIs. Passionate about building intuitive user experiences.`,

  contact: {
    email: "harry@gmail.com",
    phone: "+977-9800000000",
    website: "https://harry.dev",
    linkedin: "linkedin.com/in/harry.com",
    github: "github.com/harry-0",
  },

  experience: [
    {
      company: "ABC Intern",
      role: "React Developer",
      startDate: "Jan 2023",
      endDate: "Oct 2023",
      description: [
        "Built modular UI components using React and Redux.",
        "Integrated Maplibre/OpenLayers for geospatial features.",
        "Optimized app performance using memoization and lazy loading.",
      ],
    },
    {
      company: "XYZ Solutions",
      role: "Full Stack Developer",
      startDate: "Nov 2023",
      endDate: "Present",
      description: [
        "Migrated state management from Redux Saga to React Query.",
        "Led the refactor of TypeScript migration for core modules.",
        "Worked on integrating ChatGPT API into enterprise tools.",
      ],
    },
    {
      company: "Tech Innovators",
      role: "Frontend Developer",
      startDate: "Jan 2022",
      endDate: "Dec 2022",
      description: [
        "Developed responsive web applications using React and Tailwind CSS.",
        "Implemented real-time data visualization with custom charts.",
        "Collaborated with designers to enhance user experience.",
      ],
    },
  ],

  education: [
    {
      school: "Tribhuvan University",
      degree: "BSc in Computer Science",
      startDate: "2019",
      endDate: "2023",
    },
  ],
  skills: [
    "React - Expert",
    "TypeScript - Proficient",
    "Node.js - Proficient",
    "MongoDB",
    "Redux",
    "Framer Motion",
    "React Query",
    "Tailwind CSS",
    "OpenAI API",
  ],
  language: ["English - Proficient", "Nepali - Expert", "Hindi - Proficient"],
  projects: [
    {
      name: "ResumeGPT",
      description:
        "A resume builder that tailors resumes using ChatGPT and customizable templates.",
      tech: ["React", "Tailwind", "OpenAI API"],
      live: "https://resume-builder.dev",
      code: "https://resumr/dd",
    },
    {
      name: "GeoDashboard",
      description:
        "A real-time dashboard visualizing geospatial data with MapLibre and custom charts.",
      tech: ["React", "MapLibre", "TypeScript"],
      live: "https://resume-builder.dev",
      code: "https://resumr/dd",
    },
    {
      name: "My Second Teacher Clone",
      description:
        "A learning platform clone with scribble, video notes, and resources system.",
      tech: ["React", "Redux", "Node.js"],
    },
    {
      name: "ResumeGPT",
      description:
        "A resume builder that tailors resumes using ChatGPT and customizable templates.",
      tech: ["React", "Tailwind", "OpenAI API"],
      live: "https://resume-builder.dev",
      code: "https://resumr/dd",
    },
    {
      name: "ResumeGPT",
      description:
        "A resume builder that tailors resumes using ChatGPT and customizable templates.",
      tech: ["React", "Tailwind", "OpenAI API"],
      live: "https://resume-builder.dev",
      code: "https://resumr/dd",
    },
    {
      name: "ResumeGPT",
      description:
        "A resume builder that tailors resumes using ChatGPT and customizable templates.",
      tech: ["React", "Tailwind", "OpenAI API"],
      live: "https://resume-builder.dev",
      code: "https://resumr/dd",
    },
  ],
};

export const templates: TemplateProps[] = [
  {
    id: 1,
    title: "Classic Resume",
    preview: "/templates/classic.png",
    value: "classic",
  },
  {
    id: 2,
    title: "Modern Resume",
    preview: "/templates/modern.png",
    value: "modern",
  },
  {
    id: 3,
    title: "Tailored Modern",
    preview: "/template/tailored.png",
    value: "tailored",
  },
];
