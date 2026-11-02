import React from 'react';
import { CalculatorConfig, TileColor } from '../types';

interface CalculatorTileProps {
  calculator: CalculatorConfig;
  onOpen: (slug: string) => void;
}

const TILE_THEME: Record<
  TileColor,
  { bg: string; text: string; kickerText: string; descOpacity: string }
> = {
  [TileColor.Blue]: {
    bg: 'bg-[#2447ff]',
    text: 'text-white',
    kickerText: 'text-[#c9f23f]',
    descOpacity: 'text-white/90',
  },
  [TileColor.White]: {
    bg: 'bg-white',
    text: 'text-[#0c1233]',
    kickerText: 'text-[#2447ff]',
    descOpacity: 'text-[#46507a]',
  },
  [TileColor.Lime]: {
    bg: 'bg-[#c9f23f]',
    text: 'text-[#0c1233]',
    kickerText: 'text-[#0c1233]/80',
    descOpacity: 'text-[#0c1233]/90',
  },
  [TileColor.Orange]: {
    bg: 'bg-[#ff7a2f]',
    text: 'text-[#0c1233]',
    kickerText: 'text-[#0c1233]',
    descOpacity: 'text-[#0c1233]/90',
  },
};

export const CalculatorTile: React.FC<CalculatorTileProps> = ({
  calculator,
  onOpen,
}) => {
  const theme = TILE_THEME[calculator.color];

  return (
    <button
      type="button"
      onClick={() => onOpen(calculator.slug)}
      className={`group text-left flex flex-col justify-between min-h-[234px] p-6 rounded-[22px] slg-card-hover cursor-pointer ${theme.bg} ${theme.text}`}
    >
      <div>
        <div className={`text-[0.82rem] font-display font-bold ${theme.kickerText}`}>
          {calculator.tag} · Free tool
        </div>
        <h3 className="font-display font-extrabold text-[1.32rem] leading-[1.12] mt-3 mb-2.5">
          {calculator.title}
        </h3>
        <p className={`text-[0.96rem] leading-relaxed m-0 ${theme.descOpacity}`}>
          {calculator.shortDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-current/15 flex items-center justify-between font-display font-extrabold text-[1rem] whitespace-nowrap">
        <span>Open calculator</span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-2"
        >
          →
        </span>
      </div>
    </button>
  );
};
