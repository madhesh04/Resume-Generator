import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { resume, dispatch } = useResume();

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedProject = {
        ...resume.projects[index],
        [name as keyof Omit<Project, 'id'>]: value
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: { index, project: updatedProject } });
  };

  const handleAdd = () => {
    dispatch({
        type: 'ADD_PROJECT',
        payload: { id: `proj${Date.now()}`, name: '', description: '', url: '' }
    });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: { index } });
  };

  const inputClasses = "p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Projects</h2>
      {resume.projects.map((proj, index) => (
        <div key={proj.id} className="mb-4 p-4 border rounded-md relative">
           <button
            onClick={() => handleRemove(index)}
            className="absolute top-3 right-3 p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          <div className="grid grid-cols-1 gap-4 pr-10">
            <input name="name" value={proj.name} onChange={e => handleChange(index, e)} placeholder="Project Name" className={inputClasses} />
            <input name="url" value={proj.url} onChange={e => handleChange(index, e)} placeholder="Project URL" className={inputClasses} />
            <textarea
                name="description"
                value={proj.description}
                onChange={e => handleChange(index, e)}
                placeholder="Project Description"
                className={`${inputClasses} w-full h-24`}
            />
          </div>
        </div>
      ))}
      <motion.button 
        onClick={handleAdd} 
        className="mt-2 flex items-center gap-2 bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={20} /> Add Project
      </motion.button>
    </div>
  );
};

export default ProjectsForm;