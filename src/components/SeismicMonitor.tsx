import { useMemo } from 'react';
import { seismicEvents, formatTimeAgo } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SeismicMonitor() {
  const magStyle = (m: number) => {
    if (m >= 7) return 'text-red-700 bg-red-100 border-red-200';
    if (m >= 6) return 'text-amber-700 bg-amber-100 border-amber-200';
    if (m >= 5) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-emerald-700 bg-emerald-100 border-emerald-200';
  };
  const bars = useMemo(() => Array.from({ length: 24 }, () => Math.random() * 100), []);

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {seismicEvents.map(e => (
          <div key={e.id} className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-mono font-black px-2.5 py-1.5 rounded-lg border ${magStyle(e.magnitude)}`}>M{e.magnitude.toFixed(1)}</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">{e.location}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Depth: {e.depth}km</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(e.timestamp)}</span>
            </div>
          </div>
        ))}
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-3">24h Seismic Activity</div>
          <div className="flex items-end gap-0.5 h-16">
            {bars.map((h, i) => (
              <div key={i} className={`flex-1 rounded-t transition-all ${h > 70 ? 'bg-red-400' : h > 40 ? 'bg-amber-400' : 'bg-blue-300'}`} style={{ height: `${Math.max(h, 4)}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-slate-400 font-mono">
            <span>24h ago</span><span>12h</span><span>Now</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
