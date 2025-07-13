import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading1, 
  Lightbulb,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  detectedFields: string[];
}

export default function TiptapEditor({ content, onChange, detectedFields }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    title: string;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "editor-btn h-8 w-8 p-0",
        isActive && "active"
      )}
      title={title}
    >
      {children}
    </Button>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800">Resume Template</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Lightbulb className="h-4 w-4" />
                <span>Use {`{{field_name}}`} for dynamic content</span>
              </div>
            </div>
          </div>
          
          {/* Toolbar */}
          <div className="editor-toolbar">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            
            <div className="w-px h-6 bg-slate-200" />
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            
            <div className="w-px h-6 bg-slate-200" />
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <span className="text-sm font-semibold">H2</span>
            </ToolbarButton>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <span className="text-sm font-semibold">H3</span>
            </ToolbarButton>
          </div>
          
          {/* Editor Content */}
          <div className="flex-1 overflow-auto">
            <EditorContent editor={editor} />
          </div>
        </div>
        
        {/* Detected Fields Panel */}
        <div className="w-80 p-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-medium text-slate-800">Detected Fields</h3>
              <p className="text-sm text-slate-500 mt-1">Fields found in your template</p>
            </div>
            <div className="p-4">
              {detectedFields.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  No fields detected. Add {`{{field_name}}`} placeholders to your template.
                </p>
              ) : (
                <div className="space-y-2">
                  {detectedFields.map((field) => (
                    <div
                      key={field}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-blue-900">
                        {`{{${field}}}`}
                      </span>
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
