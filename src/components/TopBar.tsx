import { useState, useEffect } from 'react';
import { Globe, Wifi } from 'lucide-react';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <header className="h-10 bg-[hsl(222,22%,7%)] border-b border-border flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center gap-2.5">
        <Globe className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-bold text-white tracking-tight">World Monitor</span>
        <span className="text-[9px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">LIVE</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] text-emerald-500 font-medium">Connected</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <span className="text-[11px] font-mono text-muted-foreground tabular-nums">
          {time.toISOString().slice(11, 19)} UTC
        </span>
      </div>
    </header>
  );
}
