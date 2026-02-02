import { useState } from "react";
import { Tags, FileText, Users, Calendar, X, Plus, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface FileMetadata {
  tags: string[];
  acara: string;
  divisi: string;
  description: string;
}

interface FileMetadataFormProps {
  onMetadataChange: (metadata: FileMetadata) => void;
  metadata: FileMetadata;
  onStartOrganizing?: () => void;
  isOrganizing?: boolean;
}

export const FileMetadataForm = ({ 
  onMetadataChange, 
  metadata, 
  onStartOrganizing,
  isOrganizing = false 
}: FileMetadataFormProps) => {
  const [tagInput, setTagInput] = useState("");

  const updateMetadata = <K extends keyof FileMetadata>(key: K, value: FileMetadata[K]) => {
    onMetadataChange({ ...metadata, [key]: value });
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !metadata.tags.includes(trimmedTag) && metadata.tags.length < 10) {
      updateMetadata("tags", [...metadata.tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateMetadata("tags", metadata.tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Check if all required fields are filled
  const isFormValid = 
    metadata.tags.length > 0 && 
    metadata.acara.trim() !== "" && 
    metadata.divisi.trim() !== "" && 
    metadata.description.trim() !== "";

  return (
    <div className="flex flex-col h-full rounded-lg bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30 shrink-0">
        <FileText size={14} className="text-primary" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          File Organization Settings
        </span>
      </div>

      {/* Form Content - Scrollable */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
        {/* Tags/Label */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Tags size={12} className="text-muted-foreground" />
            Tags / Label <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.slice(0, 30))}
              onKeyDown={handleKeyDown}
              placeholder="Add tag..."
              className="h-9 text-sm flex-1"
              maxLength={30}
            />
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={addTag}
              className="h-9 px-3"
              disabled={!tagInput.trim() || metadata.tags.length >= 10}
            >
              <Plus size={14} />
            </Button>
          </div>
          {metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X size={10} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">{metadata.tags.length}/10 tags</p>
        </div>

        {/* Event */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Calendar size={12} className="text-muted-foreground" />
            Event <span className="text-destructive">*</span>
          </label>
          <Input
            value={metadata.acara}
            onChange={(e) => updateMetadata("acara", e.target.value.slice(0, 100))}
            placeholder="Event name, e.g.: Annual Meeting 2026"
            className="h-9 text-sm"
            maxLength={100}
          />
        </div>

        {/* Division/Organization */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Users size={12} className="text-muted-foreground" />
            Division / Organization <span className="text-destructive">*</span>
          </label>
          <Input
            value={metadata.divisi}
            onChange={(e) => updateMetadata("divisi", e.target.value.slice(0, 100))}
            placeholder="Division or organization name"
            className="h-9 text-sm"
            maxLength={100}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <FileText size={12} className="text-muted-foreground" />
            Description <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={metadata.description}
            onChange={(e) => updateMetadata("description", e.target.value.slice(0, 300))}
            placeholder="Brief description about these files..."
            className="text-sm min-h-[80px] resize-none"
            maxLength={300}
          />
          <p className="text-xs text-muted-foreground">{metadata.description.length}/300 characters</p>
        </div>
      </div>
    </ScrollArea>

    {/* Footer with Start Button */}
    <div className="p-4 border-t border-border bg-muted/20 shrink-0">
      <Button 
        onClick={onStartOrganizing}
        disabled={!isFormValid || isOrganizing}
        className="w-full gap-2"
        size="sm"
      >
        <Play size={14} />
        {isOrganizing ? "Processing..." : "Start Organizing"}
      </Button>
      {!isFormValid && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Complete all fields to start
        </p>
      )}
    </div>
    </div>
  );
};