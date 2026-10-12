import * as fs from 'fs';
import * as path from 'path';

// Paths to downloaded files
const HSK1_QUIZ_PATH = 'c:/Users/dyysi/Downloads/b_tr_c_nghi_m_to_n_di_n_t_v_ng_gi_o_tr_nh_chu_n_hsk_1_b_i_1_15 (1).md';
const HSK2_QUIZ_PATH = 'c:/Users/dyysi/Downloads/b_tr_c_nghi_m_to_n_di_n_t_v_ng_gi_o_tr_nh_chu_n_hsk_2_b_i_1_15 (1).md';
const COMPOUND_PATH = 'c:/Users/dyysi/Downloads/gemini-code-1791822613434.md';
const TOPIC_VOCAB_PATH = 'c:/Users/dyysi/Downloads/t_ng_h_p_t_v_ng_hsk_1_v_2_theo_ch.md';
const LESSON_VOCAB_PATH = 'c:/Users/dyysi/Downloads/t_v_ng_chu_n_hsk_1_v_hsk_2_theo_t_ng_b_i (1).md';

// Target files in data/
const DATA_DIR = path.resolve(__dirname, '../data');

// 1. Parse HSK 1 and HSK 2 Quiz Markdown
function parseQuizMarkdown(filePath: string, startId: number) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  let currentLesson = 0;
  let currentLessonTitle = '';
  const questions: any[] = [];
  let cur: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lMatch = line.match(/^##\s+BÀI\s+(\d+):\s*(.*)/i);
    if (lMatch) {
      currentLesson = parseInt(lMatch[1], 10);
      currentLessonTitle = lMatch[2].trim();
      continue;
    }

    const qMatch = line.match(/^\*\*Câu\s+(\d+):\*\*\s*(.*)/i);
    if (qMatch) {
      if (cur) questions.push(cur);
      cur = {
        lesson: currentLesson,
        lessonTitle: currentLessonTitle,
        qNum: parseInt(qMatch[1], 10),
        rawQ: qMatch[2],
        options: {},
        ansLetter: '',
        explanation: '',
        memoryPhrase: '',
      };
      continue;
    }

    if (!cur) continue;

    const optMatch = line.match(/^([A-D])\.\s*(.*)/);
    if (optMatch) {
      cur.options[optMatch[1]] = optMatch[2].trim();
      continue;
    }

    const ansMatch = line.match(/^\*\s+\*\*Đáp án:\*\*\s*([A-D])/i);
    if (ansMatch) {
      cur.ansLetter = ansMatch[1].toUpperCase();
      continue;
    }

    const expMatch = line.match(/^\*\s+\*\*Giải thích:\*\*\s*(.*)/i);
    if (expMatch) {
      cur.explanation = expMatch[1].trim();
      continue;
    }

    const memMatch = line.match(/^\*\s+\*\*Cụm từ ghép dễ nhớ:\*\*\s*(.*)/i);
    if (memMatch) {
      cur.memoryPhrase = memMatch[1].trim();
      continue;
    }
  }

  if (cur) questions.push(cur);

  return questions.map((q, idx) => {
    const hanzi = q.rawQ.match(/\*\*([^\*]+)\*\*/)?.[1] || '';
    const pinyin = (q.rawQ.match(/\(\*([^\*]+)\*\)/) || q.rawQ.match(/\(([^\)]+)\)/))?.[1] || '';
    const options = [q.options.A, q.options.B, q.options.C, q.options.D];
    const correctAnswer = q.options[q.ansLetter] || '';
    return {
      id: startId + idx + 1,
      hanzi,
      pinyin,
      lesson: q.lesson,
      question: q.rawQ.replace(/\*\*/g, '').replace(/\*/g, '').trim(),
      options,
      correctAnswer,
      explanation: q.explanation,
      memoryPhrase: q.memoryPhrase || undefined,
    };
  });
}

