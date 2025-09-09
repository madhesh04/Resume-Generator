import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Resume, TemplateKey } from '../types';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import { useResume } from '../contexts/ResumeContext';

interface ResumePreviewProps {
  template: TemplateKey;
}

const templateComponents: { [key in TemplateKey]: React.FC<{ resume: Resume }> } = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ template }, ref) => {
  const { resume } = useResume();
  const TemplateComponent = templateComponents[template];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 shadow-lg rounded-lg p-4"
    >
        <div ref={ref} className="bg-white">
            <TemplateComponent resume={resume} />
        </div>
    </motion.div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;