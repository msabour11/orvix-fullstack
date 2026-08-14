import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Filter } from 'lucide-react';
import api from '../utils/api';

const categories = [
  { key: 'all', label: 'الكل' },
  { key: 'medical', label: 'طبية' },
  { key: 'realestate', label: 'عقارات' },
  { key: 'accounting', label: 'محاسبة' },
  { key: 'ecommerce', label: 'تجارة إلكترونية' },
  { key: 'mobile', label: 'تطبيقات جوال' },
];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/portfolio', { params: { category: activeCategory } });
        setProjects(data);
      } catch (err) {
        setProjects([
          { _id: '1', title: 'نظام إدارة المستشفيات', titleEn: 'Hospital Management', category: 'medical', description: 'نظام متكامل لإدارة المستشفيات والعيادات', technologies: ['React', 'Node.js', 'MongoDB'], client: 'مستشفى الرياض' },
          { _id: '2', title: 'نظام إدارة العقارات', titleEn: 'Real Estate System', category: 'realestate', description: 'إدارة العقارات والوحدات والإيجارات', technologies: ['React', 'Node.js', 'PostgreSQL'], client: 'شركة العقارات المتحدة' },
          { _id: '3', title: 'نظام المحاسبة المتكامل', titleEn: 'Accounting System', category: 'accounting', description: 'نظام محاسبي معتمد من هيئة الزكاة', technologies: ['React', 'Node.js', 'MongoDB'], client: 'مؤسسة الأمل' },
          { _id: '4', title: 'متجر إلكتروني', titleEn: 'E-Commerce', category: 'ecommerce', description: 'منصة تجارة إلكترونية متكاملة', technologies: ['Next.js', 'Node.js', 'Stripe'], client: 'متجر التسوق' },
          { _id: '5', title: 'تطبيق توصيل', titleEn: 'Delivery App', category: 'mobile', description: 'تطبيق جوال لتوصيل الطلبات', technologies: ['React Native', 'Node.js'], client: 'شركة التوصيل' },
          { _id: '6', title: 'نظام العيادات', titleEn: 'Clinic System', category: 'medical', description: 'إدارة العيادات والمواعيد', technologies: ['React', 'Node.js'], client: 'عيادة الصحة' },
        ]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, [activeCategory]);

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            أعمالنا <span className="gradient-text">المميزة</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نماذج من المشاريع التي نفذناها لعملائنا بأعلى معايير الجودة
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.key
                  ? 'bg-orvix-primary text-white shadow-lg shadow-orvix-primary/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.key === 'all' && <Filter size={14} />}
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-2 border-orvix-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className="glass overflow-hidden cursor-pointer group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-52 bg-gradient-to-br from-orvix-primary/20 to-orvix-green/20 flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-2xl bg-orvix-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-3xl font-bold text-orvix-primary">{project.title[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-orvix-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orvix-green transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-orvix-primary/10 text-orvix-primary text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <div className="glass max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-orvix-primary/20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-orvix-primary">{selectedProject.title[0]}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-gray-500 text-sm mb-1">{selectedProject.titleEn}</p>
              <p className="text-gray-400 mb-6 leading-relaxed">{selectedProject.description}</p>
              <div className="mb-4">
                <span className="text-gray-500 text-sm">العميل:</span>
                <span className="text-white text-sm mr-2">{selectedProject.client}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies?.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-full bg-orvix-green/10 text-orvix-green text-sm font-medium">{tech}</span>
                ))}
              </div>
              <button className="btn-primary flex items-center gap-2">
                <ExternalLink size={16} /> عرض المشروع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
