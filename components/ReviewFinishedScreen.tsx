'use client';

import React from 'react';
import { RotateCcw, Award, ArrowLeft } from 'lucide-react';

interface ReviewFinishedScreenProps {
  reviewedCount: number;
  reviewScore: number;
  onReturnToResults: () => void;
  onRestartAll: () => void;
}

export const ReviewFinishedScreen: React.FC<ReviewFinishedScreenProps> = ({
  reviewedCount,
  reviewScore,
  onReturnToResults,
  onRestartAll,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Hoàn thành ôn tập!
        </h1>

        <p className="text-base sm:text-lg text-slate-700 font-semibold mb-6">
          Bạn đã ôn lại <span className="text-amber-600 font-bold">{reviewedCount}</span> câu sai.
        </p>

        {/* Review score box */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-8 max-w-sm mx-auto">
          <div className="text-xs uppercase font-bold text-amber-800 tracking-wider mb-1">
            Kết quả ôn tập
          </div>
          <div className="text-4xl font-black text-slate-900 font-mono">
            {reviewScore} <span className="text-xl text-slate-400 font-normal">/ {reviewedCount}</span>
          </div>
          <div className="text-xs text-amber-700 mt-1">
            Đúng {reviewScore} trên tổng số {reviewedCount} câu cần ôn
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onReturnToResults}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Xem lại kết quả tổng quan 150 câu</span>
          </button>

          <button
            onClick={onRestartAll}
            className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại từ đầu (150 câu)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
