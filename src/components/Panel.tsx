import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PanelProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  badgeColor?: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
  maxHeight?: string;
}

export function Panel({ title, icon, badge, badgeColor = 'bg-emerald-500/15 text-emerald-400', count, defaultOpen = true, children, maxHeight = '400px' }: PanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="panel-card">
      <div className="panel-header" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          {icon}
          <span className="panel-title">{title}</span>
          {badge && <span className={`panel-badge ${badgeColor}`}>{badge}</span>}
          {count !== undefined && <span className="text-[10px] font-mono text-muted-foreground">({count})</span>}
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
      </div>
      {open && (
        <div className="overflow-auto" style={{ maxHeight }}>
          {children}
        </div>
      )}
    </div>
  );
}
