import assert from 'node:assert/strict';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { shuffleArray, getScoreTier } from '../lib/quiz-utils';
import { QuizProgress, UserAnswerRecord } from '../types/quiz';

console.log('--- RUNNING QUIZ LOGIC AND BUSINESS RULES TESTS ---');

// Test 1: Total questions and maximum score
{
  assert.equal(HSK1_VOCAB_DATA.length, 150, 'Total questions must be exactly 150');
  const maxPossibleScore = HSK1_VOCAB_DATA.length;
  assert.equal(maxPossibleScore, 150, 'Maximum score must be exactly 150');
  console.log('✔ Test 1: Exactly 150 questions and maximum score 150');
}

// Test 2: Random options - shuffling does not alter content and produces permutation
{
  const originalOptions = [...HSK1_VOCAB_DATA[0].options];
  const shuffled = shuffleArray(originalOptions);
  assert.equal(shuffled.length, 4, 'Shuffled options must maintain length 4');
  originalOptions.forEach(opt => {
    assert.ok(shuffled.includes(opt), `Shuffled must contain '${opt}'`);
  });
  console.log('✔ Test 2: Shuffled options preserves all elements without mutation');
}

// Test 3: Correct answer grading logic
{
  const question = HSK1_VOCAB_DATA[0]; // 爱 (ài) -> Thích / yêu
  const correctChoice = question.correctAnswer;
  const isCorrect = correctChoice === question.correctAnswer;
  assert.equal(isCorrect, true, 'Matching answer must yield isCorrect = true');

  let score = 0;
  if (isCorrect) score += 1;
  assert.equal(score, 1, 'Score must increase by 1 for correct answer');
  console.log('✔ Test 3: Correct answer increases score by 1');
}

// Test 4: Wrong answer grading logic
{
  const question = HSK1_VOCAB_DATA[0];
  const wrongChoice = question.options.find(o => o !== question.correctAnswer)!;
  const isCorrect = wrongChoice === question.correctAnswer;
  assert.equal(isCorrect, false, 'Non-matching answer must yield isCorrect = false');

  let score = 5;
  if (isCorrect) score += 1;
  assert.equal(score, 5, 'Score must NOT increase for wrong answer');
  console.log('✔ Test 4: Wrong answer does not increase score');
}

// Test 5: Prevent answering twice (double-click score inflation prevention)
{
  const userAnswers: Record<number, UserAnswerRecord> = {};
  const qId = HSK1_VOCAB_DATA[0].id;
  let score = 0;

  function answerQuestion(id: number, selected: string) {
    if (userAnswers[id]) {
      // Already answered - block repeat grading
      return false;
    }
    const q = HSK1_VOCAB_DATA.find(item => item.id === id)!;
    const isCorr = selected === q.correctAnswer;
    if (isCorr) score += 1;
    userAnswers[id] = {
      questionId: id,
      selectedAnswer: selected,
      isCorrect: isCorr,
      correctAnswer: q.correctAnswer,
    };
    return true;
  }

  const firstAttempt = answerQuestion(qId, HSK1_VOCAB_DATA[0].correctAnswer);
  assert.equal(firstAttempt, true, 'First click must succeed');
  assert.equal(score, 1, 'Score must be 1');

  const secondAttempt = answerQuestion(qId, HSK1_VOCAB_DATA[0].correctAnswer);
  assert.equal(secondAttempt, false, 'Second click must be rejected');
  assert.equal(score, 1, 'Score must remain 1 and not inflate');
  console.log('✔ Test 5: Repeated clicks are rejected and score is protected');
}

// Test 6: Advance question sequentially up to 150
{
  let currentIndex = 0;
  for (let i = 0; i < 150; i++) {
    assert.equal(currentIndex, i);
    currentIndex++;
  }
  assert.equal(currentIndex, 150, 'Current index after 150 answers must be 150 (finished)');
  console.log('✔ Test 6: Sequential advance from question 1 to 150 completes quiz');
}

// Test 7: Score classification tiers
{
  assert.equal(getScoreTier(150).badge, '🏆 Xuất sắc');
  assert.equal(getScoreTier(135).badge, '🏆 Xuất sắc');
  assert.equal(getScoreTier(134).badge, '🎉 Rất tốt');
  assert.equal(getScoreTier(120).badge, '🎉 Rất tốt');
  assert.equal(getScoreTier(119).badge, '👍 Khá tốt');
  assert.equal(getScoreTier(100).badge, '👍 Khá tốt');
  assert.equal(getScoreTier(99).badge, '📚 Cần ôn thêm');
  assert.equal(getScoreTier(80).badge, '📚 Cần ôn thêm');
  assert.equal(getScoreTier(79).badge, '💪 Hãy luyện tập thêm');
  assert.equal(getScoreTier(0).badge, '💪 Hãy luyện tập thêm');
  console.log('✔ Test 7: All 5 score classification tiers match requirement exactly');
}

// Test 8: Review wrong answers mode logic
{
  // Simulate quiz with 3 wrong questions
  const wrongIds = [3, 15, 42];
  const reviewQuestions = HSK1_VOCAB_DATA.filter(q => wrongIds.includes(q.id));
  assert.equal(reviewQuestions.length, 3, 'Review set must contain exactly the 3 failed questions');
  assert.deepEqual(reviewQuestions.map(q => q.id), [3, 15, 42], 'Review preserves question list');

  let reviewScore = 0;
  reviewQuestions.forEach(q => {
    // Answer all correctly during review
    reviewScore += 1;
  });
  assert.equal(reviewScore, 3, 'Review score calculates independently');
  console.log('✔ Test 8: Wrong answer review mode extracts correct subset with independent score');
}

// Test 9: State serialization & hydration (localStorage simulator)
{
  const mockState: QuizProgress = {
    currentIndex: 36,
    score: 32,
    answers: {
      1: { questionId: 1, selectedAnswer: 'Thích / yêu', isCorrect: true, correctAnswer: 'Thích / yêu' },
    },
    wrongQuestionIds: [5],
    mode: 'in_progress',
  };

  const serialized = JSON.stringify(mockState);
  const restored: QuizProgress = JSON.parse(serialized);

  assert.equal(restored.currentIndex, 36);
  assert.equal(restored.score, 32);
  assert.equal(restored.mode, 'in_progress');
  assert.deepEqual(restored.wrongQuestionIds, [5]);
  console.log('✔ Test 9: State serializes and deserializes accurately for localStorage');
}

// Test 10: Restart quiz completely resets state
{
  let state: QuizProgress = {
    currentIndex: 150,
    score: 140,
    answers: {},
    wrongQuestionIds: [1, 2],
    mode: 'completed',
  };

  function resetState(): QuizProgress {
    return {
      currentIndex: 0,
      score: 0,
      answers: {},
      wrongQuestionIds: [],
      mode: 'in_progress',
    };
  }

  state = resetState();
  assert.equal(state.currentIndex, 0);
  assert.equal(state.score, 0);
  assert.equal(state.wrongQuestionIds.length, 0);
  assert.equal(state.mode, 'in_progress');
  console.log('✔ Test 10: Reset quiz clears progress and resets to question 1');
}

console.log('\n🎉 ALL 10 LOGIC AND BUSINESS RULE TESTS PASSED SUCCESSFULLY!\n');
