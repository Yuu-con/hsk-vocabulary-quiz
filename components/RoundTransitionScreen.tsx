'use client';

import React from 'react';
import { RotateCcw, ArrowRight, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface RoundTransitionScreenProps {
  currentRound: number;
  totalInRound: number;
  wrongCount: number;
  onStartNextRound: () => void;
  onRestartAll: () => void;
}

export const RoundTransitionScreen: React.FC<RoundTransitionScreenProps> = ({
  currentRound,
  totalInRound,
  wrongCount,
  onStartNextRound,
  onRestartAll,
}) => {
  const correctCount = totalInRound - wrongCount;
  const accuracy = totalInRound > 0 ? ((correctCount / totalInRound) * 100).toFixed(0) : '0';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold mb-3 border border-amber-200">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Hoàn thành Vòng {currentRound}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Chuẩn bị ôn lại câu sai
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-medium mb-6 max-w-md mx-auto">
          Bạn vừa hoàn thành toàn bộ câu hỏi của Vòng {currentRound}. Hãy tập trung làm lại những câu chưa đúng ở vòng tiếp theo!
        </p>

        {/* Stats card */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
            <div className="text-xs text-slate-500 font-medium mb-1">Đã làm</div>
            <div className="text-2xl font-bold text-slate-800 font-mono">{totalInRound}</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-center">
            <div className="text-xs text-emerald-700 font-medium mb-1">Đúng</div>
            <div className="text-2xl font-bold text-emerald-600 font-mono">{correctCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/60 text-center">
            <div className="text-xs text-rose-700 font-medium mb-1">Chưa đúng</div>
            <div className="text-2xl font-bold text-rose-600 font-mono">{wrongCount}</div>
          </div>
        </div>

        {/* Notification Box */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-amber-950">
              Quy tắc Chinh phục 100% từ vựng
            </div>
            <div className="text-xs text-amber-800 leading-relaxed mt-0.5">
              Hệ thống sẽ lọc ra đúng <b>{wrongCount} câu chưa đúng</b> để bạn làm lại ở <b>Vòng {currentRound + 1}</b>. Vòng lặp sẽ tiếp tục cho đến khi bạn trả lời đúng hết tất cả các câu!
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={onStartNextRound}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <span>Bắt đầu Vòng {currentRound + 1}: Ôn lại {wrongCount} câu sai</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onRestartAll}
            className="w-full py-3 px-6 rounded-2xl text-slate-500 hover:text-slate-800 text-sm font-medium transition"
          >
            Bắt đầu lại từ đầu (Khởi động lại Vòng 1)
          </button>
        </div>

      </div>
    </div>
  );
};
