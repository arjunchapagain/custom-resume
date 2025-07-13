import { useState } from 'react';
import { Save, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import NavigationSidebar from '@/components/sidebar/navigation-sidebar';
import TiptapEditor from '@/components/editor/tiptap-editor';
import EnhancedResumeForm from '@/components/forms/enhanced-resume-form';
import ResumePreview from '@/components/preview/resume-preview';
import ResumeHealthScore from '@/components/health/resume-health-score';
import { useResumeDatabaseStore } from '@/hooks/use-resume-database-store';
import { useToast } from '@/hooks/use-toast';

const tabInfo = {
  template: {
    title: 'Edit Template',
    description: 'Create your master resume template with dynamic placeholders',
  },
  fields: {
    title: 'Fill Fields',
    description: 'Complete your information to customize the resume',
  },
  health: {
    title: 'Health Score',
    description: 'Get improvement suggestions and optimize your resume',
  },
  preview: {
    title: 'Preview & Export',
    description: 'Review your resume and export to PDF or Word',
  },
};

export default function Home() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('template');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const {
    template,
    formData,
    detectedFields,
    savedStatus,
    updateTemplate,
    updateFormData,
    resetFormData,
    createNewResume,
    isLoadingResumes,
  } = useResumeDatabaseStore();

  const currentTabInfo = tabInfo[activeTab as keyof typeof tabInfo];

  const handleSaveTemplate = () => {
    // Template is already auto-saved via the store
    toast({
      title: "Template Saved",
      description: "Your resume template has been saved successfully.",
    });
  };

  const handleFieldFocus = (field: keyof typeof formData) => {
    setFocusedField(field);
    setActiveTab('fields');
    // Small delay to ensure tab switch completes before focusing
    setTimeout(() => {
      const element = document.querySelector(`[name="${field}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement).focus();
      }
    }, 100);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'template':
        return (
          <TiptapEditor
            content={template}
            onChange={updateTemplate}
            detectedFields={detectedFields}
          />
        );
      case 'fields':
        return (
          <EnhancedResumeForm
            data={formData}
            onChange={updateFormData}
            onReset={resetFormData}
          />
        );
      case 'health':
        return (
          <ResumeHealthScore
            data={formData}
            template={template}
            onFieldFocus={handleFieldFocus}
          />
        );
      case 'preview':
        return (
          <ResumePreview
            template={template}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <NavigationSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedStatus={savedStatus}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {currentTabInfo.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {currentTabInfo.description}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Help Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How to Use Dynamic Fields</DialogTitle>
                    <DialogDescription>
                      Learn how to create dynamic resume templates
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Template Placeholders</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Use double curly braces to create dynamic fields:
                      </p>
                      <code className="block bg-slate-100 p-2 rounded text-sm">
                        {`{{name}}, {{job_title}}, {{summary}}`}
                      </code>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Best Practices</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Use descriptive field names</li>
                        <li>• Keep placeholders lowercase with underscores</li>
                        <li>• Test your template before exporting</li>
                        <li>• Fill all fields for best results</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={createNewResume} disabled={isLoadingResumes}>
                  <Save className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
                
                {activeTab === 'template' && (
                  <Button onClick={handleSaveTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Tab Content */}
        <main className="flex-1 overflow-hidden">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
