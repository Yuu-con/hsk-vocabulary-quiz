import fs from 'fs';
import path from 'path';

interface SentenceItem {
  id: number;
  category: string;
  level: 'hsk1' | 'hsk2' | 'both';
  chinese: string;
  pinyin: string;
  vietnamese: string;
  grammar: string;
  keyVocab: { word: string; pinyin: string; meaning: string }[];
  quizMeaning: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  quizFill: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

const rawSentences: Omit<SentenceItem, 'id' | 'quizMeaning' | 'quizFill'>[] = [
  // 1. Chào hỏi và làm quen (Greetings & Getting Acquainted)
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk1',
    chinese: '你好！很高兴认识你。',
    pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
    vietnamese: 'Chào bạn! Rất vui được quen biết bạn.',
    grammar: 'Phó từ mức độ "很" + Tính từ "高兴" + Động từ "认识" + Tân ngữ "你".',
    keyVocab: [
      { word: '高兴', pinyin: 'gāoxìng', meaning: 'vui mừng' },
      { word: '认识', pinyin: 'rènshi', meaning: 'quen biết' }
    ]
  },
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk1',
    chinese: '早上好，老师！',
    pinyin: 'Zǎoshang hǎo, lǎoshī!',
    vietnamese: 'Chào buổi sáng, thầy giáo!',
    grammar: 'Thời điểm trong ngày + 好: Cách chào hỏi lễ phép theo buổi.',
    keyVocab: [
      { word: '早上', pinyin: 'zǎoshang', meaning: 'buổi sáng' },
      { word: '老师', pinyin: 'lǎoshī', meaning: 'thầy cô giáo' }
    ]
  },
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk2',
    chinese: '好久不见，你最近好吗？',
    pinyin: 'Hǎojiǔ bú jiàn, nǐ zuìjìn hǎo ma?',
    vietnamese: 'Đã lâu không gặp, dạo này bạn khỏe không?',
    grammar: 'Thành ngữ 好久不见 + Câu hỏi với trợ từ nghi vấn "吗".',
    keyVocab: [
      { word: '最近', pinyin: 'zuìjìn', meaning: 'dạo gần đây' },
      { word: '好久', pinyin: 'hǎojiǔ', meaning: 'lâu ngày' }
    ]
  },
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk2',
    chinese: '欢迎你们来到北京！',
    pinyin: 'Huānyíng nǐmen lái dào Běijīng!',
    vietnamese: 'Hoan nghênh các bạn đã đến Bắc Kinh!',
    grammar: 'Động từ "欢迎" + Đại từ số nhiều "你们" + Động từ liên động "来到".',
    keyVocab: [
      { word: '欢迎', pinyin: 'huānyíng', meaning: 'hoan nghênh' },
      { word: '北京', pinyin: 'Běijīng', meaning: 'Bắc Kinh' }
    ]
  },

  // 2. Hỏi tên và giới thiệu bản thân (Name & Self-introduction)
  {
    category: 'Hỏi tên và giới thiệu bản thân',
    level: 'hsk1',
    chinese: '你叫什么名字？',
    pinyin: 'Nǐ jiào shénme míngzi?',
    vietnamese: 'Bạn tên là gì?',
    grammar: 'Chủ ngữ + 叫 + Đại từ nghi vấn "什么" + Danh từ "名字".',
    keyVocab: [
      { word: '叫', pinyin: 'jiào', meaning: 'gọi là, tên là' },
      { word: '名字', pinyin: 'míngzi', meaning: 'tên' }
    ]
  },
  {
    category: 'Hỏi tên và giới thiệu bản thân',
    level: 'hsk1',
    chinese: '我叫李月，我是学生。',
    pinyin: 'Wǒ jiào Lǐ Yuè, wǒ shì xuésheng.',
    vietnamese: 'Tôi tên là Lý Nguyệt, tôi là học sinh.',
    grammar: 'Câu chữ 是: Chủ ngữ + 是 + Danh từ vị ngữ biểu thị danh tính.',
    keyVocab: [
      { word: '学生', pinyin: 'xuésheng', meaning: 'học sinh' }
    ]
  },
  {
    category: 'Hỏi tên và giới thiệu bản thân',
    level: 'hsk2',
    chinese: '请问，您贵姓？',
    pinyin: 'Qǐngwèn, nín guìxìng?',
    vietnamese: 'Xin hỏi, quý tính của ngài là gì?',
    grammar: 'Từ ngữ lịch sự: 请问 (xin hỏi) + 您 (đại từ tôn kính) + 贵姓 (quý tính).',
    keyVocab: [
      { word: '请问', pinyin: 'qǐngwèn', meaning: 'xin hỏi' },
      { word: '贵姓', pinyin: 'guìxìng', meaning: 'quý tính' }
    ]
  },
  {
    category: 'Hỏi tên và giới thiệu bản thân',
    level: 'hsk2',
    chinese: '我来介绍一下我的朋友。',
    pinyin: 'Wǒ lái jièshào yíxià wǒ de péngyou.',
    vietnamese: 'Để tôi giới thiệu một chút về bạn của tôi.',
    grammar: 'Động từ "来" biểu thị ý định chủ động + Động từ lặp/thêm "一下" + Tân ngữ có "的".',
    keyVocab: [
      { word: '介绍', pinyin: 'jièshào', meaning: 'giới thiệu' },
      { word: '一下', pinyin: 'yíxià', meaning: 'một chút, một lát' }
    ]
  },

  // 3. Hỏi tuổi (Asking Age)
  {
    category: 'Hỏi tuổi',
    level: 'hsk1',
    chinese: '你几岁了？',
    pinyin: 'Nǐ jǐ suì le?',
    vietnamese: 'Bạn mấy tuổi rồi? (thường hỏi trẻ nhỏ dưới 10 tuổi)',
    grammar: '几 + Lượng từ tuổi "岁" + Trợ từ ngữ khí "了" biểu thị sự thay đổi/tăng tiến.',
    keyVocab: [
      { word: '几', pinyin: 'jǐ', meaning: 'mấy' },
      { word: '岁', pinyin: 'suì', meaning: 'tuổi' }
    ]
  },
  {
    category: 'Hỏi tuổi',
    level: 'hsk1',
    chinese: '你多大了？',
    pinyin: 'Nǐ duō dà le?',
    vietnamese: 'Bạn bao nhiêu tuổi rồi? (hỏi người cùng lứa tuổi hoặc thanh niên)',
    grammar: '多 + Tính từ "大" dùng để hỏi mức độ độ tuổi.',
    keyVocab: [
      { word: '多大', pinyin: 'duō dà', meaning: 'bao nhiêu tuổi' }
    ]
  },
  {
    category: 'Hỏi tuổi',
    level: 'hsk2',
    chinese: '我今年二十二岁。',
    pinyin: 'Wǒ jīnnián èrshí’èr suì.',
    vietnamese: 'Năm nay tôi 22 tuổi.',
    grammar: 'Trạng ngữ thời gian "今年" đứng trước vị ngữ số từ + lượng từ.',
    keyVocab: [
      { word: '今年', pinyin: 'jīnnián', meaning: 'năm nay' },
      { word: '二十二', pinyin: 'èrshí’èr', meaning: '22' }
    ]
  },

  // 4. Quốc tịch và ngôn ngữ (Nationality & Languages)
  {
    category: 'Quốc tịch và ngôn ngữ',
    level: 'hsk1',
    chinese: '你是哪国人？',
    pinyin: 'Nǐ shì nǎ guó rén?',
    vietnamese: 'Bạn là người nước nào?',
    grammar: 'Chủ ngữ + 是 + 哪 (nào) + 国 (quốc gia) + 人 (người).',
    keyVocab: [
      { word: '哪', pinyin: 'nǎ', meaning: 'nào' },
      { word: '国', pinyin: 'guó', meaning: 'nước, quốc gia' }
    ]
  },
  {
    category: 'Quốc tịch và ngôn ngữ',
    level: 'hsk1',
    chinese: '我是越南人，他在中国学汉语。',
    pinyin: 'Wǒ shì Yuènán rén, tā zài Zhōngguó xué Hànyǔ.',
    vietnamese: 'Tôi là người Việt Nam, anh ấy học tiếng Trung ở Trung Quốc.',
    grammar: 'Giới từ 在 + Địa điểm "中国" + Động từ "学" + Tân ngữ "汉语".',
    keyVocab: [
      { word: '越南', pinyin: 'Yuènán', meaning: 'Việt Nam' },
      { word: '汉语', pinyin: 'Hànyǔ', meaning: 'tiếng Hán, tiếng Trung' }
    ]
  },
  {
    category: 'Quốc tịch và ngôn ngữ',
    level: 'hsk2',
    chinese: '你会说英语和汉语吗？',
    pinyin: 'Nǐ huì shuō Yīngyǔ hé Hànyǔ ma?',
    vietnamese: 'Bạn biết nói tiếng Anh và tiếng Trung không?',
    grammar: 'Động từ năng nguyện "会" (biết qua học tập) + Liên từ "和" nối hai danh từ.',
    keyVocab: [
      { word: '英语', pinyin: 'Yīngyǔ', meaning: 'tiếng Anh' },
      { word: '会', pinyin: 'huì', meaning: 'biết, có thể' }
    ]
  },
  {
    category: 'Quốc tịch và ngôn ngữ',
    level: 'hsk2',
    chinese: '他的汉语说得非常好。',
    pinyin: 'Tā de Hànyǔ shuō de fēicháng hǎo.',
    vietnamese: 'Tiếng Trung của anh ấy nói rất tốt.',
    grammar: 'Bổ ngữ trạng thái: Động từ "说" + 得 + Cụm tính từ miêu tả mức độ "非常好".',
    keyVocab: [
      { word: '非常', pinyin: 'fēicháng', meaning: 'vô cùng, rất' },
      { word: '得', pinyin: 'de', meaning: 'được (trợ từ kết cấu)' }
    ]
  },

  // 5. Gia đình và bạn bè (Family & Friends)
  {
    category: 'Gia đình và bạn bè',
    level: 'hsk1',
    chinese: '你家有几口人？',
    pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?',
    vietnamese: 'Nhà bạn có mấy người?',
    grammar: 'Lượng từ đếm số nhân khẩu trong gia đình: "口".',
    keyVocab: [
      { word: '家', pinyin: 'jiā', meaning: 'nhà, gia đình' },
      { word: '口', pinyin: 'kǒu', meaning: 'người (lượng từ nhân khẩu)' }
    ]
  },
  {
    category: 'Gia đình và bạn bè',
    level: 'hsk1',
    chinese: '我家有四口人：爸爸、妈妈、哥哥和我。',
    pinyin: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.',
    vietnamese: 'Nhà tôi có 4 người: bố, mẹ, anh trai và tôi.',
    grammar: 'Liệt kê các thành viên trong gia đình kết hợp liên từ "和" trước mục cuối cùng.',
    keyVocab: [
      { word: '爸爸', pinyin: 'bàba', meaning: 'bố' },
      { word: '妈妈', pinyin: 'māma', meaning: 'mẹ' },
      { word: '哥哥', pinyin: 'gēge', meaning: 'anh trai' }
    ]
  },
  {
    category: 'Gia đình và bạn bè',
    level: 'hsk2',
    chinese: '我的弟弟比我小两岁。',
    pinyin: 'Wǒ de dìdi bǐ wǒ xiǎo liǎng suì.',
    vietnamese: 'Em trai tôi nhỏ hơn tôi 2 tuổi.',
    grammar: 'Cấu trúc so sánh chữ 比: A + 比 + B + Tính từ + Số lượng chênh lệch.',
    keyVocab: [
      { word: '弟弟', pinyin: 'dìdi', meaning: 'em trai' },
      { word: '比', pinyin: 'bǐ', meaning: 'so với' }
    ]
  },
  {
    category: 'Gia đình và bạn bè',
    level: 'hsk2',
    chinese: '姐姐的眼睛很大，长得很漂亮。',
    pinyin: 'Jiějie de yǎnjing hěn dà, zhǎng de hěn piàoliang.',
    vietnamese: 'Mắt của chị gái rất to, trông rất xinh xắn.',
    grammar: 'Từ chỉ bộ phận cơ thể + Bổ ngữ trạng thái "长得" (trông, phát triển).',
    keyVocab: [
      { word: '眼睛', pinyin: 'yǎnjing', meaning: 'mắt' },
      { word: '漂亮', pinyin: 'piàoliang', meaning: 'đẹp, xinh đẹp' }
    ]
  },

  // 6. Thời gian, ngày tháng và thứ trong tuần (Time & Date)
  {
    category: 'Thời gian, ngày tháng và thứ trong tuần',
    level: 'hsk1',
    chinese: '现在几点？',
    pinyin: 'Xiànzài jǐ diǎn?',
    vietnamese: 'Bây giờ là mấy giờ?',
    grammar: 'Trạng ngữ thời gian "现在" + Từ nghi vấn "几点".',
    keyVocab: [
      { word: '现在', pinyin: 'xiànzài', meaning: 'bây giờ' },
      { word: '点', pinyin: 'diǎn', meaning: 'giờ' }
    ]
  },
  {
    category: 'Thời gian, ngày tháng và thứ trong tuần',
    level: 'hsk1',
    chinese: '今天星期几？今天星期五。',
    pinyin: 'Jīntiān xīngqījǐ? Jīntiān xīngqīwǔ.',
    vietnamese: 'Hôm nay thứ mấy? Hôm nay thứ Sáu.',
    grammar: 'Thứ trong tuần: 星期 + số (星期一 thứ Hai ... 星期五 thứ Sáu).',
    keyVocab: [
      { word: '今天', pinyin: 'jīntiān', meaning: 'hôm nay' },
      { word: '星期', pinyin: 'xīngqī', meaning: 'tuần, thứ' }
    ]
  },
  {
    category: 'Thời gian, ngày tháng và thứ trong tuần',
    level: 'hsk1',
    chinese: '明天是九月十号。',
    pinyin: 'Míngtiān shì jiǔ yuè shí hào.',
    vietnamese: 'Ngày mai là ngày mùng 10 tháng 9.',
    grammar: 'Quy tắc nói ngày tháng tiếng Trung: Tháng trước ngày sau (月 -> 号/日).',
    keyVocab: [
      { word: '明天', pinyin: 'míngtiān', meaning: 'ngày mai' },
      { word: '月', pinyin: 'yuè', meaning: 'tháng' },
      { word: '号', pinyin: 'hào', meaning: 'ngày' }
    ]
  },
  {
    category: 'Thời gian, ngày tháng và thứ trong tuần',
    level: 'hsk2',
    chinese: '我们下午三点半在学校门前见。',
    pinyin: 'Wǒmen xiàwǔ sān diǎn bàn zài xuéxiào ménqián jiàn.',
    vietnamese: 'Chúng ta gặp nhau lúc 3 rưỡi chiều trước cổng trường.',
    grammar: 'Thứ tự thời gian và địa điểm: Chủ ngữ + Thời gian + Tại địa điểm + Động từ.',
    keyVocab: [
      { word: '下午', pinyin: 'xiàwǔ', meaning: 'buổi chiều' },
      { word: '半', pinyin: 'bàn', meaning: 'rưỡi, nửa' },
      { word: '门', pinyin: 'mén', meaning: 'cửa, cổng' }
    ]
  },

  // 7. Trường học và công việc (School & Work)
  {
    category: 'Trường học và công việc',
    level: 'hsk1',
    chinese: '你在哪儿工作？',
    pinyin: 'Nǐ zài nǎr gōngzuò?',
    vietnamese: 'Bạn làm việc ở đâu?',
    grammar: 'Chủ ngữ + 在 + 哪儿 (ở đâu) + Động từ "工作".',
    keyVocab: [
      { word: '哪儿', pinyin: 'nǎr', meaning: 'ở đâu' },
      { word: '工作', pinyin: 'gōngzuò', meaning: 'làm việc, công việc' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk1',
    chinese: '我在医院工作，我是医生。',
    pinyin: 'Wǒ zài yīyuàn gōngzuò, wǒ shì yīshēng.',
    vietnamese: 'Tôi làm việc ở bệnh viện, tôi là bác sĩ.',
    grammar: 'Cấu trúc địa điểm hành động: 在 + N(nơi chốn) + V.',
    keyVocab: [
      { word: '医院', pinyin: 'yīyuàn', meaning: 'bệnh viện' },
      { word: '医生', pinyin: 'yīshēng', meaning: 'bác sĩ' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk2',
    chinese: '明天早上八点开始考试。',
    pinyin: 'Míngtiān zǎoshang bā diǎn kāishǐ kǎoshì.',
    vietnamese: '8 giờ sáng mai bắt đầu thi.',
    grammar: 'Trạng ngữ thời gian chi tiết + Động từ "开始" + Động từ/Danh từ "考试".',
    keyVocab: [
      { word: '开始', pinyin: 'kāishǐ', meaning: 'bắt đầu' },
      { word: '考试', pinyin: 'kǎoshì', meaning: 'thi, kiểm tra' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk2',
    chinese: '这个问题我可以帮你解决。',
    pinyin: 'Zhè ge wèntí wǒ kěyǐ bāng nǐ jiějué.',
    vietnamese: 'Vấn đề này tôi có thể giúp bạn giải quyết.',
    grammar: 'Động từ năng nguyện "可以" + Động từ liên động "帮... làm gì".',
    keyVocab: [
      { word: '问题', pinyin: 'wèntí', meaning: 'vấn đề, câu hỏi' },
      { word: '可以', pinyin: 'kěyǐ', meaning: 'có thể' },
      { word: '帮', pinyin: 'bāng', meaning: 'giúp đỡ' }
    ]
  },

  // 8. Ăn uống và mua sắm (Food & Shopping)
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk1',
    chinese: '你想吃什么？我想吃中国菜。',
    pinyin: 'Nǐ xiǎng chī shénme? Wǒ xiǎng chī Zhōngguó cài.',
    vietnamese: 'Bạn muốn ăn gì? Tôi muốn ăn món ăn Trung Quốc.',
    grammar: 'Động từ năng nguyện "想" (muốn, nghĩ) + Động từ "吃" + Tân ngữ.',
    keyVocab: [
      { word: '想', pinyin: 'xiǎng', meaning: 'muốn, nhớ' },
      { word: '菜', pinyin: 'cài', meaning: 'món ăn, rau' }
    ]
  },
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk1',
    chinese: '请喝茶，请坐！',
    pinyin: 'Qǐng hē chá, qǐng zuò!',
    vietnamese: 'Mời uống trà, mời ngồi!',
    grammar: 'Câu cầu khiến lịch sự: 请 + Động từ.',
    keyVocab: [
      { word: '喝', pinyin: 'hē', meaning: 'uống' },
      { word: '茶', pinyin: 'chá', meaning: 'trà' },
      { word: '坐', pinyin: 'zuò', meaning: 'ngồi' }
    ]
  },
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk2',
    chinese: '服务员，请给我们一份菜单。',
    pinyin: 'Fúwùyuán, qǐng gěi wǒmen yí fèn càidān.',
    vietnamese: 'Phục vụ, xin cho chúng tôi một cuốn thực đơn.',
    grammar: 'Xưng hô phục vụ + Giới từ 给 + Tân ngữ người + Lượng từ 份 + Danh từ 菜单.',
    keyVocab: [
      { word: '服务员', pinyin: 'fúwùyuán', meaning: 'nhân viên phục vụ' },
      { word: '给', pinyin: 'gěi', meaning: 'cho, đưa' }
    ]
  },
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk2',
    chinese: '这家饭馆的羊肉真好吃！',
    pinyin: 'Zhè jiā fànguǎn de yángròu zhēn hǎochī!',
    vietnamese: 'Thịt cừu của quán ăn này thật là ngon!',
    grammar: 'Phó từ cảm thán "真" + Tính từ "好吃" biểu thị sự khen ngợi chân thành.',
    keyVocab: [
      { word: '羊肉', pinyin: 'yángròu', meaning: 'thịt cừu' },
      { word: '真', pinyin: 'zhēn', meaning: 'thật sự' },
      { word: '好吃', pinyin: 'hǎochī', meaning: 'ngon miệng' }
    ]
  },

  // 9. Hỏi giá tiền (Asking Prices)
  {
    category: 'Hỏi giá tiền',
    level: 'hsk1',
    chinese: '这个苹果多少钱一斤？',
    pinyin: 'Zhè ge píngguǒ duōshao qián yì jīn?',
    vietnamese: 'Táo này bao nhiêu tiền một cân (500g)?',
    grammar: 'Từ nghi vấn "多少钱" hỏi số lượng tiền tệ + Đơn vị cân đo.',
    keyVocab: [
      { word: '多少', pinyin: 'duōshao', meaning: 'bao nhiêu' },
      { word: '苹果', pinyin: 'píngguǒ', meaning: 'quả táo' },
      { word: '钱', pinyin: 'qián', meaning: 'tiền' }
    ]
  },
  {
    category: 'Hỏi giá tiền',
    level: 'hsk1',
    chinese: '太贵了，能不能便宜一点儿？',
    pinyin: 'Tài guì le, néng bu néng piányi yìdiǎnr?',
    vietnamese: 'Đắt quá rồi, có thể rẻ hơn một chút không?',
    grammar: 'Thán từ "太...了" + Nghi vấn chính phản "能不能" + Tính từ + 一点儿.',
    keyVocab: [
      { word: '贵', pinyin: 'guì', meaning: 'đắt' },
      { word: '便宜', pinyin: 'piányi', meaning: 'rẻ' }
    ]
  },
  {
    category: 'Hỏi giá tiền',
    level: 'hsk2',
    chinese: '这件衣服一共一百块钱。',
    pinyin: 'Zhè jiàn yīfu yígòng yì bǎi kuài qián.',
    vietnamese: 'Bộ quần áo này tổng cộng 100 tệ.',
    grammar: 'Lượng từ của quần áo "件" + Phó từ tổng cộng "一共" + Số từ + 块.',
    keyVocab: [
      { word: '件', pinyin: 'jiàn', meaning: 'chiếc, cái (quần áo)' },
      { word: '一共', pinyin: 'yígòng', meaning: 'tổng cộng' },
      { word: '块', pinyin: 'kuài', meaning: 'đồng, tệ' }
    ]
  },

  // 10. Địa điểm và phương hướng (Locations & Directions)
  {
    category: 'Địa điểm và phương hướng',
    level: 'hsk1',
    chinese: '书在桌子上，电脑在书的旁边。',
    pinyin: 'Shū zài zhuōzi shang, diànnǎo zài shū de pángbiān.',
    vietnamese: 'Sách ở trên bàn, máy tính ở bên cạnh quyển sách.',
    grammar: 'Từ chỉ phương vị: Danh từ + 上 / 旁边 biểu thị vị trí.',
    keyVocab: [
      { word: '桌子', pinyin: 'zhuōzi', meaning: 'cái bàn' },
      { word: '旁边', pinyin: 'pángbiān', meaning: 'bên cạnh' }
    ]
  },
  {
    category: 'Địa điểm và phương hướng',
    level: 'hsk1',
    chinese: '学校在医院的前面。',
    pinyin: 'Xuéxiào zài yīyuàn de qiánmiàn.',
    vietnamese: 'Trường học ở phía trước bệnh viện.',
    grammar: 'Cấu trúc vị trí: A + 在 + B + 的 + Phương vị từ (前面).',
    keyVocab: [
      { word: '前面', pinyin: 'qiánmiàn', meaning: 'phía trước' }
    ]
  },
  {
    category: 'Địa điểm và phương hướng',
    level: 'hsk2',
    chinese: '往前走，到红绿灯往右拐。',
    pinyin: 'Wǎng qián zǒu, dào hónglǜdēng wǎng yòu guǎi.',
    vietnamese: 'Đi về phía trước, đến đèn giao thông thì rẽ phải.',
    grammar: 'Giới từ chỉ hướng: 往 + Phương hướng (前/右) + Động từ (走/拐).',
    keyVocab: [
      { word: '往', pinyin: 'wǎng', meaning: 'hướng về' },
      { word: '右', pinyin: 'yòu', meaning: 'bên phải' },
      { word: '走', pinyin: 'zǒu', meaning: 'đi' }
    ]
  },
  {
    category: 'Địa điểm và phương hướng',
    level: 'hsk2',
    chinese: '我的家离公司不太远。',
    pinyin: 'Wǒ de jiā lí gōngsī bú tài yuǎn.',
    vietnamese: 'Nhà tôi cách công ty không xa lắm.',
    grammar: 'Cấu trúc khoảng cách: A + 离 + B + (不/很) + 远/近.',
    keyVocab: [
      { word: '离', pinyin: 'lí', meaning: 'cách' },
      { word: '远', pinyin: 'yuǎn', meaning: 'xa' },
      { word: '公司', pinyin: 'gōngsī', meaning: 'công ty' }
    ]
  },

  // 11. Đi lại và hoạt động hằng ngày (Travel & Daily Routine)
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk1',
    chinese: '你怎么去学校？我坐出租车去。',
    pinyin: 'Nǐ zěnme qù xuéxiào? Wǒ zuò chūzūchē qù.',
    vietnamese: 'Bạn đi đến trường bằng phương tiện gì? Tôi đi xe taxi.',
    grammar: 'Từ nghi vấn "怎么" hỏi phương thức hành động + Động từ liên động "坐...去...".',
    keyVocab: [
      { word: '怎么', pinyin: 'zěnme', meaning: 'như thế nào' },
      { word: '出租车', pinyin: 'chūzūchē', meaning: 'xe taxi' }
    ]
  },
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk2',
    chinese: '他每天早上都跑步半个小时。',
    pinyin: 'Tā měitiān zǎoshang dōu pǎobù bàn ge xiǎoshí.',
    vietnamese: 'Mỗi buổi sáng anh ấy đều chạy bộ nửa tiếng đồng hồ.',
    grammar: 'Mỗi ... đều: 每天 ... 都 + Động từ + Bổ ngữ thời lượng "半个小时".',
    keyVocab: [
      { word: '每天', pinyin: 'měitiān', meaning: 'mỗi ngày' },
      { word: '跑步', pinyin: 'pǎobù', meaning: 'chạy bộ' },
      { word: '小时', pinyin: 'xiǎoshí', meaning: 'tiếng, giờ đồng hồ' }
    ]
  },
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk2',
    chinese: '我们坐飞机去旅游，好吗？',
    pinyin: 'Wǒmen zuò fēijī qù lǚyóu, hǎo ma?',
    vietnamese: 'Chúng ta đi máy bay đi du lịch nhé, được không?',
    grammar: 'Động từ liên động "坐飞机去旅游" + Câu hỏi thương lượng "好吗".',
    keyVocab: [
      { word: '飞机', pinyin: 'fēijī', meaning: 'máy bay' },
      { word: '旅游', pinyin: 'lǚyóu', meaning: 'du lịch' }
    ]
  },
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk2',
    chinese: '起床以后，我先洗脸再吃早饭。',
    pinyin: 'Qǐchuáng yǐhòu, wǒ xiān xǐliǎn zài chī zǎofàn.',
    vietnamese: 'Sau khi thức dậy, tôi rửa mặt trước rồi mới ăn sáng.',
    grammar: 'Hành động theo trình tự thời gian: ...以后 (sau khi) + 先... 再... (trước... rồi sau đó...).',
    keyVocab: [
      { word: '起床', pinyin: 'qǐchuáng', meaning: 'thức dậy' },
      { word: '洗', pinyin: 'xǐ', meaning: 'rửa, giặt' },
      { word: '再', pinyin: 'zài', meaning: 'lại, rồi mới' }
    ]
  },

  // 12. Sở thích và khả năng (Hobbies & Abilities)
  {
    category: 'Sở thích và khả năng',
    level: 'hsk1',
    chinese: '他很喜欢看中国电影。',
    pinyin: 'Tā hěn xǐhuan kàn Zhōngguó diànyǐng.',
    vietnamese: 'Anh ấy rất thích xem phim điện ảnh Trung Quốc.',
    grammar: 'Phó từ mức độ "很" + Động từ tâm lý "喜欢" + Cụm tân ngữ.',
    keyVocab: [
      { word: '喜欢', pinyin: 'xǐhuan', meaning: 'thích' },
      { word: '电影', pinyin: 'diànyǐng', meaning: 'phim điện ảnh' }
    ]
  },
  {
    category: 'Sở thích và khả năng',
    level: 'hsk2',
    chinese: '你平时有什么爱好？',
    pinyin: 'Nǐ píngshí yǒu shénme àihào?',
    vietnamese: 'Bình thường bạn có sở thích gì?',
    grammar: 'Chủ ngữ + Trạng từ "平时" + Động từ "有" + Nghi vấn "什么" + Danh từ "爱好".',
    keyVocab: [
      { word: '平时', pinyin: 'píngshí', meaning: 'bình thường, ngày thường' },
      { word: '爱好', pinyin: 'àihào', meaning: 'sở thích' }
    ]
  },
  {
    category: 'Sở thích và khả năng',
    level: 'hsk2',
    chinese: '我非常喜欢打篮球和唱歌。',
    pinyin: 'Wǒ fēicháng xǐhuan dǎ lánqiú hé chànggē.',
    vietnamese: 'Tôi vô cùng thích chơi bóng rổ và hát ca.',
    grammar: 'Động từ chơi bóng thể thao "打" + Tên môn bóng "篮球" + Liên từ 和.',
    keyVocab: [
      { word: '打篮球', pinyin: 'dǎ lánqiú', meaning: 'chơi bóng rổ' },
      { word: '唱歌', pinyin: 'chànggē', meaning: 'ca hát' }
    ]
  },
  {
    category: 'Sở thích và khả năng',
    level: 'hsk2',
    chinese: '她跳舞跳得非常好。',
    pinyin: 'Tā tiàowǔ tiào de fēicháng hǎo.',
    vietnamese: 'Cô ấy khiêu vũ rất đẹp / múa rất giỏi.',
    grammar: 'Cấu trúc lặp động từ khi có tân ngữ mang bổ ngữ trạng thái: V+O + V + 得 + Adj.',
    keyVocab: [
      { word: '跳舞', pinyin: 'tiàowǔ', meaning: 'khiêu vũ, múa' }
    ]
  },

  // 13. Hỏi đường và vị trí (Asking for Directions)
  {
    category: 'Hỏi đường và vị trí',
    level: 'hsk1',
    chinese: '洗手间在哪儿？',
    pinyin: 'Xǐshǒujiān zài nǎr?',
    vietnamese: 'Nhà vệ sinh ở đâu vậy?',
    grammar: 'Danh từ địa điểm + 在 + 哪儿 (ở đâu).',
    keyVocab: [
      { word: '洗手间', pinyin: 'xǐshǒujiān', meaning: 'nhà vệ sinh' }
    ]
  },
  {
    category: 'Hỏi đường và vị trí',
    level: 'hsk2',
    chinese: '请问，去火车站怎么走？',
    pinyin: 'Qǐngwèn, qù huǒchēzhàn zěnme zǒu?',
    vietnamese: 'Xin hỏi, đi đến ga tàu hỏa thì đi đường nào?',
    grammar: '请问 + 去 + Địa điểm + 怎么走 (hỏi cách đi/hướng đường đi).',
    keyVocab: [
      { word: '火车站', pinyin: 'huǒchēzhàn', meaning: 'ga tàu hỏa' }
    ]
  },
  {
    category: 'Hỏi đường và vị trí',
    level: 'hsk2',
    chinese: '超市就在那家银行旁边。',
    pinyin: 'Chāoshì jiù zài nà jiā yínháng pángbiān.',
    vietnamese: 'Siêu thị nằm ngay bên cạnh ngân hàng kia.',
    grammar: 'Phó từ nhấn mạnh "就" + 在 + Cụm danh từ nơi chốn + Phương vị từ 旁边.',
    keyVocab: [
      { word: '就', pinyin: 'jiù', meaning: 'ngay, chính là' },
      { word: '银行', pinyin: 'yínháng', meaning: 'ngân hàng' }
    ]
  },

  // 14. Mời, đề nghị và nhờ giúp đỡ (Invitations & Requests)
  {
    category: 'Mời, đề nghị và nhờ giúp đỡ',
    level: 'hsk1',
    chinese: '我可以坐这里吗？当然可以。',
    pinyin: 'Wǒ kěyǐ zuò zhèlǐ ma? Dāngrán kěyǐ.',
    vietnamese: 'Tôi có thể ngồi ở đây không? Đương nhiên được.',
    grammar: 'Câu xin phép: Chủ ngữ + 可以 + Động từ + 吗? Trả lời: 当然 (đương nhiên) + 可以.',
    keyVocab: [
      { word: '这里', pinyin: 'zhèlǐ', meaning: 'ở đây, chỗ này' },
      { word: '当然', pinyin: 'dāngrán', meaning: 'đương nhiên' }
    ]
  },
  {
    category: 'Mời, đề nghị và nhờ giúp đỡ',
    level: 'hsk2',
    chinese: '别说话，请大家听我说。',
    pinyin: 'Bié shuōhuà, qǐng dàjiā tīng wǒ shuō.',
    vietnamese: 'Đừng nói chuyện nữa, xin mọi người hãy nghe tôi nói.',
    grammar: 'Phó từ cấm đoán "别" (đừng) + Động từ + Câu cầu khiến "请大家...".',
    keyVocab: [
      { word: '别', pinyin: 'bié', meaning: 'đừng' },
      { word: '大家', pinyin: 'dàjiā', meaning: 'mọi người' },
      { word: '听', pinyin: 'tīng', meaning: 'nghe' }
    ]
  },
  {
    category: 'Mời, đề nghị và nhờ giúp đỡ',
    level: 'hsk2',
    chinese: '你能帮我买一杯咖啡吗？',
    pinyin: 'Nǐ néng bāng wǒ mǎi yì bēi kāfēi ma?',
    vietnamese: 'Bạn có thể giúp tôi mua một ly cà phê không?',
    grammar: 'Câu nhờ vả lịch sự: 能 + 帮 + Tân ngữ + Động từ + 吗?',
    keyVocab: [
      { word: '杯', pinyin: 'bēi', meaning: 'cốc, ly (lượng từ)' },
      { word: '咖啡', pinyin: 'kāfēi', meaning: 'cà phê' }
    ]
  },
  {
    category: 'Mời, đề nghị và nhờ giúp đỡ',
    level: 'hsk2',
    chinese: '太感谢你了！不客气。',
    pinyin: 'Tài gǎnxiè nǐ le! Bú kèqi.',
    vietnamese: 'Vô cùng cảm ơn bạn! Không có gì đâu.',
    grammar: 'Cách cảm ơn chân thành và câu đáp lễ thông dụng: 不客气.',
    keyVocab: [
      { word: '感谢', pinyin: 'gǎnxiè', meaning: 'cảm tạ, cảm ơn' },
      { word: '不客气', pinyin: 'bú kèqi', meaning: 'đừng khách sáo, không có chi' }
    ]
  },

  // Thêm các mẫu câu thường gặp thiết thực khác để đạt >55 câu phong phú
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk1',
    chinese: '对不起！没关系。',
    pinyin: 'Duìbuqǐ! Méi guānxi.',
    vietnamese: 'Xin lỗi! Không sao đâu.',
    grammar: 'Cặp đối thoại xin lỗi và tha thứ kinh điển trong tiếng Hán cơ bản.',
    keyVocab: [
      { word: '对不起', pinyin: 'duìbuqǐ', meaning: 'xin lỗi' },
      { word: '没关系', pinyin: 'méi guānxi', meaning: 'không có sao' }
    ]
  },
  {
    category: 'Thời gian, ngày tháng và thứ trong tuần',
    level: 'hsk2',
    chinese: '现在差五分八点，快迟到了。',
    pinyin: 'Xiànzài chà wǔ fēn bā diǎn, kuài chídào le.',
    vietnamese: 'Bây giờ là 8 giờ kém 5, sắp muộn rồi.',
    grammar: 'Cách nói giờ kém: 差 + số phút + số giờ; Cấu trúc sắp xảy ra: 快...了.',
    keyVocab: [
      { word: '差', pinyin: 'chà', meaning: 'kém, thiếu' },
      { word: '迟到', pinyin: 'chídào', meaning: 'đến muộn' }
    ]
  },
  {
    category: 'Thời tiết và cảm nhận',
    level: 'hsk1',
    chinese: '今天天气怎么样？今天很冷。',
    pinyin: 'Jīntiān tiānqì zěnmeyàng? Jīntiān hěn lěng.',
    vietnamese: 'Thời tiết hôm nay thế nào? Hôm nay rất lạnh.',
    grammar: 'Từ nghi vấn "怎么样" dùng để hỏi tính chất, tình trạng của sự vật.',
    keyVocab: [
      { word: '天气', pinyin: 'tiānqì', meaning: 'thời tiết' },
      { word: '怎么样', pinyin: 'zěnmeyàng', meaning: 'thế nào, ra sao' },
      { word: '冷', pinyin: 'lěng', meaning: 'lạnh' }
    ]
  },
  {
    category: 'Thời tiết và cảm nhận',
    level: 'hsk2',
    chinese: '明天会下大雨，出门要带雨伞。',
    pinyin: 'Míngtiān huì xià dàyǔ, chūmén yào dài yǔsǎn.',
    vietnamese: 'Ngày mai sẽ mưa to, ra ngoài nhớ mang ô/dù nhé.',
    grammar: 'Động từ năng nguyện "会" biểu thị khả năng sẽ xảy ra trong tương lai + "要" cần.',
    keyVocab: [
      { word: '下雨', pinyin: 'xiàyǔ', meaning: 'mưa' },
      { word: '雨伞', pinyin: 'yǔsǎn', meaning: 'ô, dù' }
    ]
  },
  {
    category: 'Sức khỏe và cảm giác',
    level: 'hsk2',
    chinese: '你身体怎么样？好些了吗？',
    pinyin: 'Nǐ shēntǐ zěnmeyàng? Hǎo xiē le ma?',
    vietnamese: 'Sức khỏe của bạn thế nào? Đã đỡ hơn chút nào chưa?',
    grammar: 'Hỏi thăm sức khỏe: 身体 + 怎么样; Tính từ + 些 (hơn một chút).',
    keyVocab: [
      { word: '身体', pinyin: 'shēntǐ', meaning: 'thân thể, sức khỏe' }
    ]
  },
  {
    category: 'Sức khỏe và cảm giác',
    level: 'hsk2',
    chinese: '我感冒了，今天想在家休息。',
    pinyin: 'Wǒ gǎnmào le, jīntiān xiǎng zài jiā xiūxi.',
    vietnamese: 'Tôi bị cảm rồi, hôm nay muốn ở nhà nghỉ ngơi.',
    grammar: 'Biểu thị sự phát sinh bệnh tật: Động từ + 了; 在家 + 休息.',
    keyVocab: [
      { word: '感冒', pinyin: 'gǎnmào', meaning: 'cảm cúm' },
      { word: '休息', pinyin: 'xiūxi', meaning: 'nghỉ ngơi' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk1',
    chinese: '老师，我听不懂这句话。',
    pinyin: 'Lǎoshī, wǒ tīng bù dǒng zhè jù huà.',
    vietnamese: 'Thưa thầy, em nghe không hiểu câu nói này.',
    grammar: 'Bổ ngữ khả năng phủ định: Động từ + 不 + Động từ kết quả (听不懂).',
    keyVocab: [
      { word: '懂', pinyin: 'dǒng', meaning: 'hiểu' },
      { word: '话', pinyin: 'huà', meaning: 'lời nói, câu' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk2',
    chinese: '我已经把作业做完了。',
    pinyin: 'Wǒ yǐjīng bǎ zuòyè zuò wán le.',
    vietnamese: 'Tôi đã làm xong bài tập về nhà rồi.',
    grammar: 'Câu chữ 把: Chủ ngữ + 把 + Tân ngữ chịu tác động + Động từ + Bổ ngữ kết quả 完.',
    keyVocab: [
      { word: '已经', pinyin: 'yǐjīng', meaning: 'đã' },
      { word: '作业', pinyin: 'zuòyè', meaning: 'bài tập' },
      { word: '完', pinyin: 'wán', meaning: 'xong, hết' }
    ]
  },
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk2',
    chinese: '这些水果很新鲜，也很甜。',
    pinyin: 'Zhèxiē shuǐguǒ hěn xīnxiān, yě hěn tián.',
    vietnamese: 'Những loại hoa quả này rất tươi, cũng rất ngọt.',
    grammar: 'Đại từ chỉ số nhiều "这些" + Danh từ + 很 A, 也很 B.',
    keyVocab: [
      { word: '水果', pinyin: 'shuǐguǒ', meaning: 'hoa quả, trái cây' },
      { word: '新鲜', pinyin: 'xīnxiān', meaning: 'tươi mới' },
      { word: '甜', pinyin: 'tián', meaning: 'ngọt' }
    ]
  },
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk2',
    chinese: '我们一起去踢足球吧！',
    pinyin: 'Wǒmen yìqǐ qù tī zúqiú ba!',
    vietnamese: 'Chúng mình cùng nhau đi đá bóng nhé!',
    grammar: 'Phó từ "一起" (cùng nhau) + Động từ liên động + Trợ từ ngữ khí đề nghị "吧".',
    keyVocab: [
      { word: '一起', pinyin: 'yìqǐ', meaning: 'cùng nhau' },
      { word: '踢足球', pinyin: 'tī zúqiú', meaning: 'đá bóng' },
      { word: '吧', pinyin: 'ba', meaning: 'nhé, đi (trợ từ)' }
    ]
  },
  {
    category: 'Đi lại và hoạt động hằng ngày',
    level: 'hsk2',
    chinese: '虽然天气不好，但是我们还是去了。',
    pinyin: 'Suīrán tiānqì bù hǎo, dànshì wǒmen háishi qù le.',
    vietnamese: 'Tuy rằng thời tiết không tốt, nhưng chúng tôi vẫn đi.',
    grammar: 'Cặp liên từ chuyển ngoặt: 虽然... 但是... (Tuy rằng... nhưng...).',
    keyVocab: [
      { word: '虽然', pinyin: 'suīrán', meaning: 'tuy rằng' },
      { word: '但是', pinyin: 'dànshì', meaning: 'nhưng' },
      { word: '还是', pinyin: 'háishi', meaning: 'vẫn' }
    ]
  },
  {
    category: 'Chào hỏi và làm quen',
    level: 'hsk1',
    chinese: '再见！明天见！',
    pinyin: 'Zàijiàn! Míngtiān jiàn!',
    vietnamese: 'Tạm biệt! Ngày mai gặp lại!',
    grammar: 'Từ chào tạm biệt: 再见; Thời gian + 见 (hẹn gặp vào thời điểm đó).',
    keyVocab: [
      { word: '再见', pinyin: 'zàijiàn', meaning: 'tạm biệt' },
      { word: '见', pinyin: 'jiàn', meaning: 'gặp, nhìn' }
    ]
  },
  {
    category: 'Trường học và công việc',
    level: 'hsk2',
    chinese: '因为下雨，所以今天不上课。',
    pinyin: 'Yīnwèi xiàyǔ, suǒyǐ jīntiān bú shàngkè.',
    vietnamese: 'Bởi vì trời mưa, cho nên hôm nay không đi học.',
    grammar: 'Cặp liên từ chỉ quan hệ nhân quả: 因为... 所以... (Bởi vì... cho nên...).',
    keyVocab: [
      { word: '因为', pinyin: 'yīnwèi', meaning: 'bởi vì' },
      { word: '所以', pinyin: 'suǒyǐ', meaning: 'cho nên' },
      { word: '上课', pinyin: 'shàngkè', meaning: 'lên lớp, đi học' }
    ]
  },
  {
    category: 'Ăn uống và mua sắm',
    level: 'hsk2',
    chinese: '你还要别的菜吗？不要了，谢谢。',
    pinyin: 'Nǐ hái yào bié de cài ma? Bú yào le, xièxie.',
    vietnamese: 'Bạn còn muốn món nào khác không? Không cần nữa đâu, cảm ơn.',
    grammar: 'Phó từ "还" (còn) + Động từ + Đại từ "别的" (cái khác) + Danh từ.',
    keyVocab: [
      { word: '还', pinyin: 'hái', meaning: 'còn' },
      { word: '别', pinyin: 'bié', meaning: 'khác' }
    ]
  },
  {
    category: 'Sở thích và khả năng',
    level: 'hsk2',
    chinese: '除了看书，我还会弹钢琴。',
    pinyin: 'Chúle kànshū, wǒ hái huì tán gāngqín.',
    vietnamese: 'Ngoài đọc sách ra, tôi còn biết chơi đàn dương cầm.',
    grammar: 'Cấu trúc loại trừ hoặc bổ sung: 除了... 以外，还... (Ngoài... ra, còn...).',
    keyVocab: [
      { word: '除了', pinyin: 'chúle', meaning: 'ngoài ra, trừ phi' },
      { word: '看书', pinyin: 'kànshū', meaning: 'đọc sách' }
    ]
  },
  {
    category: 'Hỏi đường và vị trí',
    level: 'hsk2',
    chinese: '去那儿坐公共汽车需要多长时间？',
    pinyin: 'Qù nàr zuò gōnggòng qìchē xūyào duō cháng shíjiān?',
    vietnamese: 'Đi đến đó bằng xe buýt cần mất bao lâu?',
    grammar: 'Cụm từ hỏi độ dài thời gian: 多长时间 (bao lâu) kết hợp động từ 需要 (cần).',
    keyVocab: [
      { word: '公共汽车', pinyin: 'gōnggòng qìchē', meaning: 'xe buýt' },
      { word: '需要', pinyin: 'xūyào', meaning: 'cần, nhu cầu' },
      { word: '时间', pinyin: 'shíjiān', meaning: 'thời gian' }
    ]
  },
  {
    category: 'Mời, đề nghị và nhờ giúp đỡ',
    level: 'hsk2',
    chinese: '没问题，这件事情包在我身上。',
    pinyin: 'Méi wèntí, zhè jiàn shìqing bāo zài wǒ shēnshang.',
    vietnamese: 'Không vấn đề gì, việc này cứ để tôi lo.',
    grammar: 'Cách diễn đạt khẩu ngữ quen thuộc: 没问题 (không sao) + Lượng từ 件.',
    keyVocab: [
      { word: '事情', pinyin: 'shìqing', meaning: 'sự tình, việc' }
    ]
  }
];

function generateQuizOptions(correct: string, pool: string[]): string[] {
  const filtered = pool.filter(p => p !== correct);
  // Pick 3 random
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 3);
  const all4 = [correct, ...picked].sort(() => Math.random() - 0.5);
  return all4;
}

