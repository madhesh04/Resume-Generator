
import { Resume, TemplateKey } from './types';

export const sampleResumeData: Resume = {
  personalInfo: {
    name: "Jane Doe",
    title: "Senior Frontend Engineer",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/janedoe",
    github: "github.com/janedoe",
    website: "janedoe.dev",
    summary: "Innovative Senior Frontend Engineer with over 8 years of experience building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating seamless user experiences and writing clean, efficient code.",
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      description: [
        "Led the development of a new customer-facing dashboard using React, TypeScript, and Redux, resulting in a 20% increase in user engagement.",
        "Mentored junior developers, conducting code reviews and promoting best practices in frontend development.",
        "Collaborated with UX/UI designers to translate wireframes and mockups into high-quality, reusable components."
      ],
    },
    {
      id: "exp2",
      company: "Innovate Co.",
      role: "Frontend Developer",
      startDate: "Jun 2016",
      endDate: "Dec 2019",
      description: [
        "Developed and maintained the company's main e-commerce platform, improving performance by 15% through code optimization and lazy loading techniques.",
        "Worked in an Agile environment, participating in sprint planning, daily stand-ups, and retrospectives.",
        "Integrated third-party APIs for payment processing and shipping services."
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      startDate: "Sep 2012",
      endDate: "May 2016",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Portfolio Website",
      description: "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
      url: "https://janedoe.dev",
    },
    {
        id: "proj2",
        name: "React Component Library",
        description: "Developed a reusable component library for internal use, which accelerated development time by 30%.",
        url: "https://github.com/janedoe/component-lib",
    }
  ],
  skills: [
    { id: "skill1", name: "React", level: "Expert" },
    { id: "skill2", name: "TypeScript", level: "Expert" },
    { id: "skill3", name: "JavaScript (ES6+)", level: "Expert" },
    { id: "skill4", name: "Tailwind CSS", level: "Advanced" },
    { id: "skill5", name: "Node.js", level: "Intermediate" },
    { id: "skill6", name: "Figma", level: "Intermediate" },
  ],
};

export const initialResumeData: Resume = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
};


export const templates: { key: TemplateKey; name: string }[] = [
  { key: 'modern', name: 'Modern' },
  { key: 'classic', name: 'Classic' },
  { key: 'creative', name: 'Creative' },
];
