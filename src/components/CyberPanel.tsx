import { cyberThreats, formatTimeAgo, severityColor } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CyberPanel() {
  const statusDot = (s: string) => {
    if (s === 'active') return <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-slow" />;
    if (s === 'investigating') return <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-slow" />;
    return <span className="w-2 h-2 rounded-full bg-emerald-500" />;
  };
  const statusText = (s: string) => {
    if (s === 'active') return 'text-red-600';
    if (s === 'investigating') return 'text-amber-600';
    return 'text-emerald-600';
  };

  const counts = { active: cyberThreats.filter(c => c.status === 'active').length, investigating: cyberThreats.filter(c => c.status === 'investigating').length, mitigated: cyberThreats.filter(c => c.status === 'mitigated').length };

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-red-50 border border-red-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-mono font-black text-red-600">{counts.active}</div>
            <div className="text-[9px] font-bold text-red-500 uppercase">Active</div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-mono font-black text-amber-600">{counts.investigating}</div>
            <div className="text-[9px] font-bold text-amber-500 uppercase">Investigating</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-mono font-black text-emerald-600">{counts.mitigated}</div>
            <div className="text-[9px] font-bold text-emerald-500 uppercase">Mitigated</div>
          </div>
        </div>
        {cyberThreats.map(t => {
          const sc = severityColor(t.severity);
          return (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {statusDot(t.status)}
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${sc.badge}`}>{t.severity.toUpperCase()}</span>
                  <span className={`text-[10px] font-bold uppercase ${statusText(t.status)}`}>{t.status}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(t.timestamp)}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mb-1">{t.type}</div>
              <div className="text-[11px] text-slate-500"><span className="font-semibold text-slate-600">Target:</span> {t.target}</div>
              <div className="text-[11px] text-slate-500"><span className="font-semibold text-slate-600">Origin:</span> {t.origin}</div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