const allVietnameseMeanings = rawSentences.map(s => s.vietnamese);

const fillWordsPool = [
  '名字', '学生', '老师', '高', '什么', '几', '岁', '中国', '汉语', '医生',
  '多少', '便宜', '贵', '旁边', '前面', '后面', '怎么', '飞机', '喜欢', '洗手间',
  '可以', '帮', '天气', '休息', '作业', '水果', '足球', '为什么', '时间'
];

const sentencesWithQuizzes: SentenceItem[] = rawSentences.map((s, idx) => {
  const id = idx + 1;
  const meaningOptions = generateQuizOptions(s.vietnamese, allVietnameseMeanings);

  // Generate fill-in-blank quiz
  let fillTarget = s.keyVocab[0]?.word || '什么';
  let questionWithBlank = s.chinese.replace(fillTarget, '____');
  if (questionWithBlank === s.chinese) {
    // If not matched, pick first 2 chars
    fillTarget = s.chinese.slice(0, 2);
    questionWithBlank = s.chinese.replace(fillTarget, '____');
  }

  const fillDistractors = fillWordsPool.filter(w => w !== fillTarget && w.length === fillTarget.length);
  const shuffledDist = fillDistractors.sort(() => Math.random() - 0.5);
  const fillOptions = [fillTarget, ...shuffledDist.slice(0, 3)];
  while (fillOptions.length < 4) {
    fillOptions.push(fillWordsPool[Math.floor(Math.random() * fillWordsPool.length)]);
  }
  const randomizedFillOptions = [...new Set(fillOptions)].slice(0, 4).sort(() => Math.random() - 0.5);

  return {
    ...s,
    id,
    quizMeaning: {
      question: `Câu tiếng Trung "${s.chinese}" (${s.pinyin}) có nghĩa là gì?`,
      options: meaningOptions,
      correctAnswer: s.vietnamese,
    },
    quizFill: {
      question: `Chọn từ thích hợp điền vào chỗ trống: ${questionWithBlank}`,
      options: randomizedFillOptions,
      correctAnswer: fillTarget,
      explanation: `Từ cần điền là "${fillTarget}". Cả câu hoàn chỉnh là: "${s.chinese}" (${s.pinyin}) - ${s.vietnamese}.`
    }
  };
});

const fileContent = `// Auto-generated HSK 1-2 Common Sentence Patterns
// Total: ${sentencesWithQuizzes.length} sentences across 14 practical categories
import { SentencePattern } from '@/types/practice';

export const HSK_SENTENCE_PATTERNS: SentencePattern[] = ${JSON.stringify(sentencesWithQuizzes, null, 2)};
`;

const outputPath = path.join(process.cwd(), 'data', 'hsk-sentences-data.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Generated ${sentencesWithQuizzes.length} HSK sentence patterns at ${outputPath}`);
