// Local authentication without Firebase
// Credentials stored in .env file

export const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@gmail.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123', // Default password
};

const SESSION_KEY = 'tournament_admin_session';

export const localAuth = {
  // Login with email and password
  async login(email, password) {
    // Validate credentials against environment variables
    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const session = {
        email,
        loginTime: new Date().toISOString(),
        token: btoa(`${email}:${Date.now()}`), // Simple token
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: { email } };
    }
    throw new Error('Invalid email or password');
  },

  // Logout
  async logout() {
    localStorage.removeItem(SESSION_KEY);
    return { success: true };
  },

  // Get current session
  getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getSession();
  },

  // Clear session on browser close (optional)
  initSessionListener() {
    window.addEventListener('beforeunload', () => {
      // Uncomment to auto-logout on page close
      // localStorage.removeItem(SESSION_KEY);
    });
  },
};
