import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from '@/hooks/use-resume-store';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  job_title: z.string().min(1, 'Job title is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').or(z.literal('')),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  skills: z.string().min(1, 'Skills are required'),
  experience_title: z.string().min(1, 'Experience title is required'),
  experience_company: z.string().min(1, 'Company name is required'),
  experience_duration: z.string().min(1, 'Duration is required'),
  experience_point_1: z.string().min(1, 'First achievement is required'),
  experience_point_2: z.string().min(1, 'Second achievement is required'),
  experience_point_3: z.string().min(1, 'Third achievement is required'),
  education_degree: z.string().min(1, 'Degree is required'),
  education_institution: z.string().min(1, 'Institution is required'),
  education_year: z.string().min(1, 'Year is required'),
  certifications: z.string().min(1, 'Certifications are required'),
});

interface FieldsFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
  onReset: () => void;
}

export default function FieldsForm({ data, onChange, onReset }: FieldsFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
    values: data, // This ensures the form updates when data changes
  });

  const onSubmit = (values: ResumeData) => {
    onChange(values);
  };

  // Real-time updates as user types
  const handleFieldChange = (field: keyof ResumeData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-medium text-slate-800">Fill Your Information</h3>
            <p className="text-sm text-slate-500 mt-1">Complete the fields below to customize your resume</p>
          </div>
          
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
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
                              placeholder="John Doe" 
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
                              placeholder="Cloud Support Engineer" 
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
                              placeholder="San Francisco, CA" 
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
                              placeholder="john@example.com" 
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
                              type="tel"
                              placeholder="(555) 123-4567" 
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
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input 
                              type="url"
                              placeholder="https://linkedin.com/in/johndoe" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('linkedin', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Professional Summary */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Professional Summary</h4>
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Write a compelling professional summary..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleFieldChange('summary', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Skills */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Technical Skills</h4>
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            rows={3}
                            placeholder="List your technical skills..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleFieldChange('skills', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Experience */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Current/Latest Experience</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="experience_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Cloud Support Engineer"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_title', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience_company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tech Solutions Inc."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_company', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience_duration"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="January 2021 - Present"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_duration', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="experience_point_1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Achievement 1</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Reduced customer response time by 40%"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_point_1', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience_point_2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Achievement 2</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Implemented automated monitoring solutions"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_point_2', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience_point_3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Achievement 3</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Led team of 5 junior engineers"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('experience_point_3', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                              placeholder="University of California"
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
                      name="education_year"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="2018"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange('education_year', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Certifications */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-4">Certifications</h4>
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            rows={3}
                            placeholder="List your relevant certifications..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleFieldChange('certifications', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onReset}
                  >
                    Reset Form
                  </Button>
                  <Button type="submit">
                    Update Preview
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
