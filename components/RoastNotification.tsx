'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RoastMessage, getRandomRoast } from '@/data/roasts';
import { X, Flame, CheckCircle, MessageSquareQuote } from 'lucide-react';

interface RoastModalProps {
  isVisible: boolean;
  onClose: () => void;
  seed?: number;
}

export const RoastNotification: React.FC<RoastModalProps> = ({
  isVisible,
  onClose,
  seed,
}) => {
  const [currentRoast, setCurrentRoast] = useState<RoastMessage | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible) {
      setCurrentRoast(getRandomRoast(seed));
      setUserInput('');
      // Prevent background scrolling while modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible, seed]);

  // Handle keyboard events (ESC or Enter)
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  const handleConfirm = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm();
  };

  if (!isVisible || !currentRoast) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roast-modal-title"
    >
      {/* Modal Dialog Card centered in viewport */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200 overflow-hidden transform animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top vibrant accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-red-500" />

        {/* Close button top right */}
        <button
          onClick={handleConfirm}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition focus:outline-none"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large humorous Icon / Avatar */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 via-amber-50 to-rose-200 border-2 border-rose-200 flex items-center justify-center text-4xl shadow-inner mb-4 select-none animate-bounce">
          {currentRoast.icon}
        </div>

        {/* Category & Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{currentRoast.category}</span>
          <span>•</span>
          <span>{currentRoast.categoryTitle}</span>
        </div>

        {/* Tag */}
        <div className="mb-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            #{currentRoast.tag}
          </span>
        </div>

        {/* The Roast Quote in bold, emphatic text */}
        <div className="relative bg-rose-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200 mb-6 text-left">
          <MessageSquareQuote className="w-6 h-6 text-rose-300 absolute -top-3 -left-2 rotate-180" />
          <p
            id="roast-modal-title"
            className="text-base sm:text-lg font-bold text-rose-950 leading-relaxed italic text-center"
          >
            &ldquo;{currentRoast.quote}&rdquo;
          </p>
        </div>

        {/* Interactive Interaction Area (Bắt buộc người dùng tương tác: nhập hoặc bấm "Đồng ý" mới cho tắt) */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-xs font-semibold text-slate-600">
            Cam kết tập trung hoặc ấn <strong className="text-rose-600 font-bold">&ldquo;Đồng ý&rdquo;</strong> để tiếp tục:
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Nhập "OK" hoặc lời hứa cố gắng...'
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-red-500 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Đồng ý</span>
            </button>
          </div>
        </form>

        <div className="mt-3 text-[11px] text-slate-400">
          (Ấn nút <strong>Đồng ý</strong> hoặc phím <strong>Enter</strong> để tắt cửa sổ và xem đáp án)
        </div>
      </div>
    </div>
  );
};

export const RoastModal = RoastNotification;
