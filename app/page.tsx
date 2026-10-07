'use client';

import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizHeader } from '@/components/QuizHeader';
import { QuizCard } from '@/components/QuizCard';
import { StartScreen } from '@/components/StartScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { ReviewFinishedScreen } from '@/components/ReviewFinishedScreen';

export default function HomePage() {
  const {
    isHydrated,
    mode,
    currentIndex,
    totalQuestions,
    score,
    answeredCount,
    hasSavedProgress,
    currentQuestion,
    currentUserAnswer,
    wrongQuestionIds,
    startQuiz,
    resumeQuiz,
    resetQuiz,
    selectAnswer,
    nextQuestion,
    // Review mode
    reviewQuestions,
    reviewCurrentIndex,
    reviewScore,
    currentReviewQuestion,
    currentReviewAnswer,
    startReviewWrongAnswers,
    selectReviewAnswer,
    nextReviewQuestion,
    returnToResults,
    setMode,
  } = useQuiz();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Avoid flash during SSR hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-bounce">🇨🇳</div>
          <div className="text-slate-600 font-semibold text-sm">Đang tải HSK 1 Quiz...</div>
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
              Toàn bộ tiến độ {answeredCount > 0 ? `(${answeredCount} câu đã làm, ${score} điểm)` : ''} sẽ bị xóa và bạn sẽ làm lại từ câu 1.
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

      {/* Screen Views based on Quiz Mode */}
      <div className="w-full flex-1 flex flex-col">
        {mode === 'idle' && (
          <StartScreen
            onStartQuiz={startQuiz}
            onResumeQuiz={hasSavedProgress ? resumeQuiz : undefined}
            onResetQuiz={() => (hasSavedProgress ? setShowResetConfirm(true) : resetQuiz())}
            hasSavedProgress={hasSavedProgress}
            savedIndex={currentIndex}
            savedScore={score}
          />
        )}

        {mode === 'in_progress' && currentQuestion && (
          <>
            <QuizHeader
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              score={score}
              answeredCount={answeredCount}
              onReset={() => setShowResetConfirm(true)}
              onGoHome={() => setMode('idle')}
            />

            <div className="flex-1 flex items-center justify-center">
              <QuizCard
                question={currentQuestion}
                questionIndex={currentIndex}
                totalQuestions={totalQuestions}
                userAnswer={currentUserAnswer}
                onSelectAnswer={selectAnswer}
                onNextQuestion={nextQuestion}
                isLastQuestion={currentIndex === totalQuestions - 1}
              />
            </div>
          </>
        )}

        {mode === 'completed' && (
          <>
            <QuizHeader
              currentIndex={totalQuestions - 1}
              totalQuestions={totalQuestions}
              score={score}
              answeredCount={totalQuestions}
              onReset={() => setShowResetConfirm(true)}
              onGoHome={() => setMode('idle')}
            />

            <div className="flex-1 flex items-center justify-center">
              <ResultScreen
                score={score}
                totalQuestions={totalQuestions}
                wrongCount={wrongQuestionIds.length}
                onRestart={() => setShowResetConfirm(true)}
                onReviewWrongAnswers={startReviewWrongAnswers}
              />
            </div>
          </>
        )}

        {mode === 'reviewing' && currentReviewQuestion && (
          <>
            <QuizHeader
              currentIndex={reviewCurrentIndex}
              totalQuestions={reviewQuestions.length}
              score={reviewScore}
              answeredCount={reviewCurrentIndex}
              isReviewMode={true}
              onReset={() => setShowResetConfirm(true)}
              onGoHome={returnToResults}
            />

            <div className="flex-1 flex items-center justify-center">
              <QuizCard
                question={currentReviewQuestion}
                questionIndex={reviewCurrentIndex}
                totalQuestions={reviewQuestions.length}
                userAnswer={currentReviewAnswer}
                onSelectAnswer={selectReviewAnswer}
                onNextQuestion={nextReviewQuestion}
                isLastQuestion={reviewCurrentIndex === reviewQuestions.length - 1}
              />
            </div>
          </>
        )}

        {mode === 'review_completed' && (
          <div className="flex-1 flex items-center justify-center">
            <ReviewFinishedScreen
              reviewedCount={reviewQuestions.length}
              reviewScore={reviewScore}
              onReturnToResults={returnToResults}
              onRestartAll={() => setShowResetConfirm(true)}
            />
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200/50 mt-auto">
        <p>HSK 1 Vocabulary Quiz (150 từ - HSK 2.0 chuẩn) · Học tiếng Trung mỗi ngày</p>
      </footer>
    </main>
  );
}
