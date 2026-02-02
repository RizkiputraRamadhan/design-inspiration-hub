import { X, Cpu, Network, MemoryStick, HardDrive, FolderOutput, FolderOpen } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  moveDestination: string | null;
  moveDestinationHandle: FileSystemDirectoryHandle | null;
}

interface SettingsPanelComponentProps extends SettingsPanelProps {
  settings?: PreviewSettings;
  onSettingsChange?: (settings: PreviewSettings) => void;
}

export const SettingsPanel = ({ 
  isOpen, 
  onClose,
  settings: externalSettings,
  onSettingsChange 
}: SettingsPanelComponentProps) => {
  const [internalSettings, setInternalSettings] = useState<PreviewSettings>({
    showCpu: true,
    showNetwork: true,
    showMemory: true,
    showDisk: true,
    moveDestination: null,
    moveDestinationHandle: null,
  });

  const settings = externalSettings || internalSettings;

  const updateSetting = <K extends keyof PreviewSettings>(key: K, value: PreviewSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    } else {
      setInternalSettings(newSettings);
    }
  };

  const selectMoveDestination = async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        toast.error("Browser tidak mendukung fitur ini. Gunakan Chrome atau Edge terbaru.");
        return;
      }

      const handle = await (window as any).showDirectoryPicker();
      updateSetting('moveDestination', handle.name);
      updateSetting('moveDestinationHandle', handle);
      toast.success(`Destination folder: ${handle.name}`);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error("Gagal memilih folder");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-14 top-0 h-full w-72 bg-background/95 backdrop-blur-sm border-r border-border shadow-xl z-20 animate-in slide-in-from-left-2 duration-200"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Pengaturan</h3>
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
              description="Tampilkan penggunaan CPU"
            >
              <Switch 
                checked={settings.showCpu} 
                onCheckedChange={(checked) => updateSetting('showCpu', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<Network size={16} />}
              title="Preview Network"
              description="Tampilkan aktivitas jaringan"
            >
              <Switch 
                checked={settings.showNetwork} 
                onCheckedChange={(checked) => updateSetting('showNetwork', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<MemoryStick size={16} />}
              title="Preview Memory"
              description="Tampilkan penggunaan memori"
            >
              <Switch 
                checked={settings.showMemory} 
                onCheckedChange={(checked) => updateSetting('showMemory', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={<HardDrive size={16} />}
              title="Preview Disk"
              description="Tampilkan penggunaan disk"
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
            Move Destination
          </p>
          
          <div className="p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-md bg-muted text-muted-foreground">
                <FolderOutput size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">Folder Tujuan</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {settings.moveDestination || "Belum dipilih"}
                </p>
              </div>
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={selectMoveDestination}
            >
              <FolderOpen size={14} />
              Browse Folder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
