'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRoastModeEnabled, setRoastModeEnabled } from '@/lib/roastSettings';

export function useRoastMode() {
  const [isRoastEnabled, setIsRoastEnabled] = useState<boolean>(true);

  useEffect(() => {
    setIsRoastEnabled(getRoastModeEnabled());

    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (typeof customEvent.detail === 'boolean') {
        setIsRoastEnabled(customEvent.detail);
      }
    };

    window.addEventListener('hsk_roast_mode_changed', handleModeChange);
    return () => {
      window.removeEventListener('hsk_roast_mode_changed', handleModeChange);
    };
  }, []);

  const toggleRoast = useCallback((forceVal?: boolean) => {
    setIsRoastEnabled((prev) => {
      const next = typeof forceVal === 'boolean' ? forceVal : !prev;
      setRoastModeEnabled(next);
      return next;
    });
  }, []);

  return {
    isRoastEnabled,
    toggleRoast,
    setRoastEnabled: toggleRoast,
  };
}
