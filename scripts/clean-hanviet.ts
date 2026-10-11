import fs from 'fs';
import path from 'path';
import { HSK1_RAW } from './build-improved-hsk1';
import { HSK2_RAW } from './build-improved-hsk2';

// Specific word cleanups for natural Vietnamese without Sino-Vietnamese elements
const SPECIFIC_REPLACEMENTS: Record<string, string> = {
  'Đá bóng / Túc cầu': 'Đá bóng / Chơi bóng đá',
  'Đừng / Biệt': 'Đừng / Không nên',
  'Đang / Chính tại': 'Đang / Đang diễn ra',
  'Cảm ơn / Cảm tạ': 'Cảm ơn',
  'Bạn bè / Bằng hữu': 'Bạn bè',
  'Mời / Xin / Thỉnh': 'Mời / Xin mời',
  'Công tác / Làm việc': 'Làm việc / Công việc',
  'Trú / Ở / Cư ngụ': 'Ở / Sinh sống',
  'Lạnh lẽo / Lãnh': 'Lạnh / Lạnh lẽo',
  'Nóng bức / Nhiệt': 'Nóng / Nóng bức',
  'Cô gái / Tiểu thư': 'Cô gái / Cô',
  'Tiên sinh / Quý ông / Chồng': 'Quý ông / Ngài / Chồng',
  'Y phục / Quần áo': 'Quần áo',
  'Xe taxi / Xe thuê': 'Xe taxi',
  'Lắng nghe / Thính': 'Nghe / Lắng nghe',
  'Phi cơ / Máy bay': 'Máy bay',
  'Yêu thương / Ái': 'Yêu / Yêu thương',
  'Vô tuyến / Tivi': 'Tivi',
  'Điện ảnh / Phim truyện': 'Phim / Xem phim',
  'Nước / Chất lỏng': 'Nước',
  'Tiền bạc / Tiền tệ': 'Tiền / Tiền bạc',
  'Thức dậy / Rời giường': 'Thức dậy',
  'Nghỉ ngơi / Hưu tức': 'Nghỉ ngơi',
  'Ra ngoài / Xuất': 'Đi ra / Ra ngoài',
  'Bận rộn / Mang': 'Bận rộn / Bận',
  'Người chồng / Trượng phu': 'Người chồng / Chồng',
  'Màu sắc / Nhan sắc': 'Màu sắc',
  'Hỏi han / Vấn': 'Hỏi / Hỏi thăm',
  'Nói cho / Báo cho / Cáo tri': 'Nói cho / Báo cho',
  'Giá rẻ / Tiện nghi': 'Giá rẻ / Rẻ',
  'Đi làm / Thượng ban': 'Đi làm',
  'Ca hát / Xướng ca': 'Ca hát / Hát',
  'So với / Tỷ': 'So với',
  'Người vợ / Thê tử': 'Người vợ / Vợ',
  'Số 0 / Linh': 'Số 0',
  'Màu trắng / Bạch': 'Màu trắng',
  'Màu đen / Hắc': 'Màu đen',
  'Gần gũi / Cận': 'Gần / Gần gũi',
  'Bơi lội / Du vịnh': 'Bơi / Bơi lội',
  'Mọi người / Đại gia': 'Mọi người / Tất cả mọi người',
  'Sân bay / Phi trường': 'Sân bay',
  'Bước vào / Tiến vào': 'Đi vào / Bước vào',
  'Cảm tạ chân thành': 'Cảm ơn chân thành',
  'Ca hát bài bản': 'Ca hát vui vẻ',
  'Đến đâu điểm kết': 'Đến đâu / Tới nơi nào',
  'Ở đâu vị trí': 'Ở đâu / Vị trí nào',
  'Với ai kết hợp': 'Cùng ai / Với ai',
  'Mặc trang phục': 'Mặc quần áo',
  'Nấu nướng chín': 'Nấu nướng thức ăn',
  'Trường học viện': 'Trường học',
  'Kỳ thi khảo thí': 'Kỳ thi / Bài kiểm tra',
  'Quyển sách thư tịch': 'Quyển sách',
  'Phòng học viện': 'Lớp học',
  'Bệnh viện chữa trị': 'Bệnh viện',
  'Cửa hàng buôn bán': 'Cửa hàng / Tiệm',
  'Xuất phát rời đi': 'Rời đi / Xuất phát',
  'Ở tại địa điểm': 'Ở tại / Nơi chốn',
  'Đến nơi kết thúc': 'Đến nơi / Tới nơi',
  'Quên mất lãng quên': 'Quên mất',
  'Suy nghĩ đắn đo': 'Suy nghĩ / Đắn đo',
  'Hỏi han vấn đáp': 'Hỏi han / Thắc mắc',
  'Bắt đầu khởi sự': 'Bắt đầu',
  'Nhan sắc dung mạo': 'Ngoại hình / Dung mạo',
  'Thương thảo bàn bạc': 'Thương thảo / Bàn bạc',
  'Đã xong xuôi hết': 'Đã hoàn thành',
  'Sắp sửa bắt đầu': 'Sắp sửa / Chuẩn bị',
  'Vừa mới xảy ra': 'Vừa mới',
};

