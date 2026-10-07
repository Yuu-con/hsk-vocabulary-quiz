import fs from 'fs';
import path from 'path';
import { HSK1_VOCAB_DATA } from '../data/hsk1-data';

interface VocabDef {
  id: number;
  hanzi: string;
  pinyin: string;
  correctAnswer: string;
  options: [string, string, string, string];
  explanation: string;
}

const rawHsk2Vocab: VocabDef[] = [
  {
    id: 1,
    hanzi: "吧",
    pinyin: "ba",
    correctAnswer: "Nhé / nhé / đi (trợ từ ngữ khí đề nghị)",
    options: ["Nhé / nhé / đi (trợ từ ngữ khí đề nghị)", "Không (phủ định)", "Ở đâu", "Của"],
    explanation: "吧 (ba) đứng cuối câu biểu thị sự gợi ý, đề nghị hoặc suy đoán (Ví dụ: 走吧 - đi thôi nào)."
  },
  {
    id: 2,
    hanzi: "白",
    pinyin: "bái",
    correctAnswer: "Trắng / màu trắng",
    options: ["Trắng / màu trắng", "Đen", "Đỏ", "Xanh"],
    explanation: "白 (bái) chỉ màu trắng (Ví dụ: 白色的衣服 - quần áo màu trắng)."
  },
  {
    id: 3,
    hanzi: "百",
    pinyin: "bǎi",
    correctAnswer: "Trăm (số 100)",
    options: ["Trăm (số 100)", "Nghìn", "Mười", "Vạn"],
    explanation: "百 (bǎi) là hàng trăm (Ví dụ: 一百 - một trăm)."
  },
  {
    id: 4,
    hanzi: "帮助",
    pinyin: "bāngzhù",
    correctAnswer: "Giúp đỡ / hỗ trợ",
    options: ["Giúp đỡ / hỗ trợ", "Học tập", "Nói chuyện", "Tìm kiếm"],
    explanation: "帮助 (bāngzhù) là hỗ trợ hoặc giúp đỡ ai đó (Ví dụ: 谢谢你的帮助 - cảm ơn sự giúp đỡ của bạn)."
  },
  {
    id: 5,
    hanzi: "报纸",
    pinyin: "bàozhǐ",
    correctAnswer: "Báo / tờ báo",
    options: ["Báo / tờ báo", "Sách", "Bút chì", "Bàn"],
    explanation: "报纸 (bàozhǐ) là ấn phẩm báo chí để đọc tin tức (Ví dụ: 看报纸 - đọc báo)."
  },
  {
    id: 6,
    hanzi: "比",
    pinyin: "bǐ",
    correctAnswer: "So với (so sánh)",
    options: ["So với (so sánh)", "Bởi vì", "Cùng nhau", "Cho nên"],
    explanation: "比 (bǐ) dùng trong câu so sánh (Ví dụ: 他比我高 - anh ấy cao hơn tôi)."
  },
  {
    id: 7,
    hanzi: "别",
    pinyin: "bié",
    correctAnswer: "Đừng / chớ (khuyên can)",
    options: ["Đừng / chớ (khuyên can)", "Phải", "Muốn", "Đã"],
    explanation: "别 (bié) dùng khuyên bảo hoặc cấm đoán (Ví dụ: 别走 - đừng đi)."
  },
  {
    id: 8,
    hanzi: "长",
    pinyin: "cháng",
    correctAnswer: "Dài (chiều dài)",
    options: ["Dài (chiều dài)", "Ngắn", "Cao", "Rộng"],
    explanation: "长 (cháng) miêu tả độ dài của vật hoặc thời gian (Ví dụ: 头发很长 - tóc rất dài)."
  },
  {
    id: 9,
    hanzi: "唱歌",
    pinyin: "chànggē",
    correctAnswer: "Hát / ca hát",
    options: ["Hát / ca hát", "Nhảy múa", "Nghe nhạc", "Nói chuyện"],
    explanation: "唱歌 (chànggē) là hát những bài ca (Ví dụ: 喜欢唱歌 - thích hát)."
  },
  {
    id: 10,
    hanzi: "出",
    pinyin: "chū",
    correctAnswer: "Ra / đi ra ngoài",
    options: ["Ra / đi ra ngoài", "Vào", "Đến", "Về"],
    explanation: "出 (chū) là chuyển động từ trong ra ngoài (Ví dụ: 出去 - đi ra ngoài)."
  },
  {
    id: 11,
    hanzi: "穿",
    pinyin: "chuān",
    correctAnswer: "Mặc (quần áo) / đi (giày)",
    options: ["Mặc (quần áo) / đi (giày)", "Mua", "Rửa / giặt", "Cởi"],
    explanation: "穿 (chuān) là mặc trang phục (Ví dụ: 穿衣服 - mặc quần áo)."
  },
  {
    id: 12,
    hanzi: "次",
    pinyin: "cì",
    correctAnswer: "Lần / lượt (lượng từ số lần)",
    options: ["Lần / lượt (lượng từ số lần)", "Giờ", "Ngày", "Năm"],
    explanation: "次 (cì) là lượng từ đo số lần thực hiện hành động (Ví dụ: 去过一次 - đã đi một lần)."
  },
  {
    id: 13,
    hanzi: "从",
    pinyin: "cóng",
    correctAnswer: "Từ (điểm bắt đầu nơi chốn/thời gian)",
    options: ["Từ (điểm bắt đầu nơi chốn/thời gian)", "Đến", "Ở", "Với"],
    explanation: "从 (cóng) biểu thị điểm xuất phát (Ví dụ: 从北京来 - đến từ Bắc Kinh)."
  },
  {
    id: 14,
    hanzi: "错",
    pinyin: "cuò",
    correctAnswer: "Sai / lỗi",
    options: ["Sai / lỗi", "Đúng", "Tốt", "Mới"],
    explanation: "错 (cuò) biểu thị sự sai sót, không đúng (Ví dụ: 没错 - không sai)."
  },
  {
    id: 15,
    hanzi: "打篮球",
    pinyin: "dǎ lánqiú",
    correctAnswer: "Chơi bóng rổ",
    options: ["Chơi bóng rổ", "Đá bóng", "Bơi lội", "Chạy bộ"],
    explanation: "打篮球 (dǎ lánqiú) là môn thể thao chơi bóng rổ."
  },
  {
    id: 16,
    hanzi: "大家",
    pinyin: "dàjiā",
    correctAnswer: "Mọi người / tất cả mọi người",
    options: ["Mọi người / tất cả mọi người", "Gia đình lớn", "Bạn bè", "Học sinh"],
    explanation: "大家 (dàjiā) là đại từ chỉ tập thể mọi người (Ví dụ: 大家好 - chào mọi người)."
  },
  {
    id: 17,
    hanzi: "到",
    pinyin: "dào",
    correctAnswer: "Đến / tới",
    options: ["Đến / tới", "Rời đi", "Chờ đợi", "Bắt đầu"],
    explanation: "到 (dào) biểu thị điểm đến hoặc đạt tới (Ví dụ: 到了 - đã đến nơi rồi)."
  },
  {
    id: 18,
    hanzi: "得",
    pinyin: "de",
    correctAnswer: "Trợ từ kết cấu (nối động từ và bổ ngữ)",
    options: ["Trợ từ kết cấu (nối động từ và bổ ngữ)", "Trợ từ sở hữu", "Trợ từ nghi vấn", "Liên từ"],
    explanation: "得 (de) đặt sau động từ để dẫn ra trình độ, trạng thái (Ví dụ: 跑得很快 - chạy rất nhanh)."
  },
  {
    id: 19,
    hanzi: "等",
    pinyin: "děng",
    correctAnswer: "Chờ / đợi",
    options: ["Chờ / đợi", "Đi", "Tìm", "Hỏi"],
    explanation: "等 (děng) là hành động chờ đợi ai đó hoặc điều gì (Ví dụ: 等一下 - đợi một chút)."
  },
  {
    id: 20,
    hanzi: "弟弟",
    pinyin: "dìdi",
    correctAnswer: "Em trai",
    options: ["Em trai", "Anh trai", "Em gái", "Con trai"],
    explanation: "弟弟 (dìdi) là em trai ruột trong gia đình."
  },
  {
    id: 21,
    hanzi: "第一",
    pinyin: "dì-yī",
    correctAnswer: "Thứ nhất / đầu tiên / số một",
    options: ["Thứ nhất / đầu tiên / số một", "Thứ hai", "Cuối cùng", "Tất cả"],
    explanation: "第一 (dì-yī) là số thứ tự đầu tiên (Ví dụ: 第一次 - lần đầu tiên)."
  },
  {
    id: 22,
    hanzi: "懂",
    pinyin: "dǒng",
    correctAnswer: "Hiểu / hiểu rõ",
    options: ["Hiểu / hiểu rõ", "Quên", "Nói", "Nhìn"],
    explanation: "懂 (dǒng) chỉ nhận thức, nắm rõ ý nghĩa (Ví dụ: 我懂了 - tôi hiểu rồi)."
  },
  {
    id: 23,
    hanzi: "对",
    pinyin: "duì",
    correctAnswer: "Đúng / chính xác (hoặc: đối với)",
    options: ["Đúng / chính xác (hoặc: đối với)", "Sai", "Ít", "Nhiều"],
    explanation: "对 (duì) nghĩa là đúng (đối lập với 错) hoặc giới từ 'đối với ai đó'."
  },
  {
    id: 24,
    hanzi: "房间",
    pinyin: "fángjiān",
    correctAnswer: "Căn phòng",
    options: ["Căn phòng", "Ngôi nhà", "Cửa hàng", "Trường học"],
    explanation: "房间 (fángjiān) chỉ buồng phòng bên trong một tòa nhà (Ví dụ: 我的房间 - phòng của tôi)."
  },
  {
    id: 25,
    hanzi: "非常",
    pinyin: "fēicháng",
    correctAnswer: "Vô cùng / hết sức / rất",
    options: ["Vô cùng / hết sức / rất", "Một chút", "Bình thường", "Không hề"],
    explanation: "非常 (fēicháng) là phó từ mức độ cao hơn cả 很 (Ví dụ: 非常高兴 - vô cùng vui mừng)."
  },
  {
    id: 26,
    hanzi: "服务员",
    pinyin: "fúwùyuán",
    correctAnswer: "Nhân viên phục vụ / bồi bàn",
    options: ["Nhân viên phục vụ / bồi bàn", "Bác sĩ", "Giáo viên", "Tài xế"],
    explanation: "服务员 (fúwùyuán) là người làm công việc phục vụ ở nhà hàng, khách sạn."
  },
  {
    id: 27,
    hanzi: "高",
    pinyin: "gāo",
    correctAnswer: "Cao",
    options: ["Cao", "Thấp", "Dài", "Lớn"],
    explanation: "高 (gāo) miêu tả chiều cao người hoặc vật (Ví dụ: 很高 - rất cao)."
  },
  {
    id: 28,
    hanzi: "告诉",
    pinyin: "gàosu",
    correctAnswer: "Bảo / nói cho biết",
    options: ["Bảo / nói cho biết", "Hỏi", "Nghe", "Nghĩ"],
    explanation: "告诉 (gàosu) là truyền đạt thông tin cho người khác (Ví dụ: 告诉我 - nói cho tôi biết)."
  },
  {
    id: 29,
    hanzi: "哥哥",
    pinyin: "gēge",
    correctAnswer: "Anh trai",
    options: ["Anh trai", "Em trai", "Bố", "Bạn bè"],
    explanation: "哥哥 (gēge) là anh trai ruột trong gia đình."
  },
  {
    id: 30,
    hanzi: "给",
    pinyin: "gěi",
    correctAnswer: "Cho / đưa cho",
    options: ["Cho / đưa cho", "Lấy", "Bán", "Mua"],
    explanation: "给 (gěi) là đưa vật gì cho ai đó (Ví dụ: 给你 - đưa cho bạn)."
  },
  {
    id: 31,
    hanzi: "公共汽车",
    pinyin: "gōnggòng qìchē",
    correctAnswer: "Xe buýt",
    options: ["Xe buýt", "Xe taxi", "Máy bay", "Xe đạp"],
    explanation: "公共汽车 (gōnggòng qìchē) là phương tiện giao thông công cộng xe buýt."
  },
  {
    id: 32,
    hanzi: "公司",
    pinyin: "gōngsī",
    correctAnswer: "Công ty",
    options: ["Công ty", "Bệnh viện", "Trường học", "Cửa hàng"],
    explanation: "公司 (gōngsī) là doanh nghiệp, cơ quan làm việc (Ví dụ: 去公司 - đến công ty)."
  },
  {
    id: 33,
    hanzi: "贵",
    pinyin: "guì",
    correctAnswer: "Đắt / đắt đỏ / quý",
    options: ["Đắt / đắt đỏ / quý", "Rẻ", "Nhiều", "Tốt"],
    explanation: "贵 (guì) miêu tả giá cả cao (đối lập với 便宜 - rẻ)."
  },
  {
    id: 34,
    hanzi: "过",
    pinyin: "guo",
    correctAnswer: "Từng / đã từng (trợ từ trải nghiệm)",
    options: ["Từng / đã từng (trợ từ trải nghiệm)", "Đang", "Sẽ", "Chưa"],
    explanation: "过 (guo) đứng sau động từ chỉ trải nghiệm trong quá khứ (Ví dụ: 去过 - từng đi qua)."
  },
  {
    id: 35,
    hanzi: "还",
    pinyin: "hái",
    correctAnswer: "Vẫn / còn / lại",
    options: ["Vẫn / còn / lại", "Đã", "Chưa", "Chỉ"],
    explanation: "还 (hái) là phó từ biểu thị sự tiếp diễn hoặc bổ sung (Ví dụ: 还有 - vẫn còn)."
  },
  {
    id: 36,
    hanzi: "孩子",
    pinyin: "háizi",
    correctAnswer: "Trẻ con / con cái",
    options: ["Trẻ con / con cái", "Người lớn", "Học sinh", "Bố mẹ"],
    explanation: "孩子 (háizi) chỉ đứa trẻ hoặc con cái của bố mẹ."
  },
  {
    id: 37,
    hanzi: "好吃",
    pinyin: "hǎochī",
    correctAnswer: "Ngon / ngon miệng",
    options: ["Ngon / ngon miệng", "Dở / khó ăn", "Đẹp", "Vui vẻ"],
    explanation: "好吃 (hǎochī) khen ngợi đồ ăn thơm ngon."
  },
  {
    id: 38,
    hanzi: "黑",
    pinyin: "hēi",
    correctAnswer: "Đen / màu đen",
    options: ["Đen / màu đen", "Trắng", "Đỏ", "Vàng"],
    explanation: "黑 (hēi) chỉ màu đen (đối lập với 白 - bái)."
  },
  {
    id: 39,
    hanzi: "红",
    pinyin: "hóng",
    correctAnswer: "Đỏ / màu đỏ",
    options: ["Đỏ / màu đỏ", "Trắng", "Đen", "Xanh"],
    explanation: "红 (hóng) chỉ màu đỏ (Ví dụ: 红色的苹果 - quả táo màu đỏ)."
  },
  {
    id: 40,
    hanzi: "火车站",
    pinyin: "huǒchēzhàn",
    correctAnswer: "Ga tàu hỏa / bến tàu",
    options: ["Ga tàu hỏa / bến tàu", "Sân bay", "Bến xe buýt", "Bệnh viện"],
    explanation: "火车站 (huǒchēzhàn) là nơi tàu hỏa đón và trả khách."
  },
  {
    id: 41,
    hanzi: "机场",
    pinyin: "jīchǎng",
    correctAnswer: "Sân bay",
    options: ["Sân bay", "Ga tàu", "Bến xe", "Công viên"],
    explanation: "机场 (jīchǎng) là cảng hàng không đón máy bay cất và hạ cánh."
  },
  {
    id: 42,
    hanzi: "鸡蛋",
    pinyin: "jīdàn",
    correctAnswer: "Trứng gà",
    options: ["Trứng gà", "Thịt cừu", "Cá", "Dưa hấu"],
    explanation: "鸡蛋 (jīdàn) là quả trứng của con gà dùng làm thức ăn."
  },
  {
    id: 43,
    hanzi: "件",
    pinyin: "jiàn",
    correctAnswer: "Kiện / chiếc (lượng từ áo quần, sự việc)",
    options: ["Kiện / chiếc (lượng từ áo quần, sự việc)", "Cuốn / quyển", "Cái / con", "Bát / chén"],
    explanation: "件 (jiàn) là lượng từ dùng cho quần áo (一件衣服) hoặc việc (一件事)."
  },
  {
    id: 44,
    hanzi: "教室",
    pinyin: "jiàoshì",
    correctAnswer: "Phòng học / lớp học",
    options: ["Phòng học / lớp học", "Phòng ngủ", "Bệnh viện", "Cửa hàng"],
    explanation: "教室 (jiàoshì) là căn phòng trong trường nơi diễn ra việc dạy và học."
  },
  {
    id: 45,
    hanzi: "姐姐",
    pinyin: "jiějie",
    correctAnswer: "Chị gái",
    options: ["Chị gái", "Em gái", "Mẹ", "Con gái"],
    explanation: "姐姐 (jiějie) là người chị gái trong gia đình."
  },
  {
    id: 46,
    hanzi: "介绍",
    pinyin: "jièshào",
    correctAnswer: "Giới thiệu",
    options: ["Giới thiệu", "Giúp đỡ", "Bắt đầu", "Gặp gỡ"],
    explanation: "介绍 (jièshào) là làm quen, thông tin về người hoặc vật (Ví dụ: 介绍一下 - giới thiệu một chút)."
  },
  {
    id: 47,
    hanzi: "进",
    pinyin: "jìn",
    correctAnswer: "Vào / tiến vào",
    options: ["Vào / tiến vào", "Ra", "Đi", "Về"],
    explanation: "进 (jìn) là đi vào bên trong (đối lập với 出 - ra ngoài, 请进 - xin mời vào)."
  },
  {
    id: 48,
    hanzi: "近",
    pinyin: "jìn",
    correctAnswer: "Gần (khoảng cách)",
    options: ["Gần (khoảng cách)", "Xa", "Lớn", "Nhỏ"],
    explanation: "近 (jìn) miêu tả cự ly ngắn (đối lập với 远 - xa)."
  },
  {
    id: 49,
    hanzi: "就",
    pinyin: "jiù",
    correctAnswer: "Thì / ngay / liền (phó từ nhấn mạnh)",
    options: ["Thì / ngay / liền (phó từ nhấn mạnh)", "Cũng", "Đều", "Vẫn"],
    explanation: "就 (jiù) nhấn mạnh tính chất sớm, nhanh hoặc khẳng định."
  },
  {
    id: 50,
    hanzi: "觉得",
    pinyin: "juéde",
    correctAnswer: "Cảm thấy / thấy rằng",
    options: ["Cảm thấy / thấy rằng", "Nghe thấy", "Nhìn thấy", "Biết được"],
    explanation: "觉得 (juéde) dùng để bày tỏ cảm nhận, quan điểm cá nhân (Ví dụ: 我觉得很好)."
  },
  {
    id: 51,
    hanzi: "咖啡",
    pinyin: "kāfēi",
    correctAnswer: "Cà phê",
    options: ["Cà phê", "Trà", "Nước", "Sữa bò"],
    explanation: "咖啡 (kāfēi) là đồ uống cà phê pha từ hạt cà phê."
  },
  {
    id: 52,
    hanzi: "开始",
    pinyin: "kāishǐ",
    correctAnswer: "Bắt đầu",
    options: ["Bắt đầu", "Kết thúc", "Nghỉ ngơi", "Dừng lại"],
    explanation: "开始 (kāishǐ) là khởi đầu một quá trình hoặc hành động (Ví dụ: 开始学习)."
  },
  {
    id: 53,
    hanzi: "考试",
    pinyin: "kǎoshì",
    correctAnswer: "Thi cử / bài thi",
    options: ["Thi cử / bài thi", "Học tập", "Làm việc", "Nghỉ hè"],
    explanation: "考试 (kǎoshì) là kỳ thi hoặc bài kiểm tra năng lực học tập."
  },
  {
    id: 54,
    hanzi: "可能",
    pinyin: "kěnéng",
    correctAnswer: "Có thể / có lẽ (khả năng)",
    options: ["Có thể / có lẽ (khả năng)", "Nhất định", "Không thể", "Nên"],
    explanation: "可能 (kěnéng) biểu thị phán đoán về khả năng xảy ra của một sự việc."
  },
  {
    id: 55,
    hanzi: "可以",
    pinyin: "kěyǐ",
    correctAnswer: "Có thể / được phép",
    options: ["Có thể / được phép", "Không được", "Phải", "Muốn"],
    explanation: "可以 (kěyǐ) biểu thị sự cho phép hoặc khả thi (Ví dụ: 可以吗 - được không?)."
  },
  {
    id: 56,
    hanzi: "课",
    pinyin: "kè",
    correctAnswer: "Tiết học / bài học / môn học",
    options: ["Tiết học / bài học / môn học", "Quyển sách", "Bài thi", "Trường học"],
    explanation: "课 (kè) chỉ giờ lên lớp hoặc nội dung học (Ví dụ: 上课 - vào học)."
  },
  {
    id: 57,
    hanzi: "快",
    pinyin: "kuài",
    correctAnswer: "Nhanh / sắp sửa",
    options: ["Nhanh / sắp sửa", "Chậm", "Cao", "Xa"],
    explanation: "快 (kuài) chỉ tốc độ nhanh hoặc hành động sắp diễn ra (Ví dụ: 跑得很快, 快到了)."
  },
  {
    id: 58,
    hanzi: "快乐",
    pinyin: "kuàilè",
    correctAnswer: "Vui vẻ / hạnh phúc",
    options: ["Vui vẻ / hạnh phúc", "Buồn bã", "Mệt mỏi", "Tức giận"],
    explanation: "快乐 (kuàilè) miêu tả niềm vui trọn vẹn (Ví dụ: 生日快乐 - sinh nhật vui vẻ)."
  },
  {
    id: 59,
    hanzi: "累",
    pinyin: "lèi",
    correctAnswer: "Mệt / mệt mỏi",
    options: ["Mệt / mệt mỏi", "Đói", "Vui vẻ", "Khát"],
    explanation: "累 (lèi) miêu tả trạng thái hao tổn thể lực, mệt sức sau khi làm việc."
  },
  {
    id: 60,
    hanzi: "离",
    pinyin: "lí",
    correctAnswer: "Cách (khoảng cách nơi chốn/thời gian)",
    options: ["Cách (khoảng cách nơi chốn/thời gian)", "Đến", "Ở", "Từ"],
    explanation: "离 (lí) dùng đo cự ly giữa hai điểm (Ví dụ: 我家离学校很近)."
  },
  {
    id: 61,
    hanzi: "两",
    pinyin: "liǎng",
    correctAnswer: "Hai (dùng trước lượng từ)",
    options: ["Hai (dùng trước lượng từ)", "Một", "Ba", "Mười"],
    explanation: "两 (liǎng) dùng để chỉ số lượng 2 khi đứng trước lượng từ (Ví dụ: 两个人)."
  },
  {
    id: 62,
    hanzi: "零",
    pinyin: "líng",
    correctAnswer: "Số không (0)",
    options: ["Số không (0)", "Số một", "Số mười", "Số một trăm"],
    explanation: "零 (líng) là con số 0 trong toán học và ngày tháng."
  },
  {
    id: 63,
    hanzi: "路",
    pinyin: "lù",
    correctAnswer: "Đường / con đường",
    options: ["Đường / con đường", "Cửa", "Phòng", "Cầu"],
    explanation: "路 (lù) là đường sá đi lại (Ví dụ: 路上 - trên đường)."
  },
  {
    id: 64,
    hanzi: "旅游",
    pinyin: "lǚyóu",
    correctAnswer: "Du lịch / đi chơi xa",
    options: ["Du lịch / đi chơi xa", "Làm việc", "Học tập", "Nghỉ ngơi"],
    explanation: "旅游 (lǚyóu) là hoạt động đi tham quan nghỉ dưỡng ở nơi xa."
  },
  {
    id: 65,
    hanzi: "卖",
    pinyin: "mài",
    correctAnswer: "Bán",
    options: ["Bán", "Mua", "Cho", "Lấy"],
    explanation: "卖 (mài - mang thanh 4) nghĩa là bán hàng hóa (đối lập với 买 - mua mang thanh 3)."
  },
  {
    id: 66,
    hanzi: "慢",
    pinyin: "màn",
    correctAnswer: "Chậm / chậm chạp",
    options: ["Chậm / chậm chạp", "Nhanh", "Sớm", "Muộn"],
    explanation: "慢 (màn) miêu tả tốc độ chậm (đối lập với 快, Ví dụ: 慢走 - đi thong thả)."
  },
  {
    id: 67,
    hanzi: "忙",
    pinyin: "máng",
    correctAnswer: "Bận / bận rộn",
    options: ["Bận / bận rộn", "Rảnh", "Mệt", "Vui"],
    explanation: "忙 (máng) miêu tả tình trạng có nhiều việc phải làm (Ví dụ: 你忙吗 - bạn bận không?)."
  },
  {
    id: 68,
    hanzi: "每",
    pinyin: "měi",
    correctAnswer: "Mỗi / từng",
    options: ["Mỗi / từng", "Tất cả", "Nhiều", "Ít"],
    explanation: "每 (měi) chỉ từng cá thể trong một nhóm (Ví dụ: 每天 - mỗi ngày)."
  },
  {
    id: 69,
    hanzi: "妹妹",
    pinyin: "mèimei",
    correctAnswer: "Em gái",
    options: ["Em gái", "Chị gái", "Em trai", "Con gái"],
    explanation: "妹妹 (mèimei) là em gái ruột trong gia đình."
  },
  {
    id: 70,
    hanzi: "门",
    pinyin: "mén",
    correctAnswer: "Cửa / cánh cổng",
    options: ["Cửa / cánh cổng", "Cửa sổ", "Căn phòng", "Bàn"],
    explanation: "门 (mén) là cửa ra vào hoặc cổng nhà (Ví dụ: 开门 - mở cửa)."
  },
  {
    id: 71,
    hanzi: "男",
    pinyin: "nán",
    correctAnswer: "Nam / đàn ông",
    options: ["Nam / đàn ông", "Nữ / phụ nữ", "Trẻ em", "Người già"],
    explanation: "男 (nán) chỉ giới tính nam (Ví dụ: 男人 - đàn ông, 男生 - nam sinh)."
  },
  {
    id: 72,
    hanzi: "您",
    pinyin: "nín",
    correctAnswer: "Ngài / ông / bà (kính ngữ của 你)",
    options: ["Ngài / ông / bà (kính ngữ của 你)", "Tôi", "Anh ấy", "Các bạn"],
    explanation: "您 (nín) thể hiện sự kính trọng với người lớn tuổi hoặc cấp trên."
  },
  {
    id: 73,
    hanzi: "牛奶",
    pinyin: "niúnǎi",
    correctAnswer: "Sữa bò",
    options: ["Sữa bò", "Trà", "Cà phê", "Nước khoáng"],
    explanation: "牛奶 (niúnǎi) là thức uống sữa bò bổ dưỡng."
  },
  {
    id: 74,
    hanzi: "女",
    pinyin: "nǚ",
    correctAnswer: "Nữ / phụ nữ",
    options: ["Nữ / phụ nữ", "Nam / đàn ông", "Bố", "Con trai"],
    explanation: "女 (nǚ) chỉ giới tính nữ (Ví dụ: 女人 - phụ nữ, 女生 - nữ sinh)."
  },
  {
    id: 75,
    hanzi: "旁边",
    pinyin: "pángbiān",
    correctAnswer: "Bên cạnh",
    options: ["Bên cạnh", "Phía trước", "Phía sau", "Bên trong"],
    explanation: "旁边 (pángbiān) là từ chỉ vị trí sát bên một đối tượng."
  },
  {
    id: 76,
    hanzi: "跑步",
    pinyin: "pǎobù",
    correctAnswer: "Chạy bộ",
    options: ["Chạy bộ", "Bơi lội", "Đá bóng", "Đi bộ"],
    explanation: "跑步 (pǎobù) là hoạt động thể dục chạy bộ rèn luyện sức khỏe."
  },
  {
    id: 77,
    hanzi: "便宜",
    pinyin: "piányi",
    correctAnswer: "Rẻ / giá rẻ",
    options: ["Rẻ / giá rẻ", "Đắt", "Đẹp", "Ngon"],
    explanation: "便宜 (piányi) miêu tả giá tiền thấp (đối lập với 贵 - đắt)."
  },
  {
    id: 78,
    hanzi: "票",
    pinyin: "piào",
    correctAnswer: "Vé",
    options: ["Vé", "Tiền", "Sách", "Báo"],
    explanation: "票 (piào) là vé vào cửa, vé xem phim, vé tàu xe (Ví dụ: 车票, 电影票)."
  },
  {
    id: 79,
    hanzi: "妻子",
    pinyin: "qīzi",
    correctAnswer: "Vợ",
    options: ["Vợ", "Chồng", "Mẹ", "Chị gái"],
    explanation: "妻子 (qīzi) là người vợ trong mối quan hệ hôn nhân."
  },
  {
    id: 80,
    hanzi: "起床",
    pinyin: "qǐchuáng",
    correctAnswer: "Thức dậy / rời khỏi giường",
    options: ["Thức dậy / rời khỏi giường", "Đi ngủ", "Tắm rửa", "Ăn sáng"],
    explanation: "起床 (qǐchuáng) là hành động dậy sau giấc ngủ."
  },
  {
    id: 81,
    hanzi: "千",
    pinyin: "qiān",
    correctAnswer: "Nghìn / ngàn (số 1000)",
    options: ["Nghìn / ngàn (số 1000)", "Trăm", "Mười", "Vạn"],
    explanation: "千 (qiān) là hàng ngàn (Ví dụ: 一千 - một nghìn)."
  },
  {
    id: 82,
    hanzi: "铅笔",
    pinyin: "qiānbǐ",
    correctAnswer: "Bút chì",
    options: ["Bút chì", "Sách", "Thước kẻ", "Vở"],
    explanation: "铅笔 (qiānbǐ) là dụng cụ viết bằng chì vẽ hoặc ghi chép."
  },
  {
    id: 83,
    hanzi: "晴",
    pinyin: "qíng",
    correctAnswer: "Trời nắng / quang đãng",
    options: ["Trời nắng / quang đãng", "Trời mưa", "Trời âm u", "Trời lạnh"],
    explanation: "晴 (qíng) miêu tả thời tiết có nắng, trời quang không mây (晴天)."
  },
  {
    id: 84,
    hanzi: "去年",
    pinyin: "qùnián",
    correctAnswer: "Năm ngoái / năm trước",
    options: ["Năm ngoái / năm trước", "Năm nay", "Năm sau", "Tháng trước"],
    explanation: "去年 (qùnián) là năm liền trước năm hiện tại."
  },
  {
    id: 85,
    hanzi: "让",
    pinyin: "ràng",
    correctAnswer: "Cho phép / để cho / nhường / bảo",
    options: ["Cho phép / để cho / nhường / bảo", "Muốn", "Phải", "Biết"],
    explanation: "让 (ràng) là động từ sai khiến hoặc nhượng bộ (Ví dụ: 让我看看 - để tôi xem)."
  },
  {
    id: 86,
    hanzi: "日",
    pinyin: "rì",
    correctAnswer: "Ngày / mặt trời",
    options: ["Ngày / mặt trời", "Tháng", "Năm", "Giờ"],
    explanation: "日 (rì) dùng trong văn viết chỉ ngày trong tháng hoặc mặt trời."
  },
  {
    id: 87,
    hanzi: "上班",
    pinyin: "shàngbān",
    correctAnswer: "Đi làm / bắt đầu ca làm",
    options: ["Đi làm / bắt đầu ca làm", "Tan làm", "Đi học", "Nghỉ ngơi"],
    explanation: "上班 (shàngbān) là đến cơ quan làm việc (đối lập với 下班 - tan làm)."
  },
  {
    id: 88,
    hanzi: "身体",
    pinyin: "shēntǐ",
    correctAnswer: "Cơ thể / sức khỏe",
    options: ["Cơ thể / sức khỏe", "Thời gian", "Công việc", "Tuổi tác"],
    explanation: "身体 (shēntǐ) chỉ thân thể con người hoặc tình trạng sức khỏe (身体好)."
  },
  {
    id: 89,
    hanzi: "生病",
    pinyin: "shēngbìng",
    correctAnswer: "Bị ốm / mắc bệnh",
    options: ["Bị ốm / mắc bệnh", "Khỏe mạnh", "Mệt mỏi", "Uống thuốc"],
    explanation: "生病 (shēngbìng) là trạng thái cơ thể không khỏe, nhiễm bệnh."
  },
  {
    id: 90,
    hanzi: "生日",
    pinyin: "shēngrì",
    correctAnswer: "Ngày sinh nhật",
    options: ["Ngày sinh nhật", "Hôm nay", "Ngày lễ", "Năm mới"],
    explanation: "生日 (shēngrì) là ngày kỷ niệm chào đời của một người."
  },
  {
    id: 91,
    hanzi: "时间",
    pinyin: "shíjiān",
    correctAnswer: "Thời gian",
    options: ["Thời gian", "Thời tiết", "Đồng hồ", "Ngày tháng"],
    explanation: "时间 (shíjiān) chỉ quỹ thời gian hoặc khoảnh khắc (Ví dụ: 没时间 - không có thời gian)."
  },
  {
    id: 92,
    hanzi: "事情",
    pinyin: "shìqing",
    correctAnswer: "Sự việc / công việc / việc",
    options: ["Sự việc / công việc / việc", "Đồ vật", "Thời gian", "Nơi chốn"],
    explanation: "事情 (shìqing) chỉ sự tình hoặc công việc cần giải quyết (Ví dụ: 什么事)."
  },
  {
    id: 93,
    hanzi: "手表",
    pinyin: "shǒubiǎo",
    correctAnswer: "Đồng hồ đeo tay",
    options: ["Đồng hồ đeo tay", "Điện thoại", "Máy tính", "Túi xách"],
    explanation: "手表 (shǒubiǎo) là phụ kiện xem giờ đeo ở cổ tay."
  },
  {
    id: 94,
    hanzi: "手机",
    pinyin: "shǒujī",
    correctAnswer: "Điện thoại di động",
    options: ["Điện thoại di động", "Đồng hồ", "Máy tính", "Tivi"],
    explanation: "手机 (shǒujī) nghĩa đen là 'máy cầm tay', tức điện thoại di động."
  },
  {
    id: 95,
    hanzi: "说话",
    pinyin: "shuōhuà",
    correctAnswer: "Nói chuyện / trò chuyện",
    options: ["Nói chuyện / trò chuyện", "Nghe nhạc", "Hát", "Đọc sách"],
    explanation: "说话 (shuōhuà) là việc phát ra lời nói để trao đổi (Ví dụ: 别说话 - đừng nói chuyện)."
  },
  {
    id: 96,
    hanzi: "送",
    pinyin: "sòng",
    correctAnswer: "Tặng / tiễn đưa",
    options: ["Tặng / tiễn đưa", "Nhận", "Mua", "Mượn"],
    explanation: "送 (sòng) nghĩa là tặng quà (送礼物) hoặc tiễn ai đó lên đường (送朋友)."
  },
  {
    id: 97,
    hanzi: "虽然",
    pinyin: "suīrán",
    correctAnswer: "Mặc dù / tuy rằng",
    options: ["Mặc dù / tuy rằng", "Bởi vì", "Cho nên", "Nếu như"],
    explanation: "虽然 (suīrán) đứng đầu phân câu nhượng bộ, thường đi cặp với 但是 (nhưng)."
  },
  {
    id: 98,
    hanzi: "但是",
    pinyin: "dànshì",
    correctAnswer: "Nhưng mà / tuy nhiên",
    options: ["Nhưng mà / tuy nhiên", "Bởi vì", "Cho nên", "Và"],
    explanation: "但是 (dànshì) là liên từ biểu thị sự chuyển ý tương phản."
  },
  {
    id: 99,
    hanzi: "它",
    pinyin: "tā",
    correctAnswer: "Nó (chỉ động vật, đồ vật)",
    options: ["Nó (chỉ động vật, đồ vật)", "Anh ấy", "Cô ấy", "Tôi"],
    explanation: "它 (tā) là đại từ nhân xưng ngôi thứ ba chỉ con vật hoặc đồ vật."
  },
  {
    id: 100,
    hanzi: "踢足球",
    pinyin: "tī zúqiú",
    correctAnswer: "Đá bóng / chơi bóng đá",
    options: ["Đá bóng / chơi bóng đá", "Chơi bóng rổ", "Bơi lội", "Chạy bộ"],
    explanation: "踢足球 (tī zúqiú) là môn thể thao bóng đá (tī: đá, zúqiú: bóng đá)."
  },
  {
    id: 101,
    hanzi: "题",
    pinyin: "tí",
    correctAnswer: "Câu hỏi / đề bài / chủ đề",
    options: ["Câu hỏi / đề bài / chủ đề", "Quyển sách", "Bài thi", "Điểm số"],
    explanation: "题 (tí) là đề mục, câu hỏi trong bài kiểm tra (Ví dụ: 这道题 - câu hỏi này)."
  },
  {
    id: 102,
    hanzi: "跳舞",
    pinyin: "tiàowǔ",
    correctAnswer: "Nhảy múa / khiêu vũ",
    options: ["Nhảy múa / khiêu vũ", "Ca hát", "Đá bóng", "Chạy bộ"],
    explanation: "跳舞 (tiàowǔ) là vũ đạo biểu diễn hoặc khiêu vũ."
  },
  {
    id: 103,
    hanzi: "外",
    pinyin: "wài",
    correctAnswer: "Ngoài / bên ngoài",
    options: ["Ngoài / bên ngoài", "Trong", "Trên", "Dưới"],
    explanation: "外 (wài) chỉ vị trí bên ngoài (đối lập với 里 - trong)."
  },
  {
    id: 104,
    hanzi: "完",
    pinyin: "wán",
    correctAnswer: "Xong / hết / hoàn thành",
    options: ["Xong / hết / hoàn thành", "Bắt đầu", "Còn lại", "Đang"],
    explanation: "完 (wán) là bổ ngữ kết quả chỉ hành động đã kết thúc (Ví dụ: 做完 - làm xong)."
  },
  {
    id: 105,
    hanzi: "玩",
    pinyin: "wán",
    correctAnswer: "Chơi / vui chơi",
    options: ["Chơi / vui chơi", "Làm việc", "Học tập", "Nghỉ ngơi"],
    explanation: "玩 (wán) là hoạt động giải trí vui chơi (Ví dụ: 好玩 - chơi vui)."
  },
  {
    id: 106,
    hanzi: "晚上",
    pinyin: "wǎnshang",
    correctAnswer: "Buổi tối / ban đêm",
    options: ["Buổi tối / ban đêm", "Buổi sáng", "Buổi chiều", "Buổi trưa"],
    explanation: "晚上 (wǎnshang) là khoảng thời gian từ lúc chập tối đến đêm."
  },
  {
    id: 107,
    hanzi: "往",
    pinyin: "wǎng",
    correctAnswer: "Về phía / hướng tới",
    options: ["Về phía / hướng tới", "Từ", "Ở", "Đến"],
    explanation: "往 (wǎng) là giới từ chỉ hướng chuyển động (Ví dụ: 往前走 - đi về phía trước)."
  },
  {
    id: 108,
    hanzi: "为什么",
    pinyin: "wèishénme",
    correctAnswer: "Tại sao / vì sao",
    options: ["Tại sao / vì sao", "Cái gì", "Ở đâu", "Bao giờ"],
    explanation: "为什么 (wèishénme) là đại từ hỏi nguyên nhân, lý do."
  },
  {
    id: 109,
    hanzi: "问",
    pinyin: "wèn",
    correctAnswer: "Hỏi",
    options: ["Hỏi", "Trả lời", "Nói", "Nghe"],
    explanation: "问 (wèn) là đặt câu hỏi cho người khác (Ví dụ: 问老师 - hỏi thầy giáo)."
  },
  {
    id: 110,
    hanzi: "问题",
    pinyin: "wèntí",
    correctAnswer: "Vấn đề / câu hỏi",
    options: ["Vấn đề / câu hỏi", "Đáp án", "Bài tập", "Ý kiến"],
    explanation: "问题 (wèntí) là khúc mắc, câu hỏi hoặc vấn đề cần xử lý (Ví dụ: 没问题 - không vấn đề)."
  },
  {
    id: 111,
    hanzi: "西瓜",
    pinyin: "xīguā",
    correctAnswer: "Dưa hấu",
    options: ["Dưa hấu", "Táo", "Cam", "Chuối"],
    explanation: "西瓜 (xīguā) là loại trái cây vỏ xanh ruột đỏ nhiều nước ngọt mát."
  },
  {
    id: 112,
    hanzi: "希望",
    pinyin: "xīwàng",
    correctAnswer: "Hy vọng / mong muốn",
    options: ["Hy vọng / mong muốn", "Thất vọng", "Sợ hãi", "Quên mất"],
    explanation: "希望 (xīwàng) biểu thị nguyện vọng tốt đẹp đối với tương lai."
  },
  {
    id: 113,
    hanzi: "洗",
    pinyin: "xǐ",
    correctAnswer: "Rửa / giặt / tắm",
    options: ["Rửa / giặt / tắm", "Mặc", "Mua", "Nấu"],
    explanation: "洗 (xǐ) là làm sạch bằng nước (Ví dụ: 洗手 - rửa tay, 洗衣服 - giặt quần áo)."
  },
  {
    id: 114,
    hanzi: "小时",
    pinyin: "xiǎoshí",
    correctAnswer: "Tiếng đồng hồ / giờ (khoảng thời gian)",
    options: ["Tiếng đồng hồ / giờ (khoảng thời gian)", "Phút", "Giây", "Ngày"],
    explanation: "小时 (xiǎoshí) chỉ độ dài thời gian tính bằng giờ (Ví dụ: 一个小时 - một tiếng)."
  },
  {
    id: 115,
    hanzi: "笑",
    pinyin: "xiào",
    correctAnswer: "Cười",
    options: ["Cười", "Khóc", "Nói", "Hát"],
    explanation: "笑 (xiào) biểu lộ niềm vui qua nụ cười (đối lập với 哭 - khóc)."
  },
  {
    id: 116,
    hanzi: "新",
    pinyin: "xīn",
    correctAnswer: "Mới",
    options: ["Mới", "Cũ", "Đẹp", "Tốt"],
    explanation: "新 (xīn) chỉ sự vật mới xuất hiện (Ví dụ: 新书 - sách mới)."
  },
  {
    id: 117,
    hanzi: "姓",
    pinyin: "xìng",
    correctAnswer: "Họ (họ trong họ tên)",
    options: ["Họ (họ trong họ tên)", "Tên", "Tuổi", "Nghề nghiệp"],
    explanation: "姓 (xìng) dùng chỉ dòng họ của một người (Ví dụ: 我姓王 - tôi họ Vương)."
  },
  {
    id: 118,
    hanzi: "休息",
    pinyin: "xiūxi",
    correctAnswer: "Nghỉ ngơi",
    options: ["Nghỉ ngơi", "Làm việc", "Học tập", "Tập luyện"],
    explanation: "休息 (xiūxi) là dừng công việc để thư giãn, hồi phục năng lượng."
  },
  {
    id: 119,
    hanzi: "雪",
    pinyin: "xuě",
    correctAnswer: "Tuyết",
    options: ["Tuyết", "Mưa", "Gió", "Mây"],
    explanation: "雪 (xuě) là những bông tuyết trắng rơi vào mùa đông (下雪 - tuyết rơi)."
  },
  {
    id: 120,
    hanzi: "颜色",
    pinyin: "yánsè",
    correctAnswer: "Màu sắc",
    options: ["Màu sắc", "Hình dáng", "Kích thước", "Âm thanh"],
    explanation: "颜色 (yánsè) chỉ các sắc màu như đỏ, trắng, đen, xanh."
  },
  {
    id: 121,
    hanzi: "眼睛",
    pinyin: "yǎnjing",
    correctAnswer: "Đôi mắt",
    options: ["Đôi mắt", "Kính đeo", "Khuôn mặt", "Cái tai"],
    explanation: "眼睛 (yǎnjing) là cơ quan thị giác giúp con người nhìn thấy vạn vật."
  },
  {
    id: 122,
    hanzi: "羊肉",
    pinyin: "yángròu",
    correctAnswer: "Thịt cừu",
    options: ["Thịt cừu", "Thịt bò", "Thịt lợn", "Thịt gà"],
    explanation: "羊肉 (yángròu) là món thịt từ loài cừu (dê)."
  },
  {
    id: 123,
    hanzi: "药",
    pinyin: "yào",
    correctAnswer: "Thuốc (chữa bệnh)",
    options: ["Thuốc (chữa bệnh)", "Thức ăn", "Nước uống", "Trà"],
    explanation: "药 (yào) dùng để điều trị bệnh tật (Ví dụ: 吃药 - uống thuốc)."
  },
  {
    id: 124,
    hanzi: "要",
    pinyin: "yào",
    correctAnswer: "Muốn / cần / phải / sắp",
    options: ["Muốn / cần / phải / sắp", "Không muốn", "Đã", "Chưa"],
    explanation: "要 (yào) biểu thị nguyện vọng, nhu cầu hoặc hành động sắp diễn ra."
  },
  {
    id: 125,
    hanzi: "也",
    pinyin: "yě",
    correctAnswer: "Cũng",
    options: ["Cũng", "Đều", "Rất", "Không"],
    explanation: "也 (yě) là phó từ chỉ sự tương đồng (Ví dụ: 我也是 - tôi cũng vậy)."
  },
  {
    id: 126,
    hanzi: "一下",
    pinyin: "yíxià",
    correctAnswer: "Một chút / một lát / thử",
    options: ["Một chút / một lát / thử", "Một lần", "Rất lâu", "Mãi mãi"],
    explanation: "一下 (yíxià) đứng sau động từ làm nhẹ sắc thái hành động (Ví dụ: 看一下 - xem thử một chút)."
  },
  {
    id: 127,
    hanzi: "一起",
    pinyin: "yìqǐ",
    correctAnswer: "Cùng nhau",
    options: ["Cùng nhau", "Một mình", "Trước tiên", "Sau đó"],
    explanation: "一起 (yìqǐ) là phó từ chỉ sự kết hợp đồng thời (Ví dụ: 一起去 - cùng đi)."
  },
  {
    id: 128,
    hanzi: "已经",
    pinyin: "yǐjīng",
    correctAnswer: "Đã / rồi",
    options: ["Đã / rồi", "Chưa", "Đang", "Sẽ"],
    explanation: "已经 (yǐjīng) biểu thị hành động đã hoàn tất trước thời điểm nói (Ví dụ: 已经知道了)."
  },
  {
    id: 129,
    hanzi: "意思",
    pinyin: "yìsi",
    correctAnswer: "Ý nghĩa / sự thú vị",
    options: ["Ý nghĩa / sự thú vị", "Thời gian", "Ý kiến", "Lý do"],
    explanation: "意思 (yìsi) là nội hàm của từ ngữ hoặc sự thú vị (有意思 - thú vị)."
  },
  {
    id: 130,
    hanzi: "因为",
    pinyin: "yīnwèi",
    correctAnswer: "Bởi vì / do",
    options: ["Bởi vì / do", "Cho nên", "Mặc dù", "Nhưng"],
    explanation: "因为 (yīnwèi) là liên từ biểu thị nguyên nhân."
  },
  {
    id: 131,
    hanzi: "所以",
    pinyin: "suǒyǐ",
    correctAnswer: "Cho nên / vì thế",
    options: ["Cho nên / vì thế", "Bởi vì", "Mặc dù", "Nhưng"],
    explanation: "所以 (suǒyǐ) là liên từ biểu thị kết quả, thường đi cặp với 因为."
  },
  {
    id: 132,
    hanzi: "阴",
    pinyin: "yīn",
    correctAnswer: "Âm u / trời râm",
    options: ["Âm u / trời râm", "Nắng ráo", "Mưa to", "Tuyết rơi"],
    explanation: "阴 (yīn) miêu tả thời tiết nhiều mây, không có ánh mặt trời (阴天)."
  },
  {
    id: 133,
    hanzi: "游泳",
    pinyin: "yóuyǒng",
    correctAnswer: "Bơi lội / bơi",
    options: ["Bơi lội / bơi", "Chạy bộ", "Đá bóng", "Chơi bóng rổ"],
    explanation: "游泳 (yóuyǒng) là môn thể thao dưới nước."
  },
  {
    id: 134,
    hanzi: "右边",
    pinyin: "yòubian",
    correctAnswer: "Bên phải",
    options: ["Bên phải", "Bên trái", "Phía trước", "Phía sau"],
    explanation: "右边 (yòubian) là hướng tay phải (đối lập với 左边 - bên trái)."
  },
  {
    id: 135,
    hanzi: "鱼",
    pinyin: "yú",
    correctAnswer: "Con cá",
    options: ["Con cá", "Con gà", "Con cừu", "Con chó"],
    explanation: "鱼 (yú) là loài động vật sống dưới nước có vây và vảy."
  },
  {
    id: 136,
    hanzi: "远",
    pinyin: "yuǎn",
    correctAnswer: "Xa (khoảng cách)",
    options: ["Xa (khoảng cách)", "Gần", "Cao", "Rộng"],
    explanation: "远 (yuǎn) miêu tả cự ly dài (đối lập với 近 - gần)."
  },
  {
    id: 137,
    hanzi: "运动",
    pinyin: "yùndòng",
    correctAnswer: "Vận động / thể thao",
    options: ["Vận động / thể thao", "Học tập", "Làm việc", "Nghỉ ngơi"],
    explanation: "运动 (yùndòng) là tập luyện thể dục thể thao rèn luyện sức khỏe."
  },
  {
    id: 138,
    hanzi: "再",
    pinyin: "zài",
    correctAnswer: "Lại / lần nữa / thêm nữa",
    options: ["Lại / lần nữa / thêm nữa", "Đã", "Chưa", "Vẫn"],
    explanation: "再 (zài) là phó từ chỉ hành động lặp lại trong tương lai (Ví dụ: 再见 - gặp lại sau)."
  },
  {
    id: 139,
    hanzi: "早上",
    pinyin: "zǎoshang",
    correctAnswer: "Sáng sớm",
    options: ["Sáng sớm", "Buổi trưa", "Buổi chiều", "Buổi tối"],
    explanation: "早上 (zǎoshang) là thời điểm sáng tinh mơ khi mặt trời vừa mọc."
  },
  {
    id: 140,
    hanzi: "丈夫",
    pinyin: "zhàngfu",
    correctAnswer: "Người chồng",
    options: ["Người chồng", "Vợ", "Bố", "Anh trai"],
    explanation: "丈夫 (zhàngfu) là người chồng trong gia đình."
  },
  {
    id: 141,
    hanzi: "找",
    pinyin: "zhǎo",
    correctAnswer: "Tìm kiếm / thối tiền",
    options: ["Tìm kiếm / thối tiền", "Mất", "Mua", "Đưa"],
    explanation: "找 (zhǎo) nghĩa là tìm đồ (找东西) hoặc trả lại tiền thừa (找钱)."
  },
  {
    id: 142,
    hanzi: "着",
    pinyin: "zhe",
    correctAnswer: "Đang (trợ từ thái duy trì trạng thái)",
    options: ["Đang (trợ từ thái duy trì trạng thái)", "Đã", "Sẽ", "Chưa"],
    explanation: "着 (zhe) đặt sau động từ chỉ sự tiếp diễn của một trạng thái (Ví dụ: 门开着 - cửa đang mở)."
  },
  {
    id: 143,
    hanzi: "真",
    pinyin: "zhēn",
    correctAnswer: "Thật / thật là",
    options: ["Thật / thật là", "Giả", "Rất", "Không"],
    explanation: "真 (zhēn) là phó từ cảm thán nhấn mạnh (Ví dụ: 真好 - thật là tốt)."
  },
  {
    id: 144,
    hanzi: "正在",
    pinyin: "zhèngzài",
    correctAnswer: "Đang (tiến hành hành động)",
    options: ["Đang (tiến hành hành động)", "Đã", "Sắp", "Vừa"],
    explanation: "正在 (zhèngzài) nhấn mạnh hành động đang diễn ra tại đúng thời điểm nói."
  },
  {
    id: 145,
    hanzi: "知道",
    pinyin: "zhīdào",
    correctAnswer: "Biết / hiểu rõ",
    options: ["Biết / hiểu rõ", "Quên", "Nghĩ", "Hỏi"],
    explanation: "知道 (zhīdào) là nắm được thông tin hoặc sự việc (Ví dụ: 我知道 - tôi biết rồi)."
  },
  {
    id: 146,
    hanzi: "准备",
    pinyin: "zhǔnbèi",
    correctAnswer: "Chuẩn bị / dự định",
    options: ["Chuẩn bị / dự định", "Bắt đầu", "Hoàn thành", "Nghỉ ngơi"],
    explanation: "准备 (zhǔnbèi) là việc sắp xếp trước cho một kế hoạch hoặc công việc."
  },
  {
    id: 147,
    hanzi: "自行车",
    pinyin: "zìxíngchē",
    correctAnswer: "Xe đạp",
    options: ["Xe đạp", "Xe máy", "Xe buýt", "Xe taxi"],
    explanation: "自行车 (zìxíngchē) nghĩa đen là 'xe tự đi', tức xe đạp hai bánh."
  },
  {
    id: 148,
    hanzi: "走",
    pinyin: "zǒu",
    correctAnswer: "Đi / bước đi / rời đi",
    options: ["Đi / bước đi / rời đi", "Chạy", "Ngồi", "Đứng"],
    explanation: "走 (zǒu) là hành động đi bộ hoặc rời khỏi vị trí (Ví dụ: 慢走 - đi thong thả)."
  },
  {
    id: 149,
    hanzi: "最",
    pinyin: "zuì",
    correctAnswer: "Nhất (so sánh bậc nhất)",
    options: ["Nhất (so sánh bậc nhất)", "Hơn", "Rất", "Đều"],
    explanation: "最 (zuì) đứng trước tính từ biểu thị mức độ cao nhất (Ví dụ: 最好 - tốt nhất)."
  },
  {
    id: 150,
    hanzi: "左边",
    pinyin: "zuǒbian",
    correctAnswer: "Bên trái",
    options: ["Bên trái", "Bên phải", "Phía trước", "Phía sau"],
    explanation: "左边 (zuǒbian) là phương hướng bên tay trái (đối lập với 右边 - bên phải)."
  }
];

