import fs from 'fs';
import path from 'path';
import { QuizQuestion } from '../types/quiz';

export interface CleanVocabItem {
  id: number;
  hanzi: string;
  pinyin: string;
  lesson: number;
  correctAnswer: string;
  options: [string, string, string, string];
  explanation: string;
}

// =========================================================================
// HSK 1 DATASET (150 WORDS across 15 standard lessons)
// All options are concise, natural, and symmetrically balanced:
// - 1-meaning words have four 1-meaning concise options.
// - 2-meaning words have four 2-meaning concise options with '/'.
// =========================================================================
export const HSK1_CLEAN: CleanVocabItem[] = [
  // --- Bài 1: 你好 (Chào hỏi) ---
  {
    id: 1, hanzi: "你", pinyin: "nǐ", lesson: 1,
    correctAnswer: "Bạn",
    options: ["Bạn", "Tôi", "Anh ấy", "Chúng tôi"],
    explanation: "你 (nǐ) là đại từ nhân xưng ngôi thứ hai (Ví dụ: 你好 - Chào bạn)."
  },
  {
    id: 2, hanzi: "好", pinyin: "hǎo", lesson: 1,
    correctAnswer: "Tốt",
    options: ["Tốt", "Xấu", "To", "Nhỏ"],
    explanation: "好 (hǎo) mang nghĩa tốt lành, khỏe mạnh (Ví dụ: 很好 - Rất tốt)."
  },
  {
    id: 3, hanzi: "对不起", pinyin: "duìbuqǐ", lesson: 1,
    correctAnswer: "Xin lỗi",
    options: ["Xin lỗi", "Cảm ơn", "Tạm biệt", "Không sao"],
    explanation: "对不起 (duìbuqǐ) dùng khi xin lỗi chân thành."
  },
  {
    id: 4, hanzi: "没关系", pinyin: "méi guānxi", lesson: 1,
    correctAnswer: "Không sao",
    options: ["Không sao", "Xin lỗi", "Cảm ơn", "Tạm biệt"],
    explanation: "没关系 (méi guānxi) dùng đáp lại lời xin lỗi."
  },
  {
    id: 5, hanzi: "一", pinyin: "yī", lesson: 1,
    correctAnswer: "Một",
    options: ["Một", "Hai", "Ba", "Mười"],
    explanation: "一 (yī) là số 1 trong tiếng Trung."
  },
  {
    id: 6, hanzi: "二", pinyin: "èr", lesson: 1,
    correctAnswer: "Hai",
    options: ["Hai", "Một", "Ba", "Bốn"],
    explanation: "二 (èr) là số 2 trong tiếng Trung."
  },
  {
    id: 7, hanzi: "三", pinyin: "sān", lesson: 1,
    correctAnswer: "Ba",
    options: ["Ba", "Bốn", "Hai", "Năm"],
    explanation: "三 (sān) là số 3 trong tiếng Trung."
  },
  {
    id: 8, hanzi: "四", pinyin: "sì", lesson: 1,
    correctAnswer: "Bốn",
    options: ["Bốn", "Năm", "Sáu", "Bảy"],
    explanation: "四 (sì) là số 4 trong tiếng Trung."
  },
  {
    id: 9, hanzi: "五", pinyin: "wǔ", lesson: 1,
    correctAnswer: "Năm",
    options: ["Năm", "Bốn", "Sáu", "Tám"],
    explanation: "五 (wǔ) là số 5 trong tiếng Trung."
  },
  {
    id: 10, hanzi: "是", pinyin: "shì", lesson: 1,
    correctAnswer: "Là",
    options: ["Là", "Có", "Ở", "Đi"],
    explanation: "是 (shì) là động từ khẳng định: là, phải (Ví dụ: 我是学生 - Tôi là học sinh)."
  },

  // --- Bài 2: 谢谢你 (Cảm ơn bạn) ---
  {
    id: 11, hanzi: "谢谢", pinyin: "xièxie", lesson: 2,
    correctAnswer: "Cảm ơn",
    options: ["Cảm ơn", "Xin lỗi", "Tạm biệt", "Không sao"],
    explanation: "谢谢 (xièxie) dùng để bày tỏ lòng biết ơn."
  },
  {
    id: 12, hanzi: "不", pinyin: "bù", lesson: 2,
    correctAnswer: "Không",
    options: ["Không", "Có", "Là", "Rất"],
    explanation: "不 (bù) là phó từ phủ định (Ví dụ: 不好 - không tốt)."
  },
  {
    id: 13, hanzi: "不客气", pinyin: "bú kèqi", lesson: 2,
    correctAnswer: "Đừng khách sáo",
    options: ["Đừng khách sáo", "Cảm ơn bạn", "Xin lỗi bạn", "Hẹn gặp lại"],
    explanation: "不客气 (bú kèqi) dùng đáp lại lời cảm ơn."
  },
  {
    id: 14, hanzi: "再见", pinyin: "zàijiàn", lesson: 2,
    correctAnswer: "Tạm biệt",
    options: ["Tạm biệt", "Xin chào", "Cảm ơn", "Xin lỗi"],
    explanation: "再见 (zàijiàn) dùng khi chào tạm biệt (hẹn gặp lại)."
  },
  {
    id: 15, hanzi: "六", pinyin: "liù", lesson: 2,
    correctAnswer: "Sáu",
    options: ["Sáu", "Bảy", "Tám", "Chín"],
    explanation: "六 (liù) là số 6 trong tiếng Trung."
  },
  {
    id: 16, hanzi: "七", pinyin: "qī", lesson: 2,
    correctAnswer: "Bảy",
    options: ["Bảy", "Sáu", "Tám", "Chín"],
    explanation: "七 (qī) là số 7 trong tiếng Trung."
  },
  {
    id: 17, hanzi: "八", pinyin: "bā", lesson: 2,
    correctAnswer: "Tám",
    options: ["Tám", "Bảy", "Chín", "Mười"],
    explanation: "八 (bā) là số 8 trong tiếng Trung."
  },
  {
    id: 18, hanzi: "九", pinyin: "jiǔ", lesson: 2,
    correctAnswer: "Chín",
    options: ["Chín", "Tám", "Mười", "Bảy"],
    explanation: "九 (jiǔ) là số 9 trong tiếng Trung."
  },
  {
    id: 19, hanzi: "十", pinyin: "shí", lesson: 2,
    correctAnswer: "Mười",
    options: ["Mười", "Chín", "Tám", "Một"],
    explanation: "十 (shí) là số 10 trong tiếng Trung."
  },
  {
    id: 20, hanzi: "人", pinyin: "rén", lesson: 2,
    correctAnswer: "Người",
    options: ["Người", "Nhà", "Nước", "Tên"],
    explanation: "人 (rén) chỉ con người (Ví dụ: 中国人 - người Trung Quốc)."
  },

  // --- Bài 3: 你叫什么名字 (Bạn tên là gì) ---
  {
    id: 21, hanzi: "叫", pinyin: "jiào", lesson: 3,
    correctAnswer: "Gọi / Tên là",
    options: ["Gọi / Tên là", "Nói / Kể là", "Hỏi / Nhắc là", "Xem / Trông là"],
    explanation: "叫 (jiào) có 2 nghĩa: gọi tên hoặc có tên là (Ví dụ: 我叫李明 - Tôi tên là Lý Minh)."
  },
  {
    id: 22, hanzi: "什么", pinyin: "shénme", lesson: 3,
    correctAnswer: "Cái gì",
    options: ["Cái gì", "Ở đâu", "Ai đó", "Khi nào"],
    explanation: "什么 (shénme) là đại từ nghi vấn hỏi về đồ vật, sự việc."
  },
  {
    id: 23, hanzi: "名字", pinyin: "míngzi", lesson: 3,
    correctAnswer: "Tên",
    options: ["Tên", "Tuổi", "Nhà", "Trường"],
    explanation: "名字 (míngzi) nghĩa là tên gọi của người hoặc vật."
  },
  {
    id: 24, hanzi: "我", pinyin: "wǒ", lesson: 3,
    correctAnswer: "Tôi",
    options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
    explanation: "我 (wǒ) là đại từ nhân xưng ngôi thứ nhất (tôi, mình)."
  },
  {
    id: 25, hanzi: "老师", pinyin: "lǎoshī", lesson: 3,
    correctAnswer: "Giáo viên",
    options: ["Giáo viên", "Học sinh", "Bác sĩ", "Bạn học"],
    explanation: "老师 (lǎoshī) là thầy giáo, cô giáo."
  },
  {
    id: 26, hanzi: "学生", pinyin: "xuésheng", lesson: 3,
    correctAnswer: "Học sinh",
    options: ["Học sinh", "Giáo viên", "Bác sĩ", "Bạn bè"],
    explanation: "学生 (xuésheng) là học sinh, sinh viên."
  },
  {
    id: 27, hanzi: "吗", pinyin: "ma", lesson: 3,
    correctAnswer: "Phải không",
    options: ["Phải không", "Cái gì", "Ở đâu", "Thế nào"],
    explanation: "吗 (ma) là trợ từ nghi vấn đặt ở cuối câu hỏi có/không."
  },
  {
    id: 28, hanzi: "中国", pinyin: "Zhōngguó", lesson: 3,
    correctAnswer: "Trung Quốc",
    options: ["Trung Quốc", "Bắc Kinh", "Việt Nam", "Nước Mỹ"],
    explanation: "中国 (Zhōngguó) là đất nước Trung Quốc."
  },
  {
    id: 29, hanzi: "北京", pinyin: "Běijīng", lesson: 3,
    correctAnswer: "Bắc Kinh",
    options: ["Bắc Kinh", "Thượng Hải", "Trung Quốc", "Hà Nội"],
    explanation: "北京 (Běijīng) là thủ đô Bắc Kinh của Trung Quốc."
  },
  {
    id: 30, hanzi: "学习", pinyin: "xuéxí", lesson: 3,
    correctAnswer: "Học tập",
    options: ["Học tập", "Làm việc", "Nghỉ ngơi", "Vui chơi"],
    explanation: "学习 (xuéxí) là hoạt động học tập, tiếp thu kiến thức."
  },

  // --- Bài 4: 她是我的汉语老师 (Cô ấy là giáo viên tiếng Trung của tôi) ---
  {
    id: 31, hanzi: "她", pinyin: "tā", lesson: 4,
    correctAnswer: "Cô ấy",
    options: ["Cô ấy", "Anh ấy", "Tôi", "Bạn"],
    explanation: "她 (tā) là đại từ nhân xưng ngôi thứ ba chỉ nữ giới."
  },
  {
    id: 32, hanzi: "谁", pinyin: "shéi", lesson: 4,
    correctAnswer: "Ai",
    options: ["Ai", "Gì", "Đâu", "Nào"],
    explanation: "谁 (shéi) là đại từ nghi vấn hỏi về người."
  },
  {
    id: 33, hanzi: "的", pinyin: "de", lesson: 4,
    correctAnswer: "Của",
    options: ["Của", "Và", "Với", "Là"],
    explanation: "的 (de) là trợ từ kết cấu biểu thị sở hữu (Ví dụ: 我的 - của tôi)."
  },
  {
    id: 34, hanzi: "汉语", pinyin: "Hànyǔ", lesson: 4,
    correctAnswer: "Tiếng Trung",
    options: ["Tiếng Trung", "Tiếng Anh", "Tiếng Pháp", "Tiếng Nhật"],
    explanation: "汉语 (Hànyǔ) là tiếng Trung (Hán ngữ)."
  },
  {
    id: 35, hanzi: "哪", pinyin: "nǎ", lesson: 4,
    correctAnswer: "Nào",
    options: ["Nào", "Đây", "Kia", "Đâu"],
    explanation: "哪 (nǎ) là đại từ nghi vấn (Ví dụ: 哪国人 - người nước nào)."
  },
  {
    id: 36, hanzi: "呢", pinyin: "ne", lesson: 4,
    correctAnswer: "Thì sao",
    options: ["Thì sao", "Ở đâu", "Là gì", "Thế nào"],
    explanation: "呢 (ne) là trợ từ ngữ khí đặt ở cuối câu để hỏi tỉnh lược (Ví dụ: 你呢 - còn bạn thì sao)."
  },
  {
    id: 37, hanzi: "他", pinyin: "tā", lesson: 4,
    correctAnswer: "Anh ấy",
    options: ["Anh ấy", "Cô ấy", "Tôi", "Bạn"],
    explanation: "他 (tā) là đại từ nhân xưng ngôi thứ ba chỉ nam giới."
  },
  {
    id: 38, hanzi: "同学", pinyin: "tóngxué", lesson: 4,
    correctAnswer: "Bạn học",
    options: ["Bạn học", "Thầy cô", "Bác sĩ", "Bạn thân"],
    explanation: "同学 (tóngxué) là bạn học cùng lớp hoặc cùng trường."
  },
  {
    id: 39, hanzi: "朋友", pinyin: "péngyou", lesson: 4,
    correctAnswer: "Bạn bè",
    options: ["Bạn bè", "Người thân", "Thầy cô", "Học sinh"],
    explanation: "朋友 (péngyou) nghĩa là bạn bè."
  },
  {
    id: 40, hanzi: "认识", pinyin: "rènshi", lesson: 4,
    correctAnswer: "Quen biết",
    options: ["Quen biết", "Hiểu lầm", "Quên mất", "Tìm thấy"],
    explanation: "认识 (rènshi) nghĩa là quen biết, nhận ra ai đó."
  },

  // --- Bài 5: 她女儿今年二十岁 (Con gái cô ấy năm nay hai mươi tuổi) ---
  {
    id: 41, hanzi: "家", pinyin: "jiā", lesson: 5,
    correctAnswer: "Nhà / Gia đình",
    options: ["Nhà / Gia đình", "Trường / Lớp học", "Cửa hàng / Tiệm", "Công ty / Xưởng"],
    explanation: "家 (jiā) vừa là gia đình vừa là ngôi nhà nơi mình sinh sống."
  },
  {
    id: 42, hanzi: "有", pinyin: "yǒu", lesson: 5,
    correctAnswer: "Có",
    options: ["Có", "Không", "Là", "Ở"],
    explanation: "有 (yǒu) biểu thị sự tồn tại hoặc sở hữu (Ví dụ: 我有 - tôi có)."
  },
  {
    id: 43, hanzi: "几", pinyin: "jǐ", lesson: 5,
    correctAnswer: "Mấy",
    options: ["Mấy", "Bao nhiêu", "Cái gì", "Khi nào"],
    explanation: "几 (jǐ) là từ để hỏi số lượng thường dưới 10."
  },
  {
    id: 44, hanzi: "岁", pinyin: "suì", lesson: 5,
    correctAnswer: "Tuổi",
    options: ["Tuổi", "Năm", "Tháng", "Ngày"],
    explanation: "岁 (suì) là lượng từ chỉ tuổi tác."
  },
  {
    id: 45, hanzi: "了", pinyin: "le", lesson: 5,
    correctAnswer: "Rồi",
    options: ["Rồi", "Chưa", "Đang", "Sẽ"],
    explanation: "了 (le) là trợ từ ngữ khí biểu thị hành động đã hoàn thành hoặc tình huống thay đổi."
  },
  {
    id: 46, hanzi: "女儿", pinyin: "nǚ'ér", lesson: 5,
    correctAnswer: "Con gái",
    options: ["Con gái", "Con trai", "Mẹ", "Bố"],
    explanation: "女儿 (nǚ'ér) nghĩa là con gái của bố mẹ."
  },
  {
    id: 47, hanzi: "儿子", pinyin: "érzi", lesson: 5,
    correctAnswer: "Con trai",
    options: ["Con trai", "Con gái", "Bố", "Mẹ"],
    explanation: "儿子 (érzi) nghĩa là con trai của bố mẹ."
  },
  {
    id: 48, hanzi: "多", pinyin: "duō", lesson: 5,
    correctAnswer: "Nhiều",
    options: ["Nhiều", "Ít", "Lớn", "Bé"],
    explanation: "多 (duō) chỉ số lượng nhiều hoặc dùng hỏi mức độ (多大 - bao nhiêu tuổi)."
  },
  {
    id: 49, hanzi: "大", pinyin: "dà", lesson: 5,
    correctAnswer: "Lớn",
    options: ["Lớn", "Nhỏ", "Dài", "Ngắn"],
    explanation: "大 (dà) chỉ kích thước to lớn hoặc tuổi tác lớn."
  },
  {
    id: 50, hanzi: "个", pinyin: "gè", lesson: 5,
    correctAnswer: "Cái",
    options: ["Cái", "Con", "Quyển", "Cây"],
    explanation: "个 (gè) là lượng từ thông dụng nhất trong tiếng Trung."
  },

  // --- Bài 6: 我会说汉语 (Tôi biết nói tiếng Trung) ---
  {
    id: 51, hanzi: "会", pinyin: "huì", lesson: 6,
    correctAnswer: "Biết / Sẽ",
    options: ["Biết / Sẽ", "Muốn / Thích", "Đi / Đến", "Nói / Làm"],
    explanation: "会 (huì) có 2 nghĩa: biết làm gì qua rèn luyện hoặc sẽ xảy ra trong tương lai."
  },
  {
    id: 52, hanzi: "说", pinyin: "shuō", lesson: 6,
    correctAnswer: "Nói",
    options: ["Nói", "Nghe", "Đọc", "Viết"],
    explanation: "说 (shuō) là động từ nói (Ví dụ: 说话 - nói chuyện)."
  },
  {
    id: 53, hanzi: "妈妈", pinyin: "māma", lesson: 6,
    correctAnswer: "Mẹ",
    options: ["Mẹ", "Bố", "Chị gái", "Bà"],
    explanation: "妈妈 (māma) là người mẹ trong gia đình."
  },
  {
    id: 54, hanzi: "菜", pinyin: "cài", lesson: 6,
    correctAnswer: "Món ăn / Rau",
    options: ["Món ăn / Rau", "Cơm / Mì", "Trà / Nước", "Thịt / Cá"],
    explanation: "菜 (cài) có 2 nghĩa: món ăn nói chung hoặc các loại rau củ."
  },
  {
    id: 55, hanzi: "很", pinyin: "hěn", lesson: 6,
    correctAnswer: "Rất",
    options: ["Rất", "Quá", "Hơi", "Không"],
    explanation: "很 (hěn) là phó từ chỉ mức độ cao (Ví dụ: 很好 - rất tốt)."
  },
  {
    id: 56, hanzi: "好吃", pinyin: "hǎochī", lesson: 6,
    correctAnswer: "Ngon",
    options: ["Ngon", "Dở", "Cay", "Ngọt"],
    explanation: "好吃 (hǎochī) nghĩa là món ăn ngon miệng."
  },
  {
    id: 57, hanzi: "做", pinyin: "zuò", lesson: 6,
    correctAnswer: "Làm",
    options: ["Làm", "Xem", "Nói", "Nghe"],
    explanation: "做 (zuò) là động từ làm, nấu nướng (Ví dụ: 做饭 - nấu cơm)."
  },
  {
    id: 58, hanzi: "写", pinyin: "xiě", lesson: 6,
    correctAnswer: "Viết",
    options: ["Viết", "Đọc", "Nói", "Nghe"],
    explanation: "写 (xiě) là hành động viết chữ."
  },
  {
    id: 59, hanzi: "字", pinyin: "zì", lesson: 6,
    correctAnswer: "Chữ",
    options: ["Chữ", "Số", "Tranh", "Sách"],
    explanation: "字 (zì) là chữ viết, ký tự (Ví dụ: 汉字 - chữ Hán)."
  },
  {
    id: 60, hanzi: "读", pinyin: "dú", lesson: 6,
    correctAnswer: "Đọc",
    options: ["Đọc", "Viết", "Nghe", "Nói"],
    explanation: "读 (dú) là động từ đọc (Ví dụ: 读书 - đọc sách)."
  },

  // --- Bài 7: 今天几号 (Hôm nay ngày mấy) ---
  {
    id: 61, hanzi: "请", pinyin: "qǐng", lesson: 7,
    correctAnswer: "Mời",
    options: ["Mời", "Cảm ơn", "Tạm biệt", "Xin lỗi"],
    explanation: "请 (qǐng) dùng khi mời, xin phép một cách lịch sự (Ví dụ: 请进 - xin mời vào)."
  },
  {
    id: 62, hanzi: "今天", pinyin: "jīntiān", lesson: 7,
    correctAnswer: "Hôm nay",
    options: ["Hôm nay", "Hôm qua", "Ngày mai", "Năm nay"],
    explanation: "今天 (jīntiān) chỉ ngày hôm nay."
  },
  {
    id: 63, hanzi: "号", pinyin: "hào", lesson: 7,
    correctAnswer: "Ngày",
    options: ["Ngày", "Tháng", "Năm", "Giờ"],
    explanation: "号 (hào) dùng chỉ ngày trong tháng theo văn nói."
  },
  {
    id: 64, hanzi: "月", pinyin: "yuè", lesson: 7,
    correctAnswer: "Tháng",
    options: ["Tháng", "Năm", "Ngày", "Tuần"],
    explanation: "月 (yuè) nghĩa là tháng trong năm."
  },
  {
    id: 65, hanzi: "星期", pinyin: "xīngqī", lesson: 7,
    correctAnswer: "Tuần",
    options: ["Tuần", "Tháng", "Năm", "Ngày"],
    explanation: "星期 (xīngqī) nghĩa là tuần lễ hoặc thứ trong tuần."
  },
  {
    id: 66, hanzi: "昨天", pinyin: "zuótiān", lesson: 7,
    correctAnswer: "Hôm qua",
    options: ["Hôm qua", "Hôm nay", "Ngày mai", "Năm ngoái"],
    explanation: "昨天 (zuótiān) là ngày hôm qua."
  },
  {
    id: 67, hanzi: "明天", pinyin: "míngtiān", lesson: 7,
    correctAnswer: "Ngày mai",
    options: ["Ngày mai", "Hôm nay", "Hôm qua", "Năm sau"],
    explanation: "明天 (míngtiān) là ngày mai."
  },
  {
    id: 68, hanzi: "去", pinyin: "qù", lesson: 7,
    correctAnswer: "Đi",
    options: ["Đi", "Đến", "Về", "Ở"],
    explanation: "去 (qù) là động từ rời khỏi vị trí hiện tại để đi đâu đó."
  },
  {
    id: 69, hanzi: "学校", pinyin: "xuéxiào", lesson: 7,
    correctAnswer: "Trường học",
    options: ["Trường học", "Bệnh viện", "Cửa hàng", "Công ty"],
    explanation: "学校 (xuéxiào) là trường học."
  },
  {
    id: 70, hanzi: "看", pinyin: "kàn", lesson: 7,
    correctAnswer: "Xem",
    options: ["Xem", "Nghe", "Nói", "Đọc"],
    explanation: "看 (kàn) là động từ nhìn, xem (Ví dụ: 看电影 - xem phim)."
  },

  // --- Bài 8: 我想喝茶 (Tôi muốn uống trà) ---
  {
    id: 71, hanzi: "想", pinyin: "xiǎng", lesson: 8,
    correctAnswer: "Muốn / Nhớ",
    options: ["Muốn / Nhớ", "Thích / Yêu", "Biết / Hiểu", "Nói / Nghe"],
    explanation: "想 (xiǎng) có 2 nghĩa: muốn làm việc gì hoặc nhớ nhung ai đó."
  },
  {
    id: 72, hanzi: "喝", pinyin: "hē", lesson: 8,
    correctAnswer: "Uống",
    options: ["Uống", "Ăn", "Nấu", "Mua"],
    explanation: "喝 (hē) là động từ uống chất lỏng (Ví dụ: 喝水 - uống nước)."
  },
  {
    id: 73, hanzi: "茶", pinyin: "chá", lesson: 8,
    correctAnswer: "Trà",
    options: ["Trà", "Cà phê", "Sữa", "Nước"],
    explanation: "茶 (chá) là thức uống trà."
  },
  {
    id: 74, hanzi: "吃", pinyin: "chī", lesson: 8,
    correctAnswer: "Ăn",
    options: ["Ăn", "Uống", "Nấu", "Mua"],
    explanation: "吃 (chī) là động từ ăn thức ăn (Ví dụ: 吃饭 - ăn cơm)."
  },
  {
    id: 75, hanzi: "米饭", pinyin: "mǐfàn", lesson: 8,
    correctAnswer: "Cơm",
    options: ["Cơm", "Mì", "Bánh bao", "Phở"],
    explanation: "米饭 (mǐfàn) là cơm nấu chín từ gạo."
  },
  {
    id: 76, hanzi: "下午", pinyin: "xiàwǔ", lesson: 8,
    correctAnswer: "Buổi chiều",
    options: ["Buổi chiều", "Buổi sáng", "Buổi trưa", "Buổi tối"],
    explanation: "下午 (xiàwǔ) là khoảng thời gian buổi chiều."
  },
  {
    id: 77, hanzi: "商店", pinyin: "shāngdiàn", lesson: 8,
    correctAnswer: "Cửa hàng",
    options: ["Cửa hàng", "Bệnh viện", "Trường học", "Công ty"],
    explanation: "商店 (shāngdiàn) là cửa hàng buôn bán hàng hóa."
  },
  {
    id: 78, hanzi: "买", pinyin: "mǎi", lesson: 8,
    correctAnswer: "Mua",
    options: ["Mua", "Bán", "Thuê", "Mượn"],
    explanation: "买 (mǎi) là động từ mua đồ."
  },
  {
    id: 79, hanzi: "杯子", pinyin: "bēizi", lesson: 8,
    correctAnswer: "Cái cốc",
    options: ["Cái cốc", "Cái bát", "Cái bàn", "Cái đĩa"],
    explanation: "杯子 (bēizi) là cái cốc, ly để đựng nước uống."
  },
  {
    id: 80, hanzi: "这", pinyin: "zhè", lesson: 8,
    correctAnswer: "Đây",
    options: ["Đây", "Kia", "Đâu", "Nào"],
    explanation: "这 (zhè) là đại từ chỉ định vị trí gần (này, đây)."
  },

  // --- Bài 9: 你儿子在哪儿工作 (Con trai bạn làm việc ở đâu) ---
  {
    id: 81, hanzi: "小", pinyin: "xiǎo", lesson: 9,
    correctAnswer: "Nhỏ",
    options: ["Nhỏ", "To", "Nhiều", "Ít"],
    explanation: "小 (xiǎo) chỉ kích thước nhỏ nhắn (đối lập với 大)."
  },
  {
    id: 82, hanzi: "猫", pinyin: "māo", lesson: 9,
    correctAnswer: "Con mèo",
    options: ["Con mèo", "Con chó", "Con chim", "Con cá"],
    explanation: "猫 (māo) là con mèo."
  },
  {
    id: 83, hanzi: "狗", pinyin: "gǒu", lesson: 9,
    correctAnswer: "Con chó",
    options: ["Con chó", "Con mèo", "Con gà", "Con lợn"],
    explanation: "狗 (gǒu) là loài chó."
  },
  {
    id: 84, hanzi: "椅子", pinyin: "yǐzi", lesson: 9,
    correctAnswer: "Cái ghế",
    options: ["Cái ghế", "Cái bàn", "Cái giường", "Cái tủ"],
    explanation: "椅子 (yǐzi) là đồ dùng nội thất để ngồi."
  },
  {
    id: 85, hanzi: "哪儿", pinyin: "nǎr", lesson: 9,
    correctAnswer: "Ở đâu",
    options: ["Ở đâu", "Ở đây", "Ở kia", "Khi nào"],
    explanation: "哪儿 (nǎr) là đại từ hỏi vị trí nơi chốn."
  },
  {
    id: 86, hanzi: "工作", pinyin: "gōngzuò", lesson: 9,
    correctAnswer: "Làm việc",
    options: ["Làm việc", "Học tập", "Nghỉ ngơi", "Vui chơi"],
    explanation: "工作 (gōngzuò) là công việc hoặc hành động làm việc."
  },
  {
    id: 87, hanzi: "医院", pinyin: "yīyuàn", lesson: 9,
    correctAnswer: "Bệnh viện",
    options: ["Bệnh viện", "Trường học", "Cửa hàng", "Khách sạn"],
    explanation: "医院 (yīyuàn) là cơ sở khám chữa bệnh."
  },
  {
    id: 88, hanzi: "医生", pinyin: "yīshēng", lesson: 9,
    correctAnswer: "Bác sĩ",
    options: ["Bác sĩ", "Giáo viên", "Học sinh", "Y tá"],
    explanation: "医生 (yīshēng) là người bác sĩ trị bệnh."
  },
  {
    id: 89, hanzi: "爸爸", pinyin: "bàba", lesson: 9,
    correctAnswer: "Bố",
    options: ["Bố", "Mẹ", "Anh trai", "Ông"],
    explanation: "爸爸 (bàba) là người bố trong gia đình."
  },
  {
    id: 90, hanzi: "多少", pinyin: "duōshao", lesson: 9,
    correctAnswer: "Bao nhiêu",
    options: ["Bao nhiêu", "Cái gì", "Ở đâu", "Thế nào"],
    explanation: "多少 (duōshao) là từ hỏi số lượng không giới hạn."
  },

  // --- Bài 10: 我能坐这儿吗 (Tôi có thể ngồi ở đây không) ---
  {
    id: 91, hanzi: "桌子", pinyin: "zhuōzi", lesson: 10,
    correctAnswer: "Cái bàn",
    options: ["Cái bàn", "Cái ghế", "Cái giường", "Cái tủ"],
    explanation: "桌子 (zhuōzi) là cái bàn để đồ hoặc làm việc."
  },
  {
    id: 92, hanzi: "电脑", pinyin: "diànnǎo", lesson: 10,
    correctAnswer: "Máy tính",
    options: ["Máy tính", "Điện thoại", "Đồng hồ", "Tivi"],
    explanation: "电脑 (diànnǎo) là máy vi tính."
  },
  {
    id: 93, hanzi: "和", pinyin: "hé", lesson: 10,
    correctAnswer: "Và",
    options: ["Và", "Nhưng", "Hoặc", "Bởi vì"],
    explanation: "和 (hé) là liên từ nối danh từ mang nghĩa và, cùng."
  },
  {
    id: 94, hanzi: "本", pinyin: "běn", lesson: 10,
    correctAnswer: "Quyển",
    options: ["Quyển", "Cái", "Chiếc", "Con"],
    explanation: "本 (běn) là lượng từ chỉ sách vở (Ví dụ: 一本书 - một quyển sách)."
  },
  {
    id: 95, hanzi: "里", pinyin: "lǐ", lesson: 10,
    correctAnswer: "Bên trong",
    options: ["Bên trong", "Bên ngoài", "Phía trên", "Phía dưới"],
    explanation: "里 (lǐ) là từ chỉ vị trí bên trong."
  },
  {
    id: 96, hanzi: "前面", pinyin: "qiánmiàn", lesson: 10,
    correctAnswer: "Phía trước",
    options: ["Phía trước", "Phía sau", "Bên trái", "Bên phải"],
    explanation: "前面 (qiánmiàn) là phương vị từ chỉ đằng trước."
  },
  {
    id: 97, hanzi: "后面", pinyin: "hòumiàn", lesson: 10,
    correctAnswer: "Phía sau",
    options: ["Phía sau", "Phía trước", "Bên trái", "Bên phải"],
    explanation: "后面 (hòumiàn) là phương vị từ chỉ đằng sau."
  },
  {
    id: 98, hanzi: "没有", pinyin: "méiyǒu", lesson: 10,
    correctAnswer: "Không có",
    options: ["Không có", "Có", "Là", "Ở"],
    explanation: "没有 (méiyǒu) phủ định của 有 (không có, chưa có)."
  },
  {
    id: 99, hanzi: "能", pinyin: "néng", lesson: 10,
    correctAnswer: "Có thể",
    options: ["Có thể", "Phải", "Muốn", "Dám"],
    explanation: "能 (néng) biểu thị khả năng hoặc điều kiện cho phép làm gì."
  },
  {
    id: 100, hanzi: "坐", pinyin: "zuò", lesson: 10,
    correctAnswer: "Ngồi",
    options: ["Ngồi", "Đứng", "Nằm", "Đi"],
    explanation: "坐 (zuò) là hành động ngồi hoặc đi xe (坐车)."
  },

  // --- Bài 11: 现在几点 (Bây giờ mấy giờ) ---
  {
    id: 101, hanzi: "现在", pinyin: "xiànzài", lesson: 11,
    correctAnswer: "Bây giờ",
    options: ["Bây giờ", "Hôm qua", "Ngày mai", "Lúc trước"],
    explanation: "现在 (xiànzài) chỉ thời điểm hiện tại."
  },
  {
    id: 102, hanzi: "点", pinyin: "diǎn", lesson: 11,
    correctAnswer: "Giờ / Một chút",
    options: ["Giờ / Một chút", "Phút / Một lát", "Ngày / Một buổi", "Năm / Một lúc"],
    explanation: "点 (diǎn) có 2 nghĩa: chỉ giờ đồng hồ hoặc một chút ít (一点儿)."
  },
  {
    id: 103, hanzi: "分钟", pinyin: "fēnzhōng", lesson: 11,
    correctAnswer: "Phút",
    options: ["Phút", "Giờ", "Giây", "Ngày"],
    explanation: "分钟 (fēnzhōng) là đơn vị phút chỉ thời gian."
  },
  {
    id: 104, hanzi: "中午", pinyin: "zhōngwǔ", lesson: 11,
    correctAnswer: "Buổi trưa",
    options: ["Buổi trưa", "Buổi sáng", "Buổi chiều", "Buổi tối"],
    explanation: "中午 (zhōngwǔ) là khoảng thời gian buổi trưa."
  },
  {
    id: 105, hanzi: "时候", pinyin: "shíhou", lesson: 11,
    correctAnswer: "Lúc / Khi",
    options: ["Lúc / Khi", "Nơi / Chốn", "Người / Ai", "Cách / Kiểu"],
    explanation: "时候 (shíhou) chỉ khoảng thời gian (Ví dụ: 什么时候 - khi nào)."
  },
  {
    id: 106, hanzi: "回", pinyin: "huí", lesson: 11,
    correctAnswer: "Về",
    options: ["Về", "Đi", "Đến", "Ở"],
    explanation: "回 (huí) là quay trở về (Ví dụ: 回家 - về nhà)."
  },
  {
    id: 107, hanzi: "我们", pinyin: "wǒmen", lesson: 11,
    correctAnswer: "Chúng tôi",
    options: ["Chúng tôi", "Các bạn", "Họ", "Tôi"],
    explanation: "我们 (wǒmen) là đại từ nhân xưng số nhiều (chúng tôi, chúng ta)."
  },
  {
    id: 108, hanzi: "电影", pinyin: "diànyǐng", lesson: 11,
    correctAnswer: "Phim",
    options: ["Phim", "Nhạc", "Sách", "Báo"],
    explanation: "电影 (diànyǐng) là phim ảnh, phim điện ảnh."
  },
  {
    id: 109, hanzi: "住", pinyin: "zhù", lesson: 11,
    correctAnswer: "Ở",
    options: ["Ở", "Đi", "Đến", "Rời"],
    explanation: "住 (zhù) chỉ sự cư trú, sinh sống (Ví dụ: 住在北京 - sống ở Bắc Kinh)."
  },
  {
    id: 110, hanzi: "上", pinyin: "shàng", lesson: 11,
    correctAnswer: "Phía trên",
    options: ["Phía trên", "Phía dưới", "Bên trong", "Bên ngoài"],
    explanation: "上 (shàng) chỉ vị trí bên trên."
  },

  // --- Bài 12: 明天天气怎么样 (Thời tiết ngày mai thế nào) ---
  {
    id: 111, hanzi: "天气", pinyin: "tiānqì", lesson: 12,
    correctAnswer: "Thời tiết",
    options: ["Thời tiết", "Thời gian", "Sức khỏe", "Môi trường"],
    explanation: "天气 (tiānqì) là tình trạng thời tiết khí hậu."
  },
  {
    id: 112, hanzi: "怎么样", pinyin: "zěnmeyàng", lesson: 12,
    correctAnswer: "Thế nào",
    options: ["Thế nào", "Ở đâu", "Bao nhiêu", "Tại sao"],
    explanation: "怎么样 (zěnmeyàng) dùng hỏi về tính chất, tình hình."
  },
  {
    id: 113, hanzi: "太", pinyin: "tài", lesson: 12,
    correctAnswer: "Quá",
    options: ["Quá", "Hơi", "Rất", "Không"],
    explanation: "太 (tài) biểu thị mức độ cực kỳ, quá mức (太好了 - tốt quá rồi)."
  },
  {
    id: 114, hanzi: "热", pinyin: "rè", lesson: 12,
    correctAnswer: "Nóng",
    options: ["Nóng", "Lạnh", "Ấm", "Mát"],
    explanation: "热 (rè) chỉ nhiệt độ nóng bức."
  },
  {
    id: 115, hanzi: "冷", pinyin: "lěng", lesson: 12,
    correctAnswer: "Lạnh",
    options: ["Lạnh", "Nóng", "Ấm", "Mát"],
    explanation: "冷 (lěng) chỉ nhiệt độ lạnh giá."
  },
  {
    id: 116, hanzi: "下雨", pinyin: "xià yǔ", lesson: 12,
    correctAnswer: "Trời mưa",
    options: ["Trời mưa", "Trời nắng", "Trời râm", "Có tuyết"],
    explanation: "下雨 (xià yǔ) nghĩa là trời đổ mưa."
  },
  {
    id: 117, hanzi: "小姐", pinyin: "xiǎojiě", lesson: 12,
    correctAnswer: "Cô gái",
    options: ["Cô gái", "Quý ông", "Bác sĩ", "Học sinh"],
    explanation: "小姐 (xiǎojiě) là cách gọi lịch sự đối với phụ nữ trẻ."
  },
  {
    id: 118, hanzi: "来", pinyin: "lái", lesson: 12,
    correctAnswer: "Đến",
    options: ["Đến", "Đi", "Về", "Ở"],
    explanation: "来 (lái) là động từ di chuyển lại gần người nói."
  },
  {
    id: 119, hanzi: "些", pinyin: "xiē", lesson: 12,
    correctAnswer: "Một vài",
    options: ["Một vài", "Tất cả", "Một cái", "Toàn bộ"],
    explanation: "些 (xiē) chỉ số lượng ít (Ví dụ: 这些 - những cái này)."
  },
  {
    id: 120, hanzi: "水", pinyin: "shuǐ", lesson: 12,
    correctAnswer: "Nước",
    options: ["Nước", "Trà", "Cà phê", "Sữa"],
    explanation: "水 (shuǐ) là nước uống."
  },

  // --- Bài 13: 他在学做中国菜呢 (Anh ấy đang học nấu món ăn Trung Quốc) ---
  {
    id: 121, hanzi: "喂", pinyin: "wèi", lesson: 13,
    correctAnswer: "A-lô",
    options: ["A-lô", "Tạm biệt", "Xin chào", "Cảm ơn"],
    explanation: "喂 (wèi) là từ dùng để chào khi nghe điện thoại."
  },
  {
    id: 122, hanzi: "上午", pinyin: "shàngwǔ", lesson: 13,
    correctAnswer: "Buổi sáng",
    options: ["Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"],
    explanation: "上午 (shàngwǔ) là buổi sáng trước 12 giờ trưa."
  },
  {
    id: 123, hanzi: "睡觉", pinyin: "shuìjiào", lesson: 13,
    correctAnswer: "Đi ngủ",
    options: ["Đi ngủ", "Thức dậy", "Nghỉ ngơi", "Làm việc"],
    explanation: "睡觉 (shuìjiào) là động từ đi ngủ."
  },
  {
    id: 124, hanzi: "电视", pinyin: "diànshì", lesson: 13,
    correctAnswer: "Tivi",
    options: ["Tivi", "Máy tính", "Điện thoại", "Đài radio"],
    explanation: "电视 (diànshì) là vô tuyến truyền hình."
  },
  {
    id: 125, hanzi: "喜欢", pinyin: "xǐhuan", lesson: 13,
    correctAnswer: "Thích",
    options: ["Thích", "Ghét", "Sợ", "Muốn"],
    explanation: "喜欢 (xǐhuan) là động từ yêu thích điều gì."
  },
  {
    id: 126, hanzi: "打电话", pinyin: "dǎ diànhuà", lesson: 13,
    correctAnswer: "Gọi điện thoại",
    options: ["Gọi điện thoại", "Gửi thư từ", "Xem ti vi", "Nghe nhạc"],
    explanation: "打电话 (dǎ diànhuà) là hành động gọi điện thoại."
  },
  {
    id: 127, hanzi: "下", pinyin: "xià", lesson: 13,
    correctAnswer: "Phía dưới",
    options: ["Phía dưới", "Phía trên", "Bên trong", "Bên ngoài"],
    explanation: "下 (xià) là phương vị từ chỉ bên dưới."
  },
  {
    id: 128, hanzi: "钱", pinyin: "qián", lesson: 13,
    correctAnswer: "Tiền",
    options: ["Tiền", "Thẻ", "Vé", "Sách"],
    explanation: "钱 (qián) nghĩa là tiền bạc."
  },
  {
    id: 129, hanzi: "块", pinyin: "kuài", lesson: 13,
    correctAnswer: "Đồng",
    options: ["Đồng", "Quyển", "Cái", "Chiếc"],
    explanation: "块 (kuài) là đơn vị đồng tiền theo văn nói Trung Quốc."
  },
  {
    id: 130, hanzi: "那", pinyin: "nà", lesson: 13,
    correctAnswer: "Kia",
    options: ["Kia", "Đây", "Đâu", "Nào"],
    explanation: "那 (nà) là đại từ chỉ định ở vị trí xa (kia, đó)."
  },

  // --- Bài 14: 她买了不少衣服 (Cô ấy mua không ít quần áo) ---
  {
    id: 131, hanzi: "东西", pinyin: "dōngxi", lesson: 14,
    correctAnswer: "Đồ đạc",
    options: ["Đồ đạc", "Con người", "Thời gian", "Địa điểm"],
    explanation: "东西 (dōngxi) chỉ đồ vật, hàng hóa."
  },
  {
    id: 132, hanzi: "一点儿", pinyin: "yìdiǎnr", lesson: 14,
    correctAnswer: "Một chút",
    options: ["Một chút", "Rất nhiều", "Tất cả", "Toàn bộ"],
    explanation: "一点儿 (yìdiǎnr) chỉ một lượng nhỏ, một ít."
  },
  {
    id: 133, hanzi: "苹果", pinyin: "píngguǒ", lesson: 14,
    correctAnswer: "Quả táo",
    options: ["Quả táo", "Quả dưa hấu", "Quả chuối", "Quả cam"],
    explanation: "苹果 (píngguǒ) là quả táo."
  },
  {
    id: 134, hanzi: "看见", pinyin: "kànjiàn", lesson: 14,
    correctAnswer: "Nhìn thấy",
    options: ["Nhìn thấy", "Nghe thấy", "Nói ra", "Tìm thấy"],
    explanation: "看见 (kànjiàn) là trông thấy, nhìn thấy."
  },
  {
    id: 135, hanzi: "先生", pinyin: "xiānsheng", lesson: 14,
    correctAnswer: "Quý ông",
    options: ["Quý ông", "Cô gái", "Bác sĩ", "Học sinh"],
    explanation: "先生 (xiānsheng) là cách xưng hô lịch sự đối với nam giới."
  },
  {
    id: 136, hanzi: "开", pinyin: "kāi", lesson: 14,
    correctAnswer: "Mở ra / Lái xe",
    options: ["Mở ra / Lái xe", "Đóng vào / Đi bộ", "Bắt đầu / Dừng lại", "Mua về / Bán đi"],
    explanation: "开 (kāi) có 2 nghĩa: mở cửa/mở hộp hoặc lái xe (开车)."
  },
  {
    id: 137, hanzi: "漂亮", pinyin: "piàoliang", lesson: 14,
    correctAnswer: "Xinh đẹp",
    options: ["Xinh đẹp", "Xấu xí", "Đắt đỏ", "Rẻ tiền"],
    explanation: "漂亮 (piàoliang) khen ngợi vẻ đẹp ngoại hình hoặc sự việc."
  },
  {
    id: 138, hanzi: "少", pinyin: "shǎo", lesson: 14,
    correctAnswer: "Ít",
    options: ["Ít", "Nhiều", "To", "Bé"],
    explanation: "少 (shǎo) là ít ỏi về số lượng."
  },
  {
    id: 139, hanzi: "都", pinyin: "dōu", lesson: 14,
    correctAnswer: "Đều",
    options: ["Đều", "Cũng", "Rất", "Chỉ"],
    explanation: "都 (dōu) là phó từ mang nghĩa tất cả, đều."
  },
  {
    id: 140, hanzi: "衣服", pinyin: "yīfu", lesson: 14,
    correctAnswer: "Quần áo",
    options: ["Quần áo", "Giày dép", "Mũ nón", "Đồng hồ"],
    explanation: "衣服 (yīfu) nghĩa là trang phục quần áo."
  },

  // --- Bài 15: 我是坐飞机来的 (Tôi đi máy bay đến) ---
  {
    id: 141, hanzi: "年", pinyin: "nián", lesson: 15,
    correctAnswer: "Năm",
    options: ["Năm", "Tháng", "Ngày", "Tuần"],
    explanation: "年 (nián) là đơn vị năm thời gian."
  },
  {
    id: 142, hanzi: "饭店", pinyin: "fàndiàn", lesson: 15,
    correctAnswer: "Nhà hàng",
    options: ["Nhà hàng", "Trường học", "Bệnh viện", "Cửa hàng"],
    explanation: "饭店 (fàndiàn) là quán ăn hoặc nhà hàng, khách sạn."
  },
  {
    id: 143, hanzi: "出租车", pinyin: "chūzūchē", lesson: 15,
    correctAnswer: "Xe taxi",
    options: ["Xe taxi", "Xe buýt", "Xe đạp", "Máy bay"],
    explanation: "出租车 (chūzūchē) là xe taxi."
  },
  {
    id: 144, hanzi: "一起", pinyin: "yìqǐ", lesson: 15,
    correctAnswer: "Cùng nhau",
    options: ["Cùng nhau", "Một mình", "Rời xa", "Khác nhau"],
    explanation: "一起 (yìqǐ) là phó từ chỉ sự cùng làm chung."
  },
  {
    id: 145, hanzi: "高兴", pinyin: "gāoxìng", lesson: 15,
    correctAnswer: "Vui vẻ",
    options: ["Vui vẻ", "Buồn bã", "Mệt mỏi", "Tức giận"],
    explanation: "高兴 (gāoxìng) mang nghĩa vui mừng, phấn khởi."
  },
  {
    id: 146, hanzi: "听", pinyin: "tīng", lesson: 15,
    correctAnswer: "Nghe",
    options: ["Nghe", "Xem", "Nói", "Đọc"],
    explanation: "听 (tīng) là động từ nghe (Ví dụ: 听音乐 - nghe nhạc)."
  },
  {
    id: 147, hanzi: "飞机", pinyin: "fēijī", lesson: 15,
    correctAnswer: "Máy bay",
    options: ["Máy bay", "Xe lửa", "Xe buýt", "Xe taxi"],
    explanation: "飞机 (fēijī) là máy bay."
  },
  {
    id: 148, hanzi: "爱", pinyin: "ài", lesson: 15,
    correctAnswer: "Yêu",
    options: ["Yêu", "Ghét", "Thích", "Giận"],
    explanation: "爱 (ài) là tình yêu thương sâu sắc."
  },
  {
    id: 149, hanzi: "水果", pinyin: "shuǐguǒ", lesson: 15,
    correctAnswer: "Hoa quả",
    options: ["Hoa quả", "Rau củ", "Thịt cá", "Cơm canh"],
    explanation: "水果 (shuǐguǒ) là các loại trái cây."
  },
  {
    id: 150, hanzi: "怎么", pinyin: "zěnme", lesson: 15,
    correctAnswer: "Làm sao",
    options: ["Làm sao", "Ở đâu", "Bao nhiêu", "Cái gì"],
    explanation: "怎么 (zěnme) dùng để hỏi phương thức hành động hoặc nguyên nhân."
  },
];

