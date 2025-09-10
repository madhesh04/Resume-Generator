import React from 'react';
import { motion } from 'framer-motion';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import { useResume } from '../contexts/ResumeContext';
import { Undo2, Redo2 } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const EditorControls: React.FC = () => {
    const { undo, redo, canUndo, canRedo } = useResume();

    return (
        <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Resume Editor</h2>
            <div className="flex items-center gap-2">
                <button 
                    onClick={undo} 
                    disabled={!canUndo}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Undo last change"
                >
                    <Undo2 size={16} />
                    <span>Undo</span>
                </button>
                <button 
                    onClick={redo} 
                    disabled={!canRedo}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Redo last change"
                >
                    <span>Redo</span>
                    <Redo2 size={16} />
                </button>
            </div>
        </div>
    );
};

const ResumeEditor: React.FC = () => {
  const sections = [
    <PersonalInfoForm />,
    <ExperienceForm />,
    <EducationForm />,
    <ProjectsForm />,
    <SkillsForm />,
  ];

  return (
    <div className="space-y-8">
      <EditorControls />
      {sections.map((Section, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {Section}
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeEditor;