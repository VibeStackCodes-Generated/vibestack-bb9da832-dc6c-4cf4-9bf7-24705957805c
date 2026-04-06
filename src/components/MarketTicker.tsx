import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData } from '@/lib/data';

export function MarketTicker() {
  const items = [...marketData, ...marketData];
  return (
    <div className="h-10 bg-slate-50 border-b border-slate-200 overflow-hidden relative ticker-mask">
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {items.map((d, i) => (
          <div key={d.symbol + i} className="flex items-center gap-2 px-5 text-xs font-mono">
            <span className="font-bold text-slate-500">{d.symbol}</span>
            <span className="font-semibold text-slate-800 tabular-nums">{d.value.toLocaleString()}</span>
            <span className={`flex items-center gap-0.5 font-semibold tabular-nums ${d.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {d.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {d.change >= 0 ? '+' : ''}{d.changePercent.toFixed(2)}%
            </span>
            <div className="w-px h-4 bg-slate-200 ml-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
