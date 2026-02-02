import { FolderSearch } from "lucide-react";
import komdigiLogo from "@/assets/komdigi-logo.png";

export const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center max-w-md w-full px-8">
        {/* AI File Organizer Logo */}
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
        
        {/* KOMDIGI Logo */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <img 
            src={komdigiLogo} 
            alt="KOMDIGI - Kementerian Komunikasi dan Digital Republik Indonesia" 
            className="max-w-xs w-full h-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
};
