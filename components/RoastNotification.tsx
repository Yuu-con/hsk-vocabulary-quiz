'use client';

import React, { useState, useEffect } from 'react';
import { RoastMessage, getRandomRoast } from '@/data/roasts';
import { X, Bell, Flame } from 'lucide-react';

interface RoastNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  seed?: number;
  duration?: number; // ms to auto close
}

export const RoastNotification: React.FC<RoastNotificationProps> = ({
  isVisible,
  onClose,
  seed,
  duration = 5500,
}) => {
  const [currentRoast, setCurrentRoast] = useState<RoastMessage | null>(null);

  useEffect(() => {
    if (isVisible) {
      setCurrentRoast(getRandomRoast(seed));

      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, seed, duration, onClose]);

  if (!isVisible || !currentRoast) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md sm:max-w-lg transition-all duration-300 animate-slide-down pointer-events-auto"
      role="status"
      aria-live="polite"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 border-rose-200 shadow-2xl shadow-rose-950/20 text-slate-900 overflow-hidden relative">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 animate-pulse" />

        {/* Header row */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <Bell className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
              <span>HSK Quiz</span>
              <span className="text-slate-300">•</span>
              <span className="text-rose-600 uppercase text-[11px] font-extrabold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                {currentRoast.category}
              </span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content row */}
        <div className="flex items-start gap-3 pt-0.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 border border-rose-200/80 flex items-center justify-center text-2xl shrink-0 shadow-xs select-none">
            {currentRoast.icon}
          </div>

          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                &ldquo;{currentRoast.categoryTitle}&rdquo;
              </span>
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                #{currentRoast.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-rose-950 leading-snug">
              &ldquo;{currentRoast.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
