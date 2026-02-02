import { useState } from "react";
import { Sparkles, FolderTree, Tags, FileSearch, Wand2, Lock, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AISettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const aiFeatures = [
  { 
    id: "raymazing", 
    name: "AI Raymazing", 
    description: "Organize files using AI recommendations",
    icon: Wand2,
    locked: false 
  },
  { 
    id: "organize-folder", 
    name: "Organize Into Folder", 
    description: "Auto-create folders based on file types",
    icon: FolderTree,
    locked: false 
  },
  { 
    id: "smart-tags", 
    name: "Smart Tags", 
    description: "Add intelligent tags to your files",
    icon: Tags,
    locked: true 
  },
  { 
    id: "duplicate-finder", 
    name: "Duplicate Finder", 
    description: "Find and remove duplicate files",
    icon: FileSearch,
    locked: true 
  },
  { 
    id: "auto-rename", 
    name: "Auto Rename", 
    description: "Rename files with AI suggestions",
    icon: Sparkles,
    locked: true 
  },
];

export const AISettingsPanel = ({ isOpen, onClose }: AISettingsPanelProps) => {
  const [activeFeatures, setActiveFeatures] = useState<Record<string, boolean>>({
    "raymazing": true,
    "organize-folder": false,
  });

  const toggleFeature = (id: string) => {
    setActiveFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-14 top-0 bottom-0 w-72 bg-card border-r border-border shadow-xl z-20 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">AI Features</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Features List */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {aiFeatures.map((feature) => {
          const isActive = activeFeatures[feature.id] || false;
          
          return (
            <div
              key={feature.id}
              className={`relative p-3 rounded-lg border transition-all ${
                feature.locked 
                  ? 'bg-muted/30 border-border/50 opacity-60 cursor-not-allowed' 
                  : isActive
                    ? 'bg-primary/10 border-primary/50'
                    : 'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  feature.locked ? 'bg-muted' : isActive ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <feature.icon size={16} className={feature.locked ? 'text-muted-foreground' : isActive ? 'text-primary' : 'text-muted-foreground'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${feature.locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {feature.name}
                      </p>
                      {feature.locked && (
                        <Lock size={12} className="text-muted-foreground" />
                      )}
                    </div>
                    {!feature.locked && (
                      <Switch 
                        checked={isActive}
                        onCheckedChange={() => toggleFeature(feature.id)}
                        className="scale-75"
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {!feature.locked && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <span className={`text-xs font-medium ${isActive ? 'text-success' : 'text-muted-foreground'}`}>
                    {isActive ? '● Active' : '○ Inactive'}
                  </span>
                </div>
              )}
              
              {feature.locked && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">🔒 Coming Soon</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          More AI features coming soon
        </p>
      </div>
    </div>
  );
};
