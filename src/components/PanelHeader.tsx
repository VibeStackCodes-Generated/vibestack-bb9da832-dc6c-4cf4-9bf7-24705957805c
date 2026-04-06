import { ReactNode } from 'react';

interface Props {
  title: string;
  icon: ReactNode;
  badge?: string;
  badgeClass?: string;
  children?: ReactNode;
}

export function PanelHeader({ title, icon, badge, badgeClass = 'bg-blue-100 text-blue-700', children }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
        {badge && <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>{badge}</span>}
      </div>
      {children}
    </div>
  );
}
