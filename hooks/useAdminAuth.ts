'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminUser, getAdminSession, loginAdmin, logoutAdmin } from '@/lib/adminAuth';

export function useAdminAuth() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const checkSession = useCallback(() => {
    const session = getAdminSession();
    setAdminUser(session);
    setIsAuthLoaded(true);
  }, []);

  useEffect(() => {
    checkSession();

    const handleAuthChange = () => {
      checkSession();
    };

    window.addEventListener('hsk_admin_auth_changed', handleAuthChange);
    return () => {
      window.removeEventListener('hsk_admin_auth_changed', handleAuthChange);
    };
  }, [checkSession]);

  const handleLogin = useCallback((username: string, pass: string) => {
    const res = loginAdmin(username, pass);
    if (res.success && res.user) {
      setAdminUser(res.user);
    }
    return res;
  }, []);

  const handleLogout = useCallback(() => {
    logoutAdmin();
    setAdminUser(null);
  }, []);

  return {
    isAdmin: !!adminUser,
    adminUser,
    isAuthLoaded,
    login: handleLogin,
    logout: handleLogout,
  };
}