// 2. Parse Compound Sentences & Context
function parseCompoundMaterials(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  let currentSec = '';
  let currentSecId = 0;
  const items: any[] = [];

  for (const line of lines) {
    const secMatch = line.match(/^##\s+(\d+)\.\s*(.*)/);
    if (secMatch) {
      currentSecId = parseInt(secMatch[1], 10);
      currentSec = line.replace(/^##\s*/, '').trim();
      continue;
    }

    if (line.startsWith('| **')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 4) {
        const phrase = parts[0].replace(/\*\*/g, '').trim();
        const pinyin = parts[1].trim();
        const meaning = parts[2].trim();
        const rawContext = parts[3].trim();

        const cParts = rawContext.split(/<br\s*\/?>/i).map(s => s.trim());
        const cChinese = cParts[0] || '';
        const cPinyin = (cParts[1] || '').replace(/^\*|\*$/g, '').trim();
        const cVietnamese = (cParts[2] || '').replace(/^\(|\)$/g, '').trim();

        items.push({
          id: items.length + 1,
          sectionId: currentSecId,
          section: currentSec,
          phrase,
          pinyin,
          meaning,
          contextChinese: cChinese,
          contextPinyin: cPinyin,
          contextVietnamese: cVietnamese,
        });
      }
    }
  }

  // Generate Multiple-Choice Quiz for Compound Phrases
  const allMeanings = Array.from(new Set(items.map(i => i.meaning)));

  const quizQuestions = items.map((item, idx) => {
    // Pick 3 distractors
    const otherSameSec = items.filter(i => i.sectionId === item.sectionId && i.meaning !== item.meaning).map(i => i.meaning);
    const otherAll = allMeanings.filter(m => m !== item.meaning && !otherSameSec.includes(m));
    
    const candidatePool = [...otherSameSec, ...otherAll];
    // Deterministic selection based on index so it is consistent
    const distractors: string[] = [];
    let pIdx = (idx * 3) % candidatePool.length;
    while (distractors.length < 3) {
      const cand = candidatePool[pIdx % candidatePool.length];
      if (!distractors.includes(cand) && cand !== item.meaning) {
        distractors.push(cand);
      }
      pIdx = (pIdx + 1) % candidatePool.length;
    }

    // Insert correct answer at fixed modulo position
    const options = [...distractors];
    const insertPos = idx % 4;
    options.splice(insertPos, 0, item.meaning);

    return {
      id: idx + 1,
      hanzi: item.phrase,
      pinyin: item.pinyin,
      lesson: item.sectionId,
      sectionId: item.sectionId,
      sectionTitle: item.section,
      question: `Cụm từ **${item.phrase}** (${item.pinyin}) có nghĩa là gì?`,
      options,
      correctAnswer: item.meaning,
      explanation: `Cụm từ "${item.phrase}" (${item.pinyin}) có nghĩa là "${item.meaning}".`,
      exampleContext: {
        chinese: item.contextChinese,
        pinyin: item.contextPinyin,
        vietnamese: item.contextVietnamese,
      },
    };
  });

  return { items, quizQuestions };
}

// 3. Parse Topic-Based Vocabulary
function parseTopicVocab(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  let currentTopic = '';
  let currentTopicId = 0;
  const items: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const topMatch = line.match(/^##\s+(\d+)\.\s*(.*)/);
    if (topMatch) {
      currentTopicId = parseInt(topMatch[1], 10);
      currentTopic = line.replace(/^##\s*/, '').trim();
      continue;
    }

    if (line.startsWith('| **')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 3) {
        const hanzi = parts[0].replace(/\*\*/g, '').trim();
        const pinyin = parts[1].trim();
        const meaning = parts[2].trim();
        const note = parts[3] ? parts[3].trim() : '';
        items.push({
          id: items.length + 1,
          topicId: currentTopicId,
          topicTitle: currentTopic,
          hanzi,
          pinyin,
          meaning,
          note: note !== '-' ? note : '',
        });
        continue;
      }
    }

    const bulletMatch = line.match(/^\*\s+\*\*([^\*]+)\*\*\s*\(([^\)]+)\):\s*(.*)/);
    if (bulletMatch) {
      const hanzi = bulletMatch[1].trim();
      const pinyin = bulletMatch[2].trim();
      const meaning = bulletMatch[3].trim();
      items.push({
        id: items.length + 1,
        topicId: currentTopicId,
        topicTitle: currentTopic,
        hanzi,
        pinyin,
        meaning,
        note: '',
      });
      continue;
    }
  }

  const topicCategories = Array.from(new Set(items.map(i => i.topicId))).map(id => {
    const matched = items.find(i => i.topicId === id);
    const count = items.filter(i => i.topicId === id).length;
    return {
      id,
      title: matched ? matched.topicTitle : `Chủ đề ${id}`,
      count,
    };
  });

  return { items, topicCategories };
}

