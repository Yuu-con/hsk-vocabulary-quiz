'use client';

import React, { useState } from 'react';
import { QuizQuestion, UserAnswerRecord } from '@/types/quiz';
import { X, CheckCircle, XCircle, HelpCircle, Filter } from 'lucide-react';

interface QuestionNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<number, UserAnswerRecord>;
  wrongQuestionIds: number[];
  onSelectQuestion: (index: number) => void;
}

type FilterType = 'all' | 'wrong' | 'unanswered' | 'correct';

export const QuestionNavigatorModal: React.FC<QuestionNavigatorModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  answers,
  wrongQuestionIds,
  onSelectQuestion,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');

  if (!isOpen) return null;

  const filteredItems = questions.map((q, idx) => {
    const ans = answers[q.id];
    const isAnswered = !!ans;
    const isCorrect = ans?.isCorrect;
    const isWrong = isAnswered && !isCorrect;
    return { q, idx, isAnswered, isCorrect, isWrong };
  }).filter(item => {
    if (filter === 'wrong') return item.isWrong;
    if (filter === 'unanswered') return !item.isAnswered;
    if (filter === 'correct') return item.isCorrect;
    return true;
  });

  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const wrongCount = wrongQuestionIds.length;
  const unansweredCount = questions.length - Object.keys(answers).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-pop-in overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              Danh sách câu hỏi ({questions.length} câu)
            </h3>
            <p className="text-xs text-slate-500">
              Nhấn vào câu hỏi để xem lại hoặc làm lại đáp án
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Tất cả ({questions.length})
          </button>
          <button
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              filter === 'wrong'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            Câu sai ({wrongCount})
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              filter === 'unanswered'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Chưa làm ({unansweredCount})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            Đúng ({correctCount})
          </button>
        </div>

        {/* Question Grid */}
        <div className="p-5 overflow-y-auto flex-1 max-h-[50vh]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              Không có câu hỏi nào trong mục này
            </div>
          ) : (
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {filteredItems.map(item => {
                const isCurrent = item.idx === currentIndex;
                let bgStyles = "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200";

                if (item.isCorrect) {
                  bgStyles = "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold";
                } else if (item.isWrong) {
                  bgStyles = "bg-rose-100 text-rose-900 border-rose-300 font-bold";
                }

                if (isCurrent) {
                  bgStyles += " ring-2 ring-rose-500 ring-offset-2";
                }

                return (
                  <button
                    key={item.q.id}
                    onClick={() => {
                      onSelectQuestion(item.idx);
                      onClose();
                    }}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center text-xs transition active:scale-95 ${bgStyles}`}
                  >
                    <span className="font-semibold">{item.idx + 1}</span>
                    <span className="text-[10px] font-hanzi truncate max-w-[40px]">
                      {item.q.hanzi}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Đúng
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Sai
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Chưa làm
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
