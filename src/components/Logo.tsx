import React from 'react';

interface LogoProps {
  onClick?: () => void;
  variant?: 'default' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({ onClick, variant = 'default' }) => {
  const isFooter = variant === 'footer';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 font-display text-[1.35rem] font-extrabold tracking-[-0.04em] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2447ff] ${
        isFooter ? 'text-white' : 'text-[#0c1233]'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={isFooter ? 36 : 40}
        height={isFooter ? 36 : 40}
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110"
      >
        <rect
          x="3"
          y="3"
          width="38"
          height="38"
          rx="9"
          fill="#c9f23f"
          stroke="#0c1233"
          strokeWidth="3"
        />
        <path
          d="M14 27c0-8 18-5 18-12M14 33h20"
          fill="none"
          stroke="#0c1233"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="35" cy="31" r="4" fill="#2447ff" />
      </svg>
      <span>
        SmartLoans
        <span className={isFooter ? 'text-[#c9f23f]' : 'text-[#2447ff]'}>Guide</span>
      </span>
    </button>
  );
};