// 4. Parse Lesson-Based Vocabulary
function parseLessonVocab(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  let currentPart: 'hsk1' | 'hsk2' = 'hsk1';
  let currentLesson = 0;
  let currentLessonTitle = '';
  const items: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# PHẦN 1:')) { currentPart = 'hsk1'; continue; }
    if (line.startsWith('# PHẦN 2:')) { currentPart = 'hsk2'; continue; }

    const lMatch = line.match(/^##\s+Bài\s+(\d+):\s*(.*)/i);
    if (lMatch) {
      currentLesson = parseInt(lMatch[1], 10);
      currentLessonTitle = lMatch[2].trim();
      continue;
    }

    if (line.startsWith('|') && !line.includes('---') && !line.includes('STT') && !line.includes('Chữ Hán')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 5) {
        items.push({
          id: items.length + 1,
          level: currentPart,
          lesson: currentLesson,
          lessonTitle: currentLessonTitle,
          stt: parts[0],
          hanzi: parts[1],
          pinyin: parts[2],
          wordType: parts[3],
          meaning: parts[4],
        });
      }
    }
  }

  return items;
}

async function main() {
  console.log('Generating datasets from user Markdown sources...');

  // 1. HSK 1 & HSK 2 Quiz Data
  const hsk1Data = parseQuizMarkdown(HSK1_QUIZ_PATH, 0);
  const hsk2Data = parseQuizMarkdown(HSK2_QUIZ_PATH, 0);
  
  // Combined data with continuous IDs
  const combinedData = [
    ...hsk1Data,
    ...hsk2Data.map((q, idx) => ({
      ...q,
      id: hsk1Data.length + idx + 1,
    })),
  ];

  console.log(`HSK 1 questions: ${hsk1Data.length}`);
  console.log(`HSK 2 questions: ${hsk2Data.length}`);
  console.log(`Combined questions: ${combinedData.length}`);

  // 2. Compound Phrases & Quiz Data
  const { items: compoundItems, quizQuestions: compoundQuiz } = parseCompoundMaterials(COMPOUND_PATH);
  console.log(`Compound items: ${compoundItems.length}, quiz questions: ${compoundQuiz.length}`);

  // 3. Topic Vocab
  const { items: topicItems, topicCategories } = parseTopicVocab(TOPIC_VOCAB_PATH);
  console.log(`Topic vocab items: ${topicItems.length}, categories: ${topicCategories.length}`);

  // 4. Lesson Vocab
  const lessonItems = parseLessonVocab(LESSON_VOCAB_PATH);
  console.log(`Lesson vocab items: ${lessonItems.length}`);

  // Write files
  fs.writeFileSync(
    path.join(DATA_DIR, 'hsk1-data.ts'),
    `import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK1_VOCAB_DATA: QuizQuestion[] = ${JSON.stringify(hsk1Data, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(DATA_DIR, 'hsk2-data.ts'),
    `import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = ${JSON.stringify(hsk2Data, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(DATA_DIR, 'hsk-combined-data.ts'),
    `import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK_COMBINED_VOCAB_DATA: QuizQuestion[] = ${JSON.stringify(combinedData, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(DATA_DIR, 'compound-sentences-data.ts'),
    `import { QuizQuestion } from '@/types/quiz';\nimport { CompoundPhraseItem } from '@/types/practice';\n\nexport const COMPOUND_PHRASES_DATA: CompoundPhraseItem[] = ${JSON.stringify(compoundItems, null, 2)};\n\nexport const COMPOUND_QUIZ_DATA: QuizQuestion[] = ${JSON.stringify(compoundQuiz, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(DATA_DIR, 'vocab-study-topic-data.ts'),
    `import { VocabTopicItem } from '@/types/practice';\n\nexport const VOCAB_TOPIC_CATEGORIES = ${JSON.stringify(topicCategories, null, 2)};\n\nexport const VOCAB_TOPIC_DATA: VocabTopicItem[] = ${JSON.stringify(topicItems, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(DATA_DIR, 'vocab-study-lesson-data.ts'),
    `import { VocabLessonItem } from '@/types/practice';\n\nexport const VOCAB_LESSON_DATA: VocabLessonItem[] = ${JSON.stringify(lessonItems, null, 2)};\n`
  );

  console.log('✅ All datasets successfully generated!');
}

main().catch(err => {
  console.error('Error generating data:', err);
  process.exit(1);
});
