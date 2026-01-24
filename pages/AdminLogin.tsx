
import React, { useState } from 'react';
import { api } from '../services/api';
import { Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@ngo.org');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.login(email, password);

      if (res) {
        // ✅ Store token for protected routes
        localStorage.setItem('adminToken', res.token || 'demo_token');

        // ✅ Redirect to dashboard (HASH ROUTE FIXED)
        window.location.hash = '#/admin/dashboard';
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-500/20 mb-6">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Admin Terminal</h1>
          <p className="text-gray-400">Secure access for NGO personnel only</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 text-sm font-medium">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="admin@ngo.org"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              By accessing this system, you agree to our internal data protection policy. All actions are logged.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#/"
            className="text-emerald-500 hover:text-emerald-400 font-medium text-sm flex items-center justify-center gap-2"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
