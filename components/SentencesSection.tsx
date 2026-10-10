'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SentencePattern } from '@/types/practice';
import { HSK_SENTENCE_PATTERNS } from '@/data/hsk-sentences-data';
import { playChineseAudio, stopChineseAudio } from '@/lib/quiz-utils';
import {
  Volume2,
  Heart,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookMarked,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const SentencesSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'hsk1' | 'hsk2'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'cards' | 'meaning_quiz' | 'fill_quiz'>('cards');
  const [showPinyin, setShowPinyin] = useState<boolean>(true);
  const [showVietnamese, setShowVietnamese] = useState<boolean>(true);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Persistence in localStorage
  const [favorites, setFavorites] = useState<number[]>([]);
  const [learnedIds, setLearnedIds] = useState<number[]>([]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  useEffect(() => {
    try {
      const favStored = localStorage.getItem('hsk_sentence_favorites');
      if (favStored) setFavorites(JSON.parse(favStored));
      const learnedStored = localStorage.getItem('hsk_sentence_learned');
      if (learnedStored) setLearnedIds(JSON.parse(learnedStored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveFavorites = (ids: number[]) => {
    setFavorites(ids);
    try {
      localStorage.setItem('hsk_sentence_favorites', JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  };

  const saveLearned = (ids: number[]) => {
    setLearnedIds(ids);
    try {
      localStorage.setItem('hsk_sentence_learned', JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter((f) => f !== id));
    } else {
      saveFavorites([...favorites, id]);
    }
  };

  const toggleLearned = (id: number) => {
    if (learnedIds.includes(id)) {
      saveLearned(learnedIds.filter((l) => l !== id));
    } else {
      saveLearned([...learnedIds, id]);
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(HSK_SENTENCE_PATTERNS.map((s) => s.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered sentences
  const filteredSentences = useMemo(() => {
    return HSK_SENTENCE_PATTERNS.filter((item) => {
      const matchLevel =
        selectedLevel === 'all' || item.level === selectedLevel || item.level === 'both';
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchLevel && matchCategory;
    });
  }, [selectedLevel, selectedCategory]);

  const handlePlayAudio = async (sentence: SentencePattern) => {
    setPlayingId(sentence.id);
    await playChineseAudio(sentence.chinese);
    setPlayingId(null);
  };

  // Current sentence in quiz mode
  const currentQuizItem = filteredSentences[quizIndex] || filteredSentences[0];

  const handleAnswerQuiz = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect =
      studyMode === 'meaning_quiz'
        ? option === currentQuizItem.quizMeaning.correctAnswer
        : option === currentQuizItem.quizFill.correctAnswer;

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      if (!learnedIds.includes(currentQuizItem.id)) {
        saveLearned([...learnedIds, currentQuizItem.id]);
      }
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < filteredSentences.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Completed round
      alert(`Hoàn thành! Điểm số: ${quizScore + (isCorrectAnswer ? 1 : 0)} / ${filteredSentences.length}`);
      setQuizIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuizScore(0);
    }
  };

  const isCorrectAnswer =
    studyMode === 'meaning_quiz'
      ? selectedAnswer === currentQuizItem?.quizMeaning.correctAnswer
      : selectedAnswer === currentQuizItem?.quizFill.correctAnswer;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Mục Mở Rộng Thực Hành
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Mẫu Câu Thường Gặp HSK 1–2
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Hơn 50 mẫu câu giao tiếp tự nhiên chuẩn ngữ pháp, kèm phát âm và bài tập củng cố.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl font-medium">
              Đã học: <strong className="text-rose-600 font-bold">{learnedIds.length}</strong> /{' '}
              {HSK_SENTENCE_PATTERNS.length}
            </span>
            <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl font-medium">
              Yêu thích: <strong className="text-amber-600 font-bold">{favorites.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters and Practice Modes */}
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Mode Selector */}
            <div className="inline-flex p-1 bg-stone-100 rounded-xl text-xs sm:text-sm font-medium">
              <button
                onClick={() => {
                  setStudyMode('cards');
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  studyMode === 'cards'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Học qua thẻ
              </button>
              <button
                onClick={() => {
                  setStudyMode('meaning_quiz');
                  setQuizIndex(0);
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setQuizScore(0);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  studyMode === 'meaning_quiz'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Trắc nghiệm chọn nghĩa
              </button>
              <button
                onClick={() => {
                  setStudyMode('fill_quiz');
                  setQuizIndex(0);
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setQuizScore(0);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  studyMode === 'fill_quiz'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Điền từ vào chỗ trống
              </button>
            </div>

            {/* Display Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                  showPinyin
                    ? 'border-stone-300 bg-stone-50 text-stone-700'
                    : 'border-stone-200 bg-white text-stone-400'
                }`}
                title="Bật/Tắt hiển thị Pinyin"
              >
                {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                Pinyin
              </button>
              <button
                onClick={() => setShowVietnamese(!showVietnamese)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                  showVietnamese
                    ? 'border-stone-300 bg-stone-50 text-stone-700'
                    : 'border-stone-200 bg-white text-stone-400'
                }`}
                title="Bật/Tắt hiển thị Nghĩa Tiếng Việt"
              >
                {showVietnamese ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Level & Category Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-400 font-medium inline-flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Bộ lọc:
            </span>

            {/* Level pills */}
            {(['all', 'hsk1', 'hsk2'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {lvl === 'all' ? 'Tất cả cấp độ' : lvl.toUpperCase()}
              </button>
            ))}

            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ml-auto px-3 py-1 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
            >
              <option value="all">Tất cả chủ đề ({categories.length - 1})</option>
              {categories
                .filter((c) => c !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mode 1: Study Cards */}
      {studyMode === 'cards' && (
        <div className="space-y-4">
          <div className="text-xs text-stone-400 font-medium px-1 flex justify-between items-center">
            <span>Hiển thị {filteredSentences.length} mẫu câu phù hợp</span>
            <span>Click vào biểu tượng loa để nghe phát âm chuẩn</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSentences.map((sentence) => {
              const isFav = favorites.includes(sentence.id);
              const isLearned = learnedIds.includes(sentence.id);
              const isPlaying = playingId === sentence.id;

              return (
                <div
                  key={sentence.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-200 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                        {sentence.level.toUpperCase()}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">{sentence.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleLearned(sentence.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isLearned ? 'text-emerald-600 bg-emerald-50' : 'text-stone-300 hover:text-stone-500'
                        }`}
                        title={isLearned ? 'Đã thuộc mẫu câu này' : 'Đánh dấu đã thuộc'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(sentence.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav ? 'text-rose-500 bg-rose-50' : 'text-stone-300 hover:text-stone-500'
                        }`}
                        title={isFav ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handlePlayAudio(sentence)}
                        className={`p-2 rounded-xl transition-all ${
                          isPlaying
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                        title="Phát âm tiếng Trung"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Chinese Sentence */}
                  <div className="mt-2">
                    <div className="text-xl sm:text-2xl font-bold text-stone-900 tracking-wide font-sans">
                      {sentence.chinese}
                    </div>

                    {showPinyin && (
                      <div className="text-sm font-medium text-rose-600 mt-1">{sentence.pinyin}</div>
                    )}

                    {showVietnamese && (
                      <div className="text-sm font-medium text-stone-600 mt-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-100">
                        {sentence.vietnamese}
                      </div>
                    )}
                  </div>

                  {/* Grammar & Key Vocab */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-3 text-xs">
                    <div className="flex-1 text-stone-500">
                      <strong className="text-stone-700">Ngữ pháp: </strong>
                      {sentence.grammar}
                    </div>

                    <div className="sm:border-l sm:border-stone-100 sm:pl-3">
                      <strong className="text-stone-700">Từ vựng then chốt: </strong>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {sentence.keyVocab.map((v, i) => (
                          <span
                            key={i}
                            className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md text-[11px]"
                          >
                            {v.word} ({v.pinyin}): {v.meaning}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2 & 3: Quizzes */}
      {(studyMode === 'meaning_quiz' || studyMode === 'fill_quiz') && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
          {filteredSentences.length === 0 ? (
            <div className="text-center py-10 text-stone-400">
              Không tìm thấy mẫu câu phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-3 font-medium">
                <span>
                  Câu hỏi {quizIndex + 1} / {filteredSentences.length}
                </span>
                <span>
                  Điểm số: <strong className="text-rose-600 font-bold">{quizScore}</strong>
                </span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{
                    width: `${((quizIndex + 1) / filteredSentences.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Box */}
              <div className="mb-6 p-5 bg-rose-50/50 rounded-2xl border border-rose-100/60 text-center">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 mb-2">
                  {currentQuizItem.category} • {currentQuizItem.level.toUpperCase()}
                </span>
                <div className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {studyMode === 'meaning_quiz'
                    ? currentQuizItem.chinese
                    : currentQuizItem.quizFill.question}
                </div>

                {/* Show Pinyin in both Meaning Quiz and Fill Quiz */}
                {showPinyin && (
                  <div className="text-sm sm:text-base text-rose-600 font-semibold mb-1">
                    {studyMode === 'meaning_quiz'
                      ? currentQuizItem.pinyin
                      : (currentQuizItem.quizFill.questionPinyin || currentQuizItem.pinyin)}
                  </div>
                )}

                {/* Show Vietnamese Meaning hint in Fill Quiz if enabled */}
                {studyMode === 'fill_quiz' && showVietnamese && (
                  <div className="text-xs sm:text-sm text-stone-600 font-medium mt-1 bg-white/70 inline-block px-3 py-1 rounded-xl border border-rose-100">
                    💡 Dịch nghĩa cả câu: <span className="text-stone-900 font-semibold">{currentQuizItem.vietnamese}</span>
                  </div>
                )}

                <div className="mt-3 flex justify-center">
                  <button
                    onClick={() => handlePlayAudio(currentQuizItem)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Nghe câu tiếng Trung
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {(studyMode === 'meaning_quiz'
                  ? currentQuizItem.quizMeaning.options
                  : currentQuizItem.quizFill.options
                ).map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect =
                    studyMode === 'meaning_quiz'
                      ? option === currentQuizItem.quizMeaning.correctAnswer
                      : option === currentQuizItem.quizFill.correctAnswer;

                  // Find vocab details if option is a Chinese word in keyVocab
                  const vocabDetail = currentQuizItem.keyVocab.find((v) => v.word === option);

                  let btnStyle = 'border-stone-200 bg-white hover:border-stone-300 text-stone-800';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-semibold';
                    } else {
                      btnStyle = 'border-stone-100 bg-stone-50 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerQuiz(option)}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div>
                        <span className="font-semibold">{option}</span>
                        {isAnswered && vocabDetail && (
                          <span className="ml-2 text-xs font-normal text-stone-500">
                            [{vocabDetail.pinyin}]: {vocabDetail.meaning}
                          </span>
                        )}
                      </div>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-2 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 ml-2 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border mb-6 text-xs sm:text-sm space-y-3 ${
                    isCorrectAnswer
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isCorrectAnswer ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Chính xác! Bạn làm rất tốt 🎉
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" /> Chưa chính xác 💡
                        </>
                      )}
                    </div>
                    {!isCorrectAnswer && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold border border-rose-200">
                        Đáp án đúng: {studyMode === 'meaning_quiz' ? currentQuizItem.quizMeaning.correctAnswer : currentQuizItem.quizFill.correctAnswer}
                      </span>
                    )}
                  </div>

                  {/* Prominent Core Sentence Display: Hanzi + Pinyin + Vietnamese */}
                  <div className="bg-white/95 p-4 rounded-xl border border-stone-200 shadow-xs space-y-2">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Mẫu câu chuẩn cần ghi nhớ:
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-sans text-stone-900 tracking-wide">
                      {currentQuizItem.chinese}
                    </div>
                    <div className="text-sm font-semibold text-rose-600">
                      [{currentQuizItem.pinyin}]
                    </div>
                    
                    {/* Dịch nghĩa câu nổi bật */}
                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm">
                      <strong className="text-emerald-800">🇻🇳 Dịch nghĩa: </strong>
                      {currentQuizItem.vietnamese}
                    </div>
                  </div>

                  {/* Từ vựng quan trọng trong câu (Key Vocabulary Card) */}
                  {currentQuizItem.keyVocab.length > 0 && (
                    <div className="bg-white/95 p-3.5 rounded-xl border border-stone-200/90 shadow-xs">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Các từ vựng quan trọng trong câu:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQuizItem.keyVocab.map((v, i) => (
                          <div
                            key={i}
                            className="bg-stone-50 hover:bg-stone-100 p-2 rounded-lg border border-stone-200/70 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-sm text-stone-900">{v.word}</span>
                              <span className="text-rose-600 font-medium">[{v.pinyin}]</span>
                            </div>
                            <span className="text-stone-600 font-medium">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grammar and Fill explanation Context */}
                  <div className="bg-white/70 p-3 rounded-xl border border-stone-200/60 space-y-1 text-stone-700">
                    <div>
                      <strong className="text-stone-900">📖 Cấu trúc ngữ pháp: </strong>
                      {currentQuizItem.grammar}
                    </div>
                    {studyMode === 'fill_quiz' && (
                      <div className="pt-1.5 border-t border-stone-200/50 text-stone-600">
                        <strong className="text-stone-900">💡 Giải thích từ điền: </strong>
                        {currentQuizItem.quizFill.explanation}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold text-sm shadow-md shadow-rose-500/20 hover:scale-[1.02] transition-transform"
                  >
                    <span>{quizIndex < filteredSentences.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
