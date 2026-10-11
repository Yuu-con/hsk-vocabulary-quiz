export interface RoastMessage {
  id: string;
  category: string;
  categoryTitle: string;
  tag: string;
  icon: string;
  quote: string;
}

export const WRONG_ANSWER_ROASTS: RoastMessage[] = [
  // Hệ khen đểu: "Tài năng thiên bẩm"
  {
    id: 'khen_deu_1',
    category: 'Hệ khen đểu',
    categoryTitle: 'Tài năng thiên bẩm',
    tag: 'Định vị ngược',
    icon: '🧭',
    quote: 'Đúng là ngọn hải đăng chỉ đường ngược: từ giờ cứ làm ngược lại những gì bạn chọn là đảm bảo đúng 100%!',
  },
  {
    id: 'khen_deu_2',
    category: 'Hệ khen đểu',
    categoryTitle: 'Tài năng thiên bẩm',
    tag: 'Siêu năng lực né đáp án',
    icon: '🎯',
    quote: 'Né đáp án đúng chuẩn xác đến từng milimet thế này cũng là một dạng tài năng hiếm có đấy.',
  },
  {
    id: 'khen_deu_3',
    category: 'Hệ khen đểu',
    categoryTitle: 'Tài năng thiên bẩm',
    tag: 'Mất tín hiệu vũ trụ',
    icon: '📡',
    quote: "Bộ não của bạn vừa nãy chắc đang bận 'reconnect' với vũ trụ đúng không?",
  },
  {
    id: 'khen_deu_4',
    category: 'Hệ khen đểu',
    categoryTitle: 'Tài năng thiên bẩm',
    tag: 'Diễn xuất Oscar',
    icon: '🎭',
    quote: 'Định giả vờ trả lời sai để nhường người khác đúng không? Diễn xuất đạt lắm, trừ điểm phong cách!',
  },

  // Hệ toán học & xác suất: "Cú Hat-trick lịch sử"
  {
    id: 'toan_hoc_1',
    category: 'Hệ toán học & xác suất',
    categoryTitle: 'Cú Hat-trick lịch sử',
    tag: 'Quá tam ba bận',
    icon: '🎲',
    quote: "Người ta bảo 'quá tam ba bận', mà bạn thì bận nào cũng trật một cách trọn vẹn.",
  },
  {
    id: 'toan_hoc_2',
    category: 'Hệ toán học & xác suất',
    categoryTitle: 'Cú Hat-trick lịch sử',
    tag: 'Kỷ lục gia sân cỏ',
    icon: '⚽',
    quote: 'Lập cú hat-trick sai liên tiếp thế này thì tiền đạo đội tuyển cũng phải gọi bạn bằng cụ.',
  },
  {
    id: 'toan_hoc_3',
    category: 'Hệ toán học & xác suất',
    categoryTitle: 'Cú Hat-trick lịch sử',
    tag: 'Xác suất thiên tài',
    icon: '🎰',
    quote: 'Xác suất để đoán sai cả 3 câu còn khó hơn trúng vé số, chúc mừng bạn đã phá kỷ lục thống kê!',
  },
  {
    id: 'toan_hoc_4',
    category: 'Hệ toán học & xác suất',
    categoryTitle: 'Cú Hat-trick lịch sử',
    tag: 'Con số hoàn hảo',
    icon: '⭕',
    quote: '0 trên 3. Một con số tròn trĩnh và đẹp đẽ như tâm hồn của bạn vậy.',
  },

  // Hệ an ủi "xát muối"
  {
    id: 'an_ui_1',
    category: 'Hệ an ủi "xát muối"',
    categoryTitle: 'Chữa lành bằng muối',
    tag: 'Kiên định phi thường',
    icon: '🧂',
    quote: 'Đừng buồn, ít nhất bạn rất kiên định... kiên định chọn sai từ đầu đến cuối.',
  },
  {
    id: 'an_ui_2',
    category: 'Hệ an ủi "xát muối"',
    categoryTitle: 'Chữa lành bằng muối',
    tag: 'Dính bẫy ngọt ngào',
    icon: '🪤',
    quote: 'Thua keo này ta bày keo khác, nhưng đến keo thứ ba này thì dính luôn vô bẫy chuột rồi.',
  },
  {
    id: 'an_ui_3',
    category: 'Hệ an ủi "xát muối"',
    categoryTitle: 'Chữa lành bằng muối',
    tag: 'Lối đi riêng',
    icon: '🚧',
    quote: 'Không sao đâu, người thông minh thường có lối đi riêng, chỉ là lối đi này hơi cụt thôi.',
  },
  {
    id: 'an_ui_4',
    category: 'Hệ an ủi "xát muối"',
    categoryTitle: 'Chữa lành bằng muối',
    tag: 'Tiêu hao calo',
    icon: '🧃',
    quote: 'Thôi uống ngụm nước lấy lại phong độ đi, chứ nãy giờ thấy não hoạt động hơi tốn calo vô ích rồi đó.',
  },

  // Câu chốt hạ để đòi kèo phạt
  {
    id: 'keo_phat_1',
    category: 'Câu chốt đòi kèo phạt',
    categoryTitle: 'Kèo trà sữa',
    tag: 'Thổi còi phạt đền',
    icon: '🧋',
    quote: '3 câu thông rồi, tự giác bao chầu trà sữa/nộp phạt đi chứ còn đợi trọng tài thổi còi à?',
  },
  {
    id: 'keo_phat_2',
    category: 'Câu chốt đòi kèo phạt',
    categoryTitle: 'Kèo phạt ví tiền',
    tag: 'Chuẩn bị ví',
    icon: '💸',
    quote: 'Sai 1 câu là tai nạn, 2 câu là trùng hợp, đến câu thứ 3 thì chuẩn bị ví tiền đi bạn ơi!',
  },
];

/**
 * Returns a random roast or one deterministically mapped to question and attempt
 */
export function getRandomRoast(seed?: number): RoastMessage {
  if (typeof seed === 'number' && !isNaN(seed)) {
    const idx = Math.abs(seed) % WRONG_ANSWER_ROASTS.length;
    return WRONG_ANSWER_ROASTS[idx];
  }
  const randomIdx = Math.floor(Math.random() * WRONG_ANSWER_ROASTS.length);
  return WRONG_ANSWER_ROASTS[randomIdx];
}
