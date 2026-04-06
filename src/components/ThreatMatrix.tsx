import { countryRisks } from '@/lib/data';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function ThreatMatrix() {
  const sorted = [...countryRisks].sort((a, b) => b.score - a.score);

  const scoreColor = (s: number) => {
    if (s >= 8.5) return { text: 'text-red-400', bar: 'bg-red-500', bg: 'bg-red-500/15' };
    if (s >= 7.5) return { text: 'text-amber-400', bar: 'bg-amber-500', bg: 'bg-amber-500/15' };
    if (s >= 6.5) return { text: 'text-yellow-400', bar: 'bg-yellow-500', bg: 'bg-yellow-500/15' };
    return { text: 'text-emerald-400', bar: 'bg-emerald-500', bg: 'bg-emerald-500/15' };
  };

  return (
    <div className="divide-y divide-border">
      {sorted.map((c, i) => {
        const sc = scoreColor(c.score);
        return (
          <div key={c.code} className="px-2.5 py-2 hover:bg-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground w-4">#{i + 1}</span>
                <span className="text-[12px] font-semibold text-foreground">{c.country}</span>
                {c.trend === 'rising' && <TrendingUp className="w-3 h-3 text-red-400" />}
                {c.trend === 'declining' && <TrendingDown className="w-3 h-3 text-emerald-400" />}
                {c.trend === 'stable' && <Minus className="w-3 h-3 text-muted-foreground" />}
              </div>
              <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{c.score.toFixed(1)}</span>
            </div>
            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mb-1">
              <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${c.score * 10}%` }} />
            </div>
            <div className="flex flex-wrap gap-1">
              {c.factors.map(f => <span key={f} className="text-[8px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{f}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
