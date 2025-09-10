
import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../../types';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';
import { sampleResumeData } from '../../constants';

const EducationForm: React.FC = () => {
  const { resume, dispatch } = useResume();
  
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEducation = { 
        ...resume.education[index], 
        [name as keyof Omit<Education, 'id'>]: value 
    };
    dispatch({ type: 'UPDATE_EDUCATION', payload: { index, education: updatedEducation } });
  };

  const handleAdd = () => {
    dispatch({
        type: 'ADD_EDUCATION',
        payload: { id: `edu${Date.now()}`, institution: '', degree: '', startDate: '', endDate: '' }
    });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: { index } });
  };

  const inputClasses = "p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500";
  const sampleEdu = sampleResumeData.education[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Education</h2>
      {resume.education.map((edu, index) => (
        <div key={edu.id} className="mb-4 p-4 border rounded-md relative">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-3 right-3 p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
            <input name="institution" value={edu.institution} onChange={e => handleChange(index, e)} placeholder={sampleEdu.institution} className={inputClasses} />
            <input name="degree" value={edu.degree} onChange={e => handleChange(index, e)} placeholder={sampleEdu.degree} className={inputClasses} />
            <input name="startDate" value={edu.startDate} onChange={e => handleChange(index, e)} placeholder={sampleEdu.startDate} className={inputClasses} />
            <input name="endDate" value={edu.endDate} onChange={e => handleChange(index, e)} placeholder={sampleEdu.endDate} className={inputClasses} />
          </div>
        </div>
      ))}
      <motion.button 
        onClick={handleAdd} 
        className="mt-2 flex items-center gap-2 bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={20} /> Add Education
      </motion.button>
    </div>
  );
};

export default EducationForm;
