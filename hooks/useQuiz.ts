'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizProgress, QuizMode, UserAnswerRecord, QuizLevel } from '@/types/quiz';
import { HSK1_VOCAB_DATA } from '@/data/hsk1-data';
import { HSK2_VOCAB_DATA } from '@/data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '@/data/hsk-combined-data';
import { COMPOUND_QUIZ_DATA } from '@/data/compound-sentences-data';
import {
  applyOverridesToDataset,
  saveQuestionOverride,
  removeQuestionOverride,
  hasQuestionOverride,
} from '@/lib/vocabOverrides';
import { getSavedLessonPreferences, saveLessonPreferences } from '@/lib/quizPreferences';

const STORAGE_PREFIX = 'hsk_mastery_loop_v1_';

function getInitialDataset(level: QuizLevel): QuizQuestion[] {
  switch (level) {
    case 'hsk2':
      return HSK2_VOCAB_DATA;
    case 'all':
      return HSK_COMBINED_VOCAB_DATA;
    case 'compound':
      return COMPOUND_QUIZ_DATA;
    case 'hsk1':
    default:
      return HSK1_VOCAB_DATA;
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getInitialState(
  level: QuizLevel,
  rememberedLessons?: number[],
  rememberedShuffle?: boolean
): QuizProgress {
  const dataset = getInitialDataset(level);
  let activeQuestionIds: number[] = [];
  if (rememberedLessons && rememberedLessons.length > 0) {
    activeQuestionIds = dataset
      .filter(q => (q.lesson ? rememberedLessons.includes(q.lesson) : true))
      .map(q => q.id);
  } else {
    activeQuestionIds = dataset.map(q => q.id);
  }

  return {
    level,
    round: 1,
    initialFirstRoundScore: 0,
    activeQuestionIds,
    currentIndex: 0,
    score: 0,
    currentRoundAnswers: {},
    currentRoundWrongIds: [],
    mode: 'idle',
    selectedLessons: rememberedLessons,
    isShuffled: rememberedShuffle ?? true,
  };
}

export function useQuiz(initialLevel: QuizLevel = 'hsk1') {
  const [level, setLevel] = useState<QuizLevel>(initialLevel);
  const [state, setState] = useState<QuizProgress>(() => getInitialState(initialLevel));
  const [isHydrated, setIsHydrated] = useState(false);
  const [overridesVersion, setOverridesVersion] = useState(0);

  // Listen to custom overrides updates
  useEffect(() => {
    const handleOverridesUpdate = () => {
      setOverridesVersion(v => v + 1);
    };
    window.addEventListener('hsk_vocab_overrides_updated', handleOverridesUpdate);
    return () => {
      window.removeEventListener('hsk_vocab_overrides_updated', handleOverridesUpdate);
    };
  }, []);

  // Load from localStorage whenever level changes
  useEffect(() => {
    try {
      const storageKey = STORAGE_PREFIX + level;
      const saved = localStorage.getItem(storageKey);
      const savedPrefs = getSavedLessonPreferences(level);
      const defaultLessons = savedPrefs.scopeMode === 'custom' && savedPrefs.selectedLessons.length > 0
        ? savedPrefs.selectedLessons
        : undefined;

      if (saved) {
        const parsed = JSON.parse(saved) as QuizProgress;
        if (
          typeof parsed.round === 'number' &&
          Array.isArray(parsed.activeQuestionIds) &&
          parsed.activeQuestionIds.length > 0
        ) {
          setState({
            ...parsed,
            level,
            selectedLessons: parsed.selectedLessons ?? defaultLessons,
            isShuffled: parsed.isShuffled ?? savedPrefs.shuffle,
          });
        } else {
          setState(getInitialState(level, defaultLessons, savedPrefs.shuffle));
        }
      } else {
        setState(getInitialState(level, defaultLessons, savedPrefs.shuffle));
      }
    } catch (e) {
      console.error('Failed to load quiz progress', e);
      setState(getInitialState(level));
    } finally {
      setIsHydrated(true);
    }
  }, [level]);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const storageKey = STORAGE_PREFIX + state.level;
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save quiz progress', e);
    }
  }, [state, isHydrated]);

  // Full dataset for level with admin overrides applied
  const fullDataset: QuizQuestion[] = useMemo(() => {
    const raw = getInitialDataset(state.level);
    return applyOverridesToDataset(state.level, raw);
  }, [state.level, overridesVersion]);

  // Questions for current round
  const activeRoundQuestions: QuizQuestion[] = useMemo(() => {
    const idMap = new Map(fullDataset.map(q => [q.id, q]));
    return state.activeQuestionIds
      .map(id => idMap.get(id))
      .filter((q): q is QuizQuestion => q !== undefined);
  }, [fullDataset, state.activeQuestionIds]);

  const totalQuestionsInRound = activeRoundQuestions.length;
  const currentQuestion: QuizQuestion | undefined = activeRoundQuestions[state.currentIndex];
  const currentUserAnswer: UserAnswerRecord | undefined = currentQuestion
    ? state.currentRoundAnswers[currentQuestion.id]
    : undefined;

  // Change level
  const changeLevel = useCallback((newLevel: QuizLevel) => {
    setLevel(newLevel);
  }, []);

  // Start new quiz from Round 1
  const startQuiz = useCallback((options?: { selectedLessons?: number[]; shuffle?: boolean }) => {
    const dataset = getInitialDataset(state.level);

    // Detect if options is a genuine config object or undefined / MouseEvent from React onClick
    const isOptionsObject = Boolean(
      options &&
      typeof options === 'object' &&
      !('nativeEvent' in options) &&
      !('target' in options)
    );

    let selectedLessons: number[] | undefined;
    let shouldShuffle: boolean;

    if (isOptionsObject && 'selectedLessons' in options!) {
      selectedLessons = options!.selectedLessons;
    } else {
      // PRESERVE previously selected lessons!
      const savedPrefs = getSavedLessonPreferences(state.level);
      selectedLessons = state.selectedLessons ?? (savedPrefs.scopeMode === 'custom' && savedPrefs.selectedLessons.length > 0 ? savedPrefs.selectedLessons : undefined);
    }

    if (isOptionsObject && 'shuffle' in options!) {
      shouldShuffle = options!.shuffle ?? true;
    } else {
      shouldShuffle = state.isShuffled ?? true;
    }

    // Persist preference for this level
    if (selectedLessons && selectedLessons.length > 0) {
      saveLessonPreferences(state.level, {
        scopeMode: 'custom',
        selectedLessons,
        shuffle: shouldShuffle,
      });
    } else {
      saveLessonPreferences(state.level, {
        scopeMode: 'all',
        selectedLessons: [],
        shuffle: shouldShuffle,
      });
    }

    let chosenIds: number[] = [];
    if (selectedLessons && selectedLessons.length > 0) {
      chosenIds = dataset
        .filter(q => (q.lesson ? selectedLessons!.includes(q.lesson) : true))
        .map(q => q.id);
    } else {
      chosenIds = dataset.map(q => q.id);
    }

    if (shouldShuffle) {
      chosenIds = shuffleArray(chosenIds);
    }

    setState({
      level: state.level,
      round: 1,
      initialFirstRoundScore: 0,
      activeQuestionIds: chosenIds,
      currentIndex: 0,
      score: 0,
      currentRoundAnswers: {},
      currentRoundWrongIds: [],
      mode: 'in_progress',
      selectedLessons: selectedLessons,
      isShuffled: shouldShuffle,
    });
  }, [state.level, state.selectedLessons, state.isShuffled]);

  // Restart quiz with previously selected lessons
  const restartQuiz = useCallback((options?: { selectedLessons?: number[]; shuffle?: boolean }) => {
    startQuiz(options);
  }, [startQuiz]);

  // Resume existing quiz
  const resumeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: prev.mode === 'idle' ? 'in_progress' : prev.mode,
    }));
  }, []);

  // Reset quiz completely
  const resetQuiz = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + state.level);
    } catch (e) {}
    const savedPrefs = getSavedLessonPreferences(state.level);
    const rememberedLessons = state.selectedLessons ?? (savedPrefs.scopeMode === 'custom' && savedPrefs.selectedLessons.length > 0 ? savedPrefs.selectedLessons : undefined);
    setState(getInitialState(state.level, rememberedLessons, state.isShuffled));
  }, [state.level, state.selectedLessons, state.isShuffled]);

  // Answer a question in the current round
  // RULE: Answers are LOCKED once chosen! User cannot change answer immediately.
  const selectAnswer = useCallback((selectedOption: string) => {
    setState(prev => {
      const idMap = new Map(fullDataset.map(q => [q.id, q]));
      const roundQuestions = prev.activeQuestionIds
        .map(id => idMap.get(id))
        .filter((q): q is QuizQuestion => q !== undefined);

      const q = roundQuestions[prev.currentIndex];
      if (!q) return prev;

      // STRICT LOCK: If already answered in this round, cannot answer again!
      if (prev.currentRoundAnswers[q.id]) {
        return prev;
      }

      const isCorrect = selectedOption === q.correctAnswer;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newInitialScore =
        prev.round === 1 && isCorrect
          ? prev.initialFirstRoundScore + 1
          : prev.initialFirstRoundScore;

      const newAnswers = {
        ...prev.currentRoundAnswers,
        [q.id]: {
          questionId: q.id,
          selectedAnswer: selectedOption,
          isCorrect,
          correctAnswer: q.correctAnswer,
          answeredAt: Date.now(),
        },
      };

      const newWrongIds = isCorrect
        ? prev.currentRoundWrongIds.filter(id => id !== q.id)
        : prev.currentRoundWrongIds.includes(q.id)
        ? prev.currentRoundWrongIds
        : [...prev.currentRoundWrongIds, q.id];

      return {
        ...prev,
        score: newScore,
        initialFirstRoundScore: newInitialScore,
        currentRoundAnswers: newAnswers,
        currentRoundWrongIds: newWrongIds,
      };
    });
  }, [fullDataset]);

  // Advance to next question or conclude current round
  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIdx = prev.currentIndex + 1;
      if (nextIdx < prev.activeQuestionIds.length) {
        return {
          ...prev,
          currentIndex: nextIdx,
        };
      }

      // Reached the end of the round!
      if (prev.currentRoundWrongIds.length > 0) {
        // Still has wrong questions: transition to next round review
        return {
          ...prev,
          mode: 'round_completed',
        };
      } else {
        // Zero wrong questions: Mastery 100%!
        return {
          ...prev,
          mode: 'mastery_completed',
        };
      }
    });
  }, []);

  // Previous question (to review what was selected)
  const prevQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
    }));
  }, []);

  // Jump to specific question within the round
  const jumpToQuestion = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, Math.min(prev.activeQuestionIds.length - 1, index)),
    }));
  }, []);

  // Start the next round with only the wrong questions accumulated!
  const startNextRound = useCallback(() => {
    setState(prev => {
      let nextRoundQuestions = [...prev.currentRoundWrongIds];
      if (prev.isShuffled) {
        nextRoundQuestions = shuffleArray(nextRoundQuestions);
      }
      return {
        ...prev,
        round: prev.round + 1,
        activeQuestionIds: nextRoundQuestions,
        currentRoundWrongIds: [],
        currentRoundAnswers: {},
        currentIndex: 0,
        mode: 'in_progress',
      };
    });
  }, []);

  // Admin action: Live update correct answer & explanation
  const updateCurrentQuestionAnswer = useCallback(
    (newCorrectAnswer: string, newExplanation?: string) => {
      if (!currentQuestion) return;
      saveQuestionOverride(state.level, currentQuestion, newCorrectAnswer, newExplanation);

      // If user already answered, update user's answer record to reflect new correct answer
      setState(prev => {
        const existing = prev.currentRoundAnswers[currentQuestion.id];
        if (existing) {
          const wasCorrect = existing.isCorrect;
          return {
            ...prev,
            currentRoundAnswers: {
              ...prev.currentRoundAnswers,
              [currentQuestion.id]: {
                ...existing,
                correctAnswer: newCorrectAnswer,
                selectedAnswer: wasCorrect ? newCorrectAnswer : existing.selectedAnswer,
              },
            },
          };
        }
        return prev;
      });

      setOverridesVersion(v => v + 1);
    },
    [currentQuestion, state.level]
  );

  // Admin action: Reset question override back to default
  const resetCurrentQuestionAnswer = useCallback(() => {
    if (!currentQuestion) return;
    removeQuestionOverride(state.level, currentQuestion);
    setOverridesVersion(v => v + 1);
  }, [currentQuestion, state.level]);

  const isCurrentQuestionOverridden = currentQuestion
    ? hasQuestionOverride(state.level, currentQuestion)
    : false;

  const answeredCountInRound = Object.keys(state.currentRoundAnswers).length;
  const hasSavedProgress =
    state.round > 1 || (answeredCountInRound > 0 && answeredCountInRound < totalQuestionsInRound);

  const totalQuizQuestions = useMemo(() => {
    if (state.selectedLessons && state.selectedLessons.length > 0) {
      return fullDataset.filter(q => (q.lesson ? state.selectedLessons!.includes(q.lesson) : true)).length;
    }
    return fullDataset.length;
  }, [fullDataset, state.selectedLessons]);

  return {
    isHydrated,
    level: state.level,
    round: state.round,
    initialFirstRoundScore: state.initialFirstRoundScore,
    mode: state.mode,
    currentIndex: state.currentIndex,
    totalQuestionsInRound,
    totalFullQuestions: totalQuizQuestions,
    totalOverallQuestions: fullDataset.length,
    score: state.score,
    currentRoundAnswers: state.currentRoundAnswers,
    currentRoundWrongIds: state.currentRoundWrongIds,
    currentQuestion,
    currentUserAnswer,
    answeredCountInRound,
    hasSavedProgress,
    activeRoundQuestions,
    fullDataset,
    selectedLessons: state.selectedLessons,
    isShuffled: state.isShuffled,
    // Actions
    changeLevel,
    startQuiz,
    restartQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    startNextRound,
    setMode: (mode: QuizMode) => setState(prev => ({ ...prev, mode })),
    // Admin Live Editing Actions
    updateCurrentQuestionAnswer,
    resetCurrentQuestionAnswer,
    isCurrentQuestionOverridden,
  };
}
