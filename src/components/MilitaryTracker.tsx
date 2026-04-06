import { militaryActivities, formatTimeAgo, severityColor } from '@/lib/data';
import { Crosshair, Anchor, Plane, Rocket, Building } from 'lucide-react';

export function MilitaryTracker() {
  const icon = (type: string) => {
    if (type.includes('Naval')) return <Anchor className="w-3.5 h-3.5 text-blue-400" />;
    if (type.includes('Air')) return <Plane className="w-3.5 h-3.5 text-cyan-400" />;
    if (type.includes('Missile')) return <Rocket className="w-3.5 h-3.5 text-red-400" />;
    if (type.includes('Base')) return <Building className="w-3.5 h-3.5 text-amber-400" />;
    return <Crosshair className="w-3.5 h-3.5 text-orange-400" />;
  };

  return (
    <div className="divide-y divide-border">
      {militaryActivities.map(a => {
        const sc = severityColor(a.severity);
        return (
          <div key={a.id} className="px-2.5 py-2 hover:bg-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                {icon(a.type)}
                <span className="text-[11px] font-semibold text-foreground uppercase">{a.type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sc.badge}`}>{a.severity.toUpperCase()}</span>
                <span className="text-[9px] text-muted-foreground font-mono">{formatTimeAgo(a.timestamp)}</span>
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground mb-1">{a.description}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-medium text-emerald-400">{a.region}</span>
              <span className="text-[9px] text-muted-foreground">{a.forces}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