function cleanString(str: string): string {
  // Strip parentheses and anything inside
  let cleaned = str.replace(/\s*\([^)]*\)/g, '').trim();

  // Apply specific replacements if matched
  if (SPECIFIC_REPLACEMENTS[cleaned]) {
    cleaned = SPECIFIC_REPLACEMENTS[cleaned];
  }

  // Remove trailing slashes or stray spaces
  cleaned = cleaned.replace(/\s*\/\s*$/, '').trim();
  return cleaned;
}

function cleanExplanation(exp: string): string {
  let cleaned = exp;
  // Remove "- âm Hán Việt: ..." or "- Hán Việt: ..."
  cleaned = cleaned.replace(/\s*-\s*(?:âm\s*)?Hán Việt:[^)]+/g, '');
  // Remove "(âm Hán Việt: ...)" or "(Hán Việt: ...)"
  cleaned = cleaned.replace(/\s*\((?:âm\s*)?Hán Việt:[^)]*\)/g, '');
  // Remove "âm Hán Việt: ... ;" or "Hán Việt: ..."
  cleaned = cleaned.replace(/(?:âm\s*)?Hán Việt:[^,;.)]+\s*[,;.]?/g, '');
  return cleaned.trim();
}

// Clean HSK 1 dataset
const cleanedHsk1 = HSK1_RAW.map(q => {
  const cleanAns = cleanString(q.correctAnswer);
  const cleanOpts = q.options.map(opt => cleanString(opt)) as [string, string, string, string];

  // Guarantee that correctAnswer is in options
  if (!cleanOpts.includes(cleanAns)) {
    cleanOpts[0] = cleanAns;
  }

  // Ensure 4 unique options
  const unique = new Set(cleanOpts);
  if (unique.size !== 4) {
    console.error(`Duplicate option in HSK1 ID ${q.id}:`, cleanOpts);
  }

  return {
    ...q,
    correctAnswer: cleanAns,
    options: cleanOpts,
    explanation: cleanExplanation(q.explanation),
  };
});

// Clean HSK 2 dataset
const cleanedHsk2 = HSK2_RAW.map(q => {
  const cleanAns = cleanString(q.correctAnswer);
  const cleanOpts = q.options.map(opt => cleanString(opt)) as [string, string, string, string];

  if (!cleanOpts.includes(cleanAns)) {
    cleanOpts[0] = cleanAns;
  }

  const unique = new Set(cleanOpts);
  if (unique.size !== 4) {
    console.error(`Duplicate option in HSK2 ID ${q.id}:`, cleanOpts);
  }

  return {
    ...q,
    correctAnswer: cleanAns,
    options: cleanOpts,
    explanation: cleanExplanation(q.explanation),
  };
});

// Generate file outputs
const hsk1Formatted = cleanedHsk1.map(v => ({
  id: v.id,
  hanzi: v.hanzi,
  pinyin: v.pinyin,
  lesson: v.lesson,
  question: v.hanzi + " — " + v.pinyin + " nghĩa là gì?",
  options: v.options,
  correctAnswer: v.correctAnswer,
  explanation: v.explanation,
}));

const hsk1Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK1_VOCAB_DATA: QuizQuestion[] = " +
  JSON.stringify(hsk1Formatted, null, 2) + ";\n";

fs.writeFileSync(path.resolve(process.cwd(), 'data/hsk1-data.ts'), hsk1Code, 'utf-8');
console.log('✅ Generated clean HSK 1 at data/hsk1-data.ts (150 words)');

