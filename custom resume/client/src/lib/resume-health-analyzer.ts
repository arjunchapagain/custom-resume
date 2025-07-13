import { ResumeData } from '@/hooks/use-resume-database-store';

export interface HealthSuggestion {
  id: string;
  category: 'critical' | 'important' | 'enhancement';
  title: string;
  description: string;
  field?: keyof ResumeData;
  priority: number;
}

export interface HealthScore {
  overall: number;
  categories: {
    completeness: number;
    content: number;
    structure: number;
    ats: number;
  };
  suggestions: HealthSuggestion[];
}

export class ResumeHealthAnalyzer {
  private data: ResumeData;
  private template: string;

  constructor(data: ResumeData, template: string) {
    this.data = data;
    this.template = template;
  }

  analyze(): HealthScore {
    const suggestions: HealthSuggestion[] = [];
    
    // Analyze different aspects
    const completeness = this.analyzeCompleteness(suggestions);
    const content = this.analyzeContent(suggestions);
    const structure = this.analyzeStructure(suggestions);
    const ats = this.analyzeATSCompatibility(suggestions);
    
    // Calculate overall score
    const overall = Math.round((completeness + content + structure + ats) / 4);
    
    // Sort suggestions by priority and category
    suggestions.sort((a, b) => {
      if (a.category !== b.category) {
        const order = { critical: 3, important: 2, enhancement: 1 };
        return order[b.category] - order[a.category];
      }
      return b.priority - a.priority;
    });

    return {
      overall,
      categories: {
        completeness,
        content,
        structure,
        ats
      },
      suggestions
    };
  }

  private analyzeCompleteness(suggestions: HealthSuggestion[]): number {
    let score = 100;
    const requiredFields = [
      'name', 'job_title', 'email', 'phone', 'location',
      'current_job_title', 'current_company', 'current_duration',
      'education_degree', 'education_institution', 'education_location'
    ];

    // Check required fields
    for (const field of requiredFields) {
      if (!this.data[field as keyof ResumeData]?.trim()) {
        score -= 10;
        suggestions.push({
          id: `missing-${field}`,
          category: 'critical',
          title: `Missing ${field.replace('_', ' ')}`,
          description: `This field is required for a complete resume.`,
          field: field as keyof ResumeData,
          priority: 90
        });
      }
    }

    // Check skills
    const skills = [
      this.data.skill_1, this.data.skill_2, this.data.skill_3,
      this.data.skill_4, this.data.skill_5, this.data.skill_6,
      this.data.skill_7, this.data.skill_8, this.data.skill_9, this.data.skill_10
    ].filter(skill => skill?.trim());

    if (skills.length < 3) {
      score -= 15;
      suggestions.push({
        id: 'insufficient-skills',
        category: 'important',
        title: 'Add more skills',
        description: `You have only ${skills.length} skills listed. Add at least 5-8 relevant skills.`,
        field: 'skill_1',
        priority: 80
      });
    }

    // Check achievements
    const currentAchievements = [
      this.data.current_achievement_1, this.data.current_achievement_2,
      this.data.current_achievement_3, this.data.current_achievement_4,
      this.data.current_achievement_5, this.data.current_achievement_6
    ].filter(achievement => achievement?.trim());

    if (currentAchievements.length < 2) {
      score -= 10;
      suggestions.push({
        id: 'few-achievements',
        category: 'important',
        title: 'Add more achievements',
        description: 'Include at least 3-5 specific achievements for your current role.',
        field: 'current_achievement_1',
        priority: 75
      });
    }

    return Math.max(0, score);
  }

