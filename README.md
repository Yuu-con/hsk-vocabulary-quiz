# 🇨🇳 HSK 1 Vocabulary Quiz (150 từ - HSK 2.0)

Website trắc nghiệm từ vựng tiếng Trung **HSK 1 (phiên bản 2.0)** chuẩn gồm **đúng và đủ 150 từ vựng**, được thiết kế hiện đại, mobile-first, mượt mà và hoạt động hoàn chỉnh 100%.

---

## 🌟 Tính năng nổi bật

1. **Chuẩn 150/150 từ vựng HSK 1 phiên bản 2.0**:
   - Mỗi câu gồm chữ Hán lớn, Pinyin chuẩn thanh điệu, 4 lựa chọn và giải thích nghĩa súc tích, dễ nhớ.
   - Dữ liệu được kiểm tra bằng script tự động: 0 trùng lặp, 100% đúng đáp án.

2. **Cơ chế Quiz thông minh & Random hóa**:
   - Vị trí các lựa chọn A/B/C/D được xáo trộn ngẫu nhiên (Fisher-Yates shuffle) mỗi lần xuất hiện.
   - Không để lộ đáp án trên UI trước khi người học chọn.
   - Chấm điểm tức thì (+1 điểm cho câu đúng, tối đa 150 điểm).
   - Chống click đúp gây tăng điểm nhiều lần.

3. **Phản hồi học tập chi tiết**:
   - Báo ngay `✓ Chính xác!` hoặc `✗ Chưa đúng` kèm highlight đáp án.
   - Hiển thị công thức từ vựng: `爱 (ài) = thích / yêu`.
   - Cung cấp mẹo ghi nhớ và ngữ cảnh sử dụng cho từng từ.

4. **Tích hợp phát âm giọng đọc chuẩn (TTS Audio)**:
   - Tích hợp nút loa phát âm tự nhiên chữ Hán qua Web Speech API (Chinese `zh-CN`).

5. **Trang tổng kết & 5 bậc xếp hạng**:
   - Thống kê chi tiết: Tổng câu, Số câu đúng, Số câu sai, Điểm số, Tỷ lệ %.
   - 5 bậc đánh giá chuẩn:
     - **135 – 150**: 🏆 Xuất sắc
     - **120 – 134**: 🎉 Rất tốt
     - **100 – 119**: 👍 Khá tốt
     - **80 – 99**: 📚 Cần ôn thêm
     - **Dưới 80**: 💪 Hãy luyện tập thêm
   - Hiệu ứng pháo hoa chúc mừng (Confetti) khi đạt điểm cao.

6. **Chức năng "Ôn lại câu sai" (Review Wrong Answers)**:
   - Lọc và đưa toàn bộ các câu trả lời sai vào một phiên ôn tập riêng biệt.
   - Điểm số ôn tập tính riêng.
   - Thông báo kết thúc rõ ràng: *"Bạn đã ôn lại X câu sai."*

7. **Tự động lưu tiến độ (localStorage)**:
   - Tự động lưu vị trí câu hỏi, điểm số, lịch sử câu đã trả lời.
   - Tải lại trang (F5) không bị mất bài làm.
   - Có nút *Bắt đầu lại từ đầu* để xóa tiến trình bất cứ lúc nào.

8. **Trải nghiệm tối ưu Mobile-first & Phím tắt (Keyboard Navigation)**:
   - Nút bấm to, rõ, responsive trên smartphone, tablet và máy tính.
   - Hỗ trợ phím tắt: bấm `1`/`2`/`3`/`4` hoặc `A`/`B`/`C`/`D` để chọn đáp án, bấm `Enter` hoặc `Space` để qua câu tiếp theo.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hiệu ứng**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Runner / Validation**: `tsx`, Node.js native assert test runner
- **Deploy**: Tối ưu hóa sẵn sàng 1 click cho [Vercel](https://vercel.com/)

---

## 📁 Cấu trúc thư mục

```text
├── app/
│   ├── globals.css         # Tailwind directives & typography Hán tự
│   ├── layout.tsx          # Root layout, viewport & metadata SEO
│   └── page.tsx            # Trang chính điều phối các trạng thái quiz
├── components/
│   ├── QuizCard.tsx        # Card câu hỏi, Hán tự, Pinyin, 4 đáp án & feedback
│   ├── QuizHeader.tsx      # Thanh tiêu đề, thanh tiến độ & điểm realtime
│   ├── ResultScreen.tsx    # Màn hình kết quả 150 câu & phân loại danh hiệu
│   ├── ReviewFinishedScreen.tsx # Màn hình kết thúc ôn lại câu sai
│   └── StartScreen.tsx     # Màn hình bắt đầu & tiếp tục bài làm dở
├── data/
│   └── hsk1-data.ts        # Database tĩnh chuẩn 150 từ HSK 1 phiên bản 2.0
├── hooks/
│   └── useQuiz.ts          # Custom hook quản lý state, localStorage & ôn tập
├── lib/
│   └── quiz-utils.ts       # Shuffle Fisher-Yates, xếp hạng điểm, Web Speech TTS
├── types/
│   └── quiz.ts             # Định nghĩa Type/Interface TypeScript
├── scripts/
│   ├── build-data.ts       # Script tạo dữ liệu câu hỏi
│   └── validate-data.ts    # Script kiểm tra chuẩn 150 câu không trùng lặp
├── __tests__/
│   └── quiz-logic.test.ts  # Test suite kiểm tra 10 quy tắc nghiệp vụ
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Hướng dẫn chạy Local

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Kiểm tra dữ liệu 150 từ vựng
```bash
npm run validate
```
*Kết quả:* Xác nhận đủ 150/150 từ, không trùng lặp, đủ 4 options, đáp án hợp lệ.

### 3. Chạy bài kiểm tra Unit / Logic
```bash
npm test
```
*Kết quả:* Chạy 10 test case bao quát tính điểm, chống click đúp, chuyển câu, ôn câu sai, localStorage.

### 4. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 📦 Hướng dẫn Build & Deploy Production

### 1. Build kiểm tra Production
```bash
npm run build
```
Lệnh sẽ compile toàn bộ TypeScript và tạo bản build tĩnh tối ưu (`.next/`).

### 2. Chạy bản build Production tại máy:
```bash
npm run start
```

### 3. Deploy lên Vercel

Dự án được cấu hình tiêu chuẩn Next.js nên tương thích tuyệt đối với Vercel:

#### Cách 1: Deploy qua Vercel CLI
```bash
npx vercel
```
Làm theo hướng dẫn trên màn hình (đăng nhập tài khoản Vercel và chọn thiết lập mặc định).

#### Cách 2: Deploy qua GitHub (Khuyên dùng)
1. Đẩy mã nguồn lên kho chứa GitHub cá nhân:
   ```bash
   git add .
   git commit -m "feat: complete HSK 1 vocabulary quiz application"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Truy cập [vercel.com/new](https://vercel.com/new) -> Chọn repository vừa tạo -> Bấm **Deploy**.
3. Vercel sẽ tự động build và cung cấp domain trực tuyến miễn phí dạng:
   `https://<your-project-name>.vercel.app`

---

## 📜 Bản quyền & Nội dung

- Dữ liệu 150 từ vựng căn cứ theo khung chuẩn **HSK 1 (phiên bản 2.0)** của Hanban / Trung tâm Khảo thí Giáo dục Ngôn ngữ Trung Quốc.
- Mã nguồn được đóng gói hoàn chỉnh, sẵn sàng sử dụng cho mục đích học tập và ôn thi.
