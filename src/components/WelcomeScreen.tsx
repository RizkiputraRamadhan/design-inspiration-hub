import { FolderSearch } from "lucide-react";
import { KeyboardShortcut } from "./KeyboardShortcut";

const shortcuts = [
  { action: "Scan Folder", keys: ["Ctrl", "S"] },
  { action: "Auto Organize", keys: ["Ctrl", "Shift", "O"] },
  { action: "Search Files", keys: ["Ctrl", "F"] },
  { action: "Undo Changes", keys: ["Ctrl", "Z"] },
  { action: "View History", keys: ["Ctrl", "H"] },
];

export const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center max-w-md w-full px-8">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
            <FolderSearch size={36} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              FileAI
            </h1>
            <p className="text-sm text-muted-foreground">Smart File Organizer</p>
          </div>
        </div>
        
        {/* Keyboard Shortcuts */}
        <div className="w-full space-y-1">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={shortcut.action} 
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <KeyboardShortcut 
                action={shortcut.action} 
                keys={shortcut.keys} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
