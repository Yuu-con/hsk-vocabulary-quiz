'use client';

import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizHeader } from '@/components/QuizHeader';
import { QuizCard } from '@/components/QuizCard';
import { StartScreen } from '@/components/StartScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { RoundTransitionScreen } from '@/components/RoundTransitionScreen';
import { QuestionNavigatorModal } from '@/components/QuestionNavigatorModal';

export default function HomePage() {
  const {
    isHydrated,
    level,
    round,
    initialFirstRoundScore,
    mode,
    currentIndex,
    totalQuestionsInRound,
    totalFullQuestions,
    score,
    currentRoundAnswers,
    currentRoundWrongIds,
    currentQuestion,
    currentUserAnswer,
    answeredCountInRound,
    hasSavedProgress,
    activeRoundQuestions,
    changeLevel,
    startQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    startNextRound,
    setMode,
  } = useQuiz('hsk1');

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  // Avoid flash during SSR hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-bounce">🇨🇳</div>
          <div className="text-slate-600 font-semibold text-sm">Đang tải HSK Quiz...</div>
        </div>
      </div>
    );
  }

  const handleConfirmReset = () => {
    resetQuiz();
    setShowResetConfirm(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-100 animate-pop-in text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Bắt đầu lại từ đầu?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Toàn bộ tiến độ của cấp độ {level.toUpperCase()} sẽ bị xóa và bạn sẽ làm lại từ Vòng 1.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm shadow-md transition"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Navigator Modal */}
      <QuestionNavigatorModal
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        questions={activeRoundQuestions}
        currentIndex={currentIndex}
        answers={currentRoundAnswers}
        wrongQuestionIds={currentRoundWrongIds}
        onSelectQuestion={(idx) => {
          jumpToQuestion(idx);
        }}
      />

      {/* Screen Views based on Quiz Mode */}
      <div className="w-full flex-1 flex flex-col">
        {mode === 'idle' && (
          <StartScreen
            currentLevel={level}
            onChangeLevel={changeLevel}
            onStartQuiz={startQuiz}
            onResumeQuiz={hasSavedProgress ? resumeQuiz : undefined}
            onResetQuiz={() => (hasSavedProgress ? setShowResetConfirm(true) : resetQuiz())}
            hasSavedProgress={hasSavedProgress}
            savedIndex={currentIndex}
            savedScore={score}
            totalQuestions={totalFullQuestions}
            round={round}
          />
        )}

        {mode === 'in_progress' && currentQuestion && (
          <>
            <QuizHeader
              level={level}
              round={round}
              currentIndex={currentIndex}
              totalQuestions={totalQuestionsInRound}
              score={score}
              answeredCount={answeredCountInRound}
              onReset={() => setShowResetConfirm(true)}
              onGoHome={() => setMode('idle')}
              onOpenNavigator={() => setIsNavigatorOpen(true)}
            />

            <div className="flex-1 flex items-center justify-center">
              <QuizCard
                question={currentQuestion}
                questionIndex={currentIndex}
                totalQuestions={totalQuestionsInRound}
                round={round}
                userAnswer={currentUserAnswer}
                onSelectAnswer={selectAnswer}
                onPrevQuestion={prevQuestion}
                onNextQuestion={nextQuestion}
                isLastQuestion={currentIndex === totalQuestionsInRound - 1}
              />
            </div>
          </>
        )}

        {/* Transition Screen: Round finished with some wrong questions */}
        {mode === 'round_completed' && (
          <div className="flex-1 flex items-center justify-center">
            <RoundTransitionScreen
              currentRound={round}
              totalInRound={totalQuestionsInRound}
              wrongCount={currentRoundWrongIds.length}
              onStartNextRound={startNextRound}
              onRestartAll={() => setShowResetConfirm(true)}
            />
          </div>
        )}

        {/* 100% Mastery Achieved! */}
        {mode === 'mastery_completed' && (
          <div className="flex-1 flex items-center justify-center">
            <ResultScreen
              level={level}
              totalQuestions={totalFullQuestions}
              initialScore={initialFirstRoundScore}
              totalRounds={round}
              onRestart={startQuiz}
              onGoHome={() => setMode('idle')}
            />
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200/50 mt-auto">
        <p>HSK Vocabulary Quiz · Luyện thi và thuộc 100% từ vựng HSK 1 & HSK 2 chuẩn HSK 2.0</p>
      </footer>
    </main>
  );
}
