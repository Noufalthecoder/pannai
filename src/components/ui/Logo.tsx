import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8 p-0.5 rounded-lg', text: 'text-base', tamil: 'text-[11px]' },
    md: { icon: 'w-11 h-11 p-1 rounded-xl', text: 'text-xl', tamil: 'text-sm' },
    lg: { icon: 'w-16 h-16 p-1.5 rounded-2xl', text: 'text-2xl', tamil: 'text-base' },
    xl: { icon: 'w-24 h-24 p-2 rounded-3xl', text: 'text-4xl', tamil: 'text-xl' },
  };

  // Exact 9 compartment colors from official PANNAI brand identity asset
  const gridColors = [
    '#57A695', '#389B84', '#2E8873', // Top row (Coastal green/teal gradient)
    '#2E8873', '#DDA83E', '#E78B2E', // Middle row (Evaporation amber gradient)
    '#E5673C', '#D83D4F', '#C51B6A', // Bottom row (Hypersaline magenta/red gradient)
  ];

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#11100F]';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3x3 Salt Pan Grid Box (Black rounded container) */}
      <div className={`grid grid-cols-3 gap-0.5 bg-[#11100F] border-2 border-[#11100F] shrink-0 shadow-md ${sizeMap[size].icon}`}>
        {gridColors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="w-full h-full rounded-[2px] relative flex items-center justify-center overflow-hidden"
          >
            {/* 9th Compartment (Magenta): Official Artemia Biological Icon */}
            {index === 8 && (
              <svg viewBox="0 0 24 24" fill="white" className="w-3/4 h-3/4 drop-shadow-xs">
                <path d="M19 12c-1.5-2.2-4.5-3.5-7.5-3.5-4.2 0-7.5 2.2-7.5 5.5s3.2 4.5 6.5 4.5c4 0 7.2-1.8 8.5-6.5zM7 14c-.8 0-1.5-.7-1.5-1.5S6.2 11 7 11s1.5.7 1.5 1.5S7.8 14 7 14z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {variant === 'full' && (
        <div className="flex flex-col items-center text-center mt-1.5 leading-tight">
          <span className={`font-heading font-extrabold tracking-wider ${textColor} ${sizeMap[size].text}`}>
            PANNAI
          </span>
          <span className={`font-tamil font-extrabold text-[#C51B6A] tracking-[0.25em] ${sizeMap[size].tamil}`}>
            ப ண் ணை
          </span>
        </div>
      )}
    </div>
  );
};
