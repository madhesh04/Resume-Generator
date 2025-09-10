
import React, { createContext, useReducer, useContext, ReactNode, Dispatch, useCallback } from 'react';
import { Resume, PersonalInfo, Experience, Education, Project, Skill } from '../types';
import { initialResumeData } from '../constants';

type Action =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: { field: keyof PersonalInfo; value: string } }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { index: number; experience: Experience } }
  | { type: 'REMOVE_EXPERIENCE'; payload: { index: number } }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { index: number; education: Education } }
  | { type: 'REMOVE_EDUCATION'; payload: { index: number } }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { index: number; project: Project } }
  | { type: 'REMOVE_PROJECT'; payload: { index: number } }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { index: number; skill: Skill } }
  | { type: 'REMOVE_SKILL'; payload: { index: number } };

const resumeReducer = (state: Resume, action: Action): Resume => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE': {
      const updatedExperience = [...state.experience];
      updatedExperience[action.payload.index] = action.payload.experience;
      return { ...state, experience: updatedExperience };
    }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((_, i) => i !== action.payload.index) };
    
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION': {
      const updatedEducation = [...state.education];
      updatedEducation[action.payload.index] = action.payload.education;
      return { ...state, education: updatedEducation };
    }
    case 'REMOVE_EDUCATION':
        return { ...state, education: state.education.filter((_, i) => i !== action.payload.index) };

    case 'ADD_PROJECT':
        return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT': {
        const updatedProjects = [...state.projects];
        updatedProjects[action.payload.index] = action.payload.project;
        return { ...state, projects: updatedProjects };
    }
    case 'REMOVE_PROJECT':
        return { ...state, projects: state.projects.filter((_, i) => i !== action.payload.index) };
    
    case 'ADD_SKILL':
        return { ...state, skills: [...state.skills, action.payload] };
    case 'UPDATE_SKILL': {
        const updatedSkills = [...state.skills];
        updatedSkills[action.payload.index] = action.payload.skill;
        return { ...state, skills: updatedSkills };
    }
    case 'REMOVE_SKILL':
        return { ...state, skills: state.skills.filter((_, i) => i !== action.payload.index) };
        
    default:
      return state;
  }
};


type HistoryState = {
  past: Resume[];
  present: Resume;
  future: Resume[];
};

type HistoryAction =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET', newPresent: Resume };

const historyReducer = (state: HistoryState, action: HistoryAction): HistoryState => {
    const { past, present, future } = state;
    switch (action.type) {
        case 'UNDO': {
            if (past.length === 0) return state;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }
        case 'REDO': {
            if (future.length === 0) return state;
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        }
        case 'SET': {
            if (action.newPresent === present) return state;
            return {
                past: [...past, present],
                present: action.newPresent,
                future: [],
            };
        }
        default:
            return state;
    }
}

interface ResumeContextType {
  resume: Resume;
  dispatch: Dispatch<Action>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [historyState, dispatchHistory] = useReducer(historyReducer, {
    past: [],
    present: initialResumeData,
    future: [],
  });

  const { present: resume, past, future } = historyState;
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const dispatch = useCallback((action: Action) => {
    const newPresent = resumeReducer(resume, action);
    dispatchHistory({ type: 'SET', newPresent });
  }, [resume]);

  const undo = useCallback(() => {
    dispatchHistory({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatchHistory({ type: 'REDO' });
  }, []);

  return <ResumeContext.Provider value={{ resume, dispatch, undo, redo, canUndo, canRedo }}>{children}</ResumeContext.Provider>;
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
