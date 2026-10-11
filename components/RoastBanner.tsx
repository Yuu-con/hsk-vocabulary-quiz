'use client';

import React, { useMemo } from 'react';
import { RoastMessage, getRandomRoast } from '@/data/roasts';
import { Flame } from 'lucide-react';

interface RoastBannerProps {
  seed?: number;
  customRoast?: RoastMessage;
  className?: string;
}

export const RoastBanner: React.FC<RoastBannerProps> = ({
  seed,
  customRoast,
  className = '',
}) => {
  const roast = useMemo(() => {
    if (customRoast) return customRoast;
    return getRandomRoast(seed);
  }, [seed, customRoast]);

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-100/90 via-rose-50 to-amber-100/80 border border-rose-200 shadow-sm text-rose-950 animate-pop-in ${className}`}
      role="alert"
      aria-label="Lời trêu chọc vui khi trả lời sai"
    >
      <div className="flex items-start gap-3">
        {/* Icon Avatar */}
        <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-rose-200/80 flex items-center justify-center text-xl shrink-0 mt-0.5 select-none">
          {roast.icon}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wide uppercase text-rose-700 bg-white/80 px-2 py-0.5 rounded-md border border-rose-200/60 flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>{roast.category}: &ldquo;{roast.categoryTitle}&rdquo;</span>
            </span>
            <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/80 px-1.5 py-0.5 rounded border border-amber-200/60">
              #{roast.tag}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-rose-950 leading-snug pt-0.5">
            &ldquo;{roast.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
