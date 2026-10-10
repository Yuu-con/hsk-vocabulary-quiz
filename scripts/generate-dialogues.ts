import fs from 'fs';
import path from 'path';

interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
}

interface DialogueQuiz {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Dialogue {
  id: number;
  title: string;
  category: string;
  level: 'hsk1' | 'hsk2';
  description: string;
  lines: DialogueLine[];
  keyVocab: { word: string; pinyin: string; meaning: string }[];
  grammarNotes: string[];
  quizzes: DialogueQuiz[];
}

const rawDialogues: Dialogue[] = [
  // 1. Chào hỏi và làm quen (HSK 1)
  {
    id: 1,
    title: 'Làm quen bạn mới',
    category: 'Làm quen',
    level: 'hsk1',
    description: 'Cuộc trò chuyện ngắn khi lần đầu gặp nhau trong lớp học tiếng Hán.',
    lines: [
      { speaker: 'A', chinese: '你好！很高兴认识你。', pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.', vietnamese: 'Chào bạn! Rất vui được làm quen với bạn.' },
      { speaker: 'B', chinese: '你好！我也很高兴认识你。你叫什么名字？', pinyin: 'Nǐ hǎo! Wǒ yě hěn gāoxìng rènshi nǐ. Nǐ jiào shénme míngzi?', vietnamese: 'Chào bạn! Tôi cũng rất vui được làm quen với bạn. Bạn tên là gì?' },
      { speaker: 'A', chinese: '我叫大卫。你呢？', pinyin: 'Wǒ jiào Dàwèi. Nǐ ne?', vietnamese: 'Tôi tên là David. Còn bạn thì sao?' },
      { speaker: 'B', chinese: '我叫王丽，我是中国人。', pinyin: 'Wǒ jiào Wáng Lì, wǒ shì Zhōngguó rén.', vietnamese: 'Tôi tên là Vương Lệ, tôi là người Trung Quốc.' }
    ],
    keyVocab: [
      { word: '认识', pinyin: 'rènshi', meaning: 'quen biết' },
      { word: '名字', pinyin: 'míngzi', meaning: 'tên' },
      { word: '高兴', pinyin: 'gāoxìng', meaning: 'vui mừng' }
    ],
    grammarNotes: [
      'Phó từ "也" (cũng) đứng trước tính từ hoặc động từ: 我也很高兴...',
      'Trợ từ nghi vấn "呢" dùng để hỏi lại câu hỏi trước: 你呢？(Còn bạn thì sao?)'
    ],
    quizzes: [
      {
        question: 'Người nói A tên là gì?',
        options: ['Đại Vệ (David)', 'Vương Lệ', 'Lý Nguyệt', 'Trương Vĩ'],
        correctAnswer: 'Đại Vệ (David)',
        explanation: 'Người A nói: "我叫大卫。" (Tôi tên là David).'
      },
      {
        question: 'Vương Lệ là người nước nào?',
        options: ['Người Trung Quốc', 'Người Việt Nam', 'Người Mỹ', 'Người Anh'],
        correctAnswer: 'Người Trung Quốc',
        explanation: 'Vương Lệ nói: "我是中国人。" (Tôi là người Trung Quốc).'
      }
    ]
  },

  // 2. Giới thiệu bản thân & Quốc tịch (HSK 1)
  {
    id: 2,
    title: 'Hỏi thăm quốc tịch và trường học',
    category: 'Giới thiệu bản thân',
    level: 'hsk1',
    description: 'Hỏi thăm nhau về quốc tịch và trường học.',
    lines: [
      { speaker: 'A', chinese: '请问，你是哪国人？', pinyin: 'Qǐngwèn, nǐ shì nǎ guó rén?', vietnamese: 'Xin hỏi, bạn là người nước nào?' },
      { speaker: 'B', chinese: '我是美国人。你也是美国人吗？', pinyin: 'Wǒ shì Měiguó rén. Nǐ yě shì Měiguó rén ma?', vietnamese: 'Tôi là người Mỹ. Bạn cũng là người Mỹ à?' },
      { speaker: 'A', chinese: '不，我不是美国人，我是越南人。', pinyin: 'Bù, wǒ bú shì Měiguó rén, wǒ shì Yuènán rén.', vietnamese: 'Không, tôi không phải người Mỹ, tôi là người Việt Nam.' },
      { speaker: 'B', chinese: '你在哪儿学汉语？', pinyin: 'Nǐ zài nǎr xué Hànyǔ?', vietnamese: 'Bạn học tiếng Trung ở đâu?' },
      { speaker: 'A', chinese: '我在北京语言大学学汉语。', pinyin: 'Wǒ zài Běijīng Yǔyán Dàxué xué Hànyǔ.', vietnamese: 'Tôi học tiếng Trung ở Đại học Ngôn ngữ Bắc Kinh.' }
    ],
    keyVocab: [
      { word: '哪国人', pinyin: 'nǎ guó rén', meaning: 'người nước nào' },
      { word: '大学', pinyin: 'dàxué', meaning: 'trường đại học' },
      { word: '汉语', pinyin: 'Hànyǔ', meaning: 'tiếng Hán' }
    ],
    grammarNotes: [
      'Phủ định của 是 là 不是 (bú shì).',
      'Cấu trúc địa điểm trước hành động: 在 + Địa điểm + Động từ (在...学汉语).'
    ],
    quizzes: [
      {
        question: 'Người A đến từ quốc gia nào?',
        options: ['Việt Nam', 'Nước Mỹ', 'Trung Quốc', 'Hàn Quốc'],
        correctAnswer: 'Việt Nam',
        explanation: 'Người A nói: "我是越南人。" (Tôi là người Việt Nam).'
      },
      {
        question: 'Người A học tiếng Trung ở đâu?',
        options: ['Đại học Ngôn ngữ Bắc Kinh', 'Tại nhà riêng', 'Đại học Hà Nội', 'Trường cấp ba'],
        correctAnswer: 'Đại học Ngôn ngữ Bắc Kinh',
        explanation: 'Người A nói: "我在北京语言大学学汉语。"'
      }
    ]
  },

  // 3. Gia đình (HSK 1)
  {
    id: 3,
    title: 'Gia đình bạn có mấy người?',
    category: 'Gia đình',
    level: 'hsk1',
    description: 'Xem ảnh gia đình và hỏi thăm các thành viên.',
    lines: [
      { speaker: 'A', chinese: '这是你的家庭照片吗？', pinyin: 'Zhè shì nǐ de jiātíng zhàopiàn ma?', vietnamese: 'Đây là ảnh gia đình bạn phải không?' },
      { speaker: 'B', chinese: '是的。这是我的全家福。', pinyin: 'Shì de. Zhè shì wǒ de quánjiāfú.', vietnamese: 'Đúng vậy. Đây là ảnh chụp cả gia đình tôi.' },
      { speaker: 'A', chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', vietnamese: 'Gia đình bạn có mấy người?' },
      { speaker: 'B', chinese: '我家有五口人：爸爸、妈妈、哥哥、妹妹和我。', pinyin: 'Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, gēge, mèimei hé wǒ.', vietnamese: 'Nhà tôi có 5 người: bố, mẹ, anh trai, em gái và tôi.' },
      { speaker: 'A', chinese: '你妹妹多大了？', pinyin: 'Nǐ mèimei duō dà le?', vietnamese: 'Em gái bạn bao nhiêu tuổi rồi?' },
      { speaker: 'B', chinese: '她今年八岁了。', pinyin: 'Tā jīnnián bā suì le.', vietnamese: 'Năm nay em ấy 8 tuổi rồi.' }
    ],
    keyVocab: [
      { word: '照片', pinyin: 'zhàopiàn', meaning: 'bức ảnh' },
      { word: '几口人', pinyin: 'jǐ kǒu rén', meaning: 'mấy người (nhân khẩu)' },
      { word: '今年', pinyin: 'jīnnián', meaning: 'năm nay' }
    ],
    grammarNotes: [
      'Lượng từ "口" dùng riêng cho số người trong gia đình.',
      'Hỏi tuổi: 多大 (duō dà) dùng cho thiếu niên trở lên, 几岁 (jǐ suì) hỏi trẻ nhỏ.'
    ],
    quizzes: [
      {
        question: 'Gia đình người B có tất cả bao nhiêu thành viên?',
        options: ['5 người', '4 người', '3 người', '6 người'],
        correctAnswer: '5 người',
        explanation: 'Người B nói: "我家有五口人：爸爸、妈妈、哥哥、妹妹和我。"'
      },
      {
        question: 'Em gái người B năm nay mấy tuổi?',
        options: ['8 tuổi', '10 tuổi', '12 tuổi', '6 tuổi'],
        correctAnswer: '8 tuổi',
        explanation: 'Người B nói: "她今年八岁了。"'
      }
    ]
  },

  // 4. Trường học & Lớp học (HSK 1)
  {
    id: 4,
    title: 'Mượn sách trong thư viện',
    category: 'Trường học',
    level: 'hsk1',
    description: 'Hỏi sách và học tập trong thư viện trường.',
    lines: [
      { speaker: 'A', chinese: '请问，这本书是你的吗？', pinyin: 'Qǐngwèn, zhè běn shū shì nǐ de ma?', vietnamese: 'Xin hỏi, quyển sách này là của bạn phải không?' },
      { speaker: 'B', chinese: '不是，这是王老师的书。', pinyin: 'Bú shì, zhè shì Wáng lǎoshī de shū.', vietnamese: 'Không phải, đây là sách của thầy Vương.' },
      { speaker: 'A', chinese: '王老师现在在学校吗？', pinyin: 'Wáng lǎoshī xiànzài zài xuéxiào ma?', vietnamese: 'Thầy Vương bây giờ có ở trường không?' },
      { speaker: 'B', chinese: '他在图书馆看书呢。', pinyin: 'Tā zài túshūguǎn kàn shū ne.', vietnamese: 'Thầy ấy đang đọc sách ở thư viện đó.' }
    ],
    keyVocab: [
      { word: '本', pinyin: 'běn', meaning: 'quyển, cuốn (lượng từ)' },
      { word: '图书馆', pinyin: 'túshūguǎn', meaning: 'thư viện' },
      { word: '现在', pinyin: 'xiànzài', meaning: 'bây giờ' }
    ],
    grammarNotes: [
      'Lượng từ của sách là "本" (běn): 一本书.',
      'Cấu trúc diễn tả hành động đang diễn ra: 在 + Nơi chốn + Động từ + 呢.'
    ],
    quizzes: [
      {
        question: 'Quyển sách này là của ai?',
        options: ['Thầy giáo Vương', 'Bạn học A', 'Bạn học B', 'Thư viện'],
        correctAnswer: 'Thầy giáo Vương',
        explanation: 'Người B nói: "不是，这是王老师的书。"'
      },
      {
        question: 'Thầy Vương hiện đang ở đâu?',
        options: ['Ở thư viện', 'Ở lớp học', 'Ở nhà riêng', 'Ở văn phòng'],
        correctAnswer: 'Ở thư viện',
        explanation: 'Người B nói: "他在图书馆看书呢。"'
      }
    ]
  },

  // 5. Hỏi giờ và thời gian (HSK 1)
  {
    id: 5,
    title: 'Hỏi giờ và hẹn ăn cơm trưa',
    category: 'Hỏi giờ',
    level: 'hsk1',
    description: 'Hỏi thời gian hiện tại và rủ nhau đi ăn trưa.',
    lines: [
      { speaker: 'A', chinese: '现在几点了？', pinyin: 'Xiànzài jǐ diǎn le?', vietnamese: 'Bây giờ là mấy giờ rồi?' },
      { speaker: 'B', chinese: '现在中午十二点十分。', pinyin: 'Xiànzài zhōngwǔ shí’èr diǎn shí fēn.', vietnamese: 'Bây giờ là 12 giờ 10 phút trưa.' },
      { speaker: 'A', chinese: '你饿不饿？我们去吃午饭吧。', pinyin: 'Nǐ è bu è? Wǒmen qù chī wǔfàn ba.', vietnamese: 'Bạn có đói không? Chúng ta đi ăn cơm trưa nhé.' },
      { speaker: 'B', chinese: '好啊，我想吃中国菜。', pinyin: 'Hǎo a, wǒ xiǎng chī Zhōngguó cài.', vietnamese: 'Được thôi, tôi muốn ăn món Trung Quốc.' }
    ],
    keyVocab: [
      { word: '中午', pinyin: 'zhōngwǔ', meaning: 'buổi trưa' },
      { word: '饿', pinyin: 'è', meaning: 'đói bụng' },
      { word: '午饭', pinyin: 'wǔfàn', meaning: 'cơm trưa' }
    ],
    grammarNotes: [
      'Nghi vấn chính phản: Tính từ + 不 + Tính từ (饿不饿: có đói không?).',
      'Đề nghị thân mật: Thêm trợ từ "吧" ở cuối câu.'
    ],
    quizzes: [
      {
        question: 'Lúc hai người nói chuyện là mấy giờ?',
        options: ['12 giờ 10 trưa', '11 giờ 30 trưa', '12 giờ đúng', '1 giờ chiều'],
        correctAnswer: '12 giờ 10 trưa',
        explanation: 'Người B trả lời: "现在中午十二点十分。"'
      },
      {
        question: 'Người B muốn ăn món ăn nước nào?',
        options: ['Món Trung Quốc', 'Món Việt Nam', 'Món Tây', 'Món Nhật'],
        correctAnswer: 'Món Trung Quốc',
        explanation: 'Người B nói: "我想吃中国菜。"'
      }
    ]
  },

  // 6. Mua sắm hoa quả (HSK 1)
  {
    id: 6,
    title: 'Mua táo ở chợ trái cây',
    category: 'Mua sắm',
    level: 'hsk1',
    description: 'Hỏi giá tiền và trả giá khi mua táo.',
    lines: [
      { speaker: 'A', chinese: '老板，这个苹果怎么卖？', pinyin: 'Lǎobǎn, zhè ge píngguǒ zěnme mài?', vietnamese: 'Ông chủ, táo này bán thế nào?' },
      { speaker: 'B', chinese: '五块钱一斤。', pinyin: 'Wǔ kuài qián yì jīn.', vietnamese: 'Năm tệ một cân (500g).' },
      { speaker: 'A', chinese: '太贵了，四块钱一斤可以吗？', pinyin: 'Tài guì le, sì kuài qián yì jīn kěyǐ ma?', vietnamese: 'Đắt quá, bốn tệ một cân được không?' },
      { speaker: 'B', chinese: '行吧，你要买几斤？', pinyin: 'Xíng ba, nǐ yào mǎi jǐ jīn?', vietnamese: 'Được rồi, bạn muốn mua mấy cân?' },
      { speaker: 'A', chinese: '我买三斤，给你十二块钱。', pinyin: 'Wǒ mǎi sān jīn, gěi nǐ shí’èr kuài qián.', vietnamese: 'Tôi mua 3 cân, gửi ông chủ 12 tệ.' }
    ],
    keyVocab: [
      { word: '老板', pinyin: 'lǎobǎn', meaning: 'ông chủ' },
      { word: '斤', pinyin: 'jīn', meaning: 'cân Trung Quốc (500g)' },
      { word: '块', pinyin: 'kuài', meaning: 'đồng, tệ' }
    ],
    grammarNotes: [
      'Cách hỏi giá khẩu ngữ: 怎么卖 (bán thế nào) hoặc 多少钱 (bao nhiêu tiền).',
      'Thán từ cảm thán phàn nàn: 太 + Tính từ + 了 (太贵了: đắt quá).'
    ],
    quizzes: [
      {
        question: 'Ban đầu người bán hàng ra giá bao nhiêu 1 cân?',
        options: ['5 tệ', '4 tệ', '6 tệ', '3 tệ'],
        correctAnswer: '5 tệ',
        explanation: 'Người bán nói: "五块钱一斤。" (5 tệ một cân).'
      },
      {
        question: 'Người mua đã mua bao nhiêu cân táo và trả bao nhiêu tiền?',
        options: ['Mua 3 cân, trả 12 tệ', 'Mua 2 cân, trả 8 tệ', 'Mua 4 cân, trả 16 tệ', 'Mua 3 cân, trả 15 tệ'],
        correctAnswer: 'Mua 3 cân, trả 12 tệ',
        explanation: 'Người A nói: "我买三斤，给你十二块钱。"'
      }
    ]
  },

  // 7. Nhà hàng & Gọi món (HSK 1)
  {
    id: 7,
    title: 'Gọi món ở tiệm cơm',
    category: 'Nhà hàng và gọi món',
    level: 'hsk1',
    description: 'Gọi món ăn và đồ uống tại quán ăn.',
    lines: [
      { speaker: 'A', chinese: '服务员，请问你想吃点儿什么？', pinyin: 'Fúwùyuán, qǐngwèn nǐ xiǎng chī diǎnr shénme?', vietnamese: 'Phục vụ hỏi: Xin hỏi quý khách muốn dùng chút gì?' },
      { speaker: 'B', chinese: '我要一碗米饭和一份牛肉。', pinyin: 'Wǒ yào yì wǎn mǐfàn hé yí fèn niúròu.', vietnamese: 'Cho tôi một bát cơm trắng và một phần thịt bò.' },
      { speaker: 'A', chinese: '您喝什么水？有茶和咖啡。', pinyin: 'Nín hē shénme shuǐ? Yǒu chá hé kāfēi.', vietnamese: 'Ngài uống nước gì ạ? Có trà và cà phê.' },
      { speaker: 'B', chinese: '请给我一杯热茶，谢谢。', pinyin: 'Qǐng gěi wǒ yì bēi rè chá, xièxie.', vietnamese: 'Làm ơn cho tôi một cốc trà nóng, cảm ơn.' }
    ],
    keyVocab: [
      { word: '米饭', pinyin: 'mǐfàn', meaning: 'cơm trắng' },
      { word: '牛肉', pinyin: 'niúròu', meaning: 'thịt bò' },
      { word: '热', pinyin: 'rè', meaning: 'nóng' }
    ],
    grammarNotes: [
      'Lượng từ bát: 碗 (wǎn); lượng từ cốc/ly: 杯 (bēi).',
      'Đại từ kính cẩn "您" (ngài, quý khách).'
    ],
    quizzes: [
      {
        question: 'Vị khách đã gọi món ăn mặn nào?',
        options: ['Thịt bò', 'Thịt cừu', 'Thịt lợn', 'Gà rán'],
        correctAnswer: 'Thịt bò',
        explanation: 'Khách nói: "我要一碗米饭和一份牛肉。"'
      },
      {
        question: 'Khách chọn uống loại đồ uống nào?',
        options: ['Trà nóng', 'Cà phê đá', 'Nước khoáng', 'Trà lạnh'],
        correctAnswer: 'Trà nóng',
        explanation: 'Khách nói: "请给我一杯热茶。"'
      }
    ]
  },

  // 8. Thời tiết (HSK 1)
  {
    id: 8,
    title: 'Hỏi thăm thời tiết cuối tuần',
    category: 'Thời tiết',
    level: 'hsk1',
    description: 'Nói về thời tiết hôm nay và dự định ngày mai.',
    lines: [
      { speaker: 'A', chinese: '今天天气真好，不冷也不热。', pinyin: 'Jīntiān tiānqì zhēn hǎo, bù lěng yě bú rè.', vietnamese: 'Hôm nay thời tiết thật đẹp, không lạnh cũng không nóng.' },
      { speaker: 'B', chinese: '是啊。明天天气怎么样？', pinyin: 'Shì a. Míngtiān tiānqì zěnmeyàng?', vietnamese: 'Đúng vậy. Ngày mai thời tiết thế nào?' },
      { speaker: 'A', chinese: '明天会下雨，天气有点儿冷。', pinyin: 'Míngtiān huì xià yǔ, tiānqì yǒudiǎnr lěng.', vietnamese: 'Ngày mai trời sẽ mưa, thời tiết hơi lạnh một chút.' },
      { speaker: 'B', chinese: '那我们明天在家里看电影吧。', pinyin: 'Nà wǒmen míngtiān zài jiā lǐ kàn diànyǐng ba.', vietnamese: 'Thế thì ngày mai chúng mình ở nhà xem phim điện ảnh nhé.' }
    ],
    keyVocab: [
      { word: '天气', pinyin: 'tiānqì', meaning: 'thời tiết' },
      { word: '下雨', pinyin: 'xià yǔ', meaning: 'đổ mưa' },
      { word: '有点儿', pinyin: 'yǒudiǎnr', meaning: 'hơi, một chút' }
    ],
    grammarNotes: [
      'Cấu trúc tương hỗ: 不 A 也不 B (không A cũng không B).',
      'Phó từ "有点儿" thường đứng trước tính từ diễn tả cảm giác không như ý hoặc bất tiện.'
    ],
    quizzes: [
      {
        question: 'Thời tiết ngày mai được dự báo như thế nào?',
        options: ['Trời sẽ mưa và hơi lạnh', 'Trời nắng gắt', 'Rất nóng bức', 'Có tuyết rơi'],
        correctAnswer: 'Trời sẽ mưa và hơi lạnh',
        explanation: 'Người A nói: "明天会下雨，天气有点儿冷。"'
      },
      {
        question: 'Vì thời tiết ngày mai, hai người quyết định làm gì?',
        options: ['Ở nhà xem phim', 'Đi công viên dạo mát', 'Đi leo núi', 'Đi trung tâm mua sắm'],
        correctAnswer: 'Ở nhà xem phim',
        explanation: 'Người B đề nghị: "那我们明天在家里看电影吧。"'
      }
    ]
  },

  // 9. Sinh hoạt hằng ngày (HSK 1)
  {
    id: 9,
    title: 'Lịch trình một ngày của sinh viên',
    category: 'Sinh hoạt hằng ngày',
    level: 'hsk1',
    description: 'Hỏi về thói quen thức dậy và đi ngủ.',
    lines: [
      { speaker: 'A', chinese: '你每天早上几点起床？', pinyin: 'Nǐ měitiān zǎoshang jǐ diǎn qǐchuáng?', vietnamese: 'Mỗi sáng bạn thức dậy lúc mấy giờ?' },
      { speaker: 'B', chinese: '我早上六点半起床，七点吃早饭。', pinyin: 'Wǒ zǎoshang liù diǎn bàn qǐchuáng, qī diǎn chī zǎofàn.', vietnamese: 'Tôi thức dậy lúc 6 rưỡi sáng, 7 giờ ăn sáng.' },
      { speaker: 'A', chinese: '你晚上什么时候睡觉？', pinyin: 'Nǐ wǎnshang shénme shíhou shuìjiào?', vietnamese: 'Buổi tối bạn đi ngủ lúc mấy giờ?' },
      { speaker: 'B', chinese: '我通常十一点睡觉。你呢？', pinyin: 'Wǒ tōngcháng shíyī diǎn shuìjiào. Nǐ ne?', vietnamese: 'Tôi thường ngủ lúc 11 giờ. Còn bạn thì sao?' },
      { speaker: 'A', chinese: '我睡得很晚，常常十二点以后才睡。', pinyin: 'Wǒ shuì de hěn wǎn, chángcháng shí’èr diǎn yǐhòu cái shuì.', vietnamese: 'Tôi ngủ rất muộn, thường sau 12 giờ mới ngủ.' }
    ],
    keyVocab: [
      { word: '起床', pinyin: 'qǐchuáng', meaning: 'thức dậy' },
      { word: '睡觉', pinyin: 'shuìjiào', meaning: 'đi ngủ' },
      { word: '什么时候', pinyin: 'shénme shíhou', meaning: 'khi nào, lúc nào' }
    ],
    grammarNotes: [
      'Trợ từ kết cấu "得" dùng trong bổ ngữ trạng thái: 睡得很晚.',
      'Phó từ "才" biểu thị sự việc diễn ra muộn hoặc khó khăn.'
    ],
    quizzes: [
      {
        question: 'Người B thức dậy vào lúc mấy giờ sáng?',
        options: ['6 giờ 30 sáng', '7 giờ sáng', '6 giờ sáng', '7 giờ 30 sáng'],
        correctAnswer: '6 giờ 30 sáng',
        explanation: 'Người B nói: "我早上六点半起床。"'
      },
      {
        question: 'Người A thường đi ngủ vào lúc nào?',
        options: ['Sau 12 giờ đêm', '10 giờ tối', '11 giờ đêm', '9 giờ tối'],
        correctAnswer: 'Sau 12 giờ đêm',
        explanation: 'Người A nói: "我睡得很晚，常常十二点以后才睡。"'
      }
    ]
  },

  // 10. Đi xe và hỏi đường (HSK 1)
  {
    id: 10,
    title: 'Hỏi đường đến bệnh viện',
    category: 'Đi xe và hỏi đường',
    level: 'hsk1',
    description: 'Hỏi vị trí của bệnh viện thành phố.',
    lines: [
      { speaker: 'A', chinese: '请问，市医院在哪儿？', pinyin: 'Qǐngwèn, shì yīyuàn zài nǎr?', vietnamese: 'Xin hỏi, bệnh viện thành phố ở đâu vậy?' },
      { speaker: 'B', chinese: '就在前面，离这里不远。', pinyin: 'Jiù zài qiánmiàn, lí zhèlǐ bù yuǎn.', vietnamese: 'Ở ngay phía trước, cách đây không xa.' },
      { speaker: 'A', chinese: '我走路去需要几分钟？', pinyin: 'Wǒ zǒulù qù xūyào jǐ fēnzhōng?', vietnamese: 'Tôi đi bộ đến đó cần mấy phút?' },
      { speaker: 'B', chinese: '走十分钟就到了。', pinyin: 'Zǒu shí fēnzhōng jiù dào le.', vietnamese: 'Đi bộ mười phút là tới nơi rồi.' },
      { speaker: 'A', chinese: '太谢谢你了！不客气。', pinyin: 'Tài xièxie nǐ le! Bú kèqi.', vietnamese: 'Rất cảm ơn bạn! Không có gì đâu.' }
    ],
    keyVocab: [
      { word: '走路', pinyin: 'zǒulù', meaning: 'đi bộ' },
      { word: '分钟', pinyin: 'fēnzhōng', meaning: 'phút' },
      { word: '医院', pinyin: 'yīyuàn', meaning: 'bệnh viện' }
    ],
    grammarNotes: [
      'Cấu trúc khoảng cách: 离 + Địa điểm + 远/近.',
      'Phó từ "就" kết hợp động từ biểu thị sự nhanh chóng: 走十分钟就到了.'
    ],
    quizzes: [
      {
        question: 'Bệnh viện cách vị trí hỏi đường có xa không?',
        options: ['Không xa, ở ngay phía trước', 'Rất xa, phải đi xe buýt', 'Ở phía sau ga tàu', 'Cách 5 cây số'],
        correctAnswer: 'Không xa, ở ngay phía trước',
        explanation: 'Người B đáp: "就在前面，离这里不远。"'
      },
      {
        question: 'Đi bộ đến bệnh viện mất bao lâu?',
        options: ['10 phút', '20 phút', '5 phút', '30 phút'],
        correctAnswer: '10 phút',
        explanation: 'Người B nói: "走十分钟就到了。"'
      }
    ]
  },

  // 11. Hẹn gặp bạn (HSK 2)
  {
    id: 11,
    title: 'Hẹn bạn đi xem phim cuối tuần',
    category: 'Hẹn gặp bạn',
    level: 'hsk2',
    description: 'Thảo luận kế hoạch giải trí vào cuối tuần.',
    lines: [
      { speaker: 'A', chinese: '这个星期六你有空儿吗？', pinyin: 'Zhè ge xīngqīliù nǐ yǒu kòngr ma?', vietnamese: 'Thứ Bảy này bạn có rảnh rỗi không?' },
      { speaker: 'B', chinese: '我有空儿，有什么事吗？', pinyin: 'Wǒ yǒu kòngr, yǒu shénme shì ma?', vietnamese: 'Tôi rảnh, có chuyện gì thế?' },
      { speaker: 'A', chinese: '有一部新电影很不错，我们一起去看吧。', pinyin: 'Yǒu yí bù xīn diànyǐng hěn búcuò, wǒmen yìqǐ qù kàn ba.', vietnamese: 'Có một bộ phim mới rất hay, chúng mình cùng đi xem nhé.' },
      { speaker: 'B', chinese: '太好了！我们在哪儿见？', pinyin: 'Tài hǎo le! Wǒmen zài nǎr jiàn?', vietnamese: 'Tuyệt quá! Chúng ta gặp nhau ở đâu?' },
      { speaker: 'A', chinese: '下午两点在电影院门口见，行吗？', pinyin: 'Xiàwǔ liǎng diǎn zài diànyǐngyuàn ménkǒu jiàn, xíng ma?', vietnamese: '2 giờ chiều gặp ở trước cửa rạp chiếu phim, được không?' },
      { speaker: 'B', chinese: '没问题，不见不散！', pinyin: 'Méi wèntí, bú jiàn bú sàn!', vietnamese: 'Không thành vấn đề, không gặp không về!' }
    ],
    keyVocab: [
      { word: '有空儿', pinyin: 'yǒu kòngr', meaning: 'rảnh rỗi, có thời gian' },
      { word: '不错', pinyin: 'búcuò', meaning: 'rất tốt, không tồi' },
      { word: '不见不散', pinyin: 'bú jiàn bú sàn', meaning: 'không gặp không về' }
    ],
    grammarNotes: [
      'Lượng từ cho phim ảnh là "部" (bù): 一部电影.',
      'Thành ngữ khẩu ngữ hẹn ước: 不见不散 (bú jiàn bú sàn).'
    ],
    quizzes: [
      {
        question: 'Hai người hẹn nhau đi đâu vào thứ Bảy?',
        options: ['Đi rạp chiếu phim xem phim', 'Đi ăn lẩu', 'Đi thư viện ôn bài', 'Đi trung tâm thể thao'],
        correctAnswer: 'Đi rạp chiếu phim xem phim',
        explanation: 'Người A rủ: "有一部新电影很不错，我们一起去看吧。"'
      },
      {
        question: 'Thời gian và địa điểm hẹn gặp là khi nào?',
        options: ['2 giờ chiều ở trước cửa rạp phim', '3 giờ chiều trong rạp phim', '8 giờ sáng tại quán nước', '5 giờ chiều trước cổng trường'],
        correctAnswer: '2 giờ chiều ở trước cửa rạp phim',
        explanation: 'Người A đề nghị: "下午两点在电影院门口见，行吗？"'
      }
    ]
  },

  // 12. Công việc & Phỏng vấn (HSK 2)
  {
    id: 12,
    title: 'Trò chuyện về công việc văn phòng',
    category: 'Công việc',
    level: 'hsk2',
    description: 'Hỏi thăm về công việc hiện tại và đồng nghiệp.',
    lines: [
      { speaker: 'A', chinese: '你在这家公司工作多长时间了？', pinyin: 'Nǐ zài zhè jiā gōngsī gōngzuò duō cháng shíjiān le?', vietnamese: 'Bạn làm việc ở công ty này được bao lâu rồi?' },
      { speaker: 'B', chinese: '我已经工作两年多了。', pinyin: 'Wǒ yǐjīng gōngzuò liǎng nián duō le.', vietnamese: 'Tôi đã làm việc được hơn hai năm rồi.' },
      { speaker: 'A', chinese: '你觉得工作累不累？', pinyin: 'Nǐ juéde gōngzuò lèi bu lèi?', vietnamese: 'Bạn cảm thấy công việc có mệt mỏi không?' },
      { speaker: 'B', chinese: '虽然有点儿累，但是同事们都很热情，我很喜欢。', pinyin: 'Suīrán yǒudiǎnr lèi, dànshì tóngshìmen dōu hěn rèqíng, wǒ hěn xǐhuan.', vietnamese: 'Tuy rằng có chút mệt, nhưng các đồng nghiệp đều rất nhiệt tình, tôi rất thích.' }
    ],
    keyVocab: [
      { word: '公司', pinyin: 'gōngsī', meaning: 'công ty' },
      { word: '同事', pinyin: 'tóngshì', meaning: 'đồng nghiệp' },
      { word: '热情', pinyin: 'rèqíng', meaning: 'nhiệt tình' }
    ],
    grammarNotes: [
      'Biểu thị số lượng ước lượng vượt mức: Số từ + 多 (两年多: hơn hai năm).',
      'Liên từ chuyển ý: 虽然... 但是... (Tuy rằng... nhưng...).'
    ],
    quizzes: [
      {
        question: 'Người B đã làm việc ở công ty này bao lâu?',
        options: ['Hơn hai năm', 'Hơn một năm', 'Nửa năm', 'Ba năm'],
        correctAnswer: 'Hơn hai năm',
        explanation: 'Người B nói: "我已经工作两年多了。"'
      },
      {
        question: 'Thái độ của đồng nghiệp đối với người B như thế nào?',
        options: ['Rất nhiệt tình', 'Lạnh nhạt', 'Nghiêm khắc', 'Bận rộn không tiếp'],
        correctAnswer: 'Rất nhiệt tình',
        explanation: 'Người B nói: "同事们都很热情。"'
      }
    ]
  },

  // 13. Sức khỏe & Khám bệnh (HSK 2)
  {
    id: 13,
    title: 'Đi gặp bác sĩ khi bị ốm',
    category: 'Sinh hoạt hằng ngày',
    level: 'hsk2',
    description: 'Nói về các triệu chứng cảm cúm với bác sĩ.',
    lines: [
      { speaker: 'A', chinese: '医生，我身体不太舒服。', pinyin: 'Yīshēng, wǒ shēntǐ bú tài shūfu.', vietnamese: 'Bác sĩ, người tôi thấy không được khỏe lắm.' },
      { speaker: 'B', chinese: '你哪儿不舒服？发烧了吗？', pinyin: 'Nǐ nǎr bù shūfu? Fāshāo le ma?', vietnamese: 'Bạn khó chịu ở chỗ nào? Có bị sốt không?' },
      { speaker: 'A', chinese: '我头疼，嗓子也疼，昨晚有点儿发烧。', pinyin: 'Wǒ tóuténg, sǎngzi yě téng, zuówǎn yǒudiǎnr fāshāo.', vietnamese: 'Tôi bị đau đầu, họng cũng đau, tối qua có hơi bị sốt.' },
      { speaker: 'B', chinese: '你感冒了。多喝热水，吃完药好好睡一觉。', pinyin: 'Nǐ gǎnmào le. Duō hē rè shuǐ, chī wán yào hǎohǎo shuì yí jiào.', vietnamese: 'Bạn bị cảm cúm rồi. Hãy uống nhiều nước ấm, uống thuốc xong ngủ một giấc thật ngon nhé.' }
    ],
    keyVocab: [
      { word: '舒服', pinyin: 'shūfu', meaning: 'thoải mái, dễ chịu' },
      { word: '发烧', pinyin: 'fāshāo', meaning: 'phát sốt' },
      { word: '感冒', pinyin: 'gǎnmào', meaning: 'cảm cúm' }
    ],
    grammarNotes: [
      'Động từ chỉ mức độ: 多 + Động từ (多喝水: uống nhiều nước; 多休息: nghỉ ngơi nhiều).',
      'Động từ li hợp: 睡觉 -> 睡一觉 (ngủ một giấc).'
    ],
    quizzes: [
      {
        question: 'Bệnh nhân có những triệu chứng gì?',
        options: ['Đau đầu, đau họng và hơi sốt', 'Đau bụng dữ dội', 'Gãy tay chân', 'Chảy máu mũi'],
        correctAnswer: 'Đau đầu, đau họng và hơi sốt',
        explanation: 'Bệnh nhân nói: "我头疼，嗓子也疼，昨晚有点儿发烧。"'
      },
      {
        question: 'Bác sĩ khuyên bệnh nhân nên làm gì?',
        options: ['Uống nhiều nước ấm, uống thuốc và ngủ một giấc', 'Đi làm việc tiếp', 'Uống nước đá lạnh', 'Tập thể dục cường độ cao'],
        correctAnswer: 'Uống nhiều nước ấm, uống thuốc và ngủ một giấc',
        explanation: 'Bác sĩ dặn: "多喝热水，吃完药好好睡一觉。"'
      }
    ]
  },

  // 14. Thể thao và sở thích (HSK 2)
  {
    id: 14,
    title: 'Chơi bóng rổ và tập gym',
    category: 'Sinh hoạt hằng ngày',
    level: 'hsk2',
    description: 'Nói về thói quen rèn luyện thể thao giữ gìn vóc dáng.',
    lines: [
      { speaker: 'A', chinese: '你常常运动吗？', pinyin: 'Nǐ chángcháng yùndòng ma?', vietnamese: 'Bạn có thường xuyên vận động thể thao không?' },
      { speaker: 'B', chinese: '我每个星期都去健身房两次。', pinyin: 'Wǒ měi ge xīngqī dōu qù jiànshēnfáng liǎng cì.', vietnamese: 'Mỗi tuần tôi đều đến phòng tập gym hai lần.' },
      { speaker: 'A', chinese: '你最喜欢什么运动？', pinyin: 'Nǐ zuì xǐhuan shénme yùndòng ma?', vietnamese: 'Bạn thích nhất môn thể thao nào?' },
      { speaker: 'B', chinese: '我最喜欢打篮球，游泳也不错。你呢？', pinyin: 'Wǒ zuì xǐhuan dǎ lánqiú, yóuyǒng yě búcuò. Nǐ ne?', vietnamese: 'Tôi thích nhất là chơi bóng rổ, bơi lội cũng rất được. Còn bạn?' },
      { speaker: 'A', chinese: '我喜欢踢足球，明天下午一起去踢球吧！', pinyin: 'Wǒ xǐhuan tī zúqiú, míngtiān xiàwǔ yìqǐ qù tī qiú ba!', vietnamese: 'Tôi thích đá bóng, chiều mai cùng nhau đi đá bóng nhé!' }
    ],
    keyVocab: [
      { word: '运动', pinyin: 'yùndòng', meaning: 'vận động, thể thao' },
      { word: '打篮球', pinyin: 'dǎ lánqiú', meaning: 'chơi bóng rổ' },
      { word: '游泳', pinyin: 'yóuyǒng', meaning: 'bơi lội' }
    ],
    grammarNotes: [
      'Phó từ mức độ cao nhất "最" + Tính từ/Động từ tâm lý (最喜欢).',
      'Động từ số lần: Động từ + Số lần + 次 (两次: hai lần).'
    ],
    quizzes: [
      {
        question: 'Người B đến phòng gym với tần suất như thế nào?',
        options: ['Hai lần mỗi tuần', 'Mỗi ngày một lần', 'Mỗi tháng hai lần', 'Ba lần mỗi tuần'],
        correctAnswer: 'Hai lần mỗi tuần',
        explanation: 'Người B nói: "我每个星期都去健身房两次。"'
      },
      {
        question: 'Môn thể thao mà người A yêu thích nhất là gì?',
        options: ['Đá bóng', 'Bóng rổ', 'Bơi lội', 'Chạy bộ'],
        correctAnswer: 'Đá bóng',
        explanation: 'Người A nói: "我喜欢踢足球。"'
      }
    ]
  },

  // 15. Mua sắm quần áo (HSK 2)
  {
    id: 15,
    title: 'Thử quần áo trong cửa hàng thời trang',
    category: 'Mua sắm',
    level: 'hsk2',
    description: 'Thử cỡ áo và chọn màu sắc phù hợp.',
    lines: [
      { speaker: 'A', chinese: '你好，我可以试一下这件红色的衣服吗？', pinyin: 'Nǐ hǎo, wǒ kěyǐ shì yíxià zhè jiàn hóngsè de yīfu ma?', vietnamese: 'Chào bạn, tôi có thể mặc thử chiếc áo màu đỏ này không?' },
      { speaker: 'B', chinese: '当然可以，试衣间在左边。', pinyin: 'Dāngrán kěyǐ, shìyījiān zài zuǒbian.', vietnamese: 'Đương nhiên được, phòng thử đồ ở bên tay trái.' },
      { speaker: 'A', chinese: '这件有点儿大，有小一点儿的吗？', pinyin: 'Zhè jiàn yǒudiǎnr dà, yǒu xiǎo yìdiǎnr de ma?', vietnamese: 'Chiếc này hơi rộng một chút, có cái nào nhỏ hơn một chút không?' },
      { speaker: 'B', chinese: '有的，这件中号的您试试看。', pinyin: 'Yǒu de, zhè jiàn zhōnghào de nín shìshi kàn.', vietnamese: 'Có ạ, chiếc cỡ vừa này ngài mặc thử xem sao.' },
      { speaker: 'A', chinese: '这件正合适，我就要这件了。', pinyin: 'Zhè jiàn zhèng héshì, wǒ jiù yào zhè jiàn le.', vietnamese: 'Chiếc này vừa vặn rồi, tôi lấy chiếc này luôn.' }
    ],
    keyVocab: [
      { word: '试', pinyin: 'shì', meaning: 'thử' },
      { word: '件', pinyin: 'jiàn', meaning: 'chiếc, cái (lượng từ quần áo)' },
      { word: '合适', pinyin: 'héshì', meaning: 'vừa vặn, thích hợp' }
    ],
    grammarNotes: [
      'Động từ lặp lại dạng AA: 试试 (thử xem).',
      'Tính từ + 一点儿 biểu thị sự so sánh nhẹ nhàng: 小一点儿 (nhỏ hơn một chút).'
    ],
    quizzes: [
      {
        question: 'Ban đầu người mua cảm thấy chiếc áo màu đỏ như thế nào?',
        options: ['Hơi bị rộng', 'Hơi bị chật', 'Quá đắt đỏ', 'Màu sắc quá tối'],
        correctAnswer: 'Hơi bị rộng',
        explanation: 'Người mua nhận xét: "这件有点儿大，有小一点儿的吗？"'
      },
      {
        question: 'Cuối cùng người mua chọn mua chiếc áo nào?',
        options: ['Chiếc áo cỡ vừa vặn (trung bình)', 'Không mua chiếc nào', 'Mua cả hai chiếc', 'Chiếc áo màu đen'],
        correctAnswer: 'Chiếc áo cỡ vừa vặn (trung bình)',
        explanation: 'Người A nói: "这件正合适，我就要这件了。"'
      }
    ]
  },

  // 16. Du lịch & Đi máy bay (HSK 2)
  {
    id: 16,
    title: 'Chuẩn bị đi du lịch Thượng Hải',
    category: 'Đi lại',
    level: 'hsk2',
    description: 'Bàn bạc phương tiện di chuyển và đặt vé.',
    lines: [
      { speaker: 'A', chinese: '下个月放假，你想去哪儿旅游？', pinyin: 'Xià ge yuè fàngjià, nǐ xiǎng qù nǎr lǚyóu?', vietnamese: 'Tháng sau nghỉ lễ, bạn muốn đi đâu du lịch?' },
      { speaker: 'B', chinese: '我想去上海看看。听说那里很漂亮。', pinyin: 'Wǒ xiǎng qù Shànghǎi kànkan. Tīngshuō nàlǐ hěn piàoliang.', vietnamese: 'Tôi muốn đi Thượng Hải ngắm nhìn. Nghe nói ở đó rất đẹp.' },
      { speaker: 'A', chinese: '我们坐高铁去还是坐飞机去？', pinyin: 'Wǒmen zuò gāotiě qù háishi zuò fēijī qù?', vietnamese: 'Chúng mình đi bằng tàu cao tốc hay là đi máy bay?' },
      { speaker: 'B', chinese: '坐高铁吧，不仅快，而且票价比飞机便宜。', pinyin: 'Zuò gāotiě ba, bùjǐn kuài, érqiě piàojià bǐ fēijī piányi.', vietnamese: 'Đi tàu cao tốc đi, không những nhanh mà giá vé còn rẻ hơn máy bay.' }
    ],
    keyVocab: [
      { word: '旅游', pinyin: 'lǚyóu', meaning: 'du lịch' },
      { word: '高铁', pinyin: 'gāotiě', meaning: 'tàu cao tốc' },
      { word: '不仅...而且...', pinyin: 'bùjǐn... érqiě...', meaning: 'không những... mà còn...' }
    ],
    grammarNotes: [
      'Từ nối lựa chọn trong câu hỏi: 还是 (hay là).',
      'Cấu trúc tăng tiến: 不仅... 而且... (không những... mà còn...).'
    ],
    quizzes: [
      {
        question: 'Hai người có dự định đi du lịch ở đâu?',
        options: ['Thượng Hải', 'Bắc Kinh', 'Quảng Châu', 'Tây An'],
        correctAnswer: 'Thượng Hải',
        explanation: 'Người B nói: "我想去上海看看。"'
      },
      {
        question: 'Tại sao người B đề xuất đi tàu cao tốc?',
        options: ['Vừa nhanh lại vừa rẻ hơn máy bay', 'Vì sợ đi máy bay', 'Vì không mua được vé máy bay', 'Vì gần hơn'],
        correctAnswer: 'Vừa nhanh lại vừa rẻ hơn máy bay',
        explanation: 'Người B giải thích: "坐高铁吧，不仅快，而且票价比飞机便宜。"'
      }
    ]
  },

  // 17. Sinh nhật & Chúc mừng (HSK 2)
  {
    id: 17,
    title: 'Tổ chức tiệc sinh nhật bất ngờ',
    category: 'Gia đình và bạn bè',
    level: 'hsk2',
    description: 'Tặng quà và chúc mừng sinh nhật bạn thân.',
    lines: [
      { speaker: 'A', chinese: '祝你生日快乐！这是送给你的礼物。', pinyin: 'Zhù nǐ shēngrì kuàilè! Zhè shì sòng gěi nǐ de lǐwù.', vietnamese: 'Chúc bạn sinh nhật vui vẻ! Đây là món quà tặng bạn.' },
      { speaker: 'B', chinese: '哇，太漂亮了！谢谢你！', pinyin: 'Wā, tài piàoliang le! Xièxie nǐ!', vietnamese: 'Oa, đẹp quá! Cảm ơn bạn rất nhiều!' },
      { speaker: 'A', chinese: '快打开看看，希望你喜欢。', pinyin: 'Kuài dǎkāi kànkan, xīwàng nǐ xǐhuan.', vietnamese: 'Mở ra xem thử đi, hy vọng là bạn sẽ thích.' },
      { speaker: 'B', chinese: '是一块新手表！我很喜欢，真的太感谢你了。', pinyin: 'Shì yí kuài xīn shǒubiǎo! Wǒ hěn xǐhuan, zhēnde tài gǎnxiè nǐ le.', vietnamese: 'Là một chiếc đồng hồ đeo tay mới! Tôi rất thích, thực sự vô cùng cảm ơn bạn.' }
    ],
    keyVocab: [
      { word: '生日快乐', pinyin: 'shēngrì kuàilè', meaning: 'sinh nhật vui vẻ' },
      { word: '礼物', pinyin: 'lǐwù', meaning: 'món quà' },
      { word: '手表', pinyin: 'shǒubiǎo', meaning: 'đồng hồ đeo tay' }
    ],
    grammarNotes: [
      'Động từ kép biểu thị mục đích tặng: 送给 (tặng cho).',
      'Lượng từ của đồng hồ: 块 (kuài): 一块手表.'
    ],
    quizzes: [
      {
        question: 'Món quà sinh nhật mà người A tặng là gì?',
        options: ['Một chiếc đồng hồ đeo tay', 'Một quyển sách', 'Một chiếc áo mới', 'Một chiếc bánh kem'],
        correctAnswer: 'Một chiếc đồng hồ đeo tay',
        explanation: 'Người B mở quà và nói: "是一块新手表！"'
      },
      {
        question: 'Cảm xúc của người B khi nhận quà như thế nào?',
        options: ['Vô cùng vui mừng và yêu thích', 'Bình thường', 'Không hài lòng', 'Muốn đổi món khác'],
        correctAnswer: 'Vô cùng vui mừng và yêu thích',
        explanation: 'Người B nói: "哇，太漂亮了！我很喜欢，真的太感谢你了。"'
      }
    ]
  },

  // 18. Ở khách sạn (HSK 2)
  {
    id: 18,
    title: 'Làm thủ tục nhận phòng khách sạn',
    category: 'Đi lại',
    level: 'hsk2',
    description: 'Check-in và hỏi mật khẩu wifi tại quầy lễ tân.',
    lines: [
      { speaker: 'A', chinese: '你好，我在网上预订了一个双人房间。', pinyin: 'Nǐ hǎo, wǒ zài wǎngshang yùdìng le yí ge shuāngrén fángjiān.', vietnamese: 'Xin chào, tôi đã đặt trước một phòng đôi trên mạng.' },
      { speaker: 'B', chinese: '好的，请出示一下您的护照。', pinyin: 'Hǎo de, qǐng chūshì yíxià nín de hùzhào.', vietnamese: 'Vâng, xin vui lòng xuất trình hộ chiếu của ngài.' },
      { speaker: 'A', chinese: '给您。请问房间里有无线网络吗？', pinyin: 'Gěi nín. Qǐngwèn fángjiān li yǒu wúxiàn wǎngluò ma?', vietnamese: 'Gửi bạn. Xin hỏi trong phòng có mạng wifi không?' },
      { speaker: 'B', chinese: '有的，密码在房卡背面。这是您的房卡，在三楼308号房。', pinyin: 'Yǒu de, mìmǎ zài fángkǎ bèimiàn. Zhè shì nín de fángkǎ, zài sān lóu sān líng bā hào fáng.', vietnamese: 'Có ạ, mật khẩu ở mặt sau thẻ phòng. Đây là thẻ phòng của ngài, ở phòng 308 tầng 3.' }
    ],
    keyVocab: [
      { word: '预订', pinyin: 'yùdìng', meaning: 'đặt trước' },
      { word: '房间', pinyin: 'fángjiān', meaning: 'căn phòng' },
      { word: '密码', pinyin: 'mìmǎ', meaning: 'mật khẩu' }
    ],
    grammarNotes: [
      'Số phòng đọc từng chữ số: 308 -> sān líng bā.',
      'Từ chỉ vị trí: 背面 (mặt sau), 三楼 (tầng 3).'
    ],
    quizzes: [
      {
        question: 'Vị khách đã đặt loại phòng nào?',
        options: ['Phòng đôi (2 người)', 'Phòng đơn (1 người)', 'Phòng gia đình', 'Phòng tổng thống'],
        correctAnswer: 'Phòng đôi (2 người)',
        explanation: 'Khách nói: "我在网上预订了一个双人房间。"'
      },
      {
        question: 'Mật khẩu wifi được ghi ở đâu?',
        options: ['Ở mặt sau thẻ phòng', 'Ở trên tờ giấy lễ tân', 'Ở trên bàn trong phòng', 'Không có mật khẩu'],
        correctAnswer: 'Ở mặt sau thẻ phòng',
        explanation: 'Nhân viên lễ tân nói: "密码在房卡背面。"'
      }
    ]
  },

  // 19. Đổi tiền ở ngân hàng (HSK 2)
  {
    id: 19,
    title: 'Giao dịch tại quầy ngân hàng',
    category: 'Mua sắm',
    level: 'hsk2',
    description: 'Đổi đô la Mỹ sang đồng nhân dân tệ.',
    lines: [
      { speaker: 'A', chinese: '您好，请问您要办理什么业务？', pinyin: 'Nín hǎo, qǐngwèn nín yào bànlǐ shénme yèwù?', vietnamese: 'Xin chào, xin hỏi ngài cần làm thủ tục giao dịch gì ạ?' },
      { speaker: 'B', chinese: '我想换一些人民币。今天的汇率是多少？', pinyin: 'Wǒ xiǎng huàn yìxiē rénmínbì. Jīntiān de huìlǜ shì duōshao?', vietnamese: 'Tôi muốn đổi một ít tiền nhân dân tệ. Tỷ giá hôm nay là bao nhiêu?' },
      { speaker: 'A', chinese: '一美元换七点二元人民币。您要换多少？', pinyin: 'Yì Měiyuán huàn qī diǎn èr yuán rénmínbì. Nín yào huàn duōshao?', vietnamese: '1 đô la Mỹ đổi được 7.2 nhân dân tệ. Ngài muốn đổi bao nhiêu?' },
      { speaker: 'B', chinese: '我换五百美元，这是我的钱。', pinyin: 'Wǒ huàn wǔbǎi Měiyuán, zhè shì wǒ de qián.', vietnamese: 'Tôi đổi 500 đô la Mỹ, đây là tiền của tôi.' }
    ],
    keyVocab: [
      { word: '换', pinyin: 'huàn', meaning: 'đổi' },
      { word: '人民币', pinyin: 'rénmínbì', meaning: 'nhân dân tệ' },
      { word: '美元', pinyin: 'Měiyuán', meaning: 'đô la Mỹ' }
    ],
    grammarNotes: [
      'Đọc số thập phân: 七点二 (7.2 -> qī diǎn èr).',
      'Động từ "换" dùng cho đổi tiền hoặc đổi đồ vật.'
    ],
    quizzes: [
      {
        question: 'Vị khách muốn đổi sang loại tiền nào?',
        options: ['Đồng Nhân dân tệ (RMB)', 'Đồng Euro', 'Đồng Bảng Anh', 'Đồng Yên Nhật'],
        correctAnswer: 'Đồng Nhân dân tệ (RMB)',
        explanation: 'Khách nói: "我想换一些人民币。"'
      },
      {
        question: 'Khách hàng đổi bao nhiêu đô la Mỹ?',
        options: ['500 USD', '100 USD', '1000 USD', '700 USD'],
        correctAnswer: '500 USD',
        explanation: 'Khách nói: "我换五百美元。"'
      }
    ]
  },

  // 20. Trả lời điện thoại & Nhờ nhắn lại (HSK 2)
  {
    id: 20,
    title: 'Gọi điện thoại tìm giám đốc',
    category: 'Công việc',
    level: 'hsk2',
    description: 'Gọi điện thoại công việc khi người nghe vắng mặt.',
    lines: [
      { speaker: 'A', chinese: '喂，您好！请问张经理在吗？', pinyin: 'Wèi, nín hǎo! Qǐngwèn Zhāng jīnglǐ zài ma?', vietnamese: 'A-lô, xin chào! Xin hỏi giám đốc Trương có ở đó không ạ?' },
      { speaker: 'B', chinese: '他正在开会，请问您是哪位？', pinyin: 'Tā zhèngzài kāihuì, qǐngwèn nín shì nǎ wèi?', vietnamese: 'Ông ấy đang họp, xin hỏi ngài là vị nào đấy ạ?' },
      { speaker: 'A', chinese: '我是华星公司的小王。他大概什么时候开完会？', pinyin: 'Wǒ shì Huáxīng gōngsī de Xiǎo Wáng. Tā dàgài shénme shíhou kāi wán huì?', vietnamese: 'Tôi là Tiểu Vương ở công ty Hoa Tinh. Đại khái khi nào ông ấy họp xong?' },
      { speaker: 'B', chinese: '大概半个小时以后。要我帮您转告他吗？', pinyin: 'Dàgài bàn ge xiǎoshí yǐhòu. Yào wǒ bāng nín zhuǎngào tā ma?', vietnamese: 'Khoảng nửa tiếng nữa. Có cần tôi chuyển lời giúp ngài không?' },
      { speaker: 'A', chinese: '请让他开完会给我回个电话，谢谢！', pinyin: 'Qǐng ràng tā kāi wán huì gěi wǒ huí ge diànhuà, xièxie!', vietnamese: 'Xin bảo ông ấy họp xong gọi lại cho tôi nhé, cảm ơn!' }
    ],
    keyVocab: [
      { word: '开会', pinyin: 'kāihuì', meaning: 'họp hành' },
      { word: '大概', pinyin: 'dàgài', meaning: 'đại khái, khoảng chừng' },
      { word: '转告', pinyin: 'zhuǎngào', meaning: 'chuyển lời' }
    ],
    grammarNotes: [
      'Câu kiêm ngữ chữ 让: 让 + Người + Làm gì (让张经理给我回电话).',
      'Đại từ tôn kính khi hỏi danh tính qua điện thoại: 哪位 (vị nào).'
    ],
    quizzes: [
      {
        question: 'Giám đốc Trương lúc này đang làm gì?',
        options: ['Đang họp', 'Đang đi ăn trưa', 'Đang đi công tác', 'Đang ngủ trưa'],
        correctAnswer: 'Đang họp',
        explanation: 'Người nghe máy đáp: "他正在开会。"'
      },
      {
        question: 'Tiểu Vương nhờ nhắn lại điều gì?',
        options: ['Nhờ giám đốc Trương họp xong gọi lại điện thoại', 'Nhờ gửi tài liệu qua email', 'Nhờ hủy cuộc hẹn', 'Không cần làm gì cả'],
        correctAnswer: 'Nhờ giám đốc Trương họp xong gọi lại điện thoại',
        explanation: 'Tiểu Vương nhắn: "请让他开完会给我回个电话，谢谢！"'
      }
    ]
  },

  // 21. Thảo luận việc học tập (HSK 2)
  {
    id: 21,
    title: 'Kinh nghiệm chuẩn bị thi HSK',
    category: 'Trường học',
    level: 'hsk2',
    description: 'Chia sẻ phương pháp học từ vựng và luyện đề.',
    lines: [
      { speaker: 'A', chinese: '下个月就要考HSK了，你准备得怎么样？', pinyin: 'Xià ge yuè jiù yào kǎo HSK le, nǐ zhǔnbèi de zěnmeyàng?', vietnamese: 'Tháng sau là sắp thi HSK rồi, bạn chuẩn bị thế nào rồi?' },
      { speaker: 'B', chinese: '听力和阅读还可以，就是汉字写得不太好。', pinyin: 'Tīnglì hé yuèdú hái kěyǐ, jiù shì hànzì xiě de bú tài hǎo.', vietnamese: 'Nghe và đọc thì tạm ổn, chỉ có viết chữ Hán là chưa tốt lắm.' },
      { speaker: 'A', chinese: '你每天记多少个生词？', pinyin: 'Nǐ měitiān jì duōshao ge shēngcí?', vietnamese: 'Mỗi ngày bạn ghi nhớ bao nhiêu từ mới?' },
      { speaker: 'B', chinese: '我每天坚持记二十个词，并且做一套练习题。', pinyin: 'Wǒ měitiān jiānchí jì èrshí ge cí, bìngqiě zuò yí tào liànxítí.', vietnamese: 'Tôi kiên trì nhớ 20 từ mỗi ngày, đồng thời làm một bộ đề luyện tập.' },
      { speaker: 'A', chinese: '太棒了，坚持下去一定能考出好成绩！', pinyin: 'Tài bàng le, jiānchí xiàqù yídìng néng kǎo chū hǎo chéngjì!', vietnamese: 'Tuyệt vời, kiên trì tiếp tục nhất định sẽ thi được điểm số cao!' }
    ],
    keyVocab: [
      { word: '准备', pinyin: 'zhǔnbèi', meaning: 'chuẩn bị' },
      { word: '坚持', pinyin: 'jiānchí', meaning: 'kiên trì' },
      { word: '成绩', pinyin: 'chéngjì', meaning: 'thành tích, điểm số' }
    ],
    grammarNotes: [
      'Cấu trúc sắp diễn ra: 就要...了 (下个月就要考HSK了).',
      'Liên từ liên kết bổ sung: 并且 (đồng thời, và).'
    ],
    quizzes: [
      {
        question: 'Kỹ năng nào người B cảm thấy mình chưa làm tốt?',
        options: ['Viết chữ Hán', 'Nghe hiểu', 'Đọc hiểu', 'Phát âm'],
        correctAnswer: 'Viết chữ Hán',
        explanation: 'Người B nói: "就是汉字写得不太好。"'
      },
      {
        question: 'Mỗi ngày người B kiên trì học bao nhiêu từ vựng mới?',
        options: ['20 từ', '10 từ', '50 từ', '30 từ'],
        correctAnswer: '20 từ',
        explanation: 'Người B nói: "我每天坚持记二十个词。"'
      }
    ]
  },

  // 22. Đi dạo phố & Ăn vặt (HSK 2)
  {
    id: 22,
    title: 'Khám phá ẩm thực đường phố về đêm',
    category: 'Ăn uống và mua sắm',
    level: 'hsk2',
    description: 'Thưởng thức món ăn đường phố tại chợ đêm.',
    lines: [
      { speaker: 'A', chinese: '听说这条街的夜市很有名，我们去逛逛吧！', pinyin: 'Tīngshuō zhè tiáo jiē de yèshì hěn yǒumíng, wǒmen qù guàngguang ba!', vietnamese: 'Nghe nói chợ đêm của con phố này rất nổi tiếng, chúng mình đi dạo một chút nhé!' },
      { speaker: 'B', chinese: '好啊！闻起来好香啊，你闻到了吗？', pinyin: 'Hǎo a! Wén qǐlái hǎo xiāng a, nǐ wén dào le ma?', vietnamese: 'Được thôi! Ngửi mùi thơm quá đi, bạn có ngửi thấy không?' },
      { speaker: 'A', chinese: '是烤羊肉串和包子的香味。你想尝尝吗？', pinyin: 'Shì kǎo yángròuchuàn hé bāozi de xiāngwèi. Nǐ xiǎng chángchang ma?', vietnamese: 'Là mùi thơm của xiên thịt cừu nướng và bánh bao. Bạn muốn nếm thử không?' },
      { speaker: 'B', chinese: '当然想！我们每种都买一点儿尝尝吧。', pinyin: 'Dāngrán xiǎng! Wǒmen měi zhǒng dōu mǎi yìdiǎnr chángchang ba.', vietnamese: 'Đương nhiên là muốn rồi! Chúng mình mỗi loại mua một ít nếm thử nhé.' }
    ],
    keyVocab: [
      { word: '夜市', pinyin: 'yèshì', meaning: 'chợ đêm' },
      { word: '有名', pinyin: 'yǒumíng', meaning: 'nổi tiếng' },
      { word: '闻', pinyin: 'wén', meaning: 'ngửi' }
    ],
    grammarNotes: [
      'Động từ + 起来 miêu tả cảm giác đánh giá: 闻起来 (ngửi thấy), 看起来 (trông có vẻ).',
      'Động từ lặp lại diễn tả thử nghiệm: 逛逛 (đi dạo dạo), 尝尝 (nếm thử).'
    ],
    quizzes: [
      {
        question: 'Hai người rủ nhau đi đâu?',
        options: ['Chợ đêm trên con phố nổi tiếng', 'Nhà hàng sang trọng', 'Siêu thị lớn', 'Trung tâm điện máy'],
        correctAnswer: 'Chợ đêm trên con phố nổi tiếng',
        explanation: 'Người A nói: "听说这条街的夜市很有名，我们去逛逛吧！"'
      },
      {
        question: 'Mùi hương thơm mà họ ngửi thấy là của những món ăn nào?',
        options: ['Thịt cừu nướng và bánh bao', 'Lẩu cay Tứ Xuyên', 'Trà sữa trân châu', 'Mì xào giòn'],
        correctAnswer: 'Thịt cừu nướng và bánh bao',
        explanation: 'Người A nói: "是烤羊肉串和包子的香味。"'
      }
    ]
  }
];

const fileContent = `// Auto-generated HSK 1-2 Practice Dialogues
// Total: ${rawDialogues.length} short realistic dialogues for both Reading & Listening modules
import { Dialogue } from '@/types/practice';

export const HSK_DIALOGUES: Dialogue[] = ${JSON.stringify(rawDialogues, null, 2)};
`;

const outputPath = path.join(process.cwd(), 'data', 'hsk-dialogues-data.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Generated ${rawDialogues.length} HSK dialogues at ${outputPath}`);
