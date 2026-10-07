'use client';

import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { QuizLevel } from '@/types/quiz';

interface StartScreenProps {
  currentLevel: QuizLevel;
  onChangeLevel: (level: QuizLevel) => void;
  onStartQuiz: () => void;
  onResumeQuiz?: () => void;
  onResetQuiz: () => void;
  hasSavedProgress: boolean;
  savedIndex: number;
  savedScore: number;
  totalQuestions: number;
}

const LEVEL_CONFIGS: Record<QuizLevel, { title: string; count: number; desc: string }> = {
  hsk1: { title: 'HSK 1', count: 150, desc: '150 từ vựng căn bản HSK 1' },
  hsk2: { title: 'HSK 2', count: 150, desc: '150 từ vựng nâng cao HSK 2' },
  all: { title: 'HSK 1 + 2', count: 300, desc: 'Trọn bộ 300 từ vựng HSK 1 & 2' },
};

export const StartScreen: React.FC<StartScreenProps> = ({
  currentLevel,
  onChangeLevel,
  onStartQuiz,
  onResumeQuiz,
  onResetQuiz,
  hasSavedProgress,
  savedIndex,
  savedScore,
  totalQuestions,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 animate-pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden p-6 sm:p-10 text-center">
        
        {/* Flag & Title Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs sm:text-sm font-semibold mb-4 border border-rose-200/60">
          <span>🇨🇳</span> HSK Vocabulary Quiz · Chuẩn HSK 2.0
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Luyện Thi Từ Vựng HSK
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-medium mb-6">
          Chọn cấp độ bạn muốn kiểm tra và ôn tập
        </p>

        {/* 3 Level Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 bg-slate-100 rounded-2xl mb-8">
          {(['hsk1', 'hsk2', 'all'] as QuizLevel[]).map(lvl => {
            const config = LEVEL_CONFIGS[lvl];
            const isSelected = currentLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => onChangeLevel(lvl)}
                className={`py-3 px-2 rounded-xl text-center transition-all ${
                  isSelected
                    ? 'bg-white text-rose-600 font-bold shadow-md shadow-slate-200 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="text-sm sm:text-base">{config.title}</div>
                <div className="text-[11px] text-slate-400 font-normal">
                  {config.count} từ
                </div>
              </button>
            );
          })}
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">{totalQuestions} câu hỏi</div>
              <div className="text-xs text-slate-500">{LEVEL_CONFIGS[currentLevel].desc}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">4 đáp án ngẫu nhiên</div>
              <div className="text-xs text-slate-500">Tự do chọn lại đáp án đã làm</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Chấm điểm & Ôn câu sai</div>
              <div className="text-xs text-slate-500">Xem danh sách và làm lại câu sai</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Giải thích & Âm thanh</div>
              <div className="text-xs text-slate-500">Phát âm chuẩn kèm mẹo ghi nhớ</div>
            </div>
          </div>
        </div>

        {/* Existing progress notification banner */}
        {hasSavedProgress && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-left flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-amber-900">
                Tiến độ dở dang ({LEVEL_CONFIGS[currentLevel].title})
              </div>
              <div className="text-xs text-amber-700">
                Đang ở câu {savedIndex + 1}/{totalQuestions} · Điểm hiện tại: {savedScore}
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
                <span>Tiếp tục làm bài (Câu {savedIndex + 1}/{totalQuestions})</span>
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
                <span>Bắt đầu làm bài {LEVEL_CONFIGS[currentLevel].title}</span>
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
          Tip: Bạn có thể bấm <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">→</kbd> để chuyển câu hoặc bấm icon <b>Danh sách câu</b> để nhảy tới câu bất kỳ và chọn lại đáp án!
        </div>

      </div>
    </div>
  );
};
