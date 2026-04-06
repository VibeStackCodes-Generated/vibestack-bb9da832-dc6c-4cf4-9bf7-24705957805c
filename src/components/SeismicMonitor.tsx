import { useEarthquakes, formatTimeAgoLive } from '@/hooks/useLiveData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ExternalLink } from 'lucide-react';

export function SeismicMonitor() {
  const { data: quakes, isLoading } = useEarthquakes();

  const magStyle = (m: number) => {
    if (m >= 7) return 'text-red-700 bg-red-100 border-red-200';
    if (m >= 6) return 'text-orange-700 bg-orange-100 border-orange-200';
    if (m >= 5) return 'text-amber-700 bg-amber-100 border-amber-200';
    if (m >= 4) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-sky-700 bg-sky-100 border-sky-200';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xs font-medium">Loading USGS data...</span>
        </div>
      </div>
    );
  }

  const sorted = [...(quakes || [])].sort((a, b) => b.properties.mag - a.properties.mag);

  // Build hourly histogram from real data
  const hourBuckets = new Array(24).fill(0);
  quakes?.forEach(q => {
    const hoursAgo = Math.floor((Date.now() - q.properties.time) / 3600000);
    if (hoursAgo >= 0 && hoursAgo < 24) {
      hourBuckets[23 - hoursAgo] += 1;
    }
  });
  const maxBucket = Math.max(...hourBuckets, 1);

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-red-50 border border-red-100 rounded-xl p-2 text-center">
            <div className="text-lg font-mono font-black text-red-600">
              {sorted.filter(q => q.properties.mag >= 5).length}
            </div>
            <div className="text-[8px] font-bold text-red-500 uppercase">M5+</div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 text-center">
            <div className="text-lg font-mono font-black text-amber-600">
              {sorted.filter(q => q.properties.mag >= 4 && q.properties.mag < 5).length}
            </div>
            <div className="text-[8px] font-bold text-amber-500 uppercase">M4-5</div>
          </div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 text-center">
            <div className="text-lg font-mono font-black text-sky-600">
              {sorted.length}
            </div>
            <div className="text-[8px] font-bold text-sky-500 uppercase">Total 24h</div>
          </div>
        </div>

        {/* Histogram */}
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-3">
            24h Activity (M2.5+)
          </div>
          <div className="flex items-end gap-0.5 h-14">
            {hourBuckets.map((count, i) => {
              const pct = (count / maxBucket) * 100;
              const color = pct > 70 ? 'bg-red-400' : pct > 40 ? 'bg-amber-400' : 'bg-blue-300';
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${color} transition-all`}
                  style={{ height: `${Math.max(pct, 3)}%` }}
                  title={`${count} events`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-slate-400 font-mono">
            <span>24h ago</span><span>12h</span><span>Now</span>
          </div>
        </div>

        {/* Event list */}
        {sorted.slice(0, 30).map(eq => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          return (
            <a
              key={eq.id}
              href={eq.properties.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-slate-200 p-3 hover:shadow-sm transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-mono font-black px-2.5 py-1.5 rounded-lg border ${magStyle(eq.properties.mag)}`}>
                    M{eq.properties.mag.toFixed(1)}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {eq.properties.place || 'Unknown location'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Depth: {depth.toFixed(0)}km
                      {eq.properties.tsunami === 1 && (
                        <span className="ml-2 text-red-600 font-bold">⚠ TSUNAMI</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formatTimeAgoLive(eq.properties.time)}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />
                </div>
              </div>
            </a>
          );
        })}

        {/* Attribution */}
        <div className="text-center py-2">
          <span className="text-[9px] text-slate-400 font-medium">
            Source: USGS Earthquake Hazards Program &middot; Auto-refreshes every 60s
          </span>
        </div>
      </div>
    </ScrollArea>
  );
}
