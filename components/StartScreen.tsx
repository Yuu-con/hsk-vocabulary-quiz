'use client';

import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Sparkles, Volume2, RotateCcw, ArrowRight } from 'lucide-react';

interface StartScreenProps {
  onStartQuiz: () => void;
  onResumeQuiz?: () => void;
  onResetQuiz: () => void;
  hasSavedProgress: boolean;
  savedIndex: number;
  savedScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartQuiz,
  onResumeQuiz,
  onResetQuiz,
  hasSavedProgress,
  savedIndex,
  savedScore,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        {/* Flag & Title Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs sm:text-sm font-semibold mb-4 border border-rose-200/60">
          <span>🇨🇳</span> HSK 1 · 150 từ · HSK 2.0
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          HSK 1 Vocabulary Quiz
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium mb-8">
          Luyện 150 từ vựng HSK 1 phiên bản 2.0
        </p>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">150 câu hỏi</div>
              <div className="text-xs text-slate-500">Đầy đủ 100% từ vựng HSK 1</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">4 đáp án mỗi câu</div>
              <div className="text-xs text-slate-500">Tự động xáo trộn vị trí A/B/C/D</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Chấm điểm ngay</div>
              <div className="text-xs text-slate-500">Phản hồi và cập nhật tức thì</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Có giải thích đáp án</div>
              <div className="text-xs text-slate-500">Mẹo nhớ và phát âm mẫu chuẩn</div>
            </div>
          </div>
        </div>

        {/* Existing progress notification banner */}
        {hasSavedProgress && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-left flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-amber-900">
                Bạn đang có bài làm dở dang!
              </div>
              <div className="text-xs text-amber-700">
                Đang ở câu {savedIndex + 1}/150 · Điểm hiện tại: {savedScore}
              </div>
            </div>
            <button
              onClick={onResetQuiz}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 underline underline-offset-2 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Xóa tiến độ
            </button>
          </div>
        )}

        {/* Actions Buttons */}
        <div className="space-y-3">
          {hasSavedProgress && onResumeQuiz ? (
            <>
              <button
                onClick={onResumeQuiz}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-lg shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Tiếp tục làm bài (Câu {savedIndex + 1}/150)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onResetQuiz}
                className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Bắt đầu lại từ đầu</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onStartQuiz}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-lg shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Bắt đầu làm bài</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onResetQuiz}
                className="w-full py-2.5 px-6 rounded-2xl text-slate-500 hover:text-slate-800 text-sm font-medium transition"
              >
                Bắt đầu lại từ đầu
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-slate-400">
          Tip: Bạn có thể dùng phím số <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">1</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">2</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">3</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">4</kbd> hoặc phím chữ <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">A</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">B</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">C</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">D</kbd> và <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">Enter</kbd> để làm bài nhanh hơn!
        </div>

      </div>
    </div>
  );
};
