'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { QuizQuestion, UserAnswerRecord } from '@/types/quiz';
import { Volume2, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { playChineseAudio, shuffleArray } from '@/lib/quiz-utils';

interface QuizCardProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: UserAnswerRecord;
  onSelectAnswer: (selectedOption: string) => void;
  onRetryQuestion?: (questionId: number) => void;
  onPrevQuestion?: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  onSelectAnswer,
  onRetryQuestion,
  onPrevQuestion,
  onNextQuestion,
  isLastQuestion,
}) => {
  // Memoize shuffled options based on question.id
  const displayOptions = useMemo(() => {
    return shuffleArray(question.options);
  }, [question.id]);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    playChineseAudio(question.hanzi);
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys navigation
      if (e.key === 'ArrowLeft' && onPrevQuestion && questionIndex > 0) {
        e.preventDefault();
        onPrevQuestion();
        return;
      }
      if (e.key === 'ArrowRight' && userAnswer) {
        e.preventDefault();
        onNextQuestion();
        return;
      }

      if (e.key === 'Enter') {
        if (userAnswer) {
          e.preventDefault();
          onNextQuestion();
          return;
        }
      }

      const keyMap: Record<string, number> = {
        '1': 0, 'a': 0, 'A': 0,
        '2': 1, 'b': 1, 'B': 1,
        '3': 2, 'c': 2, 'C': 2,
        '4': 3, 'd': 3, 'D': 3,
      };

      if (e.key in keyMap) {
        const optionIdx = keyMap[e.key];
        if (optionIdx >= 0 && optionIdx < displayOptions.length) {
          e.preventDefault();
          onSelectAnswer(displayOptions[optionIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userAnswer, displayOptions, onSelectAnswer, onNextQuestion, onPrevQuestion, questionIndex]);

  const hasAnswered = !!userAnswer;
  const isCorrect = userAnswer?.isCorrect;

  const correctLetter = useMemo(() => {
    const idx = displayOptions.indexOf(question.correctAnswer);
    return idx >= 0 ? OPTION_PREFIXES[idx] : '';
  }, [displayOptions, question.correctAnswer]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6">
      <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-300">
        
        {/* Top Header inside card */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-medium">
          <span className="font-semibold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">
            Câu {questionIndex + 1} / {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            {hasAnswered && onRetryQuestion && (
              <button
                onClick={() => onRetryQuestion(question.id)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full transition"
                title="Làm lại câu này từ đầu"
              >
                <RotateCcw className="w-3 h-3 text-amber-600" />
                <span className="text-amber-800 font-medium">Chọn lại</span>
              </button>
            )}
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition px-2.5 py-1 rounded-full hover:bg-slate-50"
              title="Nghe phát âm"
              aria-label="Phát âm chữ Hán"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-rose-600 animate-bounce' : ''}`} />
              <span className="text-xs">Phát âm</span>
            </button>
          </div>
        </div>

        {/* Question Prominent Hanzi & Pinyin */}
        <div className="px-6 py-4 text-center">
          <div className="relative inline-block mb-1 group">
            <h2
              className="font-hanzi font-bold text-slate-900 tracking-normal transition-transform select-none"
              style={{ fontSize: 'clamp(52px, 12vw, 76px)', lineHeight: '1.15' }}
            >
              {question.hanzi}
            </h2>
            <button
              onClick={handlePlayAudio}
              className="absolute -right-7 top-2 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-rose-600"
              aria-label="Nghe đọc chữ Hán"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-xl sm:text-2xl font-medium text-slate-500 tracking-wide mb-1 select-none">
            {question.pinyin}
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            {hasAnswered ? 'Bạn có thể bấm chọn lại đáp án khác nếu muốn' : 'Chọn nghĩa đúng của từ trên'}
          </p>
        </div>

        {/* Options list */}
        <div className="px-4 sm:px-6 pb-6 pt-2 space-y-3" role="radiogroup" aria-label="Các lựa chọn đáp án">
          {displayOptions.map((opt, idx) => {
            const letter = OPTION_PREFIXES[idx];
            const isThisSelected = userAnswer?.selectedAnswer === opt;
            const isThisCorrect = opt === question.correctAnswer;

            let buttonStyles = "border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/30 text-slate-800";
            let badgeStyles = "bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700";

            if (hasAnswered) {
              if (isThisCorrect) {
                buttonStyles = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/50";
                badgeStyles = "bg-emerald-600 text-white";
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyles = "border-rose-400 bg-rose-50/90 text-rose-950 ring-2 ring-rose-400/40 line-through opacity-90";
                badgeStyles = "bg-rose-600 text-white";
              } else {
                buttonStyles = "border-slate-200/70 bg-slate-50/60 hover:bg-rose-50/40 text-slate-600";
                badgeStyles = "bg-slate-100 text-slate-500";
              }
            }

            return (
              <button
                key={opt}
                onClick={() => onSelectAnswer(opt)}
                aria-label={`Đáp án ${letter}: ${opt}`}
                className={`group w-full min-h-[58px] sm:min-h-[64px] px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border-2 text-left flex items-center justify-between gap-3 text-base sm:text-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-rose-400 ${buttonStyles}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition ${badgeStyles}`}
                  >
                    {letter}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </div>

                {hasAnswered && (
                  <div className="shrink-0">
                    {isThisCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pop-in" />
                    )}
                    {isThisSelected && !isThisCorrect && (
                      <XCircle className="w-6 h-6 text-rose-600 animate-pop-in" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section (Shown after answering) */}
        {hasAnswered && (
          <div className="px-4 sm:px-6 pb-6 pt-0 animate-pop-in">
            <div
              className={`rounded-2xl p-4 sm:p-5 border ${
                isCorrect
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/90 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {isCorrect ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                      ✗
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="font-bold text-base sm:text-lg">
                    {isCorrect ? 'Chính xác!' : 'Chưa đúng'}
                  </div>

                  {!isCorrect && (
                    <div className="text-sm font-semibold text-rose-700">
                      Đáp án đúng: <span className="font-extrabold text-slate-900">{correctLetter}</span> ({question.correctAnswer})
                    </div>
                  )}

                  <div className="text-sm sm:text-base font-medium text-slate-800">
                    <span className="font-hanzi font-bold text-slate-900">{question.hanzi}</span> ({question.pinyin}) = {question.correctAnswer}
                  </div>

                  {question.explanation && (
                    <div className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed border-t border-slate-200/50 mt-1">
                      💡 {question.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation buttons: Prev Question & Next Question */}
            <div className="mt-4 pt-1 flex items-center justify-between gap-3">
              {onPrevQuestion && questionIndex > 0 ? (
                <button
                  onClick={onPrevQuestion}
                  className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-sm sm:text-base flex items-center gap-1.5 transition active:scale-[0.98]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>
              ) : <div />}

              <button
                onClick={onNextQuestion}
                autoFocus
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-[0.98]"
              >
                <span>{isLastQuestion ? 'Xem kết quả 🎉' : 'Câu tiếp theo →'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
