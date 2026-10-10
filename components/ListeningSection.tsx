'use client';

import React, { useState, useEffect } from 'react';
import { Dialogue } from '@/types/practice';
import { HSK_DIALOGUES } from '@/data/hsk-dialogues-data';
import { playChineseAudio, stopChineseAudio } from '@/lib/quiz-utils';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  Gauge,
  HelpCircle,
} from 'lucide-react';

export const ListeningSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isPlayingFull, setIsPlayingFull] = useState<boolean>(false);
  const [playingLineIdx, setPlayingLineIdx] = useState<number | null>(null);

  // Default: hide Chinese, pinyin, and translation until revealed
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [userTranslation, setUserTranslation] = useState<string>('');

  // Comprehension quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Completed listened dialogues stored in localStorage
  const [listenedIds, setListenedIds] = useState<number[]>([]);

  const currentDialogue =
    HSK_DIALOGUES.find((d) => d.id === selectedId) || HSK_DIALOGUES[0];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hsk_listening_completed');
      if (stored) setListenedIds(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelectDialogue = (id: number) => {
    stopChineseAudio();
    setIsPlayingFull(false);
    setPlayingLineIdx(null);
    setSelectedId(id);
    setIsRevealed(false);
    setUserTranslation('');
    setQuizAnswers({});
    setShowQuizResults(false);
  };

  const toggleCompleted = (id: number) => {
    let next: number[];
    if (listenedIds.includes(id)) {
      next = listenedIds.filter((item) => item !== id);
    } else {
      next = [...listenedIds, id];
    }
    setListenedIds(next);
    try {
      localStorage.setItem('hsk_listening_completed', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  // Play single line
  const handlePlayLine = async (chinese: string, idx: number) => {
    stopChineseAudio();
    setIsPlayingFull(false);
    setPlayingLineIdx(idx);
    await playChineseAudio(chinese, playbackRate);
    setPlayingLineIdx(null);
  };

  // Play entire dialogue sequentially
  const handlePlayFullDialogue = async () => {
    if (isPlayingFull) {
      stopChineseAudio();
      setIsPlayingFull(false);
      setPlayingLineIdx(null);
      return;
    }

    setIsPlayingFull(true);
    for (let i = 0; i < currentDialogue.lines.length; i++) {
      // Check if paused or stopped in between
      setPlayingLineIdx(i);
      await playChineseAudio(currentDialogue.lines[i].chinese, playbackRate);
      // Brief pause between lines
      await new Promise((r) => setTimeout(r, 600));
    }
    setPlayingLineIdx(null);
    setIsPlayingFull(false);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-2">
              <Headphones className="w-3.5 h-3.5" />
              Luyện Phản Xạ Nghe Chuẩn Tiếng Hán
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Luyện Nghe — Dịch Hội Thoại
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Nghe hội thoại tiếng Trung trước khi xem văn bản, chỉnh tốc độ phát âm và kiểm tra nghe hiểu.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl font-medium self-start md:self-auto">
            Đã luyện nghe: <strong className="text-rose-600 font-bold">{listenedIds.length}</strong> /{' '}
            {HSK_DIALOGUES.length} bài
          </div>
        </div>

        {/* Carousel selector */}
        <div className="mt-5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
            Chọn bài luyện nghe ({HSK_DIALOGUES.length} bài):
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {HSK_DIALOGUES.map((d) => {
              const isSelected = d.id === selectedId;
              const isDone = listenedIds.includes(d.id);
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
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'bg-white text-rose-600' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {d.id}
                  </span>
                  <span>{d.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {d.level.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Listening Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio Player & Transcript (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Audio Control Bar Card */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-700/60 pb-5 mb-5">
              <div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Bài {currentDialogue.id}: {currentDialogue.level.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">{currentDialogue.title}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{currentDialogue.description}</p>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1.5 bg-stone-800/80 p-1 rounded-xl border border-stone-700">
                <Gauge className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-0.5" />
                {[0.75, 1.0, 1.25].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                      playbackRate === rate
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Play Full Dialogue Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handlePlayFullDialogue}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isPlayingFull
                    ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                    : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30'
                }`}
              >
                {isPlayingFull ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlayingFull ? 'Tạm dừng phát bài' : 'Phát toàn bộ đoạn hội thoại'}</span>
              </button>

              <button
                onClick={() => {
                  stopChineseAudio();
                  setIsPlayingFull(false);
                  setPlayingLineIdx(null);
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Dừng hẳn
              </button>
            </div>
          </div>

          {/* Lines List: Hidden by default */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>Nội dung từng lượt lời ({currentDialogue.lines.length} câu)</span>
              </h4>
              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                  isRevealed
                    ? 'border-amber-300 bg-amber-50 text-amber-900'
                    : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {isRevealed ? 'Ẩn văn bản đối chiếu' : 'Hiện văn bản & Đáp án'}
              </button>
            </div>

            {/* Conversation list */}
            <div className="space-y-3">
              {currentDialogue.lines.map((line, idx) => {
                const isPlaying = playingLineIdx === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      isPlaying
                        ? 'border-rose-400 bg-rose-50/60 shadow-xs'
                        : 'border-stone-200/70 bg-stone-50/50'
                    }`}
                  >
                    {/* Play single line button */}
                    <button
                      onClick={() => handlePlayLine(line.chinese, idx)}
                      className={`p-2 rounded-xl transition-all shrink-0 ${
                        isPlaying
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white border border-stone-200 text-stone-600 hover:text-rose-600 hover:border-rose-200'
                      }`}
                      title="Nghe câu này"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-stone-500">
                          {line.speaker}:
                        </span>
                        {!isRevealed && (
                          <span className="text-xs text-stone-400 italic">
                            (Bấm loa để nghe, văn bản đang ẩn để luyện nghe phản xạ)
                          </span>
                        )}
                      </div>

                      {/* When Revealed, show Hanzi, Pinyin, and Vietnamese */}
                      {isRevealed ? (
                        <div className="space-y-1">
                          <div className="text-base font-bold text-stone-900 tracking-wide font-sans">
                            {line.chinese}
                          </div>
                          <div className="text-xs text-rose-600 font-medium">{line.pinyin}</div>
                          <div className="text-xs text-stone-600 font-medium pt-1 border-t border-stone-200/50">
                            {line.vietnamese}
                          </div>
                        </div>
                      ) : (
                        <div className="h-6 flex items-center">
                          <div className="w-32 h-2.5 bg-stone-200 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Revealed Key Vocab & Notes */}
            {isRevealed && (
              <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                <div>
                  <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                    Từ vựng quan trọng:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentDialogue.keyVocab.map((v, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 border border-stone-200/60 text-stone-800 px-2 py-0.5 rounded-lg text-xs"
                      >
                        <strong className="text-rose-600">{v.word}</strong> ({v.pinyin}): {v.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: User Translation & Listening Comprehension Quiz (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* User Translation Note */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <h4 className="text-sm font-bold text-stone-900 mb-1 flex items-center justify-between">
              <span>Ghi chú bản dịch khi nghe</span>
              <span className="text-[11px] text-stone-400 font-normal">Tự ghi lại những gì bạn nghe được</span>
            </h4>
            <p className="text-xs text-stone-500 mb-3">
              Hãy nghe âm thanh trước, sau đó ghi chú lại nội dung bạn nghe hiểu trước khi bấm &quot;Hiện văn bản &amp; Đáp án&quot;:
            </p>

            <textarea
              rows={4}
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              placeholder="Ghi lại nội dung tiếng Việt bạn nghe được..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-y text-stone-800"
            />

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => setIsRevealed(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-xs"
              >
                Kiểm tra & Đối chiếu
              </button>

              <button
                onClick={() => toggleCompleted(currentDialogue.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                  listenedIds.includes(currentDialogue.id)
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {listenedIds.includes(currentDialogue.id) ? 'Đã hoàn thành' : 'Đánh dấu đã nghe'}
              </button>
            </div>
          </div>

          {/* Listening Comprehension Quiz */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <h4 className="text-sm font-bold text-stone-900 mb-1">
              Câu hỏi kiểm tra nghe hiểu ({currentDialogue.quizzes.length} câu)
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Chọn đáp án đúng nhất dựa trên đoạn âm thanh vừa nghe:
            </p>

            <div className="space-y-4">
              {currentDialogue.quizzes.map((quiz, qIdx) => {
                const selected = quizAnswers[qIdx];
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
