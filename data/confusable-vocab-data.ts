import { ConfusableGroupItem } from '@/types/practice';

export const CONFUSABLE_CATEGORIES: string[] = [
  "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
  "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
  "3. Nhóm khác phụ âm đầu (Thanh mẫu dễ lẫn: s/sh, z/c, m/w)",
  "4. Nhóm khác âm cuối / Vần (Vận mẫu mũi: -an vs -ang, -in vs -ing)",
  "1. Cặp âm đối xứng dễ líu lưỡi: kāishǐ vs kǎoshì",
  "2. Cặp khuôn vần [-ang] + [-ian]: pángbiān vs fángjiān",
  "3. Nhóm chung hậu tố (Đuôi từ)",
  "4. Nhóm chung tiền tố: [diàn-] (Thiết bị dùng điện)"
];

export const CONFUSABLE_VOCAB_DATA: ConfusableGroupItem[] = [
  {
    "id": 1,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, ông ấy"
      },
      {
        "hanzi": "她",
        "pinyin": "tā",
        "meaning": "Cô ấy, bà ấy"
      },
      {
        "hanzi": "它",
        "pinyin": "tā",
        "meaning": "Nó (đồ vật, con vật)"
      }
    ],
    "tips": "• **他**: Bộ Nhân đứng (亻) chỉ nam giới hoặc nói chung.\n• **她**: Bộ Nữ (女) chỉ phụ nữ.\n• **它**: Bộ Miên (宀) chỉ đồ vật, động vật."
  },
  {
    "id": 2,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "做",
        "pinyin": "zuò",
        "meaning": "Làm, chế tạo"
      },
      {
        "hanzi": "坐",
        "pinyin": "zuò",
        "meaning": "Ngồi; đi (xe, tàu)"
      }
    ],
    "tips": "• **做**: Hành động tạo ra công việc/sản phẩm (做饭 = nấu cơm, 做作业 = làm bài tập).\n• **坐**: Tư thế ngồi hoặc ngồi trên phương tiện (请坐 = mời ngồi, 坐车 = đi xe)."
  },
  {
    "id": 3,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "快",
        "pinyin": "kuài",
        "meaning": "Nhanh; sắp sửa"
      },
      {
        "hanzi": "块",
        "pinyin": "kuài",
        "meaning": "Đồng (tiền); miếng, cục"
      }
    ],
    "tips": "• **快**: Tốc độ hoặc thời gian sắp tới (快走 = đi nhanh, 快到了 = sắp đến rồi).\n• **块**: Lượng từ chỉ tiền tệ (五块钱) hoặc vật dạng khối (一块蛋糕 = 1 miếng bánh)."
  },
  {
    "id": 4,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "进",
        "pinyin": "jìn",
        "meaning": "Vào"
      },
      {
        "hanzi": "近",
        "pinyin": "jìn",
        "meaning": "Gần"
      }
    ],
    "tips": "• **进**: Động từ di chuyển vào trong, trái nghĩa với 出 (ra).\n• **近**: Cự ly khoảng cách, trái nghĩa với 远 (xa)."
  },
  {
    "id": 5,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "完",
        "pinyin": "wán",
        "meaning": "Xong, hết"
      },
      {
        "hanzi": "玩",
        "pinyin": "wán",
        "meaning": "Chơi"
      }
    ],
    "tips": "• **完**: Bổ ngữ đứng sau động từ chỉ sự hoàn thành (做完 = làm xong, 吃完 = ăn hết).\n• **玩**: Động từ giải trí, vui chơi (玩儿 = đi chơi)."
  },
  {
    "id": 6,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "要",
        "pinyin": "yào",
        "meaning": "Cần, muốn; sắp"
      },
      {
        "hanzi": "药",
        "pinyin": "yào",
        "meaning": "Thuốc (chữa bệnh)"
      }
    ],
    "tips": "• **要**: Động từ/trợ động từ chỉ nhu cầu, dự định (我要学中文).\n• **药**: Danh từ thuốc men (吃药 = uống thuốc)."
  },
  {
    "id": 7,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "1. Nhóm đồng âm hoàn toàn (Cùng Pinyin, cùng thanh điệu)",
    "words": [
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (nối danh từ)"
      },
      {
        "hanzi": "得",
        "pinyin": "de",
        "meaning": "Trợ từ mức độ"
      }
    ],
    "tips": "• **的**: Đứng trước danh từ (我的书 = sách của tôi).\n• **得**: Đứng sau động từ miêu tả trạng thái/mức độ (跑得快 = chạy nhanh)."
  },
  {
    "id": 8,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "买",
        "pinyin": "mǎi (thanh 3)",
        "meaning": "Mua"
      },
      {
        "hanzi": "卖",
        "pinyin": "mài (thanh 4)",
        "meaning": "Bán"
      }
    ],
    "tips": "• **买**: Trầm giọng kéo dài = mua vào.\n• **卖**: Dằn giọng dứt khoát = bán đi. Chữ **卖** có thêm dấu thập (十) trên đầu so với **买**."
  },
  {
    "id": 9,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "哪",
        "pinyin": "nǎ (thanh 3)",
        "meaning": "Nào (dùng để hỏi)"
      },
      {
        "hanzi": "那",
        "pinyin": "nà (thanh 4)",
        "meaning": "Kia, đó (chỉ định)"
      }
    ],
    "tips": "• **哪**: Có bộ Khẩu (口 - miệng) dùng để hỏi (哪个人?).\n• **那**: Không có bộ Khẩu, dùng để chỉ vị trí (那个人)."
  },
  {
    "id": 10,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "哪儿",
        "pinyin": "nǎr (thanh 3)",
        "meaning": "Ở đâu, chỗ nào"
      },
      {
        "hanzi": "那儿",
        "pinyin": "nàr (thanh 4)",
        "meaning": "Chỗ kia, nơi đó"
      }
    ],
    "tips": "• Tương ứng với cặp 哪 / 那 nhưng thêm âm uốn lưỡi để chỉ rõ địa điểm."
  },
  {
    "id": 11,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "白",
        "pinyin": "bái (thanh 2)",
        "meaning": "Màu trắng"
      },
      {
        "hanzi": "百",
        "pinyin": "bǎi (thanh 3)",
        "meaning": "Trăm (số 100)"
      }
    ],
    "tips": "• **白**: Đọc vuốt lên (sắc).\n• **百**: Hạ giọng (hỏi); chữ **百** có thêm nét ngang trên đầu chữ **白**."
  },
  {
    "id": 12,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "请",
        "pinyin": "qǐng (thanh 3)",
        "meaning": "Xin, mời, làm ơn"
      },
      {
        "hanzi": "晴",
        "pinyin": "qíng (thanh 2)",
        "meaning": "Trời nắng, tạnh ráo"
      }
    ],
    "tips": "• **请**: Có bộ Ngôn (言) liên quan đến lời nói, mời mọc.\n• **晴**: Có bộ Nhật (日) liên quan đến mặt trời, nắng ráo."
  },
  {
    "id": 13,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "喝",
        "pinyin": "hē (thanh 1)",
        "meaning": "Uống"
      },
      {
        "hanzi": "和",
        "pinyin": "hé (thanh 2)",
        "meaning": "Và, cùng với"
      }
    ],
    "tips": "• **喝**: Đọc đều cao (喝水 = uống nước).\n• **和**: Đọc vuốt lên (我和你 = tôi và bạn)."
  },
  {
    "id": 14,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "2. Nhóm chỉ khác thanh điệu (Cùng âm, khác dấu)",
    "words": [
      {
        "hanzi": "雨",
        "pinyin": "yǔ (thanh 3)",
        "meaning": "Mưa"
      },
      {
        "hanzi": "鱼",
        "pinyin": "yú (thanh 2)",
        "meaning": "Con cá"
      }
    ],
    "tips": "• **雨**: Đọc giọng trầm trong 下雨 (xiàyǔ = trời mưa).\n• **鱼**: Đọc vuốt lên trong 吃鱼 (chī yú = ăn cá)."
  },
  {
    "id": 15,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "3. Nhóm khác phụ âm đầu (Thanh mẫu dễ lẫn: s/sh, z/c, m/w)",
    "words": [
      {
        "hanzi": "四",
        "pinyin": "sì",
        "meaning": "Số 4"
      },
      {
        "hanzi": "十",
        "pinyin": "shí",
        "meaning": "Số 10"
      }
    ],
    "tips": "• **sì**: Đầu lưỡi thẳng, không uốn, đọc dứt khoát.\n• **shí**: Uốn cong đầu lưỡi lên ngạc cứng, đọc vuốt lên."
  },
  {
    "id": 16,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "3. Nhóm khác phụ âm đầu (Thanh mẫu dễ lẫn: s/sh, z/c, m/w)",
    "words": [
      {
        "hanzi": "坐 / 做",
        "pinyin": "zuò",
        "meaning": "Ngồi / Làm"
      },
      {
        "hanzi": "错",
        "pinyin": "cuò",
        "meaning": "Sai, lỗi"
      }
    ],
    "tips": "• **zuò**: Phát âm nhẹ, không bật hơi.\n• **cuò**: Cắn nhẹ đầu lưỡi rồi bật luồng hơi mạnh ra ngoài."
  },
  {
    "id": 17,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "3. Nhóm khác phụ âm đầu (Thanh mẫu dễ lẫn: s/sh, z/c, m/w)",
    "words": [
      {
        "hanzi": "走",
        "pinyin": "zǒu",
        "meaning": "Đi bộ, rời đi"
      },
      {
        "hanzi": "左",
        "pinyin": "zuǒ",
        "meaning": "Bên trái"
      }
    ],
    "tips": "• **zǒu**: Vần -ou (走路 = đi bộ).\n• **zuǒ**: Vần -uo (左边 = phía bên trái)."
  },
  {
    "id": 18,
    "part": "PHẦN 1: CÁC CẶP TỪ ĐƠN & TỐI THIỂU VỀ NGỮ ÂM",
    "category": "3. Nhóm khác phụ âm đầu (Thanh mẫu dễ lẫn: s/sh, z/c, m/w)",
    "words": [
      {
        "hanzi": "门",
        "pinyin": "mén",
        "meaning": "Cửa, cổng"
      },
      {
        "hanzi": "问",
        "pinyin": "wèn",
        "meaning": "Hỏi"
      }
    ],
    "tips": "• **mén**: Bắt đầu bằng âm môi m-.\n• **wèn**: Bắt đầu bằng âm w-; có bộ Khẩu (口) nằm trong khung cửa 门 để hỏi."
  },
  {
    "id": 19,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "4. Nhóm khác âm cuối / Vần (Vận mẫu mũi: -an vs -ang, -in vs -ing)",
    "words": [
      {
        "hanzi": "慢",
        "pinyin": "màn",
        "meaning": "Chậm, từ từ"
      },
      {
        "hanzi": "忙",
        "pinyin": "máng",
        "meaning": "Bận rộn"
      }
    ],
    "tips": "• **-an**: Vần mũi trước, đầu lưỡi chạm chân răng trên khi dứt âm.\n• **-ang**: Vần mũi sau, gốc lưỡi nâng lên chạm ngạc mềm, âm ngân vang."
  },
  {
    "id": 20,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "4. Nhóm khác âm cuối / Vần (Vận mẫu mũi: -an vs -ang, -in vs -ing)",
    "words": [
      {
        "hanzi": "进 / 近",
        "pinyin": "jìn",
        "meaning": "Vào / Gần"
      },
      {
        "hanzi": "新",
        "pinyin": "xīn",
        "meaning": "Mới"
      }
    ],
    "tips": "• **j-**: Âm mặt lưỡi dứt khoát.\n• **x-**: Âm luồng gió trượt nhẹ qua mặt lưỡi."
  },
  {
    "id": 21,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "4. Nhóm khác âm cuối / Vần (Vận mẫu mũi: -an vs -ang, -in vs -ing)",
    "words": [
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ; một chút"
      },
      {
        "hanzi": "店",
        "pinyin": "diàn",
        "meaning": "Cửa hàng, quán"
      }
    ],
    "tips": "• Cùng âm dian; **点** mang thanh 3 (hỏi); **店** mang thanh 4 (dứt khoát trong 商店, 饭店)."
  },
  {
    "id": 22,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "1. Cặp âm đối xứng dễ líu lưỡi: kāishǐ vs kǎoshì",
    "words": [
      {
        "hanzi": "开始",
        "pinyin": "kāishǐ",
        "meaning": "Bắt đầu"
      },
      {
        "hanzi": "考试",
        "pinyin": "kǎoshì",
        "meaning": "Thi cử, bài thi"
      }
    ],
    "tips": "• **开始**: **kāi** (thanh 1, cao bằng): mở ra, bắt đầu.\n*Phản xạ:* 考试开始了！ (Kǎoshì kāishǐ le! = Bài thi bắt đầu rồi!)\n• **考试**: **kǎo** (thanh 3, trầm): kiểm tra; **shì** (thanh 4, dằn giọng): bài thi."
  },
  {
    "id": 23,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "2. Cặp khuôn vần [-ang] + [-ian]: pángbiān vs fángjiān",
    "words": [
      {
        "hanzi": "旁边",
        "pinyin": "pángbiān",
        "meaning": "Bên cạnh"
      },
      {
        "hanzi": "房间",
        "pinyin": "fángjiān",
        "meaning": "Căn phòng"
      }
    ],
    "tips": "• **旁边**: Đuôi **边 (biān)** chỉ phương hướng, cạnh bên. Âm đầu là p-.\n*Phản xạ:* 我的房间旁边是学校。 (Bên cạnh phòng tôi là trường học).\n• **房间**: Đuôi **间 (jiān)** chỉ không gian, gian phòng. Âm đầu f- phát âm lướt răng môi gần giống âm Ph (Phòng)."
  },
  {
    "id": 24,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "3. Nhóm chung hậu tố (Đuôi từ)",
    "prefixOrSuffix": "-xīn *(Cảm xúc)*",
    "words": [
      {
        "hanzi": "开心",
        "pinyin": "kāixīn",
        "meaning": "Vui vẻ"
      },
      {
        "hanzi": "担心",
        "pinyin": "dānxīn",
        "meaning": "Lo lắng"
      },
      {
        "hanzi": "小心",
        "pinyin": "xiǎoxīn",
        "meaning": "Cẩn thận"
      }
    ],
    "tips": "• **开心**: Mở rộng (开) trái tim (心) → vui vẻ, sảng khoái.\n• **担心**: Gánh vác (担) nặng trong lòng (心) → bất an, lo âu.\n• **小心**: Thu nhỏ (小) trái tim (心) để soi từng li từng tí → cẩn thận, chú ý."
  },
  {
    "id": 25,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "3. Nhóm chung hậu tố (Đuôi từ)",
    "prefixOrSuffix": "-hòu *(Thời gian)*",
    "words": [
      {
        "hanzi": "时候",
        "pinyin": "shíhou",
        "meaning": "Lúc, khi"
      },
      {
        "hanzi": "以后",
        "pinyin": "yǐhòu",
        "meaning": "Sau khi, sau này"
      }
    ],
    "tips": "• **时候**: Đi trong cụm ...的时候 chỉ việc đang xảy ra (吃饭的时候 = lúc đang ăn).\n• **以后**: Đứng sau hành động hoặc đầu câu chỉ việc sau đó (吃饭以后 = sau khi ăn xong)."
  },
  {
    "id": 26,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "3. Nhóm chung hậu tố (Đuôi từ)",
    "prefixOrSuffix": "-qì *(Khí)*",
    "words": [
      {
        "hanzi": "天气",
        "pinyin": "tiānqì",
        "meaning": "Thời tiết"
      },
      {
        "hanzi": "客气",
        "pinyin": "kèqi",
        "meaning": "Khách sáo"
      },
      {
        "hanzi": "生气",
        "pinyin": "shēngqì",
        "meaning": "Tức giận"
      }
    ],
    "tips": "• **天气**: Khí hậu của đất trời (天 = trời).\n• **客气**: Thái độ xa cách như khách (dùng trong 不客气 = đừng khách sáo).\n• **生气**: Tự sinh (生) ra luồng hỏa khí trong người → bực tức, giận dỗi."
  },
  {
    "id": 27,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "3. Nhóm chung hậu tố (Đuôi từ)",
    "prefixOrSuffix": "-jī *(Máy móc)*",
    "words": [
      {
        "hanzi": "飞机",
        "pinyin": "fēijī",
        "meaning": "Máy bay"
      },
      {
        "hanzi": "手机",
        "pinyin": "shǒujī",
        "meaning": "Điện thoại di động"
      }
    ],
    "tips": "• **飞机**: Cỗ máy biết bay trên trời (飞 = bay).\n• **手机**: Thiết bị máy móc cầm vừa trong lòng bàn tay (手 = tay)."
  },
  {
    "id": 28,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "3. Nhóm chung hậu tố (Đuôi từ)",
    "prefixOrSuffix": "-yuàn *(Khuôn viên)*",
    "words": [
      {
        "hanzi": "医院",
        "pinyin": "yīyuàn",
        "meaning": "Bệnh viện"
      },
      {
        "hanzi": "电影院",
        "pinyin": "diànyǐngyuàn",
        "meaning": "Rạp chiếu phim"
      }
    ],
    "tips": "• **医院**: Nơi bác sĩ (医生) khám chữa bệnh.\n• **电影院**: Nơi chiếu các bộ phim điện ảnh (电影)."
  },
  {
    "id": 29,
    "part": "PHẦN 2: CÁC TỪ GHÉP TƯƠNG ĐỒNG CẤU TRÚC",
    "category": "4. Nhóm chung tiền tố: [diàn-] (Thiết bị dùng điện)",
    "prefixOrSuffix": "[diàn-] (Thiết bị dùng điện)",
    "words": [
      {
        "hanzi": "电话",
        "pinyin": "diànhuà",
        "meaning": "Điện thoại / Cuộc gọi"
      },
      {
        "hanzi": "电脑",
        "pinyin": "diànnǎo",
        "meaning": "Máy vi tính"
      },
      {
        "hanzi": "电视",
        "pinyin": "diànshì",
        "meaning": "Ti-vi"
      },
      {
        "hanzi": "电影",
        "pinyin": "diànyǐng",
        "meaning": "Phim chiếu rạp"
      }
    ],
    "tips": "• **电话**: **huà**: Lời nói, giao tiếp nói chuyện.\n• **电脑**: **nǎo**: Bộ não, cỗ máy xử lý dữ liệu thông minh như não người.\n• **电视**: **shì**: Thị giác, nhìn thấy (màn hình hiển thị hình ảnh truyền hình).\n• **电影**: **yǐng**: Hình bóng (những thước phim nghệ thuật trình chiếu)."
  }
];
