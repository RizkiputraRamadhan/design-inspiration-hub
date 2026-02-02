import { AlertCircle, Clock, Wifi } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="flex items-center justify-between h-6 px-2 bg-secondary text-secondary-foreground text-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <AlertCircle size={12} />
          <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⚠</span>
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Subuh(04:36):-06:29:26 [KOTA JAKARTA]</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={12} />
          <span>Autocomplete</span>
        </div>
        <span>⚑ Report issue</span>
        <span className="text-primary">🎁 Kiro Free Bonus 22.7 / 500 (30 days left) updated just now</span>
      </div>
    </div>
  );
};
