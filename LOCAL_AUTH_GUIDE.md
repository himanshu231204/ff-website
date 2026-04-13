# Local Admin Authentication Guide

## Overview
Your tournament website now uses **local authentication** (stored in `.env`) instead of Firebase. Credentials are validated against the environment variables and sessions are stored in the browser's **localStorage**.

---

## 🔐 Default Credentials

**Email:** `admin@gmail.com`  
**Password:** `admin123`

These credentials are shown on the login page as a reminder.

---

## 📝 How to Change Admin Credentials

Edit the `.env` file in your project root:

```env
VITE_ADMIN_EMAIL=your-email@example.com
VITE_ADMIN_PASSWORD=your-secure-password
```

**Example:**
```env
VITE_ADMIN_EMAIL=himan@gmail.com
VITE_ADMIN_PASSWORD=MySecurePass123!
```

After changing, **restart the development server** or rebuild:
```bash
npm run dev
# or
npm run build
```

---

## 🎯 How to Access the Admin Panel

### Step 1: Navigate to Login
Go to `/login` route in your application
```
http://localhost:5173/login
```

### Step 2: Enter Credentials
- Email: `admin@gmail.com` (or your custom email from `.env`)
- Password: `admin123` (or your custom password from `.env`)

### Step 3: Login
Click the **Login** button. After successful login, you'll be redirected to the admin dashboard at `/admin`

---

## 💾 Where Credentials Are Stored

### 1. **Environment Variables** (`.env` file)
```env
VITE_ADMIN_EMAIL=admin@gmail.com
VITE_ADMIN_PASSWORD=admin123
```
- This is where you define the credentials
- **NOT** visible in browser (safe from exposure)

### 2. **Browser localStorage** (After Login)
When you log in successfully:
- A session token is created and stored in browser localStorage
- Key: `tournament_admin_session`
- Contains: `{ email, loginTime, token }`
- Persists until you logout or clear browser data

### 3. **Session Persistence**
- Once logged in, your session persists across page refreshes
- Logout to remove the session

---

## 📂 File Structure for Authentication

```
src/
├── lib/
│   └── localAuth.js              ← Local auth logic (login/logout)
├── context/
│   └── AuthContext.jsx           ← Global auth state
├── pages/
│   └── LoginPage.jsx             ← Login form UI
├── components/
│   └── ProtectedRoute.jsx        ← Route protection
└── config/
    └── admin.js                  ← Admin configuration
```

---

## 🔄 Authentication Flow

```
Login Page
    ↓
User enters email + password
    ↓
localAuth.login() validates against .env credentials
    ↓
If valid → Store session in localStorage
    ↓
Redirect to /admin (ProtectedRoute checks isAdmin)
    ↓
Access granted to admin panel
```

---

## 🛑 Logout

Click the **Logout** button in the admin panel:
- Session is removed from localStorage
- Redirected to login page

---

## ⚠️ Important Security Notes

1. **Never commit sensitive passwords** to Git
   - Add `.env` to `.gitignore` (already done)
   - Use `.env.example` with placeholder values for team members

2. **Change default credentials** in production
   - Update email and password in `.env` before deploying

3. **Use HTTPS** in production
   - Although localStorage can't prevent XSS attacks, HTTPS prevents credentials from being intercepted

4. **Environment-based secrets** (Future)
   - For production, use deployment platform's secret management (Vercel, AWS, etc.)

---

## 🧪 Testing

### Login with correct credentials:
```
Email: admin@gmail.com
Password: admin123
→ Success ✓
```

### Login with wrong password:
```
Email: admin@gmail.com
Password: wrongpassword
→ Error: "Invalid email or password"
```

### Check localStorage (DevTools):
1. Open Browser DevTools (F12)
2. Go to **Application** → **Storage** → **Local Storage**
3. Look for key: `tournament_admin_session`
4. Contains: `{"email":"admin@gmail.com","loginTime":"2026-04-13T...","token":"..."}`

---

## 🔧 Customization

### Auto-logout on browser close (Optional)

Edit `src/lib/localAuth.js`:
```javascript
initSessionListener() {
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem(SESSION_KEY); // Uncomment to auto-logout
  });
}
```

### Extend session expiration

Add expiry check in AuthContext:
```javascript
const isSessionExpired = (session) => {
  const loginTime = new Date(session.loginTime);
  const now = new Date();
  const diffMinutes = (now - loginTime) / (1000 * 60);
  return diffMinutes > 480; // 8 hours
};
```

---

## ❓ FAQ

**Q: Can I have multiple admin accounts?**  
A: Currently supports only one. To add multiple, modify `localAuth.js` to validate against an array.

**Q: Is password hashed?**  
A: No. This is a simple local auth for development/demo. For production, use proper authentication.

**Q: What if I forget the password?**  
A: Change it in `.env` and restart the server.

**Q: Does it work offline?**  
A: Yes, as long as credentials are in `.env`

**Q: Can I see the password in localStorage?**  
A: No, only the session token is stored (password is never persisted).

---

## 🚀 Summary

| Aspect | Details |
|--------|---------|
| **Credentials Location** | `.env` file |
| **Session Storage** | Browser localStorage |
| **Default Email** | `admin@gmail.com` |
| **Default Password** | `admin123` |
| **Session Key** | `tournament_admin_session` |
| **Protected Routes** | `/admin` and sub-routes |
| **Persist Across Refresh** | Yes |
