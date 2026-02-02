import { useState } from "react";
import { Tags, FolderOpen, FileText, MapPin, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FileMetadata {
  category: string;
  tags: string[];
  description: string;
  location: string;
  namingPattern: string;
}

interface FileMetadataFormProps {
  onMetadataChange: (metadata: FileMetadata) => void;
  metadata: FileMetadata;
}

const categories = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "archives", label: "Archives" },
  { value: "projects", label: "Projects" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "other", label: "Other" },
];

const namingPatterns = [
  { value: "date-name", label: "Date_Name (2026-02-02_file)" },
  { value: "category-name", label: "Category_Name (Documents_file)" },
  { value: "name-date", label: "Name_Date (file_2026-02-02)" },
  { value: "original", label: "Keep Original Name" },
];

export const FileMetadataForm = ({ onMetadataChange, metadata }: FileMetadataFormProps) => {
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

  return (
    <div className="rounded-lg bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <FileText size={14} className="text-primary" />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          File Organization Settings
        </span>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-4">
        {/* Category */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <FolderOpen size={12} className="text-muted-foreground" />
            Category
          </label>
          <Select value={metadata.category} onValueChange={(value) => updateMetadata("category", value)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Tags size={12} className="text-muted-foreground" />
            Tags
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

        {/* Description */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <FileText size={12} className="text-muted-foreground" />
            Description
          </label>
          <Textarea
            value={metadata.description}
            onChange={(e) => updateMetadata("description", e.target.value.slice(0, 200))}
            placeholder="Add description for these files..."
            className="text-sm min-h-[60px] resize-none"
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground">{metadata.description.length}/200 characters</p>
        </div>

        {/* Location/Subfolder */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <MapPin size={12} className="text-muted-foreground" />
            Subfolder Location
          </label>
          <Input
            value={metadata.location}
            onChange={(e) => updateMetadata("location", e.target.value.slice(0, 100))}
            placeholder="e.g., 2026/February/Projects"
            className="h-9 text-sm"
            maxLength={100}
          />
        </div>

        {/* Naming Pattern */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground">
            <FileText size={12} className="text-muted-foreground" />
            Naming Pattern
          </label>
          <Select value={metadata.namingPattern} onValueChange={(value) => updateMetadata("namingPattern", value)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select naming pattern..." />
            </SelectTrigger>
            <SelectContent>
              {namingPatterns.map((pattern) => (
                <SelectItem key={pattern.value} value={pattern.value}>
                  {pattern.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
