'use client';

import React, { useState, useEffect } from 'react';
import { Dialogue } from '@/types/practice';
import { HSK_DIALOGUES } from '@/data/hsk-dialogues-data';
import { playChineseAudio } from '@/lib/quiz-utils';
import {
  BookOpen,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export const ReadingSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [showPinyin, setShowPinyin] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);
  const [userTranslation, setUserTranslation] = useState<string>('');
  const [playingLineIdx, setPlayingLineIdx] = useState<number | null>(null);

  // Comprehension quizzes
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Completed dialogues stored in localStorage
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const currentDialogue =
    HSK_DIALOGUES.find((d) => d.id === selectedId) || HSK_DIALOGUES[0];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hsk_reading_completed');
      if (stored) setCompletedIds(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // When changing dialogue, reset local states
  const handleSelectDialogue = (id: number) => {
    setSelectedId(id);
    setShowPinyin(false);
    setShowReference(false);
    setUserTranslation('');
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const handlePlayLine = async (text: string, idx: number) => {
    setPlayingLineIdx(idx);
    await playChineseAudio(text);
    setPlayingLineIdx(null);
  };

  const toggleCompleted = (id: number) => {
    let next: number[];
    if (completedIds.includes(id)) {
      next = completedIds.filter((item) => item !== id);
    } else {
      next = [...completedIds, id];
    }
    setCompletedIds(next);
    try {
      localStorage.setItem('hsk_reading_completed', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Luyện Đọc Hiểu & Đối Chiếu Bản Dịch
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Luyện Đọc — Dịch Hội Thoại
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Đọc đoạn hội thoại tiếng Trung thực tế, tự viết bản dịch tiếng Việt và đối chiếu với bản dịch chuẩn.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl font-medium self-start md:self-auto">
            Tiến độ hoàn thành: <strong className="text-rose-600 font-bold">{completedIds.length}</strong> /{' '}
            {HSK_DIALOGUES.length} bài
          </div>
        </div>

        {/* Dialogue Selector Carousel / Grid */}
        <div className="mt-5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
            Chọn bài hội thoại ({HSK_DIALOGUES.length} bài):
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {HSK_DIALOGUES.map((d) => {
              const isSelected = d.id === selectedId;
              const isDone = completedIds.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelectDialogue(d.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-500 text-white shadow-xs'
                      : isDone
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-white text-rose-600' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {d.id}
                  </span>
                  <span>{d.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {d.level.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dialogue Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dialogue & Audio (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 mr-2">
                  Bài {currentDialogue.id}: {currentDialogue.level.toUpperCase()}
                </span>
                <span className="text-xs text-stone-400 font-medium">{currentDialogue.category}</span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">{currentDialogue.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{currentDialogue.description}</p>
              </div>

              {/* Pinyin Toggle */}
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                  showPinyin
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'
                }`}
              >
                {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {showPinyin ? 'Ẩn Pinyin' : 'Hiện Pinyin'}
              </button>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-4">
              {currentDialogue.lines.map((line, idx) => {
                const isA = line.speaker === 'A' || idx % 2 === 0;
                const isPlaying = playingLineIdx === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${isA ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Speaker Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isA
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {line.speaker}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 border transition-all ${
                        isA
                          ? 'bg-stone-50 border-stone-200/80 rounded-tl-sm text-stone-900'
                          : 'bg-rose-50/50 border-rose-100 rounded-tr-sm text-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-xs font-semibold text-stone-400">
                          Người nói {line.speaker}
                        </span>
                        <button
                          onClick={() => handlePlayLine(line.chinese, idx)}
                          className={`p-1 rounded-md transition-colors ${
                            isPlaying
                              ? 'text-white bg-rose-500 animate-pulse'
                              : 'text-stone-400 hover:text-rose-600 hover:bg-stone-200/50'
                          }`}
                          title="Nghe câu này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-base sm:text-lg font-bold text-stone-900 tracking-wide font-sans">
                        {line.chinese}
                      </div>

                      {showPinyin && (
                        <div className="text-xs text-rose-600 font-medium mt-1">
                          {line.pinyin}
                        </div>
                      )}

                      {showReference && (
                        <div className="text-xs text-stone-600 font-medium mt-2 pt-2 border-t border-stone-200/60">
                          {line.vietnamese}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grammar & Vocab Box */}
            <div className="mt-6 pt-5 border-t border-stone-100 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Từ vựng quan trọng:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentDialogue.keyVocab.map((v, i) => (
                    <span
                      key={i}
                      className="bg-stone-100 border border-stone-200/60 text-stone-800 px-2.5 py-1 rounded-lg text-xs"
                    >
                      <strong className="text-rose-600">{v.word}</strong> ({v.pinyin}): {v.meaning}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Điểm ngữ pháp cần lưu ý:
                </h4>
                <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                  {currentDialogue.grammarNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Self-translation Workspace & Quizzes (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* User Translation Box */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <h4 className="text-sm font-bold text-stone-900 mb-1 flex items-center justify-between">
              <span>Bản dịch của bạn</span>
              <span className="text-[11px] text-stone-400 font-normal">Tự gõ để rèn kỹ năng dịch</span>
            </h4>
            <p className="text-xs text-stone-500 mb-3">
              Hãy đọc đoạn tiếng Trung bên cạnh và tự dịch từng câu sang tiếng Việt vào khung dưới đây:
            </p>

            <textarea
              rows={5}
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              placeholder="Nhập bản dịch tiếng Việt của bạn ở đây..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-y text-stone-800"
            />

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => setShowReference(!showReference)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  showReference
                    ? 'border-amber-300 bg-amber-50 text-amber-800'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                {showReference ? 'Ẩn bản dịch tham khảo' : 'Hiện bản dịch tham khảo'}
              </button>

              <button
                onClick={() => toggleCompleted(currentDialogue.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                  completedIds.includes(currentDialogue.id)
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completedIds.includes(currentDialogue.id) ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
              </button>
            </div>

            {/* Reference Translation Card */}
            {showReference && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-2">
                <div className="font-bold text-amber-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Bản dịch chuẩn tham khảo (tự đối chiếu):
                </div>
                <div className="space-y-1.5 text-stone-700 font-medium">
                  {currentDialogue.lines.map((l, i) => (
                    <div key={i}>
                      <span className="font-bold text-amber-900">{l.speaker}:</span> {l.vietnamese}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reading Comprehension Quizzes */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <h4 className="text-sm font-bold text-stone-900 mb-1">
              Câu hỏi đọc hiểu ({currentDialogue.quizzes.length} câu)
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Kiểm tra mức độ hiểu thông tin trong bài hội thoại:
            </p>

            <div className="space-y-5">
              {currentDialogue.quizzes.map((quiz, qIdx) => {
                const selected = quizAnswers[qIdx];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === quiz.correctAnswer;

                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                    <div className="text-xs font-bold text-stone-900 mb-2">
                      Câu {qIdx + 1}: {quiz.question}
                    </div>

                    <div className="space-y-1.5">
                      {quiz.options.map((opt, oIdx) => {
                        const isThisSelected = selected === opt;
                        let optStyle = 'border-stone-200 bg-white text-stone-700 hover:border-stone-300';

                        if (showQuizResults) {
                          if (opt === quiz.correctAnswer) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                          } else if (isThisSelected) {
                            optStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-semibold';
                          } else {
                            optStyle = 'border-stone-100 bg-white text-stone-400 opacity-60';
                          }
                        } else if (isThisSelected) {
                          optStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-semibold';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (!showQuizResults) {
                                setQuizAnswers({ ...quizAnswers, [qIdx]: opt });
                              }
                            }}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {showQuizResults && opt === quiz.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-2 shrink-0" />
                            )}
                            {showQuizResults && isThisSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-500 ml-2 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="mt-2.5 pt-2 border-t border-stone-200 text-[11px] text-stone-600">
                        <strong>Giải thích: </strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowQuizResults(!showQuizResults)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                {showQuizResults ? 'Làm lại câu hỏi' : 'Kiểm tra đáp án'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