  private analyzeContent(suggestions: HealthSuggestion[]): number {
    let score = 100;

    // Check for action verbs in achievements
    const actionVerbs = [
      'achieved', 'created', 'developed', 'improved', 'increased', 'managed',
      'led', 'implemented', 'designed', 'optimized', 'resolved', 'delivered',
      'established', 'enhanced', 'streamlined', 'coordinated', 'executed'
    ];

    const allAchievements = [
      this.data.current_achievement_1, this.data.current_achievement_2,
      this.data.current_achievement_3, this.data.current_achievement_4,
      this.data.current_achievement_5, this.data.current_achievement_6,
      this.data.previous_achievement_1, this.data.previous_achievement_2,
      this.data.previous_achievement_3, this.data.previous_achievement_4,
      this.data.previous_achievement_5
    ].filter(achievement => achievement?.trim());

    const achievementsWithActionVerbs = allAchievements.filter(achievement => {
      const words = achievement.toLowerCase().split(' ');
      return actionVerbs.some(verb => words.some(word => word.startsWith(verb)));
    });

    if (achievementsWithActionVerbs.length < allAchievements.length * 0.6) {
      score -= 15;
      suggestions.push({
        id: 'weak-action-verbs',
        category: 'important',
        title: 'Use stronger action verbs',
        description: 'Start achievements with action verbs like "Achieved", "Developed", "Improved", etc.',
        priority: 70
      });
    }

    // Check for quantified achievements
    const quantifiedAchievements = allAchievements.filter(achievement => {
      return /\d+/.test(achievement) || /\%/.test(achievement);
    });

    if (quantifiedAchievements.length < allAchievements.length * 0.4) {
      score -= 20;
      suggestions.push({
        id: 'lack-quantification',
        category: 'important',
        title: 'Add numbers and metrics',
        description: 'Quantify your achievements with specific numbers, percentages, or metrics.',
        priority: 85
      });
    }

    // Check achievement length
    const shortAchievements = allAchievements.filter(achievement => 
      achievement.length < 30
    );

    if (shortAchievements.length > allAchievements.length * 0.5) {
      score -= 10;
      suggestions.push({
        id: 'brief-achievements',
        category: 'enhancement',
        title: 'Expand achievement descriptions',
        description: 'Provide more detailed descriptions of your accomplishments.',
        priority: 50
      });
    }

    // Check for keywords related to the job title
    const jobTitle = this.data.job_title.toLowerCase();
    const keywords = this.extractKeywords(jobTitle);
    const resumeText = this.getAllResumeText().toLowerCase();
    
    const matchingKeywords = keywords.filter(keyword => 
      resumeText.includes(keyword.toLowerCase())
    );

    if (matchingKeywords.length < keywords.length * 0.5) {
      score -= 15;
      suggestions.push({
        id: 'keyword-optimization',
        category: 'important',
        title: 'Include relevant keywords',
        description: `Add more keywords related to "${this.data.job_title}" throughout your resume.`,
        priority: 80
      });
    }

    return Math.max(0, score);
  }

  private analyzeStructure(suggestions: HealthSuggestion[]): number {
    let score = 100;

    // Check section labels
    const sectionLabels = [
      this.data.skills_section_label,
      this.data.experience_section_label,
      this.data.education_section_label,
      this.data.references_section_label
    ];

    const emptySections = sectionLabels.filter(label => !label?.trim());
    if (emptySections.length > 0) {
      score -= 10;
      suggestions.push({
        id: 'empty-section-labels',
        category: 'important',
        title: 'Add section labels',
        description: 'All sections should have clear, descriptive labels.',
        priority: 60
      });
    }

    // Check for additional information usage
    const additionalInfoFields = [
      this.data.additional_skills,
      this.data.current_additional_info,
      this.data.previous_additional_info,
      this.data.education_additional_info
    ];

    const usedAdditionalInfo = additionalInfoFields.filter(info => info?.trim());
    if (usedAdditionalInfo.length === 0) {
      score -= 5;
      suggestions.push({
        id: 'unused-additional-info',
        category: 'enhancement',
        title: 'Utilize additional information fields',
        description: 'Use additional information fields to provide more context about your experience.',
        priority: 30
      });
    }

    // Check for custom sections
    const customSections = [
      { label: this.data.custom_section_1_label, content: this.data.custom_section_1_content },
      { label: this.data.custom_section_2_label, content: this.data.custom_section_2_content },
      { label: this.data.custom_section_3_label, content: this.data.custom_section_3_content }
    ];

    const usedCustomSections = customSections.filter(section => 
      section.label?.trim() && section.content?.trim()
    );

    if (usedCustomSections.length === 0) {
      score -= 10;
      suggestions.push({
        id: 'no-custom-sections',
        category: 'enhancement',
        title: 'Add custom sections',
        description: 'Consider adding sections like "Projects", "Certifications", or "Awards" to stand out.',
        priority: 40
      });
    }

    return Math.max(0, score);
  }

