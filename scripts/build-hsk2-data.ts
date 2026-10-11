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
    "correctAnswer": "Du lịch / Tham quan (Lữ du)",
    "options": [
      "Du lịch / Tham quan (Lữ du)",
      "Làm việc công sở",
      "Học tập trường lớp",
      "Nghỉ ngơi tại nhà"
    ],
    "explanation": "旅游 (lǚyóu - Hán Việt: Lữ du) là hoạt động đi tham quan nghỉ dưỡng (Ví dụ: 去北京旅游 - đi Bắc Kinh du lịch)."
  },
  {
    "id": 2,
    "hanzi": "觉得",
    "pinyin": "juéde",
    "lesson": 1,
    "correctAnswer": "Cảm thấy / Cho rằng (Giác đắc)",
    "options": [
      "Cảm thấy / Cho rằng (Giác đắc)",
      "Nghe thấy thanh âm",
      "Nhìn thấy tận mắt",
      "Biết rõ sự tình"
    ],
    "explanation": "觉得 (juéde - Hán Việt: Giác đắc) dùng để bày tỏ cảm nhận, nhận định cá nhân (Ví dụ: 我觉得很好 - Tôi cảm thấy rất tốt)."
  },
  {
    "id": 3,
    "hanzi": "最",
    "pinyin": "zuì",
    "lesson": 1,
    "correctAnswer": "Nhất / Cực kỳ (Tối - mức độ cao nhất)",
    "options": [
      "Nhất / Cực kỳ (Tối - mức độ cao nhất)",
      "Hơn / Tương đối",
      "Rất / Khá là",
      "Đều / Toàn bộ"
    ],
    "explanation": "最 (zuì - Hán Việt: Tối) đứng trước tính từ/động từ chỉ mức độ cao nhất (Ví dụ: 最好 - tốt nhất, 最喜欢 - thích nhất)."
  },
  {
    "id": 4,
    "hanzi": "为什么",
    "pinyin": "wèishénme",
    "lesson": 1,
    "correctAnswer": "Tại sao / Vì sao (Vi thập ma)",
    "options": [
      "Tại sao / Vì sao (Vi thập ma)",
      "Cái gì đồ vật",
      "Ở đâu nơi chốn",
      "Bao giờ thời điểm"
    ],
    "explanation": "为什么 (wèishénme - Hán Việt: Vi thập ma) là đại từ hỏi nguyên nhân, lý do."
  },
  {
    "id": 5,
    "hanzi": "也",
    "pinyin": "yě",
    "lesson": 1,
    "correctAnswer": "Cũng / Cũng vậy (Dã)",
    "options": [
      "Cũng / Cũng vậy (Dã)",
      "Đều là toàn bộ",
      "Rất là mức độ",
      "Không là phủ định"
    ],
    "explanation": "也 (yě - Hán Việt: Dã) là phó từ chỉ sự đồng nhất, tương đồng (Ví dụ: 我也是 - Tôi cũng vậy)."
  },
  {
    "id": 6,
    "hanzi": "运动",
    "pinyin": "yùndòng",
    "lesson": 1,
    "correctAnswer": "Vận động / Thể thao (Vận động)",
    "options": [
      "Vận động / Thể thao (Vận động)",
      "Học tập tri thức",
      "Nghỉ ngơi an dưỡng",
      "Làm việc công tác"
    ],
    "explanation": "运动 (yùndòng - Hán Việt: Vận động) là hoạt động thể dục thể thao rèn luyện sức khỏe."
  },
  {
    "id": 7,
    "hanzi": "踢足球",
    "pinyin": "tī zúqiú",
    "lesson": 1,
    "correctAnswer": "Đá bóng / Túc cầu (Thích túc cầu)",
    "options": [
      "Đá bóng / Túc cầu (Thích túc cầu)",
      "Chơi bóng rổ tay",
      "Bơi lội dưới nước",
      "Chạy bộ rèn sức"
    ],
    "explanation": "踢足球 (tī zúqiú - Hán Việt: Thích túc cầu: đá quả bóng bằng chân) là môn bóng đá."
  },
  {
    "id": 8,
    "hanzi": "一起",
    "pinyin": "yìqǐ",
    "lesson": 1,
    "correctAnswer": "Cùng nhau (Nhất khởi)",
    "options": [
      "Cùng nhau (Nhất khởi)",
      "Một mình đơn độc",
      "Trước tiên mở đầu",
      "Sau đó tiếp nối"
    ],
    "explanation": "一起 (yìqǐ - Hán Việt: Nhất khởi) chỉ sự kết hợp đồng thời cùng làm gì đó (Ví dụ: 一起去 - cùng đi)."
  },
  {
    "id": 9,
    "hanzi": "新",
    "pinyin": "xīn",
    "lesson": 1,
    "correctAnswer": "Mới mẻ / Mới (Tân - đối lập với 旧)",
    "options": [
      "Mới mẻ / Mới (Tân - đối lập với 旧)",
      "Cũ kỹ cổ xưa",
      "Đẹp đẽ mỹ miều",
      "Tốt lành thuận lợi"
    ],
    "explanation": "新 (xīn - Hán Việt: Tân) chỉ sự vật mới xuất hiện (Ví dụ: 新书 - sách mới, 新年 - năm mới)."
  },
  {
    "id": 10,
    "hanzi": "要",
    "pinyin": "yào",
    "lesson": 1,
    "correctAnswer": "Cần / Muốn / Sắp sửa (Yếu)",
    "options": [
      "Cần / Muốn / Sắp sửa (Yếu)",
      "Không cần chối từ",
      "Đã từng trải qua",
      "Chưa từng thực hiện"
    ],
    "explanation": "要 (yào - Hán Việt: Yếu) biểu thị nhu cầu, nguyện vọng hoặc hành động sắp diễn ra (Ví dụ: 我要买 - tôi muốn mua)."
  },
  {
    "id": 11,
    "hanzi": "生病",
    "pinyin": "shēngbìng",
    "lesson": 2,
    "correctAnswer": "Bị ốm / Nhiễm bệnh (Sinh bệnh)",
    "options": [
      "Bị ốm / Nhiễm bệnh (Sinh bệnh)",
      "Khỏe mạnh cường tráng",
      "Mệt mỏi kiệt sức",
      "Đau đầu nhức óc"
    ],
    "explanation": "生病 (shēngbìng - Hán Việt: Sinh bệnh) là trạng thái cơ thể không khỏe, mắc bệnh tật."
  },
  {
    "id": 12,
    "hanzi": "每",
    "pinyin": "měi",
    "lesson": 2,
    "correctAnswer": "Mỗi / Hàng (Mỗi - từng cá thể)",
    "options": [
      "Mỗi / Hàng (Mỗi - từng cá thể)",
      "Tất cả toàn bộ",
      "Rất nhiều vô kể",
      "Ít ỏi hiếm hoi"
    ],
    "explanation": "每 (měi - Hán Việt: Mỗi) chỉ từng cá thể trong một tập thể (Ví dụ: 每天 - mỗi ngày/hàng ngày, 每个人 - mỗi người)."
  },
  {
    "id": 13,
    "hanzi": "早上",
    "pinyin": "zǎoshang",
    "lesson": 2,
    "correctAnswer": "Buổi sáng / Sáng sớm (Tảo thượng)",
    "options": [
      "Buổi sáng / Sáng sớm (Tảo thượng)",
      "Buổi trưa chính ngọ",
      "Buổi chiều tà tà",
      "Buổi tối đêm khuya"
    ],
    "explanation": "早上 (zǎoshang - Hán Việt: Tảo thượng) là thời điểm sáng sớm khi mặt trời vừa lên."
  },
  {
    "id": 14,
    "hanzi": "跑步",
    "pinyin": "pǎobù",
    "lesson": 2,
    "correctAnswer": "Chạy bộ (Bào bộ)",
    "options": [
      "Chạy bộ (Bào bộ)",
      "Bơi lội dưới hồ",
      "Đá bóng sân cỏ",
      "Đi dạo thong thả"
    ],
    "explanation": "跑步 (pǎobù - Hán Việt: Bào bộ) là hoạt động chạy bộ rèn luyện sức khỏe."
  },
  {
    "id": 15,
    "hanzi": "起床",
    "pinyin": "qǐchuáng",
    "lesson": 2,
    "correctAnswer": "Thức dậy / Rời giường (Khởi sàng)",
    "options": [
      "Thức dậy / Rời giường (Khởi sàng)",
      "Đi ngủ say giấc",
      "Tắm gội sạch sẽ",
      "Ăn sáng điểm tâm"
    ],
    "explanation": "起床 (qǐchuáng - Hán Việt: Khởi sàng: dậy khỏi giường) là thức dậy sau giấc ngủ."
  },
  {
    "id": 16,
    "hanzi": "药",
    "pinyin": "yào",
    "lesson": 2,
    "correctAnswer": "Thuốc uống / Dược phẩm (Dược)",
    "options": [
      "Thuốc uống / Dược phẩm (Dược)",
      "Thức ăn bổ dưỡng",
      "Nước ngọt giải khát",
      "Trà xanh thanh nhiệt"
    ],
    "explanation": "药 (yào - Hán Việt: Dược) là thuốc chữa bệnh (Ví dụ: 吃药 - uống thuốc, 中药 - thuốc đông y)."
  },
  {
    "id": 17,
    "hanzi": "身体",
    "pinyin": "shēntǐ",
    "lesson": 2,
    "correctAnswer": "Thân thể / Sức khỏe (Thân thể)",
    "options": [
      "Thân thể / Sức khỏe (Thân thể)",
      "Thời gian năm tháng",
      "Công việc sự nghiệp",
      "Tuổi tác đời người"
    ],
    "explanation": "身体 (shēntǐ - Hán Việt: Thân thể) chỉ cơ thể hoặc sức khỏe con người (身体好: sức khỏe tốt)."
  },
  {
    "id": 18,
    "hanzi": "休息",
    "pinyin": "xiūxi",
    "lesson": 2,
    "correctAnswer": "Nghỉ ngơi / Hưu tức (Hưu tức)",
    "options": [
      "Nghỉ ngơi / Hưu tức (Hưu tức)",
      "Làm việc miệt mài",
      "Học tập chăm chỉ",
      "Tập luyện thể thao"
    ],
    "explanation": "休息 (xiūxi - Hán Việt: Hưu tức) là dừng công việc để nghỉ ngơi, hồi phục sức lực."
  },
  {
    "id": 19,
    "hanzi": "出",
    "pinyin": "chū",
    "lesson": 2,
    "correctAnswer": "Ra ngoài / Xuất (đối lập với 进)",
    "options": [
      "Ra ngoài / Xuất (đối lập với 进)",
      "Đi vào bên trong",
      "Đi đến nơi xa",
      "Trở về chốn cũ"
    ],
    "explanation": "出 (chū - Hán Việt: Xuất) là chuyển động từ trong ra ngoài (Ví dụ: 出去 - đi ra ngoài, 出院 - xuất viện)."
  },
  {
    "id": 20,
    "hanzi": "忙",
    "pinyin": "máng",
    "lesson": 2,
    "correctAnswer": "Bận rộn / Mang (nhiều việc)",
    "options": [
      "Bận rộn / Mang (nhiều việc)",
      "Rảnh rỗi thảnh thơi",
      "Mệt mỏi đuối sức",
      "Vui vẻ phấn khởi"
    ],
    "explanation": "忙 (máng - Hán Việt: Mang) miêu tả trạng thái có nhiều việc phải làm tất bật (Ví dụ: 你忙吗 - bạn bận không?)."
  },
  {
    "id": 21,
    "hanzi": "手表",
    "pinyin": "shǒubiǎo",
    "lesson": 3,
    "correctAnswer": "Đồng hồ đeo tay (Thủ biểu)",
    "options": [
      "Đồng hồ đeo tay (Thủ biểu)",
      "Điện thoại di động",
      "Máy vi tính để bàn",
      "Túi xách thời trang"
    ],
    "explanation": "手表 (shǒubiǎo - Hán Việt: Thủ biểu) là phụ kiện xem giờ đeo ở cổ tay."
  },
  {
    "id": 22,
    "hanzi": "千",
    "pinyin": "qiān",
    "lesson": 3,
    "correctAnswer": "Một nghìn / Ngàn (Thiên)",
    "options": [
      "Một nghìn / Ngàn (Thiên)",
      "Một trăm (Bách)",
      "Một vạn (Vạn)",
      "Mười (Thập)"
    ],
    "explanation": "千 (qiān - Hán Việt: Thiên) là hàng ngàn (Ví dụ: 一千 - một nghìn, 三千 - ba nghìn)."
  },
  {
    "id": 23,
    "hanzi": "报纸",
    "pinyin": "bàozhǐ",
    "lesson": 3,
    "correctAnswer": "Báo chí / Tờ báo (Báo chỉ)",
    "options": [
      "Báo chí / Tờ báo (Báo chỉ)",
      "Quyển sách vở",
      "Cây bút mực",
      "Tờ giấy trắng"
    ],
    "explanation": "报纸 (bàozhǐ - Hán Việt: Báo chỉ: giấy in tin tức) là ấn phẩm báo đọc tin tức (看报纸 - đọc báo)."
  },
  {
    "id": 24,
    "hanzi": "送",
    "pinyin": "sòng",
    "lesson": 3,
    "correctAnswer": "Tặng / Tiễn đưa (Tống)",
    "options": [
      "Tặng / Tiễn đưa (Tống)",
      "Nhận / Đón rước",
      "Mua / Bán đồ",
      "Mượn / Vay tiền"
    ],
    "explanation": "送 (sòng - Hán Việt: Tống) vừa là tặng quà (送礼物), vừa là tiễn ai đó lên đường (送朋友: tiễn bạn)."
  },
  {
    "id": 25,
    "hanzi": "一下",
    "pinyin": "yíxià",
    "lesson": 3,
    "correctAnswer": "Một lát / Thử xem (Nhất hạ)",
    "options": [
      "Một lát / Thử xem (Nhất hạ)",
      "Một lần duy nhất",
      "Rất lâu hàng giờ",
      "Mãi mãi trường tồn"
    ],
    "explanation": "一下 (yíxià - Hán Việt: Nhất hạ) đứng sau động từ để làm nhẹ sắc thái, biểu thị làm thử một chút (看一下 - xem thử)."
  },
  {
    "id": 26,
    "hanzi": "牛奶",
    "pinyin": "niúnǎi",
    "lesson": 3,
    "correctAnswer": "Sữa bò (Ngưu nãi)",
    "options": [
      "Sữa bò (Ngưu nãi)",
      "Trà xanh thanh mát",
      "Cà phê đen đậm",
      "Nước khoáng tinh khiết"
    ],
    "explanation": "牛奶 (niúnǎi - Hán Việt: Ngưu nãi) là thức uống sữa dinh dưỡng từ con bò."
  },
  {
    "id": 27,
    "hanzi": "房间",
    "pinyin": "fángjiān",
    "lesson": 3,
    "correctAnswer": "Căn phòng / Buồng (Phòng gian)",
    "options": [
      "Căn phòng / Buồng (Phòng gian)",
      "Ngôi nhà toàn thể",
      "Cửa hàng buôn bán",
      "Trường học viện"
    ],
    "explanation": "房间 (fángjiān - Hán Việt: Phòng gian) là căn phòng bên trong ngôi nhà hoặc khách sạn."
  },
  {
    "id": 28,
    "hanzi": "丈夫",
    "pinyin": "zhàngfu",
    "lesson": 3,
    "correctAnswer": "Người chồng / Trượng phu",
    "options": [
      "Người chồng / Trượng phu",
      "Người vợ thê tử",
      "Người cha phụ thân",
      "Anh trai ca ca"
    ],
    "explanation": "丈夫 (zhàngfu - Hán Việt: Trượng phu) là người chồng trong quan hệ hôn nhân."
  },
  {
    "id": 29,
    "hanzi": "红",
    "pinyin": "hóng",
    "lesson": 3,
    "correctAnswer": "Màu đỏ / Hồng (Hồng sắc)",
    "options": [
      "Màu đỏ / Hồng (Hồng sắc)",
      "Màu trắng bạch",
      "Màu đen hắc",
      "Màu vàng hoàng"
    ],
    "explanation": "红 (hóng - Hán Việt: Hồng) chỉ màu đỏ (Ví dụ: 红色的衣服 - quần áo màu đỏ)."
  },
  {
    "id": 30,
    "hanzi": "颜色",
    "pinyin": "yánsè",
    "lesson": 3,
    "correctAnswer": "Màu sắc / Nhan sắc",
    "options": [
      "Màu sắc / Nhan sắc",
      "Hình dáng vóc dáng",
      "Kích thước độ lớn",
      "Âm thanh tiếng động"
    ],
    "explanation": "颜色 (yánsè - Hán Việt: Nhan sắc) chỉ các sắc màu như đỏ, xanh, trắng, vàng."
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
    "explanation": "生日 (shēngrì - Hán Việt: Sinh nhật) là ngày kỷ niệm chào đời (Ví dụ: 生日快乐 - sinh nhật vui vẻ)."
  },
  {
    "id": 32,
    "hanzi": "快乐",
    "pinyin": "kuàilè",
    "lesson": 4,
    "correctAnswer": "Hạnh phúc / Vui vẻ (Khoái lạc)",
    "options": [
      "Hạnh phúc / Vui vẻ (Khoái lạc)",
      "Buồn bã đau thương",
      "Mệt mỏi suy kiệt",
      "Tức giận căm hờn"
    ],
    "explanation": "快乐 (kuàilè - Hán Việt: Khoái lạc) miêu tả niềm vui trọn vẹn, hoan hỷ."
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
    "explanation": "给 (gěi - Hán Việt: Cấp) là đưa vật gì cho ai (给你) hoặc giới từ làm gì cho ai (给我买: mua cho tôi)."
  },
  {
    "id": 34,
    "hanzi": "晚上",
    "pinyin": "wǎnshang",
    "lesson": 4,
    "correctAnswer": "Buổi tối / Ban đêm (Vãn thượng)",
    "options": [
      "Buổi tối / Ban đêm (Vãn thượng)",
      "Buổi sáng sớm mai",
      "Buổi chiều tà tà",
      "Buổi trưa chính ngọ"
    ],
    "explanation": "晚上 (wǎnshang - Hán Việt: Vãn thượng) là khoảng thời gian từ chiều tối đến đêm."
  },
  {
    "id": 35,
    "hanzi": "问",
    "pinyin": "wèn",
    "lesson": 4,
    "correctAnswer": "Hỏi han / Vấn (đặt câu hỏi)",
    "options": [
      "Hỏi han / Vấn (đặt câu hỏi)",
      "Trả lời giải đáp",
      "Nói năng phát biểu",
      "Lắng nghe tiếp nhận"
    ],
    "explanation": "问 (wèn - Hán Việt: Vấn) là đặt câu hỏi (Ví dụ: 问好 - hỏi thăm, 问老师 - hỏi thầy giáo)."
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
    "explanation": "非常 (fēicháng - Hán Việt: Phi thường: khác thường) là phó từ chỉ mức độ cao hơn cả 很 (非常高兴)."
  },
  {
    "id": 37,
    "hanzi": "开始",
    "pinyin": "kāishǐ",
    "lesson": 4,
    "correctAnswer": "Bắt đầu / Khởi đầu (Khai thủy)",
    "options": [
      "Bắt đầu / Khởi đầu (Khai thủy)",
      "Kết thúc hoàn tất",
      "Nghỉ ngơi tạm dừng",
      "Dừng hẳn thôi làm"
    ],
    "explanation": "开始 (kāishǐ - Hán Việt: Khai thủy) là khởi đầu một quá trình hoặc hành động (开始学习 - bắt đầu học)."
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
    "explanation": "介绍 (jièshào - Hán Việt: Giới thiệu) là làm quen, cung cấp thông tin người hoặc vật (介绍一下)."
  },
  {
    "id": 39,
    "hanzi": "去年",
    "pinyin": "qùnián",
    "lesson": 4,
    "correctAnswer": "Năm ngoái (Khứ niên)",
    "options": [
      "Năm ngoái (Khứ niên)",
      "Năm nay kim niên",
      "Năm sau minh niên",
      "Tháng trước thượng nguyệt"
    ],
    "explanation": "去年 (qùnián - Hán Việt: Khứ niên) là năm vừa trôi qua liền trước năm hiện tại."
  },
  {
    "id": 40,
    "hanzi": "累",
    "pinyin": "lèi",
    "lesson": 4,
    "correctAnswer": "Mệt mỏi / Mệt nhọc (Luy)",
    "options": [
      "Mệt mỏi / Mệt nhọc (Luy)",
      "Đói bụng cồn cào",
      "Vui vẻ phấn khởi",
      "Khát nước cháy họng"
    ],
    "explanation": "累 (lèi - Hán Việt: Luy) miêu tả trạng thái hao tổn thể lực sau khi làm việc nặng."
  },
  {
    "id": 41,
    "hanzi": "外",
    "pinyin": "wài",
    "lesson": 5,
    "correctAnswer": "Bên ngoài / Ngoại (đối lập với 里)",
    "options": [
      "Bên ngoài / Ngoại (đối lập với 里)",
      "Bên trong phía trong",
      "Bên trên phía trên",
      "Bên dưới phía dưới"
    ],
    "explanation": "外 (wài - Hán Việt: Ngoại) chỉ vị trí bên ngoài (Ví dụ: 外面 - bên ngoài, 外国 - nước ngoài)."
  },
  {
    "id": 42,
    "hanzi": "自行车",
    "pinyin": "zìxíngchē",
    "lesson": 5,
    "correctAnswer": "Xe đạp (Tự hành xa)",
    "options": [
      "Xe đạp (Tự hành xa)",
      "Xe máy hai bánh",
      "Xe buýt công cộng",
      "Xe taxi dịch vụ"
    ],
    "explanation": "自行车 (zìxíngchē - Hán Việt: Tự hành xa: xe tự đi bằng sức người) là xe đạp."
  },
  {
    "id": 43,
    "hanzi": "羊肉",
    "pinyin": "yángròu",
    "lesson": 5,
    "correctAnswer": "Thịt cừu / Thịt dê (Dương nhục)",
    "options": [
      "Thịt cừu / Thịt dê (Dương nhục)",
      "Thịt bò bổ dưỡng",
      "Thịt heo nạc dăm",
      "Thịt gà thả vườn"
    ],
    "explanation": "羊肉 (yángròu - Hán Việt: Dương nhục) là món thịt từ loài dê hoặc cừu."
  },
  {
    "id": 44,
    "hanzi": "好吃",
    "pinyin": "hǎochī",
    "lesson": 5,
    "correctAnswer": "Ngon miệng / Ngon (Hảo xuy)",
    "options": [
      "Ngon miệng / Ngon (Hảo xuy)",
      "Khó nuốt vị đắng",
      "Đẹp đẽ ưa nhìn",
      "Vui tươi sảng khoái"
    ],
    "explanation": "好吃 (hǎochī - Hán Việt: Hảo xuy) khen ngợi đồ ăn thơm ngon hợp khẩu vị."
  },
  {
    "id": 45,
    "hanzi": "吧",
    "pinyin": "ba",
    "lesson": 5,
    "correctAnswer": "Nhé / Đi (trợ từ ngữ khí gợi ý)",
    "options": [
      "Nhé / Đi (trợ từ ngữ khí gợi ý)",
      "Không phủ định",
      "Ở đâu vị trí",
      "Của ai sở hữu"
    ],
    "explanation": "吧 (ba) đứng cuối câu biểu thị sự gợi ý, đề xuất, thương lượng (走吧 - đi thôi nào)."
  },
  {
    "id": 46,
    "hanzi": "件",
    "pinyin": "jiàn",
    "lesson": 5,
    "correctAnswer": "Chiếc (áo) / Vụ việc (Kiện)",
    "options": [
      "Chiếc (áo) / Vụ việc (Kiện)",
      "Cuốn sách tập san",
      "Cái chén cái cốc",
      "Bát cơm tô canh"
    ],
    "explanation": "件 (jiàn - Hán Việt: Kiện) là lượng từ dùng cho quần áo (一件衣服) hoặc sự việc (一件事)."
  },
  {
    "id": 47,
    "hanzi": "还",
    "pinyin": "hái",
    "lesson": 5,
    "correctAnswer": "Vẫn còn / Còn (Hoàn)",
    "options": [
      "Vẫn còn / Còn (Hoàn)",
      "Đã qua dĩ vãng",
      "Chưa từng trải qua",
      "Chỉ có duy nhất"
    ],
    "explanation": "还 (hái - Hán Việt: Hoàn) là phó từ biểu thị sự tiếp diễn hoặc bổ sung (Ví dụ: 还有 - vẫn còn)."
  },
  {
    "id": 48,
    "hanzi": "可以",
    "pinyin": "kěyǐ",
    "lesson": 5,
    "correctAnswer": "Có thể / Được phép (Khả dĩ)",
    "options": [
      "Có thể / Được phép (Khả dĩ)",
      "Không được cấm đoán",
      "Bắt buộc phải làm",
      "Muốn có ước ao"
    ],
    "explanation": "可以 (kěyǐ - Hán Việt: Khả dĩ) biểu thị sự cho phép hoặc khả thi (Ví dụ: 可以吗 - được không?)."
  },
  {
    "id": 49,
    "hanzi": "咖啡",
    "pinyin": "kāfēi",
    "lesson": 5,
    "correctAnswer": "Cà phê (đồ uống)",
    "options": [
      "Cà phê (đồ uống)",
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
    "correctAnswer": "Con cá (Ngư)",
    "options": [
      "Con cá (Ngư)",
      "Con gà gáy sáng",
      "Con cừu lông trắng",
      "Con chó giữ nhà"
    ],
    "explanation": "鱼 (yú - Hán Việt: Ngư) là loài động vật sống dưới nước có vây và vảy (吃鱼: ăn cá)."
  },
  {
    "id": 51,
    "hanzi": "门",
    "pinyin": "mén",
    "lesson": 6,
    "correctAnswer": "Cửa vào / Cổng (Môn)",
    "options": [
      "Cửa vào / Cổng (Môn)",
      "Cửa sổ thông gió",
      "Căn phòng ngủ",
      "Cái bàn ăn cơm"
    ],
    "explanation": "门 (mén - Hán Việt: Môn) là cửa ra vào hoặc cổng nhà (Ví dụ: 开门 - mở cửa)."
  },
  {
    "id": 52,
    "hanzi": "考试",
    "pinyin": "kǎoshì",
    "lesson": 6,
    "correctAnswer": "Thi cử / Kiểm tra (Khảo thí)",
    "options": [
      "Thi cử / Kiểm tra (Khảo thí)",
      "Học tập trường lớp",
      "Làm việc công sở",
      "Nghỉ hè an dưỡng"
    ],
    "explanation": "考试 (kǎoshì - Hán Việt: Khảo thí) là kỳ thi hoặc bài kiểm tra năng lực học tập."
  },
  {
    "id": 53,
    "hanzi": "意思",
    "pinyin": "yìsi",
    "lesson": 6,
    "correctAnswer": "Ý nghĩa / Thú vị (Ý tứ)",
    "options": [
      "Ý nghĩa / Thú vị (Ý tứ)",
      "Thời gian năm tháng",
      "Ý kiến đóng góp",
      "Lý do biện minh"
    ],
    "explanation": "意思 (yìsi - Hán Việt: Ý tứ) là nội hàm của từ ngữ hoặc sự thú vị (有意思 - thú vị, 什么意思 - ý gì)."
  },
  {
    "id": 54,
    "hanzi": "准备",
    "pinyin": "zhǔnbèi",
    "lesson": 6,
    "correctAnswer": "Chuẩn bị / Trù bị",
    "options": [
      "Chuẩn bị / Trù bị",
      "Bắt đầu khởi sự",
      "Hoàn thành xong xuôi",
      "Nghỉ ngơi thư giãn"
    ],
    "explanation": "准备 (zhǔnbèi - Hán Việt: Chuẩn bị) là sắp xếp, trù bị trước cho một kế hoạch hoặc công việc."
  },
  {
    "id": 55,
    "hanzi": "阴",
    "pinyin": "yīn",
    "lesson": 6,
    "correctAnswer": "Trời râm / U ám (Âm - mây phủ)",
    "options": [
      "Trời râm / U ám (Âm - mây phủ)",
      "Trời nắng chói chang",
      "Trời mưa tầm tã",
      "Tuyết rơi lạnh buốt"
    ],
    "explanation": "阴 (yīn - Hán Việt: Âm) miêu tả thời tiết nhiều mây, không có ánh nắng mặt trời (阴天: ngày râm trời)."
  },
  {
    "id": 56,
    "hanzi": "懂",
    "pinyin": "dǒng",
    "lesson": 6,
    "correctAnswer": "Hiểu rõ / Nắm được (Đổng)",
    "options": [
      "Hiểu rõ / Nắm được (Đổng)",
      "Quên mất lãng quên",
      "Nói năng phát biểu",
      "Nhìn thấy mắt thấy"
    ],
    "explanation": "懂 (dǒng - Hán Việt: Đổng) chỉ sự nhận thức, hiểu rõ nội dung (Ví dụ: 我懂了 - tôi hiểu rồi)."
  },
  {
    "id": 57,
    "hanzi": "题",
    "pinyin": "tí",
    "lesson": 6,
    "correctAnswer": "Đề thi / Câu hỏi (Đề)",
    "options": [
      "Đề thi / Câu hỏi (Đề)",
      "Quyển sách thư tịch",
      "Bài thi kiểm tra",
      "Điểm số đạt được"
    ],
    "explanation": "题 (tí - Hán Việt: Đề) là đề mục, câu hỏi trong bài kiểm tra (这道题 - câu hỏi này)."
  },
  {
    "id": 58,
    "hanzi": "西瓜",
    "pinyin": "xīguā",
    "lesson": 6,
    "correctAnswer": "Dưa hấu (Tây qua)",
    "options": [
      "Dưa hấu (Tây qua)",
      "Quả táo đỏ giòn",
      "Quả cam mọng nước",
      "Quả chuối chín vàng"
    ],
    "explanation": "西瓜 (xīguā - Hán Việt: Tây qua) là loại dưa vỏ xanh ruột đỏ nhiều nước ngọt mát."
  },
  {
    "id": 59,
    "hanzi": "鸡蛋",
    "pinyin": "jīdàn",
    "lesson": 6,
    "correctAnswer": "Trứng gà (Kê noãn)",
    "options": [
      "Trứng gà (Kê noãn)",
      "Thịt cừu nướng",
      "Cá tươi kho",
      "Thịt bò xào"
    ],
    "explanation": "鸡蛋 (jīdàn - Hán Việt: Kê noãn: trứng con gà) là thực phẩm quen thuộc."
  },
  {
    "id": 60,
    "hanzi": "完",
    "pinyin": "wán",
    "lesson": 6,
    "correctAnswer": "Xong xuôi / Hoàn thành (Hoàn)",
    "options": [
      "Xong xuôi / Hoàn thành (Hoàn)",
      "Bắt đầu khởi đầu",
      "Còn lại dư thừa",
      "Đang làm dang dở"
    ],
    "explanation": "完 (wán - Hán Việt: Hoàn) là bổ ngữ kết quả chỉ hành động đã kết thúc trọn vẹn (做完 - làm xong)."
  },
  {
    "id": 61,
    "hanzi": "离",
    "pinyin": "lí",
    "lesson": 7,
    "correctAnswer": "Cách xa / Ly (khoảng cách cự ly)",
    "options": [
      "Cách xa / Ly (khoảng cách cự ly)",
      "Đến gần cận kề",
      "Ở tại vị trí",
      "Từ nơi xuất phát"
    ],
    "explanation": "离 (lí - Hán Việt: Ly) dùng để đo cự ly giữa hai địa điểm (我家离学校很近 - Nhà tôi cách trường rất gần)."
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
    "explanation": "公司 (gōngsī - Hán Việt: Công ty) là cơ quan, doanh nghiệp làm việc (去公司 - đến công ty làm việc)."
  },
  {
    "id": 63,
    "hanzi": "远",
    "pinyin": "yuǎn",
    "lesson": 7,
    "correctAnswer": "Xa xôi / Xa (Viễn - đối lập với 近)",
    "options": [
      "Xa xôi / Xa (Viễn - đối lập với 近)",
      "Gần gũi sát bên (Cận)",
      "Cao ráo ngất trời",
      "Rộng lớn bao la"
    ],
    "explanation": "远 (yuǎn - Hán Việt: Viễn) miêu tả cự ly dài, khoảng cách xa (Ví dụ: 很远 - rất xa)."
  },
  {
    "id": 64,
    "hanzi": "公共汽车",
    "pinyin": "gōnggòng qìchē",
    "lesson": 7,
    "correctAnswer": "Xe buýt (Công cộng khí xa)",
    "options": [
      "Xe buýt (Công cộng khí xa)",
      "Xe taxi dịch vụ",
      "Máy bay hàng không",
      "Xe đạp hai bánh"
    ],
    "explanation": "公共汽车 (gōnggòng qìchē - Hán Việt: Công cộng khí xa) là phương tiện xe buýt công cộng."
  },
  {
    "id": 65,
    "hanzi": "小时",
    "pinyin": "xiǎoshí",
    "lesson": 7,
    "correctAnswer": "Tiếng đồng hồ / Giờ (Tiểu thời)",
    "options": [
      "Tiếng đồng hồ / Giờ (Tiểu thời)",
      "Phút giây chốc lát",
      "Ngày đêm tròn vẹn",
      "Tháng năm dài lâu"
    ],
    "explanation": "小时 (xiǎoshí - Hán Việt: Tiểu thời) chỉ khoảng thời gian tính bằng giờ (一个小时 - một tiếng đồng hồ)."
  },
  {
    "id": 66,
    "hanzi": "慢",
    "pinyin": "màn",
    "lesson": 7,
    "correctAnswer": "Chậm chạp / Từ tốn (Mạn - đối lập với 快)",
    "options": [
      "Chậm chạp / Từ tốn (Mạn - đối lập với 快)",
      "Nhanh nhẹn cấp tốc",
      "Sớm sủa kịp thời",
      "Muộn màng trễ nải"
    ],
    "explanation": "慢 (màn - Hán Việt: Mạn) miêu tả tốc độ chậm (慢走: đi thong thả, 走得慢: đi chậm)."
  },
  {
    "id": 67,
    "hanzi": "快",
    "pinyin": "kuài",
    "lesson": 7,
    "correctAnswer": "Nhanh / Sắp sửa (Khoái)",
    "options": [
      "Nhanh / Sắp sửa (Khoái)",
      "Chậm / Muộn màng",
      "Sớm / Kịp thời",
      "Dài / Lâu lắc"
    ],
    "explanation": "快 (kuài - Hán Việt: Khoái) chỉ tốc độ nhanh (跑得快) hoặc sự việc sắp diễn ra (快到了: sắp đến nơi)."
  },
  {
    "id": 68,
    "hanzi": "过",
    "pinyin": "guo",
    "lesson": 7,
    "correctAnswer": "Đã từng / Qua (Quá - trải nghiệm quá khứ)",
    "options": [
      "Đã từng / Qua (Quá - trải nghiệm quá khứ)",
      "Đang làm hiện tại",
      "Sẽ làm tương lai",
      "Chưa từng bao giờ"
    ],
    "explanation": "过 (guo - Hán Việt: Quá) đặt sau động từ biểu thị trải nghiệm trong quá khứ (去过 - từng đi qua)."
  },
  {
    "id": 69,
    "hanzi": "走",
    "pinyin": "zǒu",
    "lesson": 7,
    "correctAnswer": "Đi bộ / Rời đi (Tẩu)",
    "options": [
      "Đi bộ / Rời đi (Tẩu)",
      "Chạy trốn thật xa",
      "Ngồi xuống ghế tựa",
      "Đứng lại bất động"
    ],
    "explanation": "走 (zǒu - Hán Việt: Tẩu) là hành động đi bộ hoặc rời khỏi vị trí (Ví dụ: 慢走 - đi thong thả)."
  },
  {
    "id": 70,
    "hanzi": "路",
    "pinyin": "lù",
    "lesson": 7,
    "correctAnswer": "Con đường / Tuyến đường (Lộ)",
    "options": [
      "Con đường / Tuyến đường (Lộ)",
      "Cửa ngõ ra vào",
      "Căn phòng khép kín",
      "Cây cầu bắc qua"
    ],
    "explanation": "路 (lù - Hán Việt: Lộ) là đường sá đi lại hoặc tuyến xe (路上: trên đường, 一路顺风: thượng lộ bình an)."
  },
  {
    "id": 71,
    "hanzi": "再",
    "pinyin": "zài",
    "lesson": 8,
    "correctAnswer": "Lần nữa / Lại (Tái - hành động lặp lại)",
    "options": [
      "Lần nữa / Lại (Tái - hành động lặp lại)",
      "Đã rồi hoàn tất",
      "Chưa làm dang dở",
      "Vẫn còn tiếp tục"
    ],
    "explanation": "再 (zài - Hán Việt: Tái) là phó từ chỉ hành động lặp lại trong tương lai (Ví dụ: 再见 - gặp lại sau, 再看 - xem lại)."
  },
  {
    "id": 72,
    "hanzi": "让",
    "pinyin": "ràng",
    "lesson": 8,
    "correctAnswer": "Để cho / Bảo / Nhường (Nhượng)",
    "options": [
      "Để cho / Bảo / Nhường (Nhượng)",
      "Bắt buộc ép uổng",
      "Mong muốn khao khát",
      "Biết rõ tường tận"
    ],
    "explanation": "让 (ràng - Hán Việt: Nhượng) là động từ sai khiến (让我想想: để tôi nghĩ) hoặc nhượng bộ."
  },
  {
    "id": 73,
    "hanzi": "告诉",
    "pinyin": "gàosu",
    "lesson": 8,
    "correctAnswer": "Nói cho / Báo cho / Cáo tri",
    "options": [
      "Nói cho / Báo cho / Cáo tri",
      "Hỏi han thắc mắc",
      "Nghe ngóng tin tức",
      "Suy nghĩ đắn đo"
    ],
    "explanation": "告诉 (gàosu - Hán Việt: Cáo tri/Cáo tố) là truyền đạt thông tin cho người khác biết (告诉我: nói cho tôi biết)."
  },
  {
    "id": 74,
    "hanzi": "等",
    "pinyin": "děng",
    "lesson": 8,
    "correctAnswer": "Chờ đợi / Đợi (Đẳng)",
    "options": [
      "Chờ đợi / Đợi (Đẳng)",
      "Rời bước đi ngay",
      "Tìm kiếm khắp nơi",
      "Hỏi han cặn kẽ"
    ],
    "explanation": "等 (děng - Hán Việt: Đẳng) là hành động chờ đợi ai đó hoặc điều gì (等一下 - đợi một lát)."
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
    "correctAnswer": "Sự việc / Sự tình (việc cần làm)",
    "options": [
      "Sự việc / Sự tình (việc cần làm)",
      "Đồ vật khí cụ",
      "Thời gian khoảnh khắc",
      "Nơi chốn địa điểm"
    ],
    "explanation": "事情 (shìqing - Hán Việt: Sự tình) chỉ sự việc hoặc công việc cần giải quyết (Ví dụ: 什么事 - việc gì thế?)."
  },
  {
    "id": 77,
    "hanzi": "就",
    "pinyin": "jiù",
    "lesson": 8,
    "correctAnswer": "Thì / Liền / Ngay (Tựu - nhấn mạnh sớm/nhanh)",
    "options": [
      "Thì / Liền / Ngay (Tựu - nhấn mạnh sớm/nhanh)",
      "Cũng vậy tương đồng",
      "Đều là toàn thể",
      "Vẫn còn tiếp diễn"
    ],
    "explanation": "就 (jiù - Hán Việt: Tựu) nhấn mạnh tính chất sớm, nhanh, thuận lợi hoặc khẳng định dứt khoát."
  },
  {
    "id": 78,
    "hanzi": "便宜",
    "pinyin": "piányi",
    "lesson": 8,
    "correctAnswer": "Giá rẻ / Tiện nghi (đối lập với 贵)",
    "options": [
      "Giá rẻ / Tiện nghi (đối lập với 贵)",
      "Giá đắt đỏ son",
      "Xinh đẹp mặn mà",
      "Ngon lành thơm tho"
    ],
    "explanation": "便宜 (piányi - Hán Việt: Tiện nghi) miêu tả giá cả thấp, rẻ tiền (Ví dụ: 便宜点儿 - rẻ hơn chút đi)."
  },
  {
    "id": 79,
    "hanzi": "卖",
    "pinyin": "mài",
    "lesson": 8,
    "correctAnswer": "Bán ra / Tiêu thụ (Mại - thanh 4)",
    "options": [
      "Bán ra / Tiêu thụ (Mại - thanh 4)",
      "Mua vào tích trữ (Mãi)",
      "Tặng cho biếu xén",
      "Mượn vay nợ nần"
    ],
    "explanation": "卖 (mài - Hán Việt: Mại, mang thanh 4) nghĩa là bán hàng (đối lập với 买: mua, mang thanh 3)."
  },
  {
    "id": 80,
    "hanzi": "贵",
    "pinyin": "guì",
    "lesson": 8,
    "correctAnswer": "Đắt đỏ / Quý giá (Quý - đối lập với 便宜)",
    "options": [
      "Đắt đỏ / Quý giá (Quý - đối lập với 便宜)",
      "Rẻ tiền hạ giá",
      "Nhiều tiền dư dả",
      "Tốt tính hiền hòa"
    ],
    "explanation": "贵 (guì - Hán Việt: Quý) miêu tả giá tiền cao, đắt đỏ (太贵了 - đắt quá rồi)."
  },
  {
    "id": 81,
    "hanzi": "上班",
    "pinyin": "shàngbān",
    "lesson": 9,
    "correctAnswer": "Đi làm / Thượng ban (đối lập với 下班)",
    "options": [
      "Đi làm / Thượng ban (đối lập với 下班)",
      "Tan sở về nhà",
      "Đi học lên lớp",
      "Nghỉ ngơi an dưỡng"
    ],
    "explanation": "上班 (shàngbān - Hán Việt: Thượng ban) là đến cơ quan làm việc (đối lập với 下班: tan làm)."
  },
  {
    "id": 82,
    "hanzi": "唱歌",
    "pinyin": "chànggē",
    "lesson": 9,
    "correctAnswer": "Ca hát / Xướng ca",
    "options": [
      "Ca hát / Xướng ca",
      "Nhảy múa khiêu vũ",
      "Nghe nhạc thưởng thức",
      "Nói chuyện tâm tình"
    ],
    "explanation": "唱歌 (chànggē - Hán Việt: Xướng ca) là hát những giai điệu bài hát (喜欢唱歌 - thích hát)."
  },
  {
    "id": 83,
    "hanzi": "男",
    "pinyin": "nán",
    "lesson": 9,
    "correctAnswer": "Nam giới / Đàn ông (Nam)",
    "options": [
      "Nam giới / Đàn ông (Nam)",
      "Nữ giới đàn bà",
      "Trẻ con thiếu nhi",
      "Người già trưởng lão"
    ],
    "explanation": "男 (nán - Hán Việt: Nam) chỉ giới tính nam (Ví dụ: 男人 - đàn ông, 男生 - nam sinh)."
  },
  {
    "id": 84,
    "hanzi": "女",
    "pinyin": "nǚ",
    "lesson": 9,
    "correctAnswer": "Nữ giới / Phụ nữ (Nữ)",
    "options": [
      "Nữ giới / Phụ nữ (Nữ)",
      "Nam giới đàn ông",
      "Người cha phụ thân",
      "Con trai nhi tử"
    ],
    "explanation": "女 (nǚ - Hán Việt: Nữ) chỉ giới tính nữ (Ví dụ: 女人 - phụ nữ, 女生 - nữ sinh)."
  },
  {
    "id": 85,
    "hanzi": "孩子",
    "pinyin": "háizi",
    "lesson": 9,
    "correctAnswer": "Trẻ con / Con cái (Hài tử)",
    "options": [
      "Trẻ con / Con cái (Hài tử)",
      "Người lớn trưởng thành",
      "Học sinh lớp trên",
      "Bố mẹ phụ huynh"
    ],
    "explanation": "孩子 (háizi - Hán Việt: Hài tử) chỉ đứa trẻ con hoặc con cái của bố mẹ."
  },
  {
    "id": 86,
    "hanzi": "错",
    "pinyin": "cuò",
    "lesson": 9,
    "correctAnswer": "Sai sót / Nhầm lẫn (Thác - đối lập với 对)",
    "options": [
      "Sai sót / Nhầm lẫn (Thác - đối lập với 对)",
      "Đúng đắn chính xác",
      "Tốt lành thuận lợi",
      "Mới mẻ tinh tươm"
    ],
    "explanation": "错 (cuò - Hán Việt: Thác) biểu thị sự sai, nhầm lẫn (Ví dụ: 没错 - không sai, 不错 - không tệ/rất tốt)."
  },
  {
    "id": 87,
    "hanzi": "从",
    "pinyin": "cóng",
    "lesson": 9,
    "correctAnswer": "Từ đâu / Điểm xuất phát (Tòng)",
    "options": [
      "Từ đâu / Điểm xuất phát (Tòng)",
      "Đến đâu điểm kết",
      "Ở đâu vị trí",
      "Với ai kết hợp"
    ],
    "explanation": "从 (cóng - Hán Việt: Tòng) biểu thị mốc thời gian hoặc nơi chốn xuất phát (从北京来 - đến từ Bắc Kinh)."
  },
  {
    "id": 88,
    "hanzi": "跳舞",
    "pinyin": "tiàowǔ",
    "lesson": 9,
    "correctAnswer": "Khiêu vũ / Nhảy múa",
    "options": [
      "Khiêu vũ / Nhảy múa",
      "Ca hát bài bản",
      "Đá bóng sân bãi",
      "Chạy bộ rèn luyện"
    ],
    "explanation": "跳舞 (tiàowǔ - Hán Việt: Khiêu vũ) là hoạt động nhảy múa theo giai điệu."
  },
  {
    "id": 89,
    "hanzi": "第一",
    "pinyin": "dì-yī",
    "lesson": 9,
    "correctAnswer": "Thứ nhất / Đầu tiên (Đệ nhất)",
    "options": [
      "Thứ nhất / Đầu tiên (Đệ nhất)",
      "Thứ hai tiếp nối",
      "Thứ ba kế tiếp",
      "Cuối cùng về sau"
    ],
    "explanation": "第一 (dì-yī - Hán Việt: Đệ nhất) là số thứ tự đầu tiên (第一次 - lần đầu tiên, 第一名 - hạng nhất)."
  },
  {
    "id": 90,
    "hanzi": "希望",
    "pinyin": "xīwàng",
    "lesson": 9,
    "correctAnswer": "Hy vọng / Mong muốn (Hy vọng)",
    "options": [
      "Hy vọng / Mong muốn (Hy vọng)",
      "Thất vọng chán chường",
      "Sợ hãi lo âu",
      "Lãng quên mất tích"
    ],
    "explanation": "希望 (xīwàng - Hán Việt: Hy vọng) biểu thị nguyện vọng tốt đẹp đối với tương lai."
  },
  {
    "id": 91,
    "hanzi": "别",
    "pinyin": "bié",
    "lesson": 10,
    "correctAnswer": "Đừng / Biệt (khuyên ngăn/người khác)",
    "options": [
      "Đừng / Biệt (khuyên ngăn/người khác)",
      "Phải / Đúng đắn",
      "Nên / Cần thiết",
      "Muốn / Thích thú"
    ],
    "explanation": "别 (bié - Hán Việt: Biệt) dùng khuyên bảo cấm đoán (别走: đừng đi) hoặc chỉ người khác (别人)."
  },
  {
    "id": 92,
    "hanzi": "正在",
    "pinyin": "zhèngzài",
    "lesson": 10,
    "correctAnswer": "Đang / Chính tại (hành động đang diễn ra)",
    "options": [
      "Đang / Chính tại (hành động đang diễn ra)",
      "Đã xong xuôi hết",
      "Sắp sửa bắt đầu",
      "Vừa mới xảy ra"
    ],
    "explanation": "正在 (zhèngzài - Hán Việt: Chính tại) nhấn mạnh hành động đang diễn ra tại đúng thời điểm nói."
  },
  {
    "id": 93,
    "hanzi": "手机",
    "pinyin": "shǒujī",
    "lesson": 10,
    "correctAnswer": "Điện thoại di động (Thủ cơ)",
    "options": [
      "Điện thoại di động (Thủ cơ)",
      "Đồng hồ đeo tay",
      "Máy vi tính để bàn",
      "Tivi truyền hình"
    ],
    "explanation": "手机 (shǒujī - Hán Việt: Thủ cơ: máy cầm tay) nghĩa là điện thoại di động."
  },
  {
    "id": 94,
    "hanzi": "洗",
    "pinyin": "xǐ",
    "lesson": 10,
    "correctAnswer": "Rửa sạch / Giặt giũ (Tẩy)",
    "options": [
      "Rửa sạch / Giặt giũ (Tẩy)",
      "Mặc trang phục",
      "Mua đồ sắm sửa",
      "Nấu nướng chín"
    ],
    "explanation": "洗 (xǐ - Hán Việt: Tẩy) là làm sạch bằng nước (Ví dụ: 洗手 - rửa tay, 洗衣服 - giặt quần áo)."
  },
  {
    "id": 95,
    "hanzi": "帮助",
    "pinyin": "bāngzhù",
    "lesson": 10,
    "correctAnswer": "Giúp đỡ / Hỗ trợ (Bang trợ)",
    "options": [
      "Giúp đỡ / Hỗ trợ (Bang trợ)",
      "Học tập rèn luyện",
      "Nói chuyện trao đổi",
      "Tìm kiếm đồ đạc"
    ],
    "explanation": "帮助 (bāngzhù - Hán Việt: Bang trợ) là giúp sức cho người khác (谢谢你的帮助 - cảm ơn sự giúp đỡ của bạn)."
  },
  {
    "id": 96,
    "hanzi": "课",
    "pinyin": "kè",
    "lesson": 10,
    "correctAnswer": "Bài học / Tiết học (Khóa)",
    "options": [
      "Bài học / Tiết học (Khóa)",
      "Quyển sách thư tịch",
      "Kỳ thi khảo thí",
      "Trường học viện"
    ],
    "explanation": "课 (kè - Hán Việt: Khóa) chỉ tiết lên lớp hoặc bài học (Ví dụ: 上课 - vào học, 下课 - tan học)."
  },
  {
    "id": 97,
    "hanzi": "教室",
    "pinyin": "jiàoshì",
    "lesson": 10,
    "correctAnswer": "Lớp học / Phòng học (Giáo thất)",
    "options": [
      "Lớp học / Phòng học (Giáo thất)",
      "Phòng ngủ nghỉ ngơi",
      "Bệnh viện chữa trị",
      "Cửa hàng buôn bán"
    ],
    "explanation": "教室 (jiàoshì - Hán Việt: Giáo thất: phòng dạy học) là phòng học trong trường."
  },
  {
    "id": 98,
    "hanzi": "往",
    "pinyin": "wǎng",
    "lesson": 10,
    "correctAnswer": "Hướng về / Về phía (Vãng)",
    "options": [
      "Hướng về / Về phía (Vãng)",
      "Xuất phát rời đi",
      "Ở tại địa điểm",
      "Đến nơi kết thúc"
    ],
    "explanation": "往 (wǎng - Hán Việt: Vãng) là giới từ chỉ hướng chuyển động (Ví dụ: 往前走 - đi về phía trước)."
  },
  {
    "id": 99,
    "hanzi": "旁边",
    "pinyin": "pángbiān",
    "lesson": 10,
    "correctAnswer": "Bên cạnh / Sát bên (Bàng biên)",
    "options": [
      "Bên cạnh / Sát bên (Bàng biên)",
      "Phía trước mặt",
      "Phía sau lưng",
      "Bên trong lòng"
    ],
    "explanation": "旁边 (pángbiān - Hán Việt: Bàng biên) là phương vị từ chỉ vị trí sát cạnh đối tượng."
  },
  {
    "id": 100,
    "hanzi": "知道",
    "pinyin": "zhīdào",
    "lesson": 10,
    "correctAnswer": "Biết rõ / Hiểu (Tri đạo)",
    "options": [
      "Biết rõ / Hiểu (Tri đạo)",
      "Quên mất lãng quên",
      "Suy nghĩ đắn đo",
      "Hỏi han vấn đáp"
    ],
    "explanation": "知道 (zhīdào - Hán Việt: Tri đạo) là nắm rõ tin tức, sự tình (Ví dụ: 我知道 - tôi biết rồi)."
  },
  {
    "id": 101,
    "hanzi": "比",
    "pinyin": "bǐ",
    "lesson": 11,
    "correctAnswer": "So với / Tỷ (dùng trong câu so sánh)",
    "options": [
      "So với / Tỷ (dùng trong câu so sánh)",
      "Bởi vì nguyên nhân",
      "Cùng nhau hợp tác",
      "Cho nên kết quả"
    ],
    "explanation": "比 (bǐ - Hán Việt: Tỷ) dùng so sánh hơn (A 比 B + Tính từ: 他比我高 - anh ấy cao hơn tôi)."
  },
  {
    "id": 102,
    "hanzi": "哥哥",
    "pinyin": "gēge",
    "lesson": 11,
    "correctAnswer": "Anh trai (Ca ca)",
    "options": [
      "Anh trai (Ca ca)",
      "Em trai đệ đệ",
      "Người cha phụ thân",
      "Bạn bè bằng hữu"
    ],
    "explanation": "哥哥 (gēge - Hán Việt: Ca ca) là người anh trai ruột trong gia đình."
  },
  {
    "id": 103,
    "hanzi": "弟弟",
    "pinyin": "dìdi",
    "lesson": 11,
    "correctAnswer": "Em trai (Đệ đệ)",
    "options": [
      "Em trai (Đệ đệ)",
      "Anh trai ca ca",
      "Em gái muội muội",
      "Con trai nhi tử"
    ],
    "explanation": "弟弟 (dìdi - Hán Việt: Đệ đệ) là em trai ruột trong gia đình."
  },
  {
    "id": 104,
    "hanzi": "姐姐",
    "pinyin": "jiějie",
    "lesson": 11,
    "correctAnswer": "Chị gái (Tỷ tỷ)",
    "options": [
      "Chị gái (Tỷ tỷ)",
      "Em gái muội muội",
      "Người mẹ mẫu thân",
      "Con gái nữ nhi"
    ],
    "explanation": "姐姐 (jiějie - Hán Việt: Tỷ tỷ) là người chị gái ruột trong gia đình."
  },
  {
    "id": 105,
    "hanzi": "妹妹",
    "pinyin": "mèimei",
    "lesson": 11,
    "correctAnswer": "Em gái (Muội muội)",
    "options": [
      "Em gái (Muội muội)",
      "Chị gái tỷ tỷ",
      "Em trai đệ đệ",
      "Con gái nữ nhi"
    ],
    "explanation": "妹妹 (mèimei - Hán Việt: Muội muội) là em gái ruột trong gia đình."
  },
  {
    "id": 106,
    "hanzi": "高",
    "pinyin": "gāo",
    "lesson": 11,
    "correctAnswer": "Cao ráo / Cao lớn (Cao)",
    "options": [
      "Cao ráo / Cao lớn (Cao)",
      "Thấp bé lùn tịt",
      "Dài ngoẵng thước tất",
      "To đùng bự chảng"
    ],
    "explanation": "高 (gāo - Hán Việt: Cao) miêu tả chiều cao người hoặc vật (很高 - rất cao, đối lập với 矮 - lùn)."
  },
  {
    "id": 107,
    "hanzi": "右边",
    "pinyin": "yòubian",
    "lesson": 11,
    "correctAnswer": "Bên phải (Hữu biên - đối lập với 左边)",
    "options": [
      "Bên phải (Hữu biên - đối lập với 左边)",
      "Bên trái tả biên",
      "Phía trước mặt",
      "Phía sau lưng"
    ],
    "explanation": "右边 (yòubian - Hán Việt: Hữu biên) là hướng tay phải (đối lập với 左边 - bên trái)."
  },
  {
    "id": 108,
    "hanzi": "左边",
    "pinyin": "zuǒbian",
    "lesson": 11,
    "correctAnswer": "Bên trái (Tả biên - đối lập với 右边)",
    "options": [
      "Bên trái (Tả biên - đối lập với 右边)",
      "Bên phải hữu biên",
      "Phía trước mặt",
      "Phía sau lưng"
    ],
    "explanation": "左边 (zuǒbian - Hán Việt: Tả biên) là hướng tay trái (đối lập với 右边 - bên phải)."
  },
  {
    "id": 109,
    "hanzi": "两",
    "pinyin": "liǎng",
    "lesson": 11,
    "correctAnswer": "Hai / Đôi (Lưỡng - trước lượng từ)",
    "options": [
      "Hai / Đôi (Lưỡng - trước lượng từ)",
      "Một cái đơn độc",
      "Ba cái tiếp nối",
      "Mười cái tròn chục"
    ],
    "explanation": "两 (liǎng - Hán Việt: Lưỡng) dùng để nói số lượng 2 khi đứng trước lượng từ (两个人 - hai người)."
  },
  {
    "id": 110,
    "hanzi": "姓",
    "pinyin": "xìng",
    "lesson": 11,
    "correctAnswer": "Họ / Mang họ (Tính)",
    "options": [
      "Họ / Mang họ (Tính)",
      "Tuổi tác đời người",
      "Nghề nghiệp làm ăn",
      "Quê quán xứ sở"
    ],
    "explanation": "姓 (xìng - Hán Việt: Tính) chỉ dòng họ (Ví dụ: 我姓王 - tôi họ Vương, 您贵姓 - ngài quý họ là gì)."
  },
  {
    "id": 111,
    "hanzi": "穿",
    "pinyin": "chuān",
    "lesson": 12,
    "correctAnswer": "Mặc áo / Xỏ giày (Xuyên)",
    "options": [
      "Mặc áo / Xỏ giày (Xuyên)",
      "Mua sắm quần áo",
      "Giặt giũ sạch sẽ",
      "Cởi bỏ áo khoác"
    ],
    "explanation": "穿 (chuān - Hán Việt: Xuyên) là mặc trang phục (穿衣服 - mặc quần áo, 穿鞋 - đi giày)."
  },
  {
    "id": 112,
    "hanzi": "进",
    "pinyin": "jìn",
    "lesson": 12,
    "correctAnswer": "Bước vào / Tiến vào (Tiến - đối lập với 出)",
    "options": [
      "Bước vào / Tiến vào (Tiến - đối lập với 出)",
      "Bước ra ngoài đường",
      "Đi xa tít tắp",
      "Trở về chốn cũ"
    ],
    "explanation": "进 (jìn - Hán Việt: Tiến) là đi vào bên trong (请进 - xin mời vào, 进来 - vào đây)."
  },
  {
    "id": 113,
    "hanzi": "得",
    "pinyin": "de",
    "lesson": 12,
    "correctAnswer": "Được / Đến mức (trợ từ miêu tả trình độ)",
    "options": [
      "Được / Đến mức (trợ từ miêu tả trình độ)",
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
    "correctAnswer": "Người vợ / Thê tử",
    "options": [
      "Người vợ / Thê tử",
      "Người chồng trượng phu",
      "Người mẹ mẫu thân",
      "Chị gái tỷ tỷ"
    ],
    "explanation": "妻子 (qīzi - Hán Việt: Thê tử) là người vợ trong gia đình."
  },
  {
    "id": 115,
    "hanzi": "雪",
    "pinyin": "xuě",
    "lesson": 12,
    "correctAnswer": "Bông tuyết / Tuyết (Tuyết)",
    "options": [
      "Bông tuyết / Tuyết (Tuyết)",
      "Hạt mưa rơi xuống",
      "Cơn gió thoảng qua",
      "Đám mây bay lượn"
    ],
    "explanation": "雪 (xuě - Hán Việt: Tuyết) là những bông tuyết rơi vào mùa đông (下雪 - tuyết rơi)."
  },
  {
    "id": 116,
    "hanzi": "零",
    "pinyin": "líng",
    "lesson": 12,
    "correctAnswer": "Số 0 / Linh (số không)",
    "options": [
      "Số 0 / Linh (số không)",
      "Số 1 duy nhất",
      "Số 10 tròn chục",
      "Số 100 hàng trăm"
    ],
    "explanation": "零 (líng - Hán Việt: Linh) là con số 0 trong toán học và ngày tháng."
  },
  {
    "id": 117,
    "hanzi": "到",
    "pinyin": "dào",
    "lesson": 12,
    "correctAnswer": "Đến nơi / Tới (Đáo)",
    "options": [
      "Đến nơi / Tới (Đáo)",
      "Rời đi nơi chốn",
      "Chờ đợi ai đó",
      "Bắt đầu khởi sự"
    ],
    "explanation": "到 (dào - Hán Việt: Đáo) biểu thị điểm đến hoặc đạt tới kết quả (到了 - đã đến nơi rồi)."
  },
  {
    "id": 118,
    "hanzi": "次",
    "pinyin": "cì",
    "lesson": 12,
    "correctAnswer": "Lần / Số lần (Thứ - lượng từ hành động)",
    "options": [
      "Lần / Số lần (Thứ - lượng từ hành động)",
      "Giờ đồng hồ",
      "Ngày trong tuần",
      "Năm tháng trôi"
    ],
    "explanation": "次 (cì - Hán Việt: Thứ) là lượng từ đo số lần thực hiện (去过一次 - đã đi một lần)."
  },
  {
    "id": 119,
    "hanzi": "真",
    "pinyin": "zhēn",
    "lesson": 12,
    "correctAnswer": "Thật sự / Chân thực (Chân - phó từ cảm thán)",
    "options": [
      "Thật sự / Chân thực (Chân - phó từ cảm thán)",
      "Giả dối dối lừa",
      "Tạm bợ qua loa",
      "Không hề phủ định"
    ],
    "explanation": "真 (zhēn - Hán Việt: Chân) là phó từ nhấn mạnh sự chân thật, cảm thán (真好 - thật là tốt)."
  },
  {
    "id": 120,
    "hanzi": "已经",
    "pinyin": "yǐjīng",
    "lesson": 12,
    "correctAnswer": "Đã / Đã rồi (Dĩ kinh)",
    "options": [
      "Đã / Đã rồi (Dĩ kinh)",
      "Chưa từng bao giờ",
      "Đang làm tiếp diễn",
      "Sẽ làm tương lai"
    ],
    "explanation": "已经 (yǐjīng - Hán Việt: Dĩ kinh) biểu thị hành động đã hoàn tất trước thời điểm nói (我已经知道了)."
  },
  {
    "id": 121,
    "hanzi": "着",
    "pinyin": "zhe",
    "lesson": 13,
    "correctAnswer": "Đang (Trước - tiếp diễn trạng thái)",
    "options": [
      "Đang (Trước - tiếp diễn trạng thái)",
      "Đã kết thúc hoàn tất",
      "Sẽ bắt đầu sắp tới",
      "Chưa xảy ra bao giờ"
    ],
    "explanation": "着 (zhe - Hán Việt: Trước) đặt sau động từ chỉ sự tiếp diễn của một trạng thái (门开着 - cửa đang mở)."
  },
  {
    "id": 122,
    "hanzi": "铅笔",
    "pinyin": "qiānbǐ",
    "lesson": 13,
    "correctAnswer": "Bút chì (Duyên bút)",
    "options": [
      "Bút chì (Duyên bút)",
      "Sách vở học tập",
      "Thước kẻ kẻ đường",
      "Cục tẩy lau vết"
    ],
    "explanation": "铅笔 (qiānbǐ - Hán Việt: Duyên bút) là dụng cụ viết bằng chì vẽ hoặc ghi chép."
  },
  {
    "id": 123,
    "hanzi": "长",
    "pinyin": "cháng",
    "lesson": 13,
    "correctAnswer": "Dài / Lâu (Trường - đối lập với 短)",
    "options": [
      "Dài / Lâu (Trường - đối lập với 短)",
      "Ngắn ngủi chốc lát",
      "Cao ráo ngút ngàn",
      "Rộng lớn bao la"
    ],
    "explanation": "长 (cháng - Hán Việt: Trường) miêu tả độ dài của vật hoặc thời gian (头发很长 - tóc rất dài)."
  },
  {
    "id": 124,
    "hanzi": "眼睛",
    "pinyin": "yǎnjing",
    "lesson": 13,
    "correctAnswer": "Đôi mắt / Ánh mắt (Nhãn tình)",
    "options": [
      "Đôi mắt / Ánh mắt (Nhãn tình)",
      "Kính đeo bảo vệ",
      "Khuôn mặt diện mạo",
      "Cái tai thính giác"
    ],
    "explanation": "眼睛 (yǎnjing - Hán Việt: Nhãn tình) là cơ quan thị giác giúp con người nhìn ngắm."
  },
  {
    "id": 125,
    "hanzi": "笑",
    "pinyin": "xiào",
    "lesson": 13,
    "correctAnswer": "Mỉm cười / Cười (Tiếu - đối lập với 哭)",
    "options": [
      "Mỉm cười / Cười (Tiếu - đối lập với 哭)",
      "Khóc lóc đau buồn",
      "Nói năng phát biểu",
      "Ca hát rộn ràng"
    ],
    "explanation": "笑 (xiào - Hán Việt: Tiếu) biểu lộ niềm vui qua nụ cười (đối lập với 哭 - khóc)."
  },
  {
    "id": 126,
    "hanzi": "晴",
    "pinyin": "qíng",
    "lesson": 13,
    "correctAnswer": "Trời nắng / Quang đãng (Tình - đối lập với 阴)",
    "options": [
      "Trời nắng / Quang đãng (Tình - đối lập với 阴)",
      "Trời mưa ảm đạm",
      "Trời rét căm căm",
      "Có tuyết giá buốt"
    ],
    "explanation": "晴 (qíng - Hán Việt: Tình) miêu tả thời tiết nắng ráo, không mây (晴天: ngày nắng đẹp)."
  },
  {
    "id": 127,
    "hanzi": "百",
    "pinyin": "bǎi",
    "lesson": 13,
    "correctAnswer": "Một trăm / Trăm (Bách)",
    "options": [
      "Một trăm / Trăm (Bách)",
      "Một nghìn (Thiên)",
      "Mười (Thập)",
      "Một vạn (Vạn)"
    ],
    "explanation": "百 (bǎi - Hán Việt: Bách) là hàng trăm (Ví dụ: 一百 - một trăm, 三百 - ba trăm)."
  },
  {
    "id": 128,
    "hanzi": "白",
    "pinyin": "bái",
    "lesson": 13,
    "correctAnswer": "Màu trắng / Bạch (đối lập với 黑)",
    "options": [
      "Màu trắng / Bạch (đối lập với 黑)",
      "Màu đen hắc ám",
      "Màu đỏ rực rỡ",
      "Màu xanh mát mẻ"
    ],
    "explanation": "白 (bái - Hán Việt: Bạch) chỉ màu trắng (Ví dụ: 白色的衣服 - quần áo màu trắng)."
  },
  {
    "id": 129,
    "hanzi": "黑",
    "pinyin": "hēi",
    "lesson": 13,
    "correctAnswer": "Màu đen / Hắc (đối lập với 白)",
    "options": [
      "Màu đen / Hắc (đối lập với 白)",
      "Màu trắng tinh khôi",
      "Màu đỏ thắm tươi",
      "Màu vàng rực rỡ"
    ],
    "explanation": "黑 (hēi - Hán Việt: Hắc) chỉ màu đen (đối lập với 白 - trắng)."
  },
  {
    "id": 130,
    "hanzi": "它",
    "pinyin": "tā",
    "lesson": 13,
    "correctAnswer": "Đồ vật đó / Con vật đó (Tha)",
    "options": [
      "Đồ vật đó / Con vật đó (Tha)",
      "Anh ấy (Tha - nam)",
      "Cô ấy (Tha - nữ)",
      "Tôi đây (Ngã)"
    ],
    "explanation": "它 (tā - Hán Việt: Tha) là đại từ nhân xưng ngôi thứ ba chỉ con vật hoặc đồ vật."
  },
  {
    "id": 131,
    "hanzi": "虽然",
    "pinyin": "suīrán",
    "lesson": 14,
    "correctAnswer": "Mặc dù / Tuy rằng (Tuy nhiên)",
    "options": [
      "Mặc dù / Tuy rằng (Tuy nhiên)",
      "Bởi vì nguyên cớ",
      "Cho nên kết quả",
      "Nếu như giả định"
    ],
    "explanation": "虽然 (suīrán - Hán Việt: Tuy nhiên/Tuy rằng) đứng đầu phân câu nhượng bộ, thường cặp với 但是."
  },
  {
    "id": 132,
    "hanzi": "但是",
    "pinyin": "dànshì",
    "lesson": 14,
    "correctAnswer": "Nhưng mà / Song le (Đãn thị)",
    "options": [
      "Nhưng mà / Song le (Đãn thị)",
      "Bởi vì do lẽ",
      "Cho nên kết quả",
      "Và lại thêm nữa"
    ],
    "explanation": "但是 (dànshì - Hán Việt: Đãn thị) là liên từ biểu thị sự chuyển ý tương phản (mặc dù... nhưng mà...)."
  },
  {
    "id": 133,
    "hanzi": "因为",
    "pinyin": "yīnwèi",
    "lesson": 14,
    "correctAnswer": "Bởi vì / Do vì (Nhân vị)",
    "options": [
      "Bởi vì / Do vì (Nhân vị)",
      "Cho nên kết luận",
      "Mặc dù nhượng bộ",
      "Nhưng mà tương phản"
    ],
    "explanation": "因为 (yīnwèi - Hán Việt: Nhân vị) là liên từ biểu thị nguyên nhân, thường cặp với 所以."
  },
  {
    "id": 134,
    "hanzi": "所以",
    "pinyin": "suǒyǐ",
    "lesson": 14,
    "correctAnswer": "Cho nên / Vì thế (Sở dĩ)",
    "options": [
      "Cho nên / Vì thế (Sở dĩ)",
      "Bởi vì nguyên do",
      "Mặc dù chuyển ý",
      "Nhưng mà đối lập"
    ],
    "explanation": "所以 (suǒyǐ - Hán Việt: Sở dĩ) là liên từ biểu thị kết quả (因为... 所以...)."
  },
  {
    "id": 135,
    "hanzi": "玩",
    "pinyin": "wán",
    "lesson": 14,
    "correctAnswer": "Vui chơi / Tiêu khiển (Ngoạn)",
    "options": [
      "Vui chơi / Tiêu khiển (Ngoạn)",
      "Làm việc vất vả",
      "Học tập căng thẳng",
      "Nghỉ ngơi an giấc"
    ],
    "explanation": "玩 (wán - Hán Việt: Ngoạn) là hoạt động giải trí, vui chơi (Ví dụ: 好玩 - chơi vui)."
  },
  {
    "id": 136,
    "hanzi": "可能",
    "pinyin": "kěnéng",
    "lesson": 14,
    "correctAnswer": "Có lẽ / Khả năng (Khả năng)",
    "options": [
      "Có lẽ / Khả năng (Khả năng)",
      "Nhất định trăm phần",
      "Không thể hoàn toàn",
      "Nên làm bổn phận"
    ],
    "explanation": "可能 (kěnéng - Hán Việt: Khả năng) biểu thị phán đoán về khả năng xảy ra của sự việc."
  },
  {
    "id": 137,
    "hanzi": "您",
    "pinyin": "nín",
    "lesson": 14,
    "correctAnswer": "Ngài / Ông / Bà (kính ngữ tôn kính)",
    "options": [
      "Ngài / Ông / Bà (kính ngữ tôn kính)",
      "Tôi / Mình (Ngã)",
      "Anh ấy (Tha)",
      "Các bạn (Nhĩ môn)"
    ],
    "explanation": "您 (nín) là cách gọi bạn (你) nhưng với lòng kính trọng đối với bậc trên hoặc khách quý."
  },
  {
    "id": 138,
    "hanzi": "服务员",
    "pinyin": "fúwùyuán",
    "lesson": 14,
    "correctAnswer": "Nhân viên phục vụ / Bồi bàn (Phục vụ viên)",
    "options": [
      "Nhân viên phục vụ / Bồi bàn (Phục vụ viên)",
      "Bác sĩ khám bệnh",
      "Thầy giáo trường học",
      "Tài xế lái xe"
    ],
    "explanation": "服务员 (fúwùyuán - Hán Việt: Phục vụ viên) là nhân viên phục vụ ở nhà hàng, khách sạn."
  },
  {
    "id": 139,
    "hanzi": "近",
    "pinyin": "jìn",
    "lesson": 14,
    "correctAnswer": "Gần gũi / Cận (cự ly gần - đối lập với 远)",
    "options": [
      "Gần gũi / Cận (cự ly gần - đối lập với 远)",
      "Xa xôi ngút ngàn",
      "To lớn khổng lồ",
      "Nhỏ bé li ti"
    ],
    "explanation": "近 (jìn - Hán Việt: Cận) miêu tả khoảng cách ngắn, cự ly gần (Ví dụ: 很近 - rất gần)."
  },
  {
    "id": 140,
    "hanzi": "游泳",
    "pinyin": "yóuyǒng",
    "lesson": 14,
    "correctAnswer": "Bơi lội / Du vịnh (thể thao dưới nước)",
    "options": [
      "Bơi lội / Du vịnh (thể thao dưới nước)",
      "Chạy bộ sân đường",
      "Đá bóng sân cỏ",
      "Chơi bóng rổ sân"
    ],
    "explanation": "游泳 (yóuyǒng - Hán Việt: Du vịnh) là hoạt động bơi lội dưới nước rèn sức khỏe."
  },
  {
    "id": 141,
    "hanzi": "票",
    "pinyin": "piào",
    "lesson": 15,
    "correctAnswer": "Tấm vé / Vé vào cửa (Phiếu)",
    "options": [
      "Tấm vé / Vé vào cửa (Phiếu)",
      "Tiền bạc chi tiêu",
      "Quyển sách học tập",
      "Tờ báo tin tức"
    ],
    "explanation": "票 (piào - Hán Việt: Phiếu) là vé vào cửa, vé tàu xe (Ví dụ: 车票 - vé xe, 电影票 - vé xem phim)."
  },
  {
    "id": 142,
    "hanzi": "火车站",
    "pinyin": "huǒchēzhàn",
    "lesson": 15,
    "correctAnswer": "Ga xe lửa / Ga tàu (Hỏa xa trạm)",
    "options": [
      "Ga xe lửa / Ga tàu (Hỏa xa trạm)",
      "Cảng hàng không sân bay",
      "Bến xe buýt đón khách",
      "Trạm xá y tế"
    ],
    "explanation": "火车站 (huǒchēzhàn - Hán Việt: Hỏa xa trạm) là nơi đón và trả khách của tàu hỏa."
  },
  {
    "id": 143,
    "hanzi": "大家",
    "pinyin": "dàjiā",
    "lesson": 15,
    "correctAnswer": "Mọi người / Đại gia (tập thể mọi người)",
    "options": [
      "Mọi người / Đại gia (tập thể mọi người)",
      "Gia đình thân thuộc",
      "Bạn bè bằng hữu",
      "Học sinh trường lớp"
    ],
    "explanation": "大家 (dàjiā - Hán Việt: Đại gia) là đại từ chỉ chung mọi người (Ví dụ: 大家好 - chào mọi người)."
  },
  {
    "id": 144,
    "hanzi": "机场",
    "pinyin": "jīchǎng",
    "lesson": 15,
    "correctAnswer": "Sân bay / Phi trường (Cơ trường)",
    "options": [
      "Sân bay / Phi trường (Cơ trường)",
      "Ga tàu hỏa hỏa xa",
      "Bến xe buýt bến cảng",
      "Công viên giải trí"
    ],
    "explanation": "机场 (jīchǎng - Hán Việt: Cơ trường: bãi đỗ phi cơ) là sân bay hàng không."
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
    "explanation": "问题 (wèntí - Hán Việt: Vấn đề) là khúc mắc, câu hỏi hoặc vấn đề cần xử lý (没问题 - không vấn đề)."
  },
  {
    "id": 146,
    "hanzi": "说话",
    "pinyin": "shuōhuà",
    "lesson": 15,
    "correctAnswer": "Nói chuyện / Phát biểu (Thuyết thoại)",
    "options": [
      "Nói chuyện / Phát biểu (Thuyết thoại)",
      "Nghe nhạc êm dịu",
      "Ca hát rộn ràng",
      "Đọc sách to tiếng"
    ],
    "explanation": "说话 (shuōhuà - Hán Việt: Thuyết thoại) là việc phát ra lời nói để trao đổi (别说话 - đừng nói chuyện)."
  },
  {
    "id": 147,
    "hanzi": "时间",
    "pinyin": "shíjiān",
    "lesson": 15,
    "correctAnswer": "Thời gian / Thời khắc (Thời gian)",
    "options": [
      "Thời gian / Thời khắc (Thời gian)",
      "Thời tiết nắng mưa",
      "Đồng hồ xem giờ",
      "Ngày tháng năm xưa"
    ],
    "explanation": "时间 (shíjiān - Hán Việt: Thời gian) chỉ quỹ thời gian hoặc khoảnh khắc (没时间 - không có thời gian)."
  },
  {
    "id": 148,
    "hanzi": "日",
    "pinyin": "rì",
    "lesson": 15,
    "correctAnswer": "Ngày / Mặt trời (Nhật)",
    "options": [
      "Ngày / Mặt trời (Nhật)",
      "Tháng / Mặt trăng",
      "Năm / Ngôi sao",
      "Tuần / Đám mây"
    ],
    "explanation": "日 (rì - Hán Việt: Nhật) dùng trong văn viết chỉ ngày trong tháng (Ví dụ: 10月1日) hoặc mặt trời."
  },
  {
    "id": 149,
    "hanzi": "对",
    "pinyin": "duì",
    "lesson": 15,
    "correctAnswer": "Đúng / Đối với (Đối - đúng đắn/giới từ)",
    "options": [
      "Đúng / Đối với (Đối - đúng đắn/giới từ)",
      "Sai / Trái lại",
      "Thích / Hợp ý",
      "Gần / Cận kề"
    ],
    "explanation": "对 (duì - Hán Việt: Đối) nghĩa là đúng (đối lập với 错) hoặc là giới từ 'đối với ai' (对我说)."
  },
  {
    "id": 150,
    "hanzi": "打篮球",
    "pinyin": "dǎ lánqiú",
    "lesson": 15,
    "correctAnswer": "Chơi bóng rổ (Đả lam cầu)",
    "options": [
      "Chơi bóng rổ (Đả lam cầu)",
      "Đá bóng sân bãi",
      "Bơi lội dưới nước",
      "Chạy bộ rèn sức"
    ],
    "explanation": "打篮球 (dǎ lánqiú - Hán Việt: Đả lam cầu) là môn thể thao chơi bóng rổ."
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

  // Generate Combined HSK 1 + HSK 2 (total 300 questions)
  // For combined, HSK 1 questions have lesson 1..15, HSK 2 questions have lesson 16..30
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
