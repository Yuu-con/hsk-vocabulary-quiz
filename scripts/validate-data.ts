import { HSK1_VOCAB_DATA } from '../data/hsk1-data';

const EXPECTED_WORDS = [
  "爱", "八", "爸爸", "杯子", "北京", "本", "不客气", "不", "菜", "茶",
  "吃", "出租车", "打电话", "大", "的", "点", "电脑", "电视", "电影", "东西",
  "都", "读", "对不起", "多", "多少", "儿子", "二", "饭店", "飞机", "分钟",
  "高兴", "个", "工作", "狗", "汉语", "好", "号", "喝", "和", "很",
  "后面", "回", "会", "几", "家", "叫", "今天", "九", "开", "看",
  "看见", "块", "来", "老师", "了", "冷", "里", "六", "吗", "妈妈",
  "买", "猫", "没关系", "没有", "米饭", "名字", "明天", "哪", "哪儿", "那",
  "呢", "能", "你", "年", "女儿", "朋友", "漂亮", "苹果", "七", "前面",
  "钱", "请", "去", "热", "人", "认识", "三", "商店", "上", "上午",
  "少", "谁", "什么", "十", "时候", "是", "书", "水", "水果", "睡觉",
  "说", "四", "岁", "他", "她", "太", "天气", "听", "同学", "喂",
  "我", "我们", "五", "喜欢", "下", "下午", "下雨", "先生", "现在", "想",
  "小", "小姐", "些", "写", "谢谢", "星期", "学生", "学习", "学校", "一",
  "一点儿", "医生", "医院", "衣服", "椅子", "有", "月", "再见", "在", "怎么",
  "怎么样", "这", "中国", "中午", "住", "桌子", "字", "昨天", "做", "坐"
];

function validateData() {
  const errors: string[] = [];

  // 1. Total count
  if (HSK1_VOCAB_DATA.length !== 150) {
    errors.push(`Expected 150 items, but got ${HSK1_VOCAB_DATA.length}`);
  }

  // 2. ID check
  const idSet = new Set<number>();
  for (let i = 1; i <= 150; i++) {
    const item = HSK1_VOCAB_DATA.find(q => q.id === i);
    if (!item) {
      errors.push(`Missing question with id=${i}`);
    } else if (idSet.has(item.id)) {
      errors.push(`Duplicate question with id=${item.id}`);
    } else {
      idSet.add(item.id);
    }
  }

  // 3. Hanzi, Pinyin, Options, and CorrectAnswer
  const hanziSet = new Set<string>();
  HSK1_VOCAB_DATA.forEach((q, idx) => {
    if (!q.hanzi || q.hanzi.trim() === '') {
      errors.push(`Item ${idx + 1} has empty hanzi`);
    }
    if (!q.pinyin || q.pinyin.trim() === '') {
      errors.push(`Item ${idx + 1} (${q.hanzi}) has empty pinyin`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Item ${q.id} (${q.hanzi}) does not have exactly 4 options`);
    } else {
      // Check for duplicate options within the same question
      const uniqueOptions = new Set(q.options);
      if (uniqueOptions.size !== 4) {
        errors.push(`Item ${q.id} (${q.hanzi}) has duplicate options: ${q.options.join(', ')}`);
      }
      // Check if correctAnswer is in options
      if (!q.options.includes(q.correctAnswer)) {
        errors.push(`Item ${q.id} (${q.hanzi}): correctAnswer '${q.correctAnswer}' is NOT in options!`);
      }
    }

    if (!q.explanation || q.explanation.trim() === '') {
      errors.push(`Item ${q.id} (${q.hanzi}) has empty explanation`);
    }

    // Check duplicate vocabulary
    if (hanziSet.has(q.hanzi)) {
      errors.push(`Duplicate vocabulary found for hanzi: ${q.hanzi}`);
    }
    hanziSet.add(q.hanzi);
  });

  // 4. Expected words check
  EXPECTED_WORDS.forEach(word => {
    if (!hanziSet.has(word)) {
      errors.push(`Expected vocabulary '${word}' is missing from data!`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Data validation FAILED with the following errors:');
    errors.forEach(err => console.error('  - ' + err));
    process.exit(1);
  } else {
    console.log('✅ ALL DATA VALIDATION CHECKS PASSED:');
    console.log(`  - Total count: ${HSK1_VOCAB_DATA.length} / 150`);
    console.log(`  - Unique IDs 1-150: OK`);
    console.log(`  - 4 unique options per question: OK`);
    console.log(`  - CorrectAnswer in options: OK`);
    console.log(`  - Hanzi & Pinyin non-empty: OK`);
    console.log(`  - All 150 prompt words present: OK`);
  }
}

validateData();
