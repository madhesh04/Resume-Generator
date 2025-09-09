
import React from 'react';
import { Resume } from '../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const CreativeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, experience, education, projects, skills } = resume;

  return (
    <div className="flex min-h-[842pt] bg-white font-sans">
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
            <p className="text-lg text-slate-300 mt-1">{personalInfo.title}</p>
        </div>

        <div className="mt-8">
            <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-amber-400 pb-1 mb-3">Contact</h2>
            <ul className="space-y-2 text-sm">
                {personalInfo.email && <li className="flex items-center gap-2"><Mail size={14} className="text-amber-400"/> {personalInfo.email}</li>}
                {personalInfo.phone && <li className="flex items-center gap-2"><Phone size={14} className="text-amber-400"/> {personalInfo.phone}</li>}
                {personalInfo.location && <li className="flex items-center gap-2"><MapPin size={14} className="text-amber-400"/> {personalInfo.location}</li>}
                {personalInfo.linkedin && <li className="flex items-center gap-2"><Linkedin size={14} className="text-amber-400"/> {personalInfo.linkedin}</li>}
                {personalInfo.github && <li className="flex items-center gap-2"><Github size={14} className="text-amber-400"/> {personalInfo.github}</li>}
                {personalInfo.website && <li className="flex items-center gap-2"><Globe size={14} className="text-amber-400"/> {personalInfo.website}</li>}
            </ul>
        </div>
        
        {skills.length > 0 && <div className="mt-8">
            <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-amber-400 pb-1 mb-3">Skills</h2>
            <ul className="space-y-2 text-sm">
                {skills.map(skill => <li key={skill.id}>{skill.name} <span className="text-slate-400 text-xs">({skill.level})</span></li>)}
            </ul>
        </div>}
        
        {education.length > 0 && <div className="mt-8">
            <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-amber-400 pb-1 mb-3">Education</h2>
            {education.map(edu => (
                <div key={edu.id} className="mb-3 text-sm">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-slate-300">{edu.institution}</p>
                    <p className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</p>
                </div>
            ))}
        </div>}

      </aside>
      <main className="w-2/3 p-8 text-slate-700 text-sm">
        {personalInfo.summary && <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider mb-2">Summary</h2>
            <p className="leading-relaxed">{personalInfo.summary}</p>
        </section>}
        
        {experience.length > 0 && <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider mb-2">Experience</h2>
            {experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <h3 className="text-md font-semibold text-slate-800">{exp.role}</h3>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{exp.company}</span>
                        <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                        {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            ))}
        </section>}

        {projects.length > 0 && <section>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider mb-2">Projects</h2>
            {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-md font-semibold text-slate-800">{proj.name}</h3>
                        {proj.url && <a href={proj.url} className="text-amber-600 text-xs hover:underline">{proj.url}</a>}
                    </div>
                    <p className="leading-relaxed">{proj.description}</p>
                </div>
            ))}
        </section>}
      </main>
    </div>
  );
};

export default CreativeTemplate;
