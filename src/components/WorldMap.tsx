import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEarthquakes, useNASAEvents, formatTimeAgoLive } from '@/hooks/useLiveData';
import type { USGSFeature, EONETEvent } from '@/hooks/useLiveData';
import { Loader2 } from 'lucide-react';

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.setView([25, 20], 2);
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);
  return null;
}

function magColor(m: number) {
  if (m >= 7) return '#ef4444';
  if (m >= 6) return '#f97316';
  if (m >= 5) return '#eab308';
  if (m >= 4) return '#a3e635';
  return '#22d3ee';
}

function magRadius(m: number) {
  if (m >= 7) return 14;
  if (m >= 6) return 10;
  if (m >= 5) return 7;
  if (m >= 4) return 5;
  return 3;
}

function eonetColor(cat: string) {
  if (cat.includes('Wildfire') || cat.includes('Fire')) return '#ef4444';
  if (cat.includes('Volcano')) return '#f97316';
  if (cat.includes('Storm') || cat.includes('Cyclone')) return '#a855f7';
  if (cat.includes('Flood')) return '#3b82f6';
  if (cat.includes('Ice')) return '#06b6d4';
  return '#eab308';
}

export function WorldMap() {
  const { data: quakes, isLoading: qL } = useEarthquakes();
  const { data: nasa, isLoading: nL } = useNASAEvents();
  const total = (quakes?.length || 0) + (nasa?.length || 0);

  return (
    <div className="relative w-full h-full">
      <MapContainer center={[25, 20]} zoom={2} minZoom={2} maxZoom={14} scrollWheelZoom zoomControl className="w-full h-full z-0">
        <FitBounds />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        {quakes?.map(eq => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          const c = magColor(eq.properties.mag);
          return (
            <CircleMarker key={eq.id} center={[lat, lng]} radius={magRadius(eq.properties.mag)}
              pathOptions={{ color: c, fillColor: c, fillOpacity: 0.35, weight: 1.5, opacity: 0.7 }}>
              <Popup>
                <div className="space-y-1 min-w-[190px] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                    <span className="font-bold text-white">M{eq.properties.mag.toFixed(1)}</span>
                    {eq.properties.tsunami === 1 && <span className="text-[9px] font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">TSUNAMI</span>}
                  </div>
                  <div className="text-emerald-400 font-medium">{eq.properties.place}</div>
                  <div className="text-[hsl(215,15%,50%)]">Depth: {depth.toFixed(0)}km &middot; {formatTimeAgoLive(eq.properties.time)}</div>
                  <a href={eq.properties.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline text-[10px]">USGS Details &rarr;</a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        {nasa?.map(ev => {
          const geo = ev.geometry[ev.geometry.length - 1];
          if (!geo?.coordinates) return null;
          const [lng, lat] = geo.coordinates;
          const cat = ev.categories[0]?.title || 'Event';
          const c = eonetColor(cat);
          return (
            <CircleMarker key={ev.id} center={[lat, lng]} radius={8}
              pathOptions={{ color: c, fillColor: c, fillOpacity: 0.25, weight: 2, opacity: 0.6, dashArray: '4 3' }}>
              <Popup>
                <div className="space-y-1 min-w-[190px] text-xs">
                  <span className="text-[9px] font-bold bg-white/10 text-[hsl(210,20%,75%)] px-1.5 py-0.5 rounded">{cat.toUpperCase()}</span>
                  <div className="font-bold text-white">{ev.title}</div>
                  <div className="text-[hsl(215,15%,50%)]">{new Date(geo.date).toLocaleDateString()}</div>
                  <a href={ev.link} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline text-[10px]">NASA EONET &rarr;</a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Top-left: source */}
      <div className="absolute top-2 left-2 z-[1000] flex items-center gap-1.5 bg-[hsl(222,22%,8%)]/90 backdrop-blur rounded px-2 py-1 text-[9px] font-medium text-muted-foreground border border-border">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
        USGS &middot; NASA EONET &middot; Live
      </div>

      {/* Top-right: count */}
      <div className="absolute top-2 right-2 z-[1000] bg-[hsl(222,22%,8%)]/90 backdrop-blur rounded px-2 py-1 text-[10px] font-semibold border border-border">
        {(qL || nL) ? (
          <span className="flex items-center gap-1 text-muted-foreground"><Loader2 className="w-3 h-3 animate-spin" /> Loading</span>
        ) : (
          <><span className="text-emerald-500">{total}</span> <span className="text-muted-foreground">events</span></>
        )}
      </div>

      {/* Bottom-left: legend */}
      <div className="absolute bottom-2 left-2 z-[1000] bg-[hsl(222,22%,8%)]/90 backdrop-blur rounded px-2.5 py-1.5 border border-border">
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[9px] font-medium text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> M6+</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> M5-6</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-400" /> M4-5</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> M2.5-4</span>
          <span className="flex items-center gap-1 col-span-2"><span className="w-2 h-2 rounded-full border border-dashed border-violet-400" /> NASA Event</span>
        </div>
      </div>
    </div>
  );
}
