import fs from 'fs';
import path from 'path';

interface VocabDef {
  id: number;
  hanzi: string;
  pinyin: string;
  correctAnswer: string;
  options: [string, string, string, string];
  explanation: string;
}

const rawVocab: VocabDef[] = [
  {
    id: 1,
    hanzi: "爱",
    pinyin: "ài",
    correctAnswer: "Thích / yêu",
    options: ["Thích / yêu", "Mua", "Nhìn / xem", "Nói"],
    explanation: "爱 (ài) có nghĩa là yêu hoặc thích ai đó/cái gì đó (Ví dụ: 我爱你 - Tôi yêu bạn)."
  },
  {
    id: 2,
    hanzi: "八",
    pinyin: "bā",
    correctAnswer: "Tám (số 8)",
    options: ["Tám (số 8)", "Bảy (số 7)", "Chín (số 9)", "Sáu (số 6)"],
    explanation: "八 (bā) là số 8 trong tiếng Trung, đồng âm gần với từ 'phát' (phát tài)."
  },
  {
    id: 3,
    hanzi: "爸爸",
    pinyin: "bàba",
    correctAnswer: "Bố / cha",
    options: ["Bố / cha", "Mẹ", "Con trai", "Thầy giáo"],
    explanation: "爸爸 (bàba) nghĩa là bố/cha. Từ lặp lại âm nhẹ ở âm thứ 2."
  },
  {
    id: 4,
    hanzi: "杯子",
    pinyin: "bēizi",
    correctAnswer: "Cốc / ly",
    options: ["Cốc / ly", "Bàn", "Ghế", "Sách"],
    explanation: "杯子 (bēizi) là cái cốc, cái ly dùng để uống nước hoặc trà."
  },
  {
    id: 5,
    hanzi: "北京",
    pinyin: "Běijīng",
    correctAnswer: "Bắc Kinh",
    options: ["Bắc Kinh", "Trung Quốc", "Thượng Hải", "Trường học"],
    explanation: "北京 (Běijīng) là thủ đô của Trung Quốc (Bắc: phía bắc, Kinh: kinh đô)."
  },
  {
    id: 6,
    hanzi: "本",
    pinyin: "běn",
    correctAnswer: "Cuốn / quyển (lượng từ cho sách)",
    options: ["Cuốn / quyển (lượng từ cho sách)", "Cái / chiếc (lượng từ chung)", "Miếng / đồng", "Quả / trái"],
    explanation: "本 (běn) là lượng từ dùng cho sách, vở, tạp chí (Ví dụ: 一本书 - một cuốn sách)."
  },
  {
    id: 7,
    hanzi: "不客气",
    pinyin: "bú kèqi",
    correctAnswer: "Không có gì / Đừng khách sáo",
    options: ["Không có gì / Đừng khách sáo", "Xin lỗi", "Cảm ơn", "Tạm biệt"],
    explanation: "不客气 (bú kèqi) dùng để đáp lại lời cảm ơn (谢谢) mang nghĩa đừng khách sáo."
  },
  {
    id: 8,
    hanzi: "不",
    pinyin: "bù",
    correctAnswer: "Không / chẳng",
    options: ["Không / chẳng", "Rất", "Đều", "Cũng"],
    explanation: "不 (bù) là phó từ phủ định, đứng trước động từ/tính từ (Ví dụ: 不好 - không tốt)."
  },
  {
    id: 9,
    hanzi: "菜",
    pinyin: "cài",
    correctAnswer: "Món ăn / rau",
    options: ["Món ăn / rau", "Cơm", "Trái cây", "Nước"],
    explanation: "菜 (cài) chỉ món ăn, thức ăn trên bàn hoặc các loại rau xanh."
  },
  {
    id: 10,
    hanzi: "茶",
    pinyin: "chá",
    correctAnswer: "Trà / chè",
    options: ["Trà / chè", "Nước", "Cơm", "Rượu"],
    explanation: "茶 (chá) là đồ uống trà truyền thống (Ví dụ: 喝茶 - uống trà)."
  },
  {
    id: 11,
    hanzi: "吃",
    pinyin: "chī",
    correctAnswer: "Ăn",
    options: ["Ăn", "Uống", "Ngủ", "Nói"],
    explanation: "吃 (chī) là hành động ăn thức ăn (Ví dụ: 吃饭 - ăn cơm)."
  },
  {
    id: 12,
    hanzi: "出租车",
    pinyin: "chūzūchē",
    correctAnswer: "Xe taxi",
    options: ["Xe taxi", "Máy bay", "Xe buýt", "Tàu hỏa"],
    explanation: "出租车 (chūzūchē) là xe taxi (xuất tô xa: xe cho thuê)."
  },
  {
    id: 13,
    hanzi: "打电话",
    pinyin: "dǎ diànhuà",
    correctAnswer: "Gọi điện thoại",
    options: ["Gọi điện thoại", "Xem tivi", "Nghe nhạc", "Nói chuyện"],
    explanation: "打电话 (dǎ diànhuà) là gọi điện thoại (dǎ: đánh/bấm, diànhuà: điện thoại)."
  },
  {
    id: 14,
    hanzi: "大",
    pinyin: "dà",
    correctAnswer: "Lớn / to",
    options: ["Lớn / to", "Nhỏ", "Nhiều", "Ít"],
    explanation: "大 (dà) miêu tả kích thước lớn, to (đối lập với 小 - xiǎo)."
  },
  {
    id: 15,
    hanzi: "的",
    pinyin: "de",
    correctAnswer: "Của (trợ từ sở hữu / định ngữ)",
    options: ["Của (trợ từ sở hữu / định ngữ)", "Và / cùng", "Ở / tại", "Đã (hoàn thành)"],
    explanation: "的 (de) kết nối định ngữ với trung tâm ngữ (Ví dụ: 我的书 - sách của tôi)."
  },
  {
    id: 16,
    hanzi: "点",
    pinyin: "diǎn",
    correctAnswer: "Giờ / điểm / chút",
    options: ["Giờ / điểm / chút", "Phút", "Năm", "Tháng"],
    explanation: "点 (diǎn) dùng để nói giờ trong ngày (Ví dụ: 八点 - 8 giờ) hoặc một chút (一点儿)."
  },
  {
    id: 17,
    hanzi: "电脑",
    pinyin: "diànnǎo",
    correctAnswer: "Máy tính",
    options: ["Máy tính", "Tivi", "Điện thoại", "Đồng hồ"],
    explanation: "电脑 (diànnǎo) nghĩa đen là 'não điện', tức máy vi tính."
  },
  {
    id: 18,
    hanzi: "电视",
    pinyin: "diànshì",
    correctAnswer: "Tivi / truyền hình",
    options: ["Tivi / truyền hình", "Phim ảnh", "Máy tính", "Điện thoại"],
    explanation: "电视 (diànshì) là ti-vi (truyền hình điện ảnh)."
  },
  {
    id: 19,
    hanzi: "电影",
    pinyin: "diànyǐng",
    correctAnswer: "Phim / điện ảnh",
    options: ["Phim / điện ảnh", "Tivi", "Sách", "Âm nhạc"],
    explanation: "电影 (diànyǐng) nghĩa là bộ phim chiếu rạp hoặc phim truyện."
  },
  {
    id: 20,
    hanzi: "东西",
    pinyin: "dōngxi",
    correctAnswer: "Đồ vật / thứ / đồ đạc",
    options: ["Đồ vật / thứ / đồ đạc", "Phương hướng", "Quần áo", "Thức ăn"],
    explanation: "东西 (dōngxi) chỉ đồ vật nói chung (Ví dụ: 买东西 - mua sắm đồ đạc)."
  },
  {
    id: 21,
    hanzi: "都",
    pinyin: "dōu",
    correctAnswer: "Đều / tất cả",
    options: ["Đều / tất cả", "Rất", "Không", "Cũng"],
    explanation: "都 (dōu) là phó từ chỉ tổng thể, mọi người/mọi thứ đều làm gì đó."
  },
  {
    id: 22,
    hanzi: "读",
    pinyin: "dú",
    correctAnswer: "Đọc",
    options: ["Đọc", "Viết", "Nói", "Nghe"],
    explanation: "读 (dú) là hành động đọc thành tiếng hoặc đọc sách (读书)."
  },
  {
    id: 23,
    hanzi: "对不起",
    pinyin: "duìbuqǐ",
    correctAnswer: "Xin lỗi",
    options: ["Xin lỗi", "Cảm ơn", "Không có chi", "Tạm biệt"],
    explanation: "对不起 (duìbuqǐ) dùng để bày tỏ lời xin lỗi một cách lịch sự."
  },
  {
    id: 24,
    hanzi: "多",
    pinyin: "duō",
    correctAnswer: "Nhiều",
    options: ["Nhiều", "Ít", "Lớn", "Nhỏ"],
    explanation: "多 (duō) chỉ số lượng phong phú, nhiều (đối lập với 少 - shǎo)."
  },
  {
    id: 25,
    hanzi: "多少",
    pinyin: "duōshao",
    correctAnswer: "Bao nhiêu",
    options: ["Bao nhiêu", "Mấy", "Cái nào", "Ở đâu"],
    explanation: "多少 (duōshao) dùng để hỏi số lượng từ 10 trở lên hoặc hỏi giá cả."
  },
  {
    id: 26,
    hanzi: "儿子",
    pinyin: "érzi",
    correctAnswer: "Con trai",
    options: ["Con trai", "Con gái", "Bố", "Học sinh"],
    explanation: "儿子 (érzi) là con trai trong quan hệ gia đình."
  },
  {
    id: 27,
    hanzi: "二",
    pinyin: "èr",
    correctAnswer: "Hai (số 2)",
    options: ["Hai (số 2)", "Một (số 1)", "Ba (số 3)", "Bốn (số 4)"],
    explanation: "二 (èr) là con số 2 trong tiếng Trung."
  },
  {
    id: 28,
    hanzi: "饭店",
    pinyin: "fàndiàn",
    correctAnswer: "Nhà hàng / khách sạn",
    options: ["Nhà hàng / khách sạn", "Bệnh viện", "Trường học", "Cửa hàng"],
    explanation: "饭店 (fàndiàn) là nơi ăn uống (nhà hàng) hoặc khách sạn lưu trú."
  },
  {
    id: 29,
    hanzi: "飞机",
    pinyin: "fēijī",
    correctAnswer: "Máy bay",
    options: ["Máy bay", "Xe taxi", "Tàu hỏa", "Xe buýt"],
    explanation: "飞机 (fēijī) nghĩa đen là 'phi cơ', phương tiện bay trên không."
  },
  {
    id: 30,
    hanzi: "分钟",
    pinyin: "fēnzhōng",
    correctAnswer: "Phút",
    options: ["Phút", "Giờ", "Giây", "Ngày"],
    explanation: "分钟 (fēnzhōng) chỉ khoảng thời gian tính bằng phút (Ví dụ: 五分钟 - 5 phút)."
  },
  {
    id: 31,
    hanzi: "高兴",
    pinyin: "gāoxìng",
    correctAnswer: "Vui vẻ / mừng rỡ",
    options: ["Vui vẻ / mừng rỡ", "Xinh đẹp", "Mệt mỏi", "Tức giận"],
    explanation: "高兴 (gāoxìng) miêu tả tâm trạng phấn khởi, vui mừng (很高兴认识你)."
  },
  {
    id: 32,
    hanzi: "个",
    pinyin: "gè",
    correctAnswer: "Cái / chiếc (lượng từ thông dụng)",
    options: ["Cái / chiếc (lượng từ thông dụng)", "Cuốn / quyển", "Miếng / đồng", "Con (động vật)"],
    explanation: "个 (gè) là lượng từ phổ biến nhất trong tiếng Trung (Ví dụ: 一个人 - một người)."
  },
  {
    id: 33,
    hanzi: "工作",
    pinyin: "gōngzuò",
    correctAnswer: "Công việc / làm việc",
    options: ["Công việc / làm việc", "Học tập", "Nghỉ ngơi", "Mua sắm"],
    explanation: "工作 (gōngzuò) vừa là danh từ (công việc) vừa là động từ (làm việc)."
  },
  {
    id: 34,
    hanzi: "狗",
    pinyin: "gǒu",
    correctAnswer: "Chó",
    options: ["Chó", "Mèo", "Chim", "Cá"],
    explanation: "狗 (gǒu) chỉ loài chó (thú cưng, động vật nuôi)."
  },
  {
    id: 35,
    hanzi: "汉语",
    pinyin: "Hànyǔ",
    correctAnswer: "Tiếng Hán / tiếng Trung",
    options: ["Tiếng Hán / tiếng Trung", "Chữ Hán", "Trung Quốc", "Người Trung"],
    explanation: "汉语 (Hànyǔ) là ngôn ngữ tiếng Hán/tiếng Trung Quốc."
  },
  {
    id: 36,
    hanzi: "好",
    pinyin: "hǎo",
    correctAnswer: "Tốt / đẹp / khỏe",
    options: ["Tốt / đẹp / khỏe", "Xấu / tồi", "Lớn", "Nhiều"],
    explanation: "好 (hǎo) mang ý nghĩa tốt lành, khỏe mạnh (Ví dụ: 你好 - chào bạn)."
  },
  {
    id: 37,
    hanzi: "号",
    pinyin: "hào",
    correctAnswer: "Số / ngày (trong tháng)",
    options: ["Số / ngày (trong tháng)", "Tháng", "Năm", "Tuần"],
    explanation: "号 (hào) dùng chỉ số nhà, số điện thoại hoặc ngày trong tháng (Ví dụ: 5号 - ngày 5)."
  },
  {
    id: 38,
    hanzi: "喝",
    pinyin: "hē",
    correctAnswer: "Uống",
    options: ["Uống", "Ăn", "Nói", "Nghe"],
    explanation: "喝 (hē) là động từ uống chất lỏng (Ví dụ: 喝水 - uống nước, 喝茶 - uống trà)."
  },
  {
    id: 39,
    hanzi: "和",
    pinyin: "hé",
    correctAnswer: "Và / cùng với",
    options: ["Và / cùng với", "Hoặc", "Nhưng", "Bởi vì"],
    explanation: "和 (hé) là liên từ nối hai danh từ hoặc đại từ (Ví dụ: 我和他 - tôi và anh ấy)."
  },
  {
    id: 40,
    hanzi: "很",
    pinyin: "hěn",
    correctAnswer: "Rất",
    options: ["Rất", "Quá", "Đều", "Không"],
    explanation: "很 (hěn) là phó từ chỉ mức độ cao (Ví dụ: 很好 - rất tốt)."
  },
  {
    id: 41,
    hanzi: "后面",
    pinyin: "hòumiàn",
    correctAnswer: "Phía sau / đằng sau",
    options: ["Phía sau / đằng sau", "Phía trước", "Bên trong", "Bên ngoài"],
    explanation: "后面 (hòumiàn) là phương vị từ chỉ vị trí phía sau (đối lập với 前面)."
  },
  {
    id: 42,
    hanzi: "回",
    pinyin: "huí",
    correctAnswer: "Về / quay lại",
    options: ["Về / quay lại", "Đi", "Đến", "Ở"],
    explanation: "回 (huí) là động từ trở về nơi cũ (Ví dụ: 回家 - về nhà)."
  },
  {
    id: 43,
    hanzi: "会",
    pinyin: "huì",
    correctAnswer: "Biết (qua học hỏi) / sẽ",
    options: ["Biết (qua học hỏi) / sẽ", "Muốn", "Thích", "Phải"],
    explanation: "会 (huì) biểu thị kỹ năng có được qua học tập hoặc khả năng sẽ xảy ra trong tương lai."
  },
  {
    id: 44,
    hanzi: "几",
    pinyin: "jǐ",
    correctAnswer: "Mấy (số lượng dưới 10)",
    options: ["Mấy (số lượng dưới 10)", "Bao nhiêu", "Cái nào", "Ở đâu"],
    explanation: "几 (jǐ) dùng để hỏi số lượng nhỏ dưới 10 (Ví dụ: 几个人 - mấy người)."
  },
  {
    id: 45,
    hanzi: "家",
    pinyin: "jiā",
    correctAnswer: "Nhà / gia đình",
    options: ["Nhà / gia đình", "Trường học", "Cửa hàng", "Bệnh viện"],
    explanation: "家 (jiā) là mái ấm gia đình hoặc ngôi nhà nơi mình sinh sống."
  },
  {
    id: 46,
    hanzi: "叫",
    pinyin: "jiào",
    correctAnswer: "Tên là / gọi là",
    options: ["Tên là / gọi là", "Là", "Hỏi", "Nói"],
    explanation: "叫 (jiào) dùng để giới thiệu tên gọi (Ví dụ: 你叫什么名字 - bạn tên là gì)."
  },
  {
    id: 47,
    hanzi: "今天",
    pinyin: "jīntiān",
    correctAnswer: "Hôm nay",
    options: ["Hôm nay", "Ngày mai", "Hôm qua", "Bây giờ"],
    explanation: "今天 (jīntiān) chỉ ngày hiện tại."
  },
  {
    id: 48,
    hanzi: "九",
    pinyin: "jiǔ",
    correctAnswer: "Chín (số 9)",
    options: ["Chín (số 9)", "Tám (số 8)", "Bảy (số 7)", "Sáu (số 6)"],
    explanation: "九 (jiǔ) là con số 9 trong tiếng Trung."
  },
  {
    id: 49,
    hanzi: "开",
    pinyin: "kāi",
    correctAnswer: "Mở / lái (xe) / bắt đầu",
    options: ["Mở / lái (xe) / bắt đầu", "Đóng", "Đi", "Dừng lại"],
    explanation: "开 (kāi) có nhiều nghĩa: 开门 (mở cửa), 开车 (lái xe), 开会 (họp)."
  },
  {
    id: 50,
    hanzi: "看",
    pinyin: "kàn",
    correctAnswer: "Xem / nhìn / ngắm",
    options: ["Xem / nhìn / ngắm", "Nghe", "Nói", "Đọc"],
    explanation: "看 (kàn) là động từ thị giác (Ví dụ: 看书 - đọc sách, 看电视 - xem tivi)."
  },
  {
    id: 51,
    hanzi: "看见",
    pinyin: "kànjiàn",
    correctAnswer: "Nhìn thấy",
    options: ["Nhìn thấy", "Nghe thấy", "Gặp mặt", "Nghĩ tới"],
    explanation: "看见 (kànjiàn) là bổ ngữ kết quả, biểu thị kết quả nhìn và thấy được đối tượng."
  },
  {
    id: 52,
    hanzi: "块",
    pinyin: "kuài",
    correctAnswer: "Đồng (tiền tệ) / miếng / cục",
    options: ["Đồng (tiền tệ) / miếng / cục", "Phút", "Quyển", "Chiếc"],
    explanation: "块 (kuài) dùng chỉ đơn vị tiền tệ khẩu ngữ (như tệ/đồng) hoặc một mảnh, một khối."
  },
  {
    id: 53,
    hanzi: "来",
    pinyin: "lái",
    correctAnswer: "Đến / tới",
    options: ["Đến / tới", "Đi", "Về", "Ở"],
    explanation: "来 (lái) chỉ chuyển động hướng về phía người nói (đối lập với 去 - đi xa)."
  },
  {
    id: 54,
    hanzi: "老师",
    pinyin: "lǎoshī",
    correctAnswer: "Giáo viên / thầy cô giáo",
    options: ["Giáo viên / thầy cô giáo", "Học sinh", "Bác sĩ", "Bạn bè"],
    explanation: "老师 (lǎoshī) là danh xưng tôn kính dành cho người dạy học."
  },
  {
    id: 55,
    hanzi: "了",
    pinyin: "le",
    correctAnswer: "Trợ từ biểu thị sự hoàn thành / biến chuyển",
    options: ["Trợ từ biểu thị sự hoàn thành / biến chuyển", "Trợ từ sở hữu", "Trợ từ nghi vấn", "Trợ từ ngữ khí ngữ điệu"],
    explanation: "了 (le) đặt sau động từ hoặc cuối câu để báo hiệu hành động đã xảy ra hoặc tình thế thay đổi."
  },
  {
    id: 56,
    hanzi: "冷",
    pinyin: "lěng",
    correctAnswer: "Lạnh",
    options: ["Lạnh", "Nóng", "Mát", "Ấm"],
    explanation: "冷 (lěng) miêu tả nhiệt độ thấp, thời tiết giá lạnh (đối lập với 热 - rè)."
  },
  {
    id: 57,
    hanzi: "里",
    pinyin: "lǐ",
    correctAnswer: "Trong / bên trong",
    options: ["Trong / bên trong", "Ngoài", "Trên", "Dưới"],
    explanation: "里 (lǐ) là từ chỉ vị trí phía trong (Ví dụ: 家里 - trong nhà, 学校里 - trong trường)."
  },
  {
    id: 58,
    hanzi: "六",
    pinyin: "liù",
    correctAnswer: "Sáu (số 6)",
    options: ["Sáu (số 6)", "Năm (số 5)", "Bảy (số 7)", "Tám (số 8)"],
    explanation: "六 (liù) là con số 6 trong tiếng Trung."
  },
  {
    id: 59,
    hanzi: "吗",
    pinyin: "ma",
    correctAnswer: "Không? (trợ từ câu hỏi)",
    options: ["Không? (trợ từ câu hỏi)", "Còn... thì sao?", "Đã", "Của"],
    explanation: "吗 (ma) đặt cuối câu trần thuật để biến câu thành câu hỏi yes/no (Ví dụ: 好吗 - tốt không?)."
  },
  {
    id: 60,
    hanzi: "妈妈",
    pinyin: "māma",
    correctAnswer: "Mẹ / má",
    options: ["Mẹ / má", "Bố", "Chị gái", "Con gái"],
    explanation: "妈妈 (māma) là tiếng gọi người mẹ thân thương."
  },
  {
    id: 61,
    hanzi: "买",
    pinyin: "mǎi",
    correctAnswer: "Mua",
    options: ["Mua", "Bán", "Ăn", "Xem"],
    explanation: "买 (mǎi) là hành động đổi tiền lấy hàng hóa (đối lập với 卖 - bán mang thanh 4)."
  },
  {
    id: 62,
    hanzi: "猫",
    pinyin: "māo",
    correctAnswer: "Mèo",
    options: ["Mèo", "Chó", "Chim", "Cá"],
    explanation: "猫 (māo) là con mèo (thú cưng phát âm meo meo)."
  },
  {
    id: 63,
    hanzi: "没关系",
    pinyin: "méi guānxi",
    correctAnswer: "Không sao / không có gì",
    options: ["Không sao / không có gì", "Xin lỗi", "Cảm ơn", "Không có chi"],
    explanation: "没关系 (méi guānxi) thường dùng để đáp lại câu xin lỗi (对不起)."
  },
  {
    id: 64,
    hanzi: "没有",
    pinyin: "méiyǒu",
    correctAnswer: "Không có / chưa",
    options: ["Không có / chưa", "Có", "Không phải", "Không cần"],
    explanation: "没有 (méiyǒu) phủ định sự sở hữu hoặc hành động trong quá khứ (không dùng 不有)."
  },
  {
    id: 65,
    hanzi: "米饭",
    pinyin: "mǐfàn",
    correctAnswer: "Cơm",
    options: ["Cơm", "Mì", "Rau", "Trái cây"],
    explanation: "米饭 (mǐfàn) là cơm nấu từ gạo (mǐ: gạo, fàn: thức ăn/cơm)."
  },
  {
    id: 66,
    hanzi: "名字",
    pinyin: "míngzi",
    correctAnswer: "Tên / danh xưng",
    options: ["Tên / danh xưng", "Chữ viết", "Tuổi", "Bạn bè"],
    explanation: "名字 (míngzi) nghĩa là tên gọi của một người hoặc sự vật."
  },
  {
    id: 67,
    hanzi: "明天",
    pinyin: "míngtiān",
    correctAnswer: "Ngày mai",
    options: ["Ngày mai", "Hôm nay", "Hôm qua", "Năm sau"],
    explanation: "明天 (míngtiān) là ngày kế tiếp ngày hôm nay (míng: sáng/rạng rỡ)."
  },
  {
    id: 68,
    hanzi: "哪",
    pinyin: "nǎ",
    correctAnswer: "Nào / cái nào",
    options: ["Nào / cái nào", "Kia / đó", "Ai", "Gì"],
    explanation: "哪 (nǎ) là đại từ nghi vấn chỉ sự lựa chọn (Ví dụ: 哪个人 - người nào)."
  },
  {
    id: 69,
    hanzi: "哪儿",
    pinyin: "nǎr",
    correctAnswer: "Ở đâu / chỗ nào",
    options: ["Ở đâu / chỗ nào", "Chỗ kia", "Chỗ này", "Bao giờ"],
    explanation: "哪儿 (nǎr) là đại từ hỏi về nơi chốn, vị trí (bằng nghĩa với 哪里)."
  },
  {
    id: 70,
    hanzi: "那",
    pinyin: "nà",
    correctAnswer: "Đó / kia (chỉ nơi xa)",
    options: ["Đó / kia (chỉ nơi xa)", "Đây / này", "Nào", "Ai"],
    explanation: "那 (nà) dùng chỉ người hoặc vật ở xa người nói (đối lập với 这 - zhè)."
  },
  {
    id: 71,
    hanzi: "呢",
    pinyin: "ne",
    correctAnswer: "Còn... thì sao? (trợ từ ngữ khí)",
    options: ["Còn... thì sao? (trợ từ ngữ khí)", "Không phải sao?", "Đúng không?", "Tại sao?"],
    explanation: "呢 (ne) dùng trong câu hỏi tỉnh lược (Ví dụ: 你呢？- Còn bạn thì sao?)."
  },
  {
    id: 72,
    hanzi: "能",
    pinyin: "néng",
    correctAnswer: "Có thể (năng lực, điều kiện)",
    options: ["Có thể (năng lực, điều kiện)", "Muốn", "Phải", "Thích"],
    explanation: "能 (néng) biểu thị năng lực bẩm sinh hoặc điều kiện khách quan cho phép làm gì."
  },
  {
    id: 73,
    hanzi: "你",
    pinyin: "nǐ",
    correctAnswer: "Bạn / anh / em (ngôi thứ 2)",
    options: ["Bạn / anh / em (ngôi thứ 2)", "Tôi (ngôi thứ 1)", "Anh ấy (ngôi thứ 3)", "Chúng tôi"],
    explanation: "你 (nǐ) là đại từ nhân xưng ngôi thứ hai số ít."
  },
  {
    id: 74,
    hanzi: "年",
    pinyin: "nián",
    correctAnswer: "Năm",
    options: ["Năm", "Tháng", "Ngày", "Giờ"],
    explanation: "年 (nián) là đơn vị thời gian một năm (Ví dụ: 今年 - năm nay)."
  },
  {
    id: 75,
    hanzi: "女儿",
    pinyin: "nǚ'ér",
    correctAnswer: "Con gái",
    options: ["Con gái", "Con trai", "Mẹ", "Chị em"],
    explanation: "女儿 (nǚ'ér) chỉ con gái trong mối quan hệ gia đình cha mẹ - con cái."
  },
  {
    id: 76,
    hanzi: "朋友",
    pinyin: "péngyou",
    correctAnswer: "Bạn bè",
    options: ["Bạn bè", "Thầy giáo", "Học sinh", "Đồng nghiệp"],
    explanation: "朋友 (péngyou) là người bạn thân thiết, bằng hữu."
  },
  {
    id: 77,
    hanzi: "漂亮",
    pinyin: "piàoliang",
    correctAnswer: "Xinh đẹp / đẹp đẽ",
    options: ["Xinh đẹp / đẹp đẽ", "Vui vẻ", "Tốt bụng", "Thông minh"],
    explanation: "漂亮 (piàoliang) dùng khen ngợi ngoại hình người hoặc vẻ đẹp của sự vật."
  },
  {
    id: 78,
    hanzi: "苹果",
    pinyin: "píngguǒ",
    correctAnswer: "Quả táo",
    options: ["Quả táo", "Quả cam", "Trái chuối", "Dưa hấu"],
    explanation: "苹果 (píngguǒ) là quả táo tây ăn được."
  },
  {
    id: 79,
    hanzi: "七",
    pinyin: "qī",
    correctAnswer: "Bảy (số 7)",
    options: ["Bảy (số 7)", "Sáu (số 6)", "Tám (số 8)", "Chín (số 9)"],
    explanation: "七 (qī) là con số 7 trong tiếng Trung."
  },
  {
    id: 80,
    hanzi: "前面",
    pinyin: "qiánmiàn",
    correctAnswer: "Phía trước / đằng trước",
    options: ["Phía trước / đằng trước", "Phía sau", "Bên trong", "Bên cạnh"],
    explanation: "前面 (qiánmiàn) là từ chỉ vị trí phía đằng trước (đối lập với 后面)."
  },
  {
    id: 81,
    hanzi: "钱",
    pinyin: "qián",
    correctAnswer: "Tiền / tiền bạc",
    options: ["Tiền / tiền bạc", "Thời gian", "Sách vở", "Quần áo"],
    explanation: "钱 (qián) nghĩa là tiền tệ dùng trong giao thương buôn bán (多少钱 - bao nhiêu tiền)."
  },
  {
    id: 82,
    hanzi: "请",
    pinyin: "qǐng",
    correctAnswer: "Xin / mời / nhờ",
    options: ["Xin / mời / nhờ", "Cảm ơn", "Tạm biệt", "Hỏi"],
    explanation: "请 (qǐng) là từ lịch sự đặt đầu câu (Ví dụ: 请坐 - xin mời ngồi, 请进 - xin mời vào)."
  },
  {
    id: 83,
    hanzi: "去",
    pinyin: "qù",
    correctAnswer: "Đi / rời đi",
    options: ["Đi / rời đi", "Đến", "Về", "Ở"],
    explanation: "去 (qù) chỉ hành động rời khỏi vị trí hiện tại đi đến nơi khác."
  },
  {
    id: 84,
    hanzi: "热",
    pinyin: "rè",
    correctAnswer: "Nóng",
    options: ["Nóng", "Lạnh", "Ấm", "Mát"],
    explanation: "热 (rè) miêu tả thời tiết hoặc nhiệt độ cao, nóng bức (đối lập với 冷)."
  },
  {
    id: 85,
    hanzi: "人",
    pinyin: "rén",
    correctAnswer: "Người / con người",
    options: ["Người / con người", "Bạn bè", "Học sinh", "Giáo viên"],
    explanation: "人 (rén) chỉ nhân loại, con người nói chung (Ví dụ: 中国人 - người Trung Quốc)."
  },
  {
    id: 86,
    hanzi: "认识",
    pinyin: "rènshi",
    correctAnswer: "Quen biết / nhận biết",
    options: ["Quen biết / nhận biết", "Hiểu rõ", "Nhìn thấy", "Học tập"],
    explanation: "认识 (rènshi) nghĩa là quen biết ai đó hoặc nhận ra điều gì."
  },
  {
    id: 87,
    hanzi: "三",
    pinyin: "sān",
    correctAnswer: "Ba (số 3)",
    options: ["Ba (số 3)", "Bốn (số 4)", "Hai (số 2)", "Năm (số 5)"],
    explanation: "三 (sān) là con số 3 trong tiếng Trung."
  },
  {
    id: 88,
    hanzi: "商店",
    pinyin: "shāngdiàn",
    correctAnswer: "Cửa hàng / tiệm",
    options: ["Cửa hàng / tiệm", "Bệnh viện", "Trường học", "Nhà hàng"],
    explanation: "商店 (shāngdiàn) là nơi mua bán hàng hóa, cửa hiệu tạp hóa."
  },
  {
    id: 89,
    hanzi: "上",
    pinyin: "shàng",
    correctAnswer: "Lên / ở trên / bên trên",
    options: ["Lên / ở trên / bên trên", "Xuống / dưới", "Trong", "Ngoài"],
    explanation: "上 (shàng) chỉ hướng đi lên trên hoặc vị trí ở trên bề mặt."
  },
  {
    id: 90,
    hanzi: "上午",
    pinyin: "shàngwǔ",
    correctAnswer: "Buổi sáng",
    options: ["Buổi sáng", "Buổi chiều", "Buổi trưa", "Buổi tối"],
    explanation: "上午 (shàngwǔ) là khoảng thời gian buổi sáng trước 12 giờ trưa."
  },
  {
    id: 91,
    hanzi: "少",
    pinyin: "shǎo",
    correctAnswer: "Ít",
    options: ["Ít", "Nhiều", "Nhỏ", "Lớn"],
    explanation: "少 (shǎo) mang nghĩa số lượng ít ỏi (đối lập với 多 - nhiều)."
  },
  {
    id: 92,
    hanzi: "谁",
    pinyin: "shéi",
    correctAnswer: "Ai (đại từ hỏi người)",
    options: ["Ai (đại từ hỏi người)", "Cái gì", "Ở đâu", "Mấy"],
    explanation: "谁 (shéi) dùng để hỏi danh tính một người (Ví dụ: 他是谁 - anh ấy là ai?)."
  },
  {
    id: 93,
    hanzi: "什么",
    pinyin: "shénme",
    correctAnswer: "Cái gì / điều gì",
    options: ["Cái gì / điều gì", "Ai", "Ở đâu", "Làm sao"],
    explanation: "什么 (shénme) là đại từ nghi vấn dùng hỏi sự vật, hiện tượng (Ví dụ: 这是什么 - đây là cái gì?)."
  },
  {
    id: 94,
    hanzi: "十",
    pinyin: "shí",
    correctAnswer: "Mười (số 10)",
    options: ["Mười (số 10)", "Chín (số 9)", "Tám (số 8)", "Bảy (số 7)"],
    explanation: "十 (shí) là con số 10 trong tiếng Trung."
  },
  {
    id: 95,
    hanzi: "时候",
    pinyin: "shíhou",
    correctAnswer: "Thời gian / lúc / khi",
    options: ["Thời gian / lúc / khi", "Thời tiết", "Bây giờ", "Hôm nay"],
    explanation: "时候 (shíhou) dùng chỉ thời điểm hoặc trong cụm 什么时候 (khi nào, bao giờ)."
  },
  {
    id: 96,
    hanzi: "是",
    pinyin: "shì",
    correctAnswer: "Là / đúng",
    options: ["Là / đúng", "Có", "Không", "Phải chăng"],
    explanation: "是 (shì) là động từ liên kết tương đương với 'to be' trong tiếng Anh (我是老师 - tôi là giáo viên)."
  },
  {
    id: 97,
    hanzi: "书",
    pinyin: "shū",
    correctAnswer: "Sách",
    options: ["Sách", "Bút", "Vở", "Bàn"],
    explanation: "书 (shū) chỉ sách báo, tài liệu đọc."
  },
  {
    id: 98,
    hanzi: "水",
    pinyin: "shuǐ",
    correctAnswer: "Nước",
    options: ["Nước", "Trà", "Cơm", "Rượu"],
    explanation: "水 (shuǐ) chỉ nước uống hoặc chất lỏng nói chung (喝水 - uống nước)."
  },
  {
    id: 99,
    hanzi: "水果",
    pinyin: "shuǐguǒ",
    correctAnswer: "Trái cây / hoa quả",
    options: ["Trái cây / hoa quả", "Rau xanh", "Món ăn", "Nước ngọt"],
    explanation: "水果 (shuǐguǒ) chỉ các loại quả tươi ăn được như táo, cam, chuối."
  },
  {
    id: 100,
    hanzi: "睡觉",
    pinyin: "shuìjiào",
    correctAnswer: "Ngủ",
    options: ["Ngủ", "Thức", "Ăn", "Nghỉ"],
    explanation: "睡觉 (shuìjiào) là hành động đi ngủ nghỉ ngơi."
  },
  {
    id: 101,
    hanzi: "说",
    pinyin: "shuō",
    correctAnswer: "Nói",
    options: ["Nói", "Nghe", "Đọc", "Viết"],
    explanation: "说 (shuō) là phát ra lời nói (Ví dụ: 说话 - nói chuyện, 说汉语 - nói tiếng Trung)."
  },
  {
    id: 102,
    hanzi: "四",
    pinyin: "sì",
    correctAnswer: "Bốn (số 4)",
    options: ["Bốn (số 4)", "Ba (số 3)", "Năm (số 5)", "Mười (số 10)"],
    explanation: "四 (sì) là con số 4 trong tiếng Trung."
  },
  {
    id: 103,
    hanzi: "岁",
    pinyin: "suì",
    correctAnswer: "Tuổi",
    options: ["Tuổi", "Năm", "Tháng", "Ngày"],
    explanation: "岁 (suì) là từ chỉ độ tuổi của người (Ví dụ: 我二十岁 - tôi hai mươi tuổi)."
  },
  {
    id: 104,
    hanzi: "他",
    pinyin: "tā",
    correctAnswer: "Anh ấy / ông ấy (nam)",
    options: ["Anh ấy / ông ấy (nam)", "Cô ấy / bà ấy (nữ)", "Nó (đồ vật/con vật)", "Tôi"],
    explanation: "他 (tā) có bộ Nhân đứng (亻), chỉ người nam ngôi thứ ba số ít."
  },
  {
    id: 105,
    hanzi: "她",
    pinyin: "tā",
    correctAnswer: "Cô ấy / bà ấy (nữ)",
    options: ["Cô ấy / bà ấy (nữ)", "Anh ấy (nam)", "Chúng tôi", "Họ"],
    explanation: "她 (tā) có bộ Nữ (女), chỉ người nữ ngôi thứ ba số ít."
  },
  {
    id: 106,
    hanzi: "太",
    pinyin: "tài",
    correctAnswer: "Quá / lắm",
    options: ["Quá / lắm", "Rất", "Không", "Đều"],
    explanation: "太 (tài) biểu thị mức độ cực kỳ cao, hay gặp trong cấu trúc 太...了 (Ví dụ: 太好了 - tốt quá rồi)."
  },
  {
    id: 107,
    hanzi: "天气",
    pinyin: "tiānqì",
    correctAnswer: "Thời tiết",
    options: ["Thời tiết", "Thời gian", "Không khí", "Nhiệt độ"],
    explanation: "天气 (tiānqì) chỉ trạng thái thời tiết nắng, mưa, nóng, lạnh (Ví dụ: 今天天气很好)."
  },
  {
    id: 108,
    hanzi: "听",
    pinyin: "tīng",
    correctAnswer: "Nghe",
    options: ["Nghe", "Nói", "Đọc", "Xem"],
    explanation: "听 (tīng) là hành động tiếp nhận âm thanh bằng tai (Ví dụ: 听音乐 - nghe nhạc)."
  },
  {
    id: 109,
    hanzi: "同学",
    pinyin: "tóngxué",
    correctAnswer: "Bạn học / bạn cùng lớp",
    options: ["Bạn học / bạn cùng lớp", "Thầy giáo", "Học sinh", "Đồng nghiệp"],
    explanation: "同学 (tóngxué) nghĩa là người học chung lớp, cùng trường."
  },
  {
    id: 110,
    hanzi: "喂",
    pinyin: "wèi",
    correctAnswer: "A-lô / này",
    options: ["A-lô / này", "Xin chào", "Tạm biệt", "Cảm ơn"],
    explanation: "喂 (wèi) là thán từ dùng khi bắt máy điện thoại tương tự như 'a-lô'."
  },
  {
    id: 111,
    hanzi: "我",
    pinyin: "wǒ",
    correctAnswer: "Tôi / mình / ta",
    options: ["Tôi / mình / ta", "Bạn", "Anh ấy", "Chúng tôi"],
    explanation: "我 (wǒ) là đại từ nhân xưng ngôi thứ nhất số ít."
  },
  {
    id: 112,
    hanzi: "我们",
    pinyin: "wǒmen",
    correctAnswer: "Chúng tôi / chúng ta",
    options: ["Chúng tôi / chúng ta", "Họ", "Các bạn", "Mọi người"],
    explanation: "我们 (wǒmen) là đại từ nhân xưng ngôi thứ nhất số nhiều."
  },
  {
    id: 113,
    hanzi: "五",
    pinyin: "wǔ",
    correctAnswer: "Năm (số 5)",
    options: ["Năm (số 5)", "Bốn (số 4)", "Sáu (số 6)", "Bảy (số 7)"],
    explanation: "五 (wǔ) là con số 5 trong tiếng Trung."
  },
  {
    id: 114,
    hanzi: "喜欢",
    pinyin: "xǐhuan",
    correctAnswer: "Thích / yêu thích",
    options: ["Thích / yêu thích", "Ghét", "Muốn", "Biết"],
    explanation: "喜欢 (xǐhuan) biểu thị sự yêu thích đối với người hoặc điều gì (Ví dụ: 我喜欢苹果)."
  },
  {
    id: 115,
    hanzi: "下",
    pinyin: "xià",
    correctAnswer: "Dưới / xuống",
    options: ["Dưới / xuống", "Trên", "Trong", "Ngoài"],
    explanation: "下 (xià) chỉ hướng đi xuống hoặc vị trí ở phía dưới (đối lập với 上)."
  },
  {
    id: 116,
    hanzi: "下午",
    pinyin: "xiàwǔ",
    correctAnswer: "Buổi chiều",
    options: ["Buổi chiều", "Buổi sáng", "Buổi trưa", "Buổi tối"],
    explanation: "下午 (xiàwǔ) là khoảng thời gian buổi chiều sau 12 giờ trưa."
  },
  {
    id: 117,
    hanzi: "下雨",
    pinyin: "xiàyǔ",
    correctAnswer: "Trời mưa / đổ mưa",
    options: ["Trời mưa / đổ mưa", "Trời nắng", "Trời lạnh", "Có gió"],
    explanation: "下雨 (xiàyǔ) miêu tả hiện tượng mưa rơi từ bầu trời (雨: mưa)."
  },
  {
    id: 118,
    hanzi: "先生",
    pinyin: "xiānsheng",
    correctAnswer: "Ông / ngài / anh (kính xưng)",
    options: ["Ông / ngài / anh (kính xưng)", "Cô / tiểu thư", "Bác sĩ", "Thầy giáo"],
    explanation: "先生 (xiānsheng) là danh xưng lịch sự dành cho phái nam (Ví dụ: 王先生 - ông Vương)."
  },
  {
    id: 119,
    hanzi: "现在",
    pinyin: "xiànzài",
    correctAnswer: "Bây giờ / hiện tại",
    options: ["Bây giờ / hiện tại", "Hôm nay", "Lúc trước", "Sau này"],
    explanation: "现在 (xiànzài) chỉ thời điểm ngay lúc này (Ví dụ: 现在几点 - bây giờ là mấy giờ?)."
  },
  {
    id: 120,
    hanzi: "想",
    pinyin: "xiǎng",
    correctAnswer: "Nghĩ / muốn / nhớ",
    options: ["Nghĩ / muốn / nhớ", "Nói", "Làm", "Thấy"],
    explanation: "想 (xiǎng) biểu thị suy nghĩ, ước muốn làm điều gì đó hoặc nhớ nhung người khác."
  },
  {
    id: 121,
    hanzi: "小",
    pinyin: "xiǎo",
    correctAnswer: "Nhỏ / bé",
    options: ["Nhỏ / bé", "Lớn", "Nhiều", "Ít"],
    explanation: "小 (xiǎo) miêu tả kích thước nhỏ bé (đối lập với 大 - to lớn)."
  },
  {
    id: 122,
    hanzi: "小姐",
    pinyin: "xiǎojiě",
    correctAnswer: "Cô / tiểu thư (phái nữ)",
    options: ["Cô / tiểu thư (phái nữ)", "Ông / ngài", "Mẹ", "Con gái"],
    explanation: "小姐 (xiǎojiě) là danh xưng lịch sự dành cho phụ nữ trẻ tuổi (Ví dụ: 李小姐 - cô Lý)."
  },
  {
    id: 123,
    hanzi: "些",
    pinyin: "xiē",
    correctAnswer: "Một ít / một vài / những",
    options: ["Một ít / một vài / những", "Tất cả", "Rất nhiều", "Một cái"],
    explanation: "些 (xiē) là lượng từ biểu thị số lượng không xác định (Ví dụ: 这些 - những cái này, 一些 - một ít)."
  },
  {
    id: 124,
    hanzi: "写",
    pinyin: "xiě",
    correctAnswer: "Viết",
    options: ["Viết", "Đọc", "Nghe", "Vẽ"],
    explanation: "写 (xiě) là hành động cầm bút ghi chữ (Ví dụ: 写字 - viết chữ, 写汉字 - viết chữ Hán)."
  },
  {
    id: 125,
    hanzi: "谢谢",
    pinyin: "xièxie",
    correctAnswer: "Cảm ơn",
    options: ["Cảm ơn", "Xin lỗi", "Tạm biệt", "Không có gì"],
    explanation: "谢谢 (xièxie) là câu nói cảm ơn quen thuộc khi nhận được sự giúp đỡ."
  },
  {
    id: 126,
    hanzi: "星期",
    pinyin: "xīngqī",
    correctAnswer: "Tuần / thứ trong tuần",
    options: ["Tuần / thứ trong tuần", "Tháng", "Năm", "Ngày"],
    explanation: "星期 (xīngqī) nghĩa là tuần lễ hoặc dùng để nói thứ (Ví dụ: 星期一 - thứ Hai)."
  },
  {
    id: 127,
    hanzi: "学生",
    pinyin: "xuésheng",
    correctAnswer: "Học sinh / sinh viên",
    options: ["Học sinh / sinh viên", "Giáo viên", "Bác sĩ", "Bạn bè"],
    explanation: "学生 (xuésheng) chỉ người đang học tập tại trường lớp."
  },
  {
    id: 128,
    hanzi: "学习",
    pinyin: "xuéxí",
    correctAnswer: "Học tập / học",
    options: ["Học tập / học", "Làm việc", "Nghỉ ngơi", "Đọc sách"],
    explanation: "学习 (xuéxí) là động từ học hỏi kiến thức, kỹ năng (Ví dụ: 学习汉语 - học tiếng Trung)."
  },
  {
    id: 129,
    hanzi: "学校",
    pinyin: "xuéxiào",
    correctAnswer: "Trường học",
    options: ["Trường học", "Bệnh viện", "Cửa hàng", "Nhà ga"],
    explanation: "学校 (xuéxiào) là cơ sở giáo dục, ngôi trường nơi học sinh theo học."
  },
  {
    id: 130,
    hanzi: "一",
    pinyin: "yī",
    correctAnswer: "Một (số 1)",
    options: ["Một (số 1)", "Hai (số 2)", "Ba (số 3)", "Mười (số 10)"],
    explanation: "一 (yī) là con số 1 trong tiếng Trung."
  },
  {
    id: 131,
    hanzi: "一点儿",
    pinyin: "yìdiǎnr",
    correctAnswer: "Một chút / một ít",
    options: ["Một chút / một ít", "Rất nhiều", "Bao nhiêu", "Tất cả"],
    explanation: "一点儿 (yìdiǎnr) đứng trước danh từ biểu thị số lượng nhỏ (Ví dụ: 吃一点儿 - ăn một chút)."
  },
  {
    id: 132,
    hanzi: "医生",
    pinyin: "yīshēng",
    correctAnswer: "Bác sĩ",
    options: ["Bác sĩ", "Giáo viên", "Học sinh", "Y tá"],
    explanation: "医生 (yīshēng) là người làm nghề chữa bệnh (y sinh)."
  },
  {
    id: 133,
    hanzi: "医院",
    pinyin: "yīyuàn",
    correctAnswer: "Bệnh viện",
    options: ["Bệnh viện", "Trường học", "Cửa hàng", "Nhà thuốc"],
    explanation: "医院 (yīyuàn) là cơ sở khám và chữa bệnh (y viện)."
  },
  {
    id: 134,
    hanzi: "衣服",
    pinyin: "yīfu",
    correctAnswer: "Quần áo / trang phục",
    options: ["Quần áo / trang phục", "Giày dép", "Túi xách", "Đồ vật"],
    explanation: "衣服 (yīfu) chỉ quần áo may mặc mặc trên người."
  },
  {
    id: 135,
    hanzi: "椅子",
    pinyin: "yǐzi",
    correctAnswer: "Cái ghế",
    options: ["Cái ghế", "Cái bàn", "Cái giường", "Cái cốc"],
    explanation: "椅子 (yǐzi) là đồ dùng nội thất để ngồi."
  },
  {
    id: 136,
    hanzi: "有",
    pinyin: "yǒu",
    correctAnswer: "Có / sở hữu",
    options: ["Có / sở hữu", "Không có", "Là", "Ở"],
    explanation: "有 (yǒu) biểu thị sự sở hữu hoặc tồn tại (Ví dụ: 我有一本书 - tôi có một cuốn sách)."
  },
  {
    id: 137,
    hanzi: "月",
    pinyin: "yuè",
    correctAnswer: "Tháng / mặt trăng",
    options: ["Tháng / mặt trăng", "Năm", "Ngày", "Tuần"],
    explanation: "月 (yuè) dùng chỉ các tháng trong năm (Ví dụ: 一月 - tháng 1) hoặc mặt trăng."
  },
  {
    id: 138,
    hanzi: "再见",
    pinyin: "zàijiàn",
    correctAnswer: "Tạm biệt / hẹn gặp lại",
    options: ["Tạm biệt / hẹn gặp lại", "Xin chào", "Cảm ơn", "Không có gì"],
    explanation: "再见 (zàijiàn) nghĩa đen là 'gặp lại lần sau', lời chào khi chia tay."
  },
  {
    id: 139,
    hanzi: "在",
    pinyin: "zài",
    correctAnswer: "Ở / tại / đang",
    options: ["Ở / tại / đang", "Đi", "Đến", "Về"],
    explanation: "在 (zài) chỉ vị trí nơi chốn (我在家 - tôi ở nhà) hoặc phó từ chỉ hành động đang diễn ra."
  },
  {
    id: 140,
    hanzi: "怎么",
    pinyin: "zěnme",
    correctAnswer: "Làm sao / thế nào (cách thức/nguyên nhân)",
    options: ["Làm sao / thế nào (cách thức/nguyên nhân)", "Ở đâu", "Bao nhiêu", "Cái gì"],
    explanation: "怎么 (zěnme) dùng hỏi phương thức hành động (怎么去) hoặc nguyên do (怎么了)."
  },
  {
    id: 141,
    hanzi: "怎么样",
    pinyin: "zěnmeyàng",
    correctAnswer: "Như thế nào / ra sao (tính chất/hỏi ý kiến)",
    options: ["Như thế nào / ra sao (tính chất/hỏi ý kiến)", "Bao nhiêu", "Ở đâu", "Làm gì"],
    explanation: "怎么样 (zěnmeyàng) dùng hỏi tình hình hoặc trưng cầu ý kiến người khác."
  },
  {
    id: 142,
    hanzi: "这",
    pinyin: "zhè",
    correctAnswer: "Đây / này (chỉ nơi gần)",
    options: ["Đây / này (chỉ nơi gần)", "Đó / kia", "Nào", "Ai"],
    explanation: "这 (zhè) dùng để chỉ người hoặc vật ở gần vị trí người nói (đối lập với 那)."
  },
  {
    id: 143,
    hanzi: "中国",
    pinyin: "Zhōngguó",
    correctAnswer: "Trung Quốc",
    options: ["Trung Quốc", "Bắc Kinh", "Việt Nam", "Nước ngoài"],
    explanation: "中国 (Zhōngguó) là tên quốc gia Trung Quốc."
  },
  {
    id: 144,
    hanzi: "中午",
    pinyin: "zhōngwǔ",
    correctAnswer: "Buổi trưa (khoảng 12 giờ)",
    options: ["Buổi trưa (khoảng 12 giờ)", "Buổi sáng", "Buổi chiều", "Buổi tối"],
    explanation: "中午 (zhōngwǔ) là thời điểm chính giữa ngày (11h30 - 13h00)."
  },
  {
    id: 145,
    hanzi: "住",
    pinyin: "zhù",
    correctAnswer: "Sống / cư trú / ở",
    options: ["Sống / cư trú / ở", "Đi", "Làm việc", "Học tập"],
    explanation: "住 (zhù) là động từ chỉ việc sinh sống, cư ngụ tại một địa điểm (Ví dụ: 住北京)."
  },
  {
    id: 146,
    hanzi: "桌子",
    pinyin: "zhuōzi",
    correctAnswer: "Cái bàn",
    options: ["Cái bàn", "Cái ghế", "Cái giường", "Cái cốc"],
    explanation: "桌子 (zhuōzi) là đồ gia dụng cái bàn (đặt sách, đồ ăn lên mặt bàn)."
  },
  {
    id: 147,
    hanzi: "字",
    pinyin: "zì",
    correctAnswer: "Chữ / văn tự",
    options: ["Chữ / văn tự", "Sách", "Tiếng nói", "Tên"],
    explanation: "字 (zì) chỉ mặt chữ hoặc ký tự (Ví dụ: 汉字 - chữ Hán, 写字 - viết chữ)."
  },
  {
    id: 148,
    hanzi: "昨天",
    pinyin: "zuótiān",
    correctAnswer: "Hôm qua",
    options: ["Hôm qua", "Hôm nay", "Ngày mai", "Năm ngoái"],
    explanation: "昨天 (zuótiān) là ngày liền trước ngày hôm nay (ngày đã qua)."
  },
  {
    id: 149,
    hanzi: "做",
    pinyin: "zuò",
    correctAnswer: "Làm / chế tạo",
    options: ["Làm / chế tạo", "Ngồi", "Đi", "Xem"],
    explanation: "做 (zuò) là động từ hành động chỉ việc làm ra cái gì đó (Ví dụ: 做饭 - nấu cơm, 做工作)."
  },
  {
    id: 150,
    hanzi: "坐",
    pinyin: "zuò",
    correctAnswer: "Ngồi / đi (xe, tàu, máy bay)",
    options: ["Ngồi / đi (xe, tàu, máy bay)", "Làm", "Đứng", "Chạy"],
    explanation: "坐 (zuò) nghĩa là ngồi xuống (请坐) hoặc đi bằng một phương tiện giao thông (坐飞机)."
  }
];

export function buildData() {
  const formattedQuestions = rawVocab.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
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
