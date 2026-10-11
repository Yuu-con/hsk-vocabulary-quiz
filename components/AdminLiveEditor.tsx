'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/types/quiz';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Pencil, Check, RotateCcw, X, Shield, Sparkles } from 'lucide-react';

interface AdminLiveEditorProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onUpdateAnswer: (newCorrectAnswer: string, newExplanation?: string) => void;
  onResetAnswer: () => void;
  isOverridden: boolean;
  onOpenLoginModal: () => void;
}

export const AdminLiveEditor: React.FC<AdminLiveEditorProps> = ({
  question,
  questionIndex,
  onUpdateAnswer,
  onResetAnswer,
  isOverridden,
  onOpenLoginModal,
}) => {
  const { isAdmin } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [editedMeaning, setEditedMeaning] = useState(question.correctAnswer);
  const [editedExplanation, setEditedExplanation] = useState(question.explanation || '');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync state when question changes
  useEffect(() => {
    setEditedMeaning(question.correctAnswer);
    setEditedExplanation(question.explanation || '');
  }, [question.id, question.correctAnswer, question.explanation]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedMeaning.trim()) return;

    onUpdateAnswer(editedMeaning.trim(), editedExplanation.trim());
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  const handleReset = () => {
    onResetAnswer();
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  // If not logged in as admin, show an unobtrusive Admin login pill at the bottom corner
  if (!isAdmin) {
    return (
      <aside 
        aria-label="Đăng nhập quản trị viên"
        className="fixed bottom-4 right-4 z-40 transition-all animate-pop-in"
      >
        <button
          onClick={onOpenLoginModal}
          title="Đăng nhập Admin để sửa đáp án trực tiếp"
          className="bg-slate-900/90 hover:bg-slate-950 text-white px-3.5 py-2 rounded-full shadow-lg border border-slate-700/80 flex items-center gap-2 text-xs font-semibold backdrop-blur-xs transition active:scale-95"
        >
          <Shield className="w-3.5 h-3.5 text-rose-400" />
          <span>Đăng nhập Admin</span>
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Công cụ chỉnh sửa đáp án Admin"
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 transition-all"
    >
      {/* Minimized Floating Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          title="Mở bảng sửa đáp án đúng"
          className="bg-slate-900 hover:bg-slate-950 text-white px-4 py-2.5 rounded-full shadow-xl shadow-slate-900/30 border border-slate-700/80 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Pencil className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
          <span>Sửa đáp án đúng (Admin)</span>
          {isOverridden && (
            <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-md font-mono border border-amber-500/40">
              Đã tùy biến
            </span>
          )}
        </button>
      ) : (
        /* Expanded Live Edit Panel */
        <div className="w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-900/30 border border-slate-200 overflow-hidden animate-pop-in">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <span>Sửa đáp án đúng</span>
                  <span className="text-[10px] bg-rose-500/30 text-rose-300 px-1.5 py-0.2 rounded font-normal">
                    Admin Live
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Câu {questionIndex + 1}: <b className="text-white font-hanzi">{question.hanzi}</b> [{question.pinyin}]
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Thu nhỏ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Toast Notification */}
          {showSuccessToast && (
            <div className="bg-emerald-500 text-white text-xs px-4 py-2 font-medium flex items-center gap-2 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Đã cập nhật nghĩa tiếng Việt thành công!</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="p-4 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>Nghĩa tiếng Việt (Đáp án đúng):</span>
                {isOverridden && (
                  <span className="text-[10px] text-amber-600 font-semibold">
                    (Đang dùng bản sửa)
                  </span>
                )}
              </label>
              <input
                type="text"
                value={editedMeaning}
                onChange={(e) => setEditedMeaning(e.target.value)}
                required
                placeholder="Nhập nghĩa tiếng Việt theo ý Admin..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
              <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                💡 Nghĩa này sẽ tự động thay thế đáp án đúng trong 4 phương án trắc nghiệm và lưu vĩnh viễn trên máy.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Giải thích chi tiết (tùy chọn):
              </label>
              <textarea
                value={editedExplanation}
                onChange={(e) => setEditedExplanation(e.target.value)}
                rows={2}
                placeholder="Ghi chú ngữ pháp hoặc ví dụ minh họa..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu & Cập nhật ngay</span>
              </button>

              {isOverridden && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Khôi phục lại nghĩa mặc định ban đầu"
                  className="py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Gốc</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-medium transition"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
};
