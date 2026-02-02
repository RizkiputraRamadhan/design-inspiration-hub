import { X, Cpu, Network, MemoryStick, HardDrive, FolderOutput } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingItem = ({ icon, title, description, children }: SettingItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:border-border transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

export interface PreviewSettings {
  showCpu: boolean;
  showNetwork: boolean;
  showMemory: boolean;
  showDisk: boolean;
  showMoveDestination: boolean;
}

interface SettingsPanelComponentProps extends SettingsPanelProps {
  settings: PreviewSettings;
  onSettingsChange: (settings: PreviewSettings) => void;
}

export const SettingsPanel = ({ 
  isOpen, 
  onClose,
  settings,
  onSettingsChange 
}: SettingsPanelComponentProps) => {

  const updateSetting = <K extends keyof PreviewSettings>(key: K, value: PreviewSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    onSettingsChange(newSettings);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-14 top-0 h-full w-72 bg-background/95 backdrop-blur-sm border-r border-border shadow-xl z-20 animate-in slide-in-from-left-2 duration-200"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Settings</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-60px)]">
        {/* Preview Options Section */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Preview Options
          </p>
          
          <div className="space-y-2">
            <SettingItem
              icon={<Cpu size={16} />}
              title="Preview CPU Usage"
              description="Show CPU usage information"
            >
              <Switch 
                checked={settings.showCpu} 
                onCheckedChange={(checked) => updateSetting('showCpu', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<Network size={16} />}
              title="Preview Network"
              description="Show network activity"
            >
              <Switch 
                checked={settings.showNetwork} 
                onCheckedChange={(checked) => updateSetting('showNetwork', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<MemoryStick size={16} />}
              title="Preview Memory"
              description="Show memory usage"
            >
              <Switch 
                checked={settings.showMemory} 
                onCheckedChange={(checked) => updateSetting('showMemory', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<HardDrive size={16} />}
              title="Preview Disk"
              description="Show disk usage"
            >
              <Switch 
                checked={settings.showDisk} 
                onCheckedChange={(checked) => updateSetting('showDisk', checked)}
              />
            </SettingItem>
          </div>
        </div>

        {/* Move Destination Section */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
            File Operations
          </p>
          
          <div className="space-y-2">
            <SettingItem
              icon={<FolderOutput size={16} />}
              title="Move Destination"
              description="Enable destination folder selection"
            >
              <Switch 
                checked={settings.showMoveDestination} 
                onCheckedChange={(checked) => updateSetting('showMoveDestination', checked)}
              />
            </SettingItem>
          </div>
        </div>
      </div>
    </div>
  );
};
