import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, Briefcase, Settings, LogOut,
  Users, Mail, Eye, Trash2, X, CheckCircle, Clock, AlertCircle,
  Plus, Search, Filter, ChevronDown, BarChart3, TrendingUp, TrendingDown
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contacts, setContacts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [stats, setStats] = useState({ totalContacts: 0, newContacts: 0, totalProjects: 0, featuredProjects: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [contactsRes, portfolioRes] = await Promise.all([
        api.get('/contact'),
        api.get('/portfolio')
      ]);
      setContacts(contactsRes.data);
      setPortfolio(portfolioRes.data);
      setStats({
        totalContacts: contactsRes.data.length,
        newContacts: contactsRes.data.filter(c => c.status === 'new').length,
        totalProjects: portfolioRes.data.length,
        featuredProjects: portfolioRes.data.filter(p => p.featured).length
      });
    } catch (err) {
      // Demo data fallback
      setContacts([
        { _id: '1', name: 'أحمد محمد', email: 'ahmed@test.com', phone: '0500000001', subject: 'استفسار', message: 'أريد نظام ERP', status: 'new', createdAt: '2026-08-06' },
        { _id: '2', name: 'خالد عبدالله', email: 'khaled@test.com', phone: '0500000002', subject: 'طلب عرض سعر', message: 'نظام محاسبي', status: 'read', createdAt: '2026-08-05' },
        { _id: '3', name: 'فاطمة الزهراني', email: 'fatima@test.com', phone: '0500000003', subject: 'دعم فني', message: 'مشكلة في النظام', status: 'replied', createdAt: '2026-08-04' },
      ]);
      setPortfolio([
        { _id: '1', title: 'نظام المستشفيات', category: 'medical', featured: true },
        { _id: '2', title: 'نظام العقارات', category: 'realestate', featured: true },
        { _id: '3', title: 'نظام المحاسبة', category: 'accounting', featured: false },
      ]);
      setStats({ totalContacts: 3, newContacts: 1, totalProjects: 3, featuredProjects: 2 });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('orvix_token');
    localStorage.removeItem('orvix_user');
    toast.success('تم تسجيل الخروج');
    navigate('/admin/login');
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
      await api.delete(`/contact/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      toast.success('تم الحذف بنجاح');
    } catch (err) {
      toast.error('خطأ في الحذف');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}/status`, { status });
      setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
      toast.success('تم تحديث الحالة');
    } catch (err) {
      toast.error('خطأ في التحديث');
    }
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    read: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    replied: 'bg-green-500/20 text-green-400 border-green-500/30',
    archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  };

  const statusLabels = { new: 'جديد', read: 'مقروء', replied: 'تم الرد', archived: 'مؤرشف' };

  const sidebarItems = [
    { id: 'dashboard', label: 'لوحة المعلومات', icon: LayoutDashboard },
    { id: 'contacts', label: 'رسائل التواصل', icon: MessageSquare },
    { id: 'portfolio', label: 'المشاريع', icon: Briefcase },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-orvix-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orvix-navy border-l border-white/10 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orvix-primary to-orvix-green rounded-xl flex items-center justify-center text-white font-bold">O</div>
            <span className="text-lg font-bold text-white">ORVIX Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-orvix-primary/20 text-orvix-primary'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-orvix-navy border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold">ORVIX Admin</span>
        <button onClick={handleLogout} className="text-red-400 text-sm">خروج</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-10 pt-20 lg:pt-10 overflow-auto">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-8">لوحة المعلومات</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <MessageSquare className="w-8 h-8 text-orvix-primary" />
                  <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp size={12} /> +12%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalContacts}</div>
                <div className="text-gray-400 text-sm">إجمالي الرسائل</div>
              </div>
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <Mail className="w-8 h-8 text-orvix-green" />
                  <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp size={12} /> +5</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.newContacts}</div>
                <div className="text-gray-400 text-sm">رسائل جديدة</div>
              </div>
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="w-8 h-8 text-amber-500" />
                  <span className="text-xs text-gray-400 flex items-center gap-1"><TrendingDown size={12} /> 0%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalProjects}</div>
                <div className="text-gray-400 text-sm">المشاريع</div>
              </div>
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-violet-500" />
                  <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp size={12} /> +2</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.featuredProjects}</div>
                <div className="text-gray-400 text-sm">مشاريع مميزة</div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-bold text-white mb-6">آخر الرسائل</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-right text-gray-400 text-sm font-medium pb-3">الاسم</th>
                      <th className="text-right text-gray-400 text-sm font-medium pb-3">الموضوع</th>
                      <th className="text-right text-gray-400 text-sm font-medium pb-3">الحالة</th>
                      <th className="text-right text-gray-400 text-sm font-medium pb-3">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.slice(0, 5).map((contact) => (
                      <tr key={contact._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 text-white text-sm">{contact.name}</td>
                        <td className="py-3 text-gray-400 text-sm">{contact.subject || '—'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[contact.status]}`}>
                            {statusLabels[contact.status]}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500 text-sm">{new Date(contact.createdAt).toLocaleDateString('ar-SA')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-2xl font-bold text-white">رسائل التواصل</h1>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 pl-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:border-orvix-green focus:outline-none w-48"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-orvix-green focus:outline-none"
                >
                  <option value="all" className="bg-orvix-navy">الكل</option>
                  <option value="new" className="bg-orvix-navy">جديد</option>
                  <option value="read" className="bg-orvix-navy">مقروء</option>
                  <option value="replied" className="bg-orvix-navy">تم الرد</option>
                  <option value="archived" className="bg-orvix-navy">مؤرشف</option>
                </select>
              </div>
            </div>

            <div className="glass overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">الاسم</th>
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">البريد</th>
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">الموضوع</th>
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">الحالة</th>
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">التاريخ</th>
                      <th className="text-right text-gray-400 text-xs font-medium py-3 px-4">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white text-sm">{contact.name}</td>
                        <td className="py-3 px-4 text-gray-400 text-sm">{contact.email}</td>
                        <td className="py-3 px-4 text-gray-400 text-sm">{contact.subject || '—'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[contact.status]}`}>
                            {statusLabels[contact.status]}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">{new Date(contact.createdAt).toLocaleDateString('ar-SA')}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button onClick={() => setSelectedContact(contact)} className="p-1.5 rounded-lg bg-orvix-primary/20 text-orvix-primary hover:bg-orvix-primary/30 transition-colors">
                              <Eye size={14} />
                            </button>
                            <button onClick={() => handleDeleteContact(contact._id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredContacts.length === 0 && (
                <div className="text-center py-12 text-gray-500">لا توجد رسائل</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">المشاريع</h1>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={16} /> إضافة مشروع
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project) => (
                <div key={project._id} className="glass p-6">
                  <div className="h-32 bg-gradient-to-br from-orvix-primary/20 to-orvix-green/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-orvix-primary">{project.title[0]}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.category}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-orvix-primary/20 text-orvix-primary text-sm hover:bg-orvix-primary/30 transition-colors">تعديل</button>
                    <button className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-colors">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-8">الإعدادات</h1>
            <div className="glass p-8 max-w-2xl">
              <h3 className="text-lg font-bold text-white mb-6">معلومات الموقع</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">اسم الشركة</label>
                  <input type="text" defaultValue="ORVIX Solutions" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orvix-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
                  <input type="email" defaultValue="info@orvix.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orvix-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">رقم الهاتف</label>
                  <input type="tel" defaultValue="+966 50 000 0000" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orvix-green focus:outline-none" />
                </div>
                <button className="btn-primary mt-4">حفظ التغييرات</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedContact(null)}>
          <div className="glass max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedContact(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6">تفاصيل الرسالة</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-500 text-sm">الاسم:</span>
                <p className="text-white">{selectedContact.name}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">البريد:</span>
                <p className="text-white">{selectedContact.email}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">الهاتف:</span>
                <p className="text-white">{selectedContact.phone || '—'}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">الموضوع:</span>
                <p className="text-white">{selectedContact.subject || '—'}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">الرسالة:</span>
                <p className="text-gray-300 mt-1 p-4 rounded-xl bg-white/5">{selectedContact.message}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">الحالة:</span>
                <div className="flex gap-2 mt-2">
                  {Object.keys(statusLabels).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedContact._id, status)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedContact.status === status
                          ? statusColors[status]
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
