import { useState, useEffect, useCallback } from 'react';

export interface ResumeData {
  name: string;
  job_title: string;
  location: string;
  email: string;
  phone: string;
  skill_1: string;
  skill_2: string;
  skill_3: string;
  skill_4: string;
  skill_5: string;
  skill_6: string;
  skill_7: string;
  skill_8: string;
  skill_9: string;
  skill_10: string;
  current_job_title: string;
  current_company: string;
  current_duration: string;
  current_achievement_1: string;
  current_achievement_2: string;
  current_achievement_3: string;
  current_achievement_4: string;
  current_achievement_5: string;
  current_achievement_6: string;
  previous_job_title: string;
  previous_company: string;
  previous_duration: string;
  previous_achievement_1: string;
  previous_achievement_2: string;
  previous_achievement_3: string;
  previous_achievement_4: string;
  previous_achievement_5: string;
  education_degree: string;
  education_institution: string;
  education_location: string;
  references: string;
}

export interface ResumeStore {
  template: string;
  formData: ResumeData;
  detectedFields: string[];
  savedStatus: 'saved' | 'saving' | 'unsaved';
}

const initialFormData: ResumeData = {
  name: 'ARJUN CHAPAGAIN',
  job_title: 'IT Support | System Analyst | Cloud Engineer',
  location: 'Campsie, 2194 NSW',
  email: 'Championarjun27@gmail.com',
  phone: '0414350801',
  skill_1: 'GenAI',
  skill_2: 'Linux/Unix; windows Troubleshooting',
  skill_3: 'Vendor management',
  skill_4: 'Remote support',
  skill_5: 'Ticketing system, Escalation and resolve',
  skill_6: 'Switches, Servers and routers management',
  skill_7: 'Automation',
  skill_8: 'Aws Cloud IAM and resource control',
  skill_9: '',
  skill_10: '',
  current_job_title: 'System and Network Admin',
  current_company: 'Amazon commercial pty.ltd',
  current_duration: 'October 2021 – Present',
  current_achievement_1: 'Troubleshooting Windows and Linux Systems and providing support.',
  current_achievement_2: 'Creating and resolving tickets for multiple sites.',
  current_achievement_3: 'Network Support, Troubleshooting switches and internet connectivity.',
  current_achievement_4: 'Assembling workstations and business printers.',
  current_achievement_5: 'Connecting and managing networking hardware and wall patching.',
  current_achievement_6: 'Creating and managing final documents of the project.',
  previous_job_title: 'IT Support',
  previous_company: 'IT Total Solutions Pty. Ltd., Sydney',
  previous_duration: 'June 2018 - August 2019',
  previous_achievement_1: 'Deploying and supporting desktops/laptops, phone systems, video conferencing.',
  previous_achievement_2: 'Operated ticketing system, Backups, and Active Directory.',
  previous_achievement_3: 'Assisted in troubleshooting, diagnosing, testing and resolving system problems and issue.',
  previous_achievement_4: 'Provisioning organization resources to employees.',
  previous_achievement_5: 'Implemented cybersecurity policies and best practices.',
  education_degree: 'Master of Information Technology',
  education_institution: 'Queensland University of Technology',
  education_location: 'Brisbane',
  references: 'Can be provided on request.',
};

const defaultTemplate = `<div style="text-align: center; margin-bottom: 2rem;">
<h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">{{name}}</h1>
<p style="font-size: 1.2rem; color: #475569; margin-bottom: 0.5rem;">{{job_title}}</p>
<p style="color: #64748b;">{{phone}} | {{email}} | {{location}}</p>
</div>

<h2>Technical Skills</h2>
<h3>Computer Software & Hardware:</h3>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
<div>
<ul>
<li>{{skill_1}}</li>
<li>{{skill_2}}</li>
<li>{{skill_3}}</li>
<li>{{skill_4}}</li>
<li>{{skill_5}}</li>
</ul>
</div>
<div>
<ul>
<li>{{skill_6}}</li>
<li>{{skill_7}}</li>
<li>{{skill_8}}</li>
<li>{{skill_9}}</li>
<li>{{skill_10}}</li>
</ul>
</div>
</div>

<h2>Employment History</h2>
<h3>{{current_job_title}}, {{current_company}}</h3>
<p style="text-align: right; margin-bottom: 1rem; color: #64748b;">{{current_duration}}</p>
<ul>
<li>{{current_achievement_1}}</li>
<li>{{current_achievement_2}}</li>
<li>{{current_achievement_3}}</li>
<li>{{current_achievement_4}}</li>
<li>{{current_achievement_5}}</li>
<li>{{current_achievement_6}}</li>
</ul>

<h3>{{previous_job_title}}, {{previous_company}}</h3>
<p style="text-align: right; margin-bottom: 1rem; color: #64748b;">{{previous_duration}}</p>
<ul>
<li>{{previous_achievement_1}}</li>
<li>{{previous_achievement_2}}</li>
<li>{{previous_achievement_3}}</li>
<li>{{previous_achievement_4}}</li>
<li>{{previous_achievement_5}}</li>
</ul>

<h2>Education:</h2>
<h3>{{education_degree}},</h3>
<p>{{education_institution}}, {{education_location}}</p>

<h2>References:</h2>
<p>{{references}}</p>`;

const STORAGE_KEY = 'resume-builder-data';

export function useResumeStore() {
  const [store, setStore] = useState<ResumeStore>({
    template: defaultTemplate,
    formData: initialFormData,
    detectedFields: [],
    savedStatus: 'saved',
  });

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setStore(prev => ({ 
          ...prev, 
          ...parsedData,
          savedStatus: 'saved' 
        }));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);

  // Auto-save to localStorage with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          template: store.template,
          formData: store.formData,
          detectedFields: store.detectedFields,
        }));
        setStore(prev => ({ ...prev, savedStatus: 'saved' }));
      } catch (error) {
        console.error('Failed to save data to localStorage:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [store.template, store.formData]);

  // Detect placeholder fields in template
  const detectFields = useCallback((template: string): string[] => {
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const fields = new Set<string>();
    let match;
    
    while ((match = regex.exec(template)) !== null) {
      fields.add(match[1]);
    }
    
    return Array.from(fields).sort();
  }, []);

  const updateTemplate = useCallback((template: string) => {
    const fields = detectFields(template);
    setStore(prev => ({
      ...prev,
      template,
      detectedFields: fields,
      savedStatus: 'saving',
    }));
  }, [detectFields]);

  const updateFormData = useCallback((updates: Partial<ResumeData>) => {
    setStore(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
      savedStatus: 'saving',
    }));
  }, []);

  const resetFormData = useCallback(() => {
    setStore(prev => ({
      ...prev,
      formData: initialFormData,
      savedStatus: 'saving',
    }));
  }, []);

  return {
    ...store,
    updateTemplate,
    updateFormData,
    resetFormData,
    detectFields,
  };
}
