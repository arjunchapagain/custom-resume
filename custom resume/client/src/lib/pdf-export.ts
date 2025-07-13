import html2pdf from 'html2pdf.js';

export interface ExportOptions {
  filename: string;
  paperSize: 'a4' | 'letter' | 'legal';
  includeMetadata: boolean;
  format: 'pdf' | 'doc';
}

export async function exportToPDF(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { filename, paperSize, includeMetadata } = options;
  
  // Configure html2pdf options
  const pdfOptions = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'in', 
      format: paperSize === 'a4' ? 'a4' : paperSize === 'letter' ? 'letter' : 'legal',
      orientation: 'portrait',
    },
  };

  // Add metadata if requested
  if (includeMetadata) {
    pdfOptions.jsPDF = {
      ...pdfOptions.jsPDF,
      // @ts-ignore - html2pdf types don't include metadata options
      metadata: {
        title: `${filename} - Resume`,
        author: 'Resume Builder',
        creator: 'Resume Builder App',
        producer: 'html2pdf.js',
        creationDate: new Date(),
      },
    };
  }

  try {
    await html2pdf().set(pdfOptions).from(element).save();
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to export PDF. Please try again.');
  }
}

export function exportToDoc(htmlContent: string, filename: string): void {
  try {
    // Create a complete HTML document for Word
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #000000;
            background: white;
            margin: 1in;
            max-width: none;
          }
          h1 { 
            font-size: 18pt; 
            font-weight: bold; 
            margin-bottom: 6pt; 
            color: #000000; 
          }
          h2 { 
            font-size: 14pt; 
            font-weight: bold; 
            margin: 12pt 0 6pt 0; 
            color: #000000; 
            border-bottom: 1px solid #000000; 
            padding-bottom: 2pt; 
          }
          h3 { 
            font-size: 12pt; 
            font-weight: bold; 
            margin: 6pt 0 3pt 0; 
            color: #000000; 
          }
          p { 
            margin-bottom: 6pt; 
            color: #000000; 
            font-size: 11pt;
          }
          ul { 
            margin-left: 0.5in; 
            margin-bottom: 6pt; 
          }
          li { 
            margin-bottom: 2pt; 
            color: #000000; 
            font-size: 11pt;
          }
          .contact-info {
            text-align: center;
            margin-bottom: 12pt;
          }
          .section {
            margin-bottom: 12pt;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Create blob and download link
    const blob = new Blob([fullHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('DOC export failed:', error);
    throw new Error('Failed to export DOC. Please try again.');
  }
}

export async function exportResume(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { format } = options;
  
  if (format === 'pdf') {
    await exportToPDF(element, options);
  } else if (format === 'doc') {
    exportToDoc(element.innerHTML, options.filename);
  } else {
    throw new Error('Unsupported export format');
  }
}

export function createExportableElement(htmlContent: string): HTMLElement {
  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  element.style.cssText = `
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background: white;
    padding: 2rem;
    max-width: 8.5in;
    margin: 0 auto;
  `;
  
  // Apply resume-specific styles
  const styles = `
    <style>
      h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; color: #111827; }
      h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; }
      h3 { font-size: 1.125rem; font-weight: 600; margin: 1rem 0 0.5rem 0; color: #111827; }
      p { margin-bottom: 0.75rem; color: #374151; }
      ul { margin-left: 1.5rem; margin-bottom: 1rem; }
      li { margin-bottom: 0.25rem; color: #374151; }
      .text-lg { font-size: 1.125rem; }
      .text-slate-600 { color: #475569; }
      .text-slate-600 { color: #475569; }
    </style>
  `;
  
  element.innerHTML = styles + element.innerHTML;
  return element;
}
