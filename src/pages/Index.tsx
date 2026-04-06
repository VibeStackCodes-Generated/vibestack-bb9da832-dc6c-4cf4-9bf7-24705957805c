import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { MarketTicker } from '@/components/MarketTicker';
import { StatsBar } from '@/components/StatsBar';
import { WorldMap } from '@/components/WorldMap';
import { NewsFeed } from '@/components/NewsFeed';
import { ThreatMatrix } from '@/components/ThreatMatrix';
import { CyberPanel } from '@/components/CyberPanel';
import { MilitaryTracker } from '@/components/MilitaryTracker';
import { SeismicMonitor } from '@/components/SeismicMonitor';
import { NASAEvents } from '@/components/NASAEvents';
import { AIBrief } from '@/components/AIBrief';
import { Panel } from '@/components/Panel';
import {
  Newspaper, Activity, Shield, Crosshair, Sparkles, AlertTriangle,
  Flame, Satellite, Pin, PinOff
} from 'lucide-react';

export default function Index() {
  const [mapPinned, setMapPinned] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopBar />
      <MarketTicker />
      <StatsBar />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Pinned map */}
        {mapPinned && (
          <div className="relative shrink-0" style={{ height: '45vh' }}>
            <WorldMap />
            <button
              onClick={() => setMapPinned(false)}
              className="absolute top-2 right-14 z-[1000] bg-[hsl(222,22%,8%)]/90 backdrop-blur rounded p-1.5 border border-border hover:border-emerald-500/30 transition-colors"
              title="Unpin map"
            >
              <PinOff className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Scrollable panel grid */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Show map as panel if unpinned */}
          {!mapPinned && (
            <div className="panel-card mb-2">
              <div className="panel-header" onClick={() => setMapPinned(true)}>
                <div className="flex items-center gap-2">
                  <Pin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="panel-title">Pin Map to Top</span>
                </div>
              </div>
            </div>
          )}

          <div className="panel-grid">
            {/* Live News */}
            <Panel
              title="Live News"
              icon={<Newspaper className="w-3.5 h-3.5 text-emerald-500" />}
              badge="GDELT"
              badgeColor="bg-emerald-500/15 text-emerald-400"
              maxHeight="500px"
            >
              <NewsFeed />
            </Panel>

            {/* Earthquakes */}
            <Panel
              title="Earthquakes"
              icon={<Activity className="w-3.5 h-3.5 text-amber-500" />}
              badge="USGS LIVE"
              badgeColor="bg-amber-500/15 text-amber-400"
              maxHeight="500px"
            >
              <SeismicMonitor />
            </Panel>

            {/* NASA Events */}
            <Panel
              title="Natural Events"
              icon={<Satellite className="w-3.5 h-3.5 text-violet-500" />}
              badge="NASA EONET"
              badgeColor="bg-violet-500/15 text-violet-400"
              maxHeight="400px"
            >
              <NASAEvents />
            </Panel>

            {/* AI Brief */}
            <Panel
              title="AI Intelligence Brief"
              icon={<Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
              badge="AI"
              badgeColor="bg-emerald-500/15 text-emerald-400"
              maxHeight="400px"
            >
              <AIBrief />
            </Panel>

            {/* Threat Matrix */}
            <Panel
              title="Country Risk Index"
              icon={<AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
              badge="10 NATIONS"
              badgeColor="bg-red-500/15 text-red-400"
              maxHeight="400px"
            >
              <ThreatMatrix />
            </Panel>

            {/* Military */}
            <Panel
              title="Military Activity"
              icon={<Crosshair className="w-3.5 h-3.5 text-blue-500" />}
              maxHeight="400px"
            >
              <MilitaryTracker />
            </Panel>

            {/* Cyber */}
            <Panel
              title="Cyber Threats"
              icon={<Shield className="w-3.5 h-3.5 text-violet-500" />}
              maxHeight="400px"
            >
              <CyberPanel />
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
