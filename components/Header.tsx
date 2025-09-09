import React, { useState, useRef, useEffect } from 'react';
import { TemplateKey } from '../types';
import { templates } from '../constants';
import { FileDown, Loader2, ChevronsUpDown } from 'lucide-react';

interface HeaderProps {
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
  selectedTemplate: TemplateKey;
  setSelectedTemplate: (template: TemplateKey) => void;
  isDownloadingPdf: boolean;
  isDownloadingDocx: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onDownloadPdf, 
  onDownloadDocx,
  selectedTemplate, 
  setSelectedTemplate, 
  isDownloadingPdf,
  isDownloadingDocx
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Smart Resume Builder
        </h1>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as TemplateKey)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {templates.map((template) => (
                <option key={template.key} value={template.key}>
                  {template.name} Template
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(prev => !prev)}
              disabled={isDownloadingPdf || isDownloadingDocx}
              className="flex items-center gap-2 bg-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {(isDownloadingPdf || isDownloadingDocx) ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <FileDown className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">Download</span>
              <ChevronsUpDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <button
                  onClick={() => { onDownloadPdf(); setIsDropdownOpen(false); }}
                  disabled={isDownloadingPdf}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  {isDownloadingPdf ? <Loader2 className="animate-spin h-4 w-4" /> : <div className="h-4 w-4" />}
                  <span>As PDF</span>
                </button>
                <button
                  onClick={() => { onDownloadDocx(); setIsDropdownOpen(false); }}
                  disabled={isDownloadingDocx}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  {isDownloadingDocx ? <Loader2 className="animate-spin h-4 w-4" /> : <div className="h-4 w-4" />}
                  <span>As DOCX</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;