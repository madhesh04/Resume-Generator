import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../../types';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { resume, dispatch } = useResume();

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedExperience = { ...resume.experience[index] };

    if (name === "description") {
        updatedExperience.description = value.split('\n');
    } else {
        (updatedExperience as any)[name] = value;
    }
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { index, experience: updatedExperience } });
  };

  const handleAdd = () => {
    dispatch({
        type: 'ADD_EXPERIENCE',
        payload: { id: `exp${Date.now()}`, company: '', role: '', startDate: '', endDate: '', description: [''] }
    });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: { index } });
  };

  const inputClasses = "p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Work Experience</h2>
      {resume.experience.map((exp, index) => (
        <div key={exp.id} className="mb-4 p-4 border rounded-md relative">
           <button
            onClick={() => handleRemove(index)}
            className="absolute top-3 right-3 p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
            <input name="company" value={exp.company} onChange={e => handleChange(index, e)} placeholder="Company" className={inputClasses} />
            <input name="role" value={exp.role} onChange={e => handleChange(index, e)} placeholder="Role" className={inputClasses} />
            <input name="startDate" value={exp.startDate} onChange={e => handleChange(index, e)} placeholder="Start Date" className={inputClasses} />
            <input name="endDate" value={exp.endDate} onChange={e => handleChange(index, e)} placeholder="End Date" className={inputClasses} />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <label htmlFor={`description-${index}`} className="font-semibold text-gray-700 text-sm">Description (one point per line)</label>
            </div>
            <textarea
                id={`description-${index}`}
                name="description"
                value={exp.description.join('\n')}
                onChange={e => handleChange(index, e)}
                placeholder="Describe your responsibilities and achievements."
                className={`${inputClasses} w-full h-32`}
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
        <Plus size={20} /> Add Experience
      </motion.button>
    </div>
  );
};

export default ExperienceForm;