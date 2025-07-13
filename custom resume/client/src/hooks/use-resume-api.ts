import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ResumeData } from './use-resume-database-store';

// Types for API communication
interface ApiResume {
  id: number;
  userId: number;
  template: string;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  phone: string;
  
  // Skills section
  skillsSectionLabel: string;
  skillsSubsectionLabel: string | null;
  skill1: string | null;
  skill2: string | null;
  skill3: string | null;
  skill4: string | null;
  skill5: string | null;
  skill6: string | null;
  skill7: string | null;
  skill8: string | null;
  skill9: string | null;
  skill10: string | null;
  additionalSkills: string | null;
  
  // Experience section
  experienceSectionLabel: string;
  currentJobTitle: string;
  currentCompany: string;
  currentDuration: string;
  currentAchievement1: string | null;
  currentAchievement2: string | null;
  currentAchievement3: string | null;
  currentAchievement4: string | null;
  currentAchievement5: string | null;
  currentAchievement6: string | null;
  currentAdditionalInfo: string | null;
  
  previousJobTitle: string | null;
  previousCompany: string | null;
  previousDuration: string | null;
  previousAchievement1: string | null;
  previousAchievement2: string | null;
  previousAchievement3: string | null;
  previousAchievement4: string | null;
  previousAchievement5: string | null;
  previousAdditionalInfo: string | null;
  
  // Education section
  educationSectionLabel: string;
  educationDegree: string;
  educationInstitution: string;
  educationLocation: string;
  educationAdditionalInfo: string | null;
  
  // References section
  referencesSectionLabel: string;
  references: string | null;
  
  // Custom sections
  customSection1Label: string | null;
  customSection1Content: string | null;
  customSection2Label: string | null;
  customSection2Content: string | null;
  customSection3Label: string | null;
  customSection3Content: string | null;
  
  createdAt: string;
  updatedAt: string;
}

// Convert API resume to frontend format
function apiToResumeData(apiResume: ApiResume): ResumeData & { id: number; template: string } {
  return {
    id: apiResume.id,
    template: apiResume.template,
    name: apiResume.name,
    job_title: apiResume.jobTitle,
    location: apiResume.location,
    email: apiResume.email,
    phone: apiResume.phone,
    
    // Skills section
    skills_section_label: apiResume.skillsSectionLabel,
    skills_subsection_label: apiResume.skillsSubsectionLabel || '',
    skill_1: apiResume.skill1 || '',
    skill_2: apiResume.skill2 || '',
    skill_3: apiResume.skill3 || '',
    skill_4: apiResume.skill4 || '',
    skill_5: apiResume.skill5 || '',
    skill_6: apiResume.skill6 || '',
    skill_7: apiResume.skill7 || '',
    skill_8: apiResume.skill8 || '',
    skill_9: apiResume.skill9 || '',
    skill_10: apiResume.skill10 || '',
    additional_skills: apiResume.additionalSkills || '',
    
    // Experience section
    experience_section_label: apiResume.experienceSectionLabel,
    current_job_title: apiResume.currentJobTitle,
    current_company: apiResume.currentCompany,
    current_duration: apiResume.currentDuration,
    current_achievement_1: apiResume.currentAchievement1 || '',
    current_achievement_2: apiResume.currentAchievement2 || '',
    current_achievement_3: apiResume.currentAchievement3 || '',
    current_achievement_4: apiResume.currentAchievement4 || '',
    current_achievement_5: apiResume.currentAchievement5 || '',
    current_achievement_6: apiResume.currentAchievement6 || '',
    current_additional_info: apiResume.currentAdditionalInfo || '',
    
    previous_job_title: apiResume.previousJobTitle || '',
    previous_company: apiResume.previousCompany || '',
    previous_duration: apiResume.previousDuration || '',
    previous_achievement_1: apiResume.previousAchievement1 || '',
    previous_achievement_2: apiResume.previousAchievement2 || '',
    previous_achievement_3: apiResume.previousAchievement3 || '',
    previous_achievement_4: apiResume.previousAchievement4 || '',
    previous_achievement_5: apiResume.previousAchievement5 || '',
    previous_additional_info: apiResume.previousAdditionalInfo || '',
    
    // Education section
    education_section_label: apiResume.educationSectionLabel,
    education_degree: apiResume.educationDegree,
    education_institution: apiResume.educationInstitution,
    education_location: apiResume.educationLocation,
    education_additional_info: apiResume.educationAdditionalInfo || '',
    
    // References section
    references_section_label: apiResume.referencesSectionLabel,
    references: apiResume.references || '',
    
    // Custom sections
    custom_section_1_label: apiResume.customSection1Label || '',
    custom_section_1_content: apiResume.customSection1Content || '',
    custom_section_2_label: apiResume.customSection2Label || '',
    custom_section_2_content: apiResume.customSection2Content || '',
    custom_section_3_label: apiResume.customSection3Label || '',
    custom_section_3_content: apiResume.customSection3Content || '',
  };
}

