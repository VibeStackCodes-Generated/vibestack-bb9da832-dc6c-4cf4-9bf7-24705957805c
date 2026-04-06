import { TopBar } from '@/components/TopBar';
import { MarketTicker } from '@/components/MarketTicker';
import { StatsBar } from '@/components/StatsBar';
import { WorldMap } from '@/components/WorldMap';
import { NewsFeed } from '@/components/NewsFeed';
import { ThreatMatrix } from '@/components/ThreatMatrix';
import { CyberPanel } from '@/components/CyberPanel';
import { MilitaryTracker } from '@/components/MilitaryTracker';
import { SeismicMonitor } from '@/components/SeismicMonitor';
import { AIBrief } from '@/components/AIBrief';
import { PanelHeader } from '@/components/PanelHeader';
import {
  Newspaper, Globe, Shield, Crosshair, Activity, Sparkles, AlertTriangle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      <TopBar />
      <MarketTicker />
      <StatsBar />

      <div className="flex-1 overflow-hidden px-4 pb-4">
        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-12 gap-3 h-full">
          {/* Left - Live News */}
          <div className="col-span-3 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <PanelHeader
              title="Live News Feed"
              icon={<Newspaper className="w-4 h-4 text-emerald-600" />}
              badge="LIVE"
              badgeClass="bg-emerald-100 text-emerald-700"
            />
            <div className="flex-1 overflow-hidden">
              <NewsFeed />
            </div>
          </div>

          {/* Center - Map + AI */}
          <div className="col-span-6 flex flex-col gap-3 overflow-hidden">
            <div className="h-[58%] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col shrink-0">
              <PanelHeader
                title="Live Global Events"
                icon={<Globe className="w-4 h-4 text-blue-600" />}
                badge="USGS + NASA"
                badgeClass="bg-blue-100 text-blue-700"
              />
              <div className="flex-1 overflow-hidden">
                <WorldMap />
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0">
              <PanelHeader
                title="AI Intelligence Brief"
                icon={<Sparkles className="w-4 h-4 text-violet-600" />}
                badge="SENTINEL-4"
                badgeClass="bg-violet-100 text-violet-700"
              />
              <div className="flex-1 overflow-hidden">
                <AIBrief />
              </div>
            </div>
          </div>

          {/* Right - Tabs */}
          <div className="col-span-3 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Tabs defaultValue="seismic" className="flex flex-col h-full">
              <TabsList className="w-full rounded-none border-b border-slate-200 bg-white h-auto p-0 shrink-0">
                <TabsTrigger value="seismic" className="flex-1 text-[10px] font-semibold rounded-none data-[state=active]:bg-slate-50 data-[state=active]:text-sky-700 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-sky-500 text-slate-400 py-2.5">
                  <Activity className="w-3 h-3 mr-1" /> Seismic
                </TabsTrigger>
                <TabsTrigger value="threats" className="flex-1 text-[10px] font-semibold rounded-none data-[state=active]:bg-slate-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-amber-500 text-slate-400 py-2.5">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Threats
                </TabsTrigger>
                <TabsTrigger value="military" className="flex-1 text-[10px] font-semibold rounded-none data-[state=active]:bg-slate-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-blue-500 text-slate-400 py-2.5">
                  <Crosshair className="w-3 h-3 mr-1" /> Military
                </TabsTrigger>
                <TabsTrigger value="cyber" className="flex-1 text-[10px] font-semibold rounded-none data-[state=active]:bg-slate-50 data-[state=active]:text-violet-700 data-[state=active]:shadow-[inset_0_-2px_0_0] data-[state=active]:shadow-violet-500 text-slate-400 py-2.5">
                  <Shield className="w-3 h-3 mr-1" /> Cyber
                </TabsTrigger>
              </TabsList>
              <TabsContent value="seismic" className="flex-1 overflow-hidden m-0 bg-slate-50">
                <SeismicMonitor />
              </TabsContent>
              <TabsContent value="threats" className="flex-1 overflow-hidden m-0 bg-slate-50">
                <ThreatMatrix />
              </TabsContent>
              <TabsContent value="military" className="flex-1 overflow-hidden m-0 bg-slate-50">
                <MilitaryTracker />
              </TabsContent>
              <TabsContent value="cyber" className="flex-1 overflow-hidden m-0 bg-slate-50">
                <CyberPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden h-full overflow-hidden">
          <Tabs defaultValue="map" className="flex flex-col h-full">
            <TabsList className="w-full rounded-xl mb-2 shrink-0 bg-white border border-slate-200 shadow-sm">
              <TabsTrigger value="map" className="flex-1 text-[10px] font-semibold data-[state=active]:text-blue-700">
                <Globe className="w-3 h-3 mr-1" /> Map
              </TabsTrigger>
              <TabsTrigger value="news" className="flex-1 text-[10px] font-semibold data-[state=active]:text-emerald-700">
                <Newspaper className="w-3 h-3 mr-1" /> News
              </TabsTrigger>
              <TabsTrigger value="seismic" className="flex-1 text-[10px] font-semibold data-[state=active]:text-sky-700">
                <Activity className="w-3 h-3 mr-1" /> Seismic
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1 text-[10px] font-semibold data-[state=active]:text-violet-700">
                <Sparkles className="w-3 h-3 mr-1" /> AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="flex-1 overflow-hidden m-0 bg-white rounded-xl border border-slate-200 shadow-sm">
              <WorldMap />
            </TabsContent>
            <TabsContent value="news" className="flex-1 overflow-hidden m-0 bg-white rounded-xl border border-slate-200 shadow-sm">
              <NewsFeed />
            </TabsContent>
            <TabsContent value="seismic" className="flex-1 overflow-hidden m-0 bg-white rounded-xl border border-slate-200 shadow-sm">
              <SeismicMonitor />
            </TabsContent>
            <TabsContent value="ai" className="flex-1 overflow-hidden m-0 bg-white rounded-xl border border-slate-200 shadow-sm">
              <AIBrief />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-8 bg-white border-t border-slate-200 flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" /> Live Data Active
          </span>
          <span className="text-[10px] text-slate-400">USGS &middot; GDELT &middot; NASA EONET</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-slate-400">
          <span>Auto-refresh: <span className="font-semibold text-slate-600">60s</span></span>
          <span className="text-slate-300">v4.2.1</span>
        </div>
      </div>
    </div>
  );
}
