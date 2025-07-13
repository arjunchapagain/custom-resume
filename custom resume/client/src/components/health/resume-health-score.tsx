import { useState } from 'react';
import { AlertCircle, CheckCircle, TrendingUp, Eye, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResumeHealthAnalyzer, HealthScore, HealthSuggestion } from '@/lib/resume-health-analyzer';
import { ResumeData } from '@/hooks/use-resume-database-store';

interface ResumeHealthScoreProps {
  data: ResumeData;
  template: string;
  onFieldFocus?: (field: keyof ResumeData) => void;
}

export default function ResumeHealthScore({ data, template, onFieldFocus }: ResumeHealthScoreProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  
  const analyzer = new ResumeHealthAnalyzer(data, template);
  const healthScore = analyzer.analyze();
  
  const visibleSuggestions = healthScore.suggestions.filter(
    suggestion => !dismissedSuggestions.includes(suggestion.id)
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getCategoryIcon = (category: HealthSuggestion['category']) => {
    switch (category) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'important':
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'enhancement':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: HealthSuggestion['category']) => {
    switch (category) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'important':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'enhancement':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleDismissSuggestion = (id: string) => {
    setDismissedSuggestions([...dismissedSuggestions, id]);
  };

  const handleFieldFocus = (field?: keyof ResumeData) => {
    if (field && onFieldFocus) {
      onFieldFocus(field);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Resume Health Score
        </CardTitle>
        <CardDescription>
          Analysis of your resume's effectiveness and suggestions for improvement
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className={`p-4 rounded-lg border ${getScoreBackground(healthScore.overall)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Overall Score</h3>
            <span className={`text-2xl font-bold ${getScoreColor(healthScore.overall)}`}>
              {healthScore.overall}%
            </span>
          </div>
          <Progress value={healthScore.overall} className="h-2" />
          <p className="text-sm text-slate-600 mt-2">
            {healthScore.overall >= 80 && "Excellent! Your resume is well-optimized."}
            {healthScore.overall >= 60 && healthScore.overall < 80 && "Good foundation with room for improvement."}
            {healthScore.overall < 60 && "Needs attention to improve competitiveness."}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(healthScore.categories).map(([category, score]) => (
            <div key={category} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium capitalize">{category}</span>
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
              <Progress value={score} className="h-1" />
            </div>
          ))}
        </div>

        {/* Suggestions Summary */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Improvement Suggestions</h3>
            <p className="text-sm text-slate-600">
              {visibleSuggestions.length} suggestions to improve your resume
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {/* Suggestions List */}
        {showDetails && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {visibleSuggestions.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Great job! No suggestions available. Your resume looks well-optimized.
                </AlertDescription>
              </Alert>
            ) : (
              visibleSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getCategoryIcon(suggestion.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getCategoryColor(suggestion.category)}`}
                        >
                          {suggestion.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-2">
                        {suggestion.field && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFieldFocus(suggestion.field)}
                            className="text-xs"
                          >
                            Fix This
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismissSuggestion(suggestion.id)}
                          className="text-xs text-slate-500 hover:text-slate-700"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">
              {visibleSuggestions.filter(s => s.category === 'critical').length}
            </div>
            <div className="text-xs text-slate-600">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-600">
              {visibleSuggestions.filter(s => s.category === 'important').length}
            </div>
            <div className="text-xs text-slate-600">Important</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {visibleSuggestions.filter(s => s.category === 'enhancement').length}
            </div>
            <div className="text-xs text-slate-600">Enhancement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}