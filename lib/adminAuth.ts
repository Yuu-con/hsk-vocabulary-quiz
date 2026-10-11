export interface AdminUser {
  username: string;
  role: 'admin';
  loginAt: number;
}

const STORAGE_KEY_ADMIN_ACCOUNT = 'hsk_admin_account_credentials_v1';
const STORAGE_KEY_ADMIN_SESSION = 'hsk_admin_session_v1';

export function getStoredAdminCredentials() {
  if (typeof window === 'undefined') return { username: 'admin', password: 'admin123' };
  try {
    const data = localStorage.getItem(STORAGE_KEY_ADMIN_ACCOUNT);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  // Default credentials: admin / admin123
  const defaultAcc = { username: 'admin', password: 'admin123' };
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNT, JSON.stringify(defaultAcc));
  } catch (e) {}
  return defaultAcc;
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
    if (raw) {
      return JSON.parse(raw) as AdminUser;
    }
  } catch (e) {}
  return null;
}

export function loginAdmin(username: string, password: string): { success: boolean; message?: string; user?: AdminUser } {
  if (typeof window === 'undefined') return { success: false, message: 'Môi trường không hợp lệ' };

  const creds = getStoredAdminCredentials();
  const trimmedUser = username.trim().toLowerCase();
  const trimmedPass = password.trim();

  // Accept initialized credentials or default admin / admin or admin / admin123
  const isMatch =
    (trimmedUser === creds.username.toLowerCase() && trimmedPass === creds.password) ||
    (trimmedUser === 'admin' && (trimmedPass === 'admin' || trimmedPass === 'admin123'));

  if (isMatch) {
    const user: AdminUser = {
      username: 'admin',
      role: 'admin',
      loginAt: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(user));
      window.dispatchEvent(new Event('hsk_admin_auth_changed'));
    } catch (e) {}
    return { success: true, user };
  }

  return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng. (Mặc định: admin / admin123)' };
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    window.dispatchEvent(new Event('hsk_admin_auth_changed'));
  } catch (e) {}
}
