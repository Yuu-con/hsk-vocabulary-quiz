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

export type QuizMode = 'idle' | 'in_progress' | 'round_completed' | 'mastery_completed';

export interface QuizProgress {
  level: QuizLevel;
  round: number; // 1, 2, 3...
  initialFirstRoundScore: number; // Score from initial round
  activeQuestionIds: number[]; // Questions for current round
  currentIndex: number;
  score: number;
  currentRoundAnswers: Record<number, UserAnswerRecord>;
  currentRoundWrongIds: number[];
  mode: QuizMode;
}