const hsk2Formatted = cleanedHsk2.map(v => ({
  id: v.id,
  hanzi: v.hanzi,
  pinyin: v.pinyin,
  lesson: v.lesson,
  question: v.hanzi + " — " + v.pinyin + " nghĩa là gì?",
  options: v.options,
  correctAnswer: v.correctAnswer,
  explanation: v.explanation,
}));

const hsk2Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = " +
  JSON.stringify(hsk2Formatted, null, 2) + ";\n";

fs.writeFileSync(path.resolve(process.cwd(), 'data/hsk2-data.ts'), hsk2Code, 'utf-8');
console.log('✅ Generated clean HSK 2 at data/hsk2-data.ts (150 words)');

// Also update scripts/build-data.ts and scripts/build-hsk2-data.ts
const codeHsk1 = `import fs from 'fs';
import path from 'path';

export interface VocabDef {
  id: number;
  hanzi: string;
  pinyin: string;
  lesson: number;
  correctAnswer: string;
  options: [string, string, string, string];
  explanation: string;
}

export const rawVocab: VocabDef[] = ` + JSON.stringify(cleanedHsk1, null, 2) + `;

export function buildData() {
  const formattedQuestions = rawVocab.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    lesson: v.lesson,
    question: v.hanzi + " — " + v.pinyin + " nghĩa là gì?",
    options: v.options,
    correctAnswer: v.correctAnswer,
    explanation: v.explanation,
  }));

  const code = "import { QuizQuestion } from '@/types/quiz';\\n\\nexport const HSK1_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(formattedQuestions, null, 2) + ";\\n";

  const outputPath = path.resolve(process.cwd(), 'data/hsk1-data.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, code, 'utf-8');
  console.log("Generated " + rawVocab.length + " vocabulary questions at " + outputPath);
}

buildData();
`;
fs.writeFileSync(path.resolve(process.cwd(), 'scripts/build-data.ts'), codeHsk1, 'utf-8');

const codeHsk2 = `import fs from 'fs';
import path from 'path';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';

export interface VocabDef {
  id: number;
  hanzi: string;
  pinyin: string;
  lesson: number;
  correctAnswer: string;
  options: [string, string, string, string];
  explanation: string;
}

export const rawHsk2Vocab: VocabDef[] = ` + JSON.stringify(cleanedHsk2, null, 2) + `;

export function buildHsk2Data() {
  const formattedHsk2 = rawHsk2Vocab.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    lesson: v.lesson,
    question: v.hanzi + " — " + v.pinyin + " nghĩa là gì?",
    options: v.options,
    correctAnswer: v.correctAnswer,
    explanation: v.explanation,
  }));

  const hsk2Code = "import { QuizQuestion } from '@/types/quiz';\\n\\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(formattedHsk2, null, 2) + ";\\n";

  const outputPath2 = path.resolve(process.cwd(), 'data/hsk2-data.ts');
  fs.writeFileSync(outputPath2, hsk2Code, 'utf-8');
  console.log("Generated HSK 2: " + formattedHsk2.length + " questions at " + outputPath2);

  const combined = [
    ...HSK1_VOCAB_DATA.map((q, idx) => ({ ...q, id: idx + 1, lesson: q.lesson || Math.floor(idx / 10) + 1 })),
    ...formattedHsk2.map((q, idx) => ({ ...q, id: 150 + idx + 1, lesson: (q.lesson || Math.floor(idx / 10) + 1) + 15 }))
  ];

  const combinedCode = "import { QuizQuestion } from '@/types/quiz';\\n\\nexport const HSK_COMBINED_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(combined, null, 2) + ";\\n";

  const outputPathCombined = path.resolve(process.cwd(), 'data/hsk-combined-data.ts');
  fs.writeFileSync(outputPathCombined, combinedCode, 'utf-8');
  console.log("Generated HSK 1+2 Combined: " + combined.length + " questions at " + outputPathCombined);
}

buildHsk2Data();
`;
fs.writeFileSync(path.resolve(process.cwd(), 'scripts/build-hsk2-data.ts'), codeHsk2, 'utf-8');
console.log('✅ Updated scripts/build-data.ts and scripts/build-hsk2-data.ts with clean data');
