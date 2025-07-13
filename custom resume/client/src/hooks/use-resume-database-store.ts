import { useState, useEffect, useCallback } from 'react';
import { useResumeApi } from './use-resume-api';
import { useToast } from './use-toast';

export interface ResumeData {
  name: string;
  job_title: string;
  location: string;
  email: string;
  phone: string;
  
  // Skills section
  skills_section_label: string;
  skills_subsection_label: string;
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
  additional_skills: string;
  
  // Experience section
  experience_section_label: string;
  current_job_title: string;
  current_company: string;
  current_duration: string;
  current_achievement_1: string;
  current_achievement_2: string;
  current_achievement_3: string;
  current_achievement_4: string;
  current_achievement_5: string;
  current_achievement_6: string;
  current_additional_info: string;
  
  previous_job_title: string;
  previous_company: string;
  previous_duration: string;
  previous_achievement_1: string;
  previous_achievement_2: string;
  previous_achievement_3: string;
  previous_achievement_4: string;
  previous_achievement_5: string;
  previous_additional_info: string;
  
  // Custom experience subsections
  experience_custom_subsection_1_label: string;
  experience_custom_subsection_1_content: string;
  experience_custom_subsection_2_label: string;
  experience_custom_subsection_2_content: string;
  
  // Education section
  education_section_label: string;
  education_degree: string;
  education_institution: string;
  education_location: string;
  education_additional_info: string;
  
  // Custom education subsections
  education_custom_subsection_1_label: string;
  education_custom_subsection_1_content: string;
  education_custom_subsection_2_label: string;
  education_custom_subsection_2_content: string;
  
  // References section
  references_section_label: string;
  references: string;
  
  // Custom sections
  custom_section_1_label: string;
  custom_section_1_content: string;
  custom_section_2_label: string;
  custom_section_2_content: string;
  custom_section_3_label: string;
  custom_section_3_content: string;
}

export interface ResumeStore {
  template: string;
  formData: ResumeData;
  detectedFields: string[];
  savedStatus: 'saved' | 'saving' | 'unsaved';
  currentResumeId?: number;
}

const initialFormData: ResumeData = {
  name: 'ARJUN CHAPAGAIN',
  job_title: 'IT Support | System Analyst | Cloud Engineer',
  location: 'Campsie, 2194 NSW',
  email: 'Championarjun27@gmail.com',
  phone: '0414350801',
  
  // Skills section
  skills_section_label: 'TECHNICAL SKILLS',
  skills_subsection_label: 'Computer Software & Hardware:',
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
  additional_skills: '',
  
  // Experience section
  experience_section_label: 'PROFESSIONAL EXPERIENCE',
  current_job_title: 'System and Network Admin',
  current_company: 'Amazon commercial pty.ltd',
  current_duration: 'October 2021 – Present',
  current_achievement_1: 'Troubleshooting Windows and Linux Systems and providing support.',
  current_achievement_2: 'Creating and resolving tickets for multiple sites.',
  current_achievement_3: 'Network Support, Troubleshooting switches and internet connectivity.',
  current_achievement_4: 'Assembling workstations and business printers.',
  current_achievement_5: 'Connecting and managing networking hardware and wall patching.',
  current_achievement_6: 'Creating and managing final documents of the project.',
  current_additional_info: '',
  
  previous_job_title: 'IT Support',
  previous_company: 'IT Total Solutions Pty. Ltd., Sydney',
  previous_duration: 'June 2018 - August 2019',
  previous_achievement_1: 'Deploying and supporting desktops/laptops, phone systems, video conferencing.',
  previous_achievement_2: 'Operated ticketing system, Backups, and Active Directory.',
  previous_achievement_3: 'Assisted in troubleshooting, diagnosing, testing and resolving system problems and issue.',
  previous_achievement_4: 'Provisioning organization resources to employees.',
  previous_achievement_5: 'Implemented cybersecurity policies and best practices.',
  previous_additional_info: '',
  
  // Custom experience subsections
  experience_custom_subsection_1_label: '',
  experience_custom_subsection_1_content: '',
  experience_custom_subsection_2_label: '',
  experience_custom_subsection_2_content: '',
  
  // Education section
  education_section_label: 'EDUCATION',
  education_degree: 'Master of Information Technology',
  education_institution: 'Queensland University of Technology',
  education_location: 'Brisbane',
  education_additional_info: '',
  
  // Custom education subsections
  education_custom_subsection_1_label: '',
  education_custom_subsection_1_content: '',
  education_custom_subsection_2_label: '',
  education_custom_subsection_2_content: '',
  
  // References section
  references_section_label: 'REFERENCES',
  references: 'Can be provided on request.',
  
  // Custom sections
  custom_section_1_label: '',
  custom_section_1_content: '',
  custom_section_2_label: '',
  custom_section_2_content: '',
  custom_section_3_label: '',
  custom_section_3_content: '',
};

