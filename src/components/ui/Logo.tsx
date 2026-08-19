interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', theme = 'light', className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', tamil: 'text-xs' },
    md: { icon: 'w-9 h-9', text: 'text-xl', tamil: 'text-sm' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', tamil: 'text-base' },
  };

  const gridColors = [
    '#8FBFB4', '#5AA897', '#3E8B7A',
    '#7BA882', '#D9A441', '#E88B35',
    '#DE6A45', '#D24B59', '#D946EF',
  ];

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#11100F]';
  const subtitleColor = theme === 'dark' ? 'text-stone-400' : 'text-stone-600';

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* 3x3 Salt Pan Grid Icon */}
      <div className={`grid grid-cols-3 gap-0.5 p-1 bg-[#11100F] border border-stone-800 rounded-xl shadow-sm shrink-0 ${sizeMap[size].icon}`}>
        {gridColors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="w-full h-full rounded-[2px] transition-transform hover:scale-105 relative flex items-center justify-center"
          >
            {/* The final 9th compartment (magenta) contains the Artemia dot/symbol */}
            {index === 8 && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" title="Artemia" />
            )}
          </div>
        ))}
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline space-x-2">
            <span className={`font-heading font-extrabold tracking-tight ${textColor} ${sizeMap[size].text}`}>
              PANNAI
            </span>
            <span className={`font-tamil font-bold text-pink-600 ${sizeMap[size].tamil}`}>
              பண்ணை
            </span>
          </div>
          <span className={`text-[10px] tracking-widest uppercase font-mono font-bold mt-0.5 ${subtitleColor}`}>
            Salt-Pan Bioeconomy
          </span>
        </div>
      )}
    </div>
  );
};

