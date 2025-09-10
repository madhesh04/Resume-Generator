
import React from 'react';
import { PersonalInfo } from '../../types';
import { useResume } from '../../contexts/ResumeContext';
import { sampleResumeData } from '../../constants';

const PersonalInfoForm: React.FC = () => {
  const { resume, dispatch } = useResume();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { field: name as keyof PersonalInfo, value },
    });
  };

  const inputClasses = "p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500";
  const { personalInfo: samplePI } = sampleResumeData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={resume.personalInfo.name} onChange={handleChange} placeholder={samplePI.name} className={inputClasses} />
        <input name="title" value={resume.personalInfo.title} onChange={handleChange} placeholder={samplePI.title} className={inputClasses} />
        <input name="email" value={resume.personalInfo.email} onChange={handleChange} placeholder={samplePI.email} className={inputClasses} />
        <input name="phone" value={resume.personalInfo.phone} onChange={handleChange} placeholder={samplePI.phone} className={inputClasses} />
        <input name="location" value={resume.personalInfo.location} onChange={handleChange} placeholder={samplePI.location} className={inputClasses} />
        <input name="linkedin" value={resume.personalInfo.linkedin} onChange={handleChange} placeholder={samplePI.linkedin} className={inputClasses} />
        <input name="github" value={resume.personalInfo.github} onChange={handleChange} placeholder={samplePI.github} className={inputClasses} />
        <input name="website" value={resume.personalInfo.website} onChange={handleChange} placeholder={samplePI.website} className={inputClasses} />
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
            <label htmlFor="summary" className="font-semibold text-gray-700">Professional Summary</label>
        </div>
        <textarea
            id="summary"
            name="summary"
            value={resume.personalInfo.summary}
            onChange={handleChange}
            placeholder={samplePI.summary}
            className={`${inputClasses} w-full h-32`}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
