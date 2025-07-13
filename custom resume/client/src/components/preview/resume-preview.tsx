import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ZoomIn, ZoomOut, FileText, Download } from 'lucide-react';
import { ResumeData } from '@/hooks/use-resume-database-store';
import { replaceTemplatePlaceholders } from '@/lib/template-engine';
import { exportToPDF, exportToDoc, exportResume, createExportableElement, ExportOptions } from '@/lib/pdf-export';
import { useToast } from '@/hooks/use-toast';

interface ResumePreviewProps {
  template: string;
  formData: ResumeData;
}

export default function ResumePreview({ template, formData }: ResumePreviewProps) {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    filename: 'Resume',
    paperSize: 'letter',
    includeMetadata: true,
    format: 'pdf',
  });
  const [isExporting, setIsExporting] = useState(false);

  const processedContent = replaceTemplatePlaceholders(template, formData);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newLevel = direction === 'in' ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(200, newLevel));
    });
  };

  const handleExport = async (format: 'pdf' | 'doc') => {
    if (!previewRef.current || isExporting) return;

    setIsExporting(true);
    try {
      const exportOptionsWithFormat = { ...exportOptions, format };
      
      if (format === 'pdf') {
        const exportElement = createExportableElement(processedContent);
        await exportResume(exportElement, exportOptionsWithFormat);
      } else if (format === 'doc') {
        await exportResume(previewRef.current, exportOptionsWithFormat);
      }
      
      toast({
        title: "Export Successful",
        description: `Resume exported as ${exportOptions.filename}.${format}`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Generate filename from form data
  const generateFilename = () => {
    const name = formData.name?.replace(/\s+/g, '_') || 'Resume';
    const jobTitle = formData.job_title?.replace(/\s+/g, '_');
    return jobTitle ? `${name}_${jobTitle}_Resume` : `${name}_Resume`;
  };

  // Update filename when form data changes
  const autoFilename = generateFilename();
  if (exportOptions.filename !== autoFilename) {
    setExportOptions(prev => ({ ...prev, filename: autoFilename }));
  }

  return (
    <div className="flex h-full">
      {/* Preview Panel */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-medium text-slate-800">Resume Preview</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-500 min-w-[50px] text-center">
                {zoomLevel}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Resume Preview Content */}
          <div className="flex-1 p-6 bg-gray-50 overflow-auto">
            <div
              ref={previewRef}
              className="bg-white shadow-lg max-w-2xl mx-auto resume-preview"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                minHeight: '11in',
                width: '8.5in',
                padding: '1in',
                fontSize: '11px',
                lineHeight: '1.5',
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: '#000000',
                boxSizing: 'border-box'
              }}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent }}
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  wordWrap: 'break-word'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Export Options Panel */}
      <div className="w-80 p-6">
        <div className="space-y-6">
          {/* Export Options */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-medium text-slate-800 mb-4">Download Resume</h3>
            <div className="space-y-3">
              <Button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors bg-white text-slate-700 hover:text-red-600"
                variant="outline"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <span className="font-medium">
                    {isExporting ? 'Exporting...' : 'Download as PDF'}
                  </span>
                </div>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => handleExport('doc')}
                disabled={isExporting}
                className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors bg-white text-slate-700 hover:text-blue-600"
                variant="outline"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">
                    {isExporting ? 'Exporting...' : 'Download as DOC'}
                  </span>
                </div>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Export Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-medium text-slate-800 mb-4">Export Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="filename" className="text-sm font-medium text-slate-700 mb-2 block">
                  File Name
                </Label>
                <Input
                  id="filename"
                  value={exportOptions.filename}
                  onChange={(e) =>
                    setExportOptions(prev => ({ ...prev, filename: e.target.value }))
                  }
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Paper Size
                </Label>
                <Select
                  value={exportOptions.paperSize}
                  onValueChange={(value: 'a4' | 'letter' | 'legal') =>
                    setExportOptions(prev => ({ ...prev, paperSize: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="metadata"
                  checked={exportOptions.includeMetadata}
                  onCheckedChange={(checked) =>
                    setExportOptions(prev => ({ ...prev, includeMetadata: !!checked }))
                  }
                />
                <Label htmlFor="metadata" className="text-sm text-slate-700">
                  Include metadata
                </Label>
              </div>
            </div>
          </div>
          
          {/* Help Text */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <h4 className="font-medium text-blue-900 mb-2">Tips for Best Results</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Fill all fields for a complete resume</li>
              <li>• Use the zoom controls to check formatting</li>
              <li>• PDF format is recommended for online applications</li>
              <li>• DOC format works well for editing and ATS systems</li>
              <li>• Check the preview before downloading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
