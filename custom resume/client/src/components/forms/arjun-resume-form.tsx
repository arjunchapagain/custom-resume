import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from '@/hooks/use-resume-database-store';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  job_title: z.string().min(1, 'Job title is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
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
  current_job_title: z.string().min(1, 'Current job title is required'),
  current_company: z.string().min(1, 'Current company is required'),
  current_duration: z.string().min(1, 'Duration is required'),
  current_achievement_1: z.string().optional(),
  current_achievement_2: z.string().optional(),
  current_achievement_3: z.string().optional(),
  current_achievement_4: z.string().optional(),
  current_achievement_5: z.string().optional(),
  current_achievement_6: z.string().optional(),
  previous_job_title: z.string().optional(),
  previous_company: z.string().optional(),
  previous_duration: z.string().optional(),
  previous_achievement_1: z.string().optional(),
  previous_achievement_2: z.string().optional(),
  previous_achievement_3: z.string().optional(),
  previous_achievement_4: z.string().optional(),
  previous_achievement_5: z.string().optional(),
  education_degree: z.string().min(1, 'Degree is required'),
  education_institution: z.string().min(1, 'Institution is required'),
  education_location: z.string().min(1, 'Education location is required'),
  references: z.string().min(1, 'References field is required'),
});

interface ArjunResumeFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
  onReset: () => void;
}

export default function ArjunResumeForm({ data, onChange, onReset }: ArjunResumeFormProps) {
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
            <p className="text-sm text-slate-500 mt-1">Update your details to customize your resume</p>
          </div>
          
          <div className="p-6">
            <Form {...form}>
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
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
                          <FormLabel>Job Title/Role</FormLabel>
                          <FormControl>
                            <Input 
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input 
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
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
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
                        <FormItem className="md:col-span-2">
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
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
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Technical Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <FormField
                        key={num}
                        control={form.control}
                        name={`skill_${num}` as keyof ResumeData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skill {num}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange(`skill_${num}` as keyof ResumeData, e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Current Employment */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Current Employment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="current_job_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input 
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
                    
                    <FormField
                      control={form.control}
                      name="current_duration"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input 
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
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700">Key Achievements</p>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <FormField
                        key={num}
                        control={form.control}
                        name={`current_achievement_${num}` as keyof ResumeData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Achievement {num}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange(`current_achievement_${num}` as keyof ResumeData, e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Previous Employment */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Previous Employment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="previous_job_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input 
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
                    
                    <FormField
                      control={form.control}
                      name="previous_duration"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input 
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
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700">Key Achievements</p>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <FormField
                        key={num}
                        control={form.control}
                        name={`previous_achievement_${num}` as keyof ResumeData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Achievement {num}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange(`previous_achievement_${num}` as keyof ResumeData, e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Education</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="education_degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input 
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
                    
                    <FormField
                      control={form.control}
                      name="education_location"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input 
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
                  </div>
                </div>

                {/* References */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">References</h4>
                  <FormField
                    control={form.control}
                    name="references"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            rows={2}
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

                {/* Reset Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <Button variant="outline" onClick={onReset}>
                    Reset to Default
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}