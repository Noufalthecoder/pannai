import React from 'react';
import type { PondStatus, QualityGrade } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'demo' | 'magenta' | 'outline' | 'success' | 'warning' | 'info';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  const variantClasses = {
    default: 'bg-[#EAE4DC] text-[#14100E] border border-[#DCD3C7]',
    demo: 'bg-[#F2EAE0] text-[#69615B] border border-[#D9CEBF] font-mono tracking-wider',
    magenta: 'bg-[#C42A6B] text-white shadow-sm',
    outline: 'border border-[#C42A6B] text-[#C42A6B] bg-transparent',
    success: 'bg-[#3E8B7A] text-white',
    warning: 'bg-[#D9A441] text-[#14100E]',
    info: 'bg-[#8FBFB4] text-[#14100E]',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full uppercase tracking-wider transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const DemoBadge: React.FC<{ label?: string }> = ({ label = 'DEMO' }) => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECE5DB] text-[#69615B] border border-[#D6CBC0] ml-1.5">
    {label}
  </span>
);

export const StatusBadge: React.FC<{ status: PondStatus | QualityGrade | string }> = ({ status }) => {
  const getStyle = (s: string) => {
    switch (s) {
      case 'TOO DILUTE':
        return 'bg-[#E1F0EC] text-[#296054] border-[#8FBFB4]';
      case 'APPROACHING':
        return 'bg-[#E6F3F0] text-[#1D5E50] border-[#3E8B7A]';
      case 'CANDIDATE':
        return 'bg-[#FCF4E2] text-[#8C6212] border-[#D9A441]';
      case 'FIELD CHECK':
        return 'bg-[#FDF0EB] text-[#A63F20] border-[#DE6A45]';
      case 'SUITABLE':
        return 'bg-[#E2F4EE] text-[#165A4B] border-[#3E8B7A]';
      case 'HARVEST WINDOW':
      case 'GRADE A':
      case 'CERTIFIED':
        return 'bg-[#FAF0F4] text-[#C42A6B] border-[#C42A6B] font-bold';
      case 'GRADE B':
        return 'bg-[#FDF4E3] text-[#A6781B] border-[#D9A441]';
      default:
        return 'bg-[#EAE4DC] text-[#14100E] border-[#DCD3C7]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};
