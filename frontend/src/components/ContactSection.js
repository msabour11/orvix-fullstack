import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ContactSection = () => {
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
      toast.error('حدث خطأ أثناء الإرسال، حاول مرة أخرى');
    }
    setLoading(false);
  };

  return (
    <section className="section-padding bg-orvix-navy/30">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            تواصل <span className="gradient-text">معنا</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">نحن هنا لمساعدتك، أرسل لنا رسالتك وسنرد عليك في أقرب وقت</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-6">
              <Mail className="w-6 h-6 text-orvix-green mb-3" />
              <h4 className="text-white font-bold mb-1">البريد الإلكتروني</h4>
              <p className="text-gray-400 text-sm">info@orvix.com</p>
            </div>
            <div className="glass p-6">
              <Phone className="w-6 h-6 text-orvix-green mb-3" />
              <h4 className="text-white font-bold mb-1">الهاتف</h4>
              <p className="text-gray-400 text-sm">+966 50 000 0000</p>
            </div>
            <div className="glass p-6">
              <MapPin className="w-6 h-6 text-orvix-green mb-3" />
              <h4 className="text-white font-bold mb-1">العنوان</h4>
              <p className="text-gray-400 text-sm">الرياض، المملكة العربية السعودية</p>
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
                  <label className="block text-gray-300 text-sm mb-2">الاسم *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="اسمك الكامل" />
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors" placeholder="موضوع الرسالة" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">الرسالة *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orvix-green focus:outline-none transition-colors resize-none" placeholder="اكتب رسالتك هنا..."></textarea>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? 'جاري الإرسال...' : <><Send size={18} /> إرسال الرسالة</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
