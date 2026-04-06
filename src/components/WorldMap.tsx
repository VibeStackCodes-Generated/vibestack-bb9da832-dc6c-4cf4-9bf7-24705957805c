import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { threatEvents, formatTimeAgo, severityColor } from '@/lib/data';

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.setView([20, 30], 2);
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);
  return null;
}

export function WorldMap() {
  const sevToHex = (s: string) => {
    if (s === 'critical') return '#dc2626';
    if (s === 'high') return '#d97706';
    if (s === 'medium') return '#ca8a04';
    return '#16a34a';
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[20, 30]}
        zoom={2}
        minZoom={2}
        maxZoom={10}
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
        {threatEvents.map((ev) => {
          const color = sevToHex(ev.severity);
          const r = ev.severity === 'critical' ? 9 : ev.severity === 'high' ? 7 : 5;
          const sc = severityColor(ev.severity);
          return (
            <CircleMarker
              key={ev.id}
              center={[ev.lat, ev.lng]}
              radius={r}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.45, weight: 2, opacity: 0.8 }}
            >
              <Popup>
                <div className="space-y-1 min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                    <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">{ev.type}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${sc.badge}`}>{ev.severity}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-700">{ev.location}</div>
                  <div className="text-[11px] text-slate-600">{ev.description}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(ev.timestamp)}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-slate-200 text-[10px] font-medium">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium</span>
      </div>
      <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md border border-slate-200 text-[11px] font-semibold text-slate-700">
        <span className="text-blue-600">{threatEvents.length}</span> Active Events
      </div>
    </div>
  );
}
