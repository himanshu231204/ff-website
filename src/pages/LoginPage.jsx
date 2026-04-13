import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && isAdmin) {
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    }
  }, [isAdmin, loading, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }

    try {
      setSubmitting(true);
      await login(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ui-page mt-10 max-w-lg mx-auto">
      <div className="ui-card">
        <div className="text-center mb-6">
          <div className="ui-header-badge mx-auto mb-4">
            <ShieldCheck className="text-cyan-400" size={18} />
            <span className="text-cyan-300 text-sm">Admin Access</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2 text-sm">Local authentication (no Firebase)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500 placeholder:text-gray-600"
              disabled={submitting}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500 placeholder:text-gray-600"
              disabled={submitting}
              required
            />
          </label>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="ui-button w-full mt-6"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
