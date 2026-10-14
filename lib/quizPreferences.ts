'use client';

import { QuizLevel } from '@/types/quiz';

export interface SavedLessonSelection {
  scopeMode: 'all' | 'custom';
  selectedLessons: number[];
  shuffle: boolean;
  sortByPinyin?: boolean;
}

const STORAGE_PREFIX_PREFS = 'hsk_lesson_prefs_';

export function getSavedLessonPreferences(level: QuizLevel): SavedLessonSelection {
  if (typeof window === 'undefined') {
    return { scopeMode: 'all', selectedLessons: [], shuffle: true, sortByPinyin: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX_PREFS + level);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        scopeMode: parsed.scopeMode === 'custom' ? 'custom' : 'all',
        selectedLessons: Array.isArray(parsed.selectedLessons) ? parsed.selectedLessons : [],
        shuffle: typeof parsed.shuffle === 'boolean' ? parsed.shuffle : true,
        sortByPinyin: typeof parsed.sortByPinyin === 'boolean' ? parsed.sortByPinyin : false,
      };
    }
  } catch (e) {
    console.error('Failed to get saved lesson preferences', e);
  }
  return { scopeMode: 'all', selectedLessons: [], shuffle: true, sortByPinyin: false };
}

export function saveLessonPreferences(
  level: QuizLevel,
  prefs: SavedLessonSelection
): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX_PREFS + level, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save lesson preferences', e);
  }
}
