import { X, Moon, Sun, Bell, Globe, Shield, HardDrive, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoSave: true,
    secureDelete: false,
  });

  const [language, setLanguage] = useState("id");
  const [theme, setTheme] = useState("system");

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
        {/* Appearance Section */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Tampilan
          </p>
          
          <div className="space-y-2">
            <SettingItem
              icon={settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
              title="Mode Gelap"
              description="Aktifkan tema gelap"
            >
              <Switch 
                checked={settings.darkMode} 
                onCheckedChange={() => toggleSetting('darkMode')}
              />
            </SettingItem>

            <SettingItem
              icon={<Palette size={16} />}
              title="Tema"
              description="Pilih tema aplikasi"
            >
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
          </div>
        </div>

        {/* General Section */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Umum
          </p>
          
          <div className="space-y-2">
            <SettingItem
              icon={<Globe size={16} />}
              title="Bahasa"
              description="Pilih bahasa aplikasi"
            >
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>

            <SettingItem
              icon={<Bell size={16} />}
              title="Notifikasi"
              description="Tampilkan notifikasi"
            >
              <Switch 
                checked={settings.notifications} 
                onCheckedChange={() => toggleSetting('notifications')}
              />
            </SettingItem>
          </div>
        </div>

        {/* Storage Section */}
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Penyimpanan
          </p>
          
          <div className="space-y-2">
            <SettingItem
              icon={<HardDrive size={16} />}
              title="Auto Save"
              description="Simpan otomatis perubahan"
            >
              <Switch 
                checked={settings.autoSave} 
                onCheckedChange={() => toggleSetting('autoSave')}
              />
            </SettingItem>

            <SettingItem
              icon={<Shield size={16} />}
              title="Hapus Aman"
              description="Konfirmasi sebelum hapus"
            >
              <Switch 
                checked={settings.secureDelete} 
                onCheckedChange={() => toggleSetting('secureDelete')}
              />
            </SettingItem>
          </div>
        </div>

        {/* Storage Info */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Penyimpanan Terpakai</span>
            <span className="text-xs font-medium text-foreground">2.4 GB / 10 GB</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-[24%] bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
