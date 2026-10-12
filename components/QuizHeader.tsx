'use client';

import React from 'react';
import { RotateCcw, Home, LayoutGrid, Shield, Flame } from 'lucide-react';
import { QuizLevel } from '@/types/quiz';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRoastMode } from '@/hooks/useRoastMode';

interface QuizHeaderProps {
  level: QuizLevel;
  round: number;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  answeredCount: number;
  onReset: () => void;
  onGoHome?: () => void;
  onOpenNavigator?: () => void;
  onOpenAdminModal?: () => void;
}

const LEVEL_LABELS: Record<QuizLevel, string> = {
  hsk1: 'HSK 1 · 163 câu',
  hsk2: 'HSK 2 · 165 câu',
  all: 'HSK 1 & 2 · 328 câu',
  compound: 'Cụm câu ghép · 77 câu',
};

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  level,
  round,
  currentIndex,
  totalQuestions,
  score,
  answeredCount,
  onReset,
  onGoHome,
  onOpenNavigator,
  onOpenAdminModal,
}) => {
  const { isAdmin } = useAdminAuth();
  const { isRoastEnabled, toggleRoast } = useRoastMode();
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
                <span>🇨🇳</span> HSK Quiz
                {round > 1 ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    Vòng {round} (Ôn câu sai)
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    {level.toUpperCase()}
                  </span>
                )}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {round > 1 ? `Làm lại ${totalQuestions} câu chưa đúng của vòng trước` : LEVEL_LABELS[level]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleRoast()}
              title={isRoastEnabled ? "Chế độ đá đểu: Đang BẬT (bấm để tắt)" : "Chế độ đá đểu: Đang TẮT (bấm để bật)"}
              aria-label="Bật tắt chế độ đá đểu"
              className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg border transition ${
                isRoastEnabled
                  ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${isRoastEnabled ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Đá đểu: {isRoastEnabled ? 'Bật' : 'Tắt'}</span>
            </button>

            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                title={isAdmin ? "Quản trị viên (Đang đăng nhập)" : "Đăng nhập Quản trị viên"}
                aria-label="Quản trị viên"
                className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition ${
                  isAdmin
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Admin'}</span>
              </button>
            )}

            {onOpenNavigator && (
              <button
                onClick={onOpenNavigator}
                title="Bảng danh sách câu hỏi"
                aria-label="Mở danh sách câu hỏi"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Danh sách</span>
              </button>
            )}

            <button
              onClick={onReset}
              title="Làm lại từ đầu"
              aria-label="Làm lại từ đầu"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Làm lại</span>
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
            {round === 1 ? 'Đúng' : 'Vòng này'}: <span className="text-rose-600 font-bold">{score}</span> / {answeredCount}
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
              round > 1 
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