const defaultTemplate = `<div style="text-align: center; margin-bottom: 2rem;">
<h1 style="font-size: 1.8rem; font-weight: bold; margin-bottom: 0.5rem; color: #000000;">{{name}}</h1>
<p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #333333;">{{job_title}}</p>
<p style="color: #666666;">{{phone}} | {{email}} | {{location}}</p>
</div>

<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{skills_section_label}}</h2>
<p style="font-weight: bold; margin-bottom: 0.5rem; color: #333333;">{{skills_subsection_label}}</p>
<ul style="margin-bottom: 1rem; padding-left: 1.5rem;">
<li>{{skill_1}}</li>
<li>{{skill_2}}</li>
<li>{{skill_3}}</li>
<li>{{skill_4}}</li>
<li>{{skill_5}}</li>
<li>{{skill_6}}</li>
<li>{{skill_7}}</li>
<li>{{skill_8}}</li>
<li>{{skill_9}}</li>
<li>{{skill_10}}</li>
</ul>
<p style="margin-bottom: 1.5rem; color: #333333;">{{additional_skills}}</p>

<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{experience_section_label}}</h2>

<div style="margin-bottom: 1.5rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.25rem;">{{current_job_title}}</h3>
<p style="font-weight: bold; margin-bottom: 0.25rem; color: #333333;">{{current_company}}</p>
<p style="margin-bottom: 0.75rem; color: #666666;">{{current_duration}}</p>
<ul style="margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li>{{current_achievement_1}}</li>
<li>{{current_achievement_2}}</li>
<li>{{current_achievement_3}}</li>
<li>{{current_achievement_4}}</li>
<li>{{current_achievement_5}}</li>
<li>{{current_achievement_6}}</li>
</ul>
<p style="margin-bottom: 1rem; color: #333333;">{{current_additional_info}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.25rem;">{{previous_job_title}}</h3>
<p style="font-weight: bold; margin-bottom: 0.25rem; color: #333333;">{{previous_company}}</p>
<p style="margin-bottom: 0.75rem; color: #666666;">{{previous_duration}}</p>
<ul style="margin-bottom: 0.5rem; padding-left: 1.5rem;">
<li>{{previous_achievement_1}}</li>
<li>{{previous_achievement_2}}</li>
<li>{{previous_achievement_3}}</li>
<li>{{previous_achievement_4}}</li>
<li>{{previous_achievement_5}}</li>
</ul>
<p style="margin-bottom: 1rem; color: #333333;">{{previous_additional_info}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.5rem;">{{experience_custom_subsection_1_label}}</h3>
<p style="color: #333333; margin-bottom: 1rem;">{{experience_custom_subsection_1_content}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.5rem;">{{experience_custom_subsection_2_label}}</h3>
<p style="color: #333333; margin-bottom: 1rem;">{{experience_custom_subsection_2_content}}</p>
</div>

<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{education_section_label}}</h2>
<div style="margin-bottom: 1rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.25rem;">{{education_degree}}</h3>
<p style="color: #333333; margin-bottom: 0.5rem;">{{education_institution}}, {{education_location}}</p>
<p style="color: #333333; margin-bottom: 1rem;">{{education_additional_info}}</p>

<div style="margin-bottom: 1rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.5rem;">{{education_custom_subsection_1_label}}</h3>
<p style="color: #333333; margin-bottom: 1rem;">{{education_custom_subsection_1_content}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h3 style="font-size: 1.1rem; font-weight: bold; color: #000000; margin-bottom: 0.5rem;">{{education_custom_subsection_2_label}}</h3>
<p style="color: #333333; margin-bottom: 1rem;">{{education_custom_subsection_2_content}}</p>
</div>
</div>

<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{references_section_label}}</h2>
<p style="color: #333333; margin-bottom: 1.5rem;">{{references}}</p>

<div style="margin-bottom: 1.5rem;">
<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{custom_section_1_label}}</h2>
<p style="color: #333333; margin-bottom: 1rem;">{{custom_section_1_content}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{custom_section_2_label}}</h2>
<p style="color: #333333; margin-bottom: 1rem;">{{custom_section_2_content}}</p>
</div>

<div style="margin-bottom: 1.5rem;">
<h2 style="font-size: 1.2rem; font-weight: bold; color: #000000; margin-bottom: 1rem; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 0.2rem;">{{custom_section_3_label}}</h2>
<p style="color: #333333; margin-bottom: 1rem;">{{custom_section_3_content}}</p>
</div>`;

