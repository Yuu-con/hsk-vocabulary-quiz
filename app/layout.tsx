import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🇨🇳 HSK 1 Vocabulary Quiz (150 từ - HSK 2.0)",
  description: "Luyện 150 từ vựng HSK 1 phiên bản 2.0 chuẩn, giao diện quiz tương tác thông minh, chấm điểm tức thì, giải thích chi tiết và phát âm chuẩn.",
  keywords: ["HSK 1", "tiếng Trung", "từ vựng HSK 1", "quiz tiếng Trung", "học tiếng Trung", "HSK 2.0"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
