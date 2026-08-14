import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Layers, Calculator, Building2, Stethoscope, Smartphone, Globe, ArrowLeft } from 'lucide-react';

const services = [
  { icon: Layers, title: 'أنظمة ERP', desc: 'أنظمة تخطيط موارد المؤسسات المتكاملة لإدارة جميع عمليات عملك.', color: 'from-blue-500 to-cyan-500' },
  { icon: Calculator, title: 'البرامج المحاسبية', desc: 'حلول محاسبية معتمدة من هيئة الزكاة والدخل مع ربط فوري.', color: 'from-emerald-500 to-green-500' },
  { icon: Building2, title: 'أنظمة العقارات', desc: 'إدارة العقارات والوحدات السكنية والإيجارات بكفاءة عالية.', color: 'from-amber-500 to-orange-500' },
  { icon: Stethoscope, title: 'أنظمة الرعاية الصحية', desc: 'إدارة المستشفيات والعيادات والمواعيد والسجلات الطبية.', color: 'from-rose-500 to-pink-500' },
  { icon: Smartphone, title: 'تطبيقات الجوال', desc: 'تطبيقات iOS و Android Native و Hybrid بأحدث التقنيات.', color: 'from-violet-500 to-purple-500' },
  { icon: Globe, title: 'مواقع الويب', desc: 'تصميم وتطوير مواقع احترافية متجاوبة مع جميع الأجهزة.', color: 'from-sky-500 to-blue-500' },
];

const ServicesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orvix-primary/10 border border-orvix-primary/20 text-orvix-primary text-sm font-medium mb-6">
            <Layers size={16} />
            <span>خدماتنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            حلول <span className="gradient-text">متكاملة</span> لأعمالك
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">نقدم مجموعة واسعة من الخدمات التقنية المصممة خصيصاً لتلبية احتياجات عملك</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass p-8 hover:bg-white/10 transition-all duration-500 group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
              <Link to="/services" className="inline-flex items-center gap-2 text-orvix-green text-sm font-medium hover:gap-3 transition-all">
                اكتشف المزيد <ArrowLeft size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
