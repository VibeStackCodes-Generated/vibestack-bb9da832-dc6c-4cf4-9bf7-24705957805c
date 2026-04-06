import { globalStats } from '@/lib/data';
import { Flame, Globe, Shield, Activity, AlertTriangle, Radio } from 'lucide-react';

const stats = [
  { icon: Flame, label: 'Active Conflicts', value: globalStats.activeConflicts, color: 'text-red-600', bg: 'bg-red-50', iconBg: 'bg-red-100' },
  { icon: Globe, label: 'Watchlist Nations', value: globalStats.watchlistCountries, color: 'text-amber-600', bg: 'bg-amber-50', iconBg: 'bg-amber-100' },
  { icon: Shield, label: 'Cyber Incidents', value: globalStats.cyberIncidents24h.toLocaleString(), color: 'text-violet-600', bg: 'bg-violet-50', iconBg: 'bg-violet-100' },
  { icon: Activity, label: 'Seismic Events', value: globalStats.seismicEvents24h, color: 'text-blue-600', bg: 'bg-blue-50', iconBg: 'bg-blue-100' },
  { icon: AlertTriangle, label: 'Active Alerts', value: globalStats.activeAlerts, color: 'text-red-600', bg: 'bg-red-50', iconBg: 'bg-red-100' },
  { icon: Radio, label: 'Data Sources', value: globalStats.dataSourcesOnline, color: 'text-emerald-600', bg: 'bg-emerald-50', iconBg: 'bg-emerald-100' },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 px-4 py-3">
      {stats.map(s => (
        <div key={s.label} className={`${s.bg} rounded-xl px-3 py-2.5 border border-transparent`}>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-6 h-6 rounded-md ${s.iconBg} flex items-center justify-center`}>
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
            </div>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">{s.label}</span>
          </div>
          <div className={`text-xl font-bold ${s.color} tabular-nums font-mono`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
