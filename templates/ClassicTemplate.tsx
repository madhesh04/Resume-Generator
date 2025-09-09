
import React from 'react';
import { Resume } from '../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ClassicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, experience, education, projects, skills } = resume;

  return (
    <div className="bg-white p-10 font-serif text-base text-black">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider">{personalInfo.name}</h1>
        <p className="text-lg text-gray-700">{personalInfo.title}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <a href={`https://`+personalInfo.linkedin} className="text-blue-700">LinkedIn</a>}
            {personalInfo.github && <a href={`https://`+personalInfo.github} className="text-blue-700">GitHub</a>}
        </div>
      </header>

      {personalInfo.summary && <section className="mb-5">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-2">SUMMARY</h2>
        <p className="text-gray-800 text-sm leading-normal">{personalInfo.summary}</p>
      </section>}

      {experience.length > 0 && <section className="mb-5">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-2">EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
                <h3 className="text-md font-bold">{exp.role}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-md italic text-gray-700">{exp.company}</p>
            <ul className="list-disc list-inside mt-1 text-sm text-gray-800 space-y-1">
              {exp.description.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>}
      
      {projects.length > 0 && <section className="mb-5">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-2">PROJECTS</h2>
        {projects.map(proj => (
          <div key={proj.id} className="mb-3">
             <div className="flex justify-between items-baseline">
                <h3 className="text-md font-bold">{proj.name}</h3>
                {proj.url && <a href={proj.url} className="text-blue-700 text-sm">{proj.url}</a>}
            </div>
            <p className="text-sm text-gray-800 leading-normal">{proj.description}</p>
          </div>
        ))}
      </section>}

      {education.length > 0 && <section className="mb-5">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-2">EDUCATION</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
                <h3 className="text-md font-bold">{edu.institution}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
            <p className="text-md italic text-gray-700">{edu.degree}</p>
          </div>
        ))}
      </section>}

      {skills.length > 0 && <section>
        <h2 className="text-xl font-bold border-b-2 border-black pb-1 mb-2">SKILLS</h2>
        <p className="text-sm text-gray-800">
            {skills.map(skill => skill.name).join(' | ')}
        </p>
      </section>}
    </div>
  );
};

export default ClassicTemplate;
