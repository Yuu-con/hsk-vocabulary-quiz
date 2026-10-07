'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizProgress, QuizMode, UserAnswerRecord, QuizLevel } from '@/types/quiz';
import { HSK1_VOCAB_DATA } from '@/data/hsk1-data';
import { HSK2_VOCAB_DATA } from '@/data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '@/data/hsk-combined-data';

const STORAGE_PREFIX = 'hsk_mastery_loop_v1_';

function getInitialDataset(level: QuizLevel): QuizQuestion[] {
  switch (level) {
    case 'hsk2':
      return HSK2_VOCAB_DATA;
    case 'all':
      return HSK_COMBINED_VOCAB_DATA;
    case 'hsk1':
    default:
      return HSK1_VOCAB_DATA;
  }
}

function getInitialState(level: QuizLevel): QuizProgress {
  const dataset = getInitialDataset(level);
  return {
    level,
    round: 1,
    initialFirstRoundScore: 0,
    activeQuestionIds: dataset.map(q => q.id),
    currentIndex: 0,
    score: 0,
    currentRoundAnswers: {},
    currentRoundWrongIds: [],
    mode: 'idle',
  };
}

export function useQuiz(initialLevel: QuizLevel = 'hsk1') {
  const [level, setLevel] = useState<QuizLevel>(initialLevel);
  const [state, setState] = useState<QuizProgress>(() => getInitialState(initialLevel));
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage whenever level changes
  useEffect(() => {
    try {
      const storageKey = STORAGE_PREFIX + level;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as QuizProgress;
        if (
          typeof parsed.round === 'number' &&
          Array.isArray(parsed.activeQuestionIds) &&
          parsed.activeQuestionIds.length > 0
        ) {
          setState({ ...parsed, level });
        } else {
          setState(getInitialState(level));
        }
      } else {
        setState(getInitialState(level));
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

  // Full dataset for level
  const fullDataset: QuizQuestion[] = useMemo(() => {
    return getInitialDataset(state.level);
  }, [state.level]);

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
  const startQuiz = useCallback(() => {
    const dataset = getInitialDataset(state.level);
    setState({
      level: state.level,
      round: 1,
      initialFirstRoundScore: 0,
      activeQuestionIds: dataset.map(q => q.id),
      currentIndex: 0,
      score: 0,
      currentRoundAnswers: {},
      currentRoundWrongIds: [],
      mode: 'in_progress',
    });
  }, [state.level]);

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
    setState(getInitialState(state.level));
  }, [state.level]);

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
      const nextRoundQuestions = [...prev.currentRoundWrongIds];
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

  const answeredCountInRound = Object.keys(state.currentRoundAnswers).length;
  const hasSavedProgress =
    state.round > 1 || (answeredCountInRound > 0 && answeredCountInRound < totalQuestionsInRound);

  return {
    isHydrated,
    level: state.level,
    round: state.round,
    initialFirstRoundScore: state.initialFirstRoundScore,
    mode: state.mode,
    currentIndex: state.currentIndex,
    totalQuestionsInRound,
    totalFullQuestions: fullDataset.length,
    score: state.score,
    currentRoundAnswers: state.currentRoundAnswers,
    currentRoundWrongIds: state.currentRoundWrongIds,
    currentQuestion,
    currentUserAnswer,
    answeredCountInRound,
    hasSavedProgress,
    activeRoundQuestions,
    fullDataset,
    // Actions
    changeLevel,
    startQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    startNextRound,
    setMode: (mode: QuizMode) => setState(prev => ({ ...prev, mode })),
  };
}