  private analyzeATSCompatibility(suggestions: HealthSuggestion[]): number {
    let score = 100;

    // Check for proper contact information format
    const email = this.data.email;
    const phone = this.data.phone;

    if (!email.includes('@') || !email.includes('.')) {
      score -= 20;
      suggestions.push({
        id: 'invalid-email',
        category: 'critical',
        title: 'Fix email format',
        description: 'Email address appears to be invalid.',
        field: 'email',
        priority: 95
      });
    }

    if (phone.length < 10) {
      score -= 10;
      suggestions.push({
        id: 'incomplete-phone',
        category: 'important',
        title: 'Complete phone number',
        description: 'Phone number appears incomplete.',
        field: 'phone',
        priority: 70
      });
    }

    // Check for standard section names
    const standardSections = {
      skills: ['skills', 'technical skills', 'core competencies'],
      experience: ['experience', 'professional experience', 'work experience'],
      education: ['education', 'academic background'],
      references: ['references']
    };

    const currentLabels = {
      skills: this.data.skills_section_label?.toLowerCase(),
      experience: this.data.experience_section_label?.toLowerCase(),
      education: this.data.education_section_label?.toLowerCase(),
      references: this.data.references_section_label?.toLowerCase()
    };

    for (const [section, standardNames] of Object.entries(standardSections)) {
      const currentLabel = currentLabels[section as keyof typeof currentLabels];
      if (currentLabel && !standardNames.some(name => currentLabel.includes(name))) {
        score -= 5;
        suggestions.push({
          id: `non-standard-${section}`,
          category: 'enhancement',
          title: `Consider standard ${section} section name`,
          description: `Use a more standard section name like "${standardNames[0]}" for better ATS compatibility.`,
          priority: 25
        });
      }
    }

    // Check for consistent date formatting
    const dates = [this.data.current_duration, this.data.previous_duration].filter(d => d?.trim());
    const inconsistentDates = dates.filter(date => 
      !date.match(/\d{4}/) || (!date.includes('–') && !date.includes('-') && !date.toLowerCase().includes('present'))
    );

    if (inconsistentDates.length > 0) {
      score -= 10;
      suggestions.push({
        id: 'inconsistent-dates',
        category: 'enhancement',
        title: 'Use consistent date format',
        description: 'Use a consistent date format like "January 2020 – Present" or "2020-2023".',
        priority: 35
      });
    }

    return Math.max(0, score);
  }

  private extractKeywords(jobTitle: string): string[] {
    const keywordMap: { [key: string]: string[] } = {
      'engineer': ['software', 'development', 'programming', 'coding', 'technical'],
      'developer': ['programming', 'software', 'development', 'coding', 'web'],
      'analyst': ['analysis', 'data', 'research', 'reporting', 'metrics'],
      'manager': ['leadership', 'management', 'team', 'coordination', 'planning'],
      'support': ['troubleshooting', 'technical support', 'customer service', 'problem solving'],
      'cloud': ['aws', 'azure', 'cloud computing', 'serverless', 'infrastructure']
    };

    const keywords: string[] = [];
    for (const [key, values] of Object.entries(keywordMap)) {
      if (jobTitle.includes(key)) {
        keywords.push(...values);
      }
    }

    return keywords.length > 0 ? keywords : ['professional', 'experience', 'skills', 'management'];
  }

  private getAllResumeText(): string {
    const fields = [
      this.data.name, this.data.job_title, this.data.location,
      this.data.skill_1, this.data.skill_2, this.data.skill_3,
      this.data.skill_4, this.data.skill_5, this.data.skill_6,
      this.data.skill_7, this.data.skill_8, this.data.skill_9, this.data.skill_10,
      this.data.current_job_title, this.data.current_company,
      this.data.current_achievement_1, this.data.current_achievement_2,
      this.data.current_achievement_3, this.data.current_achievement_4,
      this.data.current_achievement_5, this.data.current_achievement_6,
      this.data.previous_job_title, this.data.previous_company,
      this.data.previous_achievement_1, this.data.previous_achievement_2,
      this.data.previous_achievement_3, this.data.previous_achievement_4,
      this.data.previous_achievement_5,
      this.data.education_degree, this.data.education_institution,
      this.data.additional_skills, this.data.current_additional_info,
      this.data.previous_additional_info, this.data.education_additional_info,
      this.data.custom_section_1_content, this.data.custom_section_2_content,
      this.data.custom_section_3_content
    ];

    return fields.filter(field => field?.trim()).join(' ');
  }
}