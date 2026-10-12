'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, CheckCircle, HelpCircle, Sparkles, RotateCcw, ArrowRight, Shuffle, Layers, Check, Flame } from 'lucide-react';
import { QuizLevel } from '@/types/quiz';
import { HSK1_LESSON_INFO, HSK2_LESSON_INFO } from '@/data/lesson-info';
import { useRoastMode } from '@/hooks/useRoastMode';
import { getSavedLessonPreferences, saveLessonPreferences } from '@/lib/quizPreferences';

interface StartScreenProps {
  currentLevel: QuizLevel;
  onChangeLevel: (level: QuizLevel) => void;
  onStartQuiz: (options?: { selectedLessons?: number[]; shuffle?: boolean }) => void;
  onResumeQuiz?: () => void;
  onResetQuiz: () => void;
  hasSavedProgress: boolean;
  savedIndex: number;
  savedScore: number;
  totalQuestions: number;
  round?: number;
}

const LEVEL_CONFIGS: Record<QuizLevel, { title: string; count: number; desc: string; totalLessons: number }> = {
  hsk1: { title: 'HSK 1', count: 150, desc: '150 từ vựng căn bản HSK 1', totalLessons: 15 },
  hsk2: { title: 'HSK 2', count: 150, desc: '150 từ vựng nâng cao HSK 2', totalLessons: 15 },
  all: { title: 'HSK 1 + 2', count: 300, desc: 'Trọn bộ 300 từ vựng HSK 1 & 2', totalLessons: 30 },
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
  const currentConfig = LEVEL_CONFIGS[currentLevel];
  const { isRoastEnabled, toggleRoast } = useRoastMode();
  const [scopeMode, setScopeMode] = useState<'all' | 'custom'>('all');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);

  // Restore saved lesson preferences whenever level changes or on mount
  useEffect(() => {
    const saved = getSavedLessonPreferences(currentLevel);
    const validLessons = saved.selectedLessons.filter(l => l <= currentConfig.totalLessons);
    if (saved.scopeMode === 'custom' && validLessons.length > 0) {
      setScopeMode('custom');
      setSelectedLessons(validLessons);
    } else {
      setScopeMode('all');
      setSelectedLessons([]);
    }
    setShuffleQuestions(saved.shuffle);
  }, [currentLevel, currentConfig.totalLessons]);

  const totalLessons = currentConfig.totalLessons;
  const lessonList = useMemo(() => {
    return Array.from({ length: totalLessons }, (_, i) => i + 1);
  }, [totalLessons]);

  const toggleLesson = (lessonId: number) => {
    setSelectedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId].sort((a, b) => a - b)
    );
  };

  const selectAllLessons = () => {
    setSelectedLessons([...lessonList]);
  };

  const deselectAllLessons = () => {
    setSelectedLessons([]);
  };

  const effectiveSelectedCount = scopeMode === 'all' ? totalLessons : selectedLessons.length;
  const effectiveQuestionCount = effectiveSelectedCount * 10;
  const isStartDisabled = scopeMode === 'custom' && selectedLessons.length === 0;

  const handleStart = () => {
    if (isStartDisabled) return;
    const lessonsToUse = scopeMode === 'custom' ? selectedLessons : undefined;
    saveLessonPreferences(currentLevel, {
      scopeMode,
      selectedLessons: scopeMode === 'custom' ? selectedLessons : [],
      shuffle: shuffleQuestions,
    });
    onStartQuiz({
      selectedLessons: lessonsToUse,
      shuffle: shuffleQuestions,
    });
  };

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
          Chọn cấp độ và phạm vi bài học bạn muốn kiểm tra
        </p>

        {/* 3 Level Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 bg-slate-100 rounded-2xl mb-6">
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

        {/* Lesson Range Selector */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900">
              <Layers className="w-4 h-4 text-rose-600" />
              <span>Phạm vi luyện tập theo bài:</span>
            </div>
            
            {/* Scope Toggle: All vs Custom */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setScopeMode('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  scopeMode === 'all'
                    ? 'bg-white text-rose-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả các bài ({totalLessons} bài)
              </button>
              <button
                onClick={() => {
                  setScopeMode('custom');
                  if (selectedLessons.length === 0) {
                    setSelectedLessons([1]); // Default select lesson 1 for ease of use
                  }
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  scopeMode === 'custom'
                    ? 'bg-white text-rose-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chọn bài cụ thể
              </button>
            </div>
          </div>

          {scopeMode === 'custom' ? (
            <div className="space-y-3 pt-2 border-t border-slate-200/60">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  Chọn 1, nhiều bài hoặc tất cả tùy ý (10 từ/bài):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={selectAllLessons}
                    className="text-rose-600 hover:underline font-semibold"
                  >
                    Chọn tất cả
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={deselectAllLessons}
                    className="text-slate-500 hover:underline"
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>

              {/* Lesson Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1.5 bg-slate-100/60 rounded-xl border border-slate-200">
                {lessonList.map(lessonNum => {
                  const isChecked = selectedLessons.includes(lessonNum);
                  
                  let label = `Bài ${lessonNum}`;
                  let title = '';
                  let viTitle = '';

                  if (currentLevel === 'hsk1') {
                    const info = HSK1_LESSON_INFO.find(l => l.lesson === lessonNum);
                    title = info?.title || '';
                    viTitle = info?.viTitle || '';
                  } else if (currentLevel === 'hsk2') {
                    const info = HSK2_LESSON_INFO.find(l => l.lesson === lessonNum);
                    title = info?.title || '';
                    viTitle = info?.viTitle || '';
                  } else {
                    if (lessonNum <= 15) {
                      const info = HSK1_LESSON_INFO.find(l => l.lesson === lessonNum);
                      label = `HSK1 · B.${lessonNum}`;
                      title = info?.title || '';
                      viTitle = info?.viTitle || '';
                    } else {
                      const info = HSK2_LESSON_INFO.find(l => l.lesson === lessonNum - 15);
                      label = `HSK2 · B.${lessonNum - 15}`;
                      title = info?.title || '';
                      viTitle = info?.viTitle || '';
                    }
                  }

                  return (
                    <button
                      key={lessonNum}
                      onClick={() => toggleLesson(lessonNum)}
                      type="button"
                      title={`${label}: ${title} (${viTitle})`}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all text-left ${
                        isChecked
                          ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col truncate mr-1.5 min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={isChecked ? 'text-rose-700 font-bold shrink-0' : 'text-slate-900 font-semibold shrink-0'}>
                            {label}:
                          </span>
                          <span className="text-rose-600 truncate font-medium">
                            {title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 truncate font-normal">
                          {viTitle}
                        </span>
                      </div>
                      {isChecked ? (
                        <Check className="w-4 h-4 text-rose-600 shrink-0 ml-1" />
                      ) : (
                        <span className="w-4 h-4 rounded border border-slate-300 shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedLessons.length === 0 ? (
                <div className="text-xs text-rose-600 font-semibold text-center pt-1">
                  ⚠️ Vui lòng chọn ít nhất 1 bài học để làm bài.
                </div>
              ) : (
                <div className="text-xs text-slate-600 font-medium text-right pt-1">
                  Đã chọn: <span className="font-bold text-rose-600">{selectedLessons.length} bài</span> ({effectiveQuestionCount} câu hỏi)
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60">
              Đang chọn toàn bộ <span className="font-bold text-slate-700">{totalLessons} bài học</span> ({currentConfig.count} từ vựng chuẩn {currentConfig.title}).
            </div>
          )}
        </div>

        {/* Question Shuffle Toggle Option */}
        <div className="mb-6 p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-left flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <Shuffle className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                Xáo trộn thứ tự câu hỏi ngẫu nhiên
                <span className="text-[10px] uppercase font-bold tracking-wide bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                  Khuyên dùng
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Câu hỏi sẽ xuất hiện ngẫu nhiên thay vì xếp theo thứ tự bảng chữ cái Pinyin (A → Z)
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={shuffleQuestions}
              onChange={(e) => setShuffleQuestions(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
          </label>
        </div>

        {/* Roast Mode Toggle Option */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-left flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                Chế độ thông báo đá đểu khi làm sai
                <span className={`text-[10px] uppercase font-bold tracking-wide px-1.5 py-0.5 rounded ${
                  isRoastEnabled ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isRoastEnabled ? 'Đang bật' : 'Đang tắt'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Bật cửa sổ Modal trêu đùa hài hước và hiện chuẩn đáp án (Chữ Hán — Pinyin — Tiếng Việt) khi chọn sai
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isRoastEnabled}
              onChange={(e) => toggleRoast(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
          </label>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">
                {scopeMode === 'custom' ? `${effectiveQuestionCount} câu hỏi` : `${totalQuestions} câu hỏi`}
              </div>
              <div className="text-xs text-slate-500">
                {scopeMode === 'custom' ? `${selectedLessons.length} bài đã chọn` : currentConfig.desc}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">4 đáp án ngẫu nhiên</div>
              <div className="text-xs text-slate-500">Hiển thị đầy đủ mọi nghĩa của từ</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Chấm điểm & Ôn câu sai</div>
              <div className="text-xs text-slate-500">Dồn câu sai ôn vòng lặp 100%</div>
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
                Tiến độ dở dang ({currentConfig.title})
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
                onClick={handleStart}
                disabled={isStartDisabled}
                className={`w-full py-3 px-6 rounded-2xl text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition ${
                  isStartDisabled
                    ? 'bg-slate-100 opacity-50 cursor-not-allowed'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Bắt đầu lượt thi mới</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleStart}
                disabled={isStartDisabled}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                  isStartDisabled
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-rose-600/30'
                }`}
              >
                <span>
                  Bắt đầu làm bài {currentConfig.title}
                  {scopeMode === 'custom' && selectedLessons.length > 0
                    ? ` (${selectedLessons.length} bài · ${effectiveQuestionCount} câu)`
                    : ''}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onResetQuiz}
                className="w-full py-2.5 px-6 rounded-2xl text-slate-500 hover:text-slate-800 text-sm font-medium transition"
              >
                Đặt lại mặc định
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-slate-400">
          Tip: Bạn có thể bấm <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border">→</kbd> để chuyển câu hoặc bấm icon <b>Danh sách câu</b> để nhảy tới câu bất kỳ và xem lại đáp án!
        </div>

      </div>
    </div>
  );
};
