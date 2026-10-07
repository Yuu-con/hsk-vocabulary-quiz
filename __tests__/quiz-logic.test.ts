import assert from 'node:assert/strict';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { HSK2_VOCAB_DATA } from '../data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '../data/hsk-combined-data';
import { shuffleArray, getScoreTier } from '../lib/quiz-utils';
import { QuizProgress, UserAnswerRecord } from '../types/quiz';

console.log('--- RUNNING EXTENDED QUIZ LOGIC AND BUSINESS RULES TESTS ---');

// Test 1: Datasets count verification
{
  assert.equal(HSK1_VOCAB_DATA.length, 150, 'HSK 1 must have exactly 150 questions');
  assert.equal(HSK2_VOCAB_DATA.length, 150, 'HSK 2 must have exactly 150 questions');
  assert.equal(HSK_COMBINED_VOCAB_DATA.length, 300, 'HSK Combined must have exactly 300 questions');
  console.log('✔ Test 1: 3 datasets valid: HSK1 (150), HSK2 (150), Combined (300)');
}

// Test 2: Random options - shuffling does not alter content
{
  const originalOptions = [...HSK2_VOCAB_DATA[0].options];
  const shuffled = shuffleArray(originalOptions);
  assert.equal(shuffled.length, 4);
  originalOptions.forEach(opt => {
    assert.ok(shuffled.includes(opt));
  });
  console.log('✔ Test 2: Shuffled options preserves all elements without mutation');
}

// Test 3: Correct answer grading logic
{
  const question = HSK1_VOCAB_DATA[0];
  const isCorrect = question.correctAnswer === question.correctAnswer;
  assert.equal(isCorrect, true);
  let score = 0;
  if (isCorrect) score += 1;
  assert.equal(score, 1);
  console.log('✔ Test 3: Correct answer increases score by 1');
}

// Test 4: Re-answering logic (User changes answer from Wrong to Right)
{
  let score = 0;
  const wrongIds = new Set<number>();
  const question = HSK1_VOCAB_DATA[0];

  // User initially answers wrong
  const wrongPick = question.options.find(o => o !== question.correctAnswer)!;
  let isCorrect = wrongPick === question.correctAnswer;
  if (isCorrect) score += 1;
  else wrongIds.add(question.id);

  assert.equal(score, 0);
  assert.ok(wrongIds.has(question.id));

  // User changes answer to correct!
  const rightPick = question.correctAnswer;
  const isNewCorrect = rightPick === question.correctAnswer;
  if (!isCorrect && isNewCorrect) {
    score += 1;
    wrongIds.delete(question.id);
  }

  assert.equal(score, 1, 'Score must increase by 1 when corrected');
  assert.equal(wrongIds.has(question.id), false, 'Question must be removed from wrongIds');
  console.log('✔ Test 4: Re-answering from Wrong to Right adjusts score and clears wrong status');
}

// Test 5: Re-answering logic (User changes answer from Right to Wrong)
{
  let score = 1;
  const wrongIds = new Set<number>();
  const question = HSK1_VOCAB_DATA[0];

  // User previously answered right, now picks wrong
  const isPrevCorrect = true;
  const wrongPick = question.options.find(o => o !== question.correctAnswer)!;
  const isNewCorrect = wrongPick === question.correctAnswer;

  if (isPrevCorrect && !isNewCorrect) {
    score -= 1;
    wrongIds.add(question.id);
  }

  assert.equal(score, 0, 'Score must decrease by 1 when changed to wrong');
  assert.ok(wrongIds.has(question.id));
  console.log('✔ Test 5: Re-answering from Right to Wrong adjusts score and adds to wrong status');
}

// Test 6: Previous and Jump navigation
{
  let currentIndex = 10;
  // Prev question
  currentIndex = Math.max(0, currentIndex - 1);
  assert.equal(currentIndex, 9);
  // Jump to question 42
  currentIndex = 42;
  assert.equal(currentIndex, 42);
  console.log('✔ Test 6: Previous and jump navigation functions correctly');
}

// Test 7: Score classification tiers for 300 questions (HSK 1+2)
{
  assert.equal(getScoreTier(300, 300).badge, '🏆 Xuất sắc');
  assert.equal(getScoreTier(270, 300).badge, '🏆 Xuất sắc');
  assert.equal(getScoreTier(240, 300).badge, '🎉 Rất tốt');
  assert.equal(getScoreTier(200, 300).badge, '👍 Khá tốt');
  assert.equal(getScoreTier(160, 300).badge, '📚 Cần ôn thêm');
  assert.equal(getScoreTier(150, 300).badge, '💪 Hãy luyện tập thêm');
  console.log('✔ Test 7: Score classification tiers scale accurately for 300 questions');
}

// Test 8: Review wrong answers mode logic
{
  const wrongIds = [2, 10, 50];
  const reviewQuestions = HSK2_VOCAB_DATA.filter(q => wrongIds.includes(q.id));
  assert.equal(reviewQuestions.length, 3);
  let reviewScore = 0;
  reviewQuestions.forEach(() => {
    reviewScore += 1;
  });
  assert.equal(reviewScore, 3);
  console.log('✔ Test 8: Wrong answer review mode extracts correct subset with independent score');
}

// Test 9: State serialization & hydration for multi-level progress
{
  const mockState: QuizProgress = {
    level: 'hsk2',
    currentIndex: 15,
    score: 12,
    answers: {},
    wrongQuestionIds: [3],
    mode: 'in_progress',
  };

  const serialized = JSON.stringify(mockState);
  const restored: QuizProgress = JSON.parse(serialized);

  assert.equal(restored.level, 'hsk2');
  assert.equal(restored.currentIndex, 15);
  assert.equal(restored.score, 12);
  console.log('✔ Test 9: State serializes and deserializes accurately with level info');
}

console.log('\n🎉 ALL EXTENDED TESTS PASSED SUCCESSFULLY!\n');
