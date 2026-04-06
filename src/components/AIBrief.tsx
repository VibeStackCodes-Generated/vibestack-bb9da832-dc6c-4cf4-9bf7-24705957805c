import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, TrendingUp, Brain } from 'lucide-react';

const briefs = [
  { title: 'Priority', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/8 border-red-500/20', accent: 'bg-red-500',
    text: 'Taiwan Strait situation at WATCHLIST PRIORITY. PLA naval deployment exceeds routine parameters by 340%. Cross-strait tension index: 8.9/10.' },
  { title: 'Infrastructure', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20', accent: 'bg-amber-500',
    text: 'Red Sea cable disruption affecting 25% EU-Asia data traffic. Combined with ransomware on EU energy grid. Cascading failure probability: 12% in 48h.' },
  { title: 'Trend', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/20', accent: 'bg-emerald-500',
    text: 'Global instability index +4.2% over 7 days. Drivers: military escalation in 3 theaters, infrastructure attacks, commodity disruptions. VIX +13.21%.' },
  { title: 'Forecast', icon: Brain, color: 'text-violet-400', bg: 'bg-violet-500/8 border-violet-500/20', accent: 'bg-violet-500',
    text: '72h outlook: HIGH prob DPRK missile test. MODERATE prob NATO Baltic adjustments. LOW prob Taiwan kinetic engagement but diplomatic deterioration expected.' },
];

export function AIBrief() {
  const [chars, setChars] = useState(0);
  const total = briefs.reduce((s, b) => s + b.text.length, 0);
  useEffect(() => {
    if (chars < total) { const t = setTimeout(() => setChars(p => p + 4), 10); return () => clearTimeout(t); }
  }, [chars, total]);

  let offset = 0;
  return (
    <div className="p-2.5 space-y-2">
      {briefs.map((b, i) => {
        const start = offset;
        offset += b.text.length;
        const visible = b.text.slice(0, Math.max(0, chars - start));
        const typing = chars > start && chars < start + b.text.length;
        return (
          <div key={i} className={`relative ${b.bg} border rounded-md p-2.5 overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-0.5 h-full ${b.accent} rounded-l`} />
            <div className="flex items-center gap-1.5 mb-1 pl-1.5">
              <b.icon className={`w-3 h-3 ${b.color}`} />
              <span className={`text-[10px] font-bold ${b.color} uppercase`}>{b.title}</span>
            </div>
            <p className="text-[11px] text-foreground/80 leading-relaxed pl-1.5">
              {visible}{typing && <span className="inline-block w-1 h-3 bg-emerald-500 animate-pulse ml-0.5" />}
            </p>
          </div>
        );
      })}
      <div className="text-center text-[9px] text-muted-foreground pt-1">
        Confidence: <span className="text-emerald-400">94.2%</span> &middot; Sources: <span className="text-emerald-400">342</span> &middot; Model: <span className="text-violet-400">SENTINEL-4</span>
      </div>
    </div>
  );
}
