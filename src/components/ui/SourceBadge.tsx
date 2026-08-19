import React from 'react';
import type { DataSourceType } from '../../types';

interface SourceBadgeProps {
  source: DataSourceType;
  timestamp?: string;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, timestamp, className = '' }) => {
  const getBadgeStyle = () => {
    switch (source) {
      case 'SATELLITE':
        return 'bg-blue-50 text-blue-800 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50';
      case 'FIELD':
        return 'bg-amber-50 text-amber-900 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50';
      case 'WEATHER':
        return 'bg-sky-50 text-sky-800 border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/50';
      case 'LAB':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50';
      case 'MODEL':
        return 'bg-purple-50 text-purple-900 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50';
      case 'DEMO':
        return 'bg-pink-50 text-pink-800 border-pink-200/80 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/50';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase rounded border ${getBadgeStyle()} ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      <span>{source}</span>
      {timestamp && <span className="text-[9px] opacity-75 normal-case font-sans">· {timestamp}</span>}
    </span>
  );
};
