import { cyberThreats, formatTimeAgo, severityColor } from '@/lib/data';

export function CyberPanel() {
  const statusDot = (s: string) => {
    if (s === 'active') return 'bg-red-500 animate-pulse-slow';
    if (s === 'investigating') return 'bg-amber-500 animate-pulse-slow';
    return 'bg-emerald-500';
  };
  const statusText = (s: string) => {
    if (s === 'active') return 'text-red-400';
    if (s === 'investigating') return 'text-amber-400';
    return 'text-emerald-400';
  };

  const counts = {
    active: cyberThreats.filter(c => c.status === 'active').length,
    investigating: cyberThreats.filter(c => c.status === 'investigating').length,
    mitigated: cyberThreats.filter(c => c.status === 'mitigated').length,
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 p-2 border-b border-border">
        <div className="text-center"><div className="text-base font-mono font-bold text-red-400">{counts.active}</div><div className="text-[8px] text-muted-foreground font-semibold uppercase">Active</div></div>
        <div className="text-center"><div className="text-base font-mono font-bold text-amber-400">{counts.investigating}</div><div className="text-[8px] text-muted-foreground font-semibold uppercase">Invest.</div></div>
        <div className="text-center"><div className="text-base font-mono font-bold text-emerald-400">{counts.mitigated}</div><div className="text-[8px] text-muted-foreground font-semibold uppercase">Mitigated</div></div>
      </div>
      <div className="divide-y divide-border">
        {cyberThreats.map(t => {
          const sc = severityColor(t.severity);
          return (
            <div key={t.id} className="px-2.5 py-2 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${statusDot(t.status)}`} />
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sc.badge}`}>{t.severity.toUpperCase()}</span>
                  <span className={`text-[9px] font-bold uppercase ${statusText(t.status)}`}>{t.status}</span>
                </div>
                <span className="text-[9px] text-muted-foreground font-mono">{formatTimeAgo(t.timestamp)}</span>
              </div>
              <div className="text-[11px] font-semibold text-foreground">{t.type}</div>
              <div className="text-[10px] text-muted-foreground"><span className="text-foreground/70">Target:</span> {t.target}</div>
              <div className="text-[10px] text-muted-foreground"><span className="text-foreground/70">Origin:</span> {t.origin}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
