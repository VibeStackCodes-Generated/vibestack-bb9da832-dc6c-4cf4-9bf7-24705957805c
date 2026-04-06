export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: 'geopolitical' | 'military' | 'economic' | 'cyber' | 'disaster' | 'infrastructure';
  severity: 'critical' | 'high' | 'medium' | 'low';
  region: string;
  timestamp: Date;
  summary: string;
  aiAnalysis?: string;
}

export interface ThreatEvent {
  id: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  timestamp: Date;
}

export interface MarketData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface CountryRisk {
  country: string;
  code: string;
  score: number;
  trend: 'rising' | 'stable' | 'declining';
  factors: string[];
}

export interface CyberThreat {
  id: string;
  type: string;
  target: string;
  origin: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'investigating';
  timestamp: Date;
}

export interface SeismicEvent {
  id: string;
  magnitude: number;
  location: string;
  depth: number;
  lat: number;
  lng: number;
  timestamp: Date;
}

export interface MilitaryActivity {
  id: string;
  type: string;
  region: string;
  description: string;
  forces: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export const newsItems: NewsItem[] = [
  { id: 'n1', title: 'NATO Increases Baltic Air Patrols Amid Rising Tensions', source: 'Reuters', category: 'military', severity: 'high', region: 'Europe', timestamp: new Date(Date.now() - 12 * 60000), summary: 'NATO has deployed additional fighter jets to patrol Baltic airspace following multiple incursions detected over the past 72 hours.', aiAnalysis: 'Pattern consistent with escalatory posturing. 78% probability of continued provocations over next 14 days.' },
  { id: 'n2', title: 'Major Undersea Cable Disruption in Red Sea Corridor', source: 'Bloomberg', category: 'infrastructure', severity: 'critical', region: 'Middle East', timestamp: new Date(Date.now() - 28 * 60000), summary: 'Three undersea fiber optic cables in the Red Sea have been severed, disrupting 25% of data traffic between Europe and Asia.', aiAnalysis: 'Infrastructure vulnerability assessment: HIGH. Estimated repair timeline 4-6 weeks.' },
  { id: 'n3', title: 'South China Sea: Philippine Coast Guard Reports Laser Incident', source: 'AP News', category: 'geopolitical', severity: 'high', region: 'Asia-Pacific', timestamp: new Date(Date.now() - 45 * 60000), summary: 'Philippine Coast Guard vessel reports military-grade laser directed at crew near Second Thomas Shoal.', aiAnalysis: 'Escalation index: 7.2/10. Similar incidents preceded diplomatic deterioration in 82% of cases.' },
  { id: 'n4', title: 'Central Bank of Turkey Emergency Rate Decision', source: 'Financial Times', category: 'economic', severity: 'medium', region: 'Middle East', timestamp: new Date(Date.now() - 67 * 60000), summary: 'CBRT announces emergency 500bp rate hike to defend lira amid capital flight concerns.', aiAnalysis: 'Currency stabilization probability: 45%. Contagion risk to emerging markets: MODERATE.' },
  { id: 'n5', title: 'Ransomware Attack Targets European Energy Grid Operator', source: 'CyberScoop', category: 'cyber', severity: 'critical', region: 'Europe', timestamp: new Date(Date.now() - 95 * 60000), summary: 'Major European grid operator confirms ransomware breach affecting SCADA systems across 3 countries.', aiAnalysis: 'Attack signature matches APT-41 variant. Critical infrastructure impact: HIGH.' },
  { id: 'n6', title: 'M7.1 Earthquake Strikes Off Coast of Papua New Guinea', source: 'USGS', category: 'disaster', severity: 'high', region: 'Asia-Pacific', timestamp: new Date(Date.now() - 120 * 60000), summary: 'Magnitude 7.1 earthquake recorded at 35km depth. Tsunami advisory issued for coastal regions.', aiAnalysis: 'Aftershock probability M5+: 85% within 24hrs. Tsunami risk: LOW.' },
  { id: 'n7', title: 'Wagner Group Expands Operations in Sahel Region', source: 'BBC', category: 'military', severity: 'medium', region: 'Africa', timestamp: new Date(Date.now() - 180 * 60000), summary: 'Satellite imagery confirms new Wagner Group base construction in northern Mali.', aiAnalysis: 'Force projection capability increasing. Regional destabilization index: 6.8/10.' },
  { id: 'n8', title: 'Taiwan Strait: Unusual PLA Naval Deployment Detected', source: 'OSINT Analysts', category: 'military', severity: 'critical', region: 'Asia-Pacific', timestamp: new Date(Date.now() - 8 * 60000), summary: 'Commercial satellite imagery reveals 12+ PLAN vessels including 2 carriers conducting exercises east of Taiwan.', aiAnalysis: 'Deployment scale exceeds routine exercises by 340%. Cross-strait tension index: 8.9/10.' },
  { id: 'n9', title: 'TSMC Fab Disruption Threatens Semiconductor Supply Chain', source: 'Nikkei Asia', category: 'economic', severity: 'high', region: 'Asia-Pacific', timestamp: new Date(Date.now() - 155 * 60000), summary: 'Power grid instability forces temporary shutdown of TSMC advanced node fabrication facility.', aiAnalysis: 'Supply chain impact: 3-5% reduction in global advanced chip output.' },
];

export const threatEvents: ThreatEvent[] = [
  { id: 't1', type: 'Military', location: 'Baltic Sea', lat: 57.5, lng: 20.0, severity: 'high', description: 'NATO air patrol escalation', timestamp: new Date(Date.now() - 12 * 60000) },
  { id: 't2', type: 'Infrastructure', location: 'Red Sea', lat: 14.5, lng: 42.0, severity: 'critical', description: 'Undersea cable disruption', timestamp: new Date(Date.now() - 28 * 60000) },
  { id: 't3', type: 'Maritime', location: 'South China Sea', lat: 9.8, lng: 115.8, severity: 'high', description: 'Naval confrontation', timestamp: new Date(Date.now() - 45 * 60000) },
  { id: 't4', type: 'Cyber', location: 'Central Europe', lat: 50.1, lng: 14.4, severity: 'critical', description: 'Energy grid ransomware', timestamp: new Date(Date.now() - 95 * 60000) },
  { id: 't5', type: 'Seismic', location: 'Papua New Guinea', lat: -5.5, lng: 151.0, severity: 'high', description: 'M7.1 Earthquake', timestamp: new Date(Date.now() - 120 * 60000) },
  { id: 't6', type: 'Military', location: 'Taiwan Strait', lat: 24.0, lng: 121.5, severity: 'critical', description: 'PLA naval deployment', timestamp: new Date(Date.now() - 8 * 60000) },
  { id: 't7', type: 'Conflict', location: 'Sahel Region', lat: 17.0, lng: -1.0, severity: 'medium', description: 'Wagner Group expansion', timestamp: new Date(Date.now() - 180 * 60000) },
  { id: 't8', type: 'Military', location: 'Eastern Ukraine', lat: 48.5, lng: 37.5, severity: 'critical', description: 'Active combat operations', timestamp: new Date(Date.now() - 5 * 60000) },
  { id: 't9', type: 'Terrorism', location: 'Horn of Africa', lat: 2.0, lng: 45.3, severity: 'high', description: 'Al-Shabaab offensive', timestamp: new Date(Date.now() - 300 * 60000) },
  { id: 't10', type: 'Nuclear', location: 'Korean Peninsula', lat: 39.0, lng: 125.7, severity: 'medium', description: 'DPRK missile test prep', timestamp: new Date(Date.now() - 360 * 60000) },
];

export const marketData: MarketData[] = [
  { symbol: 'DXY', name: 'US Dollar Index', value: 104.82, change: 0.34, changePercent: 0.32 },
  { symbol: 'GOLD', name: 'Gold Spot', value: 2387.40, change: 18.60, changePercent: 0.78 },
  { symbol: 'OIL', name: 'Brent Crude', value: 82.15, change: -1.23, changePercent: -1.48 },
  { symbol: 'BTC', name: 'Bitcoin', value: 67842.00, change: -1250.00, changePercent: -1.81 },
  { symbol: 'VIX', name: 'Volatility', value: 18.42, change: 2.15, changePercent: 13.21 },
  { symbol: 'TNX', name: '10Y Treasury', value: 4.52, change: 0.08, changePercent: 1.80 },
  { symbol: 'USD/CNY', name: 'USD/CNY', value: 7.2485, change: 0.0125, changePercent: 0.17 },
  { symbol: 'WHEAT', name: 'Wheat', value: 612.50, change: 8.75, changePercent: 1.45 },
];

export const countryRisks: CountryRisk[] = [
  { country: 'Ukraine', code: 'UA', score: 9.4, trend: 'stable', factors: ['Active conflict', 'Infrastructure damage'] },
  { country: 'Sudan', code: 'SD', score: 8.9, trend: 'rising', factors: ['Civil war', 'Famine risk'] },
  { country: 'Israel', code: 'IL', score: 8.7, trend: 'rising', factors: ['Regional conflict', 'Escalation risk'] },
  { country: 'Myanmar', code: 'MM', score: 8.2, trend: 'rising', factors: ['Civil war', 'State collapse'] },
  { country: 'Taiwan', code: 'TW', score: 8.1, trend: 'rising', factors: ['Military escalation', 'Supply chain'] },
  { country: 'North Korea', code: 'KP', score: 7.8, trend: 'stable', factors: ['Nuclear threats', 'Missile tests'] },
  { country: 'Iran', code: 'IR', score: 7.6, trend: 'rising', factors: ['Nuclear program', 'Proxy conflicts'] },
  { country: 'Somalia', code: 'SO', score: 7.5, trend: 'stable', factors: ['Al-Shabaab', 'State fragility'] },
  { country: 'Mali', code: 'ML', score: 7.1, trend: 'rising', factors: ['Wagner presence', 'Jihadist groups'] },
  { country: 'Venezuela', code: 'VE', score: 6.9, trend: 'rising', factors: ['Political crisis', 'Migration'] },
];

export const cyberThreats: CyberThreat[] = [
  { id: 'c1', type: 'Ransomware', target: 'EU Energy Grid (ENTSO-E)', origin: 'APT-41 (China)', severity: 'critical', status: 'active', timestamp: new Date(Date.now() - 95 * 60000) },
  { id: 'c2', type: 'DDoS', target: 'Baltic Banking Infrastructure', origin: 'Sandworm (Russia)', severity: 'high', status: 'mitigated', timestamp: new Date(Date.now() - 180 * 60000) },
  { id: 'c3', type: 'Supply Chain', target: 'npm Registry Packages', origin: 'Lazarus Group (DPRK)', severity: 'high', status: 'investigating', timestamp: new Date(Date.now() - 45 * 60000) },
  { id: 'c4', type: 'Espionage', target: 'US Defense Contractors', origin: 'Cozy Bear (Russia)', severity: 'critical', status: 'investigating', timestamp: new Date(Date.now() - 320 * 60000) },
  { id: 'c5', type: 'Wiper Malware', target: 'Ukrainian Telecom', origin: 'Sandworm (Russia)', severity: 'high', status: 'active', timestamp: new Date(Date.now() - 60 * 60000) },
];

export const seismicEvents: SeismicEvent[] = [
  { id: 's1', magnitude: 7.1, location: 'Papua New Guinea', depth: 35, lat: -5.5, lng: 151.0, timestamp: new Date(Date.now() - 120 * 60000) },
  { id: 's2', magnitude: 5.4, location: 'Central Turkey', depth: 12, lat: 38.7, lng: 35.5, timestamp: new Date(Date.now() - 340 * 60000) },
  { id: 's3', magnitude: 4.8, location: 'Southern California', depth: 8, lat: 33.9, lng: -118.2, timestamp: new Date(Date.now() - 560 * 60000) },
  { id: 's4', magnitude: 6.2, location: 'Tonga Islands', depth: 180, lat: -21.2, lng: -175.4, timestamp: new Date(Date.now() - 720 * 60000) },
  { id: 's5', magnitude: 5.1, location: 'Northern Japan', depth: 45, lat: 39.7, lng: 142.3, timestamp: new Date(Date.now() - 900 * 60000) },
];

export const militaryActivities: MilitaryActivity[] = [
  { id: 'm1', type: 'Naval Deployment', region: 'Taiwan Strait', description: '12+ PLAN vessels including 2 carriers conducting exercises', forces: 'PLA Navy', timestamp: new Date(Date.now() - 8 * 60000), severity: 'critical' },
  { id: 'm2', type: 'Air Patrol', region: 'Baltic Sea', description: 'NATO F-35 and Eurofighter patrols increased to 24/7', forces: 'NATO Air Forces', timestamp: new Date(Date.now() - 12 * 60000), severity: 'high' },
  { id: 'm3', type: 'Ground Offensive', region: 'Eastern Ukraine', description: 'Mechanized brigade advance near Avdiivka sector', forces: 'Russian Armed Forces', timestamp: new Date(Date.now() - 5 * 60000), severity: 'critical' },
  { id: 'm4', type: 'Missile Test', region: 'Sea of Japan', description: 'DPRK ballistic missile launch preparation detected', forces: 'KPA Strategic Force', timestamp: new Date(Date.now() - 360 * 60000), severity: 'high' },
  { id: 'm5', type: 'Base Construction', region: 'Northern Mali', description: 'New Wagner Group forward operating base identified', forces: 'Wagner PMC', timestamp: new Date(Date.now() - 180 * 60000), severity: 'medium' },
];

export const globalStats = {
  activeConflicts: 34,
  watchlistCountries: 47,
  cyberIncidents24h: 1247,
  seismicEvents24h: 89,
  activeAlerts: 12,
  dataSourcesOnline: 342,
  aiConfidence: 94.2,
};

export function formatTimeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return s + 's ago';
  const m = Math.floor(s / 60);
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

export function severityColor(s: string) {
  if (s === 'critical') return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', badge: 'bg-red-100 text-red-700 border-red-200' };
  if (s === 'high') return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700 border-amber-200' };
  if (s === 'medium') return { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
  return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
}

export function categoryIcon(c: string) {
  const map: Record<string, string> = { geopolitical: '🌐', military: '⚔️', economic: '📊', cyber: '🛡️', disaster: '🌋', infrastructure: '🏗️' };
  return map[c] || '📰';
}
