import { useEarthquakes, formatTimeAgoLive } from '@/hooks/useLiveData';
import { Loader2, ExternalLink } from 'lucide-react';

export function SeismicMonitor() {
  const { data: quakes, isLoading } = useEarthquakes();

  const magStyle = (m: number) => {
    if (m >= 7) return 'text-red-400 bg-red-500/15';
    if (m >= 6) return 'text-orange-400 bg-orange-500/15';
    if (m >= 5) return 'text-amber-400 bg-amber-500/15';
    if (m >= 4) return 'text-lime-400 bg-lime-500/15';
    return 'text-cyan-400 bg-cyan-500/15';
  };

  if (isLoading) return <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;

  const sorted = [...(quakes || [])].sort((a, b) => b.properties.mag - a.properties.mag);

  const hourBuckets = new Array(24).fill(0);
  quakes?.forEach(q => {
    const h = Math.floor((Date.now() - q.properties.time) / 3600000);
    if (h >= 0 && h < 24) hourBuckets[23 - h]++;
  });
  const maxB = Math.max(...hourBuckets, 1);

  return (
    <div>
      {/* Summary row */}
      <div className="grid grid-cols-4 gap-1 p-2 border-b border-border">
        {[
          { label: 'M6+', count: sorted.filter(q => q.properties.mag >= 6).length, color: 'text-red-400' },
          { label: 'M5+', count: sorted.filter(q => q.properties.mag >= 5).length, color: 'text-orange-400' },
          { label: 'M4+', count: sorted.filter(q => q.properties.mag >= 4).length, color: 'text-amber-400' },
          { label: 'Total', count: sorted.length, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className={`text-base font-mono font-bold ${s.color}`}>{s.count}</div>
            <div className="text-[8px] text-muted-foreground font-semibold uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Histogram */}
      <div className="px-2 py-2 border-b border-border">
        <div className="text-[9px] font-semibold text-muted-foreground uppercase mb-1.5">24h Activity</div>
        <div className="flex items-end gap-px h-10">
          {hourBuckets.map((c, i) => {
            const pct = (c / maxB) * 100;
            const col = pct > 70 ? 'bg-red-500' : pct > 40 ? 'bg-amber-500' : 'bg-emerald-500/60';
            return <div key={i} className={`flex-1 rounded-t ${col}`} style={{ height: `${Math.max(pct, 3)}%` }} />;
          })}
        </div>
        <div className="flex justify-between mt-0.5 text-[8px] text-muted-foreground font-mono">
          <span>24h</span><span>Now</span>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-border">
        {sorted.slice(0, 20).map(eq => {
          const [, , depth] = eq.geometry.coordinates;
          return (
            <a key={eq.id} href={eq.properties.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-2.5 py-1.5 hover:bg-secondary/50 transition-colors group">
              <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${magStyle(eq.properties.mag)}`}>
                {eq.properties.mag.toFixed(1)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-foreground truncate group-hover:text-emerald-400 transition-colors">
                  {eq.properties.place || 'Unknown'}
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">
                  {depth.toFixed(0)}km &middot; {formatTimeAgoLive(eq.properties.time)}
                  {eq.properties.tsunami === 1 && <span className="text-red-400 font-bold ml-1">TSUNAMI</span>}
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-border group-hover:text-emerald-400 shrink-0" />
            </a>
          );
        })}
      </div>
      <div className="px-2 py-1 border-t border-border text-[9px] text-muted-foreground">USGS &middot; 60s refresh</div>
    </div>
  );
}
