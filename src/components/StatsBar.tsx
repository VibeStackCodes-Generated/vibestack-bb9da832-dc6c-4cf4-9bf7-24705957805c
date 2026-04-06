import { useEarthquakes, useNASAEvents, useGDELTNews } from '@/hooks/useLiveData';

export function StatsBar() {
  const { data: quakes } = useEarthquakes();
  const { data: nasa } = useNASAEvents();
  const { data: news } = useGDELTNews();

  const items = [
    { label: 'Earthquakes 24h', value: quakes?.length || '—', color: 'text-amber-400' },
    { label: 'M5+ Quakes', value: quakes?.filter(q => q.properties.mag >= 5).length || '—', color: 'text-red-400' },
    { label: 'NASA Events', value: nasa?.length || '—', color: 'text-violet-400' },
    { label: 'News Articles', value: news?.length || '—', color: 'text-emerald-400' },
  ];

  return (
    <div className="flex items-center gap-4 px-3 py-1.5 bg-[hsl(222,22%,7%)] border-b border-border">
      {items.map(s => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className={`text-sm font-mono font-bold tabular-nums ${s.color}`}>{s.value}</span>
          <span className="text-[9px] text-muted-foreground font-medium uppercase">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
