import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEarthquakes, useNASAEvents, formatTimeAgoLive } from '@/hooks/useLiveData';
import type { USGSFeature, EONETEvent } from '@/hooks/useLiveData';
import { Loader2 } from 'lucide-react';

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.setView([20, 20], 2);
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);
  return null;
}

function magToColor(mag: number) {
  if (mag >= 6) return '#dc2626';
  if (mag >= 5) return '#ea580c';
  if (mag >= 4) return '#d97706';
  if (mag >= 3) return '#ca8a04';
  return '#0ea5e9';
}

function magToRadius(mag: number) {
  if (mag >= 7) return 12;
  if (mag >= 6) return 9;
  if (mag >= 5) return 7;
  if (mag >= 4) return 5;
  return 4;
}

function eonetColor(cat: string) {
  if (cat.includes('Wildfire') || cat.includes('Fire')) return '#ef4444';
  if (cat.includes('Volcano')) return '#dc2626';
  if (cat.includes('Storm') || cat.includes('Cyclone')) return '#7c3aed';
  if (cat.includes('Flood')) return '#2563eb';
  if (cat.includes('Ice')) return '#06b6d4';
  return '#f59e0b';
}

function QuakeMarkers({ quakes }: { quakes: USGSFeature[] }) {
  return (
    <>
      {quakes.map((eq) => {
        const [lng, lat, depth] = eq.geometry.coordinates;
        const mag = eq.properties.mag;
        const color = magToColor(mag);
        return (
          <CircleMarker
            key={eq.id}
            center={[lat, lng]}
            radius={magToRadius(mag)}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.4,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Popup>
              <div className="space-y-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-bold text-slate-900 text-xs">
                    M{mag.toFixed(1)} Earthquake
                  </span>
                  {eq.properties.tsunami === 1 && (
                    <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full border border-red-200">
                      TSUNAMI
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium text-blue-700">{eq.properties.place}</div>
                <div className="text-[11px] text-slate-500">Depth: {depth.toFixed(0)}km</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {formatTimeAgoLive(eq.properties.time)}
                </div>
                <a
                  href={eq.properties.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 hover:underline font-medium"
                >
                  View on USGS &rarr;
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}

function NASAMarkers({ events }: { events: EONETEvent[] }) {
  return (
    <>
      {events.map((ev) => {
        const geo = ev.geometry[ev.geometry.length - 1];
        if (!geo || !geo.coordinates) return null;
        const [lng, lat] = geo.coordinates;
        const catTitle = ev.categories[0]?.title || 'Event';
        const color = eonetColor(catTitle);
        return (
          <CircleMarker
            key={ev.id}
            center={[lat, lng]}
            radius={7}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.35,
              weight: 2,
              opacity: 0.7,
              dashArray: '4 3',
            }}
          >
            <Popup>
              <div className="space-y-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                    {catTitle.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900">{ev.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {new Date(geo.date).toLocaleDateString()}
                </div>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 hover:underline font-medium"
                >
                  View on NASA EONET &rarr;
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}

export function WorldMap() {
  const { data: quakes, isLoading: qLoading } = useEarthquakes();
  const { data: nasaEvents, isLoading: nLoading } = useNASAEvents();

  const totalEvents = (quakes?.length || 0) + (nasaEvents?.length || 0);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[20, 20]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full z-0"
      >
        <FitBounds />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        {quakes && <QuakeMarkers quakes={quakes} />}
        {nasaEvents && <NASAMarkers events={nasaEvents} />}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2.5 shadow-md border border-slate-200">
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Live Data</div>
        <div className="flex flex-col gap-1 text-[10px] font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> M6+ Quake
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> M4-6 Quake
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> M2.5-4 Quake
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-dashed border-violet-500" /> NASA Event
          </span>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md border border-slate-200 text-[11px] font-semibold text-slate-700">
        {(qLoading || nLoading) ? (
          <span className="flex items-center gap-1.5 text-slate-400">
            <Loader2 className="w-3 h-3 animate-spin" /> Loading...
          </span>
        ) : (
          <>
            <span className="text-blue-600">{totalEvents}</span> Live Events
          </>
        )}
      </div>

      {/* Source badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-md border border-slate-200 text-[9px] font-semibold text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
          USGS + NASA EONET &middot; Live
        </span>
      </div>
    </div>
  );
}
