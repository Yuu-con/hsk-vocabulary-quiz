import { QuizLevel, QuizQuestion } from '@/types/quiz';

export interface QuestionOverride {
  correctAnswer: string;
  options: string[];
  explanation?: string;
  updatedAt: number;
}

const STORAGE_KEY_OVERRIDES = 'hsk_custom_vocab_overrides_v1';

export function getVocabOverrides(): Record<string, QuestionOverride> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}
  return {};
}

function getOverrideKey(level: QuizLevel, questionId: number, hanzi?: string): string {
  if (hanzi) {
    return `hanzi_${hanzi}`;
  }
  return `${level}_${questionId}`;
}

export function saveQuestionOverride(
  level: QuizLevel,
  question: QuizQuestion,
  newCorrectAnswer: string,
  newExplanation?: string
): QuestionOverride {
  const overrides = getVocabOverrides();
  const key = getOverrideKey(level, question.id, question.hanzi);

  const cleanNewAns = newCorrectAnswer.trim();

  // Replace old correct answer with new one in options
  let updatedOptions = [...question.options];
  const oldIdx = updatedOptions.findIndex(o => o === question.correctAnswer);
  if (oldIdx >= 0) {
    updatedOptions[oldIdx] = cleanNewAns;
  } else {
    updatedOptions[0] = cleanNewAns;
  }

  const record: QuestionOverride = {
    correctAnswer: cleanNewAns,
    options: updatedOptions,
    explanation: newExplanation !== undefined ? newExplanation.trim() : question.explanation,
    updatedAt: Date.now(),
  };

  overrides[key] = record;
  overrides[`id_${question.id}`] = record;

  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    window.dispatchEvent(new Event('hsk_vocab_overrides_updated'));
  } catch (e) {
    console.error('Failed to save override', e);
  }

  return record;
}

export function removeQuestionOverride(level: QuizLevel, question: QuizQuestion) {
  const overrides = getVocabOverrides();
  const key = getOverrideKey(level, question.id, question.hanzi);
  delete overrides[key];
  delete overrides[`id_${question.id}`];

  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    window.dispatchEvent(new Event('hsk_vocab_overrides_updated'));
  } catch (e) {}
}

export function hasQuestionOverride(level: QuizLevel, question: QuizQuestion): boolean {
  const overrides = getVocabOverrides();
  const key = getOverrideKey(level, question.id, question.hanzi);
  return !!(overrides[key] || overrides[`id_${question.id}`]);
}

export function applyOverridesToQuestion(level: QuizLevel, q: QuizQuestion): QuizQuestion {
  const overrides = getVocabOverrides();
  const key = getOverrideKey(level, q.id, q.hanzi);
  const override = overrides[key] || overrides[`id_${q.id}`];

  if (override) {
    return {
      ...q,
      correctAnswer: override.correctAnswer,
      options: override.options && override.options.length === 4 ? override.options : q.options,
      explanation: override.explanation || q.explanation,
    };
  }
  return q;
}

export function applyOverridesToDataset(level: QuizLevel, dataset: QuizQuestion[]): QuizQuestion[] {
  const overrides = getVocabOverrides();
  if (Object.keys(overrides).length === 0) return dataset;

  return dataset.map(q => {
    const key = getOverrideKey(level, q.id, q.hanzi);
    const override = overrides[key] || overrides[`id_${q.id}`];
    if (override) {
      return {
        ...q,
        correctAnswer: override.correctAnswer,
        options: override.options && override.options.length === 4 ? override.options : q.options,
        explanation: override.explanation || q.explanation,
      };
    }
    return q;
  });
}
