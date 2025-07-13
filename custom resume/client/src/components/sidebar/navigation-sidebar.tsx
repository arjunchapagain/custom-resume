import { FileText, Edit, FormInput, Eye, CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedStatus: 'saved' | 'saving' | 'unsaved';
}

const navItems = [
  {
    id: 'template',
    label: 'Edit Template',
    icon: Edit,
  },
  {
    id: 'fields',
    label: 'Fill Fields',
    icon: FormInput,
  },
  {
    id: 'health',
    label: 'Health Score',
    icon: TrendingUp,
  },
  {
    id: 'preview',
    label: 'Preview & Export',
    icon: Eye,
  },
];

export default function NavigationSidebar({ activeTab, onTabChange, savedStatus }: NavigationSidebarProps) {
  const getStatusText = () => {
    switch (savedStatus) {
      case 'saved':
        return 'Auto-saved';
      case 'saving':
        return 'Saving...';
      case 'unsaved':
        return 'Unsaved changes';
      default:
        return 'Auto-saved';
    }
  };

  const getStatusIcon = () => {
    switch (savedStatus) {
      case 'saved':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'saving':
        return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'unsaved':
        return <div className="h-4 w-4 bg-yellow-500 rounded-full" />;
      default:
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-slate-800">Resume Builder</h1>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "nav-item w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                    activeTab === item.id && "active"
                  )}
                >
                  <Icon className="h-4 w-4 nav-icon" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Status */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center flex items-center justify-center space-x-2">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>
    </div>
  );
}
