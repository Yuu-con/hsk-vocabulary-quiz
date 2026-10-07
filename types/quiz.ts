export type QuizLevel = 'hsk1' | 'hsk2' | 'all';

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
  answeredAt?: number;
}

export type QuizMode = 'idle' | 'in_progress' | 'completed' | 'reviewing' | 'review_completed';

export interface QuizProgress {
  level: QuizLevel;
  currentIndex: number;
  score: number;
  answers: Record<number, UserAnswerRecord>;
  wrongQuestionIds: number[];
  mode: QuizMode;
  reviewCurrentIndex?: number;
  reviewScore?: number;
  reviewAnswers?: Record<number, UserAnswerRecord>;
}
