/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface ScoreTier {
  tier: string;
  badge: string;
  color: string;
  bgLight: string;
  borderColor: string;
  feedback: string;
}

export function getScoreTier(score: number, totalQuestions: number = 150): ScoreTier {
  const ratio = totalQuestions > 0 ? score / totalQuestions : 0;

  if (ratio >= 0.9) {
    return {
      tier: 'Xuất sắc',
      badge: '🏆 Xuất sắc',
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-300',
      feedback: 'Kiến thức từ vựng của bạn gần như hoàn hảo! Bạn đã sẵn sàng để chinh phục các cấp độ cao hơn.',
    };
  }
  if (ratio >= 0.8) {
    return {
      tier: 'Rất tốt',
      badge: '🎉 Rất tốt',
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      feedback: 'Bạn nắm rất chắc phần lớn từ vựng. Hãy ôn lại vài câu còn nhầm lẫn nhé!',
    };
  }
  if (ratio >= 0.66) {
    return {
      tier: 'Khá tốt',
      badge: '👍 Khá tốt',
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-300',
      feedback: 'Kết quả khá tốt! Bạn đã vượt qua mức trung bình, chỉ cần trau chuốt thêm một chút.',
    };
  }
  if (ratio >= 0.53) {
    return {
      tier: 'Cần ôn thêm',
      badge: '📚 Cần ôn thêm',
      color: 'text-orange-600',
      bgLight: 'bg-orange-50',
      borderColor: 'border-orange-300',
      feedback: 'Bạn đã ghi nhớ được một nửa vốn từ. Hãy xem lại những câu sai để củng cố nền tảng.',
    };
  }
  return {
    tier: 'Hãy luyện tập thêm',
    badge: '💪 Hãy luyện tập thêm',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-300',
    feedback: 'Đừng nản lòng! Hãy ôn lại từng nhóm từ và làm lại bài kiểm tra để nhớ lâu hơn.',
  };
}

let currentAudioElement: HTMLAudioElement | null = null;

function tryWebSpeech(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(v => v.lang.toLowerCase().includes('zh') || v.lang.toLowerCase().includes('cmn'));
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('SpeechSynthesis error', err);
    return false;
  }
}

function tryGoogleTts(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(text)}`;
      const audio = new Audio(googleUrl);
      currentAudioElement = audio;
      audio.onended = () => resolve(true);
      audio.onerror = () => resolve(false);
      audio.play().then(() => resolve(true)).catch(() => resolve(false));
    } catch {
      resolve(false);
    }
  });
}

/**
 * Text-to-speech for Chinese characters:
 * 1. Primary: Dictionary MP3 voice (Youdao zh) - crystal clear native audio, works on all devices without voice pack
 * 2. Secondary: Google Translate TTS audio
 * 3. Fallback: Web Speech API (speechSynthesis)
 */
export function playChineseAudio(text: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    try {
      // Stop any playing audio
      if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      }

      // Try Youdao Chinese voice (native pronunciation MP3)
      const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;
      const audio = new Audio(youdaoUrl);
      currentAudioElement = audio;

      audio.onended = () => resolve(true);
      audio.onerror = () => {
        // Fallback to Google TTS
        tryGoogleTts(text).then((success) => {
          if (!success) {
            resolve(tryWebSpeech(text));
          } else {
            resolve(true);
          }
        });
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => resolve(true))
          .catch(() => {
            // If browser autoplay restriction or network failure, try fallbacks
            tryGoogleTts(text).then((success) => {
              if (!success) {
                resolve(tryWebSpeech(text));
              } else {
                resolve(true);
              }
            });
          });
      }
    } catch {
      resolve(tryWebSpeech(text));
    }
  });
}
