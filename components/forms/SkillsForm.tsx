import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resume, dispatch } = useResume();
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedSkill = {
        ...resume.skills[index],
        [name]: value
    };
    dispatch({ type: 'UPDATE_SKILL', payload: { index, skill: updatedSkill as Skill }});
  };

  const handleAdd = () => {
    dispatch({
        type: 'ADD_SKILL',
        payload: { id: `skill${Date.now()}`, name: '', level: 'Intermediate' }
    });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_SKILL', payload: { index } });
  };

  const inputClasses = "p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500";
  const selectClasses = "p-2 border rounded-md bg-white text-gray-900";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Skills</h2>
      {resume.skills.map((skill, index) => (
        <div key={skill.id} className="flex items-center gap-4 mb-4">
          <input 
            name="name" 
            value={skill.name} 
            onChange={e => handleChange(index, e)} 
            placeholder="Skill (e.g., React)" 
            className={`${inputClasses} flex-grow`} 
          />
          <select 
            name="level"
            value={skill.level}
            onChange={e => handleChange(index, e)}
            className={selectClasses}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-700 p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <motion.button 
        onClick={handleAdd} 
        className="mt-2 flex items-center gap-2 bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={20} /> Add Skill
      </motion.button>
    </div>
  );
};

export default SkillsForm;