import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { localAuth, ADMIN_CREDENTIALS } from '../lib/localAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage session on mount
  useEffect(() => {
    const session = localAuth.getSession();
    if (session) {
      setUser({ email: session.email });
    }
    setLoading(false);
    localAuth.initSessionListener();
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAdmin: Boolean(user && user.email?.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase()),
    isFirebaseConfigured: false,
    login: async (email, password) => {
      const result = await localAuth.login(email, password);
      setUser({ email: result.user.email });
      return result;
    },
    logout: async () => {
      await localAuth.logout();
      setUser(null);
      return { success: true };
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
