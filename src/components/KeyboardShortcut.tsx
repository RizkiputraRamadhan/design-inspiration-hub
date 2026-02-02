interface KeyboardShortcutProps {
  action: string;
  keys: string[];
}

export const KeyboardShortcut = ({ action, keys }: KeyboardShortcutProps) => {
  return (
    <div className="flex items-center justify-between py-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <span className="text-muted-foreground text-sm">{action}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, index) => (
          <kbd key={index} className="kbd">
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
};
