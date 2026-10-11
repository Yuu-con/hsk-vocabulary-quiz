import fs from 'fs';
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

export const rawHsk2Vocab: VocabDef[] = [
  {
    "id": 1,
    "hanzi": "旅游",
    "pinyin": "lǚyóu",
    "lesson": 1,
    "correctAnswer": "Du lịch / Tham quan",
    "options": [
      "Du lịch / Tham quan",
      "Làm việc công sở",
      "Học tập trường lớp",
      "Nghỉ ngơi tại nhà"
    ],
    "explanation": "旅游 (lǚyóu) là hoạt động đi tham quan nghỉ dưỡng (Ví dụ: 去北京旅游 - đi Bắc Kinh du lịch)."
  },
  {
    "id": 2,
    "hanzi": "觉得",
    "pinyin": "juéde",
    "lesson": 1,
    "correctAnswer": "Cảm thấy / Cho rằng",
    "options": [
      "Cảm thấy / Cho rằng",
      "Nghe thấy thanh âm",
      "Nhìn thấy tận mắt",
      "Biết rõ sự tình"
    ],
    "explanation": "觉得 (juéde) dùng để bày tỏ cảm nhận, nhận định cá nhân (Ví dụ: 我觉得很好 - Tôi cảm thấy rất tốt)."
  },
  {
    "id": 3,
    "hanzi": "最",
    "pinyin": "zuì",
    "lesson": 1,
    "correctAnswer": "Nhất / Cực kỳ",
    "options": [
      "Nhất / Cực kỳ",
      "Hơn / Tương đối",
      "Rất / Khá là",
      "Đều / Toàn bộ"
    ],
    "explanation": "最 (zuì) đứng trước tính từ/động từ chỉ mức độ cao nhất (Ví dụ: 最好 - tốt nhất, 最喜欢 - thích nhất)."
  },
  {
    "id": 4,
    "hanzi": "为什么",
    "pinyin": "wèishénme",
    "lesson": 1,
    "correctAnswer": "Tại sao / Vì sao",
    "options": [
      "Tại sao / Vì sao",
      "Cái gì đồ vật",
      "Ở đâu nơi chốn",
      "Bao giờ thời điểm"
    ],
    "explanation": "为什么 (wèishénme) là đại từ hỏi nguyên nhân, lý do."
  },
  {
    "id": 5,
    "hanzi": "也",
    "pinyin": "yě",
    "lesson": 1,
    "correctAnswer": "Cũng / Cũng vậy",
    "options": [
      "Cũng / Cũng vậy",
      "Đều là toàn bộ",
      "Rất là mức độ",
      "Không là phủ định"
    ],
    "explanation": "也 (yě) là phó từ chỉ sự đồng nhất, tương đồng (Ví dụ: 我也是 - Tôi cũng vậy)."
  },
  {
    "id": 6,
    "hanzi": "运动",
    "pinyin": "yùndòng",
    "lesson": 1,
    "correctAnswer": "Vận động / Thể thao",
    "options": [
      "Vận động / Thể thao",
      "Học tập tri thức",
      "Nghỉ ngơi an dưỡng",
      "Làm việc công tác"
    ],
    "explanation": "运动 (yùndòng) là hoạt động thể dục thể thao rèn luyện sức khỏe."
  },
  {
    "id": 7,
    "hanzi": "踢足球",
    "pinyin": "tī zúqiú",
    "lesson": 1,
    "correctAnswer": "Đá bóng / Chơi bóng đá",
    "options": [
      "Đá bóng / Chơi bóng đá",
      "Chơi bóng rổ tay",
      "Bơi lội dưới nước",
      "Chạy bộ rèn sức"
    ],
    "explanation": "踢足球 (tī zúqiú) là môn bóng đá."
  },
  {
    "id": 8,
    "hanzi": "一起",
    "pinyin": "yìqǐ",
    "lesson": 1,
    "correctAnswer": "Cùng nhau",
    "options": [
      "Cùng nhau",
      "Một mình đơn độc",
      "Trước tiên mở đầu",
      "Sau đó tiếp nối"
    ],
    "explanation": "一起 (yìqǐ) chỉ sự kết hợp đồng thời cùng làm gì đó (Ví dụ: 一起去 - cùng đi)."
  },
  {
    "id": 9,
    "hanzi": "新",
    "pinyin": "xīn",
    "lesson": 1,
    "correctAnswer": "Mới mẻ / Mới",
    "options": [
      "Mới mẻ / Mới",
      "Cũ kỹ cổ xưa",
      "Đẹp đẽ mỹ miều",
      "Tốt lành thuận lợi"
    ],
    "explanation": "新 (xīn) chỉ sự vật mới xuất hiện (Ví dụ: 新书 - sách mới, 新年 - năm mới)."
  },
  {
    "id": 10,
    "hanzi": "要",
    "pinyin": "yào",
    "lesson": 1,
    "correctAnswer": "Cần / Muốn / Sắp sửa",
    "options": [
      "Cần / Muốn / Sắp sửa",
      "Không cần chối từ",
      "Đã từng trải qua",
      "Chưa từng thực hiện"
    ],
    "explanation": "要 (yào) biểu thị nhu cầu, nguyện vọng hoặc hành động sắp diễn ra (Ví dụ: 我要买 - tôi muốn mua)."
  },
  {
    "id": 11,
    "hanzi": "生病",
    "pinyin": "shēngbìng",
    "lesson": 2,
    "correctAnswer": "Bị ốm / Nhiễm bệnh",
    "options": [
      "Bị ốm / Nhiễm bệnh",
      "Khỏe mạnh cường tráng",
      "Mệt mỏi kiệt sức",
      "Đau đầu nhức óc"
    ],
    "explanation": "生病 (shēngbìng) là trạng thái cơ thể không khỏe, mắc bệnh tật."
  },
  {
    "id": 12,
    "hanzi": "每",
    "pinyin": "měi",
    "lesson": 2,
    "correctAnswer": "Mỗi / Hàng",
    "options": [
      "Mỗi / Hàng",
      "Tất cả toàn bộ",
      "Rất nhiều vô kể",
      "Ít ỏi hiếm hoi"
    ],
    "explanation": "每 (měi) chỉ từng cá thể trong một tập thể (Ví dụ: 每天 - mỗi ngày/hàng ngày, 每个人 - mỗi người)."
  },
  {
    "id": 13,
    "hanzi": "早上",
    "pinyin": "zǎoshang",
    "lesson": 2,
    "correctAnswer": "Buổi sáng / Sáng sớm",
    "options": [
      "Buổi sáng / Sáng sớm",
      "Buổi trưa chính ngọ",
      "Buổi chiều tà tà",
      "Buổi tối đêm khuya"
    ],
    "explanation": "早上 (zǎoshang) là thời điểm sáng sớm khi mặt trời vừa lên."
  },
  {
    "id": 14,
    "hanzi": "跑步",
    "pinyin": "pǎobù",
    "lesson": 2,
    "correctAnswer": "Chạy bộ",
    "options": [
      "Chạy bộ",
      "Bơi lội dưới hồ",
      "Đá bóng sân cỏ",
      "Đi dạo thong thả"
    ],
    "explanation": "跑步 (pǎobù) là hoạt động chạy bộ rèn luyện sức khỏe."
  },
  {
    "id": 15,
    "hanzi": "起床",
    "pinyin": "qǐchuáng",
    "lesson": 2,
    "correctAnswer": "Thức dậy",
    "options": [
      "Thức dậy",
      "Đi ngủ say giấc",
      "Tắm gội sạch sẽ",
      "Ăn sáng điểm tâm"
    ],
    "explanation": "起床 (qǐchuáng) là thức dậy sau giấc ngủ."
  },
  {
    "id": 16,
    "hanzi": "药",
    "pinyin": "yào",
    "lesson": 2,
    "correctAnswer": "Thuốc uống / Dược phẩm",
    "options": [
      "Thuốc uống / Dược phẩm",
      "Thức ăn bổ dưỡng",
      "Nước ngọt giải khát",
      "Trà xanh thanh nhiệt"
    ],
    "explanation": "药 (yào) là thuốc chữa bệnh (Ví dụ: 吃药 - uống thuốc, 中药 - thuốc đông y)."
  },
  {
    "id": 17,
    "hanzi": "身体",
    "pinyin": "shēntǐ",
    "lesson": 2,
    "correctAnswer": "Thân thể / Sức khỏe",
    "options": [
      "Thân thể / Sức khỏe",
      "Thời gian năm tháng",
      "Công việc sự nghiệp",
      "Tuổi tác đời người"
    ],
    "explanation": "身体 (shēntǐ) chỉ cơ thể hoặc sức khỏe con người (身体好: sức khỏe tốt)."
  },
  {
    "id": 18,
    "hanzi": "休息",
    "pinyin": "xiūxi",
    "lesson": 2,
    "correctAnswer": "Nghỉ ngơi",
    "options": [
      "Nghỉ ngơi",
      "Làm việc miệt mài",
      "Học tập chăm chỉ",
      "Tập luyện thể thao"
    ],
    "explanation": "休息 (xiūxi) là dừng công việc để nghỉ ngơi, hồi phục sức lực."
  },
  {
    "id": 19,
    "hanzi": "出",
    "pinyin": "chū",
    "lesson": 2,
    "correctAnswer": "Đi ra / Ra ngoài",
    "options": [
      "Đi ra / Ra ngoài",
      "Đi vào bên trong",
      "Đi đến nơi xa",
      "Trở về chốn cũ"
    ],
    "explanation": "出 (chū) là chuyển động từ trong ra ngoài (Ví dụ: 出去 - đi ra ngoài, 出院 - xuất viện)."
  },
  {
    "id": 20,
    "hanzi": "忙",
    "pinyin": "máng",
    "lesson": 2,
    "correctAnswer": "Bận rộn / Bận",
    "options": [
      "Bận rộn / Bận",
      "Rảnh rỗi thảnh thơi",
      "Mệt mỏi đuối sức",
      "Vui vẻ phấn khởi"
    ],
    "explanation": "忙 (máng) miêu tả trạng thái có nhiều việc phải làm tất bật (Ví dụ: 你忙吗 - bạn bận không?)."
  },
  {
    "id": 21,
    "hanzi": "手表",
    "pinyin": "shǒubiǎo",
    "lesson": 3,
    "correctAnswer": "Đồng hồ đeo tay",
    "options": [
      "Đồng hồ đeo tay",
      "Điện thoại di động",
      "Máy vi tính để bàn",
      "Túi xách thời trang"
    ],
    "explanation": "手表 (shǒubiǎo) là phụ kiện xem giờ đeo ở cổ tay."
  },
  {
    "id": 22,
    "hanzi": "千",
    "pinyin": "qiān",
    "lesson": 3,
    "correctAnswer": "Một nghìn / Ngàn",
    "options": [
      "Một nghìn / Ngàn",
      "Một trăm",
      "Một vạn",
      "Mười"
    ],
    "explanation": "千 (qiān) là hàng ngàn (Ví dụ: 一千 - một nghìn, 三千 - ba nghìn)."
  },
  {
    "id": 23,
    "hanzi": "报纸",
    "pinyin": "bàozhǐ",
    "lesson": 3,
    "correctAnswer": "Báo chí / Tờ báo",
    "options": [
      "Báo chí / Tờ báo",
      "Quyển sách vở",
      "Cây bút mực",
      "Tờ giấy trắng"
    ],
    "explanation": "报纸 (bàozhǐ) là ấn phẩm báo đọc tin tức (看报纸 - đọc báo)."
  },
  {
    "id": 24,
    "hanzi": "送",
    "pinyin": "sòng",
    "lesson": 3,
    "correctAnswer": "Tặng / Tiễn đưa",
    "options": [
      "Tặng / Tiễn đưa",
      "Nhận / Đón rước",
      "Mua / Bán đồ",
      "Mượn / Vay tiền"
    ],
    "explanation": "送 (sòng) vừa là tặng quà (送礼物), vừa là tiễn ai đó lên đường (送朋友: tiễn bạn)."
  },
  {
    "id": 25,
    "hanzi": "一下",
    "pinyin": "yíxià",
    "lesson": 3,
    "correctAnswer": "Một lát / Thử xem",
    "options": [
      "Một lát / Thử xem",
      "Một lần duy nhất",
      "Rất lâu hàng giờ",
      "Mãi mãi trường tồn"
    ],
    "explanation": "一下 (yíxià) đứng sau động từ để làm nhẹ sắc thái, biểu thị làm thử một chút (看一下 - xem thử)."
  },
  {
    "id": 26,
    "hanzi": "牛奶",
    "pinyin": "niúnǎi",
    "lesson": 3,
    "correctAnswer": "Sữa bò",
    "options": [
      "Sữa bò",
      "Trà xanh thanh mát",
      "Cà phê đen đậm",
      "Nước khoáng tinh khiết"
    ],
    "explanation": "牛奶 (niúnǎi) là thức uống sữa dinh dưỡng từ con bò."
  },
  {
    "id": 27,
    "hanzi": "房间",
    "pinyin": "fángjiān",
    "lesson": 3,
    "correctAnswer": "Căn phòng / Buồng",
    "options": [
      "Căn phòng / Buồng",
      "Ngôi nhà toàn thể",
      "Cửa hàng / Tiệm",
      "Trường học"
    ],
    "explanation": "房间 (fángjiān) là căn phòng bên trong ngôi nhà hoặc khách sạn."
  },
  {
    "id": 28,
    "hanzi": "丈夫",
    "pinyin": "zhàngfu",
    "lesson": 3,
    "correctAnswer": "Người chồng / Chồng",
    "options": [
      "Người chồng / Chồng",
      "Người vợ thê tử",
      "Người cha phụ thân",
      "Anh trai ca ca"
    ],
    "explanation": "丈夫 (zhàngfu) là người chồng trong quan hệ hôn nhân."
  },
  {
    "id": 29,
    "hanzi": "红",
    "pinyin": "hóng",
    "lesson": 3,
    "correctAnswer": "Màu đỏ / Hồng",
    "options": [
      "Màu đỏ / Hồng",
      "Màu trắng bạch",
      "Màu đen hắc",
      "Màu vàng hoàng"
    ],
    "explanation": "红 (hóng) chỉ màu đỏ (Ví dụ: 红色的衣服 - quần áo màu đỏ)."
  },
  {
    "id": 30,
    "hanzi": "颜色",
    "pinyin": "yánsè",
    "lesson": 3,
    "correctAnswer": "Màu sắc",
    "options": [
      "Màu sắc",
      "Hình dáng vóc dáng",
      "Kích thước độ lớn",
      "Âm thanh tiếng động"
    ],
    "explanation": "颜色 (yánsè) chỉ các sắc màu như đỏ, xanh, trắng, vàng."
  },
  {
    "id": 31,
    "hanzi": "生日",
    "pinyin": "shēngrì",
    "lesson": 4,
    "correctAnswer": "Sinh nhật / Ngày sinh",
    "options": [
      "Sinh nhật / Ngày sinh",
      "Hôm nay hiện tại",
      "Ngày lễ kỷ niệm",
      "Năm mới tết đến"
    ],
    "explanation": "生日 (shēngrì) là ngày kỷ niệm chào đời (Ví dụ: 生日快乐 - sinh nhật vui vẻ)."
  },
  {
    "id": 32,
    "hanzi": "快乐",
    "pinyin": "kuàilè",
    "lesson": 4,
    "correctAnswer": "Hạnh phúc / Vui vẻ",
    "options": [
      "Hạnh phúc / Vui vẻ",
      "Buồn bã đau thương",
      "Mệt mỏi suy kiệt",
      "Tức giận căm hờn"
    ],
    "explanation": "快乐 (kuàilè) miêu tả niềm vui trọn vẹn, hoan hỷ."
  },
  {
    "id": 33,
    "hanzi": "给",
    "pinyin": "gěi",
    "lesson": 4,
    "correctAnswer": "Cho / Đưa cho / Cấp",
    "options": [
      "Cho / Đưa cho / Cấp",
      "Cầm / Nhận lấy",
      "Bán / Giao đồ",
      "Mua / Chuộc về"
    ],
    "explanation": "给 (gěi) là đưa vật gì cho ai (给你) hoặc giới từ làm gì cho ai (给我买: mua cho tôi)."
  },
  {
    "id": 34,
    "hanzi": "晚上",
    "pinyin": "wǎnshang",
    "lesson": 4,
    "correctAnswer": "Buổi tối / Ban đêm",
    "options": [
      "Buổi tối / Ban đêm",
      "Buổi sáng sớm mai",
      "Buổi chiều tà tà",
      "Buổi trưa chính ngọ"
    ],
    "explanation": "晚上 (wǎnshang) là khoảng thời gian từ chiều tối đến đêm."
  },
  {
    "id": 35,
    "hanzi": "问",
    "pinyin": "wèn",
    "lesson": 4,
    "correctAnswer": "Hỏi / Hỏi thăm",
    "options": [
      "Hỏi / Hỏi thăm",
      "Trả lời giải đáp",
      "Nói năng phát biểu",
      "Lắng nghe tiếp nhận"
    ],
    "explanation": "问 (wèn) là đặt câu hỏi (Ví dụ: 问好 - hỏi thăm, 问老师 - hỏi thầy giáo)."
  },
  {
    "id": 36,
    "hanzi": "非常",
    "pinyin": "fēicháng",
    "lesson": 4,
    "correctAnswer": "Vô cùng / Phi thường / Rất",
    "options": [
      "Vô cùng / Phi thường / Rất",
      "Một chút ít ỏi",
      "Bình thường không có gì",
      "Không hề phủ định"
    ],
    "explanation": "非常 (fēicháng) là phó từ chỉ mức độ cao hơn cả 很 (非常高兴)."
  },
  {
    "id": 37,
    "hanzi": "开始",
    "pinyin": "kāishǐ",
    "lesson": 4,
    "correctAnswer": "Bắt đầu / Khởi đầu",
    "options": [
      "Bắt đầu / Khởi đầu",
      "Kết thúc hoàn tất",
      "Nghỉ ngơi tạm dừng",
      "Dừng hẳn thôi làm"
    ],
    "explanation": "开始 (kāishǐ) là khởi đầu một quá trình hoặc hành động (开始学习 - bắt đầu học)."
  },
  {
    "id": 38,
    "hanzi": "介绍",
    "pinyin": "jièshào",
    "lesson": 4,
    "correctAnswer": "Giới thiệu / Tiến cử",
    "options": [
      "Giới thiệu / Tiến cử",
      "Giúp đỡ hỗ trợ",
      "Bắt đầu mở màn",
      "Gặp gỡ tương ngộ"
    ],
    "explanation": "介绍 (jièshào) là làm quen, cung cấp thông tin người hoặc vật (介绍一下)."
  },
  {
    "id": 39,
    "hanzi": "去年",
    "pinyin": "qùnián",
    "lesson": 4,
    "correctAnswer": "Năm ngoái",
    "options": [
      "Năm ngoái",
      "Năm nay kim niên",
      "Năm sau minh niên",
      "Tháng trước thượng nguyệt"
    ],
    "explanation": "去年 (qùnián) là năm vừa trôi qua liền trước năm hiện tại."
  },
  {
    "id": 40,
    "hanzi": "累",
    "pinyin": "lèi",
    "lesson": 4,
    "correctAnswer": "Mệt mỏi / Mệt nhọc",
    "options": [
      "Mệt mỏi / Mệt nhọc",
      "Đói bụng cồn cào",
      "Vui vẻ phấn khởi",
      "Khát nước cháy họng"
    ],
    "explanation": "累 (lèi) miêu tả trạng thái hao tổn thể lực sau khi làm việc nặng."
  },
  {
    "id": 41,
    "hanzi": "外",
    "pinyin": "wài",
    "lesson": 5,
    "correctAnswer": "Bên ngoài / Ngoại",
    "options": [
      "Bên ngoài / Ngoại",
      "Bên trong phía trong",
      "Bên trên phía trên",
      "Bên dưới phía dưới"
    ],
    "explanation": "外 (wài) chỉ vị trí bên ngoài (Ví dụ: 外面 - bên ngoài, 外国 - nước ngoài)."
  },
  {
    "id": 42,
    "hanzi": "自行车",
    "pinyin": "zìxíngchē",
    "lesson": 5,
    "correctAnswer": "Xe đạp",
    "options": [
      "Xe đạp",
      "Xe máy hai bánh",
      "Xe buýt công cộng",
      "Xe taxi dịch vụ"
    ],
    "explanation": "自行车 (zìxíngchē) là xe đạp."
  },
  {
    "id": 43,
    "hanzi": "羊肉",
    "pinyin": "yángròu",
    "lesson": 5,
    "correctAnswer": "Thịt cừu / Thịt dê",
    "options": [
      "Thịt cừu / Thịt dê",
      "Thịt bò bổ dưỡng",
      "Thịt heo nạc dăm",
      "Thịt gà thả vườn"
    ],
    "explanation": "羊肉 (yángròu) là món thịt từ loài dê hoặc cừu."
  },
  {
    "id": 44,
    "hanzi": "好吃",
    "pinyin": "hǎochī",
    "lesson": 5,
    "correctAnswer": "Ngon miệng / Ngon",
    "options": [
      "Ngon miệng / Ngon",
      "Khó nuốt vị đắng",
      "Đẹp đẽ ưa nhìn",
      "Vui tươi sảng khoái"
    ],
    "explanation": "好吃 (hǎochī) khen ngợi đồ ăn thơm ngon hợp khẩu vị."
  },
  {
    "id": 45,
    "hanzi": "吧",
    "pinyin": "ba",
    "lesson": 5,
    "correctAnswer": "Nhé / Đi",
    "options": [
      "Nhé / Đi",
      "Không phủ định",
      "Ở đâu / Vị trí nào",
      "Của ai sở hữu"
    ],
    "explanation": "吧 (ba) đứng cuối câu biểu thị sự gợi ý, đề xuất, thương lượng (走吧 - đi thôi nào)."
  },
  {
    "id": 46,
    "hanzi": "件",
    "pinyin": "jiàn",
    "lesson": 5,
    "correctAnswer": "Chiếc / Vụ việc",
    "options": [
      "Chiếc / Vụ việc",
      "Cuốn sách tập san",
      "Cái chén cái cốc",
      "Bát cơm tô canh"
    ],
    "explanation": "件 (jiàn) là lượng từ dùng cho quần áo (一件衣服) hoặc sự việc (一件事)."
  },
  {
    "id": 47,
    "hanzi": "还",
    "pinyin": "hái",
    "lesson": 5,
    "correctAnswer": "Vẫn còn / Còn",
    "options": [
      "Vẫn còn / Còn",
      "Đã qua dĩ vãng",
      "Chưa từng trải qua",
      "Chỉ có duy nhất"
    ],
    "explanation": "还 (hái) là phó từ biểu thị sự tiếp diễn hoặc bổ sung (Ví dụ: 还有 - vẫn còn)."
  },
  {
    "id": 48,
    "hanzi": "可以",
    "pinyin": "kěyǐ",
    "lesson": 5,
    "correctAnswer": "Có thể / Được phép",
    "options": [
      "Có thể / Được phép",
      "Không được cấm đoán",
      "Bắt buộc phải làm",
      "Muốn có ước ao"
    ],
    "explanation": "可以 (kěyǐ) biểu thị sự cho phép hoặc khả thi (Ví dụ: 可以吗 - được không?)."
  },
  {
    "id": 49,
    "hanzi": "咖啡",
    "pinyin": "kāfēi",
    "lesson": 5,
    "correctAnswer": "Cà phê",
    "options": [
      "Cà phê",
      "Trà thơm thanh mát",
      "Nước lọc tinh khiết",
      "Sữa bò nguyên kem"
    ],
    "explanation": "咖啡 (kāfēi) là đồ uống cà phê pha từ hạt cà phê."
  },
  {
    "id": 50,
    "hanzi": "鱼",
    "pinyin": "yú",
    "lesson": 5,
    "correctAnswer": "Con cá",
    "options": [
      "Con cá",
      "Con gà gáy sáng",
      "Con cừu lông trắng",
      "Con chó giữ nhà"
    ],
    "explanation": "鱼 (yú) là loài động vật sống dưới nước có vây và vảy (吃鱼: ăn cá)."
  },
  {
    "id": 51,
    "hanzi": "门",
    "pinyin": "mén",
    "lesson": 6,
    "correctAnswer": "Cửa vào / Cổng",
    "options": [
      "Cửa vào / Cổng",
      "Cửa sổ thông gió",
      "Căn phòng ngủ",
      "Cái bàn ăn cơm"
    ],
    "explanation": "门 (mén) là cửa ra vào hoặc cổng nhà (Ví dụ: 开门 - mở cửa)."
  },
  {
    "id": 52,
    "hanzi": "考试",
    "pinyin": "kǎoshì",
    "lesson": 6,
    "correctAnswer": "Thi cử / Kiểm tra",
    "options": [
      "Thi cử / Kiểm tra",
      "Học tập trường lớp",
      "Làm việc công sở",
      "Nghỉ hè an dưỡng"
    ],
    "explanation": "考试 (kǎoshì) là kỳ thi hoặc bài kiểm tra năng lực học tập."
  },
  {
    "id": 53,
    "hanzi": "意思",
    "pinyin": "yìsi",
    "lesson": 6,
    "correctAnswer": "Ý nghĩa / Thú vị",
    "options": [
      "Ý nghĩa / Thú vị",
      "Thời gian năm tháng",
      "Ý kiến đóng góp",
      "Lý do biện minh"
    ],
    "explanation": "意思 (yìsi) là nội hàm của từ ngữ hoặc sự thú vị (有意思 - thú vị, 什么意思 - ý gì)."
  },
  {
    "id": 54,
    "hanzi": "准备",
    "pinyin": "zhǔnbèi",
    "lesson": 6,
    "correctAnswer": "Chuẩn bị / Trù bị",
    "options": [
      "Chuẩn bị / Trù bị",
      "Bắt đầu",
      "Hoàn thành xong xuôi",
      "Nghỉ ngơi thư giãn"
    ],
    "explanation": "准备 (zhǔnbèi) là sắp xếp, trù bị trước cho một kế hoạch hoặc công việc."
  },
  {
    "id": 55,
    "hanzi": "阴",
    "pinyin": "yīn",
    "lesson": 6,
    "correctAnswer": "Trời râm / U ám",
    "options": [
      "Trời râm / U ám",
      "Trời nắng chói chang",
      "Trời mưa tầm tã",
      "Tuyết rơi lạnh buốt"
    ],
    "explanation": "阴 (yīn) miêu tả thời tiết nhiều mây, không có ánh nắng mặt trời (阴天: ngày râm trời)."
  },
  {
    "id": 56,
    "hanzi": "懂",
    "pinyin": "dǒng",
    "lesson": 6,
    "correctAnswer": "Hiểu rõ / Nắm được",
    "options": [
      "Hiểu rõ / Nắm được",
      "Quên mất",
      "Nói năng phát biểu",
      "Nhìn thấy mắt thấy"
    ],
    "explanation": "懂 (dǒng) chỉ sự nhận thức, hiểu rõ nội dung (Ví dụ: 我懂了 - tôi hiểu rồi)."
  },
  {
    "id": 57,
    "hanzi": "题",
    "pinyin": "tí",
    "lesson": 6,
    "correctAnswer": "Đề thi / Câu hỏi",
    "options": [
      "Đề thi / Câu hỏi",
      "Quyển sách",
      "Bài thi kiểm tra",
      "Điểm số đạt được"
    ],
    "explanation": "题 (tí) là đề mục, câu hỏi trong bài kiểm tra (这道题 - câu hỏi này)."
  },
  {
    "id": 58,
    "hanzi": "西瓜",
    "pinyin": "xīguā",
    "lesson": 6,
    "correctAnswer": "Dưa hấu",
    "options": [
      "Dưa hấu",
      "Quả táo đỏ giòn",
      "Quả cam mọng nước",
      "Quả chuối chín vàng"
    ],
    "explanation": "西瓜 (xīguā) là loại dưa vỏ xanh ruột đỏ nhiều nước ngọt mát."
  },
  {
    "id": 59,
    "hanzi": "鸡蛋",
    "pinyin": "jīdàn",
    "lesson": 6,
    "correctAnswer": "Trứng gà",
    "options": [
      "Trứng gà",
      "Thịt cừu nướng",
      "Cá tươi kho",
      "Thịt bò xào"
    ],
    "explanation": "鸡蛋 (jīdàn) là thực phẩm quen thuộc."
  },
  {
    "id": 60,
    "hanzi": "完",
    "pinyin": "wán",
    "lesson": 6,
    "correctAnswer": "Xong xuôi / Hoàn thành",
    "options": [
      "Xong xuôi / Hoàn thành",
      "Bắt đầu khởi đầu",
      "Còn lại dư thừa",
      "Đang làm dang dở"
    ],
    "explanation": "完 (wán) là bổ ngữ kết quả chỉ hành động đã kết thúc trọn vẹn (做完 - làm xong)."
  },
  {
    "id": 61,
    "hanzi": "离",
    "pinyin": "lí",
    "lesson": 7,
    "correctAnswer": "Cách xa / Ly",
    "options": [
      "Cách xa / Ly",
      "Đến gần cận kề",
      "Ở tại vị trí",
      "Từ nơi xuất phát"
    ],
    "explanation": "离 (lí) dùng để đo cự ly giữa hai địa điểm (我家离学校很近 - Nhà tôi cách trường rất gần)."
  },
  {
    "id": 62,
    "hanzi": "公司",
    "pinyin": "gōngsī",
    "lesson": 7,
    "correctAnswer": "Công ty / Doanh nghiệp",
    "options": [
      "Công ty / Doanh nghiệp",
      "Bệnh viện khám bệnh",
      "Trường học giảng dạy",
      "Cửa hàng bán lẻ"
    ],
    "explanation": "公司 (gōngsī) là cơ quan, doanh nghiệp làm việc (去公司 - đến công ty làm việc)."
  },
  {
    "id": 63,
    "hanzi": "远",
    "pinyin": "yuǎn",
    "lesson": 7,
    "correctAnswer": "Xa xôi / Xa",
    "options": [
      "Xa xôi / Xa",
      "Gần gũi sát bên",
      "Cao ráo ngất trời",
      "Rộng lớn bao la"
    ],
    "explanation": "远 (yuǎn) miêu tả cự ly dài, khoảng cách xa (Ví dụ: 很远 - rất xa)."
  },
  {
    "id": 64,
    "hanzi": "公共汽车",
    "pinyin": "gōnggòng qìchē",
    "lesson": 7,
    "correctAnswer": "Xe buýt",
    "options": [
      "Xe buýt",
      "Xe taxi dịch vụ",
      "Máy bay hàng không",
      "Xe đạp hai bánh"
    ],
    "explanation": "公共汽车 (gōnggòng qìchē) là phương tiện xe buýt công cộng."
  },
  {
    "id": 65,
    "hanzi": "小时",
    "pinyin": "xiǎoshí",
    "lesson": 7,
    "correctAnswer": "Tiếng đồng hồ / Giờ",
    "options": [
      "Tiếng đồng hồ / Giờ",
      "Phút giây chốc lát",
      "Ngày đêm tròn vẹn",
      "Tháng năm dài lâu"
    ],
    "explanation": "小时 (xiǎoshí) chỉ khoảng thời gian tính bằng giờ (一个小时 - một tiếng đồng hồ)."
  },
  {
    "id": 66,
    "hanzi": "慢",
    "pinyin": "màn",
    "lesson": 7,
    "correctAnswer": "Chậm chạp / Từ tốn",
    "options": [
      "Chậm chạp / Từ tốn",
      "Nhanh nhẹn cấp tốc",
      "Sớm sủa kịp thời",
      "Muộn màng trễ nải"
    ],
    "explanation": "慢 (màn) miêu tả tốc độ chậm (慢走: đi thong thả, 走得慢: đi chậm)."
  },
  {
    "id": 67,
    "hanzi": "快",
    "pinyin": "kuài",
    "lesson": 7,
    "correctAnswer": "Nhanh / Sắp sửa",
    "options": [
      "Nhanh / Sắp sửa",
      "Chậm / Muộn màng",
      "Sớm / Kịp thời",
      "Dài / Lâu lắc"
    ],
    "explanation": "快 (kuài) chỉ tốc độ nhanh (跑得快) hoặc sự việc sắp diễn ra (快到了: sắp đến nơi)."
  },
  {
    "id": 68,
    "hanzi": "过",
    "pinyin": "guo",
    "lesson": 7,
    "correctAnswer": "Đã từng / Qua",
    "options": [
      "Đã từng / Qua",
      "Đang làm hiện tại",
      "Sẽ làm tương lai",
      "Chưa từng bao giờ"
    ],
    "explanation": "过 (guo) đặt sau động từ biểu thị trải nghiệm trong quá khứ (去过 - từng đi qua)."
  },
  {
    "id": 69,
    "hanzi": "走",
    "pinyin": "zǒu",
    "lesson": 7,
    "correctAnswer": "Đi bộ / Rời đi",
    "options": [
      "Đi bộ / Rời đi",
      "Chạy trốn thật xa",
      "Ngồi xuống ghế tựa",
      "Đứng lại bất động"
    ],
    "explanation": "走 (zǒu) là hành động đi bộ hoặc rời khỏi vị trí (Ví dụ: 慢走 - đi thong thả)."
  },
  {
    "id": 70,
    "hanzi": "路",
    "pinyin": "lù",
    "lesson": 7,
    "correctAnswer": "Con đường / Tuyến đường",
    "options": [
      "Con đường / Tuyến đường",
      "Cửa ngõ ra vào",
      "Căn phòng khép kín",
      "Cây cầu bắc qua"
    ],
    "explanation": "路 (lù) là đường sá đi lại hoặc tuyến xe (路上: trên đường, 一路顺风: thượng lộ bình an)."
  },
  {
    "id": 71,
    "hanzi": "再",
    "pinyin": "zài",
    "lesson": 8,
    "correctAnswer": "Lần nữa / Lại",
    "options": [
      "Lần nữa / Lại",
      "Đã rồi hoàn tất",
      "Chưa làm dang dở",
      "Vẫn còn tiếp tục"
    ],
    "explanation": "再 (zài) là phó từ chỉ hành động lặp lại trong tương lai (Ví dụ: 再见 - gặp lại sau, 再看 - xem lại)."
  },
  {
    "id": 72,
    "hanzi": "让",
    "pinyin": "ràng",
    "lesson": 8,
    "correctAnswer": "Để cho / Bảo / Nhường",
    "options": [
      "Để cho / Bảo / Nhường",
      "Bắt buộc ép uổng",
      "Mong muốn khao khát",
      "Biết rõ tường tận"
    ],
    "explanation": "让 (ràng) là động từ sai khiến (让我想想: để tôi nghĩ) hoặc nhượng bộ."
  },
  {
    "id": 73,
    "hanzi": "告诉",
    "pinyin": "gàosu",
    "lesson": 8,
    "correctAnswer": "Nói cho / Báo cho",
    "options": [
      "Nói cho / Báo cho",
      "Hỏi han thắc mắc",
      "Nghe ngóng tin tức",
      "Suy nghĩ / Đắn đo"
    ],
    "explanation": "告诉 (gàosu) là truyền đạt thông tin cho người khác biết (告诉我: nói cho tôi biết)."
  },
  {
    "id": 74,
    "hanzi": "等",
    "pinyin": "děng",
    "lesson": 8,
    "correctAnswer": "Chờ đợi / Đợi",
    "options": [
      "Chờ đợi / Đợi",
      "Rời bước đi ngay",
      "Tìm kiếm khắp nơi",
      "Hỏi han cặn kẽ"
    ],
    "explanation": "等 (děng) là hành động chờ đợi ai đó hoặc điều gì (等一下 - đợi một lát)."
  },
  {
    "id": 75,
    "hanzi": "找",
    "pinyin": "zhǎo",
    "lesson": 8,
    "correctAnswer": "Tìm kiếm / Thối tiền thừa",
    "options": [
      "Tìm kiếm / Thối tiền thừa",
      "Đánh mất tiêu xài",
      "Mua sắm gom góp",
      "Bán đi nhận lấy"
    ],
    "explanation": "找 (zhǎo) nghĩa là tìm kiếm đồ đạc (找东西) hoặc trả lại tiền thối (找钱)."
  },
  {
    "id": 76,
    "hanzi": "事情",
    "pinyin": "shìqing",
    "lesson": 8,
    "correctAnswer": "Sự việc / Sự tình",
    "options": [
      "Sự việc / Sự tình",
      "Đồ vật khí cụ",
      "Thời gian khoảnh khắc",
      "Nơi chốn địa điểm"
    ],
    "explanation": "事情 (shìqing) chỉ sự việc hoặc công việc cần giải quyết (Ví dụ: 什么事 - việc gì thế?)."
  },
  {
    "id": 77,
    "hanzi": "就",
    "pinyin": "jiù",
    "lesson": 8,
    "correctAnswer": "Thì / Liền / Ngay",
    "options": [
      "Thì / Liền / Ngay",
      "Cũng vậy tương đồng",
      "Đều là toàn thể",
      "Vẫn còn tiếp diễn"
    ],
    "explanation": "就 (jiù) nhấn mạnh tính chất sớm, nhanh, thuận lợi hoặc khẳng định dứt khoát."
  },
  {
    "id": 78,
    "hanzi": "便宜",
    "pinyin": "piányi",
    "lesson": 8,
    "correctAnswer": "Giá rẻ / Rẻ",
    "options": [
      "Giá rẻ / Rẻ",
      "Giá đắt đỏ son",
      "Xinh đẹp mặn mà",
      "Ngon lành thơm tho"
    ],
    "explanation": "便宜 (piányi) miêu tả giá cả thấp, rẻ tiền (Ví dụ: 便宜点儿 - rẻ hơn chút đi)."
  },
  {
    "id": 79,
    "hanzi": "卖",
    "pinyin": "mài",
    "lesson": 8,
    "correctAnswer": "Bán ra / Tiêu thụ",
    "options": [
      "Bán ra / Tiêu thụ",
      "Mua vào tích trữ",
      "Tặng cho biếu xén",
      "Mượn vay nợ nần"
    ],
    "explanation": "卖 (mài) nghĩa là bán hàng (đối lập với 买: mua, mang thanh 3)."
  },
  {
    "id": 80,
    "hanzi": "贵",
    "pinyin": "guì",
    "lesson": 8,
    "correctAnswer": "Đắt đỏ / Quý giá",
    "options": [
      "Đắt đỏ / Quý giá",
      "Rẻ tiền hạ giá",
      "Nhiều tiền dư dả",
      "Tốt tính hiền hòa"
    ],
    "explanation": "贵 (guì) miêu tả giá tiền cao, đắt đỏ (太贵了 - đắt quá rồi)."
  },
  {
    "id": 81,
    "hanzi": "上班",
    "pinyin": "shàngbān",
    "lesson": 9,
    "correctAnswer": "Đi làm",
    "options": [
      "Đi làm",
      "Tan sở về nhà",
      "Đi học lên lớp",
      "Nghỉ ngơi an dưỡng"
    ],
    "explanation": "上班 (shàngbān) là đến cơ quan làm việc (đối lập với 下班: tan làm)."
  },
  {
    "id": 82,
    "hanzi": "唱歌",
    "pinyin": "chànggē",
    "lesson": 9,
    "correctAnswer": "Ca hát / Hát",
    "options": [
      "Ca hát / Hát",
      "Nhảy múa khiêu vũ",
      "Nghe nhạc thưởng thức",
      "Nói chuyện tâm tình"
    ],
    "explanation": "唱歌 (chànggē) là hát những giai điệu bài hát (喜欢唱歌 - thích hát)."
  },
  {
    "id": 83,
    "hanzi": "男",
    "pinyin": "nán",
    "lesson": 9,
    "correctAnswer": "Nam giới / Đàn ông",
    "options": [
      "Nam giới / Đàn ông",
      "Nữ giới đàn bà",
      "Trẻ con thiếu nhi",
      "Người già trưởng lão"
    ],
    "explanation": "男 (nán) chỉ giới tính nam (Ví dụ: 男人 - đàn ông, 男生 - nam sinh)."
  },
  {
    "id": 84,
    "hanzi": "女",
    "pinyin": "nǚ",
    "lesson": 9,
    "correctAnswer": "Nữ giới / Phụ nữ",
    "options": [
      "Nữ giới / Phụ nữ",
      "Nam giới đàn ông",
      "Người cha phụ thân",
      "Con trai nhi tử"
    ],
    "explanation": "女 (nǚ) chỉ giới tính nữ (Ví dụ: 女人 - phụ nữ, 女生 - nữ sinh)."
  },
  {
    "id": 85,
    "hanzi": "孩子",
    "pinyin": "háizi",
    "lesson": 9,
    "correctAnswer": "Trẻ con / Con cái",
    "options": [
      "Trẻ con / Con cái",
      "Người lớn trưởng thành",
      "Học sinh lớp trên",
      "Bố mẹ phụ huynh"
    ],
    "explanation": "孩子 (háizi) chỉ đứa trẻ con hoặc con cái của bố mẹ."
  },
  {
    "id": 86,
    "hanzi": "错",
    "pinyin": "cuò",
    "lesson": 9,
    "correctAnswer": "Sai sót / Nhầm lẫn",
    "options": [
      "Sai sót / Nhầm lẫn",
      "Đúng đắn chính xác",
      "Tốt lành thuận lợi",
      "Mới mẻ tinh tươm"
    ],
    "explanation": "错 (cuò) biểu thị sự sai, nhầm lẫn (Ví dụ: 没错 - không sai, 不错 - không tệ/rất tốt)."
  },
  {
    "id": 87,
    "hanzi": "从",
    "pinyin": "cóng",
    "lesson": 9,
    "correctAnswer": "Từ đâu / Điểm xuất phát",
    "options": [
      "Từ đâu / Điểm xuất phát",
      "Đến đâu / Tới nơi nào",
      "Ở đâu / Vị trí nào",
      "Cùng ai / Với ai"
    ],
    "explanation": "从 (cóng) biểu thị mốc thời gian hoặc nơi chốn xuất phát (从北京来 - đến từ Bắc Kinh)."
  },
  {
    "id": 88,
    "hanzi": "跳舞",
    "pinyin": "tiàowǔ",
    "lesson": 9,
    "correctAnswer": "Khiêu vũ / Nhảy múa",
    "options": [
      "Khiêu vũ / Nhảy múa",
      "Ca hát vui vẻ",
      "Đá bóng sân bãi",
      "Chạy bộ rèn luyện"
    ],
    "explanation": "跳舞 (tiàowǔ) là hoạt động nhảy múa theo giai điệu."
  },
  {
    "id": 89,
    "hanzi": "第一",
    "pinyin": "dì-yī",
    "lesson": 9,
    "correctAnswer": "Thứ nhất / Đầu tiên",
    "options": [
      "Thứ nhất / Đầu tiên",
      "Thứ hai tiếp nối",
      "Thứ ba kế tiếp",
      "Cuối cùng về sau"
    ],
    "explanation": "第一 (dì-yī) là số thứ tự đầu tiên (第一次 - lần đầu tiên, 第一名 - hạng nhất)."
  },
  {
    "id": 90,
    "hanzi": "希望",
    "pinyin": "xīwàng",
    "lesson": 9,
    "correctAnswer": "Hy vọng / Mong muốn",
    "options": [
      "Hy vọng / Mong muốn",
      "Thất vọng chán chường",
      "Sợ hãi lo âu",
      "Lãng quên mất tích"
    ],
    "explanation": "希望 (xīwàng) biểu thị nguyện vọng tốt đẹp đối với tương lai."
  },
  {
    "id": 91,
    "hanzi": "别",
    "pinyin": "bié",
    "lesson": 10,
    "correctAnswer": "Đừng / Không nên",
    "options": [
      "Đừng / Không nên",
      "Phải / Đúng đắn",
      "Nên / Cần thiết",
      "Muốn / Thích thú"
    ],
    "explanation": "别 (bié) dùng khuyên bảo cấm đoán (别走: đừng đi) hoặc chỉ người khác (别人)."
  },
  {
    "id": 92,
    "hanzi": "正在",
    "pinyin": "zhèngzài",
    "lesson": 10,
    "correctAnswer": "Đang / Đang diễn ra",
    "options": [
      "Đang / Đang diễn ra",
      "Đã hoàn thành",
      "Sắp sửa / Chuẩn bị",
      "Vừa mới"
    ],
    "explanation": "正在 (zhèngzài) nhấn mạnh hành động đang diễn ra tại đúng thời điểm nói."
  },
  {
    "id": 93,
    "hanzi": "手机",
    "pinyin": "shǒujī",
    "lesson": 10,
    "correctAnswer": "Điện thoại di động",
    "options": [
      "Điện thoại di động",
      "Đồng hồ đeo tay",
      "Máy vi tính để bàn",
      "Tivi truyền hình"
    ],
    "explanation": "手机 (shǒujī) nghĩa là điện thoại di động."
  },
  {
    "id": 94,
    "hanzi": "洗",
    "pinyin": "xǐ",
    "lesson": 10,
    "correctAnswer": "Rửa sạch / Giặt giũ",
    "options": [
      "Rửa sạch / Giặt giũ",
      "Mặc quần áo",
      "Mua đồ sắm sửa",
      "Nấu nướng thức ăn"
    ],
    "explanation": "洗 (xǐ) là làm sạch bằng nước (Ví dụ: 洗手 - rửa tay, 洗衣服 - giặt quần áo)."
  },
  {
    "id": 95,
    "hanzi": "帮助",
    "pinyin": "bāngzhù",
    "lesson": 10,
    "correctAnswer": "Giúp đỡ / Hỗ trợ",
    "options": [
      "Giúp đỡ / Hỗ trợ",
      "Học tập rèn luyện",
      "Nói chuyện trao đổi",
      "Tìm kiếm đồ đạc"
    ],
    "explanation": "帮助 (bāngzhù) là giúp sức cho người khác (谢谢你的帮助 - cảm ơn sự giúp đỡ của bạn)."
  },
  {
    "id": 96,
    "hanzi": "课",
    "pinyin": "kè",
    "lesson": 10,
    "correctAnswer": "Bài học / Tiết học",
    "options": [
      "Bài học / Tiết học",
      "Quyển sách",
      "Kỳ thi / Bài kiểm tra",
      "Trường học"
    ],
    "explanation": "课 (kè) chỉ tiết lên lớp hoặc bài học (Ví dụ: 上课 - vào học, 下课 - tan học)."
  },
  {
    "id": 97,
    "hanzi": "教室",
    "pinyin": "jiàoshì",
    "lesson": 10,
    "correctAnswer": "Lớp học / Phòng học",
    "options": [
      "Lớp học / Phòng học",
      "Phòng ngủ nghỉ ngơi",
      "Bệnh viện",
      "Cửa hàng / Tiệm"
    ],
    "explanation": "教室 (jiàoshì) là phòng học trong trường."
  },
  {
    "id": 98,
    "hanzi": "往",
    "pinyin": "wǎng",
    "lesson": 10,
    "correctAnswer": "Hướng về / Về phía",
    "options": [
      "Hướng về / Về phía",
      "Rời đi / Xuất phát",
      "Ở tại / Nơi chốn",
      "Đến nơi / Tới nơi"
    ],
    "explanation": "往 (wǎng) là giới từ chỉ hướng chuyển động (Ví dụ: 往前走 - đi về phía trước)."
  },
  {
    "id": 99,
    "hanzi": "旁边",
    "pinyin": "pángbiān",
    "lesson": 10,
    "correctAnswer": "Bên cạnh / Sát bên",
    "options": [
      "Bên cạnh / Sát bên",
      "Phía trước mặt",
      "Phía sau lưng",
      "Bên trong lòng"
    ],
    "explanation": "旁边 (pángbiān) là phương vị từ chỉ vị trí sát cạnh đối tượng."
  },
  {
    "id": 100,
    "hanzi": "知道",
    "pinyin": "zhīdào",
    "lesson": 10,
    "correctAnswer": "Biết rõ / Hiểu",
    "options": [
      "Biết rõ / Hiểu",
      "Quên mất",
      "Suy nghĩ / Đắn đo",
      "Hỏi han / Thắc mắc"
    ],
    "explanation": "知道 (zhīdào) là nắm rõ tin tức, sự tình (Ví dụ: 我知道 - tôi biết rồi)."
  },
  {
    "id": 101,
    "hanzi": "比",
    "pinyin": "bǐ",
    "lesson": 11,
    "correctAnswer": "So với",
    "options": [
      "So với",
      "Bởi vì nguyên nhân",
      "Cùng nhau hợp tác",
      "Cho nên kết quả"
    ],
    "explanation": "比 (bǐ) dùng so sánh hơn (A 比 B + Tính từ: 他比我高 - anh ấy cao hơn tôi)."
  },
  {
    "id": 102,
    "hanzi": "哥哥",
    "pinyin": "gēge",
    "lesson": 11,
    "correctAnswer": "Anh trai",
    "options": [
      "Anh trai",
      "Em trai đệ đệ",
      "Người cha phụ thân",
      "Bạn bè bằng hữu"
    ],
    "explanation": "哥哥 (gēge) là người anh trai ruột trong gia đình."
  },
  {
    "id": 103,
    "hanzi": "弟弟",
    "pinyin": "dìdi",
    "lesson": 11,
    "correctAnswer": "Em trai",
    "options": [
      "Em trai",
      "Anh trai ca ca",
      "Em gái muội muội",
      "Con trai nhi tử"
    ],
    "explanation": "弟弟 (dìdi) là em trai ruột trong gia đình."
  },
  {
    "id": 104,
    "hanzi": "姐姐",
    "pinyin": "jiějie",
    "lesson": 11,
    "correctAnswer": "Chị gái",
    "options": [
      "Chị gái",
      "Em gái muội muội",
      "Người mẹ mẫu thân",
      "Con gái nữ nhi"
    ],
    "explanation": "姐姐 (jiějie) là người chị gái ruột trong gia đình."
  },
  {
    "id": 105,
    "hanzi": "妹妹",
    "pinyin": "mèimei",
    "lesson": 11,
    "correctAnswer": "Em gái",
    "options": [
      "Em gái",
      "Chị gái tỷ tỷ",
      "Em trai đệ đệ",
      "Con gái nữ nhi"
    ],
    "explanation": "妹妹 (mèimei) là em gái ruột trong gia đình."
  },
  {
    "id": 106,
    "hanzi": "高",
    "pinyin": "gāo",
    "lesson": 11,
    "correctAnswer": "Cao ráo / Cao lớn",
    "options": [
      "Cao ráo / Cao lớn",
      "Thấp bé lùn tịt",
      "Dài ngoẵng thước tất",
      "To đùng bự chảng"
    ],
    "explanation": "高 (gāo) miêu tả chiều cao người hoặc vật (很高 - rất cao, đối lập với 矮 - lùn)."
  },
  {
    "id": 107,
    "hanzi": "右边",
    "pinyin": "yòubian",
    "lesson": 11,
    "correctAnswer": "Bên phải",
    "options": [
      "Bên phải",
      "Bên trái tả biên",
      "Phía trước mặt",
      "Phía sau lưng"
    ],
    "explanation": "右边 (yòubian) là hướng tay phải (đối lập với 左边 - bên trái)."
  },
  {
    "id": 108,
    "hanzi": "左边",
    "pinyin": "zuǒbian",
    "lesson": 11,
    "correctAnswer": "Bên trái",
    "options": [
      "Bên trái",
      "Bên phải hữu biên",
      "Phía trước mặt",
      "Phía sau lưng"
    ],
    "explanation": "左边 (zuǒbian) là hướng tay trái (đối lập với 右边 - bên phải)."
  },
  {
    "id": 109,
    "hanzi": "两",
    "pinyin": "liǎng",
    "lesson": 11,
    "correctAnswer": "Hai / Đôi",
    "options": [
      "Hai / Đôi",
      "Một cái đơn độc",
      "Ba cái tiếp nối",
      "Mười cái tròn chục"
    ],
    "explanation": "两 (liǎng) dùng để nói số lượng 2 khi đứng trước lượng từ (两个人 - hai người)."
  },
  {
    "id": 110,
    "hanzi": "姓",
    "pinyin": "xìng",
    "lesson": 11,
    "correctAnswer": "Họ / Mang họ",
    "options": [
      "Họ / Mang họ",
      "Tuổi tác đời người",
      "Nghề nghiệp làm ăn",
      "Quê quán xứ sở"
    ],
    "explanation": "姓 (xìng) chỉ dòng họ (Ví dụ: 我姓王 - tôi họ Vương, 您贵姓 - ngài quý họ là gì)."
  },
  {
    "id": 111,
    "hanzi": "穿",
    "pinyin": "chuān",
    "lesson": 12,
    "correctAnswer": "Mặc áo / Xỏ giày",
    "options": [
      "Mặc áo / Xỏ giày",
      "Mua sắm quần áo",
      "Giặt giũ sạch sẽ",
      "Cởi bỏ áo khoác"
    ],
    "explanation": "穿 (chuān) là mặc trang phục (穿衣服 - mặc quần áo, 穿鞋 - đi giày)."
  },
  {
    "id": 112,
    "hanzi": "进",
    "pinyin": "jìn",
    "lesson": 12,
    "correctAnswer": "Đi vào / Bước vào",
    "options": [
      "Đi vào / Bước vào",
      "Bước ra ngoài đường",
      "Đi xa tít tắp",
      "Trở về chốn cũ"
    ],
    "explanation": "进 (jìn) là đi vào bên trong (请进 - xin mời vào, 进来 - vào đây)."
  },
  {
    "id": 113,
    "hanzi": "得",
    "pinyin": "de",
    "lesson": 12,
    "correctAnswer": "Được / Đến mức",
    "options": [
      "Được / Đến mức",
      "Của ai sở hữu",
      "Chăng nữa phủ nhận",
      "Và cùng kết nối"
    ],
    "explanation": "得 (de) đặt sau động từ để dẫn ra bổ ngữ trạng thái, trình độ (跑得很快 - chạy rất nhanh)."
  },
  {
    "id": 114,
    "hanzi": "妻子",
    "pinyin": "qīzi",
    "lesson": 12,
    "correctAnswer": "Người vợ / Vợ",
    "options": [
      "Người vợ / Vợ",
      "Người chồng trượng phu",
      "Người mẹ mẫu thân",
      "Chị gái tỷ tỷ"
    ],
    "explanation": "妻子 (qīzi) là người vợ trong gia đình."
  },
  {
    "id": 115,
    "hanzi": "雪",
    "pinyin": "xuě",
    "lesson": 12,
    "correctAnswer": "Bông tuyết / Tuyết",
    "options": [
      "Bông tuyết / Tuyết",
      "Hạt mưa rơi xuống",
      "Cơn gió thoảng qua",
      "Đám mây bay lượn"
    ],
    "explanation": "雪 (xuě) là những bông tuyết rơi vào mùa đông (下雪 - tuyết rơi)."
  },
  {
    "id": 116,
    "hanzi": "零",
    "pinyin": "líng",
    "lesson": 12,
    "correctAnswer": "Số 0",
    "options": [
      "Số 0",
      "Số 1 duy nhất",
      "Số 10 tròn chục",
      "Số 100 hàng trăm"
    ],
    "explanation": "零 (líng) là con số 0 trong toán học và ngày tháng."
  },
  {
    "id": 117,
    "hanzi": "到",
    "pinyin": "dào",
    "lesson": 12,
    "correctAnswer": "Đến nơi / Tới",
    "options": [
      "Đến nơi / Tới",
      "Rời đi nơi chốn",
      "Chờ đợi ai đó",
      "Bắt đầu"
    ],
    "explanation": "到 (dào) biểu thị điểm đến hoặc đạt tới kết quả (到了 - đã đến nơi rồi)."
  },
  {
    "id": 118,
    "hanzi": "次",
    "pinyin": "cì",
    "lesson": 12,
    "correctAnswer": "Lần / Số lần",
    "options": [
      "Lần / Số lần",
      "Giờ đồng hồ",
      "Ngày trong tuần",
      "Năm tháng trôi"
    ],
    "explanation": "次 (cì) là lượng từ đo số lần thực hiện (去过一次 - đã đi một lần)."
  },
  {
    "id": 119,
    "hanzi": "真",
    "pinyin": "zhēn",
    "lesson": 12,
    "correctAnswer": "Thật sự / Chân thực",
    "options": [
      "Thật sự / Chân thực",
      "Giả dối dối lừa",
      "Tạm bợ qua loa",
      "Không hề phủ định"
    ],
    "explanation": "真 (zhēn) là phó từ nhấn mạnh sự chân thật, cảm thán (真好 - thật là tốt)."
  },
  {
    "id": 120,
    "hanzi": "已经",
    "pinyin": "yǐjīng",
    "lesson": 12,
    "correctAnswer": "Đã / Đã rồi",
    "options": [
      "Đã / Đã rồi",
      "Chưa từng bao giờ",
      "Đang làm tiếp diễn",
      "Sẽ làm tương lai"
    ],
    "explanation": "已经 (yǐjīng) biểu thị hành động đã hoàn tất trước thời điểm nói (我已经知道了)."
  },
  {
    "id": 121,
    "hanzi": "着",
    "pinyin": "zhe",
    "lesson": 13,
    "correctAnswer": "Đang",
    "options": [
      "Đang",
      "Đã kết thúc hoàn tất",
      "Sẽ bắt đầu sắp tới",
      "Chưa xảy ra bao giờ"
    ],
    "explanation": "着 (zhe) đặt sau động từ chỉ sự tiếp diễn của một trạng thái (门开着 - cửa đang mở)."
  },
  {
    "id": 122,
    "hanzi": "铅笔",
    "pinyin": "qiānbǐ",
    "lesson": 13,
    "correctAnswer": "Bút chì",
    "options": [
      "Bút chì",
      "Sách vở học tập",
      "Thước kẻ kẻ đường",
      "Cục tẩy lau vết"
    ],
    "explanation": "铅笔 (qiānbǐ) là dụng cụ viết bằng chì vẽ hoặc ghi chép."
  },
  {
    "id": 123,
    "hanzi": "长",
    "pinyin": "cháng",
    "lesson": 13,
    "correctAnswer": "Dài / Lâu",
    "options": [
      "Dài / Lâu",
      "Ngắn ngủi chốc lát",
      "Cao ráo ngút ngàn",
      "Rộng lớn bao la"
    ],
    "explanation": "长 (cháng) miêu tả độ dài của vật hoặc thời gian (头发很长 - tóc rất dài)."
  },
  {
    "id": 124,
    "hanzi": "眼睛",
    "pinyin": "yǎnjing",
    "lesson": 13,
    "correctAnswer": "Đôi mắt / Ánh mắt",
    "options": [
      "Đôi mắt / Ánh mắt",
      "Kính đeo bảo vệ",
      "Khuôn mặt diện mạo",
      "Cái tai thính giác"
    ],
    "explanation": "眼睛 (yǎnjing) là cơ quan thị giác giúp con người nhìn ngắm."
  },
  {
    "id": 125,
    "hanzi": "笑",
    "pinyin": "xiào",
    "lesson": 13,
    "correctAnswer": "Mỉm cười / Cười",
    "options": [
      "Mỉm cười / Cười",
      "Khóc lóc đau buồn",
      "Nói năng phát biểu",
      "Ca hát rộn ràng"
    ],
    "explanation": "笑 (xiào) biểu lộ niềm vui qua nụ cười (đối lập với 哭 - khóc)."
  },
  {
    "id": 126,
    "hanzi": "晴",
    "pinyin": "qíng",
    "lesson": 13,
    "correctAnswer": "Trời nắng / Quang đãng",
    "options": [
      "Trời nắng / Quang đãng",
      "Trời mưa ảm đạm",
      "Trời rét căm căm",
      "Có tuyết giá buốt"
    ],
    "explanation": "晴 (qíng) miêu tả thời tiết nắng ráo, không mây (晴天: ngày nắng đẹp)."
  },
  {
    "id": 127,
    "hanzi": "百",
    "pinyin": "bǎi",
    "lesson": 13,
    "correctAnswer": "Một trăm / Trăm",
    "options": [
      "Một trăm / Trăm",
      "Một nghìn",
      "Mười",
      "Một vạn"
    ],
    "explanation": "百 (bǎi) là hàng trăm (Ví dụ: 一百 - một trăm, 三百 - ba trăm)."
  },
  {
    "id": 128,
    "hanzi": "白",
    "pinyin": "bái",
    "lesson": 13,
    "correctAnswer": "Màu trắng",
    "options": [
      "Màu trắng",
      "Màu đen hắc ám",
      "Màu đỏ rực rỡ",
      "Màu xanh mát mẻ"
    ],
    "explanation": "白 (bái) chỉ màu trắng (Ví dụ: 白色的衣服 - quần áo màu trắng)."
  },
  {
    "id": 129,
    "hanzi": "黑",
    "pinyin": "hēi",
    "lesson": 13,
    "correctAnswer": "Màu đen",
    "options": [
      "Màu đen",
      "Màu trắng tinh khôi",
      "Màu đỏ thắm tươi",
      "Màu vàng rực rỡ"
    ],
    "explanation": "黑 (hēi) chỉ màu đen (đối lập với 白 - trắng)."
  },
  {
    "id": 130,
    "hanzi": "它",
    "pinyin": "tā",
    "lesson": 13,
    "correctAnswer": "Đồ vật đó / Con vật đó",
    "options": [
      "Đồ vật đó / Con vật đó",
      "Anh ấy",
      "Cô ấy",
      "Tôi đây"
    ],
    "explanation": "它 (tā) là đại từ nhân xưng ngôi thứ ba chỉ con vật hoặc đồ vật."
  },
  {
    "id": 131,
    "hanzi": "虽然",
    "pinyin": "suīrán",
    "lesson": 14,
    "correctAnswer": "Mặc dù / Tuy rằng",
    "options": [
      "Mặc dù / Tuy rằng",
      "Bởi vì nguyên cớ",
      "Cho nên kết quả",
      "Nếu như giả định"
    ],
    "explanation": "虽然 (suīrán) đứng đầu phân câu nhượng bộ, thường cặp với 但是."
  },
  {
    "id": 132,
    "hanzi": "但是",
    "pinyin": "dànshì",
    "lesson": 14,
    "correctAnswer": "Nhưng mà / Song le",
    "options": [
      "Nhưng mà / Song le",
      "Bởi vì do lẽ",
      "Cho nên kết quả",
      "Và lại thêm nữa"
    ],
    "explanation": "但是 (dànshì) là liên từ biểu thị sự chuyển ý tương phản (mặc dù... nhưng mà...)."
  },
  {
    "id": 133,
    "hanzi": "因为",
    "pinyin": "yīnwèi",
    "lesson": 14,
    "correctAnswer": "Bởi vì / Do vì",
    "options": [
      "Bởi vì / Do vì",
      "Cho nên kết luận",
      "Mặc dù nhượng bộ",
      "Nhưng mà tương phản"
    ],
    "explanation": "因为 (yīnwèi) là liên từ biểu thị nguyên nhân, thường cặp với 所以."
  },
  {
    "id": 134,
    "hanzi": "所以",
    "pinyin": "suǒyǐ",
    "lesson": 14,
    "correctAnswer": "Cho nên / Vì thế",
    "options": [
      "Cho nên / Vì thế",
      "Bởi vì nguyên do",
      "Mặc dù chuyển ý",
      "Nhưng mà đối lập"
    ],
    "explanation": "所以 (suǒyǐ) là liên từ biểu thị kết quả (因为... 所以...)."
  },
  {
    "id": 135,
    "hanzi": "玩",
    "pinyin": "wán",
    "lesson": 14,
    "correctAnswer": "Vui chơi / Tiêu khiển",
    "options": [
      "Vui chơi / Tiêu khiển",
      "Làm việc vất vả",
      "Học tập căng thẳng",
      "Nghỉ ngơi an giấc"
    ],
    "explanation": "玩 (wán) là hoạt động giải trí, vui chơi (Ví dụ: 好玩 - chơi vui)."
  },
  {
    "id": 136,
    "hanzi": "可能",
    "pinyin": "kěnéng",
    "lesson": 14,
    "correctAnswer": "Có lẽ / Khả năng",
    "options": [
      "Có lẽ / Khả năng",
      "Nhất định trăm phần",
      "Không thể hoàn toàn",
      "Nên làm bổn phận"
    ],
    "explanation": "可能 (kěnéng) biểu thị phán đoán về khả năng xảy ra của sự việc."
  },
  {
    "id": 137,
    "hanzi": "您",
    "pinyin": "nín",
    "lesson": 14,
    "correctAnswer": "Ngài / Ông / Bà",
    "options": [
      "Ngài / Ông / Bà",
      "Tôi / Mình",
      "Anh ấy",
      "Các bạn"
    ],
    "explanation": "您 (nín) là cách gọi bạn (你) nhưng với lòng kính trọng đối với bậc trên hoặc khách quý."
  },
  {
    "id": 138,
    "hanzi": "服务员",
    "pinyin": "fúwùyuán",
    "lesson": 14,
    "correctAnswer": "Nhân viên phục vụ / Bồi bàn",
    "options": [
      "Nhân viên phục vụ / Bồi bàn",
      "Bác sĩ khám bệnh",
      "Thầy giáo trường học",
      "Tài xế lái xe"
    ],
    "explanation": "服务员 (fúwùyuán) là nhân viên phục vụ ở nhà hàng, khách sạn."
  },
  {
    "id": 139,
    "hanzi": "近",
    "pinyin": "jìn",
    "lesson": 14,
    "correctAnswer": "Gần / Gần gũi",
    "options": [
      "Gần / Gần gũi",
      "Xa xôi ngút ngàn",
      "To lớn khổng lồ",
      "Nhỏ bé li ti"
    ],
    "explanation": "近 (jìn) miêu tả khoảng cách ngắn, cự ly gần (Ví dụ: 很近 - rất gần)."
  },
  {
    "id": 140,
    "hanzi": "游泳",
    "pinyin": "yóuyǒng",
    "lesson": 14,
    "correctAnswer": "Bơi / Bơi lội",
    "options": [
      "Bơi / Bơi lội",
      "Chạy bộ sân đường",
      "Đá bóng sân cỏ",
      "Chơi bóng rổ sân"
    ],
    "explanation": "游泳 (yóuyǒng) là hoạt động bơi lội dưới nước rèn sức khỏe."
  },
  {
    "id": 141,
    "hanzi": "票",
    "pinyin": "piào",
    "lesson": 15,
    "correctAnswer": "Tấm vé / Vé vào cửa",
    "options": [
      "Tấm vé / Vé vào cửa",
      "Tiền bạc chi tiêu",
      "Quyển sách học tập",
      "Tờ báo tin tức"
    ],
    "explanation": "票 (piào) là vé vào cửa, vé tàu xe (Ví dụ: 车票 - vé xe, 电影票 - vé xem phim)."
  },
  {
    "id": 142,
    "hanzi": "火车站",
    "pinyin": "huǒchēzhàn",
    "lesson": 15,
    "correctAnswer": "Ga xe lửa / Ga tàu",
    "options": [
      "Ga xe lửa / Ga tàu",
      "Cảng hàng không sân bay",
      "Bến xe buýt đón khách",
      "Trạm xá y tế"
    ],
    "explanation": "火车站 (huǒchēzhàn) là nơi đón và trả khách của tàu hỏa."
  },
  {
    "id": 143,
    "hanzi": "大家",
    "pinyin": "dàjiā",
    "lesson": 15,
    "correctAnswer": "Mọi người / Tất cả mọi người",
    "options": [
      "Mọi người / Tất cả mọi người",
      "Gia đình thân thuộc",
      "Bạn bè bằng hữu",
      "Học sinh trường lớp"
    ],
    "explanation": "大家 (dàjiā) là đại từ chỉ chung mọi người (Ví dụ: 大家好 - chào mọi người)."
  },
  {
    "id": 144,
    "hanzi": "机场",
    "pinyin": "jīchǎng",
    "lesson": 15,
    "correctAnswer": "Sân bay",
    "options": [
      "Sân bay",
      "Ga tàu hỏa hỏa xa",
      "Bến xe buýt bến cảng",
      "Công viên giải trí"
    ],
    "explanation": "机场 (jīchǎng) là sân bay hàng không."
  },
  {
    "id": 145,
    "hanzi": "问题",
    "pinyin": "wèntí",
    "lesson": 15,
    "correctAnswer": "Vấn đề / Câu hỏi / Khúc mắc",
    "options": [
      "Vấn đề / Câu hỏi / Khúc mắc",
      "Đáp án giải đáp",
      "Bài tập về nhà",
      "Ý kiến đóng góp"
    ],
    "explanation": "问题 (wèntí) là khúc mắc, câu hỏi hoặc vấn đề cần xử lý (没问题 - không vấn đề)."
  },
  {
    "id": 146,
    "hanzi": "说话",
    "pinyin": "shuōhuà",
    "lesson": 15,
    "correctAnswer": "Nói chuyện / Phát biểu",
    "options": [
      "Nói chuyện / Phát biểu",
      "Nghe nhạc êm dịu",
      "Ca hát rộn ràng",
      "Đọc sách to tiếng"
    ],
    "explanation": "说话 (shuōhuà) là việc phát ra lời nói để trao đổi (别说话 - đừng nói chuyện)."
  },
  {
    "id": 147,
    "hanzi": "时间",
    "pinyin": "shíjiān",
    "lesson": 15,
    "correctAnswer": "Thời gian / Thời khắc",
    "options": [
      "Thời gian / Thời khắc",
      "Thời tiết nắng mưa",
      "Đồng hồ xem giờ",
      "Ngày tháng năm xưa"
    ],
    "explanation": "时间 (shíjiān) chỉ quỹ thời gian hoặc khoảnh khắc (没时间 - không có thời gian)."
  },
  {
    "id": 148,
    "hanzi": "日",
    "pinyin": "rì",
    "lesson": 15,
    "correctAnswer": "Ngày / Mặt trời",
    "options": [
      "Ngày / Mặt trời",
      "Tháng / Mặt trăng",
      "Năm / Ngôi sao",
      "Tuần / Đám mây"
    ],
    "explanation": "日 (rì) dùng trong văn viết chỉ ngày trong tháng (Ví dụ: 10月1日) hoặc mặt trời."
  },
  {
    "id": 149,
    "hanzi": "对",
    "pinyin": "duì",
    "lesson": 15,
    "correctAnswer": "Đúng / Đối với",
    "options": [
      "Đúng / Đối với",
      "Sai / Trái lại",
      "Thích / Hợp ý",
      "Gần / Cận kề"
    ],
    "explanation": "对 (duì) nghĩa là đúng (đối lập với 错) hoặc là giới từ 'đối với ai' (对我说)."
  },
  {
    "id": 150,
    "hanzi": "打篮球",
    "pinyin": "dǎ lánqiú",
    "lesson": 15,
    "correctAnswer": "Chơi bóng rổ",
    "options": [
      "Chơi bóng rổ",
      "Đá bóng sân bãi",
      "Bơi lội dưới nước",
      "Chạy bộ rèn sức"
    ],
    "explanation": "打篮球 (dǎ lánqiú) là môn thể thao chơi bóng rổ."
  }
];

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

  const hsk2Code = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK2_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(formattedHsk2, null, 2) + ";\n";

  const outputPath2 = path.resolve(process.cwd(), 'data/hsk2-data.ts');
  fs.writeFileSync(outputPath2, hsk2Code, 'utf-8');
  console.log("Generated HSK 2: " + formattedHsk2.length + " questions at " + outputPath2);

  const combined = [
    ...HSK1_VOCAB_DATA.map((q, idx) => ({ ...q, id: idx + 1, lesson: q.lesson || Math.floor(idx / 10) + 1 })),
    ...formattedHsk2.map((q, idx) => ({ ...q, id: 150 + idx + 1, lesson: (q.lesson || Math.floor(idx / 10) + 1) + 15 }))
  ];

  const combinedCode = "import { QuizQuestion } from '@/types/quiz';\n\nexport const HSK_COMBINED_VOCAB_DATA: QuizQuestion[] = " +
    JSON.stringify(combined, null, 2) + ";\n";

  const outputPathCombined = path.resolve(process.cwd(), 'data/hsk-combined-data.ts');
  fs.writeFileSync(outputPathCombined, combinedCode, 'utf-8');
  console.log("Generated HSK 1+2 Combined: " + combined.length + " questions at " + outputPathCombined);
}

buildHsk2Data();
