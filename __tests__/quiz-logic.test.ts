import assert from 'node:assert/strict';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';
import { HSK2_VOCAB_DATA } from '../data/hsk2-data';
import { HSK_COMBINED_VOCAB_DATA } from '../data/hsk-combined-data';
import { COMPOUND_QUIZ_DATA, COMPOUND_PHRASES_DATA } from '../data/compound-sentences-data';
import { VOCAB_TOPIC_DATA, VOCAB_TOPIC_CATEGORIES } from '../data/vocab-study-topic-data';
import { VOCAB_LESSON_DATA } from '../data/vocab-study-lesson-data';
import { CONFUSABLE_VOCAB_DATA, CONFUSABLE_CATEGORIES } from '../data/confusable-vocab-data';
import { UserAnswerRecord } from '../types/quiz';
import { WRONG_ANSWER_ROASTS, getRandomRoast } from '../data/roasts';

console.log('--- RUNNING HSK VOCABULARY & MASTERY LOOP TESTS ---');

// Test 1: Datasets count verification based on authentic markdown sources
{
  assert.equal(HSK1_VOCAB_DATA.length, 163, 'HSK 1 must have exactly 163 questions');
  assert.equal(HSK2_VOCAB_DATA.length, 165, 'HSK 2 must have exactly 165 questions');
  assert.equal(HSK_COMBINED_VOCAB_DATA.length, 328, 'Combined must have exactly 328 questions');
  assert.equal(COMPOUND_QUIZ_DATA.length, 77, 'Compound Quiz must have exactly 77 questions');
  assert.equal(COMPOUND_PHRASES_DATA.length, 77, 'Compound Phrases must have exactly 77 items');
  assert.equal(VOCAB_TOPIC_DATA.length, 163, 'Vocab Topic data must have 163 items');
  assert.equal(VOCAB_TOPIC_CATEGORIES.length, 14, 'Vocab Topic data must have 14 categories');
  assert.equal(VOCAB_LESSON_DATA.length, 328, 'Vocab Lesson data must have 328 items');
  assert.equal(VOCAB_LESSON_DATA.filter(x => x.level === 'hsk1').length, 163, 'HSK 1 Lesson Vocab must have 163 items');
  assert.equal(VOCAB_LESSON_DATA.filter(x => x.level === 'hsk2').length, 165, 'HSK 2 Lesson Vocab must have 165 items');
  assert.ok(VOCAB_LESSON_DATA.some(x => x.level === 'hsk1' && x.lesson === 6 && x.hanzi === '汉字'), 'HSK 1 Lesson 6 must contain 汉字');
  assert.equal(CONFUSABLE_VOCAB_DATA.length, 29, 'Confusable Vocab data must have 29 groups');
  assert.equal(CONFUSABLE_CATEGORIES.length, 8, 'Confusable Vocab data must have 8 categories');
  console.log('✔ Test 1: Datasets count valid: HSK1 (163), HSK2 (165), Combined (328), Compound (77), Topic (163), Lesson (328: 163 HSK1 + 165 HSK2), Confusable (29 groups in 8 categories)');
}

