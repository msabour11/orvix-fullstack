import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, ShoppingCart, Truck, Package, Users, Building, BarChart3, ArrowLeft } from 'lucide-react';

const modules = [
  { icon: BookOpen, title: 'المحاسبة', desc: 'إدارة الحسابات العامة والقيود والتقارير المالية', color: 'bg-blue-500' },
  { icon: ShoppingCart, title: 'المبيعات', desc: 'إدارة الفواتير والعملاء والعروض والمتابعة', color: 'bg-emerald-500' },
  { icon: Truck, title: 'المشتريات', desc: 'إدارة الموردين وطلبات الشراء والفواتير الواردة', color: 'bg-amber-500' },
  { icon: Package, title: 'المخزون', desc: 'تتبع المنتجات والمستودعات والجرد التلقائي', color: 'bg-rose-500' },
  { icon: Users, title: 'الموارد البشرية', desc: 'إدارة الموظفين والرواتب والإجازات والحضور', color: 'bg-violet-500' },
  { icon: Building, title: 'CRM', desc: 'إدارة علاقات العملاء والمتابعات والفرص', color: 'bg-cyan-500' },
  { icon: BarChart3, title: 'التقارير', desc: 'تقارير تحليلية متقدمة ولوحات معلومات', color: 'bg-orange-500' },
];

const ModulesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-orvix-navy/30" ref={ref}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-green/10 border border-orvix-green/20 text-orvix-green text-sm font-medium mb-6">
            <BarChart3 size={16} />
            <span>وحدات النظام</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            وحدات <span className="gradient-text">ERP</span> المتكاملة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">نظام متكامل يغطي جميع جوانب عملك التجاري والإداري</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((mod, index) => (
            <div
              key={index}
              className={`glass p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <mod.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
