import React, { useState, useRef, useCallback } from 'react';
import { TemplateKey } from './types';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import Header from './components/Header';
import { ResumeProvider, useResume } from './contexts/ResumeContext';
import { downloadPdf } from './utils/pdfExporter';
import { downloadDocx } from './utils/docxExporter';

const AppContent: React.FC = () => {
  const { resume } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const getFileName = () => `resume-${resume.personalInfo.name.toLowerCase().replace(/[\s_]/g, '-')}`;

  const handleDownloadPdf = useCallback(async () => {
    if (!previewRef.current) return;
    setIsDownloadingPdf(true);
    try {
        await downloadPdf(previewRef.current, getFileName());
    } catch (err) {
        alert("Sorry, there was an error generating the PDF.");
    } finally {
        setIsDownloadingPdf(false);
    }
  }, [resume]);
  
  const handleDownloadDocx = useCallback(async () => {
    setIsDownloadingDocx(true);
    try {
        await downloadDocx(resume, getFileName());
    } catch (err) {
        alert("Sorry, there was an error generating the DOCX file.");
    } finally {
        setIsDownloadingDocx(false);
    }
  }, [resume]);


  return (
    <div className="min-h-screen bg-neutral font-sans text-base-content">
      <Header
        onDownloadPdf={handleDownloadPdf}
        onDownloadDocx={handleDownloadDocx}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        isDownloadingPdf={isDownloadingPdf}
        isDownloadingDocx={isDownloadingDocx}
      />
      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl mx-auto">
        <div className="lg:order-1">
          <ResumeEditor />
        </div>
        <div className="lg:order-2">
            <div className="sticky top-24">
                 <ResumePreview ref={previewRef} template={selectedTemplate} />
            </div>
        </div>
      </main>
    </div>
  );
};


const App: React.FC = () => (
  <ResumeProvider>
    <AppContent />
  </ResumeProvider>
);

export default App;