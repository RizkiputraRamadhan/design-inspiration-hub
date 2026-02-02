import { Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpdateNotificationProps {
  onClose: () => void;
}

export const UpdateNotification = ({ onClose }: UpdateNotificationProps) => {
  return (
    <div className="absolute bottom-16 right-4 flex items-center gap-4 p-4 bg-card border border-border rounded-lg shadow-lg animate-fade-in">
      <Info size={20} className="text-primary shrink-0" />
      <p className="text-sm text-foreground">
        Restart Kiro to apply the latest update.
      </p>
      <div className="flex items-center gap-2">
        <Button size="sm">
          Update Now
        </Button>
        <Button variant="outline" size="sm" onClick={onClose}>
          Later
        </Button>
      </div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-muted rounded"
      >
        <X size={16} className="text-muted-foreground" />
      </button>
    </div>
  );
};
