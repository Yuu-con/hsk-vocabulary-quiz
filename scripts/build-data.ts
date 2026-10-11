import fs from 'fs';
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

export const rawVocab: VocabDef[] = [
  {
    "id": 1,
    "hanzi": "你",
    "pinyin": "nǐ",
    "lesson": 1,
    "correctAnswer": "Bạn / Anh / Chị",
    "options": [
      "Bạn / Anh / Chị",
      "Tôi / Mình",
      "Anh ấy / Nó",
      "Chúng tôi / Chúng ta"
    ],
    "explanation": "你 (nǐ) là đại từ nhân xưng ngôi thứ 2 (Ví dụ: 你好 - Chào bạn)."
  },
  {
    "id": 2,
    "hanzi": "好",
    "pinyin": "hǎo",
    "lesson": 1,
    "correctAnswer": "Tốt / Đẹp / Khỏe",
    "options": [
      "Tốt / Đẹp / Khỏe",
      "Xấu xí / Tệ hại",
      "To lớn / Khổng lồ",
      "Nhỏ bé / Chật hẹp"
    ],
    "explanation": "好 (hǎo) mang nghĩa tốt lành, khỏe mạnh, thuận lợi (Ví dụ: 身体好 - Sức khỏe tốt)."
  },
  {
    "id": 3,
    "hanzi": "对不起",
    "pinyin": "duìbuqǐ",
    "lesson": 1,
    "correctAnswer": "Xin lỗi",
    "options": [
      "Xin lỗi",
      "Cảm ơn",
      "Không có chi / Đừng ngại",
      "Tạm biệt"
    ],
    "explanation": "对不起 (duìbuqǐ) dùng khi nhận lỗi, xin lỗi chân thành."
  },
  {
    "id": 4,
    "hanzi": "没关系",
    "pinyin": "méi guānxi",
    "lesson": 1,
    "correctAnswer": "Không sao / Không hề gì",
    "options": [
      "Không sao / Không hề gì",
      "Xin lỗi chân thành",
      "Rất vui được gặp",
      "Hẹn ngày tái ngộ"
    ],
    "explanation": "没关系 (méi guānxi) dùng đáp lại lời xin lỗi: không sao đâu, không có can hệ gì."
  },
  {
    "id": 5,
    "hanzi": "一",
    "pinyin": "yī",
    "lesson": 1,
    "correctAnswer": "Số 1 / Một",
    "options": [
      "Số 1 / Một",
      "Số 2 / Hai",
      "Số 3 / Ba",
      "Số 10 / Mười"
    ],
    "explanation": "一 (yī) là con số 1 (Ví dụ: 一个 - một cái, 一起 - cùng nhau)."
  },
  {
    "id": 6,
    "hanzi": "二",
    "pinyin": "èr",
    "lesson": 1,
    "correctAnswer": "Số 2 / Hai",
    "options": [
      "Số 2 / Hai",
      "Số 1 / Một",
      "Số 3 / Ba",
      "Số 4 / Bốn"
    ],
    "explanation": "二 (èr) là số đếm 2 trong tiếng Trung."
  },
  {
    "id": 7,
    "hanzi": "三",
    "pinyin": "sān",
    "lesson": 1,
    "correctAnswer": "Số 3 / Ba",
    "options": [
      "Số 3 / Ba",
      "Số 4 / Bốn",
      "Số 2 / Hai",
      "Số 5 / Năm"
    ],
    "explanation": "三 (sān) là con số 3 (Ví dụ: 三个人 - ba người)."
  },
  {
    "id": 8,
    "hanzi": "四",
    "pinyin": "sì",
    "lesson": 1,
    "correctAnswer": "Số 4 / Bốn",
    "options": [
      "Số 4 / Bốn",
      "Số 5 / Năm",
      "Số 6 / Sáu",
      "Số 7 / Bảy"
    ],
    "explanation": "四 (sì) là con số 4 (Ví dụ: 四月 - tháng 4)."
  },
  {
    "id": 9,
    "hanzi": "五",
    "pinyin": "wǔ",
    "lesson": 1,
    "correctAnswer": "Số 5 / Năm",
    "options": [
      "Số 5 / Năm",
      "Số 4 / Bốn",
      "Số 6 / Sáu",
      "Số 7 / Bảy"
    ],
    "explanation": "五 (wǔ) là con số 5 (Ví dụ: 星期五 - thứ Sáu)."
  },
  {
    "id": 10,
    "hanzi": "是",
    "pinyin": "shì",
    "lesson": 1,
    "correctAnswer": "Là / Đúng / Phải",
    "options": [
      "Là / Đúng / Phải",
      "Không phải / Sai lầm",
      "Có / Tồn tại",
      "Ở tại / Đang"
    ],
    "explanation": "是 (shì) là động từ phán đoán: là, phải (Ví dụ: 我是学生 - Tôi là học sinh)."
  },
  {
    "id": 11,
    "hanzi": "谢谢",
    "pinyin": "xièxie",
    "lesson": 2,
    "correctAnswer": "Cảm ơn",
    "options": [
      "Cảm ơn",
      "Xin lỗi chân tình",
      "Tạm biệt chia tay",
      "Đừng khách sáo chi"
    ],
    "explanation": "谢谢 (xièxie) là lời cảm ơn khi nhận sự giúp đỡ (谢谢你 - Cảm ơn bạn)."
  },
  {
    "id": 12,
    "hanzi": "不",
    "pinyin": "bù",
    "lesson": 2,
    "correctAnswer": "Không / Chẳng",
    "options": [
      "Không / Chẳng",
      "Rất / Lắm",
      "Đều / Cùng",
      "Cũng / Lại"
    ],
    "explanation": "不 (bù) là phó từ phủ định, đứng trước động từ/tính từ (Ví dụ: 不好 - không tốt)."
  },
  {
    "id": 13,
    "hanzi": "不客气",
    "pinyin": "bú kèqi",
    "lesson": 2,
    "correctAnswer": "Đừng khách sáo / Không có chi",
    "options": [
      "Đừng khách sáo / Không có chi",
      "Xin lỗi chân thành",
      "Cảm ơn sâu sắc",
      "Hẹn sớm gặp lại"
    ],
    "explanation": "不客气 (bú kèqi) dùng đáp lại lời cảm ơn 谢谢."
  },
  {
    "id": 14,
    "hanzi": "再见",
    "pinyin": "zàijiàn",
    "lesson": 2,
    "correctAnswer": "Tạm biệt / Hẹn gặp lại",
    "options": [
      "Tạm biệt / Hẹn gặp lại",
      "Xin chào gặp mặt",
      "Cảm ơn giúp đỡ",
      "Không hề có chi"
    ],
    "explanation": "再见 (zàijiàn) mang nghĩa gặp lại lần sau, tạm biệt lúc chia tay."
  },
  {
    "id": 15,
    "hanzi": "六",
    "pinyin": "liù",
    "lesson": 2,
    "correctAnswer": "Số 6 / Sáu",
    "options": [
      "Số 6 / Sáu",
      "Số 5 / Năm",
      "Số 7 / Bảy",
      "Số 8 / Tám"
    ],
    "explanation": "六 (liù) là con số 6 (Ví dụ: 六点 - 6 giờ)."
  },
  {
    "id": 16,
    "hanzi": "七",
    "pinyin": "qī",
    "lesson": 2,
    "correctAnswer": "Số 7 / Bảy",
    "options": [
      "Số 7 / Bảy",
      "Số 6 / Sáu",
      "Số 8 / Tám",
      "Số 9 / Chín"
    ],
    "explanation": "七 (qī) là con số 7 (Ví dụ: 七月 - tháng 7)."
  },
  {
    "id": 17,
    "hanzi": "八",
    "pinyin": "bā",
    "lesson": 2,
    "correctAnswer": "Số 8 / Tám",
    "options": [
      "Số 8 / Tám",
      "Số 7 / Bảy",
      "Số 9 / Chín",
      "Số 6 / Sáu"
    ],
    "explanation": "八 (bā) là con số 8 (phát âm gần từ 'phát' - phát tài)."
  },
  {
    "id": 18,
    "hanzi": "九",
    "pinyin": "jiǔ",
    "lesson": 2,
    "correctAnswer": "Số 9 / Chín",
    "options": [
      "Số 9 / Chín",
      "Số 8 / Tám",
      "Số 7 / Bảy",
      "Số 6 / Sáu"
    ],
    "explanation": "九 (jiǔ) là con số 9 (Ví dụ: 九岁 - 9 tuổi)."
  },
  {
    "id": 19,
    "hanzi": "十",
    "pinyin": "shí",
    "lesson": 2,
    "correctAnswer": "Số 10 / Mười",
    "options": [
      "Số 10 / Mười",
      "Số 1 / Một",
      "Số 4 / Bốn",
      "Số 100 / Trăm"
    ],
    "explanation": "十 (shí) là số 10 (Ví dụ: 十个人 - mười người)."
  },
  {
    "id": 20,
    "hanzi": "人",
    "pinyin": "rén",
    "lesson": 2,
    "correctAnswer": "Người / Con người",
    "options": [
      "Người / Con người",
      "Động vật nuôi",
      "Đồ vật dụng",
      "Cây cối cảnh"
    ],
    "explanation": "人 (rén) chỉ con người (Ví dụ: 中国人 - người Trung Quốc)."
  },
  {
    "id": 21,
    "hanzi": "叫",
    "pinyin": "jiào",
    "lesson": 3,
    "correctAnswer": "Gọi / Tên là",
    "options": [
      "Gọi / Tên là",
      "Nói / Kể lại",
      "Hỏi / Thắc mắc",
      "Nghe / Hiểu rõ"
    ],
    "explanation": "叫 (jiào) nghĩa là kêu, gọi hoặc giới thiệu họ tên (我叫李明 - Tôi tên là Lý Minh)."
  },
  {
    "id": 22,
    "hanzi": "什么",
    "pinyin": "shénme",
    "lesson": 3,
    "correctAnswer": "Cái gì / Gì",
    "options": [
      "Cái gì / Gì",
      "Ở đâu / Chỗ nào",
      "Bao nhiêu / Mấy",
      "Ai / Người nào"
    ],
    "explanation": "什么 (shénme) là đại từ nghi vấn hỏi về đồ vật, tên gọi (什么名字 - Tên gì)."
  },
  {
    "id": 23,
    "hanzi": "名字",
    "pinyin": "míngzi",
    "lesson": 3,
    "correctAnswer": "Tên / Tên gọi",
    "options": [
      "Tên / Tên gọi",
      "Tuổi tác năm",
      "Quê quán xứ",
      "Nghề nghiệp làm"
    ],
    "explanation": "名字 (míngzi) là danh xưng, tên gọi của người hoặc vật."
  },
  {
    "id": 24,
    "hanzi": "我",
    "pinyin": "wǒ",
    "lesson": 3,
    "correctAnswer": "Tôi / Mình / Ta",
    "options": [
      "Tôi / Mình / Ta",
      "Bạn / Anh / Chị",
      "Anh ấy / Cô ấy",
      "Chúng tôi / Bọn họ"
    ],
    "explanation": "我 (wǒ) là đại từ nhân xưng ngôi thứ nhất số ít."
  },
  {
    "id": 25,
    "hanzi": "老师",
    "pinyin": "lǎoshī",
    "lesson": 3,
    "correctAnswer": "Thầy cô / Giáo viên",
    "options": [
      "Thầy cô / Giáo viên",
      "Học sinh / Trò nhỏ",
      "Bác sĩ / Y sĩ",
      "Bạn bè"
    ],
    "explanation": "老师 (lǎoshī) là danh xưng tôn kính dành cho người dạy học."
  },
  {
    "id": 26,
    "hanzi": "学生",
    "pinyin": "xuésheng",
    "lesson": 3,
    "correctAnswer": "Học sinh / Học trò",
    "options": [
      "Học sinh / Học trò",
      "Thầy cô giáo viên",
      "Bác sĩ khám bệnh",
      "Kỹ sư công trình"
    ],
    "explanation": "学生 (xuésheng) là người đang theo học tại trường lớp."
  },
  {
    "id": 27,
    "hanzi": "吗",
    "pinyin": "ma",
    "lesson": 3,
    "correctAnswer": "Không / Phải không",
    "options": [
      "Không / Phải không",
      "Đã rồi",
      "Của ai",
      "Và cùng"
    ],
    "explanation": "吗 (ma) đặt ở cuối câu trần thuật để biến câu thành câu hỏi (Ví dụ: 你好吗 - Bạn khỏe không?)."
  },
  {
    "id": 28,
    "hanzi": "中国",
    "pinyin": "Zhōngguó",
    "lesson": 3,
    "correctAnswer": "Trung Quốc",
    "options": [
      "Trung Quốc",
      "Việt Nam láng giềng",
      "Nước Mỹ xa xôi",
      "Bắc Kinh thủ đô"
    ],
    "explanation": "中国 (Zhōngguó) là đất nước Trung Hoa."
  },
  {
    "id": 29,
    "hanzi": "北京",
    "pinyin": "Běijīng",
    "lesson": 3,
    "correctAnswer": "Bắc Kinh",
    "options": [
      "Bắc Kinh",
      "Thượng Hải sầm uất",
      "Quảng Châu mua bán",
      "Nam Kinh cổ kính"
    ],
    "explanation": "北京 (Běijīng), thủ đô của Trung Quốc."
  },
  {
    "id": 30,
    "hanzi": "学习",
    "pinyin": "xuéxí",
    "lesson": 3,
    "correctAnswer": "Học tập / Học hỏi",
    "options": [
      "Học tập / Học hỏi",
      "Làm việc công tác",
      "Nghỉ ngơi thư giãn",
      "Mua bán trao đổi"
    ],
    "explanation": "学习 (xuéxí) là động từ trau dồi kiến thức (Ví dụ: 学习汉语 - học tiếng Trung)."
  },
  {
    "id": 31,
    "hanzi": "她",
    "pinyin": "tā",
    "lesson": 4,
    "correctAnswer": "Cô ấy / Bà ấy",
    "options": [
      "Cô ấy / Bà ấy",
      "Anh ấy",
      "Đồ vật đó",
      "Tôi / Mình"
    ],
    "explanation": "她 (tā) là đại từ nhân xưng ngôi thứ ba số ít chỉ phái nữ (bộ Nữ 女 đứng trước)."
  },
  {
    "id": 32,
    "hanzi": "谁",
    "pinyin": "shéi",
    "lesson": 4,
    "correctAnswer": "Ai / Người nào",
    "options": [
      "Ai / Người nào",
      "Cái gì / Đồ gì",
      "Ở đâu / Chỗ nào",
      "Bao giờ / Lúc nào"
    ],
    "explanation": "谁 (shéi) là đại từ nghi vấn dùng để hỏi người (Ví dụ: 他是谁 - Anh ấy là ai?)."
  },
  {
    "id": 33,
    "hanzi": "的",
    "pinyin": "de",
    "lesson": 4,
    "correctAnswer": "Của / Đích",
    "options": [
      "Của / Đích",
      "Và / Cùng nhau",
      "Tại / Ở đâu",
      "Đã / Từng qua"
    ],
    "explanation": "的 (de) kết nối định ngữ với trung tâm ngữ (Ví dụ: 我的书 - Sách của tôi)."
  },
  {
    "id": 34,
    "hanzi": "汉语",
    "pinyin": "Hànyǔ",
    "lesson": 4,
    "correctAnswer": "Tiếng Trung / Hán ngữ",
    "options": [
      "Tiếng Trung / Hán ngữ",
      "Chữ Hán tự dạng",
      "Người Trung Hoa",
      "Đất nước Trung Quốc"
    ],
    "explanation": "汉语 (Hànyǔ) là ngôn ngữ tiếng Trung Quốc."
  },
  {
    "id": 35,
    "hanzi": "哪",
    "pinyin": "nǎ",
    "lesson": 4,
    "correctAnswer": "Nào / Đâu",
    "options": [
      "Nào / Đâu",
      "Kia / Đó",
      "Đây / Này",
      "Ai / Người nào"
    ],
    "explanation": "哪 (nǎ) là đại từ nghi vấn chỉ sự lựa chọn (Ví dụ: 哪国人 - Người nước nào?)."
  },
  {
    "id": 36,
    "hanzi": "呢",
    "pinyin": "ne",
    "lesson": 4,
    "correctAnswer": "Thì sao / Nhỉ",
    "options": [
      "Thì sao / Nhỉ",
      "Không phải không",
      "Tại sao nguyên do",
      "Bao giờ thời điểm"
    ],
    "explanation": "呢 (ne) dùng trong câu hỏi tỉnh lược (Ví dụ: 你呢？- Còn bạn thì sao?)."
  },
  {
    "id": 37,
    "hanzi": "他",
    "pinyin": "tā",
    "lesson": 4,
    "correctAnswer": "Anh ấy / Ông ấy",
    "options": [
      "Anh ấy / Ông ấy",
      "Cô ấy",
      "Đồ vật đó",
      "Chúng tôi"
    ],
    "explanation": "他 (tā) là đại từ nhân xưng ngôi thứ ba số ít chỉ nam giới (bộ Nhân đứng trước)."
  },
  {
    "id": 38,
    "hanzi": "同学",
    "pinyin": "tóngxué",
    "lesson": 4,
    "correctAnswer": "Bạn học / Bạn cùng lớp",
    "options": [
      "Bạn học / Bạn cùng lớp",
      "Thầy cô giáo viên",
      "Bác sĩ bệnh viện",
      "Hàng xóm láng giềng"
    ],
    "explanation": "同学 (tóngxué) chỉ người học chung trường lớp."
  },
  {
    "id": 39,
    "hanzi": "朋友",
    "pinyin": "péngyou",
    "lesson": 4,
    "correctAnswer": "Bạn bè",
    "options": [
      "Bạn bè",
      "Thầy cô giáo dục",
      "Người cha gia đình",
      "Đồng nghiệp cơ quan"
    ],
    "explanation": "朋友 (péngyou) chỉ người bạn bè thân thiết."
  },
  {
    "id": 40,
    "hanzi": "认识",
    "pinyin": "rènshi",
    "lesson": 4,
    "correctAnswer": "Quen biết / Nhận biết",
    "options": [
      "Quen biết / Nhận biết",
      "Học tập rèn luyện",
      "Gặp gỡ chia tay",
      "Nói chuyện trao đổi"
    ],
    "explanation": "认识 (rènshi) nghĩa là quen biết ai đó (很高兴认识你 - Rất vui được quen biết bạn)."
  },
  {
    "id": 41,
    "hanzi": "家",
    "pinyin": "jiā",
    "lesson": 5,
    "correctAnswer": "Gia đình / Nhà",
    "options": [
      "Gia đình / Nhà",
      "Trường học",
      "Cửa hàng quán",
      "Công ty doanh nghiệp"
    ],
    "explanation": "家 (jiā) là ngôi nhà hoặc mái ấm gia đình (Ví dụ: 我家 - nhà tôi)."
  },
  {
    "id": 42,
    "hanzi": "有",
    "pinyin": "yǒu",
    "lesson": 5,
    "correctAnswer": "Có / Tồn tại / Sở hữu",
    "options": [
      "Có / Tồn tại / Sở hữu",
      "Không có / Vắng",
      "Là / Đúng phải",
      "Ở tại / Nơi chốn"
    ],
    "explanation": "有 (yǒu) biểu thị sự sở hữu hoặc tồn tại (Ví dụ: 我有一本书 - Tôi có 1 quyển sách)."
  },
  {
    "id": 43,
    "hanzi": "几",
    "pinyin": "jǐ",
    "lesson": 5,
    "correctAnswer": "Mấy / Vài",
    "options": [
      "Mấy / Vài",
      "Bao nhiêu",
      "Cái nào lựa chọn",
      "Ở đâu / Vị trí nào"
    ],
    "explanation": "几 (jǐ) dùng để hỏi số lượng nhỏ dưới 10 (Ví dụ: 几口人 - mấy người)."
  },
  {
    "id": 44,
    "hanzi": "岁",
    "pinyin": "suì",
    "lesson": 5,
    "correctAnswer": "Tuổi",
    "options": [
      "Tuổi",
      "Năm",
      "Tháng",
      "Ngày"
    ],
    "explanation": "岁 (suì) là đơn vị đo tuổi tác (Ví dụ: 二十岁 - 20 tuổi)."
  },
  {
    "id": 45,
    "hanzi": "了",
    "pinyin": "le",
    "lesson": 5,
    "correctAnswer": "Rồi / Biến chuyển",
    "options": [
      "Rồi / Biến chuyển",
      "Của ai liên kết",
      "Không phải phủ định",
      "Cũng vậy tương đồng"
    ],
    "explanation": "了 (le) đặt cuối câu hoặc sau động từ biểu thị trạng thái mới xuất hiện hoặc hoàn thành."
  },
  {
    "id": 46,
    "hanzi": "女儿",
    "pinyin": "nǚ'ér",
    "lesson": 5,
    "correctAnswer": "Con gái",
    "options": [
      "Con gái",
      "Con trai",
      "Người mẹ thân yêu",
      "Chị gái ruột"
    ],
    "explanation": "女儿 (nǚ'ér) chỉ người con gái trong quan hệ gia đình cha mẹ."
  },
  {
    "id": 47,
    "hanzi": "儿子",
    "pinyin": "érzi",
    "lesson": 5,
    "correctAnswer": "Con trai",
    "options": [
      "Con trai",
      "Con gái",
      "Người cha phụ thân",
      "Em trai đệ đệ"
    ],
    "explanation": "儿子 (érzi) là con trai trong gia đình."
  },
  {
    "id": 48,
    "hanzi": "多",
    "pinyin": "duō",
    "lesson": 5,
    "correctAnswer": "Nhiều / Bao nhiêu",
    "options": [
      "Nhiều / Bao nhiêu",
      "Ít ỏi / Thiếu",
      "To lớn / Đại",
      "Bé nhỏ / Tiểu"
    ],
    "explanation": "多 (duō) chỉ số lượng nhiều hoặc dùng hỏi mức độ (Ví dụ: 多大 - bao nhiêu tuổi)."
  },
  {
    "id": 49,
    "hanzi": "大",
    "pinyin": "dà",
    "lesson": 5,
    "correctAnswer": "To lớn / Lớn",
    "options": [
      "To lớn / Lớn",
      "Nhỏ bé / Tiểu",
      "Nhiều nhặn / Đa",
      "Ít ỏi / Thiểu"
    ],
    "explanation": "大 (dà) miêu tả kích thước lớn hoặc tuổi tác lớn (đối lập với 小)."
  },
  {
    "id": 50,
    "hanzi": "个",
    "pinyin": "gè",
    "lesson": 5,
    "correctAnswer": "Cái / Chiếc / Người",
    "options": [
      "Cái / Chiếc / Người",
      "Cuốn / Quyển",
      "Miếng / Mảnh",
      "Đôi / Cặp"
    ],
    "explanation": "个 (gè) là lượng từ thông dụng nhất trong tiếng Trung (一个人: một người, 一个苹果: một quả táo)."
  },
  {
    "id": 51,
    "hanzi": "会",
    "pinyin": "huì",
    "lesson": 6,
    "correctAnswer": "Biết / Sẽ",
    "options": [
      "Biết / Sẽ",
      "Muốn / Cần",
      "Thích / Chuộng",
      "Phải / Bắt buộc"
    ],
    "explanation": "会 (huì) biểu thị kỹ năng học được (Biết) hoặc khả năng xảy ra (Sẽ)."
  },
  {
    "id": 52,
    "hanzi": "说",
    "pinyin": "shuō",
    "lesson": 6,
    "correctAnswer": "Nói / Diễn đạt",
    "options": [
      "Nói / Diễn đạt",
      "Nghe / Lĩnh hội",
      "Đọc / Ngâm vịnh",
      "Viết / Ghi chép"
    ],
    "explanation": "说 (shuō) là hành động nói bằng lời (Ví dụ: 说汉语 - nói tiếng Trung)."
  },
  {
    "id": 53,
    "hanzi": "妈妈",
    "pinyin": "māma",
    "lesson": 6,
    "correctAnswer": "Mẹ / Má",
    "options": [
      "Mẹ / Má",
      "Bố / Cha phụ thân",
      "Chị gái tỷ tỷ",
      "Con gái nữ nhi"
    ],
    "explanation": "妈妈 (māma) là tiếng gọi người mẹ thân thương."
  },
  {
    "id": 54,
    "hanzi": "菜",
    "pinyin": "cài",
    "lesson": 6,
    "correctAnswer": "Món ăn / Rau củ",
    "options": [
      "Món ăn / Rau củ",
      "Cơm trắng gạo",
      "Hoa quả ngọt",
      "Nước giải khát"
    ],
    "explanation": "菜 (cài) chỉ món ăn trên bàn hoặc rau xanh (Ví dụ: 中国菜 - món ăn Trung Quốc)."
  },
  {
    "id": 55,
    "hanzi": "很",
    "pinyin": "hěn",
    "lesson": 6,
    "correctAnswer": "Rất / Lắm",
    "options": [
      "Rất / Lắm",
      "Không hề phủ định",
      "Đều là bao quát",
      "Cũng vậy tương đồng"
    ],
    "explanation": "很 (hěn) là phó từ chỉ mức độ cao (Ví dụ: 很好 - rất tốt, 很高 - rất cao)."
  },
  {
    "id": 56,
    "hanzi": "好吃",
    "pinyin": "hǎochī",
    "lesson": 6,
    "correctAnswer": "Ngon miệng / Ngon",
    "options": [
      "Ngon miệng / Ngon",
      "Khó nuốt vị dở",
      "Đẹp mắt ưa nhìn",
      "Vui vẻ mừng rỡ"
    ],
    "explanation": "好吃 (hǎochī) khen ngợi đồ ăn thơm ngon."
  },
  {
    "id": 57,
    "hanzi": "做",
    "pinyin": "zuò",
    "lesson": 6,
    "correctAnswer": "Làm / Nấu nướng",
    "options": [
      "Làm / Nấu nướng",
      "Ngồi / Đi xe",
      "Xem / Đọc sách",
      "Nghe / Thưởng thức"
    ],
    "explanation": "做 (zuò) là làm ra cái gì đó (Ví dụ: 做饭 - nấu cơm, 做菜 - nấu món ăn)."
  },
  {
    "id": 58,
    "hanzi": "写",
    "pinyin": "xiě",
    "lesson": 6,
    "correctAnswer": "Viết chữ / Soạn",
    "options": [
      "Viết chữ / Soạn",
      "Đọc sách to",
      "Nghe giảng bài",
      "Hội họa vẽ"
    ],
    "explanation": "写 (xiě) là cầm bút viết chữ (Ví dụ: 写汉字 - viết chữ Hán)."
  },
  {
    "id": 59,
    "hanzi": "字",
    "pinyin": "zì",
    "lesson": 6,
    "correctAnswer": "Chữ / Ký tự",
    "options": [
      "Chữ / Ký tự",
      "Quyển sách thư",
      "Lời nói thoại",
      "Tên gọi danh"
    ],
    "explanation": "字 (zì) chỉ mặt chữ hoặc ký tự (Ví dụ: 汉字 - chữ Hán)."
  },
  {
    "id": 60,
    "hanzi": "读",
    "pinyin": "dú",
    "lesson": 6,
    "correctAnswer": "Đọc sách / Đọc",
    "options": [
      "Đọc sách / Đọc",
      "Viết văn bản",
      "Nói năng lời",
      "Lắng nghe tai"
    ],
    "explanation": "读 (dú) là đọc thành tiếng hoặc đọc sách (读书: đọc sách, học hành)."
  },
  {
    "id": 61,
    "hanzi": "请",
    "pinyin": "qǐng",
    "lesson": 7,
    "correctAnswer": "Mời / Xin mời",
    "options": [
      "Mời / Xin mời",
      "Bảo / Ra lệnh",
      "Hỏi / Vấn đáp",
      "Cấm / Khuyên can"
    ],
    "explanation": "请 (qǐng) là từ lịch sự đặt đầu câu (Ví dụ: 请问 - xin hỏi, 请坐 - xin mời ngồi)."
  },
  {
    "id": 62,
    "hanzi": "今天",
    "pinyin": "jīntiān",
    "lesson": 7,
    "correctAnswer": "Hôm nay",
    "options": [
      "Hôm nay",
      "Ngày mai minh nhật",
      "Hôm qua tạc thiên",
      "Năm nay kim niên"
    ],
    "explanation": "今天 (jīntiān) chỉ ngày hiện tại."
  },
  {
    "id": 63,
    "hanzi": "号",
    "pinyin": "hào",
    "lesson": 7,
    "correctAnswer": "Ngày / Số hiệu",
    "options": [
      "Ngày / Số hiệu",
      "Tháng / Nguyệt",
      "Năm / Niên",
      "Tuần / Tuần lễ"
    ],
    "explanation": "号 (hào) dùng nói ngày trong tháng (Ví dụ: 5号 - ngày 5) hoặc số nhà, số xe."
  },
  {
    "id": 64,
    "hanzi": "月",
    "pinyin": "yuè",
    "lesson": 7,
    "correctAnswer": "Tháng / Mặt trăng",
    "options": [
      "Tháng / Mặt trăng",
      "Năm / Mặt trời",
      "Ngày / Ngôi sao",
      "Tuần / Đám mây"
    ],
    "explanation": "月 (yuè) dùng nói các tháng trong năm (一月 - tháng 1) hoặc mặt trăng."
  },
  {
    "id": 65,
    "hanzi": "星期",
    "pinyin": "xīngqī",
    "lesson": 7,
    "correctAnswer": "Tuần lễ / Thứ",
    "options": [
      "Tuần lễ / Thứ",
      "Tháng trong năm",
      "Mùa trong tiết",
      "Khoảng giờ phút"
    ],
    "explanation": "星期 (xīngqī) nghĩa là tuần lễ hoặc thứ trong tuần (Ví dụ: 星期一 - thứ Hai)."
  },
  {
    "id": 66,
    "hanzi": "昨天",
    "pinyin": "zuótiān",
    "lesson": 7,
    "correctAnswer": "Hôm qua",
    "options": [
      "Hôm qua",
      "Hôm nay kim thiên",
      "Ngày mai minh thiên",
      "Hôm kia tiền thiên"
    ],
    "explanation": "昨天 (zuótiān) chỉ ngày hôm qua."
  },
  {
    "id": 67,
    "hanzi": "明天",
    "pinyin": "míngtiān",
    "lesson": 7,
    "correctAnswer": "Ngày mai",
    "options": [
      "Ngày mai",
      "Hôm nay kim thiên",
      "Hôm qua tạc thiên",
      "Năm sau minh niên"
    ],
    "explanation": "明天 (míngtiān) chỉ ngày mai, ngày tiếp theo."
  },
  {
    "id": 68,
    "hanzi": "去",
    "pinyin": "qù",
    "lesson": 7,
    "correctAnswer": "Đi / Đến nơi khác",
    "options": [
      "Đi / Đến nơi khác",
      "Đến hướng người nói",
      "Trở về chốn cũ",
      "Ở tại vị trí"
    ],
    "explanation": "去 (qù) chỉ chuyển động rời xa người nói đến nơi khác (Ví dụ: 去学校 - đi đến trường)."
  },
  {
    "id": 69,
    "hanzi": "学校",
    "pinyin": "xuéxiào",
    "lesson": 7,
    "correctAnswer": "Trường học",
    "options": [
      "Trường học",
      "Bệnh viện y tế",
      "Cửa hàng / Tiệm",
      "Nhà hàng ăn uống"
    ],
    "explanation": "学校 (xuéxiào) là cơ sở trường lớp giáo dục."
  },
  {
    "id": 70,
    "hanzi": "看",
    "pinyin": "kàn",
    "lesson": 7,
    "correctAnswer": "Xem / Nhìn / Đọc",
    "options": [
      "Xem / Nhìn / Đọc",
      "Lắng nghe thanh âm",
      "Nói chuyện trao đổi",
      "Viết lách ghi chép"
    ],
    "explanation": "看 (kàn) là nhìn ngắm, xem (看电视: xem tivi) hoặc đọc sách báo (看书: đọc sách)."
  },
  {
    "id": 71,
    "hanzi": "想",
    "pinyin": "xiǎng",
    "lesson": 8,
    "correctAnswer": "Muốn / Nghĩ / Nhớ",
    "options": [
      "Muốn / Nghĩ / Nhớ",
      "Yêu thích đam mê",
      "Làm việc nấu nướng",
      "Hỏi han / Thắc mắc"
    ],
    "explanation": "想 (xiǎng) biểu thị ước muốn (Muốn), suy nghĩ (Nghĩ) hoặc nhớ nhung (Nhớ)."
  },
  {
    "id": 72,
    "hanzi": "喝",
    "pinyin": "hē",
    "lesson": 8,
    "correctAnswer": "Uống / Dùng nước",
    "options": [
      "Uống / Dùng nước",
      "Ăn thức ăn",
      "Nói lời hay",
      "Hát khúc ca"
    ],
    "explanation": "喝 (hē) là động từ uống chất lỏng (Ví dụ: 喝茶 - uống trà, 喝水 - uống nước)."
  },
  {
    "id": 73,
    "hanzi": "茶",
    "pinyin": "chá",
    "lesson": 8,
    "correctAnswer": "Trà / Nước chè",
    "options": [
      "Trà / Nước chè",
      "Cà phê đen",
      "Rượu nếp thơm",
      "Canh rau ngọt"
    ],
    "explanation": "茶 (chá) là đồ uống trà truyền thống."
  },
  {
    "id": 74,
    "hanzi": "吃",
    "pinyin": "chī",
    "lesson": 8,
    "correctAnswer": "Ăn / Dùng bữa",
    "options": [
      "Ăn / Dùng bữa",
      "Uống chất lỏng",
      "Ngủ say sưa",
      "Nói năng lời"
    ],
    "explanation": "吃 (chī) là hành động ăn thức ăn (Ví dụ: 吃饭 - ăn cơm)."
  },
  {
    "id": 75,
    "hanzi": "米饭",
    "pinyin": "mǐfàn",
    "lesson": 8,
    "correctAnswer": "Cơm / Cơm trắng",
    "options": [
      "Cơm / Cơm trắng",
      "Mì sợi kéo",
      "Bánh bao hấp",
      "Canh súp nóng"
    ],
    "explanation": "米饭 (mǐfàn) là cơm nấu chín từ gạo."
  },
  {
    "id": 76,
    "hanzi": "下午",
    "pinyin": "xiàwǔ",
    "lesson": 8,
    "correctAnswer": "Buổi chiều",
    "options": [
      "Buổi chiều",
      "Buổi sáng sớm",
      "Buổi trưa chính",
      "Buổi tối đêm"
    ],
    "explanation": "下午 (xiàwǔ) là khoảng thời gian buổi chiều sau 12h trưa."
  },
  {
    "id": 77,
    "hanzi": "商店",
    "pinyin": "shāngdiàn",
    "lesson": 8,
    "correctAnswer": "Cửa hàng / Tiệm",
    "options": [
      "Cửa hàng / Tiệm",
      "Bệnh viện chữa",
      "Trường học",
      "Khách sạn lưu"
    ],
    "explanation": "商店 (shāngdiàn) là nơi bán hàng hóa, tiệm tạp hóa."
  },
  {
    "id": 78,
    "hanzi": "买",
    "pinyin": "mǎi",
    "lesson": 8,
    "correctAnswer": "Mua / Mua sắm",
    "options": [
      "Mua / Mua sắm",
      "Bán / Tiêu thụ",
      "Tặng / Cho quà",
      "Mượn / Vay nợ"
    ],
    "explanation": "买 (mǎi) là đổi tiền lấy hàng (đối lập với 卖 - bán, mang thanh 4)."
  },
  {
    "id": 79,
    "hanzi": "杯子",
    "pinyin": "bēizi",
    "lesson": 8,
    "correctAnswer": "Cái cốc / Cái ly",
    "options": [
      "Cái cốc / Cái ly",
      "Cái bàn gỗ",
      "Cái ghế ngồi",
      "Quyển sách đọc"
    ],
    "explanation": "杯子 (bēizi) là cái cốc, ly để uống nước hoặc trà."
  },
  {
    "id": 80,
    "hanzi": "这",
    "pinyin": "zhè",
    "lesson": 8,
    "correctAnswer": "Đây / Này",
    "options": [
      "Đây / Này",
      "Kia / Đó",
      "Nào / Đâu",
      "Ai / Người nào"
    ],
    "explanation": "这 (zhè) chỉ người hoặc vật ở gần người nói (đối lập với 那 - kia)."
  },
  {
    "id": 81,
    "hanzi": "小",
    "pinyin": "xiǎo",
    "lesson": 9,
    "correctAnswer": "Nhỏ bé / Bé",
    "options": [
      "Nhỏ bé / Bé",
      "To lớn / Đại",
      "Nhiều nhặn / Đa",
      "Ít ỏi / Thiểu"
    ],
    "explanation": "小 (xiǎo) miêu tả kích thước nhỏ nhắn (đối lập với 大 - to lớn)."
  },
  {
    "id": 82,
    "hanzi": "猫",
    "pinyin": "māo",
    "lesson": 9,
    "correctAnswer": "Con mèo",
    "options": [
      "Con mèo",
      "Con chó trung thành",
      "Con chim trên cành",
      "Con cá dưới nước"
    ],
    "explanation": "猫 (māo) là con mèo nuôi trong nhà."
  },
  {
    "id": 83,
    "hanzi": "狗",
    "pinyin": "gǒu",
    "lesson": 9,
    "correctAnswer": "Con chó",
    "options": [
      "Con chó",
      "Con mèo kêu meo",
      "Con gà gáy sáng",
      "Con heo trong chuồng"
    ],
    "explanation": "狗 (gǒu) là loài chó trung thành."
  },
  {
    "id": 84,
    "hanzi": "椅子",
    "pinyin": "yǐzi",
    "lesson": 9,
    "correctAnswer": "Cái ghế",
    "options": [
      "Cái ghế",
      "Cái bàn học",
      "Cái giường ngủ",
      "Cái tủ đựng"
    ],
    "explanation": "椅子 (yǐzi) là đồ dùng nội thất để ngồi."
  },
  {
    "id": 85,
    "hanzi": "哪儿",
    "pinyin": "nǎr",
    "lesson": 9,
    "correctAnswer": "Ở đâu / Chỗ nào",
    "options": [
      "Ở đâu / Chỗ nào",
      "Ở đây chốn này",
      "Ở kia chốn nọ",
      "Bao giờ thời gian"
    ],
    "explanation": "哪儿 (nǎr) là đại từ nghi vấn hỏi về vị trí nơi chốn (= 哪里)."
  },
  {
    "id": 86,
    "hanzi": "工作",
    "pinyin": "gōngzuò",
    "lesson": 9,
    "correctAnswer": "Làm việc / Công việc",
    "options": [
      "Làm việc / Công việc",
      "Học tập rèn luyện",
      "Nghỉ ngơi an dưỡng",
      "Mua sắm tiêu xài"
    ],
    "explanation": "工作 (gōngzuò) vừa là danh từ (công việc) vừa là động từ (làm việc)."
  },
  {
    "id": 87,
    "hanzi": "医院",
    "pinyin": "yīyuàn",
    "lesson": 9,
    "correctAnswer": "Bệnh viện",
    "options": [
      "Bệnh viện",
      "Trường học",
      "Cửa hàng buôn",
      "Nhà thuốc tây"
    ],
    "explanation": "医院 (yīyuàn) là cơ sở khám và chữa bệnh."
  },
  {
    "id": 88,
    "hanzi": "医生",
    "pinyin": "yīshēng",
    "lesson": 9,
    "correctAnswer": "Bác sĩ",
    "options": [
      "Bác sĩ",
      "Giáo viên giảng dạy",
      "Học sinh đi học",
      "Y tá chăm sóc"
    ],
    "explanation": "医生 (yīshēng) là người thầy thuốc chữa bệnh."
  },
  {
    "id": 89,
    "hanzi": "爸爸",
    "pinyin": "bàba",
    "lesson": 9,
    "correctAnswer": "Bố / Ba / Cha",
    "options": [
      "Bố / Ba / Cha",
      "Mẹ / Má mẫu thân",
      "Anh trai ruột",
      "Thầy giáo tôn kính"
    ],
    "explanation": "爸爸 (bàba) nghĩa là bố, cha trong gia đình."
  },
  {
    "id": 90,
    "hanzi": "多少",
    "pinyin": "duōshao",
    "lesson": 9,
    "correctAnswer": "Bao nhiêu",
    "options": [
      "Bao nhiêu",
      "Mấy giờ trong ngày",
      "Cái nào lựa chọn",
      "Ở đâu / Vị trí nào"
    ],
    "explanation": "多少 (duōshao) dùng để hỏi số lượng hoặc hỏi giá tiền (多少钱: bao nhiêu tiền)."
  },
  {
    "id": 91,
    "hanzi": "桌子",
    "pinyin": "zhuōzi",
    "lesson": 10,
    "correctAnswer": "Cái bàn",
    "options": [
      "Cái bàn",
      "Cái ghế ngồi",
      "Cái giường nằm",
      "Cái cốc uống"
    ],
    "explanation": "桌子 (zhuōzi) là cái bàn để học tập, làm việc hoặc ăn cơm."
  },
  {
    "id": 92,
    "hanzi": "电脑",
    "pinyin": "diànnǎo",
    "lesson": 10,
    "correctAnswer": "Máy vi tính",
    "options": [
      "Máy vi tính",
      "Vô tuyến ti-vi",
      "Điện thoại cầm tay",
      "Đồng hồ xem giờ"
    ],
    "explanation": "电脑 (diànnǎo) nghĩa là máy tính."
  },
  {
    "id": 93,
    "hanzi": "和",
    "pinyin": "hé",
    "lesson": 10,
    "correctAnswer": "Và / Cùng",
    "options": [
      "Và / Cùng",
      "Hoặc / Hay là",
      "Nhưng / Song le",
      "Vì / Do bởi"
    ],
    "explanation": "和 (hé) là liên từ nối hai danh từ hoặc đại từ (Ví dụ: 我和他 - tôi và anh ấy)."
  },
  {
    "id": 94,
    "hanzi": "本",
    "pinyin": "běn",
    "lesson": 10,
    "correctAnswer": "Cuốn / Quyển",
    "options": [
      "Cuốn / Quyển",
      "Cái / Chiếc",
      "Miếng / Mảnh",
      "Chiếc xe cộ"
    ],
    "explanation": "本 (běn) là lượng từ dùng cho sách, vở (Ví dụ: 一本书 - một cuốn sách)."
  },
  {
    "id": 95,
    "hanzi": "里",
    "pinyin": "lǐ",
    "lesson": 10,
    "correctAnswer": "Bên trong / Trong",
    "options": [
      "Bên trong / Trong",
      "Bên ngoài chốn ngoài",
      "Phía trước đằng trước",
      "Phía sau đằng sau"
    ],
    "explanation": "里 (lǐ) là phương vị từ chỉ phía trong (Ví dụ: 家里 - trong nhà, 学校里 - trong trường)."
  },
  {
    "id": 96,
    "hanzi": "前面",
    "pinyin": "qiánmiàn",
    "lesson": 10,
    "correctAnswer": "Phía trước / Đằng trước",
    "options": [
      "Phía trước / Đằng trước",
      "Phía sau đằng sau",
      "Bên trong phía trong",
      "Bên cạnh sát bên"
    ],
    "explanation": "前面 (qiánmiàn) chỉ vị trí phía trước mặt (đối lập với 后面)."
  },
  {
    "id": 97,
    "hanzi": "后面",
    "pinyin": "hòumiàn",
    "lesson": 10,
    "correctAnswer": "Phía sau / Đằng sau",
    "options": [
      "Phía sau / Đằng sau",
      "Phía trước đằng trước",
      "Bên trong phía trong",
      "Bên ngoài phía ngoài"
    ],
    "explanation": "后面 (hòumiàn) chỉ vị trí phía sau lưng (đối lập với 前面)."
  },
  {
    "id": 98,
    "hanzi": "没有",
    "pinyin": "méiyǒu",
    "lesson": 10,
    "correctAnswer": "Không có / Chưa",
    "options": [
      "Không có / Chưa",
      "Đang có sở hữu",
      "Có thể khả thi",
      "Bắt buộc cần thiết"
    ],
    "explanation": "没有 (méiyǒu) phủ định sự sở hữu hoặc hành động trong quá khứ."
  },
  {
    "id": 99,
    "hanzi": "能",
    "pinyin": "néng",
    "lesson": 10,
    "correctAnswer": "Có thể / Năng lực",
    "options": [
      "Có thể / Năng lực",
      "Không thể bó tay",
      "Bắt buộc phải làm",
      "Muốn có nguyện vọng"
    ],
    "explanation": "能 (néng) biểu thị khả năng hoặc điều kiện cho phép (Ví dụ: 我能坐这儿吗 - Tôi có thể ngồi đây không?)."
  },
  {
    "id": 100,
    "hanzi": "坐",
    "pinyin": "zuò",
    "lesson": 10,
    "correctAnswer": "Ngồi / Đi xe",
    "options": [
      "Ngồi / Đi xe",
      "Đứng vững vàng",
      "Chạy thật nhanh",
      "Nằm nghỉ ngơi"
    ],
    "explanation": "坐 (zuò) nghĩa là ngồi xuống (请坐) hoặc đi bằng phương tiện giao thông (坐飞机)."
  },
  {
    "id": 101,
    "hanzi": "现在",
    "pinyin": "xiànzài",
    "lesson": 11,
    "correctAnswer": "Hiện tại / Bây giờ",
    "options": [
      "Hiện tại / Bây giờ",
      "Hôm nay kim thiên",
      "Lúc trước quá khứ",
      "Sau này tương lai"
    ],
    "explanation": "现在 (xiànzài) chỉ thời điểm ngay lúc này (Ví dụ: 现在几点 - bây giờ là mấy giờ?)."
  },
  {
    "id": 102,
    "hanzi": "点",
    "pinyin": "diǎn",
    "lesson": 11,
    "correctAnswer": "Giờ / Chút ít",
    "options": [
      "Giờ / Chút ít",
      "Phút / Giây lát",
      "Năm / Mùa vụ",
      "Tháng / Tuần lễ"
    ],
    "explanation": "点 (diǎn) dùng để nói giờ trong ngày (八点: 8 giờ) hoặc một chút (一点儿)."
  },
  {
    "id": 103,
    "hanzi": "分钟",
    "pinyin": "fēnzhōng",
    "lesson": 11,
    "correctAnswer": "Phút",
    "options": [
      "Phút",
      "Giờ đồng hồ",
      "Giây ngắn ngủi",
      "Ngày tròn vẹn"
    ],
    "explanation": "分钟 (fēnzhōng) chỉ khoảng thời gian tính bằng phút (Ví dụ: 五分钟 - 5 phút)."
  },
  {
    "id": 104,
    "hanzi": "中午",
    "pinyin": "zhōngwǔ",
    "lesson": 11,
    "correctAnswer": "Buổi trưa",
    "options": [
      "Buổi trưa",
      "Buổi sáng sớm",
      "Buổi chiều tà",
      "Buổi tối đêm"
    ],
    "explanation": "中午 (zhōngwǔ) là thời điểm chính giữa ngày khoảng 11h30 - 13h00."
  },
  {
    "id": 105,
    "hanzi": "时候",
    "pinyin": "shíhou",
    "lesson": 11,
    "correctAnswer": "Lúc / Khi / Khoảng thời gian",
    "options": [
      "Lúc / Khi / Khoảng thời gian",
      "Nơi chốn vị trí",
      "Lý do nguyên cớ",
      "Đồ vật khí cụ"
    ],
    "explanation": "时候 (shíhou) chỉ khoảnh khắc hoặc khoảng thời gian (...的时候: lúc/khi...)."
  },
  {
    "id": 106,
    "hanzi": "回",
    "pinyin": "huí",
    "lesson": 11,
    "correctAnswer": "Về / Trở về",
    "options": [
      "Về / Trở về",
      "Đi đến nơi khác",
      "Đến phía trước",
      "Ở tại vị trí"
    ],
    "explanation": "回 (huí) là động từ trở về nơi cũ (Ví dụ: 回家 - về nhà, 回国 - về nước)."
  },
  {
    "id": 107,
    "hanzi": "我们",
    "pinyin": "wǒmen",
    "lesson": 11,
    "correctAnswer": "Chúng tôi / Chúng ta",
    "options": [
      "Chúng tôi / Chúng ta",
      "Các bạn các anh",
      "Bọn họ tha môn",
      "Mọi người đại gia"
    ],
    "explanation": "我们 (wǒmen) là đại từ nhân xưng ngôi thứ nhất số nhiều."
  },
  {
    "id": 108,
    "hanzi": "电影",
    "pinyin": "diànyǐng",
    "lesson": 11,
    "correctAnswer": "Phim / Xem phim",
    "options": [
      "Phim / Xem phim",
      "Tivi truyền hình",
      "Sách báo tạp chí",
      "Âm nhạc bài ca"
    ],
    "explanation": "电影 (diànyǐng) là bộ phim chiếu rạp hoặc phim truyện."
  },
  {
    "id": 109,
    "hanzi": "住",
    "pinyin": "zhù",
    "lesson": 11,
    "correctAnswer": "Ở / Sinh sống",
    "options": [
      "Ở / Sinh sống",
      "Rời đi nơi khác",
      "Làm việc công tác",
      "Học tập trường lớp"
    ],
    "explanation": "住 (zhù) là động từ sinh sống, cư ngụ tại một địa điểm (Ví dụ: 住北京 - sống ở Bắc Kinh)."
  },
  {
    "id": 110,
    "hanzi": "上",
    "pinyin": "shàng",
    "lesson": 11,
    "correctAnswer": "Bên trên / Lên",
    "options": [
      "Bên trên / Lên",
      "Bên dưới xuống",
      "Bên trong vào",
      "Bên ngoài ra"
    ],
    "explanation": "上 (shàng) chỉ vị trí bên trên hoặc hành động đi lên (Ví dụ: 桌子上 - trên bàn, 上课 - vào học)."
  },
  {
    "id": 111,
    "hanzi": "天气",
    "pinyin": "tiānqì",
    "lesson": 12,
    "correctAnswer": "Thời tiết / Khí trời",
    "options": [
      "Thời tiết / Khí trời",
      "Thời gian năm tháng",
      "Không khí hít thở",
      "Nhiệt độ nóng lạnh"
    ],
    "explanation": "天气 (tiānqì) chỉ trạng thái nắng, mưa, nóng, lạnh (今天天气很好 - Hôm nay thời tiết rất tốt)."
  },
  {
    "id": 112,
    "hanzi": "怎么样",
    "pinyin": "zěnmeyàng",
    "lesson": 12,
    "correctAnswer": "Thế nào / Ra sao / Như thế nào",
    "options": [
      "Thế nào / Ra sao / Như thế nào",
      "Bao nhiêu số lượng",
      "Ở đâu nơi chốn",
      "Làm gì hành động"
    ],
    "explanation": "怎么样 (zěnmeyàng) dùng hỏi về tính chất, tình hình hoặc trưng cầu ý kiến người khác."
  },
  {
    "id": 113,
    "hanzi": "太",
    "pinyin": "tài",
    "lesson": 12,
    "correctAnswer": "Quá / Lắm",
    "options": [
      "Quá / Lắm",
      "Không hề phủ định",
      "Một chút ít ỏi",
      "Bình thường vừa phải"
    ],
    "explanation": "太 (tài) biểu thị mức độ cao, thường đi cặp: 太……了 (Ví dụ: 太好了 - tốt quá rồi)."
  },
  {
    "id": 114,
    "hanzi": "热",
    "pinyin": "rè",
    "lesson": 12,
    "correctAnswer": "Nóng / Nóng bức",
    "options": [
      "Nóng / Nóng bức",
      "Lạnh lẽo buốt giá",
      "Ấm áp dễ chịu",
      "Mát mẻ sảng khoái"
    ],
    "explanation": "热 (rè) miêu tả thời tiết hoặc nhiệt độ cao, nóng bức."
  },
  {
    "id": 115,
    "hanzi": "冷",
    "pinyin": "lěng",
    "lesson": 12,
    "correctAnswer": "Lạnh / Lạnh lẽo",
    "options": [
      "Lạnh / Lạnh lẽo",
      "Nóng bức oi ả",
      "Ấm áp mùa xuân",
      "Mát mẻ mùa thu"
    ],
    "explanation": "冷 (lěng) miêu tả nhiệt độ thấp, thời tiết giá lạnh."
  },
  {
    "id": 116,
    "hanzi": "下雨",
    "pinyin": "xiàyǔ",
    "lesson": 12,
    "correctAnswer": "Đổ mưa / Trời mưa",
    "options": [
      "Đổ mưa / Trời mưa",
      "Trời nắng quang đãng",
      "Tuyết rơi trắng xóa",
      "Có gió giông bão"
    ],
    "explanation": "下雨 (xiàyǔ) miêu tả hiện tượng mưa rơi từ bầu trời (雨: mưa)."
  },
  {
    "id": 117,
    "hanzi": "小姐",
    "pinyin": "xiǎojiě",
    "lesson": 12,
    "correctAnswer": "Cô gái / Cô",
    "options": [
      "Cô gái / Cô",
      "Quý ông tiên sinh",
      "Người mẹ mẫu thân",
      "Con gái nữ nhi"
    ],
    "explanation": "小姐 (xiǎojiě) là danh xưng lịch sự dành cho phụ nữ trẻ tuổi (Ví dụ: 李小姐 - cô Lý)."
  },
  {
    "id": 118,
    "hanzi": "来",
    "pinyin": "lái",
    "lesson": 12,
    "correctAnswer": "Đến / Tới / Lại",
    "options": [
      "Đến / Tới / Lại",
      "Đi xa vị trí",
      "Trở về chốn cũ",
      "Ở lại chỗ này"
    ],
    "explanation": "来 (lái) chỉ chuyển động hướng về phía người nói (đối lập với 去 - đi)."
  },
  {
    "id": 119,
    "hanzi": "些",
    "pinyin": "xiē",
    "lesson": 12,
    "correctAnswer": "Một vài / Một số / Chút ít",
    "options": [
      "Một vài / Một số / Chút ít",
      "Tất cả toàn bộ",
      "Rất nhiều vô kể",
      "Một cái duy nhất"
    ],
    "explanation": "些 (xiē) là lượng từ biểu thị số lượng không xác định (Ví dụ: 这些 - những cái này, 一些 - một số/một ít)."
  },
  {
    "id": 120,
    "hanzi": "水",
    "pinyin": "shuǐ",
    "lesson": 12,
    "correctAnswer": "Nước",
    "options": [
      "Nước",
      "Lửa / Hỏa ngọn",
      "Đất / Thổ đai",
      "Gió / Phong lộng"
    ],
    "explanation": "水 (shuǐ) là nước uống hoặc chất lỏng nói chung (喝水: uống nước)."
  },
  {
    "id": 121,
    "hanzi": "喂",
    "pinyin": "wèi",
    "lesson": 13,
    "correctAnswer": "A-lô / Này",
    "options": [
      "A-lô / Này",
      "Xin chào gặp mặt",
      "Tạm biệt chia tay",
      "Cảm ơn giúp đỡ"
    ],
    "explanation": "喂 (wèi) là thán từ dùng khi bắt máy điện thoại tương tự như 'a-lô'."
  },
  {
    "id": 122,
    "hanzi": "上午",
    "pinyin": "shàngwǔ",
    "lesson": 13,
    "correctAnswer": "Buổi sáng",
    "options": [
      "Buổi sáng",
      "Buổi chiều sau trưa",
      "Buổi tối đêm khuya",
      "Buổi trưa chính ngọ"
    ],
    "explanation": "上午 (shàngwǔ) là khoảng thời gian buổi sáng trước 12h trưa."
  },
  {
    "id": 123,
    "hanzi": "睡觉",
    "pinyin": "shuìjiào",
    "lesson": 13,
    "correctAnswer": "Đi ngủ / Giấc ngủ",
    "options": [
      "Đi ngủ / Giấc ngủ",
      "Thức dậy sớm mai",
      "Tắm gội sạch sẽ",
      "Ăn cơm trưa tối"
    ],
    "explanation": "睡觉 (shuìjiào) là hành động đi ngủ nghỉ ngơi."
  },
  {
    "id": 124,
    "hanzi": "电视",
    "pinyin": "diànshì",
    "lesson": 13,
    "correctAnswer": "Tivi",
    "options": [
      "Tivi",
      "Điện ảnh phim rạp",
      "Máy vi tính để bàn",
      "Điện thoại cầm tay"
    ],
    "explanation": "电视 (diànshì) là ti-vi, truyền hình vô tuyến."
  },
  {
    "id": 125,
    "hanzi": "喜欢",
    "pinyin": "xǐhuan",
    "lesson": 13,
    "correctAnswer": "Yêu thích / Thích thú",
    "options": [
      "Yêu thích / Thích thú",
      "Chán ghét xa lánh",
      "Mong muốn cần có",
      "Quên mất"
    ],
    "explanation": "喜欢 (xǐhuan) biểu thị sự yêu mến, thích thú (Ví dụ: 我喜欢汉语)."
  },
  {
    "id": 126,
    "hanzi": "打电话",
    "pinyin": "dǎ diànhuà",
    "lesson": 13,
    "correctAnswer": "Gọi điện thoại",
    "options": [
      "Gọi điện thoại",
      "Xem tivi giải trí",
      "Nghe bài hát hay",
      "Nói chuyện trực tiếp"
    ],
    "explanation": "打电话 (dǎ diànhuà) là quay số/bấm máy gọi điện thoại."
  },
  {
    "id": 127,
    "hanzi": "下",
    "pinyin": "xià",
    "lesson": 13,
    "correctAnswer": "Bên dưới / Xuống",
    "options": [
      "Bên dưới / Xuống",
      "Bên trên lên",
      "Bên trong vào",
      "Bên ngoài ra"
    ],
    "explanation": "下 (xià) chỉ vị trí bên dưới hoặc hướng chuyển động đi xuống (đối lập với 上)."
  },
  {
    "id": 128,
    "hanzi": "钱",
    "pinyin": "qián",
    "lesson": 13,
    "correctAnswer": "Tiền / Tiền bạc",
    "options": [
      "Tiền / Tiền bạc",
      "Thời gian giờ giấc",
      "Sách vở tri thức",
      "Quần áo may mặc"
    ],
    "explanation": "钱 (qián) là tiền tệ dùng trong giao thương (Ví dụ: 多少钱 - bao nhiêu tiền)."
  },
  {
    "id": 129,
    "hanzi": "块",
    "pinyin": "kuài",
    "lesson": 13,
    "correctAnswer": "Đồng tiền / Mảnh / Khối",
    "options": [
      "Đồng tiền / Mảnh / Khối",
      "Phút giây thời gian",
      "Quyển sách tập san",
      "Chiếc xe cộ máy"
    ],
    "explanation": "块 (kuài) dùng chỉ đơn vị tiền tệ khẩu ngữ (tệ/đồng) hoặc một mẩu, một khối."
  },
  {
    "id": 130,
    "hanzi": "那",
    "pinyin": "nà",
    "lesson": 13,
    "correctAnswer": "Kia / Đó",
    "options": [
      "Kia / Đó",
      "Đây / Này",
      "Nào / Đâu",
      "Ai / Người nào"
    ],
    "explanation": "那 (nà) dùng chỉ người hoặc vật ở xa người nói (đối lập với 这 - đây)."
  },
  {
    "id": 131,
    "hanzi": "东西",
    "pinyin": "dōngxi",
    "lesson": 14,
    "correctAnswer": "Đồ đạc / Đồ vật",
    "options": [
      "Đồ đạc / Đồ vật",
      "Phương hướng la bàn",
      "Quần áo mặc ngoài",
      "Thức ăn bữa ăn"
    ],
    "explanation": "东西 (dōngxi) nghĩa bóng là đồ đạc, đồ vật nói chung (买东西: mua sắm đồ)."
  },
  {
    "id": 132,
    "hanzi": "一点儿",
    "pinyin": "yìdiǎnr",
    "lesson": 14,
    "correctAnswer": "Một chút / Một ít",
    "options": [
      "Một chút / Một ít",
      "Rất nhiều phong phú",
      "Tất cả toàn vẹn",
      "Bao nhiêu số lượng"
    ],
    "explanation": "一点儿 (yìdiǎnr) biểu thị số lượng nhỏ (吃一点儿: ăn một chút)."
  },
  {
    "id": 133,
    "hanzi": "苹果",
    "pinyin": "píngguǒ",
    "lesson": 14,
    "correctAnswer": "Quả táo",
    "options": [
      "Quả táo",
      "Quả cam mọng nước",
      "Quả chuối tiêu vàng",
      "Quả dưa hấu mát"
    ],
    "explanation": "苹果 (píngguǒ) là loại quả táo tây ăn được."
  },
  {
    "id": 134,
    "hanzi": "看见",
    "pinyin": "kànjiàn",
    "lesson": 14,
    "correctAnswer": "Trông thấy / Nhìn thấy",
    "options": [
      "Trông thấy / Nhìn thấy",
      "Lắng nghe tai nghe",
      "Gặp gỡ tương ngộ",
      "Nghĩ tới nhớ nhung"
    ],
    "explanation": "看见 (kànjiàn) là bổ ngữ kết quả, biểu thị kết quả mắt nhìn và thấy được đối tượng."
  },
  {
    "id": 135,
    "hanzi": "先生",
    "pinyin": "xiānsheng",
    "lesson": 14,
    "correctAnswer": "Quý ông / Ngài / Chồng",
    "options": [
      "Quý ông / Ngài / Chồng",
      "Tiểu thư quý cô",
      "Bác sĩ chữa bệnh",
      "Thầy giáo trường học"
    ],
    "explanation": "先生 (xiānsheng) là danh xưng lịch sự dành cho phái nam hoặc gọi chồng."
  },
  {
    "id": 136,
    "hanzi": "开",
    "pinyin": "kāi",
    "lesson": 14,
    "correctAnswer": "Mở / Lái xe / Họp",
    "options": [
      "Mở / Lái xe / Họp",
      "Đóng / Dừng xe",
      "Ngồi / Chờ đợi",
      "Đi / Rời khỏi"
    ],
    "explanation": "开 (kāi) có nhiều nghĩa: 开门 (mở cửa), 开车 (lái xe), 开会 (họp hành)."
  },
  {
    "id": 137,
    "hanzi": "漂亮",
    "pinyin": "piàoliang",
    "lesson": 14,
    "correctAnswer": "Xinh đẹp / Đẹp đẽ",
    "options": [
      "Xinh đẹp / Đẹp đẽ",
      "Xấu xí thô kệch",
      "Thông minh đĩnh ngộ",
      "Hiền lành chất phác"
    ],
    "explanation": "漂亮 (piàoliang) dùng khen ngợi ngoại hình người hoặc vẻ đẹp sự vật."
  },
  {
    "id": 138,
    "hanzi": "少",
    "pinyin": "shǎo",
    "lesson": 14,
    "correctAnswer": "Ít ỏi / Thiếu",
    "options": [
      "Ít ỏi / Thiếu",
      "Nhiều nhặn đa số",
      "To lớn khổng lồ",
      "Bé nhỏ li ti"
    ],
    "explanation": "少 (shǎo) chỉ số lượng ít (Ví dụ: 不少: không ít, nhiều)."
  },
  {
    "id": 139,
    "hanzi": "都",
    "pinyin": "dōu",
    "lesson": 14,
    "correctAnswer": "Đều / Tất cả",
    "options": [
      "Đều / Tất cả",
      "Rất nhiều mức độ",
      "Không hề phủ định",
      "Cũng vậy tương đồng"
    ],
    "explanation": "都 (dōu) là phó từ chỉ tổng thể: mọi người/mọi thứ đều (我们都很好 - chúng tôi đều khỏe)."
  },
  {
    "id": 140,
    "hanzi": "衣服",
    "pinyin": "yīfu",
    "lesson": 14,
    "correctAnswer": "Quần áo",
    "options": [
      "Quần áo",
      "Giày dép đi chân",
      "Mũ nón đội đầu",
      "Túi xách xách tay"
    ],
    "explanation": "衣服 (yīfu) chỉ trang phục quần áo may mặc mặc trên người."
  },
  {
    "id": 141,
    "hanzi": "年",
    "pinyin": "nián",
    "lesson": 15,
    "correctAnswer": "Năm",
    "options": [
      "Năm",
      "Tháng trong năm",
      "Ngày trong tháng",
      "Giờ trong ngày"
    ],
    "explanation": "年 (nián) chỉ năm (Ví dụ: 今年 - năm nay, 去年 - năm ngoái, 明年 - năm sau)."
  },
  {
    "id": 142,
    "hanzi": "饭店",
    "pinyin": "fàndiàn",
    "lesson": 15,
    "correctAnswer": "Nhà hàng / Khách sạn",
    "options": [
      "Nhà hàng / Khách sạn",
      "Bệnh viện khám chữa",
      "Trường học viện đào tạo",
      "Cửa hàng bán lẻ"
    ],
    "explanation": "饭店 (fàndiàn) là nơi ăn uống (nhà hàng) hoặc khách sạn lưu trú."
  },
  {
    "id": 143,
    "hanzi": "出租车",
    "pinyin": "chūzūchē",
    "lesson": 15,
    "correctAnswer": "Xe taxi",
    "options": [
      "Xe taxi",
      "Máy bay phi cơ",
      "Xe buýt công cộng",
      "Tàu hỏa hỏa xa"
    ],
    "explanation": "出租车 (chūzūchē) là xe taxi (xe cho thuê)."
  },
  {
    "id": 144,
    "hanzi": "一起",
    "pinyin": "yìqǐ",
    "lesson": 15,
    "correctAnswer": "Cùng nhau",
    "options": [
      "Cùng nhau",
      "Một mình đơn độc",
      "Trước tiên mở đầu",
      "Sau đó tiếp nối"
    ],
    "explanation": "一起 (yìqǐ) là phó từ chỉ sự kết hợp cùng làm gì (Ví dụ: 一起去 - cùng nhau đi)."
  },
  {
    "id": 145,
    "hanzi": "高兴",
    "pinyin": "gāoxìng",
    "lesson": 15,
    "correctAnswer": "Vui vẻ / Phấn khởi",
    "options": [
      "Vui vẻ / Phấn khởi",
      "Buồn bã đau xót",
      "Tức giận phẫn nộ",
      "Mệt mỏi kiệt sức"
    ],
    "explanation": "高兴 (gāoxìng) miêu tả tâm trạng vui mừng, phấn chấn (很高兴认识你)."
  },
  {
    "id": 146,
    "hanzi": "听",
    "pinyin": "tīng",
    "lesson": 15,
    "correctAnswer": "Nghe / Lắng nghe",
    "options": [
      "Nghe / Lắng nghe",
      "Phát biểu ý kiến",
      "Đọc to sách báo",
      "Nhìn ngắm quang cảnh"
    ],
    "explanation": "听 (tīng) là hành động lắng nghe bằng tai (Ví dụ: 听音乐 - nghe nhạc)."
  },
  {
    "id": 147,
    "hanzi": "飞机",
    "pinyin": "fēijī",
    "lesson": 15,
    "correctAnswer": "Máy bay",
    "options": [
      "Máy bay",
      "Xe taxi bốn bánh",
      "Tàu hỏa đường sắt",
      "Xe buýt tuyến đường"
    ],
    "explanation": "飞机 (fēijī) là phương tiện hàng không máy bay."
  },
  {
    "id": 148,
    "hanzi": "爱",
    "pinyin": "ài",
    "lesson": 15,
    "correctAnswer": "Yêu / Yêu thương",
    "options": [
      "Yêu / Yêu thương",
      "Chán ghét xa lánh",
      "Mua bán trao đổi",
      "Nói năng phát biểu"
    ],
    "explanation": "爱 (ài) nghĩa là yêu hoặc thích ai đó/cái gì đó (Ví dụ: 我爱你 - Tôi yêu bạn)."
  },
  {
    "id": 149,
    "hanzi": "水果",
    "pinyin": "shuǐguǒ",
    "lesson": 15,
    "correctAnswer": "Hoa quả / Trái cây",
    "options": [
      "Hoa quả / Trái cây",
      "Rau xanh củ cải",
      "Món ăn bữa chính",
      "Nước khoáng đóng chai"
    ],
    "explanation": "水果 (shuǐguǒ) chỉ các loại quả trái cây ngọt lành ăn được."
  },
  {
    "id": 150,
    "hanzi": "怎么",
    "pinyin": "zěnme",
    "lesson": 15,
    "correctAnswer": "Làm sao / Thế nào / Sao lại",
    "options": [
      "Làm sao / Thế nào / Sao lại",
      "Ở đâu vị trí chốn",
      "Bao nhiêu số lượng tiền",
      "Cái gì đồ vật sự việc"
    ],
    "explanation": "怎么 (zěnme) dùng hỏi phương thức hành động (怎么去: đi như thế nào) hoặc nguyên do (你怎么了: bạn làm sao vậy)."
  }
];

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

  const code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK1_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(formattedQuestions, null, 2) + ";\n";

  const outputPath = path.resolve(process.cwd(), 'data/hsk1-data.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, code, 'utf-8');
  console.log("Generated " + rawVocab.length + " vocabulary questions at " + outputPath);
}

buildData();