// =========================================================================
// HSK 2 DATASET (150 WORDS across 15 standard lessons)
// All options are concise, natural, and symmetrically balanced:
// - 1-meaning words have four 1-meaning concise options.
// - 2-meaning words have four 2-meaning concise options with '/'.
// =========================================================================
export const HSK2_CLEAN: CleanVocabItem[] = [
  // --- Bài 1: 九月去北京旅游最好 (Tháng 9 đi Bắc Kinh du lịch tốt nhất) ---
  {
    id: 1, hanzi: "旅游", pinyin: "lǚyóu", lesson: 1,
    correctAnswer: "Du lịch",
    options: ["Du lịch", "Làm việc", "Học tập", "Nghỉ ngơi"],
    explanation: "旅游 (lǚyóu) là hoạt động đi tham quan nghỉ dưỡng."
  },
  {
    id: 2, hanzi: "觉得", pinyin: "juéde", lesson: 1,
    correctAnswer: "Cảm thấy",
    options: ["Cảm thấy", "Nhìn thấy", "Nghe thấy", "Tìm thấy"],
    explanation: "觉得 (juéde) dùng để bày tỏ cảm nhận, ý kiến cá nhân."
  },
  {
    id: 3, hanzi: "最", pinyin: "zuì", lesson: 1,
    correctAnswer: "Nhất",
    options: ["Nhất", "Hơn", "Rất", "Quá"],
    explanation: "最 (zuì) biểu thị mức độ cao nhất (Ví dụ: 最好 - tốt nhất)."
  },
  {
    id: 4, hanzi: "为什么", pinyin: "wèishénme", lesson: 1,
    correctAnswer: "Tại sao",
    options: ["Tại sao", "Cái gì", "Ở đâu", "Khi nào"],
    explanation: "为什么 (wèishénme) là đại từ hỏi nguyên nhân, lý do."
  },
  {
    id: 5, hanzi: "也", pinyin: "yě", lesson: 1,
    correctAnswer: "Cũng",
    options: ["Cũng", "Đều", "Rất", "Chỉ"],
    explanation: "也 (yě) là phó từ chỉ sự đồng nhất (Ví dụ: 我也是 - Tôi cũng vậy)."
  },
  {
    id: 6, hanzi: "运动", pinyin: "yùndòng", lesson: 1,
    correctAnswer: "Vận động",
    options: ["Vận động", "Nghỉ ngơi", "Học tập", "Làm việc"],
    explanation: "运动 (yùndòng) là thể dục thể thao rèn luyện sức khỏe."
  },
  {
    id: 7, hanzi: "踢足球", pinyin: "tī zúqiú", lesson: 1,
    correctAnswer: "Đá bóng",
    options: ["Đá bóng", "Bóng rổ", "Bơi lội", "Chạy bộ"],
    explanation: "踢足球 (tī zúqiú) là môn thể thao bóng đá."
  },
  {
    id: 8, hanzi: "一起", pinyin: "yìqǐ", lesson: 1,
    correctAnswer: "Cùng nhau",
    options: ["Cùng nhau", "Một mình", "Rời xa", "Khác nhau"],
    explanation: "一起 (yìqǐ) là làm việc cùng nhau."
  },
  {
    id: 9, hanzi: "新", pinyin: "xīn", lesson: 1,
    correctAnswer: "Mới",
    options: ["Mới", "Cũ", "Đẹp", "Tốt"],
    explanation: "新 (xīn) chỉ cái mới, đối lập với 旧 (cũ)."
  },
  {
    id: 10, hanzi: "要", pinyin: "yào", lesson: 1,
    correctAnswer: "Muốn / Cần",
    options: ["Muốn / Cần", "Thích / Yêu", "Biết / Hiểu", "Đi / Đến"],
    explanation: "要 (yào) có 2 nghĩa: muốn làm gì hoặc cần thiết phải làm gì."
  },

  // --- Bài 2: 我每天六点起床 (Hàng ngày tôi thức dậy lúc sáu giờ) ---
  {
    id: 11, hanzi: "生病", pinyin: "shēngbìng", lesson: 2,
    correctAnswer: "Bị ốm",
    options: ["Bị ốm", "Khỏe mạnh", "Mệt mỏi", "Nghỉ ngơi"],
    explanation: "生病 (shēngbìng) nghĩa là mắc bệnh, bị ốm."
  },
  {
    id: 12, hanzi: "每", pinyin: "měi", lesson: 2,
    correctAnswer: "Mỗi",
    options: ["Mỗi", "Tất cả", "Một vài", "Nhiều"],
    explanation: "每 (měi) là đại từ chỉ từng cá thể (Ví dụ: 每天 - mỗi ngày)."
  },
  {
    id: 13, hanzi: "早上", pinyin: "zǎoshang", lesson: 2,
    correctAnswer: "Buổi sáng",
    options: ["Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"],
    explanation: "早上 (zǎoshang) là sáng sớm tinh mơ."
  },
  {
    id: 14, hanzi: "跑步", pinyin: "pǎobù", lesson: 2,
    correctAnswer: "Chạy bộ",
    options: ["Chạy bộ", "Bơi lội", "Đá bóng", "Đi bộ"],
    explanation: "跑步 (pǎobù) là môn thể thao chạy bộ."
  },
  {
    id: 15, hanzi: "起床", pinyin: "qǐchuáng", lesson: 2,
    correctAnswer: "Thức dậy",
    options: ["Thức dậy", "Đi ngủ", "Ăn cơm", "Rửa mặt"],
    explanation: "起床 (qǐchuáng) là rời giường khi thức giấc."
  },
  {
    id: 16, hanzi: "药", pinyin: "yào", lesson: 2,
    correctAnswer: "Thuốc",
    options: ["Thuốc", "Trà", "Cơm", "Nước"],
    explanation: "药 (yào) là dược phẩm chữa bệnh (吃药 - uống thuốc)."
  },
  {
    id: 17, hanzi: "身体", pinyin: "shēntǐ", lesson: 2,
    correctAnswer: "Sức khỏe",
    options: ["Sức khỏe", "Thời tiết", "Công việc", "Thời gian"],
    explanation: "身体 (shēntǐ) chỉ cơ thể hoặc sức khỏe con người."
  },
  {
    id: 18, hanzi: "休息", pinyin: "xiūxi", lesson: 2,
    correctAnswer: "Nghỉ ngơi",
    options: ["Nghỉ ngơi", "Làm việc", "Học tập", "Vận động"],
    explanation: "休息 (xiūxi) là tạm dừng làm việc để thư giãn lấy lại sức."
  },
  {
    id: 19, hanzi: "出", pinyin: "chū", lesson: 2,
    correctAnswer: "Đi ra / Xuất hiện",
    options: ["Đi ra / Xuất hiện", "Đi vào / Biến mất", "Đi lên / Bắt đầu", "Đi xuống / Kết thúc"],
    explanation: "出 (chū) có 2 nghĩa: bước ra ngoài hoặc xuất hiện."
  },
  {
    id: 20, hanzi: "忙", pinyin: "máng", lesson: 2,
    correctAnswer: "Bận rộn",
    options: ["Bận rộn", "Rảnh rỗi", "Mệt mỏi", "Vui vẻ"],
    explanation: "忙 (máng) chỉ trạng thái có nhiều việc phải làm."
  },

  // --- Bài 3: 左边那个红色的是我的 (Cái màu đỏ bên trái là của tôi) ---
  {
    id: 21, hanzi: "手表", pinyin: "shǒubiǎo", lesson: 3,
    correctAnswer: "Đồng hồ",
    options: ["Đồng hồ", "Điện thoại", "Máy tính", "Túi xách"],
    explanation: "手表 (shǒubiǎo) là đồng hồ đeo tay."
  },
  {
    id: 22, hanzi: "千", pinyin: "qiān", lesson: 3,
    correctAnswer: "Một nghìn",
    options: ["Một nghìn", "Một trăm", "Một vạn", "Mười"],
    explanation: "千 (qiān) là số đếm hàng nghìn."
  },
  {
    id: 23, hanzi: "报纸", pinyin: "bàozhǐ", lesson: 3,
    correctAnswer: "Tờ báo",
    options: ["Tờ báo", "Quyển sách", "Cây bút", "Tờ giấy"],
    explanation: "报纸 (bàozhǐ) là ấn phẩm báo in tức."
  },
  {
    id: 24, hanzi: "送", pinyin: "sòng", lesson: 3,
    correctAnswer: "Tặng quà / Tiễn đưa",
    options: ["Tặng quà / Tiễn đưa", "Nhận đồ / Đón về", "Mua vào / Bán ra", "Vay mượn / Trả lại"],
    explanation: "送 (sòng) có 2 nghĩa: tặng quà cho ai hoặc tiễn ai lên đường."
  },
  {
    id: 25, hanzi: "一下", pinyin: "yíxià", lesson: 3,
    correctAnswer: "Một lát",
    options: ["Một lát", "Một lần", "Cả ngày", "Mãi mãi"],
    explanation: "一下 (yíxià) làm giảm nhẹ sắc thái động từ (làm thử một chút)."
  },
  {
    id: 26, hanzi: "牛奶", pinyin: "niúnǎi", lesson: 3,
    correctAnswer: "Sữa bò",
    options: ["Sữa bò", "Trà", "Cà phê", "Nước"],
    explanation: "牛奶 (niúnǎi) là thức uống sữa bò."
  },
  {
    id: 27, hanzi: "房间", pinyin: "fángjiān", lesson: 3,
    correctAnswer: "Căn phòng",
    options: ["Căn phòng", "Ngôi nhà", "Lớp học", "Cửa hàng"],
    explanation: "房间 (fángjiān) là phòng ở trong nhà."
  },
  {
    id: 28, hanzi: "丈夫", pinyin: "zhàngfu", lesson: 3,
    correctAnswer: "Người chồng",
    options: ["Người chồng", "Người vợ", "Anh trai", "Bố"],
    explanation: "丈夫 (zhàngfu) nghĩa là người chồng trong hôn nhân."
  },
  {
    id: 29, hanzi: "红", pinyin: "hóng", lesson: 3,
    correctAnswer: "Màu đỏ",
    options: ["Màu đỏ", "Màu trắng", "Màu đen", "Màu vàng"],
    explanation: "红 (hóng) là sắc đỏ."
  },
  {
    id: 30, hanzi: "颜色", pinyin: "yánsè", lesson: 3,
    correctAnswer: "Màu sắc",
    options: ["Màu sắc", "Hình dáng", "Kích thước", "Số lượng"],
    explanation: "颜色 (yánsè) nghĩa là màu sắc."
  },

  // --- Bài 4: 这个工作是他帮我介绍的 (Công việc này do anh ấy giới thiệu) ---
  {
    id: 31, hanzi: "生日", pinyin: "shēngrì", lesson: 4,
    correctAnswer: "Sinh nhật",
    options: ["Sinh nhật", "Năm mới", "Ngày nghỉ", "Lễ hội"],
    explanation: "生日 (shēngrì) là ngày sinh của một người."
  },
  {
    id: 32, hanzi: "快乐", pinyin: "kuàilè", lesson: 4,
    correctAnswer: "Hạnh phúc",
    options: ["Hạnh phúc", "Buồn bã", "Mệt mỏi", "Lo lắng"],
    explanation: "快乐 (kuàilè) là niềm vui tươi, hạnh phúc (生日快乐 - sinh nhật vui vẻ)."
  },
  {
    id: 33, hanzi: "给", pinyin: "gěi", lesson: 4,
    correctAnswer: "Cho / Đưa cho",
    options: ["Cho / Đưa cho", "Lấy / Nhận về", "Mua / Bán đi", "Mượn / Vay về"],
    explanation: "给 (gěi) có 2 nghĩa: đưa cho ai vật gì hoặc làm gì cho ai."
  },
  {
    id: 34, hanzi: "晚上", pinyin: "wǎnshang", lesson: 4,
    correctAnswer: "Buổi tối",
    options: ["Buổi tối", "Buổi sáng", "Buổi trưa", "Buổi chiều"],
    explanation: "晚上 (wǎnshang) là khoảng thời gian ban đêm."
  },
  {
    id: 35, hanzi: "问", pinyin: "wèn", lesson: 4,
    correctAnswer: "Hỏi",
    options: ["Hỏi", "Trả lời", "Nói", "Nghe"],
    explanation: "问 (wèn) là động từ thắc mắc, hỏi han."
  },
  {
    id: 36, hanzi: "非常", pinyin: "fēicháng", lesson: 4,
    correctAnswer: "Vô cùng",
    options: ["Vô cùng", "Hơi hơi", "Không hề", "Một chút"],
    explanation: "非常 (fēicháng) là phó từ chỉ mức độ rất cao (vô cùng, đặc biệt)."
  },
  {
    id: 37, hanzi: "开始", pinyin: "kāishǐ", lesson: 4,
    correctAnswer: "Bắt đầu",
    options: ["Bắt đầu", "Kết thúc", "Tiếp tục", "Tạm dừng"],
    explanation: "开始 (kāishǐ) là khởi đầu một việc."
  },
  {
    id: 38, hanzi: "介绍", pinyin: "jièshào", lesson: 4,
    correctAnswer: "Giới thiệu",
    options: ["Giới thiệu", "Chào hỏi", "Tạm biệt", "Cảm ơn"],
    explanation: "介绍 (jièshào) là hành động giới thiệu người hoặc vật."
  },
  {
    id: 39, hanzi: "去年", pinyin: "qùnián", lesson: 4,
    correctAnswer: "Năm ngoái",
    options: ["Năm ngoái", "Năm nay", "Năm sau", "Hôm qua"],
    explanation: "去年 (qùnián) là năm trước năm hiện tại."
  },
  {
    id: 40, hanzi: "累", pinyin: "lèi", lesson: 4,
    correctAnswer: "Mệt mỏi",
    options: ["Mệt mỏi", "Khỏe mạnh", "Bận rộn", "Vui vẻ"],
    explanation: "累 (lèi) miêu tả trạng thái mệt nhọc."
  },

  // --- Bài 5: 就买这件吧 (Cứ mua chiếc này đi) ---
  {
    id: 41, hanzi: "外", pinyin: "wài", lesson: 5,
    correctAnswer: "Bên ngoài",
    options: ["Bên ngoài", "Bên trong", "Phía trên", "Phía dưới"],
    explanation: "外 (wài) là phương vị từ chỉ bên ngoài."
  },
  {
    id: 42, hanzi: "自行车", pinyin: "zìxíngchē", lesson: 5,
    correctAnswer: "Xe đạp",
    options: ["Xe đạp", "Xe máy", "Xe buýt", "Xe taxi"],
    explanation: "自行车 (zìxíngchē) là xe đạp hai bánh."
  },
  {
    id: 43, hanzi: "羊肉", pinyin: "yángròu", lesson: 5,
    correctAnswer: "Thịt cừu",
    options: ["Thịt cừu", "Thịt bò", "Thịt gà", "Thịt lợn"],
    explanation: "羊肉 (yángròu) là thịt của con cừu/dê."
  },
  {
    id: 44, hanzi: "好吃", pinyin: "hǎochī", lesson: 5,
    correctAnswer: "Ngon miệng",
    options: ["Ngon miệng", "Khó nuốt", "Cay nồng", "Chua chát"],
    explanation: "好吃 (hǎochī) nghĩa là thức ăn có vị thơm ngon."
  },
  {
    id: 45, hanzi: "吧", pinyin: "ba", lesson: 5,
    correctAnswer: "Nhé",
    options: ["Nhé", "Không", "Gì", "Ai"],
    explanation: "吧 (ba) là trợ từ ngữ khí đặt cuối câu dùng để rủ rê, khuyên bảo (Ví dụ: 走吧 - đi nhé)."
  },
  {
    id: 46, hanzi: "件", pinyin: "jiàn", lesson: 5,
    correctAnswer: "Chiếc",
    options: ["Chiếc", "Quyển", "Bát", "Cốc"],
    explanation: "件 (jiàn) là lượng từ dùng cho quần áo hoặc sự việc (一件衣服)."
  },
  {
    id: 47, hanzi: "还", pinyin: "hái", lesson: 5,
    correctAnswer: "Vẫn còn",
    options: ["Vẫn còn", "Đã hết", "Không hề", "Vừa mới"],
    explanation: "还 (hái) biểu thị hành động hoặc trạng thái vẫn đang tiếp diễn."
  },
  {
    id: 48, hanzi: "可以", pinyin: "kěyǐ", lesson: 5,
    correctAnswer: "Có thể / Được phép",
    options: ["Có thể / Được phép", "Cần phải / Bắt buộc", "Muốn làm / Thích thú", "Dám làm / Sẵn sàng"],
    explanation: "可以 (kěyǐ) có 2 nghĩa: biểu thị khả năng có thể làm hoặc được cho phép làm gì."
  },
  {
    id: 49, hanzi: "咖啡", pinyin: "kāfēi", lesson: 5,
    correctAnswer: "Cà phê",
    options: ["Cà phê", "Trà", "Sữa", "Nước"],
    explanation: "咖啡 (kāfēi) là đồ uống cà phê."
  },
  {
    id: 50, hanzi: "鱼", pinyin: "yú", lesson: 5,
    correctAnswer: "Con cá",
    options: ["Con cá", "Con gà", "Con cừu", "Con bò"],
    explanation: "鱼 (yú) là loài cá bơi dưới nước."
  },

  // --- Bài 6: 你怎么不吃了 (Sao bạn không ăn nữa) ---
  {
    id: 51, hanzi: "门", pinyin: "mén", lesson: 6,
    correctAnswer: "Cửa",
    options: ["Cửa", "Tường", "Cửa sổ", "Bàn"],
    explanation: "门 (mén) là cửa ra vào hoặc cổng nhà."
  },
  {
    id: 52, hanzi: "考试", pinyin: "kǎoshì", lesson: 6,
    correctAnswer: "Thi cử",
    options: ["Thi cử", "Học tập", "Nghỉ ngơi", "Vui chơi"],
    explanation: "考试 (kǎoshì) là bài kiểm tra, kỳ thi."
  },
  {
    id: 53, hanzi: "意思", pinyin: "yìsi", lesson: 6,
    correctAnswer: "Ý nghĩa",
    options: ["Ý nghĩa", "Âm thanh", "Hình ảnh", "Màu sắc"],
    explanation: "意思 (yìsi) là ý nghĩa hoặc sự thú vị (很有意思)."
  },
  {
    id: 54, hanzi: "准备", pinyin: "zhǔnbèi", lesson: 6,
    correctAnswer: "Chuẩn bị",
    options: ["Chuẩn bị", "Bắt đầu", "Kết thúc", "Từ bỏ"],
    explanation: "准备 (zhǔnbèi) là việc sắp xếp, chuẩn bị trước."
  },
  {
    id: 55, hanzi: "阴", pinyin: "yīn", lesson: 6,
    correctAnswer: "Trời râm",
    options: ["Trời râm", "Trời nắng", "Trời mưa", "Có tuyết"],
    explanation: "阴 (yīn) chỉ thời tiết nhiều mây u ám (阴天)."
  },
  {
    id: 56, hanzi: "懂", pinyin: "dǒng", lesson: 6,
    correctAnswer: "Hiểu",
    options: ["Hiểu", "Quên", "Nhớ", "Biết"],
    explanation: "懂 (dǒng) là thấu hiểu điều được nghe hoặc đọc."
  },
  {
    id: 57, hanzi: "题", pinyin: "tí", lesson: 6,
    correctAnswer: "Câu hỏi",
    options: ["Câu hỏi", "Đáp án", "Bài học", "Đoạn văn"],
    explanation: "题 (tí) là đề bài, câu hỏi bài tập hay bài thi."
  },
  {
    id: 58, hanzi: "西瓜", pinyin: "xīguā", lesson: 6,
    correctAnswer: "Dưa hấu",
    options: ["Dưa hấu", "Táo", "Chuối", "Cam"],
    explanation: "西瓜 (xīguā) là quả dưa hấu."
  },
  {
    id: 59, hanzi: "鸡蛋", pinyin: "jīdàn", lesson: 6,
    correctAnswer: "Trứng gà",
    options: ["Trứng gà", "Thịt bò", "Thịt cừu", "Con cá"],
    explanation: "鸡蛋 (jīdàn) là quả trứng gà."
  },
  {
    id: 60, hanzi: "完", pinyin: "wán", lesson: 6,
    correctAnswer: "Xong",
    options: ["Xong", "Bắt đầu", "Tiếp tục", "Dang dở"],
    explanation: "完 (wán) là bổ ngữ kết quả chỉ hành động kết thúc hoàn thành (做完 - làm xong)."
  },

  // --- Bài 7: 你家离公司远吗 (Nhà bạn cách công ty xa không) ---
  {
    id: 61, hanzi: "离", pinyin: "lí", lesson: 7,
    correctAnswer: "Cách xa / Rời khỏi",
    options: ["Cách xa / Rời khỏi", "Gần lại / Đến gần", "Ở tại / Nằm trong", "Đi tới / Hướng về"],
    explanation: "离 (lí) có 2 nghĩa: chỉ khoảng cách không gian/thời gian hoặc sự rời khỏi."
  },
  {
    id: 62, hanzi: "公司", pinyin: "gōngsī", lesson: 7,
    correctAnswer: "Công ty",
    options: ["Công ty", "Trường học", "Bệnh viện", "Cửa hàng"],
    explanation: "公司 (gōngsī) là công ty, doanh nghiệp."
  },
  {
    id: 63, hanzi: "远", pinyin: "yuǎn", lesson: 7,
    correctAnswer: "Xa",
    options: ["Xa", "Gần", "Cao", "Thấp"],
    explanation: "远 (yuǎn) chỉ cự ly xa xôi (đối lập với 近)."
  },
  {
    id: 64, hanzi: "公共汽车", pinyin: "gōnggòng qìchē", lesson: 7,
    correctAnswer: "Xe buýt",
    options: ["Xe buýt", "Xe taxi", "Xe đạp", "Máy bay"],
    explanation: "公共汽车 (gōnggòng qìchē) là phương tiện xe buýt công cộng."
  },
  {
    id: 65, hanzi: "小时", pinyin: "xiǎoshí", lesson: 7,
    correctAnswer: "Tiếng đồng hồ",
    options: ["Tiếng đồng hồ", "Phút", "Giây", "Ngày"],
    explanation: "小时 (xiǎoshí) là khoảng thời gian một giờ đồng hồ."
  },
  {
    id: 66, hanzi: "慢", pinyin: "màn", lesson: 7,
    correctAnswer: "Chậm",
    options: ["Chậm", "Nhanh", "Sớm", "Muộn"],
    explanation: "慢 (màn) biểu thị tốc độ chậm chạp."
  },
  {
    id: 67, hanzi: "快", pinyin: "kuài", lesson: 7,
    correctAnswer: "Nhanh",
    options: ["Nhanh", "Chậm", "Sớm", "Muộn"],
    explanation: "快 (kuài) biểu thị tốc độ nhanh nhẹn."
  },
  {
    id: 68, hanzi: "过", pinyin: "guò", lesson: 7,
    correctAnswer: "Đi qua / Đã từng",
    options: ["Đi qua / Đã từng", "Dừng lại / Chưa từng", "Quay lại / Sắp sửa", "Đến nơi / Hiện tại"],
    explanation: "过 (guò) có 2 nghĩa: đi qua địa điểm hoặc làm trợ từ động thái chỉ từng trải nghiệm trong quá khứ."
  },
  {
    id: 69, hanzi: "走", pinyin: "zǒu", lesson: 7,
    correctAnswer: "Đi bộ",
    options: ["Đi bộ", "Chạy bộ", "Đứng lại", "Ngồi xuống"],
    explanation: "走 (zǒu) là hành động bước đi hoặc rời đi."
  },
  {
    id: 70, hanzi: "路", pinyin: "lù", lesson: 7,
    correctAnswer: "Con đường",
    options: ["Con đường", "Cây cầu", "Ngôi nhà", "Dòng sông"],
    explanation: "路 (lù) là con đường giao thông."
  },

  // --- Bài 8: 让我想想再告诉你 (Để tôi nghĩ rồi nói cho bạn sau) ---
  {
    id: 71, hanzi: "再", pinyin: "zài", lesson: 8,
    correctAnswer: "Lại / Lần nữa",
    options: ["Lại / Lần nữa", "Đã / Trước kia", "Đang / Hiện tại", "Chưa / Bao giờ"],
    explanation: "再 (zài) là phó từ chỉ hành động lặp lại trong tương lai hoặc làm sau."
  },
  {
    id: 72, hanzi: "让", pinyin: "ràng", lesson: 8,
    correctAnswer: "Để cho / Nhường",
    options: ["Để cho / Nhường", "Bắt buộc / Cấm", "Rủ rê / Mời", "Giúp đỡ / Hỗ trợ"],
    explanation: "让 (ràng) có 2 nghĩa: cho phép/khiến ai làm gì hoặc nhường nhịn ai."
  },
  {
    id: 73, hanzi: "告诉", pinyin: "gàosu", lesson: 8,
    correctAnswer: "Nói cho",
    options: ["Nói cho", "Hỏi han", "Lắng nghe", "Giấu kín"],
    explanation: "告诉 (gàosu) là truyền đạt thông tin cho người khác biết."
  },
  {
    id: 74, hanzi: "等", pinyin: "děng", lesson: 8,
    correctAnswer: "Chờ đợi",
    options: ["Chờ đợi", "Rời đi", "Tìm kiếm", "Bỏ qua"],
    explanation: "等 (děng) là chờ đợi ai đó hoặc sự việc gì."
  },
  {
    id: 75, hanzi: "找", pinyin: "zhǎo", lesson: 8,
    correctAnswer: "Tìm kiếm / Thối lại tiền",
    options: ["Tìm kiếm / Thối lại tiền", "Hỏi han / Nhận lại đồ", "Mua sắm / Đổi lại hàng", "Gặp gỡ / Chia tay bạn"],
    explanation: "找 (zhǎo) có 2 nghĩa: tìm kiếm đồ vật hoặc thối lại tiền thừa (找钱)."
  },
  {
    id: 76, hanzi: "事情", pinyin: "shìqing", lesson: 8,
    correctAnswer: "Sự việc",
    options: ["Sự việc", "Thời gian", "Địa điểm", "Con người"],
    explanation: "事情 (shìqing) nghĩa là việc xảy ra, sự tình."
  },
  {
    id: 77, hanzi: "就", pinyin: "jiù", lesson: 8,
    correctAnswer: "Liền / Ngay",
    options: ["Liền / Ngay", "Chưa / Muộn", "Mới / Lâu", "Không / Hẳn"],
    explanation: "就 (jiù) nhấn mạnh tính mau lẹ, ngay lập tức."
  },
  {
    id: 78, hanzi: "便宜", pinyin: "piányi", lesson: 8,
    correctAnswer: "Rẻ",
    options: ["Rẻ", "Đắt", "Tốt", "Xấu"],
    explanation: "便宜 (piányi) chỉ mức giá cả thấp, phải chăng."
  },
  {
    id: 79, hanzi: "卖", pinyin: "mài", lesson: 8,
    correctAnswer: "Bán",
    options: ["Bán", "Mua", "Tặng", "Thuê"],
    explanation: "卖 (mài) là trao đổi hàng hóa để lấy tiền (bán hàng)."
  },
  {
    id: 80, hanzi: "贵", pinyin: "guì", lesson: 8,
    correctAnswer: "Đắt",
    options: ["Đắt", "Rẻ", "Nhiều", "Ít"],
    explanation: "贵 (guì) biểu thị giá tiền đắt đỏ."
  },

  // --- Bài 9: 题太多，我没做完 (Đề thi nhiều quá, tôi chưa làm xong) ---
  {
    id: 81, hanzi: "上班", pinyin: "shàngbān", lesson: 9,
    correctAnswer: "Đi làm",
    options: ["Đi làm", "Tan làm", "Đi học", "Đi ngủ"],
    explanation: "上班 (shàngbān) là bắt đầu giờ làm việc."
  },
  {
    id: 82, hanzi: "唱歌", pinyin: "chànggē", lesson: 9,
    correctAnswer: "Hát",
    options: ["Hát", "Múa", "Nói", "Nghe"],
    explanation: "唱歌 (chànggē) là ca hát."
  },
  {
    id: 83, hanzi: "男", pinyin: "nán", lesson: 9,
    correctAnswer: "Nam",
    options: ["Nam", "Nữ", "Già", "Trẻ"],
    explanation: "男 (nán) chỉ giới tính nam (Ví dụ: 男人 - đàn ông)."
  },
  {
    id: 84, hanzi: "女", pinyin: "nǚ", lesson: 9,
    correctAnswer: "Nữ",
    options: ["Nữ", "Nam", "Già", "Trẻ"],
    explanation: "女 (nǚ) chỉ giới tính nữ (Ví dụ: 女人 - phụ nữ)."
  },
  {
    id: 85, hanzi: "孩子", pinyin: "háizi", lesson: 9,
    correctAnswer: "Trẻ con",
    options: ["Trẻ con", "Người lớn", "Thầy cô", "Bố mẹ"],
    explanation: "孩子 (háizi) là đứa trẻ hoặc con cái."
  },
  {
    id: 86, hanzi: "错", pinyin: "cuò", lesson: 9,
    correctAnswer: "Sai",
    options: ["Sai", "Đúng", "Tốt", "Xấu"],
    explanation: "错 (cuò) biểu thị sự nhầm lẫn, sai sót (đối lập với 对)."
  },
  {
    id: 87, hanzi: "从", pinyin: "cóng", lesson: 9,
    correctAnswer: "Từ đâu / Bắt đầu từ",
    options: ["Từ đâu / Bắt đầu từ", "Đến đâu / Kết thúc ở", "Ở đâu / Nằm tại", "Về đâu / Hướng tới"],
    explanation: "从 (cóng) có 2 nghĩa: mốc xuất phát về thời gian hoặc địa điểm."
  },
  {
    id: 88, hanzi: "跳舞", pinyin: "tiàowǔ", lesson: 9,
    correctAnswer: "Nhảy múa",
    options: ["Nhảy múa", "Ca hát", "Đá bóng", "Chạy bộ"],
    explanation: "跳舞 (tiàowǔ) là vũ đạo, nhảy múa."
  },
  {
    id: 89, hanzi: "第一", pinyin: "dì-yī", lesson: 9,
    correctAnswer: "Thứ nhất",
    options: ["Thứ nhất", "Thứ hai", "Thứ ba", "Cuối cùng"],
    explanation: "第一 (dì-yī) là số thứ tự đầu tiên."
  },
  {
    id: 90, hanzi: "希望", pinyin: "xīwàng", lesson: 9,
    correctAnswer: "Hy vọng",
    options: ["Hy vọng", "Thất vọng", "Lo lắng", "Sợ hãi"],
    explanation: "希望 (xīwàng) là ước muốn, mong ước tốt đẹp."
  },

  // --- Bài 10: 别找了，手机在桌子上呢 (Đừng tìm nữa, điện thoại ở trên bàn kìa) ---
  {
    id: 91, hanzi: "别", pinyin: "bié", lesson: 10,
    correctAnswer: "Đừng",
    options: ["Đừng", "Phải", "Nên", "Muốn"],
    explanation: "别 (bié) dùng khuyên ngăn, cấm đoán (Ví dụ: 别走 - đừng đi)."
  },
  {
    id: 92, hanzi: "正在", pinyin: "zhèngzài", lesson: 10,
    correctAnswer: "Đang",
    options: ["Đang", "Đã", "Sắp", "Vừa"],
    explanation: "正在 (zhèngzài) nhấn mạnh hành động đang diễn ra tại thời điểm nói."
  },
  {
    id: 93, hanzi: "手机", pinyin: "shǒujī", lesson: 10,
    correctAnswer: "Điện thoại",
    options: ["Điện thoại", "Đồng hồ", "Máy tính", "Tivi"],
    explanation: "手机 (shǒujī) là điện thoại di động."
  },
  {
    id: 94, hanzi: "洗", pinyin: "xǐ", lesson: 10,
    correctAnswer: "Rửa / Giặt",
    options: ["Rửa / Giặt", "Nấu / Nướng", "Mặc / Cởi", "Mua / Bán"],
    explanation: "洗 (xǐ) có 2 nghĩa: làm sạch bằng nước như rửa tay hoặc giặt quần áo."
  },
  {
    id: 95, hanzi: "帮助", pinyin: "bāngzhù", lesson: 10,
    correctAnswer: "Giúp đỡ",
    options: ["Giúp đỡ", "Làm phiền", "Cảm ơn", "Xin lỗi"],
    explanation: "帮助 (bāngzhù) là hỗ trợ, giúp sức cho người khác."
  },
  {
    id: 96, hanzi: "课", pinyin: "kè", lesson: 10,
    correctAnswer: "Bài học",
    options: ["Bài học", "Kỳ thi", "Cuốn sách", "Câu chuyện"],
    explanation: "课 (kè) là tiết học hoặc môn học."
  },
  {
    id: 97, hanzi: "教室", pinyin: "jiàoshì", lesson: 10,
    correctAnswer: "Lớp học",
    options: ["Lớp học", "Phòng ngủ", "Bệnh viện", "Cửa hàng"],
    explanation: "教室 (jiàoshì) là phòng học ở trường."
  },
  {
    id: 98, hanzi: "往", pinyin: "wǎng", lesson: 10,
    correctAnswer: "Hướng về / Về phía",
    options: ["Hướng về / Về phía", "Rời khỏi / Cách xa", "Ở tại / Dừng chân", "Đến nơi / Chạm tới"],
    explanation: "往 (wǎng) có 2 nghĩa: giới từ chỉ phương hướng di chuyển tới đâu."
  },
  {
    id: 99, hanzi: "旁边", pinyin: "pángbiān", lesson: 10,
    correctAnswer: "Bên cạnh",
    options: ["Bên cạnh", "Phía trước", "Phía sau", "Bên trong"],
    explanation: "旁边 (pángbiān) là vị trí ngay bên cạnh."
  },
  {
    id: 100, hanzi: "知道", pinyin: "zhīdào", lesson: 10,
    correctAnswer: "Biết",
    options: ["Biết", "Quên", "Hiểu", "Nghĩ"],
    explanation: "知道 (zhīdào) là nắm rõ tin tức, sự tình."
  },

  // --- Bài 11: 他比我大三岁 (Anh ấy lớn hơn tôi ba tuổi) ---
  {
    id: 101, hanzi: "比", pinyin: "bǐ", lesson: 11,
    correctAnswer: "So với / Hơn là",
    options: ["So với / Hơn là", "Giống như / Bằng là", "Kém hơn / Thua là", "Khác với / Trái là"],
    explanation: "比 (bǐ) dùng trong câu so sánh hơn giữa 2 đối tượng."
  },
  {
    id: 102, hanzi: "哥哥", pinyin: "gēge", lesson: 11,
    correctAnswer: "Anh trai",
    options: ["Anh trai", "Em trai", "Chị gái", "Em gái"],
    explanation: "哥哥 (gēge) là người anh trai."
  },
  {
    id: 103, hanzi: "弟弟", pinyin: "dìdi", lesson: 11,
    correctAnswer: "Em trai",
    options: ["Em trai", "Anh trai", "Chị gái", "Em gái"],
    explanation: "弟弟 (dìdi) là người em trai."
  },
  {
    id: 104, hanzi: "姐姐", pinyin: "jiějie", lesson: 11,
    correctAnswer: "Chị gái",
    options: ["Chị gái", "Anh trai", "Em trai", "Em gái"],
    explanation: "姐姐 (jiějie) là người chị gái."
  },
  {
    id: 105, hanzi: "妹妹", pinyin: "mèimei", lesson: 11,
    correctAnswer: "Em gái",
    options: ["Em gái", "Chị gái", "Anh trai", "Em trai"],
    explanation: "妹妹 (mèimei) là người em gái."
  },
  {
    id: 106, hanzi: "高", pinyin: "gāo", lesson: 11,
    correctAnswer: "Cao",
    options: ["Cao", "Thấp", "Dài", "Ngắn"],
    explanation: "高 (gāo) chỉ chiều cao cao lớn."
  },
  {
    id: 107, hanzi: "右边", pinyin: "yòubian", lesson: 11,
    correctAnswer: "Bên phải",
    options: ["Bên phải", "Bên trái", "Phía trước", "Phía sau"],
    explanation: "右边 (yòubian) là phía bên tay phải."
  },
  {
    id: 108, hanzi: "左边", pinyin: "zuǒbian", lesson: 11,
    correctAnswer: "Bên trái",
    options: ["Bên trái", "Bên phải", "Phía trước", "Phía sau"],
    explanation: "左边 (zuǒbian) là phía bên tay trái."
  },
  {
    id: 109, hanzi: "两", pinyin: "liǎng", lesson: 11,
    correctAnswer: "Hai",
    options: ["Hai", "Ba", "Bốn", "Năm"],
    explanation: "两 (liǎng) dùng trước lượng từ để chỉ số lượng 2 (Ví dụ: 两个人)."
  },
  {
    id: 110, hanzi: "姓", pinyin: "xìng", lesson: 11,
    correctAnswer: "Họ",
    options: ["Họ", "Tên", "Tuổi", "Quê"],
    explanation: "姓 (xìng) là họ của một người (Ví dụ: 我姓王 - tôi họ Vương)."
  },

  // --- Bài 12: 你穿得太少了 (Bạn mặc ít áo quá) ---
  {
    id: 111, hanzi: "穿", pinyin: "chuān", lesson: 12,
    correctAnswer: "Mặc",
    options: ["Mặc", "Cởi", "Mua", "Giặt"],
    explanation: "穿 (chuān) là mặc trang phục hoặc đi giày."
  },
  {
    id: 112, hanzi: "进", pinyin: "jìn", lesson: 12,
    correctAnswer: "Đi vào / Tiến lên",
    options: ["Đi vào / Tiến lên", "Đi ra / Lùi lại", "Đi lên / Xuống dốc", "Rời đi / Ở lại"],
    explanation: "进 (jìn) có 2 nghĩa: bước vào trong hoặc tiến lên phía trước."
  },
  {
    id: 113, hanzi: "得", pinyin: "de", lesson: 12,
    correctAnswer: "Đến mức",
    options: ["Đến mức", "Của", "Và", "Với"],
    explanation: "得 (de) là trợ từ kết cấu đứng sau động từ biểu thị mức độ (Ví dụ: 跑得快)."
  },
  {
    id: 114, hanzi: "妻子", pinyin: "qīzi", lesson: 12,
    correctAnswer: "Người vợ",
    options: ["Người vợ", "Người chồng", "Chị gái", "Mẹ"],
    explanation: "妻子 (qīzi) nghĩa là người vợ trong gia đình."
  },
  {
    id: 115, hanzi: "雪", pinyin: "xuě", lesson: 12,
    correctAnswer: "Tuyết",
    options: ["Tuyết", "Mưa", "Gió", "Mây"],
    explanation: "雪 (xuě) là những bông tuyết rơi."
  },
  {
    id: 116, hanzi: "零", pinyin: "líng", lesson: 12,
    correctAnswer: "Số không",
    options: ["Số không", "Số một", "Số mười", "Số một trăm"],
    explanation: "零 (líng) là con số 0."
  },
  {
    id: 117, hanzi: "到", pinyin: "dào", lesson: 12,
    correctAnswer: "Tới nơi",
    options: ["Tới nơi", "Rời đi", "Xuất phát", "Ở lại"],
    explanation: "到 (dào) biểu thị sự di chuyển tới đích."
  },
  {
    id: 118, hanzi: "次", pinyin: "cì", lesson: 12,
    correctAnswer: "Lần",
    options: ["Lần", "Cái", "Quyển", "Người"],
    explanation: "次 (cì) là lượng từ chỉ số lần thực hiện hành động."
  },
  {
    id: 119, hanzi: "真", pinyin: "zhēn", lesson: 12,
    correctAnswer: "Thật sự",
    options: ["Thật sự", "Giả tạo", "Hơi hơi", "Không hề"],
    explanation: "真 (zhēn) là phó từ nhấn mạnh mức độ chân thực (Ví dụ: 真好 - thật tốt)."
  },
  {
    id: 120, hanzi: "已经", pinyin: "yǐjīng", lesson: 12,
    correctAnswer: "Đã",
    options: ["Đã", "Chưa", "Đang", "Sắp"],
    explanation: "已经 (yǐjīng) là phó từ biểu thị hành động đã xảy ra rồi."
  },

  // --- Bài 13: 门开着呢 (Cửa đang mở kìa) ---
  {
    id: 121, hanzi: "着", pinyin: "zhe", lesson: 13,
    correctAnswer: "Đang duy trì",
    options: ["Đang duy trì", "Đã kết thúc", "Sắp xảy ra", "Chưa bắt đầu"],
    explanation: "着 (zhe) là trợ từ động thái chỉ trạng thái đang được duy trì (Ví dụ: 开着 - đang mở)."
  },
  {
    id: 122, hanzi: "铅笔", pinyin: "qiānbǐ", lesson: 13,
    correctAnswer: "Bút chì",
    options: ["Bút chì", "Cục tẩy", "Thước kẻ", "Quyển vở"],
    explanation: "铅笔 (qiānbǐ) là cây bút chì."
  },
  {
    id: 123, hanzi: "长", pinyin: "cháng", lesson: 13,
    correctAnswer: "Dài",
    options: ["Dài", "Ngắn", "Cao", "Thấp"],
    explanation: "长 (cháng) chỉ độ dài kích thước hoặc thời gian dài."
  },
  {
    id: 124, hanzi: "眼睛", pinyin: "yǎnjing", lesson: 13,
    correctAnswer: "Đôi mắt",
    options: ["Đôi mắt", "Cái tai", "Cái miệng", "Cái mũi"],
    explanation: "眼睛 (yǎnjing) là đôi mắt của con người."
  },
  {
    id: 125, hanzi: "笑", pinyin: "xiào", lesson: 13,
    correctAnswer: "Cười",
    options: ["Cười", "Khóc", "Nói", "Hát"],
    explanation: "笑 (xiào) là mỉm cười hoặc cười vui vẻ."
  },
  {
    id: 126, hanzi: "晴", pinyin: "qíng", lesson: 13,
    correctAnswer: "Trời nắng",
    options: ["Trời nắng", "Trời mưa", "Trời râm", "Có tuyết"],
    explanation: "晴 (qíng) chỉ thời tiết quang đãng nhiều nắng."
  },
  {
    id: 127, hanzi: "百", pinyin: "bǎi", lesson: 13,
    correctAnswer: "Một trăm",
    options: ["Một trăm", "Một nghìn", "Mười", "Một vạn"],
    explanation: "百 (bǎi) là con số hàng trăm."
  },
  {
    id: 128, hanzi: "白", pinyin: "bái", lesson: 13,
    correctAnswer: "Màu trắng",
    options: ["Màu trắng", "Màu đen", "Màu đỏ", "Màu vàng"],
    explanation: "白 (bái) chỉ sắc trắng (đối lập với 黑)."
  },
  {
    id: 129, hanzi: "黑", pinyin: "hēi", lesson: 13,
    correctAnswer: "Màu đen",
    options: ["Màu đen", "Màu trắng", "Màu đỏ", "Màu xanh"],
    explanation: "黑 (hēi) chỉ sắc đen."
  },
  {
    id: 130, hanzi: "它", pinyin: "tā", lesson: 13,
    correctAnswer: "Nó",
    options: ["Nó", "Tôi", "Bạn", "Họ"],
    explanation: "它 (tā) là đại từ ngôi thứ ba chỉ đồ vật hoặc con vật."
  },

  // --- Bài 14: 你看过那个电影吗 (Bạn đã từng xem bộ phim đó chưa) ---
  {
    id: 131, hanzi: "虽然", pinyin: "suīrán", lesson: 14,
    correctAnswer: "Mặc dù",
    options: ["Mặc dù", "Bởi vì", "Cho nên", "Nếu như"],
    explanation: "虽然 (suīrán) mở đầu vế câu chỉ sự nhượng bộ (mặc dù... nhưng...)."
  },
  {
    id: 132, hanzi: "但是", pinyin: "dànshì", lesson: 14,
    correctAnswer: "Nhưng",
    options: ["Nhưng", "Và", "Hoặc", "Bởi vì"],
    explanation: "但是 (dànshì) là liên từ biểu thị sự chuyển ngoặt (nhưng mà)."
  },
  {
    id: 133, hanzi: "因为", pinyin: "yīnwèi", lesson: 14,
    correctAnswer: "Bởi vì",
    options: ["Bởi vì", "Cho nên", "Mặc dù", "Nhưng"],
    explanation: "因为 (yīnwèi) mở đầu vế câu chỉ nguyên nhân."
  },
  {
    id: 134, hanzi: "所以", pinyin: "suǒyǐ", lesson: 14,
    correctAnswer: "Cho nên",
    options: ["Cho nên", "Bởi vì", "Mặc dù", "Nếu như"],
    explanation: "所以 (suǒyǐ) chỉ kết quả, hệ quả."
  },
  {
    id: 135, hanzi: "玩", pinyin: "wán", lesson: 14,
    correctAnswer: "Chơi",
    options: ["Chơi", "Học", "Làm", "Nghỉ"],
    explanation: "玩 (wán) là hành động vui chơi, giải trí."
  },
  {
    id: 136, hanzi: "可能", pinyin: "kěnéng", lesson: 14,
    correctAnswer: "Có lẽ",
    options: ["Có lẽ", "Chắc chắn", "Tuyệt đối", "Không thể"],
    explanation: "可能 (kěnéng) chỉ khả năng có thể xảy ra (có lẽ, có thể)."
  },
  {
    id: 137, hanzi: "您", pinyin: "nín", lesson: 14,
    correctAnswer: "Ngài",
    options: ["Ngài", "Tôi", "Hắn", "Nó"],
    explanation: "您 (nín) là cách gọi bạn (你) một cách kính trọng."
  },
  {
    id: 138, hanzi: "服务员", pinyin: "fúwùyuán", lesson: 14,
    correctAnswer: "Nhân viên phục vụ",
    options: ["Nhân viên phục vụ", "Bác sĩ khám bệnh", "Giáo viên giảng dạy", "Học sinh đi học"],
    explanation: "服务员 (fúwùyuán) là người phục vụ trong nhà hàng, khách sạn."
  },
  {
    id: 139, hanzi: "近", pinyin: "jìn", lesson: 14,
    correctAnswer: "Gần",
    options: ["Gần", "Xa", "Rộng", "Hẹp"],
    explanation: "近 (jìn) chỉ cự ly gần gũi."
  },
  {
    id: 140, hanzi: "游泳", pinyin: "yóuyǒng", lesson: 14,
    correctAnswer: "Bơi lội",
    options: ["Bơi lội", "Chạy bộ", "Đá bóng", "Bóng rổ"],
    explanation: "游泳 (yóuyǒng) là môn thể thao bơi lội."
  },

  // --- Bài 15: 新年就要到了 (Năm mới sắp đến rồi) ---
  {
    id: 141, hanzi: "票", pinyin: "piào", lesson: 15,
    correctAnswer: "Tấm vé",
    options: ["Tấm vé", "Hóa đơn", "Tờ tiền", "Bức ảnh"],
    explanation: "票 (piào) là vé xe, vé vào cửa."
  },
  {
    id: 142, hanzi: "火车站", pinyin: "huǒchēzhàn", lesson: 15,
    correctAnswer: "Ga xe lửa",
    options: ["Ga xe lửa", "Sân bay", "Bến xe", "Bến cảng"],
    explanation: "火车站 (huǒchēzhàn) là nhà ga tàu hỏa."
  },
  {
    id: 143, hanzi: "大家", pinyin: "dàjiā", lesson: 15,
    correctAnswer: "Mọi người",
    options: ["Mọi người", "Gia đình", "Bạn thân", "Người lạ"],
    explanation: "大家 (dàjiā) chỉ tất cả mọi người có mặt."
  },
  {
    id: 144, hanzi: "机场", pinyin: "jīchǎng", lesson: 15,
    correctAnswer: "Sân bay",
    options: ["Sân bay", "Ga tàu", "Bến xe", "Bến cảng"],
    explanation: "机场 (jīchǎng) là phi trường, sân bay máy bay."
  },
  {
    id: 145, hanzi: "问题", pinyin: "wèntí", lesson: 15,
    correctAnswer: "Vấn đề / Câu hỏi",
    options: ["Vấn đề / Câu hỏi", "Đáp án / Trả lời", "Mục tiêu / Kế hoạch", "Ý kiến / Đề xuất"],
    explanation: "问题 (wèntí) có 2 nghĩa: câu hỏi bài thi hoặc vấn đề cần giải quyết."
  },
  {
    id: 146, hanzi: "说话", pinyin: "shuōhuà", lesson: 15,
    correctAnswer: "Nói chuyện",
    options: ["Nói chuyện", "Lắng nghe", "Đọc sách", "Viết chữ"],
    explanation: "说话 (shuōhuà) là trò chuyện, nói ra lời."
  },
  {
    id: 147, hanzi: "时间", pinyin: "shíjiān", lesson: 15,
    correctAnswer: "Thời gian",
    options: ["Thời gian", "Địa điểm", "Thời tiết", "Công việc"],
    explanation: "时间 (shíjiān) chỉ thời gian, giờ giấc."
  },
  {
    id: 148, hanzi: "日", pinyin: "rì", lesson: 15,
    correctAnswer: "Ngày",
    options: ["Ngày", "Tháng", "Năm", "Tuần"],
    explanation: "日 (rì) chỉ ngày theo văn viết hoặc mặt trời."
  },
  {
    id: 149, hanzi: "对", pinyin: "duì", lesson: 15,
    correctAnswer: "Đúng",
    options: ["Đúng", "Sai", "Tốt", "Xấu"],
    explanation: "对 (duì) biểu thị sự chính xác, đúng đắn."
  },
  {
    id: 150, hanzi: "打篮球", pinyin: "dǎ lánqiú", lesson: 15,
    correctAnswer: "Chơi bóng rổ",
    options: ["Chơi bóng rổ", "Đá bóng", "Bơi lội", "Chạy bộ"],
    explanation: "打篮球 (dǎ lánqiú) là môn thể thao bóng rổ."
  },
];

