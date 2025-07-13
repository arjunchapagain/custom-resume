import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ResumeData } from '@/hooks/use-resume-database-store';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  job_title: z.string().min(1, 'Job title is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  
  // Skills section
  skills_section_label: z.string().min(1, 'Skills section label is required'),
  skills_subsection_label: z.string().optional(),
  skill_1: z.string().optional(),
  skill_2: z.string().optional(),
  skill_3: z.string().optional(),
  skill_4: z.string().optional(),
  skill_5: z.string().optional(),
  skill_6: z.string().optional(),
  skill_7: z.string().optional(),
  skill_8: z.string().optional(),
  skill_9: z.string().optional(),
  skill_10: z.string().optional(),
  additional_skills: z.string().optional(),
  
  // Experience section
  experience_section_label: z.string().min(1, 'Experience section label is required'),
  current_job_title: z.string().min(1, 'Current job title is required'),
  current_company: z.string().min(1, 'Current company is required'),
  current_duration: z.string().min(1, 'Duration is required'),
  current_achievement_1: z.string().optional(),
  current_achievement_2: z.string().optional(),
  current_achievement_3: z.string().optional(),
  current_achievement_4: z.string().optional(),
  current_achievement_5: z.string().optional(),
  current_achievement_6: z.string().optional(),
  current_additional_info: z.string().optional(),
  
  previous_job_title: z.string().optional(),
  previous_company: z.string().optional(),
  previous_duration: z.string().optional(),
  previous_achievement_1: z.string().optional(),
  previous_achievement_2: z.string().optional(),
  previous_achievement_3: z.string().optional(),
  previous_achievement_4: z.string().optional(),
  previous_achievement_5: z.string().optional(),
  previous_additional_info: z.string().optional(),
  
  // Custom experience subsections
  experience_custom_subsection_1_label: z.string().optional(),
  experience_custom_subsection_1_content: z.string().optional(),
  experience_custom_subsection_2_label: z.string().optional(),
  experience_custom_subsection_2_content: z.string().optional(),
  
  // Education section
  education_section_label: z.string().min(1, 'Education section label is required'),
  education_degree: z.string().min(1, 'Degree is required'),
  education_institution: z.string().min(1, 'Institution is required'),
  education_location: z.string().min(1, 'Education location is required'),
  education_additional_info: z.string().optional(),
  
  // Custom education subsections
  education_custom_subsection_1_label: z.string().optional(),
  education_custom_subsection_1_content: z.string().optional(),
  education_custom_subsection_2_label: z.string().optional(),
  education_custom_subsection_2_content: z.string().optional(),
  
  // References section
  references_section_label: z.string().min(1, 'References section label is required'),
  references: z.string().optional(),
  
  // Custom sections
  custom_section_1_label: z.string().optional(),
  custom_section_1_content: z.string().optional(),
  custom_section_2_label: z.string().optional(),
  custom_section_2_content: z.string().optional(),
  custom_section_3_label: z.string().optional(),
  custom_section_3_content: z.string().optional(),
});

interface EnhancedResumeFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
  onReset: () => void;
}

