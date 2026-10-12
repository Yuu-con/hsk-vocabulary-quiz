// Lesson theme definitions for HSK 1 and HSK 2 (15 lessons each, HSK Standard Course 2.0)
export interface LessonInfo {
  lesson: number;
  title: string;
  viTitle: string;
}

export const HSK1_LESSON_INFO = [
  { lesson: 1, title: '你好', viTitle: 'Chào hỏi' },
  { lesson: 2, title: '谢谢你', viTitle: 'Cảm ơn bạn' },
  { lesson: 3, title: '你叫什么名字', viTitle: 'Bạn tên là gì' },
  { lesson: 4, title: '她是我的汉语老师', viTitle: 'Cô ấy là giáo viên tiếng Trung của tôi' },
  { lesson: 5, title: '她女儿今年二十岁', viTitle: 'Con gái cô ấy năm nay hai mươi tuổi' },
  { lesson: 6, viTitle: 'Tôi biết nói tiếng Trung', title: '我会说汉语' },
  { lesson: 7, viTitle: 'Hôm nay ngày mấy', title: '今天几号' },
  { lesson: 8, viTitle: 'Tôi muốn uống trà', title: '我想喝茶' },
  { lesson: 9, viTitle: 'Con trai bạn làm việc ở đâu', title: '你儿子在哪儿工作' },
  { lesson: 10, viTitle: 'Tôi có thể ngồi ở đây không', title: '我能坐这儿吗' },
  { lesson: 11, viTitle: 'Bây giờ mấy giờ', title: '现在几点' },
  { lesson: 12, viTitle: 'Thời tiết ngày mai thế nào', title: '明天天气怎么样' },
  { lesson: 13, viTitle: 'Anh ấy đang học nấu món ăn Trung Quốc', title: '他在学做中国菜呢' },
  { lesson: 14, viTitle: 'Cô ấy mua không ít quần áo', title: '她买了不少衣服' },
  { lesson: 15, viTitle: 'Tôi đi máy bay đến', title: '我是坐飞机来的' },
];

export const HSK2_LESSON_INFO = [
  { lesson: 1, title: '九月去北京旅游最好', viTitle: 'Tháng 9 đi Bắc Kinh du lịch tốt nhất' },
  { lesson: 2, title: '我每天六点起床', viTitle: 'Hàng ngày tôi thức dậy lúc sáu giờ' },
  { lesson: 3, title: '左边那个红色的是我的', viTitle: 'Cái màu đỏ bên trái là của tôi' },
  { lesson: 4, title: '这个工作是他帮我介绍的', viTitle: 'Công việc này do anh ấy giới thiệu' },
  { lesson: 5, title: '就买这件吧', viTitle: 'Cứ mua chiếc này đi' },
  { lesson: 6, title: '你怎么不吃了', viTitle: 'Sao bạn không ăn nữa' },
  { lesson: 7, title: '你家离公司远吗', viTitle: 'Nhà bạn cách công ty xa không' },
  { lesson: 8, title: '让我想想再告诉你', viTitle: 'Để tôi nghĩ rồi nói cho bạn sau' },
  { lesson: 9, title: '题太多，我没做完', viTitle: 'Đề thi nhiều quá, tôi chưa làm xong' },
  { lesson: 10, title: '别找了，手机在桌子上呢', viTitle: 'Đừng tìm nữa, điện thoại ở trên bàn kìa' },
  { lesson: 11, title: '他比我大三岁', viTitle: 'Anh ấy lớn hơn tôi ba tuổi' },
  { lesson: 12, title: '你穿得太少了', viTitle: 'Bạn mặc ít áo quá' },
  { lesson: 13, title: '门开着呢', viTitle: 'Cửa đang mở kìa' },
  { lesson: 14, title: '你看过那个电影吗', viTitle: 'Bạn đã từng xem bộ phim đó chưa' },
  { lesson: 15, title: '新年就要到了', viTitle: 'Năm mới sắp đến rồi' },
];

export const COMPOUND_SECTION_INFO = [
  { lesson: 1, title: '指示与判断', viTitle: 'Chỉ trỏ & Xác định' },
  { lesson: 2, title: '疑问短语', viTitle: 'Từ để hỏi thường gặp' },
  { lesson: 3, title: '人物与关系', viTitle: 'Người, xuất thân & Mối quan hệ' },
  { lesson: 4, title: '时间组合', viTitle: 'Thời gian ghép đôi' },
  { lesson: 5, title: '饮食与购物', viTitle: 'Ẩm thực, đồ uống & Mua sắm' },
  { lesson: 6, title: '生活与运动', viTitle: 'Sinh hoạt, đi lại & Thể thao' },
  { lesson: 7, title: '状态与补语', viTitle: 'Kết quả, trạng thái & Bổ ngữ' },
  { lesson: 8, title: '程度与感叹', viTitle: 'Mức độ & Cảm thán giao tiếp' },
];