// Convert frontend format to API format
function resumeDataToApi(data: ResumeData & { template: string }): Omit<ApiResume, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  return {
    template: data.template,
    name: data.name,
    jobTitle: data.job_title,
    location: data.location,
    email: data.email,
    phone: data.phone,
    
    // Skills section
    skillsSectionLabel: data.skills_section_label,
    skillsSubsectionLabel: data.skills_subsection_label || null,
    skill1: data.skill_1 || null,
    skill2: data.skill_2 || null,
    skill3: data.skill_3 || null,
    skill4: data.skill_4 || null,
    skill5: data.skill_5 || null,
    skill6: data.skill_6 || null,
    skill7: data.skill_7 || null,
    skill8: data.skill_8 || null,
    skill9: data.skill_9 || null,
    skill10: data.skill_10 || null,
    additionalSkills: data.additional_skills || null,
    
    // Experience section
    experienceSectionLabel: data.experience_section_label,
    currentJobTitle: data.current_job_title,
    currentCompany: data.current_company,
    currentDuration: data.current_duration,
    currentAchievement1: data.current_achievement_1 || null,
    currentAchievement2: data.current_achievement_2 || null,
    currentAchievement3: data.current_achievement_3 || null,
    currentAchievement4: data.current_achievement_4 || null,
    currentAchievement5: data.current_achievement_5 || null,
    currentAchievement6: data.current_achievement_6 || null,
    currentAdditionalInfo: data.current_additional_info || null,
    
    previousJobTitle: data.previous_job_title || null,
    previousCompany: data.previous_company || null,
    previousDuration: data.previous_duration || null,
    previousAchievement1: data.previous_achievement_1 || null,
    previousAchievement2: data.previous_achievement_2 || null,
    previousAchievement3: data.previous_achievement_3 || null,
    previousAchievement4: data.previous_achievement_4 || null,
    previousAchievement5: data.previous_achievement_5 || null,
    previousAdditionalInfo: data.previous_additional_info || null,
    
    // Education section
    educationSectionLabel: data.education_section_label,
    educationDegree: data.education_degree,
    educationInstitution: data.education_institution,
    educationLocation: data.education_location,
    educationAdditionalInfo: data.education_additional_info || null,
    
    // References section
    referencesSectionLabel: data.references_section_label,
    references: data.references || null,
    
    // Custom sections
    customSection1Label: data.custom_section_1_label || null,
    customSection1Content: data.custom_section_1_content || null,
    customSection2Label: data.custom_section_2_label || null,
    customSection2Content: data.custom_section_2_content || null,
    customSection3Label: data.custom_section_3_label || null,
    customSection3Content: data.custom_section_3_content || null,
  };
}

export function useResumeApi() {
  const queryClient = useQueryClient();

  // Fetch all resumes
  const resumesQuery = useQuery({
    queryKey: ['/api/resumes'],
    queryFn: async () => {
      const response = await fetch('/api/resumes');
      if (!response.ok) throw new Error('Failed to fetch resumes');
      const data: ApiResume[] = await response.json();
      return data.map(apiToResumeData);
    },
  });

  // Fetch single resume
  const useResumeQuery = (id: number) => useQuery({
    queryKey: ['/api/resumes', id],
    queryFn: async () => {
      const response = await fetch(`/api/resumes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch resume');
      const data: ApiResume = await response.json();
      return apiToResumeData(data);
    },
    enabled: !!id,
  });

  // Create resume mutation
  const createResumeMutation = useMutation({
    mutationFn: async (data: ResumeData & { template: string }) => {
      const response = await apiRequest('/api/resumes', {
        method: 'POST',
        body: JSON.stringify(resumeDataToApi(data)),
      });
      return apiToResumeData(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
    },
  });

  // Update resume mutation
  const updateResumeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ResumeData & { template: string }> }) => {
      const response = await apiRequest(`/api/resumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(resumeDataToApi(data as ResumeData & { template: string })),
      });
      return apiToResumeData(response);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/resumes', variables.id] });
    },
  });

  // Delete resume mutation
  const deleteResumeMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/resumes/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
    },
  });

  return {
    resumes: resumesQuery.data || [],
    isLoading: resumesQuery.isLoading,
    error: resumesQuery.error,
    useResumeQuery,
    createResume: createResumeMutation.mutateAsync,
    updateResume: updateResumeMutation.mutateAsync,
    deleteResume: deleteResumeMutation.mutateAsync,
    isCreating: createResumeMutation.isPending,
    isUpdating: updateResumeMutation.isPending,
    isDeleting: deleteResumeMutation.isPending,
  };
}