export function buildHsk2Data() {
  const formattedHsk2 = rawHsk2Vocab.map(v => ({
    id: v.id,
    hanzi: v.hanzi,
    pinyin: v.pinyin,
    question: v.hanzi + " — " + v.pinyin + " nghĩa là gì?",
    options: v.options,
    correctAnswer: v.correctAnswer,
    explanation: v.explanation,
  }));

  const hsk2Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(formattedHsk2, null, 2) + ";\n";

  const outputPath2 = path.resolve(process.cwd(), 'data/hsk2-data.ts');
  fs.writeFileSync(outputPath2, hsk2Code, 'utf-8');
  console.log("Generated HSK 2: " + formattedHsk2.length + " questions at " + outputPath2);

  // Generate Combined HSK 1 + HSK 2 (total 300 questions)
  const combined = [
    ...HSK1_VOCAB_DATA.map((q, idx) => ({ ...q, id: idx + 1 })),
    ...formattedHsk2.map((q, idx) => ({ ...q, id: 150 + idx + 1 }))
  ];

  const combinedCode = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK_COMBINED_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(combined, null, 2) + ";\n";

  const outputPathCombined = path.resolve(process.cwd(), 'data/hsk-combined-data.ts');
  fs.writeFileSync(outputPathCombined, combinedCode, 'utf-8');
  console.log("Generated HSK 1+2 Combined: " + combined.length + " questions at " + outputPathCombined);
}

buildHsk2Data();
