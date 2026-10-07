'use client';

import React, { useEffect } from 'react';
import { getScoreTier } from '@/lib/quiz-utils';
import confetti from 'canvas-confetti';
import { RotateCcw, BookOpenCheck, ArrowRight, LayoutGrid } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  wrongCount: number;
  onRestart: () => void;
  onReviewWrongAnswers: () => void;
  onOpenNavigator?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  wrongCount,
  onRestart,
  onReviewWrongAnswers,
  onOpenNavigator,
}) => {
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(1) : '0';
  const tierInfo = getScoreTier(score, totalQuestions);
  const correctCount = score;

  // Trigger confetti for high scores (>= 75% score)
  useEffect(() => {
    if (totalQuestions > 0 && score / totalQuestions >= 0.75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  }, [score, totalQuestions]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        {/* Celebration Title */}
        <div className="text-4xl mb-2">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Hoàn thành!
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium mb-6">
          Bạn đã hoàn thành bài kiểm tra ({totalQuestions} câu hỏi)
        </p>

        {/* Score Card Box */}
        <div className={`rounded-3xl p-6 sm:p-8 mb-8 border-2 ${tierInfo.bgLight} ${tierInfo.borderColor}`}>
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Điểm của bạn
          </div>

          <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight mb-2 font-mono">
            {score} <span className="text-2xl sm:text-3xl text-slate-400 font-bold">/ {totalQuestions}</span>
          </div>

          <div className="text-xl sm:text-2xl font-extrabold text-rose-600 mb-3">
            {percentage}%
          </div>

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200/80 text-base sm:text-lg font-bold text-slate-800 mb-3">
            <span>{tierInfo.badge}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {tierInfo.feedback}
          </p>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
            <div className="text-xs text-slate-500 font-medium mb-1">Tổng số câu</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 font-mono">{totalQuestions}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-center">
            <div className="text-xs text-emerald-700 font-medium mb-1">Đúng</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-mono">{correctCount}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/60 text-center">
            <div className="text-xs text-rose-700 font-medium mb-1">Sai</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-600 font-mono">{wrongCount}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/60 text-center">
            <div className="text-xs text-blue-700 font-medium mb-1">Tỷ lệ</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">{percentage}%</div>
          </div>
        </div>

        {/* Review Mode Banner */}
        {wrongCount > 0 ? (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-rose-950">
                Bạn có {wrongCount} câu chưa chính xác
              </div>
              <div className="text-xs text-rose-800 leading-relaxed">
                Hãy bấm &quot;Ôn lại câu sai&quot; để làm lại và ghi nhớ chuẩn xác các từ này!
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-sm font-bold text-emerald-900">
            🎉 Tuyệt vời! Bạn không có câu nào sai.
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {wrongCount > 0 && (
            <button
              onClick={onReviewWrongAnswers}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <BookOpenCheck className="w-5 h-5" />
              <span>Ôn lại câu sai ({wrongCount} câu)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {onOpenNavigator && (
            <button
              onClick={onOpenNavigator}
              className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-base flex items-center justify-center gap-2 transition"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Xem bảng câu hỏi & sửa đáp án</span>
            </button>
          )}

          <button
            onClick={onRestart}
            className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại từ đầu</span>
          </button>
        </div>

      </div>
    </div>
  );
};
