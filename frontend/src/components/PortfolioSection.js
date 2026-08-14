import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, X } from 'lucide-react';
import api from '../utils/api';

const categories = [
  { key: 'all', label: 'الكل' },
  { key: 'medical', label: 'طبية' },
  { key: 'realestate', label: 'عقارات' },
  { key: 'accounting', label: 'محاسبة' },
  { key: 'ecommerce', label: 'تجارة' },
  { key: 'mobile', label: 'جوال' },
];

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/portfolio', { params: { category: activeCategory } });
        setProjects(data);
      } catch (err) {
        // Fallback demo data
        setProjects([
          { _id: '1', title: 'نظام إدارة المستشفيات', category: 'medical', description: 'نظام متكامل لإدارة المستشفيات', technologies: ['React', 'Node.js'] },
          { _id: '2', title: 'نظام إدارة العقارات', category: 'realestate', description: 'إدارة العقارات والإيجارات', technologies: ['React', 'Node.js'] },
          { _id: '3', title: 'نظام المحاسبة', category: 'accounting', description: 'نظام محاسبي معتمد', technologies: ['React', 'Node.js'] },
        ]);
      }
    };
    fetchProjects();
  }, [activeCategory]);

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            أعمالنا <span className="gradient-text">المميزة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">نماذج من المشاريع التي نفذناها لعملائنا</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-orvix-primary text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <div
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className={`glass overflow-hidden cursor-pointer group hover:bg-white/10 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-orvix-primary/20 to-orvix-green/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-orvix-primary/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orvix-primary">{project.title[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orvix-green transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded-md bg-orvix-primary/10 text-orvix-primary text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <div className="glass max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
              <p className="text-gray-400 mb-6">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies?.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-orvix-green/10 text-orvix-green text-sm">{tech}</span>
                ))}
              </div>
              <button className="btn-primary flex items-center gap-2">
                <ExternalLink size={16} /> عرض المشروع
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
