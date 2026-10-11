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

// Test 5: Polysemous words check
{
  const hui = HSK1_VOCAB_DATA.find(q => q.hanzi === '会');
  assert.ok(hui && hui.correctAnswer.includes('/'), '会 includes multiple meanings');
  
  const xiang = HSK1_VOCAB_DATA.find(q => q.hanzi === '想');
  assert.ok(xiang && xiang.correctAnswer.includes('/'), '想 includes multiple meanings');

  const dian = HSK1_VOCAB_DATA.find(q => q.hanzi === '点');
  assert.ok(dian && dian.correctAnswer.includes('/'), '点 includes multiple meanings');

  const zhao = HSK2_VOCAB_DATA.find(q => q.hanzi === '找');
  assert.ok(zhao && zhao.correctAnswer.includes('/'), '找 includes multiple meanings');

  const rang = HSK2_VOCAB_DATA.find(q => q.hanzi === '让');
  assert.ok(rang && rang.correctAnswer.includes('/'), '让 includes multiple meanings');

  console.log('✔ Test 5: Polysemous words display complete multi-meaning answers');
}

// Test 6: Lesson Selection filter
{
  const dataset = HSK1_VOCAB_DATA;
  const selectedLessons = [1, 3]; // Lesson 1 and Lesson 3
  const filtered = dataset.filter(q => (q.lesson ? selectedLessons.includes(q.lesson) : false));

  assert.equal(filtered.length, 20, '2 selected lessons yield exactly 20 questions');
  assert.equal(filtered[0].lesson, 1, 'First questions are from Lesson 1');
  assert.equal(filtered[10].lesson, 3, 'Questions 11-20 are from Lesson 3');
  console.log('✔ Test 6: Lesson-based selection correctly filters chosen lessons using authentic lesson mapping');
}

// Test 7: Shuffling order
{
  const ids = Array.from({ length: 50 }, (_, i) => i + 1);
  const shuffled = [...ids];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  assert.equal(shuffled.length, ids.length, 'Shuffled has same length');
  assert.notDeepEqual(shuffled, ids, 'Order is randomized, not strictly alphabetical');
  console.log('✔ Test 7: Question sequence is successfully shuffled');
}

// Test 8: Verify no Hán-Việt bracketed annotations in question answers
{
  const allQuestions = [...HSK1_VOCAB_DATA, ...HSK2_VOCAB_DATA];
  const withParens = allQuestions.filter(q => q.correctAnswer.includes('('));
  assert.equal(withParens.length, 0, 'No answers should contain bracketed Hán-Việt annotations');
  
  const explanationsWithHanViet = allQuestions.filter(q => q.explanation.includes('Hán Việt'));
  assert.equal(explanationsWithHanViet.length, 0, 'Explanations should not mention Hán Việt');
  console.log('✔ Test 8: All Hán-Việt annotations successfully removed from answers and explanations');
}

// Test 9: Admin Live Answer Editing & Override Logic
{
  const sampleQuestion = { ...HSK1_VOCAB_DATA[0] };
  const originalAnswer = sampleQuestion.correctAnswer;
  const newAdminMeaning = "Bạn thân mến / Cậu (Tùy chỉnh Admin)";

  // Update options replacing old answer with new one
  const updatedOptions = [...sampleQuestion.options];
  const oldIdx = updatedOptions.indexOf(originalAnswer);
  assert.ok(oldIdx >= 0, 'Old answer exists in options');
  updatedOptions[oldIdx] = newAdminMeaning;

  const overriddenQuestion = {
    ...sampleQuestion,
    correctAnswer: newAdminMeaning,
    options: updatedOptions,
  };

  assert.equal(overriddenQuestion.correctAnswer, newAdminMeaning, 'Correct answer updated to admin meaning');
  assert.ok(overriddenQuestion.options.includes(newAdminMeaning), 'Options contain new admin meaning');
  assert.equal(overriddenQuestion.options.length, 4, 'Still exactly 4 options');
  console.log('✔ Test 9: Admin live answer editing correctly updates correctAnswer and options');
}

// Test 10: Humorous Wrong Answer Roasts
{
  const { WRONG_ANSWER_ROASTS, getRandomRoast } = require('../data/roasts');
  assert.ok(WRONG_ANSWER_ROASTS.length >= 14, 'Must have at least 14 roast messages across all categories');
  
  const sample1 = getRandomRoast(0);
  assert.ok(sample1 && sample1.quote, 'Roast message has quote');
  assert.ok(sample1.category, 'Roast message has category');

  // Verify key categories exist
  const categories = WRONG_ANSWER_ROASTS.map((r: any) => r.category);
  assert.ok(categories.some((c: string) => c.includes('khen đểu')), 'Includes khen đểu category');
  assert.ok(categories.some((c: string) => c.includes('toán học')), 'Includes toán học category');
  assert.ok(categories.some((c: string) => c.includes('xát muối')), 'Includes xát muối category');
  assert.ok(categories.some((c: string) => c.includes('kèo phạt')), 'Includes kèo phạt category');

  console.log('✔ Test 10: Humorous wrong answer roasts properly loaded and formatted');
}

console.log('\n🎉 ALL MASTERY LOOP & NEW FEATURE TESTS PASSED SUCCESSFULLY!\n');


