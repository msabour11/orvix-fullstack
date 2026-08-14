import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, ServerOff } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@orvix.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError(false);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('orvix_token', data.token);
      localStorage.setItem('orvix_user', JSON.stringify(data));
      toast.success('تم تسجيل الدخول بنجاح!');
      navigate('/admin');
    } catch (err) {
      if (!err.response) {
        setServerError(true);
        toast.error('لا يمكن الاتصال بالخادم. تأكد من تشغيل Backend');
      } else if (err.response.status === 401) {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else {
        toast.error(err.response?.data?.message || 'خطأ في تسجيل الدخول');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orvix-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orvix-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orvix-green/10 rounded-full blur-3xl" />

      <div className="glass relative z-10 w-full max-w-md p-8 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orvix-primary to-orvix-green rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">لوحة التحكم</h1>
          <p className="text-gray-400 text-sm">تسجيل الدخول للوصول إلى لوحة الإدارة</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
            <ServerOff size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">لا يمكن الاتصال بالخادم</p>
              <p className="text-xs mt-1 opacity-80">تأكد من تشغيل Backend:</p>
              <code className="text-xs bg-red-500/10 px-2 py-1 rounded mt-1 block">cd backend && npm start</code>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors"
                placeholder="admin@orvix.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-orvix-primary/10 border border-orvix-primary/20">
          <p className="text-orvix-primary text-sm text-center font-medium">بيانات الدخول الافتراضية:</p>
          <p className="text-gray-400 text-xs text-center mt-1">admin@orvix.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
