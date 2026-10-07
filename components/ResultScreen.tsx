'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { QuizLevel } from '@/types/quiz';

interface ResultScreenProps {
  level: QuizLevel;
  totalQuestions: number;
  initialScore: number;
  totalRounds: number;
  onRestart: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  level,
  totalQuestions,
  initialScore,
  totalRounds,
  onRestart,
  onGoHome,
}) => {
  const initialPercentage =
    totalQuestions > 0 ? ((initialScore / totalQuestions) * 100).toFixed(1) : '100';

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
      });
    } catch (e) {}
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        {/* Trophy Icon */}
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Tuyệt vời! Chinh phục 100%!
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-medium mb-6">
          Bạn đã ghi nhớ và trả lời chính xác toàn bộ <b>{totalQuestions} từ vựng</b> cấp độ {level.toUpperCase()}!
        </p>

        {/* 100% Mastery Banner */}
        <div className="rounded-3xl p-6 sm:p-8 mb-8 bg-emerald-50 border-2 border-emerald-300">
          <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-1">
            Độ thành thạo hiện tại
          </div>
          <div className="text-5xl sm:text-6xl font-black text-emerald-600 tracking-tight mb-2 font-mono">
            100%
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-700 font-bold text-sm shadow-sm border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đã làm đúng tất cả {totalQuestions}/{totalQuestions} câu</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
            <div className="text-xs text-slate-500 font-medium mb-1">Điểm vòng đầu (Vòng 1)</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 font-mono">
              {initialScore} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">{initialPercentage}% chính xác</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
            <div className="text-xs text-slate-500 font-medium mb-1">Số vòng đã vượt qua</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 font-mono">
              {totalRounds} <span className="text-sm font-normal text-slate-400">vòng</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Đến khi đúng 100%</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-center col-span-2 sm:col-span-1">
            <div className="text-xs text-amber-800 font-medium mb-1">Đánh giá chung</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              {totalRounds === 1 ? 'Xuất sắc ⭐' : 'Kiên trì 🏆'}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Đã làm chủ kiến thức</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Làm lại từ đầu bài kiểm tra</span>
          </button>

          <button
            onClick={onGoHome}
            className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base transition"
          >
            Đổi sang cấp độ khác
          </button>
        </div>

      </div>
    </div>
  );
};
