import { militaryActivities, formatTimeAgo, severityColor } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Crosshair, Anchor, Plane, Rocket, Building } from 'lucide-react';

export function MilitaryTracker() {
  const icon = (type: string) => {
    if (type.includes('Naval')) return <Anchor className="w-4 h-4 text-blue-500" />;
    if (type.includes('Air')) return <Plane className="w-4 h-4 text-sky-500" />;
    if (type.includes('Missile')) return <Rocket className="w-4 h-4 text-red-500" />;
    if (type.includes('Base')) return <Building className="w-4 h-4 text-amber-500" />;
    return <Crosshair className="w-4 h-4 text-orange-500" />;
  };
  const iconBg = (type: string) => {
    if (type.includes('Naval')) return 'bg-blue-100';
    if (type.includes('Air')) return 'bg-sky-100';
    if (type.includes('Missile')) return 'bg-red-100';
    if (type.includes('Base')) return 'bg-amber-100';
    return 'bg-orange-100';
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {militaryActivities.map(a => {
          const sc = severityColor(a.severity);
          return (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${iconBg(a.type)} flex items-center justify-center`}>{icon(a.type)}</div>
                  <span className="text-[11px] font-bold text-slate-800 uppercase">{a.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${sc.badge}`}>{a.severity.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(a.timestamp)}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-1.5 leading-relaxed">{a.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{a.region}</span>
                <span className="text-[10px] text-slate-400">{a.forces}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
