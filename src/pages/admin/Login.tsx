import React, { useState } from 'react';
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { apiClient } from '@/lib/axios';

interface LoginProps {
  navigate: (path: string) => void;
}

const Login: React.FC<LoginProps> = ({ navigate }) => {
  const [email, setEmail] = useState('admin@devlagi.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/admin/login', {
        user_email: email,
        user_password: password
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin');
      }
    } catch (err: any) {
      const data = err.response?.data;
      if (data) {
        if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(', ');
            setError(data.message + ': ' + errorMessages);
        } else {
            setError(data.message || 'Invalid credentials');
        }
      } else {
        setError('Failed to connect to the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-ink-950 skew-y-3 transform origin-top-left -translate-y-20 z-0 shadow-2xl"></div>
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 z-10 flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Website
      </button>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-ink-100 relative z-10">
        
        <div className="bg-ink-950 px-8 py-10 text-center relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-burgundy-600 rounded-full flex items-center justify-center shadow-lg shadow-burgundy-900/50 mb-4">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-serif text-white mb-2 tracking-wide">
              Devlagi<span className="text-gold-400 font-bold italic">Admin</span>
            </h2>
            <p className="text-white/60 text-sm font-light tracking-wide uppercase">Secure Control Panel</p>
          </div>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 bg-burgundy-50 border border-burgundy-200 text-burgundy-700 px-4 py-3 rounded-lg text-sm flex items-start">
              <span className="block">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-2 uppercase tracking-wider text-xs">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-burgundy-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
                  placeholder="admin@devlagi.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-2 uppercase tracking-wider text-xs">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-ink-200 rounded-xl focus:ring-2 focus:ring-burgundy-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 transition-all disabled:opacity-70 uppercase tracking-widest mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin -ml-1 mr-2" size={18} />
              ) : null}
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;