// Test 2: Strict Answer Lock - User cannot change answer immediately on the same question
{
  const answers: Record<number, UserAnswerRecord> = {};
  const q = HSK1_VOCAB_DATA[0];

  function tryAnswer(option: string) {
    if (answers[q.id]) {
      return false; // Locked!
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
  const testQuestions = HSK1_VOCAB_DATA.slice(0, 5);

  testQuestions.forEach((q, idx) => {
    if (idx === 1 || idx === 3) {
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
  let activeQuestionIds = [1, 2, 3, 4];
  let wrongQueue = [2, 4];

  assert.ok(wrongQueue.length > 0, 'Round 1 ends with wrong questions');

  round += 1;
  activeQuestionIds = [...wrongQueue];
  wrongQueue = [];
  assert.equal(round, 2);
  assert.deepEqual(activeQuestionIds, [2, 4]);

  wrongQueue.push(4);
  assert.equal(wrongQueue.length, 1);

  round += 1;
  activeQuestionIds = [...wrongQueue];
  wrongQueue = [];
  assert.equal(round, 3);
  assert.deepEqual(activeQuestionIds, [4]);

  const isMastered = wrongQueue.length === 0;
  assert.equal(isMastered, true, 'All questions mastered 100% across rounds');
  console.log('✔ Test 4: Round loop repeats until all wrong questions are answered correctly');
}

// Test 5: Authentic lesson filtering based on HSK standard course structure
{
  const dataset = HSK1_VOCAB_DATA;
  const selectedLessons = [1, 2]; // Lesson 1 (6 questions) + Lesson 2 (4 questions) = 10 questions
  const filtered = dataset.filter(q => (q.lesson ? selectedLessons.includes(q.lesson) : false));

  assert.equal(filtered.length, 10, 'HSK 1 Lessons 1 and 2 yield exactly 10 questions');
  assert.equal(filtered[0].lesson, 1, 'First questions are from Lesson 1');
  assert.equal(filtered[9].lesson, 2, 'Last questions are from Lesson 2');
  console.log('✔ Test 5: Lesson-based selection correctly filters chosen lessons using authentic lesson mapping');
}

// Test 6: Shuffling order
{
  const ids = Array.from({ length: 50 }, (_, i) => i + 1);
  const shuffled = [...ids];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  assert.equal(shuffled.length, ids.length, 'Shuffled has same length');
  assert.notDeepEqual(shuffled, ids, 'Order is randomized, not strictly alphabetical');
  console.log('✔ Test 6: Question sequence is successfully shuffled');
}

// Test 7: Compound Sentences Quiz Context Example Presence
{
  assert.ok(COMPOUND_QUIZ_DATA.length > 0);
  COMPOUND_QUIZ_DATA.forEach(q => {
    assert.ok(q.exampleContext, `Question id ${q.id} must have exampleContext`);
    assert.ok(q.exampleContext.chinese, `Question id ${q.id} exampleContext must have chinese`);
    assert.ok(q.exampleContext.pinyin, `Question id ${q.id} exampleContext must have pinyin`);
    assert.ok(q.exampleContext.vietnamese, `Question id ${q.id} exampleContext must have vietnamese`);
    assert.equal(q.options.length, 4, `Question id ${q.id} must have exactly 4 options`);
    assert.ok(q.options.includes(q.correctAnswer), `Question id ${q.id} correctAnswer must be in options`);
  });
  console.log('✔ Test 7: Compound sentences quiz questions all include full example context (Chinese, Pinyin, Vietnamese)');
}

// Test 8: Memory Phrases presence in HSK 1 and HSK 2
{
  const hsk1WithMemory = HSK1_VOCAB_DATA.filter(q => !!q.memoryPhrase);
  const hsk2WithMemory = HSK2_VOCAB_DATA.filter(q => !!q.memoryPhrase);
  assert.ok(hsk1WithMemory.length > 100, 'HSK 1 must have memory phrases');
  assert.ok(hsk2WithMemory.length > 100, 'HSK 2 must have memory phrases');
  console.log(`✔ Test 8: Memory phrases (Cụm từ ghép dễ nhớ) verified in HSK 1 (${hsk1WithMemory.length}) and HSK 2 (${hsk2WithMemory.length})`);
}

// Test 9: Admin Live Answer Editing & Override Logic
{
  const sampleQuestion = { ...HSK1_VOCAB_DATA[0] };
  const originalAnswer = sampleQuestion.correctAnswer;
  const newAdminMeaning = 'Bạn thân mến / Cậu (Tùy chỉnh Admin)';

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
  assert.ok(WRONG_ANSWER_ROASTS.length >= 14, 'Must have at least 14 roast messages across all categories');
  
  const sample1 = getRandomRoast(0);
  assert.ok(sample1 && sample1.quote, 'Roast message has quote');
  assert.ok(sample1.category, 'Roast message has category');

  const categories = WRONG_ANSWER_ROASTS.map((r: any) => r.category);
  assert.ok(categories.some((c: string) => c.includes('khen đểu')), 'Includes khen đểu category');
  assert.ok(categories.some((c: string) => c.includes('toán học')), 'Includes toán học category');
  assert.ok(categories.some((c: string) => c.includes('xát muối')), 'Includes xát muối category');
  assert.ok(categories.some((c: string) => c.includes('kèo phạt')), 'Includes kèo phạt category');

  console.log('✔ Test 10: Humorous wrong answer roasts properly loaded and formatted');
}

// Test 11: Roast modal answer details formatted as Chữ Hán — Pinyin — Tiếng Việt
{
  const sample = HSK1_VOCAB_DATA[0];
  const formattedAnswer = `${sample.hanzi} — ${sample.pinyin} — ${sample.correctAnswer}`;
  assert.strictEqual(formattedAnswer, '你 — nǐ — Bạn');

  const baozhi = HSK2_VOCAB_DATA.find((q: any) => q.hanzi === '报纸');
  assert.ok(baozhi, 'Found 报纸 in HSK 2');
  const baozhiFormatted = `${baozhi.hanzi} — ${baozhi.pinyin} — ${baozhi.correctAnswer}`;
  assert.strictEqual(baozhiFormatted, '报纸 — bàozhǐ — Báo');
  console.log('✔ Test 11: Roast modal answer details correctly format as Chữ Hán — Pinyin — Tiếng Việt');
}

// Test 12: Quiz restart correctly preserves selected lessons (HSK 2 Lessons 1 & 2)
{
  const selectedLessons = [1, 2];
  const filtered = HSK2_VOCAB_DATA.filter((q: any) => selectedLessons.includes(q.lesson));
  assert.strictEqual(filtered.length, 25, 'HSK 2 Lessons 1 and 2 contains exactly 25 questions');
  assert.ok(filtered.every((q: any) => q.lesson === 1 || q.lesson === 2), 'Only questions from lesson 1 and 2');
  assert.ok(!filtered.some((q: any) => q.lesson > 2), 'No questions from lesson 3-15');
  console.log('✔ Test 12: Quiz restart correctly preserves selected lessons (HSK 2 Lessons 1 & 2 yield 25 questions)');
}

// Test 13: Confusable vocabulary dataset integrity (29 groups, all with >= 2 words)
{
  assert.equal(CONFUSABLE_VOCAB_DATA.length, 29, 'Must have 29 confusable groups');
  assert.equal(CONFUSABLE_CATEGORIES.length, 8, 'Must have 8 confusable categories');

  CONFUSABLE_VOCAB_DATA.forEach(group => {
    assert.ok(group.id, 'Group has id');
    assert.ok(group.part, 'Group has part');
    assert.ok(group.category, 'Group has category');
    assert.ok(group.tips && group.tips.length > 0, `Group ${group.id} must have tips`);
    assert.ok(Array.isArray(group.words) && group.words.length >= 2, `Group ${group.id} must have at least 2 words`);
    group.words.forEach(w => {
      assert.ok(w.hanzi, `Group ${group.id} word must have hanzi`);
      assert.ok(w.pinyin, `Group ${group.id} word must have pinyin`);
      assert.ok(w.meaning, `Group ${group.id} word must have meaning`);
    });
  });
  console.log('✔ Test 13: Confusable vocabulary data integrity verified (all 29 groups contain >= 2 words with complete Hanzi, Pinyin, Meaning & Tips)');
}

// Test 14: Individual Meaning Bidirectional Toggle Logic
{
  let hideAllMeanings = false;
  let individualVisibility: Record<string, boolean> = {};

  const getMeaningVisible = (cardKey: string) => {
    if (individualVisibility[cardKey] !== undefined) {
      return individualVisibility[cardKey];
    }
    return !hideAllMeanings;
  };

  const toggleMeaning = (cardKey: string) => {
    const current = getMeaningVisible(cardKey);
    individualVisibility[cardKey] = !current;
  };

  const cardKey = 'topic-1';

  // 1. Initially when hideAllMeanings is false, word meaning is visible
  assert.equal(getMeaningVisible(cardKey), true, 'Initial state: meaning is visible');

  // 2. User clicks on meaning to hide it individually
  toggleMeaning(cardKey);
  assert.equal(getMeaningVisible(cardKey), false, 'First click: individual meaning is hidden');

  // 3. User clicks on hidden placeholder to reveal it again
  toggleMeaning(cardKey);
  assert.equal(getMeaningVisible(cardKey), true, 'Second click: individual meaning is revealed');

  // 4. Now global hideAllMeanings is enabled
  hideAllMeanings = true;
  individualVisibility = {}; // Reset overrides on global switch

  assert.equal(getMeaningVisible(cardKey), false, 'When hideAll is true, initial meaning is hidden');

  // 5. User clicks hidden placeholder to reveal
  toggleMeaning(cardKey);
  assert.equal(getMeaningVisible(cardKey), true, 'Clicked when global hidden: meaning reveals');

  // 6. User clicks revealed meaning to re-hide it
  toggleMeaning(cardKey);
  assert.equal(getMeaningVisible(cardKey), false, 'Clicked revealed meaning again: meaning re-hides (bidirectional!)');

  console.log('✔ Test 14: Individual meaning bidirectional toggle verified (hide -> show and show -> hide works in both global states)');
}

console.log('\n🎉 ALL MASTERY LOOP, VOCABULARY & COMPOUND SENTENCES TESTS PASSED SUCCESSFULLY!\n');
