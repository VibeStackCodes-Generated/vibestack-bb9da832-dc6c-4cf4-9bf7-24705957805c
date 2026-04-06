import { useQuery } from '@tanstack/react-query';

// ─── USGS Earthquakes ───────────────────────────────────────────
export interface USGSFeature {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    title: string;
    tsunami: number;
    type: string;
  };
  geometry: { coordinates: [number, number, number] };
}

interface USGSResponse {
  metadata: { count: number; title: string; generated: number };
  features: USGSFeature[];
}

async function fetchEarthquakes(): Promise<USGSFeature[]> {
  const res = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson'
  );
  if (!res.ok) throw new Error('USGS fetch failed');
  const data: USGSResponse = await res.json();
  return data.features;
}

export function useEarthquakes() {
  return useQuery({
    queryKey: ['earthquakes'],
    queryFn: fetchEarthquakes,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

// ─── GDELT News ─────────────────────────────────────────────────
export interface GDELTArticle {
  url: string;
  url_mobile: string;
  title: string;
  seendate: string;
  socialimage: string;
  domain: string;
  language: string;
  sourcecountry: string;
}

interface GDELTResponse {
  articles: GDELTArticle[];
}

async function fetchGDELTNews(query: string): Promise<GDELTArticle[]> {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&maxrecords=50&format=json&timespan=24h&sort=datedesc`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('GDELT fetch failed');
  const data: GDELTResponse = await res.json();
  return data.articles || [];
}

export function useGDELTNews(query: string = 'conflict OR military OR geopolitical OR crisis OR earthquake OR cyber attack') {
  return useQuery({
    queryKey: ['gdelt-news', query],
    queryFn: () => fetchGDELTNews(query),
    refetchInterval: 120_000,
    staleTime: 60_000,
  });
}

// ─── NASA EONET (Natural Events) ────────────────────────────────
export interface EONETEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  categories: { id: string; title: string }[];
  geometry: { date: string; type: string; coordinates: [number, number] }[];
}

interface EONETResponse {
  events: EONETEvent[];
}

async function fetchEONET(): Promise<EONETEvent[]> {
  const res = await fetch(
    'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=30'
  );
  if (!res.ok) throw new Error('EONET fetch failed');
  const data: EONETResponse = await res.json();
  return data.events;
}

export function useNASAEvents() {
  return useQuery({
    queryKey: ['nasa-eonet'],
    queryFn: fetchEONET,
    refetchInterval: 300_000,
    staleTime: 120_000,
  });
}

// ─── Helpers ────────────────────────────────────────────────────
export function formatTimeAgoLive(timestamp: number): string {
  const s = Math.floor((Date.now() - timestamp) / 1000);
  if (s < 60) return s + 's ago';
  const m = Math.floor(s / 60);
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}
