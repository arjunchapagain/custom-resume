import { ResumeData } from '@/hooks/use-resume-database-store';

export function replaceTemplatePlaceholders(template: string, data: ResumeData): string {
  let result = template;
  
  // Replace all {{field_name}} placeholders with corresponding data values
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(placeholder, value || '');
  });
  
  // Remove empty skill list items and their containing <li> tags
  result = removeEmptyListItems(result);
  
  // Clean up empty sections and extra whitespace
  result = cleanupEmptyContent(result);
  
  return result;
}

function removeEmptyListItems(html: string): string {
  // Remove <li> tags that are empty or contain only whitespace
  return html.replace(/<li>\s*<\/li>/g, '').replace(/<li><\/li>/g, '');
}

function cleanupEmptyContent(html: string): string {
  // Remove empty paragraphs and headings
  let result = html.replace(/<p>\s*<\/p>/g, '');
  result = result.replace(/<h[1-6]>\s*<\/h[1-6]>/g, '');
  
  // Remove empty sections with their divs
  result = result.replace(/<div[^>]*>\s*<h2[^>]*>\s*<\/h2>\s*<p[^>]*>\s*<\/p>\s*<\/div>/g, '');
  result = result.replace(/<div[^>]*>\s*<\/div>/g, '');
  
  // Clean up multiple consecutive line breaks
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Remove empty subsection labels
  result = result.replace(/<p[^>]*>\s*<\/p>/g, '');
  
  // Clean up sections with empty labels (custom sections)
  result = result.replace(/<h2[^>]*>\s*<\/h2>\s*<p[^>]*>\s*<\/p>/g, '');
  
  return result;
}

export function extractPlaceholders(template: string): string[] {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const placeholders = new Set<string>();
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    placeholders.add(match[1]);
  }
  
  return Array.from(placeholders).sort();
}

export function validateTemplate(template: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for unclosed placeholders
  const unclosedStart = (template.match(/\{\{(?![^}]*\}\})/g) || []).length;
  const unclosedEnd = (template.match(/(?<!\{\{[^{]*)\}\}/g) || []).length;
  
  if (unclosedStart > 0) {
    errors.push('Template contains unclosed placeholder tags');
  }
  
  if (unclosedEnd > 0) {
    errors.push('Template contains unmatched closing tags');
  }
  
  // Check for invalid placeholder names
  const invalidPlaceholders = template.match(/\{\{[^a-zA-Z_][^}]*\}\}/g);
  if (invalidPlaceholders) {
    errors.push('Placeholder names must start with a letter or underscore');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
