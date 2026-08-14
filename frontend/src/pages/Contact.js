import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('تم إرسال رسالتك بنجاح!');
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      toast.error('حدث خطأ أثناء الإرسال');
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            تواصل <span className="gradient-text">معنا</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نحن هنا لمساعدتك في كل خطوة، أرسل لنا رسالتك وسنرد عليك في أقرب وقت ممكن
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orvix-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-orvix-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">البريد الإلكتروني</h4>
                <p className="text-gray-400 text-sm">info@orvix.com</p>
                <p className="text-gray-400 text-sm">support@orvix.com</p>
              </div>
            </div>
            <div className="glass p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orvix-green/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orvix-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">الهاتف</h4>
                <p className="text-gray-400 text-sm">+966 50 000 0000</p>
                <p className="text-gray-400 text-sm">+966 11 000 0000</p>
              </div>
            </div>
            <div className="glass p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orvix-accent/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-orvix-accent" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">العنوان</h4>
                <p className="text-gray-400 text-sm">الرياض، المملكة العربية السعودية</p>
                <p className="text-gray-400 text-sm">حي العليا، برج المملكة</p>
              </div>
            </div>
            <div className="glass p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">ساعات العمل</h4>
                <p className="text-gray-400 text-sm">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                <p className="text-gray-400 text-sm">الجمعة - السبت: مغلق</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-8">
              {sent && (
                <div className="mb-6 p-4 rounded-xl bg-orvix-green/10 border border-orvix-green/20 text-orvix-green flex items-center gap-3">
                  <CheckCircle size={20} />
                  <span>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">الاسم الكامل *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="محمد أحمد" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">رقم الجوال</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="05xxxxxxxx" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">الموضوع</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="استفسار عن خدمة" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">الرسالة *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors resize-none" placeholder="اكتب رسالتك بالتفصيل..."></textarea>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? 'جاري الإرسال...' : <><Send size={18} /> إرسال الرسالة</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