// Rebuild function
export function rebuildAll() {
  console.log("Rebuilding HSK1, HSK2, and Combined datasets with concise, symmetrical options...");

  // Validate each item
  [...HSK1_CLEAN, ...HSK2_CLEAN].forEach((item) => {
    if (item.options.length !== 4) {
      throw new Error(`Item ${item.id} (${item.hanzi}) does not have 4 options`);
    }
    const unique = new Set(item.options);
    if (unique.size !== 4) {
      throw new Error(`Item ${item.id} (${item.hanzi}) has duplicates: ${JSON.stringify(item.options)}`);
    }
    if (!item.options.includes(item.correctAnswer)) {
      throw new Error(`Item ${item.id} (${item.hanzi}) correctAnswer not in options`);
    }
  });

  const hsk1Formatted = HSK1_CLEAN.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    lesson: v.lesson,
    question: `${v.hanzi} — ${v.pinyin} nghĩa là gì?`,
    options: v.options,
    correctAnswer: v.correctAnswer,
    explanation: v.explanation,
  }));

  const hsk1Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK1_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(hsk1Formatted, null, 2) + ";\n";
  fs.writeFileSync(path.resolve(process.cwd(), 'data/hsk1-data.ts'), hsk1Code, 'utf-8');
  console.log("Generated clean HSK 1 at data/hsk1-data.ts");

  const hsk2Formatted = HSK2_CLEAN.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    lesson: v.lesson,
    question: `${v.hanzi} — ${v.pinyin} nghĩa là gì?`,
    options: v.options,
    correctAnswer: v.correctAnswer,
    explanation: v.explanation,
  }));

  const hsk2Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(hsk2Formatted, null, 2) + ";\n";
  fs.writeFileSync(path.resolve(process.cwd(), 'data/hsk2-data.ts'), hsk2Code, 'utf-8');
  console.log("Generated clean HSK 2 at data/hsk2-data.ts");

  // Combined
  const combined = [
    ...hsk1Formatted.map((q, idx) => ({ ...q, id: idx + 1, lesson: q.lesson })),
    ...hsk2Formatted.map((q, idx) => ({ ...q, id: 150 + idx + 1, lesson: q.lesson + 15 }))
  ];

  const combinedCode = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK_COMBINED_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(combined, null, 2) + ";\n";
  fs.writeFileSync(path.resolve(process.cwd(), 'data/hsk-combined-data.ts'), combinedCode, 'utf-8');
  console.log("Generated clean Combined at data/hsk-combined-data.ts");
}

rebuildAll();