export default function EnhancedResumeForm({ data, onChange, onReset }: EnhancedResumeFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
    values: data,
  });

  const handleFieldChange = (field: keyof ResumeData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-medium text-slate-800">Fill Your Resume Information</h3>
            <p className="text-sm text-slate-500 mt-1">Update your details and customize section labels</p>
          </div>
          
          <div className="p-6">
            <Form {...form}>
              <Accordion type="multiple" defaultValue={['personal', 'skills', 'experience', 'education']} className="w-full">
                
                {/* Personal Information */}
                <AccordionItem value="personal">
                  <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('name', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="job_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Software Engineer" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('job_title', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('email', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(123) 456-7890" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('phone', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="City, State" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('location', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Skills Section */}
                <AccordionItem value="skills">
                  <AccordionTrigger className="text-lg font-semibold">Skills Section</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="skills_section_label"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Section Label</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="TECHNICAL SKILLS" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFieldChange('skills_section_label', e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="skills_subsection_label"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subsection Label (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Computer Software & Hardware:" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFieldChange('skills_subsection_label', e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 10 }, (_, i) => (
                          <FormField
                            key={i}
                            control={form.control}
                            name={`skill_${i + 1}` as keyof ResumeData}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill {i + 1}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={`Enter skill ${i + 1}`} 
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange(`skill_${i + 1}` as keyof ResumeData, e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="additional_skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Skills Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any additional skills or certifications..."
                                className="min-h-20"
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('additional_skills', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Experience Section */}
                <AccordionItem value="experience">
                  <AccordionTrigger className="text-lg font-semibold">Professional Experience</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="experience_section_label"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Label</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="PROFESSIONAL EXPERIENCE" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('experience_section_label', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium mb-4">Current Position</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="current_job_title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Senior Software Engineer" 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('current_job_title', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="current_company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Company Name" 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('current_company', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="current_duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="January 2020 - Present" 
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('current_duration', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 6 }, (_, i) => (
                              <FormField
                                key={i}
                                control={form.control}
                                name={`current_achievement_${i + 1}` as keyof ResumeData}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Achievement {i + 1}</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder={`Enter achievement ${i + 1}`}
                                        className="min-h-16"
                                        {...field} 
                                        onChange={(e) => {
                                          field.onChange(e);
                                          handleFieldChange(`current_achievement_${i + 1}` as keyof ResumeData, e.target.value);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="current_additional_info"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any additional information about this position..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('current_additional_info', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium mb-4">Previous Position</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="previous_job_title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Software Engineer" 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('previous_job_title', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="previous_company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Previous Company Name" 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('previous_company', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="previous_duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="January 2018 - December 2019" 
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('previous_duration', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 5 }, (_, i) => (
                              <FormField
                                key={i}
                                control={form.control}
                                name={`previous_achievement_${i + 1}` as keyof ResumeData}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Achievement {i + 1}</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder={`Enter achievement ${i + 1}`}
                                        className="min-h-16"
                                        {...field} 
                                        onChange={(e) => {
                                          field.onChange(e);
                                          handleFieldChange(`previous_achievement_${i + 1}` as keyof ResumeData, e.target.value);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="previous_additional_info"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Any additional information about this position..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('previous_additional_info', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      {/* Custom Experience Subsections */}
                      <div className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium mb-4">Custom Experience Subsections</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="experience_custom_subsection_1_label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Subsection 1 Label</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Projects, Certifications, Awards..." 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('experience_custom_subsection_1_label', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="experience_custom_subsection_2_label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Subsection 2 Label</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Leadership, Volunteer Work..." 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('experience_custom_subsection_2_label', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="experience_custom_subsection_1_content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom Subsection 1 Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Detail your custom experience subsection content here..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('experience_custom_subsection_1_content', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="experience_custom_subsection_2_content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom Subsection 2 Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Detail your custom experience subsection content here..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('experience_custom_subsection_2_content', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Education Section */}
                <AccordionItem value="education">
                  <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="education_section_label"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Label</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="EDUCATION" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('education_section_label', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="education_degree"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Bachelor of Science in Computer Science" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFieldChange('education_degree', e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="education_institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="University Name" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleFieldChange('education_institution', e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="education_location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="City, State" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('education_location', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="education_additional_info"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="GPA, honors, relevant coursework, etc."
                                className="min-h-20"
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('education_additional_info', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Custom Education Subsections */}
                      <div className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium mb-4">Custom Education Subsections</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="education_custom_subsection_1_label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Subsection 1 Label</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Coursework, Thesis, Research..." 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('education_custom_subsection_1_label', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="education_custom_subsection_2_label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Subsection 2 Label</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Activities, Honors, Societies..." 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange('education_custom_subsection_2_label', e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="education_custom_subsection_1_content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom Subsection 1 Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Detail your custom education subsection content here..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('education_custom_subsection_1_content', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="education_custom_subsection_2_content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom Subsection 2 Content</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Detail your custom education subsection content here..."
                                    className="min-h-20"
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleFieldChange('education_custom_subsection_2_content', e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* References Section */}
                <AccordionItem value="references">
                  <AccordionTrigger className="text-lg font-semibold">References</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="references_section_label"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Label</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="REFERENCES" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('references_section_label', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="references"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>References</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Available upon request, or list specific references..."
                                className="min-h-20"
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange('references', e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Custom Sections */}
                <AccordionItem value="custom">
                  <AccordionTrigger className="text-lg font-semibold">Custom Sections</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg p-4">
                          <h4 className="font-medium mb-4">Custom Section {i + 1}</h4>
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name={`custom_section_${i + 1}_label` as keyof ResumeData}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Section Label</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., CERTIFICATIONS, PROJECTS, AWARDS" 
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange(`custom_section_${i + 1}_label` as keyof ResumeData, e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`custom_section_${i + 1}_content` as keyof ResumeData}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Content</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Enter the content for this section..."
                                      className="min-h-24"
                                      {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleFieldChange(`custom_section_${i + 1}_content` as keyof ResumeData, e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onReset}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Reset Form
                  </Button>
                  <p className="text-sm text-slate-500">
                    Changes are automatically saved
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}