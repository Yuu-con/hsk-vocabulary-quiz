import { QuizLevel, QuizQuestion, UserAnswerRecord, QuizMode, QuizProgress } from './quiz';

export type PracticeTab = 'quiz' | 'vocab' | 'sentences' | 'listening' | 'reading';

export interface VocabTopicItem {
  id: number;
  topicId: number;
  topicTitle: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  note?: string;
}

export interface VocabLessonItem {
  id: number;
  level: 'hsk1' | 'hsk2';
  lesson: number;
  lessonTitle: string;
  stt: string;
  hanzi: string;
  pinyin: string;
  wordType: string;
  meaning: string;
}

export interface CompoundPhraseItem {
  id: number;
  sectionId: number;
  section: string;
  phrase: string;
  pinyin: string;
  meaning: string;
  contextChinese: string;
  contextPinyin: string;
  contextVietnamese: string;
}

export interface SentencePattern {
  id: number;
  category: string;
  level: 'hsk1' | 'hsk2' | 'both';
  chinese: string;
  pinyin: string;
  vietnamese: string;
  grammar: string;
  keyVocab: { word: string; pinyin: string; meaning: string }[];
  quizMeaning: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  quizFill: {
    question: string; // e.g. "你叫___名字？"
    questionPinyin?: string; // e.g. "Nǐ jiào ____ míngzi?"
    options: string[];
    optionsWithPinyin?: { word: string; pinyin: string; meaning?: string }[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface DialogueLine {
  speaker: string; // e.g. "A", "B", "Tiểu Vương", "Lý Lão Sư"
  chinese: string;
  pinyin: string;
  vietnamese: string;
}

export interface DialogueQuiz {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Dialogue {
  id: number;
  title: string;
  category: string;
  level: 'hsk1' | 'hsk2';
  description: string;
  lines: DialogueLine[];
  keyVocab: { word: string; pinyin: string; meaning: string }[];
  grammarNotes: string[];
  quizzes: DialogueQuiz[];
}

export interface DialogueProgress {
  userTranslation: string;
  isCompleted: boolean;
  quizScore?: number;
  quizAnswers?: Record<number, string>;
}
