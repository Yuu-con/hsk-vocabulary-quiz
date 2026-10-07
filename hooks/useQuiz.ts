'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizProgress, QuizMode, UserAnswerRecord } from '@/types/quiz';
import { HSK1_VOCAB_DATA } from '@/data/hsk1-data';

const STORAGE_KEY = 'hsk1_vocab_quiz_progress_v2';

const INITIAL_STATE: QuizProgress = {
  currentIndex: 0,
  score: 0,
  answers: {},
  wrongQuestionIds: [],
  mode: 'idle',
  reviewCurrentIndex: 0,
  reviewScore: 0,
  reviewAnswers: {},
};

export function useQuiz() {
  const [state, setState] = useState<QuizProgress>(INITIAL_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as QuizProgress;
        // Basic schema check
        if (typeof parsed.currentIndex === 'number' && typeof parsed.score === 'number') {
          setState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load quiz progress from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save quiz progress to localStorage', e);
    }
  }, [state, isHydrated]);

  // Questions definitions
  const totalQuestions = HSK1_VOCAB_DATA.length;
  const currentQuestion: QuizQuestion | undefined = HSK1_VOCAB_DATA[state.currentIndex];

  // Review mode questions: filtered from main data preserving order
  const reviewQuestions = useMemo(() => {
    return HSK1_VOCAB_DATA.filter(q => state.wrongQuestionIds.includes(q.id));
  }, [state.wrongQuestionIds]);

  const currentReviewQuestion: QuizQuestion | undefined = 
    reviewQuestions[state.reviewCurrentIndex ?? 0];

  // Start new quiz
  const startQuiz = useCallback(() => {
    setState({
      currentIndex: 0,
      score: 0,
      answers: {},
      wrongQuestionIds: [],
      mode: 'in_progress',
      reviewCurrentIndex: 0,
      reviewScore: 0,
      reviewAnswers: {},
    });
  }, []);

  // Resume existing quiz
  const resumeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: prev.mode === 'idle' ? 'in_progress' : prev.mode,
    }));
  }, []);

  // Reset all progress
  const resetQuiz = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setState(INITIAL_STATE);
  }, []);

  // Answer a question in main quiz mode
  const selectAnswer = useCallback((selectedOption: string) => {
    setState(prev => {
      const q = HSK1_VOCAB_DATA[prev.currentIndex];
      if (!q) return prev;

      // Prevent answering if already answered
      if (prev.answers[q.id]) {
        return prev;
      }

      const isCorrect = selectedOption === q.correctAnswer;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newAnswers = {
        ...prev.answers,
        [q.id]: {
          questionId: q.id,
          selectedAnswer: selectedOption,
          isCorrect,
          correctAnswer: q.correctAnswer,
        },
      };

      const newWrongQuestionIds = isCorrect
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
  }, []);

  // Advance to next question in main quiz
  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIdx = prev.currentIndex + 1;
      if (nextIdx >= HSK1_VOCAB_DATA.length) {
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
  }, []);

  // Start reviewing wrong answers
  const startReviewWrongAnswers = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'reviewing',
      reviewCurrentIndex: 0,
      reviewScore: 0,
      reviewAnswers: {},
    }));
  }, []);

  // Answer a question in review mode
  const selectReviewAnswer = useCallback((selectedOption: string) => {
    setState(prev => {
      const revIdx = prev.reviewCurrentIndex ?? 0;
      const wrongList = HSK1_VOCAB_DATA.filter(q => prev.wrongQuestionIds.includes(q.id));
      const q = wrongList[revIdx];
      if (!q) return prev;

      const currentReviewAnswers = prev.reviewAnswers ?? {};
      if (currentReviewAnswers[q.id]) {
        return prev;
      }

      const isCorrect = selectedOption === q.correctAnswer;
      const currentRevScore = prev.reviewScore ?? 0;
      const newRevScore = isCorrect ? currentRevScore + 1 : currentRevScore;

      return {
        ...prev,
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
  }, []);

  // Advance to next question in review mode
  const nextReviewQuestion = useCallback(() => {
    setState(prev => {
      const revIdx = (prev.reviewCurrentIndex ?? 0) + 1;
      const wrongList = HSK1_VOCAB_DATA.filter(q => prev.wrongQuestionIds.includes(q.id));
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
  }, []);

  // Return to result screen from review mode
  const returnToResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'completed',
    }));
  }, []);

  // Helper getters
  const answeredCount = Object.keys(state.answers).length;
  const hasSavedProgress = answeredCount > 0 && answeredCount < totalQuestions;

  return {
    isHydrated,
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
    // Review mode properties
    reviewQuestions,
    reviewCurrentIndex: state.reviewCurrentIndex ?? 0,
    reviewScore: state.reviewScore ?? 0,
    currentReviewQuestion,
    currentReviewAnswer: currentReviewQuestion
      ? (state.reviewAnswers ?? {})[currentReviewQuestion.id]
      : undefined,
    reviewAnsweredCount: Object.keys(state.reviewAnswers ?? {}).length,
    // Actions
    startQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    nextQuestion,
    startReviewWrongAnswers,
    selectReviewAnswer,
    nextReviewQuestion,
    returnToResults,
    setMode: (mode: QuizMode) => setState(prev => ({ ...prev, mode })),
  };
}
