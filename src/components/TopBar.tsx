import { useState, useEffect } from 'react';
import { Globe, Zap, Radio, Activity, Shield, Clock } from 'lucide-react';
import { globalStats } from '@/lib/data';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const utc = time.toISOString().slice(11, 19);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 tracking-tight leading-none">GlobalSentinel</div>
            <div className="text-[10px] text-slate-400 font-medium">Intelligence Platform</div>
          </div>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-1">
            <Zap className="w-3 h-3" /> AI Active
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">
            <Radio className="w-3 h-3" /> {globalStats.dataSourcesOnline} Sources
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-slate-500"><Activity className="w-3.5 h-3.5 text-emerald-500" /> <span className="font-semibold text-slate-700">{globalStats.aiConfidence}%</span> confidence</span>
          <div className="h-4 w-px bg-slate-200" />
          <span className="flex items-center gap-1 text-slate-500"><Shield className="w-3.5 h-3.5 text-amber-500" /> <span className="font-semibold text-slate-700">{globalStats.activeAlerts}</span> alerts</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">{utc}</span>
          <span className="text-[10px] text-slate-400">UTC</span>
        </div>
      </div>
    </header>
  );
}
