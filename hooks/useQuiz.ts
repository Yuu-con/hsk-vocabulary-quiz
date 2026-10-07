'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizProgress, QuizMode, UserAnswerRecord, QuizLevel } from '@/types/quiz';
import { HSK1_VOCAB_DATA } from '@/data/hsk1-data';
import { HSK2_VOCAB_DATA } from '@/data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '@/data/hsk-combined-data';

const STORAGE_PREFIX = 'hsk_quiz_progress_v3_';

function getInitialState(level: QuizLevel): QuizProgress {
  return {
    level,
    currentIndex: 0,
    score: 0,
    answers: {},
    wrongQuestionIds: [],
    mode: 'idle',
    reviewCurrentIndex: 0,
    reviewScore: 0,
    reviewAnswers: {},
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
        if (typeof parsed.currentIndex === 'number' && typeof parsed.score === 'number') {
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

  // Active dataset based on level
  const activeDataset: QuizQuestion[] = useMemo(() => {
    switch (state.level) {
      case 'hsk2':
        return HSK2_VOCAB_DATA;
      case 'all':
        return HSK_COMBINED_VOCAB_DATA;
      case 'hsk1':
      default:
        return HSK1_VOCAB_DATA;
    }
  }, [state.level]);

  const totalQuestions = activeDataset.length;
  const currentQuestion: QuizQuestion | undefined = activeDataset[state.currentIndex];

  // Review mode questions (subset of wrong questions)
  const reviewQuestions = useMemo(() => {
    return activeDataset.filter(q => state.wrongQuestionIds.includes(q.id));
  }, [activeDataset, state.wrongQuestionIds]);

  const currentReviewQuestion: QuizQuestion | undefined =
    reviewQuestions[state.reviewCurrentIndex ?? 0];

  // Change level
  const changeLevel = useCallback((newLevel: QuizLevel) => {
    setLevel(newLevel);
  }, []);

  // Start new quiz
  const startQuiz = useCallback(() => {
    setState(prev => ({
      ...getInitialState(prev.level),
      mode: 'in_progress',
    }));
  }, []);

  // Resume existing quiz
  const resumeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: prev.mode === 'idle' ? 'in_progress' : prev.mode,
    }));
  }, []);

  // Reset quiz for current level
  const resetQuiz = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + state.level);
    } catch (e) {}
    setState(getInitialState(state.level));
  }, [state.level]);

  // Answer or Re-answer a question
  const selectAnswer = useCallback((selectedOption: string) => {
    setState(prev => {
      const q = activeDataset[prev.currentIndex];
      if (!q) return prev;

      const previousAnswer = prev.answers[q.id];
      const isNewCorrect = selectedOption === q.correctAnswer;

      let scoreDelta = 0;
      if (!previousAnswer) {
        // First time answering this question
        scoreDelta = isNewCorrect ? 1 : 0;
      } else {
        // Re-answering already answered question
        if (previousAnswer.selectedAnswer === selectedOption) {
          // Same option clicked, no state change needed
          return prev;
        }
        if (!previousAnswer.isCorrect && isNewCorrect) {
          scoreDelta = 1; // Was wrong, now right: +1 point
        } else if (previousAnswer.isCorrect && !isNewCorrect) {
          scoreDelta = -1; // Was right, now wrong: -1 point
        }
      }

      const newScore = Math.max(0, Math.min(activeDataset.length, prev.score + scoreDelta));

      const newAnswers = {
        ...prev.answers,
        [q.id]: {
          questionId: q.id,
          selectedAnswer: selectedOption,
          isCorrect: isNewCorrect,
          correctAnswer: q.correctAnswer,
          answeredAt: Date.now(),
        },
      };

      const newWrongQuestionIds = isNewCorrect
        ? prev.wrongQuestionIds.filter(id => id !== q.id)
        : prev.wrongQuestionIds.includes(q.id)
        ? prev.wrongQuestionIds
        : [...prev.wrongQuestionIds, q.id];

      return {
        ...prev,
        score: newScore,
        answers: newAnswers,
        wrongQuestionIds: newWrongQuestionIds,
      };
    });
  }, [activeDataset]);

  // Retry/clear answer for a question so user can pick from clean state
  const retryQuestion = useCallback((questionId: number) => {
    setState(prev => {
      const prevAns = prev.answers[questionId];
      if (!prevAns) return prev;

      const newAnswers = { ...prev.answers };
      delete newAnswers[questionId];

      const scoreDelta = prevAns.isCorrect ? -1 : 0;
      return {
        ...prev,
        score: Math.max(0, prev.score + scoreDelta),
        answers: newAnswers,
      };
    });
  }, []);

  // Navigation
  const prevQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIdx = prev.currentIndex + 1;
      if (nextIdx >= activeDataset.length) {
        return {
          ...prev,
          mode: 'completed',
        };
      }
      return {
        ...prev,
        currentIndex: nextIdx,
      };
    });
  }, [activeDataset.length]);

  const jumpToQuestion = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, Math.min(activeDataset.length - 1, index)),
    }));
  }, [activeDataset.length]);

  // Review mode
  const startReviewWrongAnswers = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'reviewing',
      reviewCurrentIndex: 0,
      reviewScore: 0,
      reviewAnswers: {},
    }));
  }, []);

  const selectReviewAnswer = useCallback((selectedOption: string) => {
    setState(prev => {
      const revIdx = prev.reviewCurrentIndex ?? 0;
      const wrongList = activeDataset.filter(q => prev.wrongQuestionIds.includes(q.id));
      const q = wrongList[revIdx];
      if (!q) return prev;

      const currentReviewAnswers = prev.reviewAnswers ?? {};
      const previousReviewAns = currentReviewAnswers[q.id];
      const isCorrect = selectedOption === q.correctAnswer;

      let revScoreDelta = 0;
      if (!previousReviewAns) {
        revScoreDelta = isCorrect ? 1 : 0;
      } else {
        if (previousReviewAns.selectedAnswer === selectedOption) return prev;
        if (!previousReviewAns.isCorrect && isCorrect) revScoreDelta = 1;
        else if (previousReviewAns.isCorrect && !isCorrect) revScoreDelta = -1;
      }

      const newRevScore = Math.max(0, (prev.reviewScore ?? 0) + revScoreDelta);

      // If user answers correctly in review mode, also remove from main wrongQuestionIds!
      const newWrongIds = isCorrect
        ? prev.wrongQuestionIds.filter(id => id !== q.id)
        : prev.wrongQuestionIds;

      return {
        ...prev,
        wrongQuestionIds: newWrongIds,
        reviewScore: newRevScore,
        reviewAnswers: {
          ...currentReviewAnswers,
          [q.id]: {
            questionId: q.id,
            selectedAnswer: selectedOption,
            isCorrect,
            correctAnswer: q.correctAnswer,
          },
        },
      };
    });
  }, [activeDataset]);

  const prevReviewQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      reviewCurrentIndex: Math.max(0, (prev.reviewCurrentIndex ?? 0) - 1),
    }));
  }, []);

  const nextReviewQuestion = useCallback(() => {
    setState(prev => {
      const revIdx = (prev.reviewCurrentIndex ?? 0) + 1;
      const wrongList = activeDataset.filter(q => prev.wrongQuestionIds.includes(q.id));
      if (revIdx >= wrongList.length) {
        return {
          ...prev,
          mode: 'review_completed',
        };
      }
      return {
        ...prev,
        reviewCurrentIndex: revIdx,
      };
    });
  }, [activeDataset]);

  const returnToResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'completed',
    }));
  }, []);

  const answeredCount = Object.keys(state.answers).length;
  const hasSavedProgress = answeredCount > 0 && answeredCount < totalQuestions;

  return {
    isHydrated,
    level: state.level,
    mode: state.mode,
    currentIndex: state.currentIndex,
    totalQuestions,
    score: state.score,
    answers: state.answers,
    wrongQuestionIds: state.wrongQuestionIds,
    currentQuestion,
    currentUserAnswer: currentQuestion ? state.answers[currentQuestion.id] : undefined,
    answeredCount,
    hasSavedProgress,
    activeDataset,
    // Review mode
    reviewQuestions,
    reviewCurrentIndex: state.reviewCurrentIndex ?? 0,
    reviewScore: state.reviewScore ?? 0,
    currentReviewQuestion,
    currentReviewAnswer: currentReviewQuestion
      ? (state.reviewAnswers ?? {})[currentReviewQuestion.id]
      : undefined,
    reviewAnsweredCount: Object.keys(state.reviewAnswers ?? {}).length,
    // Actions
    changeLevel,
    startQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    retryQuestion,
    prevQuestion,
    nextQuestion,
    jumpToQuestion,
    startReviewWrongAnswers,
    selectReviewAnswer,
    prevReviewQuestion,
    nextReviewQuestion,
    returnToResults,
    setMode: (mode: QuizMode) => setState(prev => ({ ...prev, mode })),
  };
}
