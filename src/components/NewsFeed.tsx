import { useState } from 'react';
import { useGDELTNews, formatTimeAgoLive } from '@/hooks/useLiveData';
import type { GDELTArticle } from '@/hooks/useLiveData';
import { Loader2, ExternalLink, RefreshCw } from 'lucide-react';

const QUERIES: Record<string, string> = {
  all: 'conflict OR military OR geopolitical OR crisis OR earthquake OR cyber attack',
  conflict: 'military conflict OR war OR armed forces',
  geopolitical: 'geopolitical OR diplomacy OR sanctions',
  economic: 'economic crisis OR inflation OR trade war',
  cyber: 'cyber attack OR ransomware OR hacking',
  disaster: 'earthquake OR tsunami OR hurricane OR wildfire',
};

function parseDateStr(d: string): number {
  if (!d) return Date.now();
  return new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T${d.slice(8,10)}:${d.slice(10,12)}:${d.slice(12,14)}Z`).getTime();
}

function domainLabel(domain: string) {
  const d = domain.replace('www.', '');
  const map: Record<string, string> = {
    'reuters.com': 'Reuters', 'bbc.co.uk': 'BBC', 'bbc.com': 'BBC',
    'aljazeera.com': 'Al Jazeera', 'cnn.com': 'CNN', 'nytimes.com': 'NY Times',
    'theguardian.com': 'Guardian', 'apnews.com': 'AP', 'bloomberg.com': 'Bloomberg',
  };
  return map[d] || d.split('.')[0];
}

export function NewsFeed() {
  const [filter, setFilter] = useState('all');
  const { data: articles, isLoading, refetch } = useGDELTNews(QUERIES[filter]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border overflow-x-auto">
        {Object.keys(QUERIES).map(k => (
          <button key={k} onClick={() => setFilter(k)}
            className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded transition-all whitespace-nowrap ${
              filter === k ? 'bg-emerald-500/15 text-emerald-400' : 'text-muted-foreground hover:text-foreground'
            }`}>{k}</button>
        ))}
        <button onClick={() => refetch()} className="ml-auto text-muted-foreground hover:text-emerald-400 p-0.5">
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="divide-y divide-border">
          {articles?.slice(0, 25).map((a, i) => <NewsRow key={a.url + i} article={a} />)}
          {(!articles || articles.length === 0) && (
            <div className="py-6 text-center text-xs text-muted-foreground">No articles found</div>
          )}
        </div>
      )}
      <div className="px-2 py-1 border-t border-border flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
        <span className="text-[9px] text-muted-foreground">GDELT Project &middot; 2min refresh</span>
      </div>
    </div>
  );
}

function NewsRow({ article }: { article: GDELTArticle }) {
  const ts = parseDateStr(article.seendate);
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-2.5 px-2.5 py-2 hover:bg-secondary/50 transition-colors group">
      {article.socialimage ? (
        <img src={article.socialimage} alt="" className="w-14 h-10 rounded object-cover shrink-0 bg-secondary"
          loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div className="w-14 h-10 rounded bg-secondary shrink-0 flex items-center justify-center text-muted-foreground text-xs">📰</div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[9px] font-semibold text-emerald-400">{domainLabel(article.domain)}</span>
          <span className="text-[9px] text-muted-foreground font-mono">{formatTimeAgoLive(ts)}</span>
        </div>
        <div className="text-[11px] font-medium text-foreground leading-snug line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {article.title}
        </div>
      </div>
      <ExternalLink className="w-3 h-3 text-border group-hover:text-emerald-400 shrink-0 mt-0.5" />
    </a>
  );
}