export function useResumeDatabaseStore() {
  const { toast } = useToast();
  const { resumes, isLoading, createResume, updateResume } = useResumeApi();
  
  const [store, setStore] = useState<ResumeStore>({
    template: defaultTemplate,
    formData: initialFormData,
    detectedFields: [],
    savedStatus: 'saved',
    currentResumeId: undefined,
  });

  // Load first resume from database on mount
  useEffect(() => {
    if (!isLoading && resumes.length > 0) {
      const firstResume = resumes[0];
      setStore(prev => ({
        ...prev,
        template: firstResume.template,
        formData: firstResume,
        currentResumeId: firstResume.id,
        savedStatus: 'saved',
      }));
    }
  }, [resumes, isLoading]);

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

  // Auto-save to database with debouncing
  useEffect(() => {
    if (store.savedStatus === 'saving') {
      const timer = setTimeout(async () => {
        try {
          const resumeData = {
            template: store.template,
            ...store.formData,
          };

          if (store.currentResumeId) {
            // Update existing resume
            await updateResume({
              id: store.currentResumeId,
              data: resumeData,
            });
          } else {
            // Create new resume
            const newResume = await createResume(resumeData);
            setStore(prev => ({
              ...prev,
              currentResumeId: newResume.id,
            }));
          }

          setStore(prev => ({ ...prev, savedStatus: 'saved' }));
        } catch (error) {
          console.error('Failed to save resume:', error);
          setStore(prev => ({ ...prev, savedStatus: 'unsaved' }));
          
          toast({
            title: "Save Failed",
            description: "Failed to save your resume. Please try again.",
            variant: "destructive",
          });
        }
      }, 2000); // 2 second debounce

      return () => clearTimeout(timer);
    }
  }, [store.savedStatus, store.currentResumeId, createResume, updateResume, toast]);

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

  const createNewResume = useCallback(async () => {
    try {
      const newResume = await createResume({
        template: defaultTemplate,
        ...initialFormData,
      });
      
      setStore(prev => ({
        ...prev,
        template: defaultTemplate,
        formData: initialFormData,
        currentResumeId: newResume.id,
        detectedFields: detectFields(defaultTemplate),
        savedStatus: 'saved',
      }));
      
      toast({
        title: "New Resume Created",
        description: "A new resume has been created successfully.",
      });
    } catch (error) {
      console.error('Failed to create new resume:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create a new resume. Please try again.",
        variant: "destructive",
      });
    }
  }, [createResume, detectFields, toast]);

  // Initialize detected fields
  useEffect(() => {
    const fields = detectFields(store.template);
    setStore(prev => ({
      ...prev,
      detectedFields: fields,
    }));
  }, [detectFields, store.template]);

  return {
    ...store,
    updateTemplate,
    updateFormData,
    resetFormData,
    createNewResume,
    detectFields,
    resumes: resumes || [],
    isLoadingResumes: isLoading,
  };
}