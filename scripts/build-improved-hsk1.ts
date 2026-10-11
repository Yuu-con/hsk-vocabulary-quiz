import fs from 'fs';
import path from 'path';

// Define full HSK 1 dataset (150 words across 15 standard lessons)
export const HSK1_RAW = [
  // --- Bài 1: 你好 (Chào hỏi) ---
  {
    id: 1, hanzi: "你", pinyin: "nǐ", lesson: 1,
    correctAnswer: "Bạn / Anh / Chị (Nhĩ)",
    options: ["Bạn / Anh / Chị (Nhĩ)", "Tôi / Mình (Ngã)", "Anh ấy / Nó (Tha)", "Chúng tôi / Chúng ta"],
    explanation: "你 (nǐ - âm Hán Việt: Nhĩ) là đại từ nhân xưng ngôi thứ 2 (Ví dụ: 你好 - Chào bạn)."
  },
  {
    id: 2, hanzi: "好", pinyin: "hǎo", lesson: 1,
    correctAnswer: "Tốt / Đẹp / Khỏe (Hảo)",
    options: ["Tốt / Đẹp / Khỏe (Hảo)", "Xấu xí / Tệ hại", "To lớn / Khổng lồ", "Nhỏ bé / Chật hẹp"],
    explanation: "好 (hǎo - Hán Việt: Hảo) mang nghĩa tốt lành, khỏe mạnh, thuận lợi (Ví dụ: 身体好 - Sức khỏe tốt)."
  },
  {
    id: 3, hanzi: "对不起", pinyin: "duìbuqǐ", lesson: 1,
    correctAnswer: "Xin lỗi (Đối bất khởi)",
    options: ["Xin lỗi (Đối bất khởi)", "Cảm ơn (Cảm tạ)", "Không có chi / Đừng ngại", "Tạm biệt (Hẹn gặp lại)"],
    explanation: "对不起 (duìbuqǐ - Hán Việt: Đối bất khởi) dùng khi nhận lỗi, xin lỗi chân thành."
  },
  {
    id: 4, hanzi: "没关系", pinyin: "méi guānxi", lesson: 1,
    correctAnswer: "Không sao / Không hề gì (Một quan hệ)",
    options: ["Không sao / Không hề gì (Một quan hệ)", "Xin lỗi chân thành", "Rất vui được gặp", "Hẹn ngày tái ngộ"],
    explanation: "没关系 (méi guānxi - Hán Việt: Một quan hệ) dùng đáp lại lời xin lỗi: không sao đâu, không có can hệ gì."
  },
  {
    id: 5, hanzi: "一", pinyin: "yī", lesson: 1,
    correctAnswer: "Số 1 / Một (Nhất)",
    options: ["Số 1 / Một (Nhất)", "Số 2 / Hai (Nhị)", "Số 3 / Ba (Tam)", "Số 10 / Mười (Thập)"],
    explanation: "一 (yī - Hán Việt: Nhất) là con số 1 (Ví dụ: 一个 - một cái, 一起 - cùng nhau)."
  },
  {
    id: 6, hanzi: "二", pinyin: "èr", lesson: 1,
    correctAnswer: "Số 2 / Hai (Nhị)",
    options: ["Số 2 / Hai (Nhị)", "Số 1 / Một (Nhất)", "Số 3 / Ba (Tam)", "Số 4 / Bốn (Tứ)"],
    explanation: "二 (èr - Hán Việt: Nhị) là số đếm 2 trong tiếng Trung."
  },
  {
    id: 7, hanzi: "三", pinyin: "sān", lesson: 1,
    correctAnswer: "Số 3 / Ba (Tam)",
    options: ["Số 3 / Ba (Tam)", "Số 4 / Bốn (Tứ)", "Số 2 / Hai (Nhị)", "Số 5 / Năm (Ngũ)"],
    explanation: "三 (sān - Hán Việt: Tam) là con số 3 (Ví dụ: 三个人 - ba người)."
  },
  {
    id: 8, hanzi: "四", pinyin: "sì", lesson: 1,
    correctAnswer: "Số 4 / Bốn (Tứ)",
    options: ["Số 4 / Bốn (Tứ)", "Số 5 / Năm (Ngũ)", "Số 6 / Sáu (Lục)", "Số 7 / Bảy (Thất)"],
    explanation: "四 (sì - Hán Việt: Tứ) là con số 4 (Ví dụ: 四月 - tháng 4)."
  },
  {
    id: 9, hanzi: "五", pinyin: "wǔ", lesson: 1,
    correctAnswer: "Số 5 / Năm (Ngũ)",
    options: ["Số 5 / Năm (Ngũ)", "Số 4 / Bốn (Tứ)", "Số 6 / Sáu (Lục)", "Số 7 / Bảy (Thất)"],
    explanation: "五 (wǔ - Hán Việt: Ngũ) là con số 5 (Ví dụ: 星期五 - thứ Sáu)."
  },
  {
    id: 10, hanzi: "是", pinyin: "shì", lesson: 1,
    correctAnswer: "Là / Đúng / Phải (Thị)",
    options: ["Là / Đúng / Phải (Thị)", "Không phải / Sai lầm", "Có / Tồn tại", "Ở tại / Đang"],
    explanation: "是 (shì - Hán Việt: Thị) là động từ phán đoán: là, phải (Ví dụ: 我是学生 - Tôi là học sinh)."
  },

  // --- Bài 2: 谢谢你 (Cảm ơn bạn) ---
  {
    id: 11, hanzi: "谢谢", pinyin: "xièxie", lesson: 2,
    correctAnswer: "Cảm ơn / Cảm tạ (Tạ tạ)",
    options: ["Cảm ơn / Cảm tạ (Tạ tạ)", "Xin lỗi chân tình", "Tạm biệt chia tay", "Đừng khách sáo chi"],
    explanation: "谢谢 (xièxie - Hán Việt: Tạ tạ) là lời cảm ơn khi nhận sự giúp đỡ (谢谢你 - Cảm ơn bạn)."
  },
  {
    id: 12, hanzi: "不", pinyin: "bù", lesson: 2,
    correctAnswer: "Không / Chẳng (Bất)",
    options: ["Không / Chẳng (Bất)", "Rất / Lắm (Hẩn)", "Đều / Cùng (Đô)", "Cũng / Lại (Dã)"],
    explanation: "不 (bù - Hán Việt: Bất) là phó từ phủ định, đứng trước động từ/tính từ (Ví dụ: 不好 - không tốt)."
  },
  {
    id: 13, hanzi: "不客气", pinyin: "bú kèqi", lesson: 2,
    correctAnswer: "Đừng khách sáo / Không có chi (Bất khách khí)",
    options: ["Đừng khách sáo / Không có chi (Bất khách khí)", "Xin lỗi chân thành", "Cảm ơn sâu sắc", "Hẹn sớm gặp lại"],
    explanation: "不客气 (bú kèqi - Hán Việt: Bất khách khí) dùng đáp lại lời cảm ơn 谢谢."
  },
  {
    id: 14, hanzi: "再见", pinyin: "zàijiàn", lesson: 2,
    correctAnswer: "Tạm biệt / Hẹn gặp lại (Tái kiến)",
    options: ["Tạm biệt / Hẹn gặp lại (Tái kiến)", "Xin chào gặp mặt", "Cảm ơn giúp đỡ", "Không hề có chi"],
    explanation: "再见 (zàijiàn - Hán Việt: Tái kiến) mang nghĩa gặp lại lần sau, tạm biệt lúc chia tay."
  },
  {
    id: 15, hanzi: "六", pinyin: "liù", lesson: 2,
    correctAnswer: "Số 6 / Sáu (Lục)",
    options: ["Số 6 / Sáu (Lục)", "Số 5 / Năm (Ngũ)", "Số 7 / Bảy (Thất)", "Số 8 / Tám (Bát)"],
    explanation: "六 (liù - Hán Việt: Lục) là con số 6 (Ví dụ: 六点 - 6 giờ)."
  },
  {
    id: 16, hanzi: "七", pinyin: "qī", lesson: 2,
    correctAnswer: "Số 7 / Bảy (Thất)",
    options: ["Số 7 / Bảy (Thất)", "Số 6 / Sáu (Lục)", "Số 8 / Tám (Bát)", "Số 9 / Chín (Cửu)"],
    explanation: "七 (qī - Hán Việt: Thất) là con số 7 (Ví dụ: 七月 - tháng 7)."
  },
  {
    id: 17, hanzi: "八", pinyin: "bā", lesson: 2,
    correctAnswer: "Số 8 / Tám (Bát)",
    options: ["Số 8 / Tám (Bát)", "Số 7 / Bảy (Thất)", "Số 9 / Chín (Cửu)", "Số 6 / Sáu (Lục)"],
    explanation: "八 (bā - Hán Việt: Bát) là con số 8 (phát âm gần từ 'phát' - phát tài)."
  },
  {
    id: 18, hanzi: "九", pinyin: "jiǔ", lesson: 2,
    correctAnswer: "Số 9 / Chín (Cửu)",
    options: ["Số 9 / Chín (Cửu)", "Số 8 / Tám (Bát)", "Số 7 / Bảy (Thất)", "Số 6 / Sáu (Lục)"],
    explanation: "九 (jiǔ - Hán Việt: Cửu) là con số 9 (Ví dụ: 九岁 - 9 tuổi)."
  },
  {
    id: 19, hanzi: "十", pinyin: "shí", lesson: 2,
    correctAnswer: "Số 10 / Mười (Thập)",
    options: ["Số 10 / Mười (Thập)", "Số 1 / Một (Nhất)", "Số 4 / Bốn (Tứ)", "Số 100 / Trăm (Bách)"],
    explanation: "十 (shí - Hán Việt: Thập) là số 10 (Ví dụ: 十个人 - mười người)."
  },
  {
    id: 20, hanzi: "人", pinyin: "rén", lesson: 2,
    correctAnswer: "Người / Con người (Nhân)",
    options: ["Người / Con người (Nhân)", "Động vật nuôi", "Đồ vật dụng", "Cây cối cảnh"],
    explanation: "人 (rén - Hán Việt: Nhân) chỉ con người (Ví dụ: 中国人 - người Trung Quốc)."
  },

  // --- Bài 3: 你叫什么名字 (Bạn tên là gì) ---
  {
    id: 21, hanzi: "叫", pinyin: "jiào", lesson: 3,
    correctAnswer: "Gọi / Tên là (Khiếu)",
    options: ["Gọi / Tên là (Khiếu)", "Nói / Kể lại", "Hỏi / Thắc mắc", "Nghe / Hiểu rõ"],
    explanation: "叫 (jiào - Hán Việt: Khiếu) nghĩa là kêu, gọi hoặc giới thiệu họ tên (我叫李明 - Tôi tên là Lý Minh)."
  },
  {
    id: 22, hanzi: "什么", pinyin: "shénme", lesson: 3,
    correctAnswer: "Cái gì / Gì (Thập ma)",
    options: ["Cái gì / Gì (Thập ma)", "Ở đâu / Chỗ nào", "Bao nhiêu / Mấy", "Ai / Người nào"],
    explanation: "什么 (shénme - Hán Việt: Thập ma) là đại từ nghi vấn hỏi về đồ vật, tên gọi (什么名字 - Tên gì)."
  },
  {
    id: 23, hanzi: "名字", pinyin: "míngzi", lesson: 3,
    correctAnswer: "Tên / Tên gọi (Danh tự)",
    options: ["Tên / Tên gọi (Danh tự)", "Tuổi tác năm", "Quê quán xứ", "Nghề nghiệp làm"],
    explanation: "名字 (míngzi - Hán Việt: Danh tự) là danh xưng, tên gọi của người hoặc vật."
  },
  {
    id: 24, hanzi: "我", pinyin: "wǒ", lesson: 3,
    correctAnswer: "Tôi / Mình / Ta (Ngã)",
    options: ["Tôi / Mình / Ta (Ngã)", "Bạn / Anh / Chị", "Anh ấy / Cô ấy", "Chúng tôi / Bọn họ"],
    explanation: "我 (wǒ - Hán Việt: Ngã) là đại từ nhân xưng ngôi thứ nhất số ít."
  },
  {
    id: 25, hanzi: "老师", pinyin: "lǎoshī", lesson: 3,
    correctAnswer: "Thầy cô / Giáo viên (Lão sư)",
    options: ["Thầy cô / Giáo viên (Lão sư)", "Học sinh / Trò nhỏ", "Bác sĩ / Y sĩ", "Bạn bè / Bằng hữu"],
    explanation: "老师 (lǎoshī - Hán Việt: Lão sư) là danh xưng tôn kính dành cho người dạy học."
  },
  {
    id: 26, hanzi: "学生", pinyin: "xuésheng", lesson: 3,
    correctAnswer: "Học sinh / Học trò (Học sinh)",
    options: ["Học sinh / Học trò (Học sinh)", "Thầy cô giáo viên", "Bác sĩ khám bệnh", "Kỹ sư công trình"],
    explanation: "学生 (xuésheng - Hán Việt: Học sinh) là người đang theo học tại trường lớp."
  },
  {
    id: 27, hanzi: "吗", pinyin: "ma", lesson: 3,
    correctAnswer: "Không / Phải không (trợ từ nghi vấn)",
    options: ["Không / Phải không (trợ từ nghi vấn)", "Đã rồi (trợ từ xong)", "Của ai (trợ từ sở hữu)", "Và cùng (liên từ nối)"],
    explanation: "吗 (ma) đặt ở cuối câu trần thuật để biến câu thành câu hỏi (Ví dụ: 你好吗 - Bạn khỏe không?)."
  },
  {
    id: 28, hanzi: "中国", pinyin: "Zhōngguó", lesson: 3,
    correctAnswer: "Trung Quốc (Trung Hoa)",
    options: ["Trung Quốc (Trung Hoa)", "Việt Nam láng giềng", "Nước Mỹ xa xôi", "Bắc Kinh thủ đô"],
    explanation: "中国 (Zhōngguó - Hán Việt: Trung Quốc) là đất nước Trung Hoa."
  },
  {
    id: 29, hanzi: "北京", pinyin: "Běijīng", lesson: 3,
    correctAnswer: "Bắc Kinh (thủ đô TQ)",
    options: ["Bắc Kinh (thủ đô TQ)", "Thượng Hải sầm uất", "Quảng Châu mua bán", "Nam Kinh cổ kính"],
    explanation: "北京 (Běijīng - Hán Việt: Bắc Kinh: kinh đô phía Bắc), thủ đô của Trung Quốc."
  },
  {
    id: 30, hanzi: "学习", pinyin: "xuéxí", lesson: 3,
    correctAnswer: "Học tập / Học hỏi (Học tập)",
    options: ["Học tập / Học hỏi (Học tập)", "Làm việc công tác", "Nghỉ ngơi thư giãn", "Mua bán trao đổi"],
    explanation: "学习 (xuéxí - Hán Việt: Học tập) là động từ trau dồi kiến thức (Ví dụ: 学习汉语 - học tiếng Trung)."
  },

  // --- Bài 4: 她是我的汉语老师 (Cô ấy là giáo viên tiếng Trung của tôi) ---
  {
    id: 31, hanzi: "她", pinyin: "tā", lesson: 4,
    correctAnswer: "Cô ấy / Bà ấy (Tha - nữ)",
    options: ["Cô ấy / Bà ấy (Tha - nữ)", "Anh ấy (Tha - nam)", "Đồ vật đó (Tha)", "Tôi / Mình (Ngã)"],
    explanation: "她 (tā - Hán Việt: Tha) là đại từ nhân xưng ngôi thứ ba số ít chỉ phái nữ (bộ Nữ 女 đứng trước)."
  },
  {
    id: 32, hanzi: "谁", pinyin: "shéi", lesson: 4,
    correctAnswer: "Ai / Người nào (Thùy)",
    options: ["Ai / Người nào (Thùy)", "Cái gì / Đồ gì", "Ở đâu / Chỗ nào", "Bao giờ / Lúc nào"],
    explanation: "谁 (shéi - Hán Việt: Thùy) là đại từ nghi vấn dùng để hỏi người (Ví dụ: 他是谁 - Anh ấy là ai?)."
  },
  {
    id: 33, hanzi: "的", pinyin: "de", lesson: 4,
    correctAnswer: "Của / Đích (trợ từ sở hữu, liên kết)",
    options: ["Của / Đích (trợ từ sở hữu, liên kết)", "Và / Cùng nhau", "Tại / Ở đâu", "Đã / Từng qua"],
    explanation: "的 (de - Hán Việt: Đích) kết nối định ngữ với trung tâm ngữ (Ví dụ: 我的书 - Sách của tôi)."
  },
  {
    id: 34, hanzi: "汉语", pinyin: "Hànyǔ", lesson: 4,
    correctAnswer: "Tiếng Trung / Hán ngữ",
    options: ["Tiếng Trung / Hán ngữ", "Chữ Hán tự dạng", "Người Trung Hoa", "Đất nước Trung Quốc"],
    explanation: "汉语 (Hànyǔ - Hán Việt: Hán ngữ) là ngôn ngữ tiếng Trung Quốc."
  },
  {
    id: 35, hanzi: "哪", pinyin: "nǎ", lesson: 4,
    correctAnswer: "Nào / Đâu (Na - nghi vấn)",
    options: ["Nào / Đâu (Na - nghi vấn)", "Kia / Đó (Nặc)", "Đây / Này (Giá)", "Ai / Người nào"],
    explanation: "哪 (nǎ - Hán Việt: Na) là đại từ nghi vấn chỉ sự lựa chọn (Ví dụ: 哪国人 - Người nước nào?)."
  },
  {
    id: 36, hanzi: "呢", pinyin: "ne", lesson: 4,
    correctAnswer: "Thì sao / Nhỉ (trợ từ ngữ khí)",
    options: ["Thì sao / Nhỉ (trợ từ ngữ khí)", "Không phải không", "Tại sao nguyên do", "Bao giờ thời điểm"],
    explanation: "呢 (ne) dùng trong câu hỏi tỉnh lược (Ví dụ: 你呢？- Còn bạn thì sao?)."
  },
  {
    id: 37, hanzi: "他", pinyin: "tā", lesson: 4,
    correctAnswer: "Anh ấy / Ông ấy (Tha - nam)",
    options: ["Anh ấy / Ông ấy (Tha - nam)", "Cô ấy (Tha - nữ)", "Đồ vật đó (Tha)", "Chúng tôi (Ngã môn)"],
    explanation: "他 (tā - Hán Việt: Tha) là đại từ nhân xưng ngôi thứ ba số ít chỉ nam giới (bộ Nhân đứng trước)."
  },
  {
    id: 38, hanzi: "同学", pinyin: "tóngxué", lesson: 4,
    correctAnswer: "Bạn học / Bạn cùng lớp (Đồng học)",
    options: ["Bạn học / Bạn cùng lớp (Đồng học)", "Thầy cô giáo viên", "Bác sĩ bệnh viện", "Hàng xóm láng giềng"],
    explanation: "同学 (tóngxué - Hán Việt: Đồng học) chỉ người học chung trường lớp."
  },
  {
    id: 39, hanzi: "朋友", pinyin: "péngyou", lesson: 4,
    correctAnswer: "Bạn bè / Bằng hữu",
    options: ["Bạn bè / Bằng hữu", "Thầy cô giáo dục", "Người cha gia đình", "Đồng nghiệp cơ quan"],
    explanation: "朋友 (péngyou - Hán Việt: Bằng hữu) chỉ người bạn bè thân thiết."
  },
  {
    id: 40, hanzi: "认识", pinyin: "rènshi", lesson: 4,
    correctAnswer: "Quen biết / Nhận biết (Nhận thức)",
    options: ["Quen biết / Nhận biết (Nhận thức)", "Học tập rèn luyện", "Gặp gỡ chia tay", "Nói chuyện trao đổi"],
    explanation: "认识 (rènshi - Hán Việt: Nhận thức) nghĩa là quen biết ai đó (很高兴认识你 - Rất vui được quen biết bạn)."
  },

  // --- Bài 5: 她女儿今年二十岁 (Con gái cô ấy năm nay hai mươi tuổi) ---
  {
    id: 41, hanzi: "家", pinyin: "jiā", lesson: 5,
    correctAnswer: "Gia đình / Nhà (Gia)",
    options: ["Gia đình / Nhà (Gia)", "Trường học viện", "Cửa hàng quán", "Công ty doanh nghiệp"],
    explanation: "家 (jiā - Hán Việt: Gia) là ngôi nhà hoặc mái ấm gia đình (Ví dụ: 我家 - nhà tôi)."
  },
  {
    id: 42, hanzi: "有", pinyin: "yǒu", lesson: 5,
    correctAnswer: "Có / Tồn tại / Sở hữu (Hữu)",
    options: ["Có / Tồn tại / Sở hữu (Hữu)", "Không có / Vắng", "Là / Đúng phải", "Ở tại / Nơi chốn"],
    explanation: "有 (yǒu - Hán Việt: Hữu) biểu thị sự sở hữu hoặc tồn tại (Ví dụ: 我有一本书 - Tôi có 1 quyển sách)."
  },
  {
    id: 43, hanzi: "几", pinyin: "jǐ", lesson: 5,
    correctAnswer: "Mấy / Vài (Kỷ)",
    options: ["Mấy / Vài (Kỷ)", "Bao nhiêu (trên 10)", "Cái nào lựa chọn", "Ở đâu vị trí"],
    explanation: "几 (jǐ - Hán Việt: Kỷ) dùng để hỏi số lượng nhỏ dưới 10 (Ví dụ: 几口人 - mấy người)."
  },
  {
    id: 44, hanzi: "岁", pinyin: "suì", lesson: 5,
    correctAnswer: "Tuổi (Tuế)",
    options: ["Tuổi (Tuế)", "Năm (Niên)", "Tháng (Nguyệt)", "Ngày (Nhật)"],
    explanation: "岁 (suì - Hán Việt: Tuế) là đơn vị đo tuổi tác (Ví dụ: 二十岁 - 20 tuổi)."
  },
  {
    id: 45, hanzi: "了", pinyin: "le", lesson: 5,
    correctAnswer: "Rồi / Biến chuyển (Liễu)",
    options: ["Rồi / Biến chuyển (Liễu)", "Của ai liên kết", "Không phải phủ định", "Cũng vậy tương đồng"],
    explanation: "了 (le - Hán Việt: Liễu) đặt cuối câu hoặc sau động từ biểu thị trạng thái mới xuất hiện hoặc hoàn thành."
  },
  {
    id: 46, hanzi: "女儿", pinyin: "nǚ'ér", lesson: 5,
    correctAnswer: "Con gái (Nữ nhi)",
    options: ["Con gái (Nữ nhi)", "Con trai (Nhi tử)", "Người mẹ thân yêu", "Chị gái ruột"],
    explanation: "女儿 (nǚ'ér - Hán Việt: Nữ nhi) chỉ người con gái trong quan hệ gia đình cha mẹ."
  },
  {
    id: 47, hanzi: "儿子", pinyin: "érzi", lesson: 5,
    correctAnswer: "Con trai (Nhi tử)",
    options: ["Con trai (Nhi tử)", "Con gái (Nữ nhi)", "Người cha phụ thân", "Em trai đệ đệ"],
    explanation: "儿子 (érzi - Hán Việt: Nhi tử) là con trai trong gia đình."
  },
  {
    id: 48, hanzi: "多", pinyin: "duō", lesson: 5,
    correctAnswer: "Nhiều / Bao nhiêu (Đa)",
    options: ["Nhiều / Bao nhiêu (Đa)", "Ít ỏi / Thiếu", "To lớn / Đại", "Bé nhỏ / Tiểu"],
    explanation: "多 (duō - Hán Việt: Đa) chỉ số lượng nhiều hoặc dùng hỏi mức độ (Ví dụ: 多大 - bao nhiêu tuổi)."
  },
  {
    id: 49, hanzi: "大", pinyin: "dà", lesson: 5,
    correctAnswer: "To lớn / Lớn (Đại)",
    options: ["To lớn / Lớn (Đại)", "Nhỏ bé / Tiểu", "Nhiều nhặn / Đa", "Ít ỏi / Thiểu"],
    explanation: "大 (dà - Hán Việt: Đại) miêu tả kích thước lớn hoặc tuổi tác lớn (đối lập với 小)."
  },
  {
    id: 50, hanzi: "个", pinyin: "gè", lesson: 5,
    correctAnswer: "Cái / Chiếc / Người (Cá - lượng từ)",
    options: ["Cái / Chiếc / Người (Cá - lượng từ)", "Cuốn / Quyển (Bổn)", "Miếng / Mảnh (Khối)", "Đôi / Cặp (Song)"],
    explanation: "个 (gè - Hán Việt: Cá) là lượng từ thông dụng nhất trong tiếng Trung (一个人: một người, 一个苹果: một quả táo)."
  },

  // --- Bài 6: 我会说汉语 (Tôi biết nói tiếng Trung) ---
  {
    id: 51, hanzi: "会", pinyin: "huì", lesson: 6,
    correctAnswer: "Biết / Sẽ (Hội)",
    options: ["Biết / Sẽ (Hội)", "Muốn / Cần", "Thích / Chuộng", "Phải / Bắt buộc"],
    explanation: "会 (huì - Hán Việt: Hội) biểu thị kỹ năng học được (Biết) hoặc khả năng xảy ra (Sẽ)."
  },
  {
    id: 52, hanzi: "说", pinyin: "shuō", lesson: 6,
    correctAnswer: "Nói / Diễn đạt (Thuyết)",
    options: ["Nói / Diễn đạt (Thuyết)", "Nghe / Lĩnh hội", "Đọc / Ngâm vịnh", "Viết / Ghi chép"],
    explanation: "说 (shuō - Hán Việt: Thuyết) là hành động nói bằng lời (Ví dụ: 说汉语 - nói tiếng Trung)."
  },
  {
    id: 53, hanzi: "妈妈", pinyin: "māma", lesson: 6,
    correctAnswer: "Mẹ / Má (Ma ma)",
    options: ["Mẹ / Má (Ma ma)", "Bố / Cha phụ thân", "Chị gái tỷ tỷ", "Con gái nữ nhi"],
    explanation: "妈妈 (māma - Hán Việt: Ma ma) là tiếng gọi người mẹ thân thương."
  },
  {
    id: 54, hanzi: "菜", pinyin: "cài", lesson: 6,
    correctAnswer: "Món ăn / Rau củ (Thái)",
    options: ["Món ăn / Rau củ (Thái)", "Cơm trắng gạo", "Hoa quả ngọt", "Nước giải khát"],
    explanation: "菜 (cài - Hán Việt: Thái) chỉ món ăn trên bàn hoặc rau xanh (Ví dụ: 中国菜 - món ăn Trung Quốc)."
  },
  {
    id: 55, hanzi: "很", pinyin: "hěn", lesson: 6,
    correctAnswer: "Rất / Lắm (phó từ mức độ)",
    options: ["Rất / Lắm (phó từ mức độ)", "Không hề phủ định", "Đều là bao quát", "Cũng vậy tương đồng"],
    explanation: "很 (hěn) là phó từ chỉ mức độ cao (Ví dụ: 很好 - rất tốt, 很高 - rất cao)."
  },
  {
    id: 56, hanzi: "好吃", pinyin: "hǎochī", lesson: 6,
    correctAnswer: "Ngon miệng / Ngon (Hảo xuy)",
    options: ["Ngon miệng / Ngon (Hảo xuy)", "Khó nuốt vị dở", "Đẹp mắt ưa nhìn", "Vui vẻ mừng rỡ"],
    explanation: "好吃 (hǎochī - Hán Việt: Hảo xuy) khen ngợi đồ ăn thơm ngon."
  },
  {
    id: 57, hanzi: "做", pinyin: "zuò", lesson: 6,
    correctAnswer: "Làm / Nấu nướng (Tố)",
    options: ["Làm / Nấu nướng (Tố)", "Ngồi / Đi xe", "Xem / Đọc sách", "Nghe / Thưởng thức"],
    explanation: "做 (zuò - Hán Việt: Tố) là làm ra cái gì đó (Ví dụ: 做饭 - nấu cơm, 做菜 - nấu món ăn)."
  },
  {
    id: 58, hanzi: "写", pinyin: "xiě", lesson: 6,
    correctAnswer: "Viết chữ / Soạn (Tả)",
    options: ["Viết chữ / Soạn (Tả)", "Đọc sách to", "Nghe giảng bài", "Hội họa vẽ"],
    explanation: "写 (xiě - Hán Việt: Tả) là cầm bút viết chữ (Ví dụ: 写汉字 - viết chữ Hán)."
  },
  {
    id: 59, hanzi: "字", pinyin: "zì", lesson: 6,
    correctAnswer: "Chữ / Ký tự (Tự)",
    options: ["Chữ / Ký tự (Tự)", "Quyển sách thư", "Lời nói thoại", "Tên gọi danh"],
    explanation: "字 (zì - Hán Việt: Tự) chỉ mặt chữ hoặc ký tự (Ví dụ: 汉字 - chữ Hán)."
  },
  {
    id: 60, hanzi: "读", pinyin: "dú", lesson: 6,
    correctAnswer: "Đọc sách / Đọc (Độc)",
    options: ["Đọc sách / Đọc (Độc)", "Viết văn bản", "Nói năng lời", "Lắng nghe tai"],
    explanation: "读 (dú - Hán Việt: Độc) là đọc thành tiếng hoặc đọc sách (读书: đọc sách, học hành)."
  },

  // --- Bài 7: 今天几号 (Hôm nay ngày mấy) ---
  {
    id: 61, hanzi: "请", pinyin: "qǐng", lesson: 7,
    correctAnswer: "Mời / Xin / Thỉnh",
    options: ["Mời / Xin / Thỉnh", "Bảo / Ra lệnh", "Hỏi / Vấn đáp", "Cấm / Khuyên can"],
    explanation: "请 (qǐng - Hán Việt: Thỉnh) là từ lịch sự đặt đầu câu (Ví dụ: 请问 - xin hỏi, 请坐 - xin mời ngồi)."
  },
  {
    id: 62, hanzi: "今天", pinyin: "jīntiān", lesson: 7,
    correctAnswer: "Hôm nay (Kim thiên)",
    options: ["Hôm nay (Kim thiên)", "Ngày mai minh nhật", "Hôm qua tạc thiên", "Năm nay kim niên"],
    explanation: "今天 (jīntiān - Hán Việt: Kim thiên) chỉ ngày hiện tại."
  },
  {
    id: 63, hanzi: "号", pinyin: "hào", lesson: 7,
    correctAnswer: "Ngày / Số hiệu (Hiệu)",
    options: ["Ngày / Số hiệu (Hiệu)", "Tháng / Nguyệt", "Năm / Niên", "Tuần / Tuần lễ"],
    explanation: "号 (hào - Hán Việt: Hiệu) dùng nói ngày trong tháng (Ví dụ: 5号 - ngày 5) hoặc số nhà, số xe."
  },
  {
    id: 64, hanzi: "月", pinyin: "yuè", lesson: 7,
    correctAnswer: "Tháng / Mặt trăng (Nguyệt)",
    options: ["Tháng / Mặt trăng (Nguyệt)", "Năm / Mặt trời", "Ngày / Ngôi sao", "Tuần / Đám mây"],
    explanation: "月 (yuè - Hán Việt: Nguyệt) dùng nói các tháng trong năm (一月 - tháng 1) hoặc mặt trăng."
  },
  {
    id: 65, hanzi: "星期", pinyin: "xīngqī", lesson: 7,
    correctAnswer: "Tuần lễ / Thứ (Tinh kỳ)",
    options: ["Tuần lễ / Thứ (Tinh kỳ)", "Tháng trong năm", "Mùa trong tiết", "Khoảng giờ phút"],
    explanation: "星期 (xīngqī - Hán Việt: Tinh kỳ) nghĩa là tuần lễ hoặc thứ trong tuần (Ví dụ: 星期一 - thứ Hai)."
  },
  {
    id: 66, hanzi: "昨天", pinyin: "zuótiān", lesson: 7,
    correctAnswer: "Hôm qua (Tạc thiên)",
    options: ["Hôm qua (Tạc thiên)", "Hôm nay kim thiên", "Ngày mai minh thiên", "Hôm kia tiền thiên"],
    explanation: "昨天 (zuótiān - Hán Việt: Tạc thiên) chỉ ngày hôm qua."
  },
  {
    id: 67, hanzi: "明天", pinyin: "míngtiān", lesson: 7,
    correctAnswer: "Ngày mai (Minh thiên)",
    options: ["Ngày mai (Minh thiên)", "Hôm nay kim thiên", "Hôm qua tạc thiên", "Năm sau minh niên"],
    explanation: "明天 (míngtiān - Hán Việt: Minh thiên) chỉ ngày mai, ngày tiếp theo."
  },
  {
    id: 68, hanzi: "去", pinyin: "qù", lesson: 7,
    correctAnswer: "Đi / Đến nơi khác (Khứ)",
    options: ["Đi / Đến nơi khác (Khứ)", "Đến hướng người nói", "Trở về chốn cũ", "Ở tại vị trí"],
    explanation: "去 (qù - Hán Việt: Khứ) chỉ chuyển động rời xa người nói đến nơi khác (Ví dụ: 去学校 - đi đến trường)."
  },
  {
    id: 69, hanzi: "学校", pinyin: "xuéxiào", lesson: 7,
    correctAnswer: "Trường học (Học hiệu)",
    options: ["Trường học (Học hiệu)", "Bệnh viện y tế", "Cửa hàng buôn bán", "Nhà hàng ăn uống"],
    explanation: "学校 (xuéxiào - Hán Việt: Học hiệu) là cơ sở trường lớp giáo dục."
  },
  {
    id: 70, hanzi: "看", pinyin: "kàn", lesson: 7,
    correctAnswer: "Xem / Nhìn / Đọc (Khán)",
    options: ["Xem / Nhìn / Đọc (Khán)", "Lắng nghe thanh âm", "Nói chuyện trao đổi", "Viết lách ghi chép"],
    explanation: "看 (kàn - Hán Việt: Khán) là nhìn ngắm, xem (看电视: xem tivi) hoặc đọc sách báo (看书: đọc sách)."
  },

  // --- Bài 8: 我想喝茶 (Tôi muốn uống trà) ---
  {
    id: 71, hanzi: "想", pinyin: "xiǎng", lesson: 8,
    correctAnswer: "Muốn / Nghĩ / Nhớ (Tưởng)",
    options: ["Muốn / Nghĩ / Nhớ (Tưởng)", "Yêu thích đam mê", "Làm việc nấu nướng", "Hỏi han vấn đáp"],
    explanation: "想 (xiǎng - Hán Việt: Tưởng) biểu thị ước muốn (Muốn), suy nghĩ (Nghĩ) hoặc nhớ nhung (Nhớ)."
  },
  {
    id: 72, hanzi: "喝", pinyin: "hē", lesson: 8,
    correctAnswer: "Uống / Dùng nước",
    options: ["Uống / Dùng nước", "Ăn thức ăn", "Nói lời hay", "Hát khúc ca"],
    explanation: "喝 (hē) là động từ uống chất lỏng (Ví dụ: 喝茶 - uống trà, 喝水 - uống nước)."
  },
  {
    id: 73, hanzi: "茶", pinyin: "chá", lesson: 8,
    correctAnswer: "Trà / Nước chè (Trà)",
    options: ["Trà / Nước chè (Trà)", "Cà phê đen", "Rượu nếp thơm", "Canh rau ngọt"],
    explanation: "茶 (chá - Hán Việt: Trà) là đồ uống trà truyền thống."
  },
  {
    id: 74, hanzi: "吃", pinyin: "chī", lesson: 8,
    correctAnswer: "Ăn / Dùng bữa",
    options: ["Ăn / Dùng bữa", "Uống chất lỏng", "Ngủ say sưa", "Nói năng lời"],
    explanation: "吃 (chī) là hành động ăn thức ăn (Ví dụ: 吃饭 - ăn cơm)."
  },
  {
    id: 75, hanzi: "米饭", pinyin: "mǐfàn", lesson: 8,
    correctAnswer: "Cơm / Cơm trắng (Mễ phạn)",
    options: ["Cơm / Cơm trắng (Mễ phạn)", "Mì sợi kéo", "Bánh bao hấp", "Canh súp nóng"],
    explanation: "米饭 (mǐfàn - Hán Việt: Mễ phạn) là cơm nấu chín từ gạo."
  },
  {
    id: 76, hanzi: "下午", pinyin: "xiàwǔ", lesson: 8,
    correctAnswer: "Buổi chiều (Hạ ngọ)",
    options: ["Buổi chiều (Hạ ngọ)", "Buổi sáng sớm", "Buổi trưa chính", "Buổi tối đêm"],
    explanation: "下午 (xiàwǔ - Hán Việt: Hạ ngọ) là khoảng thời gian buổi chiều sau 12h trưa."
  },
  {
    id: 77, hanzi: "商店", pinyin: "shāngdiàn", lesson: 8,
    correctAnswer: "Cửa hàng / Tiệm (Thương điếm)",
    options: ["Cửa hàng / Tiệm (Thương điếm)", "Bệnh viện chữa", "Trường học viện", "Khách sạn lưu"],
    explanation: "商店 (shāngdiàn - Hán Việt: Thương điếm) là nơi bán hàng hóa, tiệm tạp hóa."
  },
  {
    id: 78, hanzi: "买", pinyin: "mǎi", lesson: 8,
    correctAnswer: "Mua / Mua sắm (Mãi)",
    options: ["Mua / Mua sắm (Mãi)", "Bán / Tiêu thụ (Mại)", "Tặng / Cho quà", "Mượn / Vay nợ"],
    explanation: "买 (mǎi - Hán Việt: Mãi, thanh 3) là đổi tiền lấy hàng (đối lập với 卖 - bán, mang thanh 4)."
  },
  {
    id: 79, hanzi: "杯子", pinyin: "bēizi", lesson: 8,
    correctAnswer: "Cái cốc / Cái ly (Bôi tử)",
    options: ["Cái cốc / Cái ly (Bôi tử)", "Cái bàn gỗ", "Cái ghế ngồi", "Quyển sách đọc"],
    explanation: "杯子 (bēizi - Hán Việt: Bôi tử) là cái cốc, ly để uống nước hoặc trà."
  },
  {
    id: 80, hanzi: "这", pinyin: "zhè", lesson: 8,
    correctAnswer: "Đây / Này (Giá - chỉ gần)",
    options: ["Đây / Này (Giá - chỉ gần)", "Kia / Đó (chỉ xa)", "Nào / Đâu (nghi vấn)", "Ai / Người nào"],
    explanation: "这 (zhè - Hán Việt: Giá) chỉ người hoặc vật ở gần người nói (đối lập với 那 - kia)."
  },

  // --- Bài 9: 你儿子在哪儿工作 (Con trai bạn làm việc ở đâu) ---
  {
    id: 81, hanzi: "小", pinyin: "xiǎo", lesson: 9,
    correctAnswer: "Nhỏ bé / Bé (Tiểu)",
    options: ["Nhỏ bé / Bé (Tiểu)", "To lớn / Đại", "Nhiều nhặn / Đa", "Ít ỏi / Thiểu"],
    explanation: "小 (xiǎo - Hán Việt: Tiểu) miêu tả kích thước nhỏ nhắn (đối lập với 大 - to lớn)."
  },
  {
    id: 82, hanzi: "猫", pinyin: "māo", lesson: 9,
    correctAnswer: "Con mèo (Miêu)",
    options: ["Con mèo (Miêu)", "Con chó trung thành", "Con chim trên cành", "Con cá dưới nước"],
    explanation: "猫 (māo - Hán Việt: Miêu) là con mèo nuôi trong nhà."
  },
  {
    id: 83, hanzi: "狗", pinyin: "gǒu", lesson: 9,
    correctAnswer: "Con chó (Cẩu)",
    options: ["Con chó (Cẩu)", "Con mèo kêu meo", "Con gà gáy sáng", "Con heo trong chuồng"],
    explanation: "狗 (gǒu - Hán Việt: Cẩu) là loài chó trung thành."
  },
  {
    id: 84, hanzi: "椅子", pinyin: "yǐzi", lesson: 9,
    correctAnswer: "Cái ghế (Kỷ tử)",
    options: ["Cái ghế (Kỷ tử)", "Cái bàn học", "Cái giường ngủ", "Cái tủ đựng"],
    explanation: "椅子 (yǐzi - Hán Việt: Kỷ tử) là đồ dùng nội thất để ngồi."
  },
  {
    id: 85, hanzi: "哪儿", pinyin: "nǎr", lesson: 9,
    correctAnswer: "Ở đâu / Chỗ nào",
    options: ["Ở đâu / Chỗ nào", "Ở đây chốn này", "Ở kia chốn nọ", "Bao giờ thời gian"],
    explanation: "哪儿 (nǎr) là đại từ nghi vấn hỏi về vị trí nơi chốn (= 哪里)."
  },
  {
    id: 86, hanzi: "工作", pinyin: "gōngzuò", lesson: 9,
    correctAnswer: "Công tác / Làm việc (Công tác)",
    options: ["Công tác / Làm việc (Công tác)", "Học tập rèn luyện", "Nghỉ ngơi an dưỡng", "Mua sắm tiêu xài"],
    explanation: "工作 (gōngzuò - Hán Việt: Công tác) vừa là danh từ (công việc) vừa là động từ (làm việc)."
  },
  {
    id: 87, hanzi: "医院", pinyin: "yīyuàn", lesson: 9,
    correctAnswer: "Bệnh viện (Y viện)",
    options: ["Bệnh viện (Y viện)", "Trường học viện", "Cửa hàng buôn", "Nhà thuốc tây"],
    explanation: "医院 (yīyuàn - Hán Việt: Y viện) là cơ sở khám và chữa bệnh."
  },
  {
    id: 88, hanzi: "医生", pinyin: "yīshēng", lesson: 9,
    correctAnswer: "Bác sĩ (Y sinh)",
    options: ["Bác sĩ (Y sinh)", "Giáo viên giảng dạy", "Học sinh đi học", "Y tá chăm sóc"],
    explanation: "医生 (yīshēng - Hán Việt: Y sinh) là người thầy thuốc chữa bệnh."
  },
  {
    id: 89, hanzi: "爸爸", pinyin: "bàba", lesson: 9,
    correctAnswer: "Bố / Ba / Cha (Phụ thân)",
    options: ["Bố / Ba / Cha (Phụ thân)", "Mẹ / Má mẫu thân", "Anh trai ruột", "Thầy giáo tôn kính"],
    explanation: "爸爸 (bàba) nghĩa là bố, cha trong gia đình."
  },
  {
    id: 90, hanzi: "多少", pinyin: "duōshao", lesson: 9,
    correctAnswer: "Bao nhiêu (Đa thiểu)",
    options: ["Bao nhiêu (Đa thiểu)", "Mấy giờ trong ngày", "Cái nào lựa chọn", "Ở đâu vị trí"],
    explanation: "多少 (duōshao - Hán Việt: Đa thiểu) dùng để hỏi số lượng hoặc hỏi giá tiền (多少钱: bao nhiêu tiền)."
  },

  // --- Bài 10: 我能坐这儿吗 (Tôi có thể ngồi đây không) ---
  {
    id: 91, hanzi: "桌子", pinyin: "zhuōzi", lesson: 10,
    correctAnswer: "Cái bàn (Trác tử)",
    options: ["Cái bàn (Trác tử)", "Cái ghế ngồi", "Cái giường nằm", "Cái cốc uống"],
    explanation: "桌子 (zhuōzi - Hán Việt: Trác tử) là cái bàn để học tập, làm việc hoặc ăn cơm."
  },
  {
    id: 92, hanzi: "电脑", pinyin: "diànnǎo", lesson: 10,
    correctAnswer: "Máy vi tính (Điện não)",
    options: ["Máy vi tính (Điện não)", "Vô tuyến ti-vi", "Điện thoại cầm tay", "Đồng hồ xem giờ"],
    explanation: "电脑 (diànnǎo - Hán Việt: Điện não: bộ não điện tử) nghĩa là máy tính."
  },
  {
    id: 93, hanzi: "和", pinyin: "hé", lesson: 10,
    correctAnswer: "Và / Cùng (Hòa)",
    options: ["Và / Cùng (Hòa)", "Hoặc / Hay là", "Nhưng / Song le", "Vì / Do bởi"],
    explanation: "和 (hé - Hán Việt: Hòa) là liên từ nối hai danh từ hoặc đại từ (Ví dụ: 我和他 - tôi và anh ấy)."
  },
  {
    id: 94, hanzi: "本", pinyin: "běn", lesson: 10,
    correctAnswer: "Cuốn / Quyển (Bổn - lượng từ sách vở)",
    options: ["Cuốn / Quyển (Bổn - lượng từ sách vở)", "Cái / Chiếc (Cá)", "Miếng / Mảnh (Khối)", "Chiếc xe cộ (Lượng)"],
    explanation: "本 (běn - Hán Việt: Bổn) là lượng từ dùng cho sách, vở (Ví dụ: 一本书 - một cuốn sách)."
  },
  {
    id: 95, hanzi: "里", pinyin: "lǐ", lesson: 10,
    correctAnswer: "Bên trong / Trong (Lý)",
    options: ["Bên trong / Trong (Lý)", "Bên ngoài chốn ngoài", "Phía trước đằng trước", "Phía sau đằng sau"],
    explanation: "里 (lǐ - Hán Việt: Lý) là phương vị từ chỉ phía trong (Ví dụ: 家里 - trong nhà, 学校里 - trong trường)."
  },
  {
    id: 96, hanzi: "前面", pinyin: "qiánmiàn", lesson: 10,
    correctAnswer: "Phía trước / Đằng trước (Tiền diện)",
    options: ["Phía trước / Đằng trước (Tiền diện)", "Phía sau đằng sau", "Bên trong phía trong", "Bên cạnh sát bên"],
    explanation: "前面 (qiánmiàn - Hán Việt: Tiền diện) chỉ vị trí phía trước mặt (đối lập với 后面)."
  },
  {
    id: 97, hanzi: "后面", pinyin: "hòumiàn", lesson: 10,
    correctAnswer: "Phía sau / Đằng sau (Hậu diện)",
    options: ["Phía sau / Đằng sau (Hậu diện)", "Phía trước đằng trước", "Bên trong phía trong", "Bên ngoài phía ngoài"],
    explanation: "后面 (hòumiàn - Hán Việt: Hậu diện) chỉ vị trí phía sau lưng (đối lập với 前面)."
  },
  {
    id: 98, hanzi: "没有", pinyin: "méiyǒu", lesson: 10,
    correctAnswer: "Không có / Chưa (Một hữu)",
    options: ["Không có / Chưa (Một hữu)", "Đang có sở hữu", "Có thể khả thi", "Bắt buộc cần thiết"],
    explanation: "没有 (méiyǒu - Hán Việt: Một hữu) phủ định sự sở hữu hoặc hành động trong quá khứ."
  },
  {
    id: 99, hanzi: "能", pinyin: "néng", lesson: 10,
    correctAnswer: "Có thể / Năng lực (Năng)",
    options: ["Có thể / Năng lực (Năng)", "Không thể bó tay", "Bắt buộc phải làm", "Muốn có nguyện vọng"],
    explanation: "能 (néng - Hán Việt: Năng) biểu thị khả năng hoặc điều kiện cho phép (Ví dụ: 我能坐这儿吗 - Tôi có thể ngồi đây không?)."
  },
  {
    id: 100, hanzi: "坐", pinyin: "zuò", lesson: 10,
    correctAnswer: "Ngồi / Đi xe (Tọa)",
    options: ["Ngồi / Đi xe (Tọa)", "Đứng vững vàng", "Chạy thật nhanh", "Nằm nghỉ ngơi"],
    explanation: "坐 (zuò - Hán Việt: Tọa) nghĩa là ngồi xuống (请坐) hoặc đi bằng phương tiện giao thông (坐飞机)."
  },

  // --- Bài 11: 现在几点 (Bây giờ mấy giờ) ---
  {
    id: 101, hanzi: "现在", pinyin: "xiànzài", lesson: 11,
    correctAnswer: "Hiện tại / Bây giờ (Hiện tại)",
    options: ["Hiện tại / Bây giờ (Hiện tại)", "Hôm nay kim thiên", "Lúc trước quá khứ", "Sau này tương lai"],
    explanation: "现在 (xiànzài - Hán Việt: Hiện tại) chỉ thời điểm ngay lúc này (Ví dụ: 现在几点 - bây giờ là mấy giờ?)."
  },
  {
    id: 102, hanzi: "点", pinyin: "diǎn", lesson: 11,
    correctAnswer: "Giờ / Chút ít (Điểm)",
    options: ["Giờ / Chút ít (Điểm)", "Phút / Giây lát", "Năm / Mùa vụ", "Tháng / Tuần lễ"],
    explanation: "点 (diǎn - Hán Việt: Điểm) dùng để nói giờ trong ngày (八点: 8 giờ) hoặc một chút (一点儿)."
  },
  {
    id: 103, hanzi: "分钟", pinyin: "fēnzhōng", lesson: 11,
    correctAnswer: "Phút (Phân chung)",
    options: ["Phút (Phân chung)", "Giờ đồng hồ", "Giây ngắn ngủi", "Ngày tròn vẹn"],
    explanation: "分钟 (fēnzhōng - Hán Việt: Phân chung) chỉ khoảng thời gian tính bằng phút (Ví dụ: 五分钟 - 5 phút)."
  },
  {
    id: 104, hanzi: "中午", pinyin: "zhōngwǔ", lesson: 11,
    correctAnswer: "Buổi trưa (Trung ngọ)",
    options: ["Buổi trưa (Trung ngọ)", "Buổi sáng sớm", "Buổi chiều tà", "Buổi tối đêm"],
    explanation: "中午 (zhōngwǔ - Hán Việt: Trung ngọ) là thời điểm chính giữa ngày khoảng 11h30 - 13h00."
  },
  {
    id: 105, hanzi: "时候", pinyin: "shíhou", lesson: 11,
    correctAnswer: "Lúc / Khi / Khoảng thời gian (Thời hậu)",
    options: ["Lúc / Khi / Khoảng thời gian (Thời hậu)", "Nơi chốn vị trí", "Lý do nguyên cớ", "Đồ vật khí cụ"],
    explanation: "时候 (shíhou - Hán Việt: Thời hậu) chỉ khoảnh khắc hoặc khoảng thời gian (...的时候: lúc/khi...)."
  },
  {
    id: 106, hanzi: "回", pinyin: "huí", lesson: 11,
    correctAnswer: "Về / Trở về (Hồi)",
    options: ["Về / Trở về (Hồi)", "Đi đến nơi khác", "Đến phía trước", "Ở tại vị trí"],
    explanation: "回 (huí - Hán Việt: Hồi) là động từ trở về nơi cũ (Ví dụ: 回家 - về nhà, 回国 - về nước)."
  },
  {
    id: 107, hanzi: "我们", pinyin: "wǒmen", lesson: 11,
    correctAnswer: "Chúng tôi / Chúng ta (Ngã môn)",
    options: ["Chúng tôi / Chúng ta (Ngã môn)", "Các bạn các anh", "Bọn họ tha môn", "Mọi người đại gia"],
    explanation: "我们 (wǒmen - Hán Việt: Ngã môn) là đại từ nhân xưng ngôi thứ nhất số nhiều."
  },
  {
    id: 108, hanzi: "电影", pinyin: "diànyǐng", lesson: 11,
    correctAnswer: "Điện ảnh / Phim truyện",
    options: ["Điện ảnh / Phim truyện", "Tivi truyền hình", "Sách báo tạp chí", "Âm nhạc bài ca"],
    explanation: "电影 (diànyǐng - Hán Việt: Điện ảnh) là bộ phim chiếu rạp hoặc phim truyện."
  },
  {
    id: 109, hanzi: "住", pinyin: "zhù", lesson: 11,
    correctAnswer: "Trú / Ở / Cư ngụ (Trú)",
    options: ["Trú / Ở / Cư ngụ (Trú)", "Rời đi nơi khác", "Làm việc công tác", "Học tập trường lớp"],
    explanation: "住 (zhù - Hán Việt: Trú) là động từ sinh sống, cư ngụ tại một địa điểm (Ví dụ: 住北京 - sống ở Bắc Kinh)."
  },
  {
    id: 110, hanzi: "上", pinyin: "shàng", lesson: 11,
    correctAnswer: "Bên trên / Lên (Thượng)",
    options: ["Bên trên / Lên (Thượng)", "Bên dưới xuống (Hạ)", "Bên trong vào (Lý)", "Bên ngoài ra (Ngoại)"],
    explanation: "上 (shàng - Hán Việt: Thượng) chỉ vị trí bên trên hoặc hành động đi lên (Ví dụ: 桌子上 - trên bàn, 上课 - vào học)."
  },

  // --- Bài 12: 明天天气怎么样 (Thời tiết ngày mai thế nào) ---
  {
    id: 111, hanzi: "天气", pinyin: "tiānqì", lesson: 12,
    correctAnswer: "Thời tiết / Khí trời (Thiên khí)",
    options: ["Thời tiết / Khí trời (Thiên khí)", "Thời gian năm tháng", "Không khí hít thở", "Nhiệt độ nóng lạnh"],
    explanation: "天气 (tiānqì - Hán Việt: Thiên khí) chỉ trạng thái nắng, mưa, nóng, lạnh (今天天气很好 - Hôm nay thời tiết rất tốt)."
  },
  {
    id: 112, hanzi: "怎么样", pinyin: "zěnmeyàng", lesson: 12,
    correctAnswer: "Thế nào / Ra sao / Như thế nào",
    options: ["Thế nào / Ra sao / Như thế nào", "Bao nhiêu số lượng", "Ở đâu nơi chốn", "Làm gì hành động"],
    explanation: "怎么样 (zěnmeyàng) dùng hỏi về tính chất, tình hình hoặc trưng cầu ý kiến người khác."
  },
  {
    id: 113, hanzi: "太", pinyin: "tài", lesson: 12,
    correctAnswer: "Quá / Lắm (Thái - mức độ cao)",
    options: ["Quá / Lắm (Thái - mức độ cao)", "Không hề phủ định", "Một chút ít ỏi", "Bình thường vừa phải"],
    explanation: "太 (tài - Hán Việt: Thái) biểu thị mức độ cao, thường đi cặp: 太……了 (Ví dụ: 太好了 - tốt quá rồi)."
  },
  {
    id: 114, hanzi: "热", pinyin: "rè", lesson: 12,
    correctAnswer: "Nóng bức / Nhiệt (đối lập với 冷)",
    options: ["Nóng bức / Nhiệt (đối lập với 冷)", "Lạnh lẽo buốt giá", "Ấm áp dễ chịu", "Mát mẻ sảng khoái"],
    explanation: "热 (rè - Hán Việt: Nhiệt) miêu tả thời tiết hoặc nhiệt độ cao, nóng bức."
  },
  {
    id: 115, hanzi: "冷", pinyin: "lěng", lesson: 12,
    correctAnswer: "Lạnh lẽo / Lãnh (đối lập với 热)",
    options: ["Lạnh lẽo / Lãnh (đối lập với 热)", "Nóng bức oi ả", "Ấm áp mùa xuân", "Mát mẻ mùa thu"],
    explanation: "冷 (lěng - Hán Việt: Lãnh) miêu tả nhiệt độ thấp, thời tiết giá lạnh."
  },
  {
    id: 116, hanzi: "下雨", pinyin: "xiàyǔ", lesson: 12,
    correctAnswer: "Đổ mưa / Trời mưa (Hạ vũ)",
    options: ["Đổ mưa / Trời mưa (Hạ vũ)", "Trời nắng quang đãng", "Tuyết rơi trắng xóa", "Có gió giông bão"],
    explanation: "下雨 (xiàyǔ - Hán Việt: Hạ vũ) miêu tả hiện tượng mưa rơi từ bầu trời (雨: mưa)."
  },
  {
    id: 117, hanzi: "小姐", pinyin: "xiǎojiě", lesson: 12,
    correctAnswer: "Cô gái / Tiểu thư (cách gọi lịch sự)",
    options: ["Cô gái / Tiểu thư (cách gọi lịch sự)", "Quý ông tiên sinh", "Người mẹ mẫu thân", "Con gái nữ nhi"],
    explanation: "小姐 (xiǎojiě - Hán Việt: Tiểu thư) là danh xưng lịch sự dành cho phụ nữ trẻ tuổi (Ví dụ: 李小姐 - cô Lý)."
  },
  {
    id: 118, hanzi: "来", pinyin: "lái", lesson: 12,
    correctAnswer: "Đến / Tới / Lại (hướng người nói)",
    options: ["Đến / Tới / Lại (hướng người nói)", "Đi xa vị trí (Khứ)", "Trở về chốn cũ (Hồi)", "Ở lại chỗ này (Trú)"],
    explanation: "来 (lái - Hán Việt: Lai) chỉ chuyển động hướng về phía người nói (đối lập với 去 - đi)."
  },
  {
    id: 119, hanzi: "些", pinyin: "xiē", lesson: 12,
    correctAnswer: "Một vài / Một số / Chút ít",
    options: ["Một vài / Một số / Chút ít", "Tất cả toàn bộ", "Rất nhiều vô kể", "Một cái duy nhất"],
    explanation: "些 (xiē) là lượng từ biểu thị số lượng không xác định (Ví dụ: 这些 - những cái này, 一些 - một số/một ít)."
  },
  {
    id: 120, hanzi: "水", pinyin: "shuǐ", lesson: 12,
    correctAnswer: "Nước / Chất lỏng (Thủy)",
    options: ["Nước / Chất lỏng (Thủy)", "Lửa / Hỏa ngọn", "Đất / Thổ đai", "Gió / Phong lộng"],
    explanation: "水 (shuǐ - Hán Việt: Thủy) là nước uống hoặc chất lỏng nói chung (喝水: uống nước)."
  },

  // --- Bài 13: 他在学做中国菜呢 (Anh ấy đang học nấu món ăn Trung Quốc) ---
  {
    id: 121, hanzi: "喂", pinyin: "wèi", lesson: 13,
    correctAnswer: "A-lô / Này (Úy - thán từ bắt máy)",
    options: ["A-lô / Này (Úy - thán từ bắt máy)", "Xin chào gặp mặt", "Tạm biệt chia tay", "Cảm ơn giúp đỡ"],
    explanation: "喂 (wèi - Hán Việt: Úy) là thán từ dùng khi bắt máy điện thoại tương tự như 'a-lô'."
  },
  {
    id: 122, hanzi: "上午", pinyin: "shàngwǔ", lesson: 13,
    correctAnswer: "Buổi sáng (Thượng ngọ - trước 12h)",
    options: ["Buổi sáng (Thượng ngọ - trước 12h)", "Buổi chiều sau trưa", "Buổi tối đêm khuya", "Buổi trưa chính ngọ"],
    explanation: "上午 (shàngwǔ - Hán Việt: Thượng ngọ) là khoảng thời gian buổi sáng trước 12h trưa."
  },
  {
    id: 123, hanzi: "睡觉", pinyin: "shuìjiào", lesson: 13,
    correctAnswer: "Đi ngủ / Giấc ngủ (Thụy giác)",
    options: ["Đi ngủ / Giấc ngủ (Thụy giác)", "Thức dậy sớm mai", "Tắm gội sạch sẽ", "Ăn cơm trưa tối"],
    explanation: "睡觉 (shuìjiào - Hán Việt: Thụy giác) là hành động đi ngủ nghỉ ngơi."
  },
  {
    id: 124, hanzi: "电视", pinyin: "diànshì", lesson: 13,
    correctAnswer: "Vô tuyến / Tivi (Điện thị)",
    options: ["Vô tuyến / Tivi (Điện thị)", "Điện ảnh phim rạp", "Máy vi tính để bàn", "Điện thoại cầm tay"],
    explanation: "电视 (diànshì - Hán Việt: Điện thị) là ti-vi, truyền hình vô tuyến."
  },
  {
    id: 125, hanzi: "喜欢", pinyin: "xǐhuan", lesson: 13,
    correctAnswer: "Yêu thích / Thích thú (Hỉ hoan)",
    options: ["Yêu thích / Thích thú (Hỉ hoan)", "Chán ghét xa lánh", "Mong muốn cần có", "Quên mất lãng quên"],
    explanation: "喜欢 (xǐhuan - Hán Việt: Hỉ hoan) biểu thị sự yêu mến, thích thú (Ví dụ: 我喜欢汉语)."
  },
  {
    id: 126, hanzi: "打电话", pinyin: "dǎ diànhuà", lesson: 13,
    correctAnswer: "Gọi điện thoại (Đả điện thoại)",
    options: ["Gọi điện thoại (Đả điện thoại)", "Xem tivi giải trí", "Nghe bài hát hay", "Nói chuyện trực tiếp"],
    explanation: "打电话 (dǎ diànhuà - Hán Việt: Đả điện thoại) là quay số/bấm máy gọi điện thoại."
  },
  {
    id: 127, hanzi: "下", pinyin: "xià", lesson: 13,
    correctAnswer: "Bên dưới / Xuống (Hạ)",
    options: ["Bên dưới / Xuống (Hạ)", "Bên trên lên (Thượng)", "Bên trong vào (Lý)", "Bên ngoài ra (Ngoại)"],
    explanation: "下 (xià - Hán Việt: Hạ) chỉ vị trí bên dưới hoặc hướng chuyển động đi xuống (đối lập với 上)."
  },
  {
    id: 128, hanzi: "钱", pinyin: "qián", lesson: 13,
    correctAnswer: "Tiền bạc / Tiền tệ (Tiền)",
    options: ["Tiền bạc / Tiền tệ (Tiền)", "Thời gian giờ giấc", "Sách vở tri thức", "Quần áo may mặc"],
    explanation: "钱 (qián - Hán Việt: Tiền) là tiền tệ dùng trong giao thương (Ví dụ: 多少钱 - bao nhiêu tiền)."
  },
  {
    id: 129, hanzi: "块", pinyin: "kuài", lesson: 13,
    correctAnswer: "Đồng tiền / Mảnh / Khối (lượng từ tiền tệ)",
    options: ["Đồng tiền / Mảnh / Khối (lượng từ tiền tệ)", "Phút giây thời gian", "Quyển sách tập san", "Chiếc xe cộ máy"],
    explanation: "块 (kuài - Hán Việt: Khối) dùng chỉ đơn vị tiền tệ khẩu ngữ (tệ/đồng) hoặc một mẩu, một khối."
  },
  {
    id: 130, hanzi: "那", pinyin: "nà", lesson: 13,
    correctAnswer: "Kia / Đó (Nặc - chỉ xa)",
    options: ["Kia / Đó (Nặc - chỉ xa)", "Đây / Này (chỉ gần)", "Nào / Đâu (nghi vấn)", "Ai / Người nào"],
    explanation: "那 (nà - Hán Việt: Nặc) dùng chỉ người hoặc vật ở xa người nói (đối lập với 这 - đây)."
  },

  // --- Bài 14: 她买了不少衣服 (Cô ấy mua không ít quần áo) ---
  {
    id: 131, hanzi: "东西", pinyin: "dōngxi", lesson: 14,
    correctAnswer: "Đồ đạc / Đồ vật (Đông tây)",
    options: ["Đồ đạc / Đồ vật (Đông tây)", "Phương hướng la bàn", "Quần áo mặc ngoài", "Thức ăn bữa ăn"],
    explanation: "东西 (dōngxi - Hán Việt: Đông tây) nghĩa bóng là đồ đạc, đồ vật nói chung (买东西: mua sắm đồ)."
  },
  {
    id: 132, hanzi: "一点儿", pinyin: "yìdiǎnr", lesson: 14,
    correctAnswer: "Một chút / Một ít (Nhất điểm nhi)",
    options: ["Một chút / Một ít (Nhất điểm nhi)", "Rất nhiều phong phú", "Tất cả toàn vẹn", "Bao nhiêu số lượng"],
    explanation: "一点儿 (yìdiǎnr - Hán Việt: Nhất điểm nhi) biểu thị số lượng nhỏ (吃一点儿: ăn một chút)."
  },
  {
    id: 133, hanzi: "苹果", pinyin: "píngguǒ", lesson: 14,
    correctAnswer: "Quả táo (Bình quả)",
    options: ["Quả táo (Bình quả)", "Quả cam mọng nước", "Quả chuối tiêu vàng", "Quả dưa hấu mát"],
    explanation: "苹果 (píngguǒ - Hán Việt: Bình quả) là loại quả táo tây ăn được."
  },
  {
    id: 134, hanzi: "看见", pinyin: "kànjiàn", lesson: 14,
    correctAnswer: "Trông thấy / Nhìn thấy (Khán kiến)",
    options: ["Trông thấy / Nhìn thấy (Khán kiến)", "Lắng nghe tai nghe", "Gặp gỡ tương ngộ", "Nghĩ tới nhớ nhung"],
    explanation: "看见 (kànjiàn - Hán Việt: Khán kiến) là bổ ngữ kết quả, biểu thị kết quả mắt nhìn và thấy được đối tượng."
  },
  {
    id: 135, hanzi: "先生", pinyin: "xiānsheng", lesson: 14,
    correctAnswer: "Tiên sinh / Quý ông / Chồng",
    options: ["Tiên sinh / Quý ông / Chồng", "Tiểu thư quý cô", "Bác sĩ chữa bệnh", "Thầy giáo trường học"],
    explanation: "先生 (xiānsheng - Hán Việt: Tiên sinh) là danh xưng lịch sự dành cho phái nam hoặc gọi chồng."
  },
  {
    id: 136, hanzi: "开", pinyin: "kāi", lesson: 14,
    correctAnswer: "Mở / Lái xe / Họp (Khai)",
    options: ["Mở / Lái xe / Họp (Khai)", "Đóng / Dừng xe (Bế)", "Ngồi / Chờ đợi (Tọa)", "Đi / Rời khỏi (Khứ)"],
    explanation: "开 (kāi - Hán Việt: Khai) có nhiều nghĩa: 开门 (mở cửa), 开车 (lái xe), 开会 (họp hành)."
  },
  {
    id: 137, hanzi: "漂亮", pinyin: "piàoliang", lesson: 14,
    correctAnswer: "Xinh đẹp / Đẹp đẽ (Phiêu lượng)",
    options: ["Xinh đẹp / Đẹp đẽ (Phiêu lượng)", "Xấu xí thô kệch", "Thông minh đĩnh ngộ", "Hiền lành chất phác"],
    explanation: "漂亮 (piàoliang - Hán Việt: Phiêu lượng) dùng khen ngợi ngoại hình người hoặc vẻ đẹp sự vật."
  },
  {
    id: 138, hanzi: "少", pinyin: "shǎo", lesson: 14,
    correctAnswer: "Ít ỏi / Thiếu (Thiểu - đối lập với 多)",
    options: ["Ít ỏi / Thiếu (Thiểu - đối lập với 多)", "Nhiều nhặn đa số", "To lớn khổng lồ", "Bé nhỏ li ti"],
    explanation: "少 (shǎo - Hán Việt: Thiểu) chỉ số lượng ít (Ví dụ: 不少: không ít, nhiều)."
  },
  {
    id: 139, hanzi: "都", pinyin: "dōu", lesson: 14,
    correctAnswer: "Đều / Tất cả (Đô - phó từ bao quát)",
    options: ["Đều / Tất cả (Đô - phó từ bao quát)", "Rất nhiều mức độ", "Không hề phủ định", "Cũng vậy tương đồng"],
    explanation: "都 (dōu - Hán Việt: Đô) là phó từ chỉ tổng thể: mọi người/mọi thứ đều (我们都很好 - chúng tôi đều khỏe)."
  },
  {
    id: 140, hanzi: "衣服", pinyin: "yīfu", lesson: 14,
    correctAnswer: "Y phục / Quần áo",
    options: ["Y phục / Quần áo", "Giày dép đi chân", "Mũ nón đội đầu", "Túi xách xách tay"],
    explanation: "衣服 (yīfu - Hán Việt: Y phục) chỉ trang phục quần áo may mặc mặc trên người."
  },

  // --- Bài 15: 我是坐飞机来的 (Tôi đi máy bay đến) ---
  {
    id: 141, hanzi: "年", pinyin: "nián", lesson: 15,
    correctAnswer: "Năm (Niên - đơn vị thời gian)",
    options: ["Năm (Niên - đơn vị thời gian)", "Tháng trong năm (Nguyệt)", "Ngày trong tháng (Nhật)", "Giờ trong ngày (Điểm)"],
    explanation: "年 (nián - Hán Việt: Niên) chỉ năm (Ví dụ: 今年 - năm nay, 去年 - năm ngoái, 明年 - năm sau)."
  },
  {
    id: 142, hanzi: "饭店", pinyin: "fàndiàn", lesson: 15,
    correctAnswer: "Nhà hàng / Khách sạn (Phạn điếm)",
    options: ["Nhà hàng / Khách sạn (Phạn điếm)", "Bệnh viện khám chữa", "Trường học viện đào tạo", "Cửa hàng bán lẻ"],
    explanation: "饭店 (fàndiàn - Hán Việt: Phạn điếm) là nơi ăn uống (nhà hàng) hoặc khách sạn lưu trú."
  },
  {
    id: 143, hanzi: "出租车", pinyin: "chūzūchē", lesson: 15,
    correctAnswer: "Xe taxi / Xe thuê (Xuất tô xa)",
    options: ["Xe taxi / Xe thuê (Xuất tô xa)", "Máy bay phi cơ", "Xe buýt công cộng", "Tàu hỏa hỏa xa"],
    explanation: "出租车 (chūzūchē - Hán Việt: Xuất tô xa) là xe taxi (xe cho thuê)."
  },
  {
    id: 144, hanzi: "一起", pinyin: "yìqǐ", lesson: 15,
    correctAnswer: "Cùng nhau (Nhất khởi)",
    options: ["Cùng nhau (Nhất khởi)", "Một mình đơn độc", "Trước tiên mở đầu", "Sau đó tiếp nối"],
    explanation: "一起 (yìqǐ - Hán Việt: Nhất khởi) là phó từ chỉ sự kết hợp cùng làm gì (Ví dụ: 一起去 - cùng nhau đi)."
  },
  {
    id: 145, hanzi: "高兴", pinyin: "gāoxìng", lesson: 15,
    correctAnswer: "Vui vẻ / Phấn khởi (Cao hứng)",
    options: ["Vui vẻ / Phấn khởi (Cao hứng)", "Buồn bã đau xót", "Tức giận phẫn nộ", "Mệt mỏi kiệt sức"],
    explanation: "高兴 (gāoxìng - Hán Việt: Cao hứng) miêu tả tâm trạng vui mừng, phấn chấn (很高兴认识你)."
  },
  {
    id: 146, hanzi: "听", pinyin: "tīng", lesson: 15,
    correctAnswer: "Lắng nghe / Thính (tiếp nhận âm thanh)",
    options: ["Lắng nghe / Thính (tiếp nhận âm thanh)", "Phát biểu ý kiến", "Đọc to sách báo", "Nhìn ngắm quang cảnh"],
    explanation: "听 (tīng - Hán Việt: Thính) là hành động lắng nghe bằng tai (Ví dụ: 听音乐 - nghe nhạc)."
  },
  {
    id: 147, hanzi: "飞机", pinyin: "fēijī", lesson: 15,
    correctAnswer: "Phi cơ / Máy bay",
    options: ["Phi cơ / Máy bay", "Xe taxi bốn bánh", "Tàu hỏa đường sắt", "Xe buýt tuyến đường"],
    explanation: "飞机 (fēijī - Hán Việt: Phi cơ: cỗ máy bay lượn) là phương tiện hàng không máy bay."
  },
  {
    id: 148, hanzi: "爱", pinyin: "ài", lesson: 15,
    correctAnswer: "Yêu thương / Ái (yêu thích)",
    options: ["Yêu thương / Ái (yêu thích)", "Chán ghét xa lánh", "Mua bán trao đổi", "Nói năng phát biểu"],
    explanation: "爱 (ài - Hán Việt: Ái) nghĩa là yêu hoặc thích ai đó/cái gì đó (Ví dụ: 我爱你 - Tôi yêu bạn)."
  },
  {
    id: 149, hanzi: "水果", pinyin: "shuǐguǒ", lesson: 15,
    correctAnswer: "Hoa quả / Trái cây (Thủy quả)",
    options: ["Hoa quả / Trái cây (Thủy quả)", "Rau xanh củ cải", "Món ăn bữa chính", "Nước khoáng đóng chai"],
    explanation: "水果 (shuǐguǒ - Hán Việt: Thủy quả) chỉ các loại quả trái cây ngọt lành ăn được."
  },
  {
    id: 150, hanzi: "怎么", pinyin: "zěnme", lesson: 15,
    correctAnswer: "Làm sao / Thế nào / Sao lại (phương thức/nguyên nhân)",
    options: ["Làm sao / Thế nào / Sao lại (phương thức/nguyên nhân)", "Ở đâu vị trí chốn", "Bao nhiêu số lượng tiền", "Cái gì đồ vật sự việc"],
    explanation: "怎么 (zěnme) dùng hỏi phương thức hành động (怎么去: đi như thế nào) hoặc nguyên do (你怎么了: bạn làm sao vậy)."
  }
];

// Rebuild build-data.ts
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

export const rawVocab: VocabDef[] = ` + JSON.stringify(HSK1_RAW, null, 2) + `;

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
console.log('Updated scripts/build-data.ts with lessons and Hán-Việt contextual meanings');
