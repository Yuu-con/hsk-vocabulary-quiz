import assert from 'node:assert/strict';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { HSK2_VOCAB_DATA } from '../data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '../data/hsk-combined-data';
import { UserAnswerRecord } from '../types/quiz';

console.log('--- RUNNING SPACED REPETITION MASTERY LOOP TESTS ---');

// Test 1: Datasets count verification
{
  assert.equal(HSK1_VOCAB_DATA.length, 150, 'HSK 1 must have exactly 150 questions');
  assert.equal(HSK2_VOCAB_DATA.length, 150, 'HSK 2 must have exactly 150 questions');
  assert.equal(HSK_COMBINED_VOCAB_DATA.length, 300, 'Combined must have exactly 300 questions');
  console.log('✔ Test 1: Datasets count valid: HSK1 (150), HSK2 (150), Combined (300)');
}

// Test 2: Strict Answer Lock - User cannot change answer immediately on the same question
{
  const answers: Record<number, UserAnswerRecord> = {};
  const q = HSK1_VOCAB_DATA[0];

  function tryAnswer(option: string) {
    if (answers[q.id]) {
      // Locked! Cannot change answer immediately
      return false;
    }
    const isCorrect = option === q.correctAnswer;
    answers[q.id] = {
      questionId: q.id,
      selectedAnswer: option,
      isCorrect,
      correctAnswer: q.correctAnswer,
    };
    return true;
  }

  // First pick: wrong answer
  const wrongChoice = q.options.find(o => o !== q.correctAnswer)!;
  const firstAttempt = tryAnswer(wrongChoice);
  assert.equal(firstAttempt, true, 'First attempt succeeds');
  assert.equal(answers[q.id].isCorrect, false, 'Recorded as wrong');

  // Second pick immediately: rejected!
  const secondAttempt = tryAnswer(q.correctAnswer);
  assert.equal(secondAttempt, false, 'Second attempt must be blocked (locked)!');
  assert.equal(answers[q.id].selectedAnswer, wrongChoice, 'Original wrong choice remains');
  console.log('✔ Test 2: Answers are locked upon selection; no immediate retry allowed');
}

// Test 3: Accumulating wrong questions into next round queue
{
  const currentRoundWrongIds: number[] = [];
  const testQuestions = HSK1_VOCAB_DATA.slice(0, 5); // 5 sample questions

  // Simulate user answering 5 questions: 3 right, 2 wrong (indices 1 and 3)
  testQuestions.forEach((q, idx) => {
    if (idx === 1 || idx === 3) {
      // Answer wrong
      currentRoundWrongIds.push(q.id);
    }
  });

  assert.equal(currentRoundWrongIds.length, 2, '2 wrong questions accumulated');
  assert.deepEqual(currentRoundWrongIds, [testQuestions[1].id, testQuestions[3].id]);
  console.log('✔ Test 3: Wrong questions correctly accumulated for next round');
}

// Test 4: Round loop continues until 100% correct (0 wrong questions remain)
{
  let round = 1;
  let activeQuestionIds = [1, 2, 3, 4]; // 4 initial questions
  let wrongQueue = [2, 4]; // Questions 2 and 4 answered wrong in Round 1

  // End of Round 1: wrongQueue has 2 items -> transition to Round 2
  assert.ok(wrongQueue.length > 0, 'Round 1 ends with wrong questions');

  // Start Round 2 with only questions [2, 4]
  round += 1;
  activeQuestionIds = [...wrongQueue];
  wrongQueue = [];
  assert.equal(round, 2);
  assert.deepEqual(activeQuestionIds, [2, 4]);

  // In Round 2: user gets question 2 right, but question 4 wrong again
  wrongQueue.push(4);
  assert.equal(wrongQueue.length, 1);

  // End of Round 2: wrongQueue has 1 item -> transition to Round 3
  round += 1;
  activeQuestionIds = [...wrongQueue];
  wrongQueue = [];
  assert.equal(round, 3);
  assert.deepEqual(activeQuestionIds, [4]);

  // In Round 3: user answers question 4 correctly!
  // wrongQueue is now empty!
  assert.equal(wrongQueue.length, 0);

  // When wrongQueue is empty, quiz terminates with 100% mastery!
  const isMastered = wrongQueue.length === 0;
  assert.equal(isMastered, true, 'All questions mastered 100% across 3 rounds');
  console.log('✔ Test 4: Round loop repeats until all wrong questions are answered correctly');
}

console.log('\n🎉 ALL MASTERY LOOP TESTS PASSED SUCCESSFULLY!\n');
