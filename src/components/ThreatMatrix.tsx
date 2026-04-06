import { countryRisks } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function ThreatMatrix() {
  const sorted = [...countryRisks].sort((a, b) => b.score - a.score);

  const scoreStyle = (s: number) => {
    if (s >= 8.5) return { text: 'text-red-700', bg: 'bg-red-100', bar: 'bg-red-500' };
    if (s >= 7.5) return { text: 'text-amber-700', bg: 'bg-amber-100', bar: 'bg-amber-500' };
    if (s >= 6.5) return { text: 'text-yellow-700', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
    return { text: 'text-emerald-700', bg: 'bg-emerald-100', bar: 'bg-emerald-500' };
  };

  const trendEl = (t: string) => {
    if (t === 'rising') return <span className="flex items-center gap-0.5 text-[9px] font-bold text-red-600"><TrendingUp className="w-3 h-3" /> Rising</span>;
    if (t === 'declining') return <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600"><TrendingDown className="w-3 h-3" /> Declining</span>;
    return <span className="flex items-center gap-0.5 text-[9px] font-bold text-slate-400"><Minus className="w-3 h-3" /> Stable</span>;
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {sorted.map((c, i) => {
          const ss = scoreStyle(c.score);
          return (
            <div key={c.code} className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 w-5">#{i + 1}</span>
                  <span className="text-sm font-bold text-slate-800">{c.country}</span>
                  {trendEl(c.trend)}
                </div>
                <span className={`text-sm font-mono font-black px-2 py-0.5 rounded-lg ${ss.bg} ${ss.text}`}>{c.score.toFixed(1)}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full ${ss.bar} transition-all`} style={{ width: `${c.score * 10}%` }} />
              </div>
              <div className="flex flex-wrap gap-1">
                {c.factors.map(f => <span key={f} className="text-[9px] font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">{f}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
