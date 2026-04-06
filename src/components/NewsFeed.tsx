import { useState } from 'react';
import { newsItems, formatTimeAgo, severityColor, categoryIcon } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export function NewsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const cats = ['all', 'military', 'geopolitical', 'economic', 'cyber', 'disaster', 'infrastructure'];
  const filtered = filter === 'all' ? newsItems : newsItems.filter(n => n.category === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 overflow-x-auto">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
              filter === c ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
            }`}>{c}</button>
        ))}
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-slate-100">
          {filtered.map(item => {
            const open = expandedId === item.id;
            const sc = severityColor(item.severity);
            return (
              <div key={item.id} className={`px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 ${open ? 'bg-slate-50' : ''}`}
                onClick={() => setExpandedId(open ? null : item.id)}>
                <div className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5">{categoryIcon(item.category)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${sc.badge}`}>{item.severity.toUpperCase()}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.source}</span>
                      <span className="text-[10px] text-slate-300">|</span>
                      <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(item.timestamp)}</span>
                    </div>
                    <h4 className="text-[13px] font-semibold text-slate-800 leading-snug">{item.title}</h4>
                    <span className="inline-block mt-1 text-[9px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">{item.region}</span>
                    {open && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                        {item.aiAnalysis && (
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">AI Analysis</span>
                            </div>
                            <p className="text-[11px] text-blue-800/80 leading-relaxed">{item.aiAnalysis}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {open ? <ChevronUp className="w-4 h-4 text-blue-500 shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-slate-300 shrink-0 mt-1" />}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
