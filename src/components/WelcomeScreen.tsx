import { Bot } from "lucide-react";
import { KeyboardShortcut } from "./KeyboardShortcut";

const shortcuts = [
  { action: "Open chat", keys: ["Ctrl", "L"] },
  { action: "Show All Commands", keys: ["Ctrl", "Shift", "P"] },
  { action: "Open File", keys: ["Ctrl", "O"] },
  { action: "Open Folder", keys: ["Ctrl", "K", "Ctrl", "O"] },
  { action: "Open Recent", keys: ["Ctrl", "R"] },
];

export const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center max-w-md w-full px-8">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted">
            <Bot size={36} className="text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-muted-foreground">
            KIRO
          </h1>
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
