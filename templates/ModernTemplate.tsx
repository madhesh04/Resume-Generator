
import React from 'react';
import { Resume } from '../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ModernTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, experience, education, projects, skills } = resume;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <header className="text-center mb-8 border-b-2 border-blue-800 pb-4">
        <h1 className="text-4xl font-bold text-blue-800">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-xs text-gray-600">
        {personalInfo.email && <div className="flex items-center gap-1"><Mail size={14} />{personalInfo.email}</div>}
        {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={14} />{personalInfo.phone}</div>}
        {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={14} />{personalInfo.location}</div>}
        {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin size={14} />{personalInfo.linkedin}</div>}
        {personalInfo.github && <div className="flex items-center gap-1"><Github size={14} />{personalInfo.github}</div>}
        {personalInfo.website && <div className="flex items-center gap-1"><Globe size={14} />{personalInfo.website}</div>}
      </div>

      <main className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {personalInfo.summary && <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>}

          {experience.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 pb-1 mb-2">WORK EXPERIENCE</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-bold text-md text-gray-900">{exp.role}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>}

           {projects.length > 0 && <section>
            <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-bold text-md text-gray-900">{proj.name}</h3>
                <p className="text-gray-700 leading-relaxed">{proj.description}</p>
                {proj.url && <a href={proj.url} className="text-blue-600 text-xs hover:underline">{proj.url}</a>}
              </div>
            ))}
          </section>}
        </div>

        <div className="col-span-1">
          {skills.length > 0 && <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill.name}</span>
              ))}
            </div>
          </section>}

          {education.length > 0 && <section>
            <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold text-md text-gray-900">{edu.institution}</h3>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>}
        </div>
      </main>
    </div>
  );
};

export default ModernTemplate;
