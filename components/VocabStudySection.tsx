'use client';

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Eye, 
  EyeOff, 
  LayoutGrid, 
  Table as TableIcon, 
  Tag,
  Sparkles,
  Zap
} from 'lucide-react';
import { VOCAB_LESSON_DATA } from '@/data/vocab-study-lesson-data';
import { VOCAB_TOPIC_DATA, VOCAB_TOPIC_CATEGORIES } from '@/data/vocab-study-topic-data';
import { COMPOUND_PHRASES_DATA } from '@/data/compound-sentences-data';
import { CONFUSABLE_VOCAB_DATA, CONFUSABLE_CATEGORIES } from '@/data/confusable-vocab-data';
import { HSK1_LESSON_INFO, HSK2_LESSON_INFO, COMPOUND_SECTION_INFO } from '@/data/lesson-info';
import { playChineseAudio } from '@/lib/quiz-utils';

type StudyMode = 'by_topic' | 'by_lesson' | 'compound' | 'confusable';

// Helper to parse notes with Chinese and translation details
function parseNote(noteText?: string) {
  if (!noteText) return null;
  const match = noteText.match(/^([^\(]+?)\s*\((.+)\)$/);
  if (match) {
    return {
      chinese: match[1].trim(),
      details: match[2].trim(),
    };
  }
  return {
    chinese: noteText,
    details: '',
  };
}

export const VocabStudySection: React.FC = () => {
  // Default to by_topic
  const [studyMode, setStudyMode] = useState<StudyMode>('by_topic');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAllMeanings, setHideAllMeanings] = useState(false);
  
  // Track individual card/word meaning visibility overrides:
  // true = explicitly visible, false = explicitly hidden
  const [individualVisibility, setIndividualVisibility] = useState<Record<string, boolean>>({});
  
  const [viewStyle, setViewStyle] = useState<'grid' | 'table'>('grid');

  // Topic sub-filter
  const [selectedTopicId, setSelectedTopicId] = useState<number>(0); // 0 = all

  // Lesson sub-filters
  const [lessonLevel, setLessonLevel] = useState<'hsk1' | 'hsk2'>('hsk1');
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(0); // 0 = all

  // Compound sub-filter
  const [selectedCompoundSecId, setSelectedCompoundSecId] = useState<number>(0); // 0 = all

  // Confusable sub-filter
  const [selectedConfusableCat, setSelectedConfusableCat] = useState<string>('all');

  // Audio playing indicator
  const [playingHanzi, setPlayingHanzi] = useState<string | null>(null);

  const handlePlayAudio = async (text: string) => {
    // If text has separators like '-' or '/', pick the first phrase for TTS
    const cleanWord = text.split(/[-–—/]/)[0].trim();
    setPlayingHanzi(text);
    try {
      await playChineseAudio(cleanWord || text);
    } finally {
      setPlayingHanzi(null);
    }
  };

  // Check if a specific card's meaning is visible
  const isMeaningVisible = (cardKey: string): boolean => {
    if (individualVisibility[cardKey] !== undefined) {
      return individualVisibility[cardKey];
    }
    return !hideAllMeanings;
  };

  // Toggle visibility of a specific card's meaning
  const toggleMeaning = (cardKey: string) => {
    const current = isMeaningVisible(cardKey);
    setIndividualVisibility(prev => ({
      ...prev,
      [cardKey]: !current,
    }));
  };

  // Global toggle handler
  const handleToggleGlobalMeanings = () => {
    const next = !hideAllMeanings;
    setHideAllMeanings(next);
    // Reset individual overrides so all cards sync with the new global state
    setIndividualVisibility({});
  };

  // 1. Filtered Topic Items (14 chủ đề)
  const filteredTopicItems = useMemo(() => {
    return VOCAB_TOPIC_DATA.filter(item => {
      if (selectedTopicId !== 0 && item.topicId !== selectedTopicId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchHanzi = item.hanzi.toLowerCase().includes(q);
        const matchPinyin = item.pinyin.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchNote = item.note?.toLowerCase().includes(q);
        if (!matchHanzi && !matchPinyin && !matchMeaning && !matchNote) return false;
      }
      return true;
    });
  }, [selectedTopicId, searchQuery]);

  // 2. Filtered Lesson Items
  const filteredLessonItems = useMemo(() => {
    return VOCAB_LESSON_DATA.filter(item => {
      if (item.level !== lessonLevel) return false;
      if (selectedLessonNum !== 0 && item.lesson !== selectedLessonNum) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchHanzi = item.hanzi.toLowerCase().includes(q);
        const matchPinyin = item.pinyin.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchType = item.wordType.toLowerCase().includes(q);
        if (!matchHanzi && !matchPinyin && !matchMeaning && !matchType) return false;
      }
      return true;
    });
  }, [lessonLevel, selectedLessonNum, searchQuery]);

  // 3. Filtered Compound Items
  const filteredCompoundItems = useMemo(() => {
    return COMPOUND_PHRASES_DATA.filter(item => {
      if (selectedCompoundSecId !== 0 && item.sectionId !== selectedCompoundSecId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchPhrase = item.phrase.toLowerCase().includes(q);
        const matchPinyin = item.pinyin.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchContext = (item.contextChinese + item.contextPinyin + item.contextVietnamese).toLowerCase().includes(q);
        if (!matchPhrase && !matchPinyin && !matchMeaning && !matchContext) return false;
      }
      return true;
    });
  }, [selectedCompoundSecId, searchQuery]);

  // 4. Filtered Confusable Items
  const filteredConfusableItems = useMemo(() => {
    return CONFUSABLE_VOCAB_DATA.filter(group => {
      if (selectedConfusableCat !== 'all' && group.category !== selectedConfusableCat) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWords = group.words.some(
          w => w.hanzi.toLowerCase().includes(q) || w.pinyin.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)
        );
        const matchTips = group.tips.toLowerCase().includes(q);
        const matchCat = group.category.toLowerCase().includes(q);
        if (!matchWords && !matchTips && !matchCat) return false;
      }
      return true;
    });
  }, [selectedConfusableCat, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 animate-pop-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-rose-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2.5">
            <span>📖</span> Mục Học Thuộc Từ Vựng Chuẩn
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Học & Ghi Nhớ Từ Vựng HSK 1 & HSK 2
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 font-medium leading-relaxed">
            Học thuộc bảng từ vựng theo 14 chủ đề, theo bài học, cụm câu ghép và cẩm nang phân biệt các từ vựng dễ nhầm lẫn. Bấm trực tiếp vào nghĩa của từng từ để ẩn/hiện tự ôn tập.
          </p>
        </div>
        <div className="absolute right-4 bottom-2 text-7xl sm:text-8xl opacity-10 select-none pointer-events-none">
          字
        </div>
      </div>

      {/* Main 4-Tab Sub-Mode Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-200/70 backdrop-blur rounded-2xl">
        <button
          onClick={() => {
            setStudyMode('by_topic');
            setSearchQuery('');
          }}
          className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            studyMode === 'by_topic'
              ? 'bg-white text-rose-600 shadow-md shadow-slate-200 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🏷️</span>
          <span>Theo 14 chủ đề</span>
        </button>

        <button
          onClick={() => {
            setStudyMode('by_lesson');
            setSearchQuery('');
          }}
          className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            studyMode === 'by_lesson'
              ? 'bg-white text-rose-600 shadow-md shadow-slate-200 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📑</span>
          <span>Theo từng bài học</span>
        </button>

        <button
          onClick={() => {
            setStudyMode('compound');
            setSearchQuery('');
          }}
          className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            studyMode === 'compound'
              ? 'bg-white text-rose-600 shadow-md shadow-slate-200 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🔗</span>
          <span>Cụm câu ghép & Ví dụ</span>
        </button>

        <button
          onClick={() => {
            setStudyMode('confusable');
            setSearchQuery('');
          }}
          className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            studyMode === 'confusable'
              ? 'bg-white text-rose-600 shadow-md shadow-slate-200 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>⚡</span>
          <span>Từ vựng dễ nhầm</span>
        </button>
      </div>

      {/* Control Bar: Quick Horizontal Pills + Search + Actions */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* SUB-FILTER 1: THEO 14 CHỦ ĐỀ */}
        {studyMode === 'by_topic' && (
          <div className="space-y-2.5 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-600" />
                <span>Chọn chủ đề cần học:</span>
              </span>
              <span className="text-slate-400 font-normal">
                {selectedTopicId === 0 ? 'Tất cả 14 chủ đề (163 từ)' : VOCAB_TOPIC_CATEGORIES.find(c => c.id === selectedTopicId)?.title}
              </span>
            </div>

            {/* Quick Horizontal Topic Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin">
              <button
                onClick={() => setSelectedTopicId(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedTopicId === 0
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tất cả (163 từ)
              </button>
              {VOCAB_TOPIC_CATEGORIES.map(cat => {
                const isSelected = selectedTopicId === cat.id;
                const cleanTitle = cat.title.replace(/^\d+[\.\\]\s*/, '').split('(')[0].trim();
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTopicId(cat.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.id}
                    </span>
                    <span>{cleanTitle}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-FILTER 2: THEO TỪNG BÀI HỌC */}
        {studyMode === 'by_lesson' && (
          <div className="space-y-2.5 pb-2 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => {
                    setLessonLevel('hsk1');
                    setSelectedLessonNum(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    lessonLevel === 'hsk1'
                      ? 'bg-white text-rose-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  HSK 1 (15 bài · 162 từ)
                </button>
                <button
                  onClick={() => {
                    setLessonLevel('hsk2');
                    setSelectedLessonNum(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    lessonLevel === 'hsk2'
                      ? 'bg-white text-rose-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  HSK 2 (15 bài · 165 từ)
                </button>
              </div>

              <span className="text-slate-400 font-normal">
                {selectedLessonNum === 0 ? 'Tất cả 15 bài' : `Bài ${selectedLessonNum}`}
              </span>
            </div>

            {/* Quick Horizontal Lesson Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin">
              <button
                onClick={() => setSelectedLessonNum(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedLessonNum === 0
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tất cả các bài
              </button>
              {Array.from({ length: 15 }, (_, i) => i + 1).map(n => {
                const isSelected = selectedLessonNum === n;
                const lessonInfo =
                  lessonLevel === 'hsk1'
                    ? HSK1_LESSON_INFO.find(l => l.lesson === n)
                    : HSK2_LESSON_INFO.find(l => l.lesson === n);
                return (
                  <button
                    key={n}
                    onClick={() => setSelectedLessonNum(n)}
                    title={`Bài ${n}: ${lessonInfo?.title} (${lessonInfo?.viTitle})`}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>Bài {n}</span>
                    <span className={`text-[10px] font-normal ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                      {lessonInfo?.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-FILTER 3: CỤM CÂU GHÉP */}
        {studyMode === 'compound' && (
          <div className="space-y-2.5 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-600" />
                <span>Chọn nhóm cụm câu ghép:</span>
              </span>
              <span className="text-slate-400 font-normal">
                {selectedCompoundSecId === 0 ? 'Tất cả 8 nhóm (77 cụm ghép)' : COMPOUND_SECTION_INFO.find(s => s.lesson === selectedCompoundSecId)?.viTitle}
              </span>
            </div>

            {/* Quick Horizontal Compound Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin">
              <button
                onClick={() => setSelectedCompoundSecId(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedCompoundSecId === 0
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tất cả (77 cụm)
              </button>
              {COMPOUND_SECTION_INFO.map(sec => {
                const isSelected = selectedCompoundSecId === sec.lesson;
                return (
                  <button
                    key={sec.lesson}
                    onClick={() => setSelectedCompoundSecId(sec.lesson)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {sec.lesson}
                    </span>
                    <span>{sec.viTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-FILTER 4: TỪ VỰNG DỄ NHẦM LẪN */}
        {studyMode === 'confusable' && (
          <div className="space-y-2.5 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Chọn nhóm phân biệt:</span>
              </span>
              <span className="text-slate-400 font-normal">
                {selectedConfusableCat === 'all' ? 'Tất cả 8 nhóm (34 cặp từ)' : selectedConfusableCat}
              </span>
            </div>

            {/* Quick Horizontal Confusable Category Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin">
              <button
                onClick={() => setSelectedConfusableCat('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedConfusableCat === 'all'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tất cả (34 nhóm)
              </button>
              {CONFUSABLE_CATEGORIES.map((cat, idx) => {
                const isSelected = selectedConfusableCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedConfusableCat(cat)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <span>{cat.split('(')[0].replace(/^\d+[\.\\]\s*/, '').trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Search Bar + Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm chữ Hán, Pinyin, nghĩa..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-slate-800"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Toggle Meaning Hide / Show (Global) */}
            <button
              onClick={handleToggleGlobalMeanings}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                hideAllMeanings
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Ẩn hoặc hiện tất cả nghĩa để tự kiểm tra ghi nhớ"
            >
              {hideAllMeanings ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                  <span>Đang ẩn toàn bộ nghĩa</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ẩn toàn bộ nghĩa</span>
                </>
              )}
            </button>

            {/* View style: Grid vs Table (for modes other than confusable) */}
            {studyMode !== 'confusable' && (
              <div className="inline-flex p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewStyle('grid')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    viewStyle === 'grid' ? 'bg-white shadow-xs text-rose-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Dạng thẻ ghi nhớ"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewStyle('table')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    viewStyle === 'table' ? 'bg-white shadow-xs text-rose-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Dạng bảng chi tiết"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Header / Counter */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1 font-medium">
        <div>
          {studyMode === 'by_topic' && `Đang hiển thị ${filteredTopicItems.length} từ vựng theo chủ đề`}
          {studyMode === 'by_lesson' && `Đang hiển thị ${filteredLessonItems.length} từ vựng theo bài học`}
          {studyMode === 'compound' && `Đang hiển thị ${filteredCompoundItems.length} cụm câu ghép & ví dụ`}
          {studyMode === 'confusable' && `Đang hiển thị ${filteredConfusableItems.length} nhóm từ dễ nhầm lẫn`}
        </div>
        <div className="text-amber-800 font-semibold flex items-center gap-1 text-xs">
          <span>💡 Bấm trực tiếp vào nghĩa của từng từ để ẩn hoặc hiện lại tùy ý</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CONTENT DISPLAY: THEO 14 CHỦ ĐỀ (TAG PLACED AT THE VERY TOP OF CARD) */}
      {/* ========================================================================= */}
      {studyMode === 'by_topic' && (
        viewStyle === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredTopicItems.map(item => {
              const cardKey = `topic_${item.id}`;
              const isRevealed = isMeaningVisible(cardKey);
              const parsedNote = parseNote(item.note);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between space-y-3"
                >
                  {/* ROW 1 (TOP OF CARD): TAG / BADGE ON LEFT, SPEAKER ON RIGHT */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100/90 flex items-center gap-1.5 truncate max-w-[80%]">
                      <span>🏷️</span>
                      <span className="truncate">{item.topicTitle.split('(')[0].trim()}</span>
                    </span>

                    <button
                      onClick={() => handlePlayAudio(item.hanzi)}
                      disabled={playingHanzi === item.hanzi}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                      title="Phát âm từ vựng"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ROW 2: CORE WORD (HANZI) & PINYIN */}
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-hanzi text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wide select-none">
                      {item.hanzi}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-rose-600">
                      {item.pinyin}
                    </span>
                  </div>

                  {/* ROW 3: MEANING (CLICKABLE TO TOGGLE HIDE / REVEAL INDIVIDUALLY) */}
                  <div className="pt-0.5">
                    {isRevealed ? (
                      <div
                        onClick={() => toggleMeaning(cardKey)}
                        title="Bấm để ẩn nghĩa từ này"
                        className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/70 transition cursor-pointer select-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                          {item.meaning}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-rose-600 flex items-center gap-1 shrink-0 transition">
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ẩn nghĩa</span>
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleMeaning(cardKey)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-dashed border-amber-300 transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                        title="Bấm để xem nghĩa tiếng Việt"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>[ Bấm để xem nghĩa tiếng Việt ]</span>
                      </button>
                    )}
                  </div>

                  {/* ROW 4: NOTE / EXAMPLE SENTENCE WITH PINYIN & MEANING */}
                  {parsedNote && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/80 text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-800">
                          <div className="flex items-baseline gap-1.5">
                            <span>💡</span>
                            <span className="font-hanzi font-bold text-sm text-slate-900">
                              {parsedNote.chinese}
                            </span>
                          </div>
                          {parsedNote.chinese && (
                            <button
                              onClick={() => handlePlayAudio(parsedNote.chinese)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded transition shrink-0 cursor-pointer"
                              title="Nghe câu ví dụ"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        {parsedNote.details && (
                          <div className="text-slate-600 text-[11px] leading-relaxed pl-5 font-medium">
                            {parsedNote.details}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4">Chủ đề</th>
                    <th className="py-3 px-4">Chữ Hán</th>
                    <th className="py-3 px-4">Pinyin</th>
                    <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4">Ghi chú & Ví dụ</th>
                    <th className="py-3 px-4 text-center">Nghe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTopicItems.map((item, idx) => {
                    const cardKey = `table_topic_${item.id}`;
                    const isRevealed = isMeaningVisible(cardKey);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 text-center text-slate-400 font-medium">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-100">
                            {item.topicTitle.split('(')[0].trim()}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-hanzi text-xl font-bold text-slate-900">{item.hanzi}</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">{item.pinyin}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {isRevealed ? (
                            <div
                              onClick={() => toggleMeaning(cardKey)}
                              className="cursor-pointer group flex items-center justify-between gap-1.5"
                              title="Bấm để ẩn nghĩa"
                            >
                              <span>{item.meaning}</span>
                              <EyeOff className="w-3.5 h-3.5 text-slate-300 group-hover:text-rose-500" />
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleMeaning(cardKey)}
                              className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer flex items-center gap-1"
                              title="Bấm để xem nghĩa"
                            >
                              <Eye className="w-3 h-3" />
                              <span>[Hiện nghĩa]</span>
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-xs font-medium">{item.note || '—'}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handlePlayAudio(item.hanzi)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* 2. CONTENT DISPLAY: THEO TỪNG BÀI HỌC (TAG PLACED AT THE TOP OF CARD) */}
      {/* ========================================================================= */}
      {studyMode === 'by_lesson' && (
        viewStyle === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredLessonItems.map(item => {
              const cardKey = `lesson_${item.id}`;
              const isRevealed = isMeaningVisible(cardKey);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between space-y-3"
                >
                  {/* ROW 1 (TOP OF CARD): LESSON BADGE & WORD TYPE ON LEFT, SPEAKER ON RIGHT */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 truncate max-w-[80%]">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100 truncate">
                        Bài {item.lesson}: {item.lessonTitle}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px] shrink-0">
                        {item.wordType}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(item.hanzi)}
                      disabled={playingHanzi === item.hanzi}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ROW 2: CORE WORD & PINYIN */}
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-hanzi text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wide select-none">
                      {item.hanzi}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-rose-600">
                      {item.pinyin}
                    </span>
                  </div>

                  {/* ROW 3: MEANING (CLICKABLE TO TOGGLE HIDE / REVEAL INDIVIDUALLY) */}
                  <div className="pt-0.5">
                    {isRevealed ? (
                      <div
                        onClick={() => toggleMeaning(cardKey)}
                        title="Bấm để ẩn nghĩa từ này"
                        className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/70 transition cursor-pointer select-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                          {item.meaning}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-rose-600 flex items-center gap-1 shrink-0 transition">
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ẩn nghĩa</span>
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleMeaning(cardKey)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-dashed border-amber-300 transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                        title="Bấm để xem nghĩa tiếng Việt"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>[ Bấm để xem nghĩa tiếng Việt ]</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4">Bài học</th>
                    <th className="py-3 px-4">Chữ Hán</th>
                    <th className="py-3 px-4">Pinyin</th>
                    <th className="py-3 px-4">Từ loại</th>
                    <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4 text-center">Nghe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLessonItems.map((item, idx) => {
                    const cardKey = `table_lesson_${item.id}`;
                    const isRevealed = isMeaningVisible(cardKey);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 text-center text-slate-400 font-medium">{idx + 1}</td>
                        <td className="py-3 px-4 text-slate-500 font-medium text-xs">
                          Bài {item.lesson}: {item.lessonTitle}
                        </td>
                        <td className="py-3 px-4 font-hanzi text-xl font-bold text-slate-900">{item.hanzi}</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">{item.pinyin}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-xs">
                            {item.wordType}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {isRevealed ? (
                            <div
                              onClick={() => toggleMeaning(cardKey)}
                              className="cursor-pointer group flex items-center justify-between gap-1.5"
                              title="Bấm để ẩn nghĩa"
                            >
                              <span>{item.meaning}</span>
                              <EyeOff className="w-3.5 h-3.5 text-slate-300 group-hover:text-rose-500" />
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleMeaning(cardKey)}
                              className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer flex items-center gap-1"
                              title="Bấm để xem nghĩa"
                            >
                              <Eye className="w-3 h-3" />
                              <span>[Hiện nghĩa]</span>
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handlePlayAudio(item.hanzi)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* 3. CONTENT DISPLAY: CỤM CÂU GHÉP (TAG PLACED AT THE TOP OF CARD) */}
      {/* ========================================================================= */}
      {studyMode === 'compound' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompoundItems.map(item => {
            const cardKey = `compound_${item.id}`;
            const isRevealed = isMeaningVisible(cardKey);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all space-y-3.5"
              >
                {/* ROW 1 (TOP OF CARD): SECTION TAG ON LEFT, SPEAKER ON RIGHT */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100 truncate max-w-[85%]">
                    🔗 {item.section}
                  </span>

                  <button
                    onClick={() => handlePlayAudio(item.phrase)}
                    disabled={playingHanzi === item.phrase}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                    title="Nghe phát âm cụm từ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* ROW 2: PHRASE & PINYIN */}
                <div className="flex items-baseline gap-2.5">
                  <span className="font-hanzi text-3xl font-extrabold text-slate-900 tracking-wide select-none">
                    {item.phrase}
                  </span>
                  <span className="text-base font-bold text-rose-600">
                    {item.pinyin}
                  </span>
                </div>

                {/* ROW 3: MEANING (CLICKABLE TO TOGGLE HIDE / REVEAL INDIVIDUALLY) */}
                <div>
                  {isRevealed ? (
                    <div
                      onClick={() => toggleMeaning(cardKey)}
                      title="Bấm để ẩn nghĩa cụm từ này"
                      className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/80 transition cursor-pointer select-none"
                    >
                      <span className="text-sm sm:text-base font-bold text-emerald-900">
                        Nghĩa: {item.meaning}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 group-hover:text-rose-600 flex items-center gap-1 shrink-0 transition">
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Ẩn nghĩa</span>
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleMeaning(cardKey)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-dashed border-amber-300 transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                      title="Bấm để xem nghĩa tiếng Việt"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-700" />
                      <span>[ Bấm để xem nghĩa tiếng Việt ]</span>
                    </button>
                  )}
                </div>

                {/* ROW 4: EXAMPLE CONTEXT BOX */}
                <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-blue-900 font-bold">
                    <span>💬 Ngữ cảnh ví dụ thực tế:</span>
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(item.contextChinese)}
                      className="text-[11px] text-blue-700 hover:text-blue-900 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                    </button>
                  </div>
                  <div className="font-hanzi text-base sm:text-lg font-bold text-slate-900">
                    {item.contextChinese}
                  </div>
                  <div className="text-rose-600 font-medium text-xs sm:text-sm italic">
                    {item.contextPinyin}
                  </div>
                  <div className="text-slate-700 text-xs sm:text-sm font-medium">
                    ({item.contextVietnamese})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CONTENT DISPLAY: TỪ VỰNG DỄ NHẦM LẪN (CONFUSABLE VOCABULARY GUIDE) */}
      {/* ========================================================================= */}
      {studyMode === 'confusable' && (
        <div className="space-y-4">
          <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <span className="text-lg shrink-0">💡</span>
            <div>
              <span className="font-bold">Mẹo học từ vựng dễ nhầm lẫn:</span> Bấm vào từng loa 🔊 để nghe và so sánh sự khác biệt về thanh điệu và âm đầu/cuối. Bạn có thể bấm vào nghĩa tiếng Việt của từng từ để ẩn đi và tự nhẩm lại!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConfusableItems.map(group => (
              <div
                key={group.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all space-y-4 flex flex-col justify-between"
              >
                {/* Header: Category Badge + Suffix/Prefix */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold text-xs border border-amber-200 flex items-center gap-1.5 truncate max-w-[85%]">
                      <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{group.category}</span>
                    </span>

                    {group.prefixOrSuffix && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-100 shrink-0">
                        {group.prefixOrSuffix}
                      </span>
                    )}
                  </div>

                  {/* Words Grid Comparison */}
                  <div className={`mt-3.5 grid grid-cols-1 ${group.words.length === 2 ? 'sm:grid-cols-2' : group.words.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2.5`}>
                    {group.words.map((w, idx) => {
                      const wordKey = `confusable_${group.id}_${idx}`;
                      const isRevealed = isMeaningVisible(wordKey);

                      return (
                        <div
                          key={idx}
                          className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/70 flex flex-col justify-between space-y-2"
                        >
                          {/* Hanzi + Speaker */}
                          <div className="flex items-center justify-between">
                            <span className="font-hanzi text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide select-none">
                              {w.hanzi}
                            </span>
                            <button
                              onClick={() => handlePlayAudio(w.hanzi)}
                              disabled={playingHanzi === w.hanzi}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition cursor-pointer"
                              title={`Nghe phát âm: ${w.hanzi}`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Pinyin */}
                          <div className="text-xs sm:text-sm font-bold text-rose-600">
                            {w.pinyin}
                          </div>

                          {/* Meaning (Clickable to toggle hide/reveal) */}
                          <div className="pt-1 border-t border-slate-200/50">
                            {isRevealed ? (
                              <div
                                onClick={() => toggleMeaning(wordKey)}
                                title="Bấm để ẩn nghĩa"
                                className="group flex items-center justify-between gap-1 p-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-bold text-slate-800 cursor-pointer hover:bg-slate-100/60 transition select-none"
                              >
                                <span className="leading-tight">{w.meaning}</span>
                                <EyeOff className="w-3 h-3 text-slate-300 group-hover:text-rose-600 shrink-0" />
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => toggleMeaning(wordKey)}
                                className="w-full py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold border border-dashed border-amber-300 transition text-center cursor-pointer select-none"
                                title="Bấm để hiện nghĩa"
                              >
                                [Hiện nghĩa]
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tips & Distinction Rules Box */}
                <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200/70 text-xs text-amber-950 space-y-1 mt-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <span>💡</span>
                    <span>Mẹo phân biệt & Phản xạ:</span>
                  </div>
                  <div className="text-slate-700 whitespace-pre-line leading-relaxed pl-5 font-medium">
                    {group.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
