'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RoastMessage, getRandomRoast } from '@/data/roasts';
import { useRoastMode } from '@/hooks/useRoastMode';
import { X, Flame, CheckCircle, MessageSquareQuote, Sparkles, BookOpen } from 'lucide-react';

export interface AnswerDetails {
  hanzi: string;
  pinyin: string;
  vietnamese: string;
}

interface RoastModalProps {
  isVisible: boolean;
  onClose: () => void;
  seed?: number;
  answerDetails?: AnswerDetails;
  isRoastEnabled?: boolean;
  onToggleRoast?: (enabled: boolean) => void;
}

export const RoastNotification: React.FC<RoastModalProps> = ({
  isVisible,
  onClose,
  seed,
  answerDetails,
  isRoastEnabled: propIsRoastEnabled,
  onToggleRoast: propOnToggleRoast,
}) => {
  const { isRoastEnabled: hookIsRoastEnabled, toggleRoast: hookToggleRoast } = useRoastMode();
  
  // Use prop if provided, otherwise fallback to hook
  const isRoastActive = propIsRoastEnabled !== undefined ? propIsRoastEnabled : hookIsRoastEnabled;
  const handleToggleRoast = propOnToggleRoast !== undefined ? propOnToggleRoast : hookToggleRoast;

  const [currentRoast, setCurrentRoast] = useState<RoastMessage | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible && isRoastActive) {
      setCurrentRoast(getRandomRoast(seed));
      setUserInput('');
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
  }, [isVisible, isRoastActive, seed]);

  // Handle ESC key
  useEffect(() => {
    if (!isVisible || !isRoastActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isRoastActive, onClose]);

  const handleConfirm = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm();
  };

  // If roast mode is disabled, never show modal
  if (!isVisible || !isRoastActive || !currentRoast) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roast-modal-title"
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-rose-200 overflow-hidden transform animate-in zoom-in-95 duration-200 text-center max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top vibrant gradient banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-red-500" />

        {/* Close button top right */}
        <button
          onClick={handleConfirm}
          className="absolute top-3.5 right-3.5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition focus:outline-none"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Humorous Animated Icon */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-rose-100 via-amber-50 to-rose-200 border-2 border-rose-200 flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 select-none animate-bounce">
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
        <div className="mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            #{currentRoast.tag}
          </span>
        </div>

        {/* The Humorous Roast Quote */}
        <div className="relative bg-rose-50/70 rounded-2xl p-3.5 sm:p-4 border border-rose-200 mb-4 text-left">
          <MessageSquareQuote className="w-5 h-5 text-rose-300 absolute -top-2.5 -left-1.5 rotate-180" />
          <p
            id="roast-modal-title"
            className="text-sm sm:text-base font-bold text-rose-950 leading-relaxed italic text-center"
          >
            &ldquo;{currentRoast.quote}&rdquo;
          </p>
        </div>

        {/* Core Answer Display: Chữ Hán - Pinyin - Tiếng Việt */}
        {answerDetails && (
          <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl p-4 border border-amber-200 shadow-xs mb-4 text-left">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                Đáp án chuẩn cần ghi nhớ:
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                Chữ Hán — Pinyin — Tiếng Việt
              </span>
            </div>

            {/* Prominent single-line format: chữ hán - pinyin - tiếng việt */}
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-slate-900 text-center shadow-xs">
              <span className="text-rose-700 font-hanzi font-bold text-xl sm:text-2xl mr-2 tracking-wide">
                {answerDetails.hanzi}
              </span>
              <span className="text-slate-400 font-bold mx-1.5">—</span>
              <span className="text-amber-800 font-sans font-semibold text-base sm:text-lg mr-2">
                [{answerDetails.pinyin}]
              </span>
              <span className="text-slate-400 font-bold mx-1.5">—</span>
              <span className="text-emerald-700 font-sans font-extrabold text-base sm:text-lg">
                {answerDetails.vietnamese}
              </span>
            </div>

            {/* Quick structured tags */}
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold border border-rose-200">
                Chữ Hán: <strong className="font-hanzi text-sm text-rose-600">{answerDetails.hanzi}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-medium border border-amber-200">
                Pinyin: <strong>{answerDetails.pinyin}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-bold border border-emerald-200">
                Nghĩa: <strong>{answerDetails.vietnamese}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Interactive Interaction Area (Bắt buộc tương tác: nhập hoặc bấm "Đồng ý") */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-3">
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
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-red-500 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Đồng ý</span>
            </button>
          </div>
        </form>

        {/* Toggle switch inside Modal to turn off roast mode immediately */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={isRoastActive}
              onChange={(e) => handleToggleRoast(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
            />
            <span className="text-slate-600 group-hover:text-slate-900 transition">
              Bật chế độ thông báo đá đểu khi làm sai
            </span>
          </label>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Ấn <strong>Enter</strong> để tiếp tục
          </span>
        </div>
      </div>
    </div>
  );
};

export const RoastModal = RoastNotification;
