import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketData } from '@/lib/data';

export function MarketTicker() {
  const items = [...marketData, ...marketData];
  return (
    <div className="h-7 bg-[hsl(222,22%,6%)] border-b border-border overflow-hidden relative ticker-mask">
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {items.map((d, i) => (
          <div key={d.symbol + i} className="flex items-center gap-1.5 px-4 text-[11px]">
            <span className="font-semibold text-muted-foreground">{d.symbol}</span>
            <span className="text-foreground font-mono tabular-nums">{d.value.toLocaleString()}</span>
            <span className={`flex items-center gap-0.5 font-mono font-semibold tabular-nums ${d.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {d.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {d.change >= 0 ? '+' : ''}{d.changePercent.toFixed(2)}%
            </span>
            <span className="text-border mx-1">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
