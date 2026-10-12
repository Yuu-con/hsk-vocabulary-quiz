import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { HSK2_VOCAB_DATA } from '../data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '../data/hsk-combined-data';
import { COMPOUND_QUIZ_DATA, COMPOUND_PHRASES_DATA } from '../data/compound-sentences-data';
import { VOCAB_TOPIC_DATA, VOCAB_TOPIC_CATEGORIES } from '../data/vocab-study-topic-data';
import { VOCAB_LESSON_DATA } from '../data/vocab-study-lesson-data';
import { HSK_SENTENCE_PATTERNS } from '../data/hsk-sentences-data';
import { HSK_DIALOGUES } from '../data/hsk-dialogues-data';
import { QuizQuestion } from '../types/quiz';

function validateDataset(name: string, data: QuizQuestion[], expectedCount: number) {
  const errors: string[] = [];

  // 1. Total count
  if (data.length !== expectedCount) {
    errors.push(`[${name}] Expected ${expectedCount} items, but got ${data.length}`);
  }

  // 2. ID check
  const idSet = new Set<number>();
  for (let i = 1; i <= expectedCount; i++) {
    const item = data.find(q => q.id === i);
    if (!item) {
      errors.push(`[${name}] Missing question with id=${i}`);
    } else if (idSet.has(item.id)) {
      errors.push(`[${name}] Duplicate question with id=${item.id}`);
    } else {
      idSet.add(item.id);
    }
  }

  // 3. Hanzi, Pinyin, Options, and CorrectAnswer
  data.forEach((q, idx) => {
    if (!q.hanzi || q.hanzi.trim() === '') {
      errors.push(`[${name}] Item ${idx + 1} has empty hanzi`);
    }
    if (!q.pinyin || q.pinyin.trim() === '') {
      errors.push(`[${name}] Item ${idx + 1} (${q.hanzi}) has empty pinyin`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`[${name}] Item ${q.id} (${q.hanzi}) does not have exactly 4 options`);
    } else {
      const uniqueOptions = new Set(q.options);
      if (uniqueOptions.size !== 4) {
        errors.push(`[${name}] Item ${q.id} (${q.hanzi}) has duplicate options: ${q.options.join(', ')}`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        errors.push(`[${name}] Item ${q.id} (${q.hanzi}): correctAnswer '${q.correctAnswer}' is NOT in options!`);
      }
    }

    if (!q.explanation || q.explanation.trim() === '') {
      errors.push(`[${name}] Item ${q.id} (${q.hanzi}) has empty explanation`);
    }
  });

  if (errors.length > 0) {
    console.error(`❌ [${name}] Validation FAILED:`);
    errors.forEach(err => console.error('  - ' + err));
    return false;
  } else {
    console.log(`✅ [${name}] Passed all checks (${data.length}/${expectedCount} questions valid)`);
    return true;
  }
}

function validateVocabStudyData(): boolean {
  const errors: string[] = [];

  if (VOCAB_TOPIC_DATA.length !== 163) {
    errors.push(`Expected 163 topic vocab items, got ${VOCAB_TOPIC_DATA.length}`);
  }
  if (VOCAB_TOPIC_CATEGORIES.length !== 14) {
    errors.push(`Expected 14 topic categories, got ${VOCAB_TOPIC_CATEGORIES.length}`);
  }
  if (VOCAB_LESSON_DATA.length !== 327) {
    errors.push(`Expected 327 lesson vocab items, got ${VOCAB_LESSON_DATA.length}`);
  }
  if (COMPOUND_PHRASES_DATA.length !== 77) {
    errors.push(`Expected 77 compound phrases, got ${COMPOUND_PHRASES_DATA.length}`);
  }

  VOCAB_TOPIC_DATA.forEach(item => {
    if (!item.hanzi || !item.pinyin || !item.meaning || !item.topicTitle) {
      errors.push(`Topic item ${item.id} has missing required field`);
    }
  });

  VOCAB_LESSON_DATA.forEach(item => {
    if (!item.hanzi || !item.pinyin || !item.meaning || !item.lessonTitle) {
      errors.push(`Lesson item ${item.id} has missing required field`);
    }
  });

  COMPOUND_PHRASES_DATA.forEach(item => {
    if (!item.phrase || !item.pinyin || !item.meaning || !item.contextChinese) {
      errors.push(`Compound item ${item.id} has missing required field`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ [Vocab Study Data] FAILED:', errors);
    return false;
  }
  console.log(`✅ [Vocab Study Data] Passed (161 topics in 14 categories, 327 lesson items, 77 compound phrases)`);
  return true;
}

function validateSentences(): boolean {
  const errors: string[] = [];
  if (HSK_SENTENCE_PATTERNS.length < 50) {
    errors.push(`Expected at least 50 sentence patterns, but got ${HSK_SENTENCE_PATTERNS.length}`);
  }

  HSK_SENTENCE_PATTERNS.forEach((s) => {
    if (!s.chinese || !s.pinyin || !s.vietnamese || !s.grammar) {
      errors.push(`Sentence id ${s.id} has missing required field`);
    }
    if (s.quizMeaning.options.length !== 4 || !s.quizMeaning.options.includes(s.quizMeaning.correctAnswer)) {
      errors.push(`Sentence id ${s.id} quizMeaning invalid options`);
    }
    if (s.quizFill.options.length !== 4 || !s.quizFill.options.includes(s.quizFill.correctAnswer)) {
      errors.push(`Sentence id ${s.id} quizFill invalid options`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ [HSK Sentences] FAILED:', errors);
    return false;
  }
  console.log(`✅ [HSK Sentences] Passed (${HSK_SENTENCE_PATTERNS.length} patterns valid, >= 50 required)`);
  return true;
}

function validateDialogues(): boolean {
  const errors: string[] = [];
  if (HSK_DIALOGUES.length < 20) {
    errors.push(`Expected at least 20 dialogues, but got ${HSK_DIALOGUES.length}`);
  }

  HSK_DIALOGUES.forEach((d) => {
    if (!d.title || d.lines.length < 3 || d.quizzes.length < 2) {
      errors.push(`Dialogue id ${d.id} has incomplete lines or quizzes`);
    }
    d.quizzes.forEach((q, idx) => {
      if (q.options.length !== 4 || !q.options.includes(q.correctAnswer)) {
        errors.push(`Dialogue id ${d.id} quiz ${idx + 1} invalid options`);
      }
    });
  });

  if (errors.length > 0) {
    console.error('❌ [HSK Dialogues] FAILED:', errors);
    return false;
  }
  console.log(`✅ [HSK Dialogues] Passed (${HSK_DIALOGUES.length} dialogues valid, >= 20 required)`);
  return true;
}

function runAllValidation() {
  const v1 = validateDataset('HSK 1', HSK1_VOCAB_DATA, 163);
  const v2 = validateDataset('HSK 2', HSK2_VOCAB_DATA, 165);
  const v3 = validateDataset('HSK 1+2', HSK_COMBINED_VOCAB_DATA, 328);
  const v4 = validateDataset('Compound Quiz', COMPOUND_QUIZ_DATA, 77);
  const v5 = validateVocabStudyData();
  const v6 = validateSentences();
  const v7 = validateDialogues();

  if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
    process.exit(1);
  }
  console.log('\n🎉 ALL DATASETS (HSK 1, HSK 2, HSK 1+2, COMPOUND QUIZ, VOCAB STUDY, SENTENCES, DIALOGUES) PASSED VALIDATION!\n');
}

runAllValidation();
