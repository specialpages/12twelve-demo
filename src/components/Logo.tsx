import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', withText = true }) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text12: 'text-xl', sub: 'text-[7px]' },
    md: { box: 'w-10 h-10', text12: 'text-2xl', sub: 'text-[8px]' },
    lg: { box: 'w-14 h-14', text12: 'text-3xl', sub: 'text-[10px]' },
    xl: { box: 'w-20 h-20', text12: 'text-5xl', sub: 'text-[12px]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exact recreation of the iconic forest green 12 TWELVE COFFEE sign */}
      <div
        className={`${currentSize.box} relative bg-[#183F25] border border-[#235634] rounded-md shadow-md flex items-center justify-center select-none overflow-hidden shrink-0 group`}
        style={{
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Numeral 1 */}
          <path
            d="M22 28 L34 22 L34 82 L21 82 L21 34 L17 37 Z"
            fill="#F6F4EB"
          />
          {/* Numeral 2 with bottom right pill cutout for TWELVE COFFEE */}
          <path
            d="M48 34 C48 23, 62 21, 74 25 C82 28, 86 36, 82 45 C78 54, 62 64, 52 71 L52 76 L86 76 L86 82 L44 82 L44 69 C53 62, 72 50, 74 44 C76 38, 72 32, 65 31 C57 30, 52 35, 52 42 Z"
            fill="#F6F4EB"
          />
          {/* Inset badge box at bottom right of the 2 */}
          <rect x="46" y="66" width="46" height="15" rx="3" fill="#F6F4EB" />
          <text
            x="69"
            y="77.5"
            textAnchor="middle"
            fill="#183F25"
            fontSize="7.5"
            fontWeight="900"
            fontFamily="Outfit, sans-serif"
            letterSpacing="-0.2px"
          >
            TWELVE COFFEE
          </text>
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-base md:text-lg tracking-tight text-[#F6F4EB] leading-tight font-['Outfit'] uppercase">
            Twelve Coffee
          </span>
          <span className="text-[11px] font-medium text-[#A69B89] tracking-wider uppercase">
            Coorg to Srinagar
          </span>
        </div>
      )}
    </div>
  );
};
