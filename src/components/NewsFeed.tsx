import { useState } from 'react';
import { useGDELTNews, formatTimeAgoLive } from '@/hooks/useLiveData';
import type { GDELTArticle } from '@/hooks/useLiveData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react';

const QUERIES: Record<string, string> = {
  all: 'conflict OR military OR geopolitical OR crisis OR earthquake OR cyber attack',
  conflict: 'military conflict OR war OR armed forces',
  geopolitical: 'geopolitical OR diplomacy OR sanctions OR summit',
  economic: 'economic crisis OR inflation OR central bank OR trade war',
  cyber: 'cyber attack OR ransomware OR data breach OR hacking',
  disaster: 'earthquake OR tsunami OR hurricane OR wildfire OR flood',
};

function parseDateStr(d: string): number {
  if (!d) return Date.now();
  const y = d.slice(0, 4);
  const mo = d.slice(4, 6);
  const da = d.slice(6, 8);
  const h = d.slice(8, 10);
  const mi = d.slice(10, 12);
  const s = d.slice(12, 14);
  return new Date(`${y}-${mo}-${da}T${h}:${mi}:${s}Z`).getTime();
}

function domainToSource(domain: string): string {
  const d = domain.replace('www.', '');
  const map: Record<string, string> = {
    'reuters.com': 'Reuters',
    'bbc.co.uk': 'BBC',
    'bbc.com': 'BBC',
    'aljazeera.com': 'Al Jazeera',
    'cnn.com': 'CNN',
    'nytimes.com': 'NY Times',
    'theguardian.com': 'Guardian',
    'washingtonpost.com': 'Washington Post',
    'apnews.com': 'AP News',
    'bloomberg.com': 'Bloomberg',
    'ft.com': 'Financial Times',
  };
  return map[d] || d.split('.')[0].charAt(0).toUpperCase() + d.split('.')[0].slice(1);
}

export function NewsFeed() {
  const [filter, setFilter] = useState('all');
  const { data: articles, isLoading, isError, refetch } = useGDELTNews(QUERIES[filter]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 overflow-x-auto">
        {Object.keys(QUERIES).map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
              filter === key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => refetch()}
          className="ml-auto text-slate-400 hover:text-blue-600 transition-colors p-1"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-medium">Loading live news...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-sm text-slate-400">
            <p className="font-medium">Unable to load news</p>
            <button onClick={() => refetch()} className="text-blue-600 text-xs mt-1 hover:underline">
              Try again
            </button>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="divide-y divide-slate-100">
            {articles?.map((article, i) => (
              <ArticleRow key={article.url + i} article={article} />
            ))}
            {articles?.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-400">No articles found</div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Source attribution */}
      <div className="px-3 py-1.5 border-t border-slate-100 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
        <span className="text-[9px] text-slate-400 font-medium">
          Powered by GDELT Project &middot; Updates every 2 min
        </span>
      </div>
    </div>
  );
}

function ArticleRow({ article }: { article: GDELTArticle }) {
  const ts = parseDateStr(article.seendate);
  const source = domainToSource(article.domain);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
    >
      {article.socialimage ? (
        <img
          src={article.socialimage}
          alt=""
          className="w-16 h-12 rounded-lg object-cover shrink-0 bg-slate-100"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <div className="w-16 h-12 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center text-slate-300 text-lg">
          📰
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-semibold text-blue-600">{source}</span>
          <span className="text-[10px] text-slate-300">|</span>
          <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgoLive(ts)}</span>
        </div>
        <h4 className="text-[12px] font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
          {article.title}
        </h4>
        {article.sourcecountry && (
          <span className="inline-block mt-1 text-[9px] font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
            {article.sourcecountry}
          </span>
        )}
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
    </a>
  );
}
