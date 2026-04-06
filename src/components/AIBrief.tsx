import { useState, useEffect } from 'react';
import { Sparkles, Brain, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const briefs = [
  { title: 'Priority Assessment', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', accent: 'bg-red-500',
    text: 'Taiwan Strait situation has escalated to WATCHLIST PRIORITY. PLA naval deployment exceeds routine exercise parameters by 340%. Recommend elevated monitoring of SIGINT channels over next 72 hours. Cross-strait tension index at 8.9/10.' },
  { title: 'Infrastructure Alert', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', accent: 'bg-amber-500',
    text: 'Red Sea cable disruption affecting 25% of EU-Asia data traffic. Combined with active ransomware targeting EU energy grid, European digital infrastructure resilience is at DEGRADED status. Cascading failure probability: 12% over next 48 hours.' },
  { title: 'Trend Analysis', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-500',
    text: 'Global instability index has risen 4.2% over past 7 days. Primary drivers: military escalation in 3 theaters, critical infrastructure attacks, and commodity supply disruptions. VIX surge (+13.21%) correlates with geopolitical risk premium expansion.' },
  { title: 'Forecast', icon: Brain, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', accent: 'bg-violet-500',
    text: '72-hour outlook: HIGH probability of DPRK ballistic missile test. MODERATE probability of additional NATO force posture adjustments in Baltic region. LOW probability of Taiwan Strait kinetic engagement, but diplomatic deterioration expected.' },
];

export function AIBrief() {
  const [chars, setChars] = useState(0);
  const total = briefs.reduce((s, b) => s + b.text.length, 0);
  useEffect(() => {
    if (chars < total) { const t = setTimeout(() => setChars(p => p + 3), 12); return () => clearTimeout(t); }
  }, [chars, total]);

  let offset = 0;
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">AI Intelligence Brief</div>
            <div className="text-[9px] text-slate-400 font-mono">{new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</div>
          </div>
        </div>
        {briefs.map((b, i) => {
          const start = offset;
          offset += b.text.length;
          const visible = b.text.slice(0, Math.max(0, chars - start));
          const typing = chars > start && chars < start + b.text.length;
          return (
            <div key={i} className={`relative ${b.bg} border ${b.border} rounded-xl p-3.5 overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${b.accent} rounded-l-xl`} />
              <div className="flex items-center gap-2 mb-2 pl-2">
                <b.icon className={`w-4 h-4 ${b.color}`} />
                <span className={`text-[11px] font-bold ${b.color} uppercase tracking-wide`}>{b.title}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-2">
                {visible}
                {typing && <span className="inline-block w-1.5 h-3.5 bg-blue-500 animate-pulse ml-0.5 rounded-sm" />}
              </p>
            </div>
          );
        })}
        <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pt-2 border-t border-slate-100">
          <span>Confidence: <span className="font-bold text-emerald-600">94.2%</span></span>
          <span className="text-slate-300">|</span>
          <span>Sources: <span className="font-bold text-blue-600">342</span></span>
          <span className="text-slate-300">|</span>
          <span>Model: <span className="font-bold text-violet-600">SENTINEL-4</span></span>
        </div>
      </div>
    </ScrollArea>
  );
}
