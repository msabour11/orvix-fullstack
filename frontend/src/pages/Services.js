import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Layers, Calculator, Building2, Stethoscope, Smartphone, Globe, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Layers, title: 'أنظمة ERP المتكاملة',
    desc: 'نظام متكامل لإدارة جميع موارد المؤسسة يشمل المحاسبة، المبيعات، المشتريات، المخزون، والموارد البشرية.',
    features: ['واجهة سهلة الاستخدام', 'تقارير تحليلية متقدمة', 'ربط مع هيئة الزكاة', 'دعم فني 24/7'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Calculator, title: 'البرامج المحاسبية',
    desc: 'حلول محاسبية معتمدة من هيئة الزكاة والدخل مع دعم الفواتير الإلكترونية وربط ZATCA.',
    features: ['معتمد من ZATCA', 'فواتير إلكترونية', 'إدارة الضريبة', 'تقارير مالية دقيقة'],
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Building2, title: 'أنظمة العقارات',
    desc: 'إدارة كاملة للعقارات والوحدات السكنية والتجارية مع إدارة العقود والإيجارات والصيانة.',
    features: ['إدارة الوحدات', 'عقود الإيجار', 'متابعة الصيانة', 'تقارير الإيرادات'],
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Stethoscope, title: 'أنظمة الرعاية الصحية',
    desc: 'نظام متكامل للمستشفيات والعيادات يشمل إدارة المرضى والمواعيد والسجلات الطبية والفواتير.',
    features: ['إدارة المرضى', 'المواعيد الإلكترونية', 'السجلات الطبية', 'التأمين الصحي'],
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: Smartphone, title: 'تطبيقات الجوال',
    desc: 'تطوير تطبيقات iOS و Android Native و Hybrid بأحدث التقنيات وأفضل تجربة مستخدم.',
    features: ['iOS و Android', 'واجهة عربية', 'إشعارات فورية', 'أداء عالي'],
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Globe, title: 'مواقع الويب المتقدمة',
    desc: 'تصميم وتطوير مواقع احترافية متجاوبة مع جميع الأجهزة مع تحسين محركات البحث.',
    features: ['تصميم متجاوب', 'SEO محسن', 'أداء سريع', 'إدارة المحتوى'],
    color: 'from-sky-500 to-blue-500'
  },
];

const Services = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="pt-24 pb-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            خدماتنا <span className="gradient-text">المتكاملة</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نقدم مجموعة شاملة من الخدمات التقنية المصممة لتلبية احتياجات عملك وتسريع نموك الرقمي
          </p>
        </div>

        <div className="space-y-8" ref={ref}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass p-8 lg:p-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle size={16} className="text-orvix-green flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 lg:text-left">
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                    اطلب الخدمة <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
