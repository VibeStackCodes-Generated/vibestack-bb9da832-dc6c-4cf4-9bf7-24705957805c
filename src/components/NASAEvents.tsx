import { useNASAEvents, formatTimeAgoLive } from '@/hooks/useLiveData';
import { Loader2, ExternalLink } from 'lucide-react';

function catColor(cat: string) {
  if (cat.includes('Wildfire') || cat.includes('Fire')) return 'text-red-400 bg-red-500/15';
  if (cat.includes('Volcano')) return 'text-orange-400 bg-orange-500/15';
  if (cat.includes('Storm') || cat.includes('Cyclone')) return 'text-violet-400 bg-violet-500/15';
  if (cat.includes('Flood')) return 'text-blue-400 bg-blue-500/15';
  if (cat.includes('Ice')) return 'text-cyan-400 bg-cyan-500/15';
  return 'text-amber-400 bg-amber-500/15';
}

export function NASAEvents() {
  const { data: events, isLoading } = useNASAEvents();

  if (isLoading) return <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div>
      <div className="divide-y divide-border">
        {events?.map(ev => {
          const cat = ev.categories[0]?.title || 'Event';
          const geo = ev.geometry[ev.geometry.length - 1];
          return (
            <a key={ev.id} href={ev.link} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2.5 px-2.5 py-2 hover:bg-secondary/50 transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${catColor(cat)}`}>{cat.toUpperCase()}</span>
                  {geo && <span className="text-[9px] text-muted-foreground font-mono">{new Date(geo.date).toLocaleDateString()}</span>}
                </div>
                <div className="text-[11px] font-medium text-foreground leading-snug group-hover:text-emerald-400 transition-colors">{ev.title}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-border group-hover:text-emerald-400 shrink-0 mt-0.5" />
            </a>
          );
        })}
        {(!events || events.length === 0) && <div className="py-6 text-center text-xs text-muted-foreground">No active events</div>}
      </div>
      <div className="px-2 py-1 border-t border-border text-[9px] text-muted-foreground">NASA EONET &middot; 5min refresh</div>
    </div>
  );
}
