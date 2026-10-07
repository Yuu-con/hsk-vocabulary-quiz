import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { HSK2_VOCAB_DATA } from '../data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '../data/hsk-combined-data';
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
  const hanziSet = new Set<string>();
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

    if (name !== 'HSK 1+2' && hanziSet.has(q.hanzi)) {
      errors.push(`[${name}] Duplicate vocabulary found for hanzi: ${q.hanzi}`);
    }
    hanziSet.add(q.hanzi);
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

function runAllValidation() {
  const v1 = validateDataset('HSK 1', HSK1_VOCAB_DATA, 150);
  const v2 = validateDataset('HSK 2', HSK2_VOCAB_DATA, 150);
  const v3 = validateDataset('HSK 1+2', HSK_COMBINED_VOCAB_DATA, 300);

  if (!v1 || !v2 || !v3) {
    process.exit(1);
  }
  console.log('\n🎉 ALL DATASETS (HSK 1, HSK 2, HSK 1+2 COMBINED) PASSED VALIDATION!\n');
}

runAllValidation();
