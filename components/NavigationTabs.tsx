'use client';

import React from 'react';
import { PracticeTab } from '@/types/practice';
import { BookOpen, MessageSquare, Headphones, FileText, CheckCircle2 } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: PracticeTab;
  onTabChange: (tab: PracticeTab) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'quiz' as PracticeTab,
      label: 'Trắc nghiệm ôn tập',
      badge: 'HSK 1–2 & Cụm ghép',
      icon: CheckCircle2,
      desc: 'Thi trắc nghiệm & Vòng lặp',
    },
    {
      id: 'vocab' as PracticeTab,
      label: 'Học từ vựng',
      badge: 'Theo bài & Chủ đề',
      icon: BookOpen,
      desc: 'Học thuộc & Nghe phát âm',
    },
    {
      id: 'sentences' as PracticeTab,
      label: 'Mẫu câu thường gặp',
      badge: '70 mẫu câu',
      icon: MessageSquare,
      desc: 'Giao tiếp 14 chủ đề',
    },
    {
      id: 'listening' as PracticeTab,
      label: 'Luyện nghe',
      badge: 'Audio chuẩn',
      icon: Headphones,
      desc: 'Nghe hiểu & kiểm tra',
    },
    {
      id: 'reading' as PracticeTab,
      label: 'Luyện đọc',
      badge: '22 hội thoại',
      icon: FileText,
      desc: 'Tự dịch & đối chiếu',
    },
  ];

  return (
    <nav className="w-full max-w-5xl mx-auto mb-6 px-3 sm:px-4" aria-label="Các phương pháp luyện tập">
      <div className="bg-white/85 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-rose-100 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 sm:py-3 sm:px-2.5 rounded-xl transition-all duration-200 text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20 scale-[1.02]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-500'}`} />
                  <span className="font-semibold text-xs sm:text-sm tracking-tight">{tab.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}
                  >
                    {tab.badge}
                  </span>
                  <span className={`hidden xl:inline text-[11px] ${isActive ? 'text-rose-100' : 'text-stone-400'}`}>
                    • {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
