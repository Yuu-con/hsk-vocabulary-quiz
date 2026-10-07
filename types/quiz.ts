export interface QuizQuestion {
  id: number;
  hanzi: string;
  pinyin: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface UserAnswerRecord {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export type QuizMode = 'idle' | 'in_progress' | 'completed' | 'reviewing' | 'review_completed';

export interface QuizProgress {
  currentIndex: number;
  score: number;
  answers: Record<number, UserAnswerRecord>;
  wrongQuestionIds: number[];
  mode: QuizMode;
  reviewCurrentIndex?: number;
  reviewScore?: number;
  reviewAnswers?: Record<number, UserAnswerRecord>;
}
