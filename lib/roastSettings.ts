'use client';

const STORAGE_KEY_ROAST_MODE = 'hsk_roast_mode_enabled';

export function getRoastModeEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const val = localStorage.getItem(STORAGE_KEY_ROAST_MODE);
    if (val !== null) {
      return val === 'true';
    }
  } catch (e) {
    console.error('Failed to read roast mode setting', e);
  }
  return true; // Default to enabled
}

export function setRoastModeEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ROAST_MODE, enabled ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('hsk_roast_mode_changed', { detail: enabled }));
  } catch (e) {
    console.error('Failed to save roast mode setting', e);
  }
}
