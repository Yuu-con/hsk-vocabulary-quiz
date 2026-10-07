'use client';

import React from 'react';
import { RotateCcw, Home, Sparkles } from 'lucide-react';

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  answeredCount: number;
  isReviewMode?: boolean;
  onReset: () => void;
  onGoHome?: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentIndex,
  totalQuestions,
  score,
  answeredCount,
  isReviewMode = false,
  onReset,
  onGoHome,
}) => {
  const currentQuestionNumber = Math.min(currentIndex + 1, totalQuestions);
  const progressPercent = totalQuestions > 0 ? (currentQuestionNumber / totalQuestions) * 100 : 0;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-2xl mx-auto px-4 py-3 sm:px-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {onGoHome && (
              <button
                onClick={onGoHome}
                title="Về trang chủ"
                aria-label="Về trang chủ"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>🇨🇳</span> HSK 1 Vocabulary Quiz
                {isReviewMode && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    Ôn câu sai
                  </span>
                )}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {isReviewMode ? 'Chế độ ôn tập từ vựng làm sai' : 'HSK 1 · 150 từ · HSK 2.0'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onReset}
              title="Làm lại từ đầu"
              aria-label="Làm lại từ đầu"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bắt đầu lại</span>
            </button>
          </div>
        </div>

        {/* Progress & Realtime Score row */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-800">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Câu {currentQuestionNumber} / {totalQuestions}
          </span>
          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
            Điểm: <span className="text-rose-600 font-bold">{score}</span> / {answeredCount}
          </span>
        </div>

        {/* Progress bar */}
        <div 
          className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60"
          role="progressbar"
          aria-valuenow={currentQuestionNumber}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <div
            className={`h-full transition-all duration-300 ease-out rounded-full ${
              isReviewMode 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                : 'bg-gradient-to-r from-rose-500 via-rose-600 to-red-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
